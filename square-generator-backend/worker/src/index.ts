/**
 * Square Generator — Cloudflare Worker.
 *
 * Endpoints (all under /api):
 *   POST /api/squares              submit a new square (Turnstile-gated)
 *   GET  /api/squares              list approved squares (public)
 *   GET  /api/squares/featured     get the featured square (public, optional)
 *   GET  /api/admin/queue          list pending squares (Cloudflare Access)
 *   POST /api/admin/squares/:id    {action: "approve"|"reject", notes?: string}
 *
 * Auth model:
 *   - Public POST /squares: Turnstile token in body; verified server-side.
 *   - Admin endpoints: Cloudflare Access in front of the route. We READ
 *     the `Cf-Access-Authenticated-User-Email` header it injects, but do
 *     NOT trust the request without that header — Access strips spoofed
 *     copies of it before reaching us. If the header is missing → 401.
 *
 * Rate limit:
 *   - Per-IP, configured in wrangler.toml. Stored in D1 (no KV needed).
 *   - IP is hashed with a daily-rotated salt; we never store raw IPs.
 */

export interface Env {
  DB: D1Database;
  TURNSTILE_SECRET: string;
  RATE_LIMIT_WINDOW_SECONDS: string;
  RATE_LIMIT_MAX_PER_WINDOW: string;
  GALLERY_PAGE_SIZE: string;
  ALLOW_ORIGINS: string;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });

    try {
      // ── public endpoints ────────────────────────────────────────────
      if (url.pathname === "/api/squares" && req.method === "POST") {
        return json(await submitSquare(req, env), 200, cors);
      }
      if (url.pathname === "/api/squares" && req.method === "GET") {
        return json(await listApproved(url, env), 200, cors);
      }
      if (url.pathname === "/api/squares/featured" && req.method === "GET") {
        return json(await getFeatured(env), 200, cors);
      }

      // ── admin endpoints (Cloudflare Access required) ────────────────
      const adminEmail = req.headers.get("Cf-Access-Authenticated-User-Email");
      const isAdminPath = url.pathname.startsWith("/api/admin/");
      if (isAdminPath && !adminEmail) return json({ error: "unauthorized" }, 401, cors);

      if (url.pathname === "/api/admin/queue" && req.method === "GET") {
        return json(await listPending(env), 200, cors);
      }
      const m = url.pathname.match(/^\/api\/admin\/squares\/([a-zA-Z0-9_-]+)$/);
      if (m && req.method === "POST") {
        return json(await moderate(m[1], adminEmail!, req, env), 200, cors);
      }

      return json({ error: "not_found" }, 404, cors);
    } catch (err: any) {
      // Surface validation errors verbatim; mask everything else.
      const known = err?.code === "validation" || err?.code === "rate_limit" || err?.code === "turnstile";
      const status = known ? (err.status ?? 400) : 500;
      const body = known ? { error: err.code, message: err.message } : { error: "server_error" };
      if (!known) console.error(err);
      return json(body, status, cors);
    }
  },
};

// ── submit ────────────────────────────────────────────────────────────

async function submitSquare(req: Request, env: Env) {
  const body = await req.json<any>().catch(() => ({}));

  // Validate Turnstile FIRST so we can bounce bots before touching the DB.
  const ip = req.headers.get("CF-Connecting-IP") ?? "0.0.0.0";
  await verifyTurnstile(body.turnstileToken, ip, env);

  // Rate limit by hashed IP. The hash uses a daily-rotated salt so we
  // can't reverse-derive the IP later.
  const ipHash = await hashIp(ip, env);
  await checkRateLimit(ipHash, env);

  // Validate creative payload.
  const square = validateSquare(body);

  // Insert. ULID gives us monotonic ordering for free.
  const id = ulid();
  const now = Math.floor(Date.now() / 1000);
  const ua = (req.headers.get("User-Agent") ?? "").slice(0, 200);

  await env.DB.prepare(
    `INSERT INTO squares (
       id, created_at, status,
       color_tl, color_tr, color_bl, color_br,
       word_tl, word_tr, word_bl, word_br,
       glyph, glyph_color, style_json,
       ip_hash, user_agent
     ) VALUES (?,?, 'pending', ?,?,?,?, ?,?,?,?, ?,?,?, ?,?)`
  )
    .bind(
      id, now,
      square.colors.tl, square.colors.tr, square.colors.bl, square.colors.br,
      square.words.tl, square.words.tr, square.words.bl, square.words.br,
      square.glyph, square.glyphColor, JSON.stringify(square.style),
      ipHash, ua
    )
    .run();

  return { id, status: "pending" };
}

// ── public list ───────────────────────────────────────────────────────

async function listApproved(url: URL, env: Env) {
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") ?? env.GALLERY_PAGE_SIZE, 10) || 60,
    200
  );
  const before = parseInt(url.searchParams.get("before") ?? "0", 10);

  const stmt = before > 0
    ? env.DB.prepare(
        `SELECT * FROM squares WHERE status='approved' AND created_at < ?
         ORDER BY created_at DESC LIMIT ?`
      ).bind(before, limit)
    : env.DB.prepare(
        `SELECT * FROM squares WHERE status='approved'
         ORDER BY created_at DESC LIMIT ?`
      ).bind(limit);

  const { results } = await stmt.all();
  return { squares: results.map(rowToPublic) };
}

async function getFeatured(env: Env) {
  const row = await env.DB.prepare(
    `SELECT s.* FROM featured f
     JOIN squares s ON s.id = f.square_id
     WHERE f.id = 1 AND s.status='approved'`
  ).first();
  return { square: row ? rowToPublic(row) : null };
}

// ── admin ─────────────────────────────────────────────────────────────

async function listPending(env: Env) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM squares WHERE status='pending' ORDER BY created_at ASC LIMIT 200`
  ).all();
  return { squares: results.map(rowToAdmin) };
}

async function moderate(id: string, email: string, req: Request, env: Env) {
  const body = await req.json<any>().catch(() => ({}));
  const action = body.action;
  if (action !== "approve" && action !== "reject") {
    throw validationError("action must be 'approve' or 'reject'");
  }
  const status = action === "approve" ? "approved" : "rejected";
  const now = Math.floor(Date.now() / 1000);
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 500) : null;

  const r = await env.DB.prepare(
    `UPDATE squares SET status=?, reviewed_at=?, reviewed_by=?, notes=?
     WHERE id=? AND status='pending'`
  )
    .bind(status, now, email, notes, id)
    .run();

  if (r.meta.changes === 0) throw validationError("square not found or already reviewed", 404);
  return { id, status };
}

// ── validation ────────────────────────────────────────────────────────

const HEX = /^#[0-9a-fA-F]{6}$/;
const WORD_MAX = 18;
const WORD_RE = /^[\p{L}\p{N}\s'’-]+$/u;
// Allowed glyphs must match the frontend's glyph library exactly — see
// src/assets/square-app/square-renderer.js (the GLYPHS object whose keys
// are the user-facing options). Any drift between this set and the
// frontend's keys → "invalid glyph" 400s on submission. Update both sides
// together when adding/removing glyphs. 2026-05-12: aligned with frontend.
const GLYPHS = new Set([
  "moon","sun","star","tree","mountain","wave","bird","flame","eye","seed",
  "compass","heart","spiral","hand","key",
]);

function validateSquare(b: any) {
  const colors = b?.colors ?? {};
  const words = b?.words ?? {};
  const style = b?.style ?? {};

  for (const k of ["tl", "tr", "bl", "br"]) {
    if (!HEX.test(colors[k] ?? "")) throw validationError(`colors.${k} must be hex`);
    const w = (words[k] ?? "").trim();
    // Empty words are allowed — a quadrant can render with no text. The
    // length / regex / profanity checks only apply to non-empty entries.
    if (w.length > WORD_MAX) throw validationError(`words.${k} too long`);
    if (w && !WORD_RE.test(w)) throw validationError(`words.${k} has invalid characters`);
    if (w && containsProfanity(w)) throw validationError(`words.${k} not allowed`);
  }
  if (!GLYPHS.has(b.glyph)) throw validationError("invalid glyph");
  if (!HEX.test(b.glyphColor ?? "")) throw validationError("glyphColor must be hex");

  // Style: validate the closed-vocabulary fields, ignore unknown.
  const cleanStyle = {
    gradient:    pickEnum(style.gradient,    ["subtle", "strong", "flat"], "subtle"),
    fillStyle:   pickEnum(style.fillStyle,   ["filled", "line"], "filled"),
    scenery:     pickEnum(style.scenery,     ["stars", "trees", "city", "none"], "stars"),
    fontFamily:  pickEnum(style.fontFamily,  ["serif", "sans", "mono"], "serif"),
    showDividers: !!style.showDividers,
    showBorder:   !!style.showBorder,
    cornerRadius: clampInt(style.cornerRadius, 0, 48, 0),
  };

  return {
    colors: { tl: colors.tl, tr: colors.tr, bl: colors.bl, br: colors.br },
    words:  { tl: words.tl.trim(), tr: words.tr.trim(), bl: words.bl.trim(), br: words.br.trim() },
    glyph: b.glyph,
    glyphColor: b.glyphColor,
    style: cleanStyle,
  };
}

function pickEnum<T extends string>(v: any, allowed: T[], dflt: T): T {
  return allowed.includes(v) ? v : dflt;
}
function clampInt(v: any, lo: number, hi: number, dflt: number) {
  const n = parseInt(v, 10);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(lo, Math.min(hi, n));
}

// Stub profanity filter. The next Claude / a human should replace this
// with a real list. Keep it boring; the moderator catches edge cases.
const BLOCKLIST = ["badword1", "badword2"]; // placeholder
function containsProfanity(s: string) {
  const lower = s.toLowerCase();
  return BLOCKLIST.some((w) => lower.includes(w));
}

// ── turnstile ─────────────────────────────────────────────────────────

async function verifyTurnstile(token: string | undefined, ip: string, env: Env) {
  if (!token) throw turnstileError("missing token");
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET);
  form.append("response", token);
  form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = await res.json<any>();
  if (!data?.success) throw turnstileError("turnstile failed");
}

// ── rate limit ────────────────────────────────────────────────────────

async function checkRateLimit(ipHash: string, env: Env) {
  const window = parseInt(env.RATE_LIMIT_WINDOW_SECONDS, 10) || 3600;
  const max = parseInt(env.RATE_LIMIT_MAX_PER_WINDOW, 10) || 1;
  const since = Math.floor(Date.now() / 1000) - window;

  const row = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM squares WHERE ip_hash=? AND created_at>=?`
  ).bind(ipHash, since).first<{ n: number }>();

  if ((row?.n ?? 0) >= max) {
    const err: any = new Error(`rate limit: ${max} per ${window}s`);
    err.code = "rate_limit"; err.status = 429;
    throw err;
  }
}

async function hashIp(ip: string, env: Env): Promise<string> {
  const day = new Date().toISOString().slice(0, 10);
  let row = await env.DB.prepare(`SELECT salt FROM ip_salts WHERE day=?`).bind(day).first<{ salt: string }>();
  if (!row) {
    const salt = randomHex(32);
    await env.DB.prepare(`INSERT OR IGNORE INTO ip_salts (day, salt) VALUES (?, ?)`).bind(day, salt).run();
    row = await env.DB.prepare(`SELECT salt FROM ip_salts WHERE day=?`).bind(day).first<{ salt: string }>();
    // Best-effort cleanup of salts older than 7 days.
    const cutoff = new Date(Date.now() - 7 * 86400_000).toISOString().slice(0, 10);
    await env.DB.prepare(`DELETE FROM ip_salts WHERE day < ?`).bind(cutoff).run();
  }
  return await sha256Hex(`${ip}:${row!.salt}`);
}

// ── helpers ───────────────────────────────────────────────────────────

function rowToPublic(r: any) {
  return {
    id: r.id,
    createdAt: r.created_at,
    colors: { tl: r.color_tl, tr: r.color_tr, bl: r.color_bl, br: r.color_br },
    words:  { tl: r.word_tl,  tr: r.word_tr,  bl: r.word_bl,  br: r.word_br  },
    glyph: r.glyph,
    glyphColor: r.glyph_color,
    style: safeJSON(r.style_json, {}),
  };
}
function rowToAdmin(r: any) {
  return { ...rowToPublic(r), userAgent: r.user_agent };
}

function safeJSON<T>(s: string, dflt: T): T {
  try { return JSON.parse(s); } catch { return dflt; }
}

function validationError(msg: string, status = 400) {
  const e: any = new Error(msg); e.code = "validation"; e.status = status; return e;
}
function turnstileError(msg: string) {
  const e: any = new Error(msg); e.code = "turnstile"; e.status = 400; return e;
}

function corsHeaders(req: Request, env: Env): HeadersInit {
  const origin = req.headers.get("Origin") ?? "";
  const allowed = env.ALLOW_ORIGINS.split(",").map((s) => s.trim());
  const ok = allowed.includes(origin) || allowed.includes("*");
  return {
    "Access-Control-Allow-Origin": ok ? origin : allowed[0] ?? "",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

// ── crypto / id helpers ───────────────────────────────────────────────

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Crockford-base32 ULID. Sortable, URL-safe, no deps.
function ulid(): string {
  const ENC = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  let t = Date.now();
  let timePart = "";
  for (let i = 0; i < 10; i++) { timePart = ENC[t % 32] + timePart; t = Math.floor(t / 32); }
  const rand = new Uint8Array(10);
  crypto.getRandomValues(rand);
  let randPart = "";
  for (const b of rand) randPart += ENC[b % 32];
  return timePart + randPart;
}
