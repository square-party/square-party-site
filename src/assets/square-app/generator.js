/**
 * generator.js — vanilla-JS Square generator UI.
 *
 * Mounts into <div id="square-app" data-api-base="..."> and submits to
 * `${apiBase}/squares` POST with the validated payload + Turnstile token.
 *
 * No frameworks. ~600 lines. Same UX as the prototype:
 *   - live preview on left, controls on right (or stacked on mobile)
 *   - tabs: Colors / Words / Glyph / Style
 *   - tap-quadrant focusing
 *   - shuffle randomizer
 *   - post-submit reveal with PNG + SVG download
 */

import { renderSquare, GLYPH_KEYS, GLYPHS, lighten, darken } from "./square-renderer.js";
import { THEME_LABELS, pickFourFromTheme } from "./word-suggestions.js";

// ─── defaults ───────────────────────────────────────────────────────────────

const DEFAULT_COLORS = ["#1c2230", "#22202c", "#1e2a2c", "#262626"];
const DEFAULT_WORDS  = ["", "", "", ""];
const QUADRANT_LABELS = ["Top-left", "Top-right", "Bottom-left", "Bottom-right"];

const DEFAULT_STYLE = {
  fillStyle: "filled",
  gradient: "subtle",
  scenery: "stars",
  showDividers: true,
  showBorder: true,
  cornerRadius: 0,
  fontFamily: "'Fraunces', serif",
};

// ─── color helpers (HSL ↔ hex) ──────────────────────────────────────────────

function hexToHsl(hex) {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  let r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1/3);
  }
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ─── DOM micro-helper ───────────────────────────────────────────────────────

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

// ─── download helpers ───────────────────────────────────────────────────────

function svgToString(svgEl) {
  const clone = svgEl.cloneNode(true);
  clone.querySelectorAll("[style*='cursor']").forEach((el) => { el.style.cursor = ""; });
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return new XMLSerializer().serializeToString(clone);
}

function downloadSVG(svgEl, filename) {
  const blob = new Blob([svgToString(svgEl)], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = h("a", { href: url, download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function downloadPNG(svgEl, filename, size = 1600) {
  const str = svgToString(svgEl);
  const svg64 = btoa(unescape(encodeURIComponent(str)));
  const img = new Image();
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    c.getContext("2d").drawImage(img, 0, 0, size, size);
    c.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = h("a", { href: url, download: filename });
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  };
  img.src = `data:image/svg+xml;base64,${svg64}`;
}

// ─── state ──────────────────────────────────────────────────────────────────

const state = {
  words: [...DEFAULT_WORDS],
  colors: [...DEFAULT_COLORS],
  glyph: "spiral",
  glyphColor: "#eaeaea",
  style: { ...DEFAULT_STYLE },
  activeQ: 0,
  tab: "colors",
  recent: [],
  submitted: false,
  submittedId: null,
  submitting: false,
  submitError: null,
};

let root, apiBase;
let turnstileWidgetId = null;

// ─── render orchestration ───────────────────────────────────────────────────

function render() {
  if (!root) return;
  clear(root);
  root.appendChild(state.submitted ? renderReveal() : renderEditor());
}

function renderEditor() {
  return h("div", { class: "gen" }, [
    renderPreview(),
    h("div", { class: "gen__controls" }, [
      h("div", { class: "gen__header" }, [
        h("div", {}, [
          h("div", { class: "gen__eyebrow" }, "make your square"),
          h("h2", { class: "gen__title" }, "Four corners. Make it yours. Submit to download and add it to the gallery."),
        ]),
        h("button", { class: "gen__random", onClick: shuffle, title: "Randomize" }, [
          h("span", {}, "⤬"), " shuffle",
        ]),
      ]),
      renderTabs(),
      h("div", { class: "gen__panel" }, renderTabPanel()),
      renderSubmitButton(),
    ]),
  ]);
}

function renderPreview() {
  const svg = renderSquare({
    words: state.words,
    colors: state.colors,
    glyph: state.glyph,
    glyphColor: state.glyphColor,
    ...state.style,
    size: 520,
    onQuadrantClick: (i) => { state.activeQ = i; state.tab = "colors"; render(); },
    activeQuadrant: (state.tab === "colors" || state.tab === "words") ? state.activeQ : -1,
  });

  return h("div", { class: "gen__preview" }, [
    h("div", { class: "gen__preview-inner" }, svg),
    h("div", { class: "gen__hint" },
      state.submitted
        ? "Beautiful. Pending review."
        : "Tap a quadrant to edit it ◇ Use the controls to refine"
    ),
  ]);
}

function renderTabs() {
  return h("div", { class: "gen__tabs" },
    ["colors", "words", "glyph", "style"].map((t) =>
      h("button", {
        class: `gen__tab ${state.tab === t ? "is-active" : ""}`,
        onClick: () => { state.tab = t; render(); },
      }, t)
    )
  );
}

function renderTabPanel() {
  switch (state.tab) {
    case "colors": return renderColorsTab();
    case "words":  return renderWordsTab();
    case "glyph":  return renderGlyphTab();
    case "style":  return renderStyleTab();
  }
}

// ─── tab: colors ────────────────────────────────────────────────────────────

function renderColorsTab() {
  return h("div", {}, [
    h("div", { class: "gen__quad-row" },
      state.colors.map((c, i) =>
        h("button", {
          class: `gen__quad ${state.activeQ === i ? "is-active" : ""}`,
          onClick: () => { state.activeQ = i; render(); },
        }, [
          h("span", { class: "gen__quad-sw", style: { background: c } }),
          h("span", { class: "gen__quad-label" }, QUADRANT_LABELS[i]),
        ])
      )
    ),
    renderColorPicker(state.colors[state.activeQ], (c) => setColor(state.activeQ, c), state.recent),
  ]);
}

function setColor(i, c) {
  state.colors[i] = c;
  state.recent = [c, ...state.recent.filter((x) => x !== c)].slice(0, 12);
  render();
}

function renderColorPicker(value, onChange, recent) {
  const [hh, ss, ll] = hexToHsl(value);
  const set = (nh, ns, nl) => onChange(hslToHex(nh, ns, nl));

  const SUGGESTED = [
    "#321e5c", "#3d1020", "#0a3626", "#0a2a52",
    "#5c2e1e", "#1e3d3d", "#2d1e5c", "#5c1e3d",
    "#6b4e2c", "#0d4d3a", "#3d2c5c", "#5c4a2c",
    "#8b3a1f", "#1a4d6b", "#3d3a1e", "#2c5c4a",
  ];

  const hexInput = h("input", {
    class: "cp__hex", value: value.toUpperCase(), spellcheck: "false",
    onInput: (e) => {
      const v = e.target.value;
      if (/^#?[0-9a-f]{0,6}$/i.test(v)) {
        const norm = v.startsWith("#") ? v : `#${v}`;
        if (norm.length === 7) onChange(norm);
      }
    },
  });

  return h("div", { class: "cp" }, [
    h("div", { class: "cp__swatch-row" }, [
      h("div", { class: "cp__swatch-big", style: { background: value } }),
      hexInput,
    ]),
    sliderRow("Hue", 0, 360, Math.round(hh), "cp__slider--hue", null,
              (v) => set(v, ss, ll)),
    sliderRow("Saturation", 0, 100, Math.round(ss), "",
              `linear-gradient(to right, ${hslToHex(hh, 0, ll)}, ${hslToHex(hh, 100, ll)})`,
              (v) => set(hh, v, ll)),
    sliderRow("Brightness", 0, 100, Math.round(ll), "",
              `linear-gradient(to right, #000, ${hslToHex(hh, ss, 50)}, #fff)`,
              (v) => set(hh, ss, v)),
    h("div", { class: "cp__suggested" }, [
      h("div", { class: "cp__sub" }, "Suggestions"),
      h("div", { class: "cp__swatches" },
        SUGGESTED.map((c) =>
          h("button", {
            class: `cp__sw ${c === value.toLowerCase() ? "is-active" : ""}`,
            style: { background: c },
            title: c, "aria-label": `Pick ${c}`,
            onClick: () => onChange(c),
          })
        )
      ),
    ]),
    recent.length > 0 ? h("div", { class: "cp__suggested" }, [
      h("div", { class: "cp__sub" }, "Recent"),
      h("div", { class: "cp__swatches" },
        recent.slice(0, 12).map((c) =>
          h("button", {
            class: "cp__sw", style: { background: c }, title: c,
            onClick: () => onChange(c),
          })
        )
      ),
    ]) : null,
  ]);
}

function sliderRow(label, min, max, value, extraCls, bg, onInput) {
  const input = h("input", {
    type: "range", min, max, value,
    class: `cp__slider ${extraCls || ""}`,
    onInput: (e) => onInput(+e.target.value),
  });
  if (bg) input.style.background = bg;
  return h("div", { class: "cp__slider-wrap" }, [
    h("label", { class: "cp__label" }, label),
    input,
  ]);
}

// ─── tab: words ─────────────────────────────────────────────────────────────

function renderWordsTab() {
  return h("div", { class: "gen__words" }, [
    h("div", { class: "gen__sub" }, "Need a starting point?"),
    h("div", { class: "gen__themes" },
      Object.entries(THEME_LABELS).map(([key, label]) =>
        h("button", {
          class: "gen__theme-btn",
          title: `Fill all 4 with ${label.toLowerCase()}`,
          onClick: () => { state.words = pickFourFromTheme(key); render(); },
        }, label)
      )
    ),
    h("div", { class: "gen__theme-hint" },
      "Click a theme to fill all four. Click again to re-roll."),
    h("div", { class: "gen__sub", style: { marginTop: "22px" } }, "Your words"),
    ...state.words.map((w, i) => renderWordInput(i, w)),
    h("div", { class: "gen__words-hint" },
      "Optional. 1–12 characters each. Words, names, jokes — anything."),
  ]);
}

function renderWordInput(i, value) {
  return h("div", { class: "wi" }, [
    h("label", { class: "wi__label" }, QUADRANT_LABELS[i]),
    h("input", {
      class: "wi__input", type: "text", maxlength: "12",
      value, placeholder: "—", spellcheck: "false",
      onInput: (e) => {
        state.words[i] = e.target.value;
        // Update preview without rebuilding the whole panel (keeps cursor stable).
        partialPreviewUpdate();
        // Update char count.
        const count = e.target.parentElement.querySelector(".wi__count");
        if (count) count.textContent = `${(e.target.value || "").length}/12`;
      },
    }),
    h("div", { class: "wi__count" }, `${(value || "").length}/12`),
  ]);
}

function partialPreviewUpdate() {
  const previewInner = root.querySelector(".gen__preview-inner");
  if (!previewInner) { render(); return; }
  clear(previewInner);
  previewInner.appendChild(renderSquare({
    words: state.words,
    colors: state.colors,
    glyph: state.glyph,
    glyphColor: state.glyphColor,
    ...state.style,
    size: 520,
    onQuadrantClick: (i) => { state.activeQ = i; state.tab = "colors"; render(); },
    activeQuadrant: (state.tab === "colors" || state.tab === "words") ? state.activeQ : -1,
  }));
}

// ─── tab: glyph ─────────────────────────────────────────────────────────────

function renderGlyphTab() {
  return h("div", {}, [
    h("div", { class: "gen__sub" }, "Choose your central light"),
    renderGlyphGrid(state.glyph, state.glyphColor, (g) => { state.glyph = g; render(); }),
    h("div", { class: "gen__sub", style: { marginTop: "24px" } }, "Light color"),
    renderColorPicker(state.glyphColor, (c) => { state.glyphColor = c; render(); }, []),
  ]);
}

function renderGlyphGrid(activeKey, color, onPick) {
  const cells = GLYPH_KEYS.map((k) => {
    // Build a tiny SVG preview using the renderer's glyph functions directly.
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    const defs = document.createElementNS(NS, "defs");
    const haloId = `gp-${k}-halo`;
    const faceId = `gp-${k}-face`;
    defs.innerHTML = `
      <radialGradient id="${haloId}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.5" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="${faceId}" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.7" />
      </radialGradient>
    `;
    svg.appendChild(defs);

    // The renderer's glyph fns expect a uid and reference `${uid}-halo`/`${uid}-face`
    // — we constructed defs with those exact IDs above, using key `gp-${k}` as uid.
    const nodes = (GLYPHS[k] || GLYPHS.moon)(50, 50, 22, color, "filled", `gp-${k}`);
    for (const n of nodes) svg.appendChild(n);

    return h("button", {
      class: `gp__cell ${k === activeKey ? "is-active" : ""}`,
      "aria-label": k, title: k,
      onClick: () => onPick(k),
    }, svg);
  });

  return h("div", { class: "gp" }, cells);
}

// ─── tab: style ─────────────────────────────────────────────────────────────

function renderStyleTab() {
  const seg = (key, options) =>
    h("div", { class: "sc__seg" },
      options.map((o) =>
        h("button", {
          class: `sc__seg-btn ${state.style[key] === o.value ? "is-active" : ""}`,
          onClick: () => { state.style[key] = o.value; render(); },
        }, o.label)
      )
    );

  return h("div", { class: "gen__style" }, [
    h("div", { class: "sc" }, [
      row("Gradient",  seg("gradient", [
        { label: "Subtle", value: "subtle" },
        { label: "Strong", value: "strong" },
        { label: "Flat",   value: "flat"   },
      ])),
      row("Glyph", seg("fillStyle", [
        { label: "Filled", value: "filled" },
        { label: "Line",   value: "line"   },
      ])),
      row("Backdrop", seg("scenery", [
        { label: "Stars", value: "stars" },
        { label: "Trees", value: "trees" },
        { label: "City",  value: "city"  },
        { label: "None",  value: "none"  },
      ])),
      row("Font", seg("fontFamily", [
        { label: "Serif", value: "'Fraunces', serif" },
        { label: "Sans",  value: "'Space Grotesk', sans-serif" },
        { label: "Mono",  value: "'JetBrains Mono', monospace" },
      ])),
      row("Corners", h("input", {
        type: "range", min: "0", max: "40", step: "2",
        value: state.style.cornerRadius,
        class: "cp__slider",
        onInput: (e) => { state.style.cornerRadius = +e.target.value; render(); },
      })),
      h("div", { class: "sc__row sc__row--toggles" }, [
        toggleBtn("showDividers", "Dividers"),
        toggleBtn("showBorder",   "Border"),
      ]),
    ]),
  ]);
}

function row(label, body) {
  return h("div", { class: "sc__row" }, [
    h("div", { class: "sc__lbl" }, label),
    body,
  ]);
}

function toggleBtn(key, label) {
  const on = !!state.style[key];
  return h("button", {
    class: `sc__toggle ${on ? "is-on" : ""}`,
    onClick: () => { state.style[key] = !on; render(); },
  }, [
    h("span", { class: "sc__check" }, on ? "✓" : ""),
    " ", label,
  ]);
}

// ─── shuffle ────────────────────────────────────────────────────────────────

function shuffle() {
  const baseH = Math.random() * 360;
  state.colors = [0, 1, 2, 3].map((i) => {
    const hue = (baseH + i * 90 + (Math.random() - 0.5) * 30) % 360;
    const s = 30 + Math.random() * 50;
    const l = 12 + Math.random() * 18;
    return hslToHex(hue, s, l);
  });
  const glyphHues = [200, 40, 280, 0, 140];
  const gh = glyphHues[Math.floor(Math.random() * glyphHues.length)];
  state.glyphColor = hslToHex(gh, 30 + Math.random() * 40, 75 + Math.random() * 15);
  state.glyph = GLYPH_KEYS[Math.floor(Math.random() * GLYPH_KEYS.length)];
  render();
}

// ─── submit ─────────────────────────────────────────────────────────────────

function renderSubmitButton() {
  const wrap = h("div", {}, []);

  if (state.submitError) {
    wrap.appendChild(h("div", { class: "gen__submit-error" }, state.submitError));
  }

  // Turnstile mount target. We render the widget once, lazily.
  const turnstileSlot = h("div", { id: "square-turnstile-slot", class: "gen__turnstile" });
  wrap.appendChild(turnstileSlot);

  wrap.appendChild(h("button", {
    class: "gen__submit",
    disabled: state.submitting ? "" : null,
    onClick: handleSubmit,
  }, [
    h("span", { class: "gen__submit-label" },
      state.submitting ? "Submitting…" : "Submit my square"),
    h("span", { class: "gen__submit-sub" },
      "A copy is yours immediately. Public gallery after review."),
  ]));

  // Lazy-init Turnstile once the slot is in the DOM.
  setTimeout(() => initTurnstile(turnstileSlot), 0);

  return wrap;
}

function initTurnstile(slot) {
  const widget = document.getElementById("square-turnstile");
  if (!widget || !window.turnstile) return;

  // If we previously mounted but render() wiped the DOM (clear(root) on
  // every state change), the iframe is gone but turnstileWidgetId still
  // holds the stale id. Detect and re-mount fresh.
  if (turnstileWidgetId !== null) {
    if (slot.querySelector("iframe")) return; // still mounted, no-op
    try { window.turnstile.remove(turnstileWidgetId); } catch (e) { /* ignore */ }
    turnstileWidgetId = null;
  }

  const sitekey = widget.dataset.sitekey;
  if (!sitekey) {
    console.warn("[square] Turnstile sitekey missing — submissions will fail.");
    return;
  }
  turnstileWidgetId = window.turnstile.render(slot, {
    sitekey,
    theme: "dark",
    size: "flexible",
  });
}

async function handleSubmit() {
  if (state.submitting) return;
  state.submitError = null;

  // Basic client-side validation. Server validates again — never trust this.
  // Empty words are allowed (a quadrant can render with no text); per-word
  // length/regex/profanity checks still apply server-side for non-empty entries.

  const token = window.turnstile?.getResponse(turnstileWidgetId);
  if (!token) {
    state.submitError = "Please complete the verification challenge above.";
    render();
    return;
  }

  state.submitting = true;
  render();

  try {
    const res = await fetch(`${apiBase}/squares`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        colors: { tl: state.colors[0], tr: state.colors[1], bl: state.colors[2], br: state.colors[3] },
        words:  { tl: state.words[0],  tr: state.words[1],  bl: state.words[2],  br: state.words[3]  },
        glyph: state.glyph,
        glyphColor: state.glyphColor,
        style: state.style,
        turnstileToken: token,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || data?.error || "Submission failed");
    state.submitted = true;
    state.submittedId = data.id;
  } catch (err) {
    state.submitError = err.message || "Something went wrong.";
    // Reset Turnstile so they can re-verify.
    window.turnstile?.reset(turnstileWidgetId);
  } finally {
    state.submitting = false;
    render();
  }
}

// ─── reveal ─────────────────────────────────────────────────────────────────

function renderReveal() {
  const previewWrap = h("div", { class: "gen__reveal-mini" });
  const previewSvg = renderSquare({
    words: state.words,
    colors: state.colors,
    glyph: state.glyph,
    glyphColor: state.glyphColor,
    ...state.style,
    size: 320,
  });
  previewWrap.appendChild(previewSvg);

  return h("div", { class: "gen" }, [
    renderPreview(),
    h("div", { class: "gen__reveal" }, [
      h("div", { class: "gen__reveal-eyebrow" }, "submitted ✦"),
      h("h2", { class: "gen__reveal-title" }, "Your square is yours."),
      h("p", { class: "gen__reveal-body" },
        "It'll join the gallery once we've taken a look — usually within a day. In the meantime, take it with you."),
      previewWrap,
      h("div", { class: "gen__reveal-actions" }, [
        h("button", {
          class: "gen__btn gen__btn--primary",
          onClick: () => downloadPNG(previewSvg, `my-square-${Date.now()}.png`, 1600),
        }, "Download PNG"),
        h("button", {
          class: "gen__btn",
          onClick: () => downloadSVG(previewSvg, `my-square-${Date.now()}.svg`),
        }, "Download SVG"),
        h("button", {
          class: "gen__btn gen__btn--ghost",
          onClick: makeAnother,
        }, "Make another"),
      ]),
      h("div", { class: "gen__reveal-meta" }, [
        "Submission ID: ",
        h("code", {}, state.submittedId || "—"),
      ]),
    ]),
  ]);
}

function makeAnother() {
  state.submitted = false;
  state.submittedId = null;
  state.words = [...DEFAULT_WORDS];
  state.colors = [...DEFAULT_COLORS];
  state.glyph = "spiral";
  state.glyphColor = "#eaeaea";
  state.activeQ = 0;
  state.tab = "colors";
  state.submitError = null;
  turnstileWidgetId = null;
  render();
}

// ─── boot ───────────────────────────────────────────────────────────────────

function boot() {
  root = document.getElementById("square-app");
  if (!root) return;
  apiBase = root.dataset.apiBase || "/api";
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
