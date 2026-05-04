/**
 * admin-queue.js — moderation interface.
 *
 * Loaded only on /admin/queue, which MUST be gated by Cloudflare Access.
 * Lists pending submissions and exposes Approve / Reject buttons.
 */

import { renderSquare } from "./square-renderer.js";

const state = {
  pending: [],
  loading: true,
  error: null,
  acting: new Set(),  // ids currently being approved/rejected
};

let root, apiBase;

function h(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, String(v));
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  return node;
}

function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }

// ─── render ─────────────────────────────────────────────────────────────────

function render() {
  if (!root) return;
  clear(root);

  if (state.loading && state.pending.length === 0) {
    root.appendChild(h("div", { class: "sq-gallery__loading" }, "Loading queue…"));
    return;
  }
  if (state.error) {
    root.appendChild(h("div", { class: "sq-gallery__error" }, [
      `Error: ${state.error}. `,
      h("button", { class: "sq-link", onClick: load }, "Retry."),
    ]));
    return;
  }
  if (state.pending.length === 0) {
    root.appendChild(h("div", { class: "sq-gallery__empty" }, "Queue empty. ✓"));
    return;
  }

  root.appendChild(h("div", { class: "sq-admin__count" },
    `${state.pending.length} pending`));

  const list = h("div", { class: "sq-admin__list" });
  for (const sq of state.pending) list.appendChild(renderRow(sq));
  root.appendChild(list);
}

function renderRow(sq) {
  const acting = state.acting.has(sq.id);
  const wordsLine = [sq.words.tl, sq.words.tr, sq.words.bl, sq.words.br]
    .filter(Boolean).join(" · ");

  const svgWrap = h("div", { class: "sq-admin__square" });
  svgWrap.appendChild(renderSquare({
    words:  [sq.words.tl,  sq.words.tr,  sq.words.bl,  sq.words.br],
    colors: [sq.colors.tl, sq.colors.tr, sq.colors.bl, sq.colors.br],
    glyph: sq.glyph,
    glyphColor: sq.glyphColor,
    fillStyle:    sq.style?.fillStyle    ?? "filled",
    gradient:     sq.style?.gradient     ?? "subtle",
    scenery:      sq.style?.scenery      ?? "stars",
    showDividers: sq.style?.showDividers ?? true,
    showBorder:   sq.style?.showBorder   ?? true,
    cornerRadius: sq.style?.cornerRadius ?? 0,
    fontFamily:   sq.style?.fontFamily   ?? "'Fraunces', serif",
    size: 280,
  }));

  return h("div", { class: "sq-admin__row" }, [
    svgWrap,
    h("div", { class: "sq-admin__meta" }, [
      h("div", { class: "sq-admin__words" }, wordsLine || "(no words)"),
      h("div", { class: "sq-admin__id" }, [
        h("code", {}, sq.id),
        " · ",
        formatDate(sq.createdAt),
      ]),
      sq.userAgent ? h("div", { class: "sq-admin__ua" }, sq.userAgent) : null,
      h("div", { class: "sq-admin__actions" }, [
        h("button", {
          class: "sq-btn sq-btn--approve",
          disabled: acting ? "" : null,
          onClick: () => moderate(sq.id, "approve"),
        }, acting ? "…" : "Approve"),
        h("button", {
          class: "sq-btn sq-btn--reject",
          disabled: acting ? "" : null,
          onClick: () => moderate(sq.id, "reject"),
        }, "Reject"),
      ]),
    ]),
  ]);
}

function formatDate(unix) {
  if (!unix) return "";
  return new Date(unix * 1000).toLocaleString();
}

// ─── data ───────────────────────────────────────────────────────────────────

async function load() {
  state.loading = true; state.error = null;
  render();
  try {
    const res = await fetch(`${apiBase}/admin/queue`, { credentials: "include" });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    state.pending = data.squares || [];
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

async function moderate(id, action) {
  state.acting.add(id);
  render();
  try {
    const res = await fetch(`${apiBase}/admin/squares/${id}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    state.pending = state.pending.filter((s) => s.id !== id);
  } catch (err) {
    alert(`Failed to ${action}: ${err.message}`);
  } finally {
    state.acting.delete(id);
    render();
  }
}

// ─── boot ───────────────────────────────────────────────────────────────────

function boot() {
  root = document.getElementById("admin-queue");
  if (!root) return;
  apiBase = root.dataset.apiBase || "/api";
  load();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
