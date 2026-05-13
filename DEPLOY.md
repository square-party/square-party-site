# Deploy reference

How squareparty.org is actually served, and what you run to update it.
Last verified 2026-05-12.

---

## What lives where

The site is served by **three things in Cloudflare**, working together:

| Component | Type | Job | Source | Custom domain |
|---|---|---|---|---|
| `square-party-site` | **Pages project** | Serves all static content — the actual website pages | Auto-built from GitHub on push | `squareparty.org` ✓ |
| `square-generator` | **Worker** | Serves `/api/*` — square submission, gallery API, admin moderation. Talks to D1 + Turnstile. | `square-generator-backend/worker/` in this repo | Bound via Worker Route `squareparty.org/api/*` |
| `square-party` | **Worker** | Nothing useful. Deployed by `npm run deploy` but not bound to any domain. Dead code; ignore. | Root `wrangler.jsonc` | None |

**Cloudflare routing precedence:** Worker Routes beat Pages custom domains for matching paths. So `squareparty.org/api/*` goes to `square-generator`, and everything else falls through to the Pages project. They coexist cleanly.

---

## Normal workflow — updating the website

This is what you do 95% of the time. Site content, styling, copy, new pages, etc.

```bash
# 1. Build locally for preview
npm run build

# 2. Preview at http://localhost:8080
npm run dev

# 3. When ready, commit + push to GitHub
git add .
git commit -m "..."
git push
```

The push triggers **Cloudflare Pages' auto-build** on GitHub integration. Pages runs the Eleventy build server-side and deploys the result to `squareparty.org`. Usually visible within a minute or two.

**You do NOT need to run `npm run deploy` for site updates.** That script deploys the unused `square-party` Worker — does nothing meaningful for what visitors see.

---

## Worker workflow — updating the API (rare)

When you change something inside `square-generator-backend/worker/` (the API logic for square submission, gallery, admin moderation, validation rules, etc.):

```bash
cd square-generator-backend/worker
npx wrangler deploy -c wrangler.toml
```

**Always use the `-c wrangler.toml` flag** when running wrangler commands from this subdirectory. Without it, wrangler climbs up the directory tree and finds the root `wrangler.jsonc` instead, silently targeting the wrong Worker. (See the gotcha note below.)

Successful deploy output ends with something like `✨ Deployed square-generator triggers ...`.

---

## Worker setup — secrets and bindings (one-time)

If a Worker is misbehaving or being set up fresh:

### Check what's bound

```bash
cd square-generator-backend/worker
npx wrangler secret list -c wrangler.toml
npx wrangler deployments list -c wrangler.toml
```

### Set the Turnstile secret

```bash
cd square-generator-backend/worker
npx wrangler secret put TURNSTILE_SECRET -c wrangler.toml
# (paste secret when prompted; from Cloudflare → Turnstile → site settings)
```

### Inspect D1 directly

```bash
cd square-generator-backend/worker
npx wrangler d1 execute squares --remote -c wrangler.toml --command="SELECT * FROM squares LIMIT 5"
```

Use `--remote` to hit production data; without it you'd hit a local fixture which doesn't exist for this setup.

---

## Gotchas

**`npm run deploy` is misleading.** The script is `npm run build && wrangler deploy` — it deploys the `square-party` Worker (per root `wrangler.jsonc`) which isn't bound to anything. The site updates via GitHub → Pages, NOT via this script. Consider removing or renaming the script in `package.json` if it keeps confusing you.

**Wrangler config discovery picks the wrong file.** Running `wrangler deploy` from `square-generator-backend/worker/` finds the root `wrangler.jsonc` first and silently targets the static-site Worker instead. Always pass `-c wrangler.toml` explicitly.

**workers.dev URLs are disabled.** Both `square-party.paulplonski.workers.dev` and `square-generator.paulplonski.workers.dev` are inactive on purpose. Don't test on them — they don't have the production routing. Always test on `squareparty.org`.

**Glyph allowlist must stay in sync.** The frontend's glyph library (`src/assets/square-app/square-renderer.js`, the `GLYPHS` object's keys) and the Worker's validator (`square-generator-backend/worker/src/index.ts`, the `GLYPHS` Set) must contain the same names. Adding a glyph to one without updating the other = "invalid glyph" 400s on submit.

---

## Dashboard quick links

For when you need to inspect or change something Cloudflare-side:

- Pages project: dashboard → Workers & Pages → `square-party-site`
- API Worker: dashboard → Workers & Pages → `square-generator`
- D1 database: dashboard → Workers & Pages → D1 → `squares`
- Worker Routes: dashboard → squareparty.org zone → Workers Routes
- Turnstile: dashboard → Turnstile → site settings
