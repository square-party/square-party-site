/**
 * gallery.js — public gallery view.
 *
 * Fetches /api/squares (paginated), renders a responsive mosaic, opens a
 * lightbox on click. Hover/tap pops a tile to scale 1.45×.
 */

import { renderSquare } from "./square-renderer.js";

const state = {
  squares: [],
  loading: true,
  error: null,
  hasMore: false,
  oldestSeen: 0,
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

function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

// ─── render ─────────────────────────────────────────────────────────────────

function render() {
  if (!root) return;
  clear(root);

  if (state.loading && state.squares.length === 0) {
    root.appendChild(h("div", { class: "sq-gallery__loading" }, "Loading the gallery…"));
    return;
  }
  if (state.error && state.squares.length === 0) {
    root.appendChild(h("div", { class: "sq-gallery__error" }, [
      "Couldn't load the gallery. ",
      h("button", { class: "sq-link", onClick: load }, "Try again."),
    ]));
    return;
  }
  if (state.squares.length === 0) {
    root.appendChild(h("div", { class: "sq-gallery__empty" }, [
      "No squares yet. ",
      h("a", { href: "/square/" }, "Be the first."),
    ]));
    return;
  }

  // Update count badge if present.
  const countEl = document.querySelector("#square-count [data-count]");
  if (countEl) countEl.textContent = String(state.squares.length);

  const grid = h("div", { class: "sq-gallery" });
  for (const sq of state.squares) {
    grid.appendChild(renderTile(sq));
  }
  root.appendChild(grid);

  if (state.hasMore) {
    root.appendChild(h("div", { class: "sq-gallery__more" }, [
      h("button", {
        class: "sq-btn",
        disabled: state.loading ? "" : null,
        onClick: loadMore,
      }, state.loading ? "Loading…" : "Load more"),
    ]));
  }
}

function renderTile(sq) {
  const tile = h("button", {
    class: "sq-tile",
    "aria-label": `Square by ${sq.words.tl} ${sq.words.tr} ${sq.words.bl} ${sq.words.br}`,
    onClick: () => openLightbox(sq),
  });
  tile.appendChild(renderSquareForGallery(sq, 220));
  return tile;
}

/**
 * Render a square at a given size. Each call generates a fresh SVG so we
 * don't share <defs> IDs across tiles.
 */
function renderSquareForGallery(sq, size) {
  return renderSquare({
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
    fontFamily:   resolveFont(sq.style?.fontFamily),
    size,
  });
}

function resolveFont(f) {
  if (!f) return "'Fraunces', serif";
  // Defensive: server validates against a known set, but still accept legacy.
  return f;
}

// ─── lightbox ───────────────────────────────────────────────────────────────

function openLightbox(sq) {
  const overlay = h("div", { class: "sq-lightbox", onClick: close });
  const card = h("div", {
    class: "sq-lightbox__card",
    onClick: (e) => e.stopPropagation(),
  });
  card.appendChild(renderSquareForGallery(sq, 720));
  card.appendChild(h("div", { class: "sq-lightbox__meta" }, [
    formatDate(sq.createdAt),
  ]));
  overlay.appendChild(card);
  overlay.appendChild(h("button", { class: "sq-lightbox__close", onClick: close, "aria-label": "Close" }, "×"));
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  function close() {
    overlay.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
  }
  function onKey(e) { if (e.key === "Escape") close(); }
  document.addEventListener("keydown", onKey);
}

function formatDate(unix) {
  if (!unix) return "";
  const d = new Date(unix * 1000);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// ─── data ───────────────────────────────────────────────────────────────────

async function load() {
  state.loading = true;
  state.error = null;
  state.squares = [];
  state.oldestSeen = 0;
  render();

  try {
    const res = await fetch(`${apiBase}/squares?limit=60`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to load");
    state.squares = data.squares || [];
    state.oldestSeen = state.squares.at(-1)?.createdAt ?? 0;
    state.hasMore = state.squares.length >= 60;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

async function loadMore() {
  if (state.loading) return;
  state.loading = true;
  render();
  try {
    const res = await fetch(`${apiBase}/squares?limit=60&before=${state.oldestSeen}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to load");
    const next = data.squares || [];
    state.squares = state.squares.concat(next);
    state.oldestSeen = state.squares.at(-1)?.createdAt ?? state.oldestSeen;
    state.hasMore = next.length >= 60;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

// ─── boot ───────────────────────────────────────────────────────────────────

function boot() {
  root = document.getElementById("square-gallery");
  if (!root) return;
  apiBase = root.dataset.apiBase || "/api";
  load();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
