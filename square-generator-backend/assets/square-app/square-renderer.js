/**
 * square-renderer.js — vanilla SVG renderer for a "square".
 *
 * Mirrors the React component in the prototype 1:1 so the visual output
 * is identical. Exposes a single function `renderSquare(opts)` that
 * returns an <svg> element, ready to insert into the DOM.
 *
 * No dependencies. Works as an ES module or via window.SquareRenderer.
 */

const NS = "http://www.w3.org/2000/svg";

// ─── color helpers ──────────────────────────────────────────────────────────

function lighten(hex, amount = 0.4) {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function darken(hex, amount = 0.5) {
  const c = hex.replace("#", "");
  const n = parseInt(c.length === 3 ? c.split("").map((x) => x + x).join("") : c, 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - amount));
  g = Math.round(g * (1 - amount));
  b = Math.round(b * (1 - amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

// ─── tiny element builder ───────────────────────────────────────────────────

function el(tag, attrs = {}, children = []) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    node.setAttribute(k, String(v));
  }
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

// ─── glyph library ──────────────────────────────────────────────────────────
// Each glyph returns an array of SVG nodes. Drawn within radius r at (cx,cy).

const GLYPHS = {
  moon(cx, cy, r, c, fs, uid) {
    if (fs === "line") {
      return [
        el("circle", { cx, cy, r, fill: "none", stroke: c, "stroke-width": r * 0.06, opacity: 0.9 }),
        el("path", {
          d: `M ${cx - r * 0.3} ${cy - r * 0.7} A ${r * 0.9} ${r * 0.9} 0 0 0 ${cx - r * 0.3} ${cy + r * 0.7}`,
          fill: "none", stroke: c, "stroke-width": r * 0.06, opacity: 0.6,
        }),
      ];
    }
    return [
      el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }),
      el("circle", { cx, cy, r, fill: `url(#${uid}-face)` }),
      el("circle", { cx: cx - r * 0.22, cy: cy - r * 0.22, r: r * 0.16, fill: c, opacity: 0.22 }),
      el("circle", { cx: cx + r * 0.27, cy: cy + r * 0.18, r: r * 0.1,  fill: c, opacity: 0.16 }),
    ];
  },

  sun(cx, cy, r, c, fs, uid) {
    const rays = [];
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI * 2) / 12;
      rays.push(el("line", {
        x1: cx + Math.cos(a) * r * 1.25, y1: cy + Math.sin(a) * r * 1.25,
        x2: cx + Math.cos(a) * r * 1.65, y2: cy + Math.sin(a) * r * 1.65,
        stroke: c, "stroke-width": r * 0.08, "stroke-linecap": "round", opacity: 0.85,
      }));
    }
    if (fs === "line") {
      return [...rays, el("circle", { cx, cy, r, fill: "none", stroke: c, "stroke-width": r * 0.08 })];
    }
    return [
      el("circle", { cx, cy, r: r * 2.1, fill: `url(#${uid}-halo)` }),
      ...rays,
      el("circle", { cx, cy, r, fill: c }),
    ];
  },

  star(cx, cy, r, c, fs, uid) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 === 0 ? r : r * 0.42;
      pts.push(`${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`);
    }
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.8, fill: `url(#${uid}-halo)` }));
    out.push(el("polygon", {
      points: pts.join(" "),
      fill: fs === "line" ? "none" : c,
      stroke: c,
      "stroke-width": fs === "line" ? r * 0.08 : 0,
      "stroke-linejoin": "round",
    }));
    return out;
  },

  tree(cx, cy, r, c, fs, uid) {
    const trunk = el("rect", { x: cx - r * 0.08, y: cy, width: r * 0.16, height: r * 0.9, fill: c });
    const path = `M ${cx} ${cy - r} L ${cx + r * 0.7} ${cy + r * 0.1} L ${cx + r * 0.35} ${cy + r * 0.1} L ${cx + r * 0.55} ${cy + r * 0.5} L ${cx - r * 0.55} ${cy + r * 0.5} L ${cx - r * 0.35} ${cy + r * 0.1} L ${cx - r * 0.7} ${cy + r * 0.1} Z`;
    if (fs === "line") {
      return [trunk, el("path", { d: path, fill: "none", stroke: c, "stroke-width": r * 0.08, "stroke-linejoin": "round" })];
    }
    return [
      el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }),
      trunk,
      el("path", { d: path, fill: c }),
    ];
  },

  mountain(cx, cy, r, c, fs, uid) {
    const path = `M ${cx - r * 1.1} ${cy + r * 0.7} L ${cx - r * 0.3} ${cy - r * 0.6} L ${cx + r * 0.1} ${cy} L ${cx + r * 0.5} ${cy - r * 0.9} L ${cx + r * 1.1} ${cy + r * 0.7} Z`;
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: path,
      fill: fs === "line" ? "none" : c,
      stroke: c,
      "stroke-width": fs === "line" ? r * 0.08 : 0,
      "stroke-linejoin": "round",
    }));
    return out;
  },

  wave(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    for (let i = -1; i <= 1; i++) {
      const y = cy + i * r * 0.45;
      out.push(el("path", {
        d: `M ${cx - r} ${y} Q ${cx - r * 0.5} ${y - r * 0.25}, ${cx} ${y} T ${cx + r} ${y}`,
        fill: "none", stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round",
        opacity: 0.5 + Math.abs(i) * 0.2,
      }));
    }
    return out;
  },

  bird(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.8, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: `M ${cx - r * 1.1} ${cy + r * 0.1} Q ${cx - r * 0.55} ${cy - r * 0.7}, ${cx} ${cy + r * 0.05} Q ${cx + r * 0.55} ${cy - r * 0.7}, ${cx + r * 1.1} ${cy + r * 0.1}`,
      fill: "none", stroke: c, "stroke-width": r * 0.16, "stroke-linecap": "round",
    }));
    return out;
  },

  flame(cx, cy, r, c, fs, uid) {
    const path = `M ${cx} ${cy - r} C ${cx + r * 0.6} ${cy - r * 0.3}, ${cx + r * 0.7} ${cy + r * 0.5}, ${cx} ${cy + r} C ${cx - r * 0.7} ${cy + r * 0.5}, ${cx - r * 0.6} ${cy - r * 0.3}, ${cx} ${cy - r} Z`;
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: path,
      fill: fs === "line" ? "none" : c,
      stroke: c,
      "stroke-width": fs === "line" ? r * 0.1 : 0,
      "stroke-linejoin": "round",
    }));
    return out;
  },

  eye(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: `M ${cx - r} ${cy} Q ${cx} ${cy - r * 0.7}, ${cx + r} ${cy} Q ${cx} ${cy + r * 0.7}, ${cx - r} ${cy} Z`,
      fill: fs === "line" ? "none" : c, stroke: c,
      "stroke-width": fs === "line" ? r * 0.09 : 0, opacity: fs === "line" ? 1 : 0.4,
    }));
    out.push(el("circle", { cx, cy, r: r * 0.32, fill: c }));
    return out;
  },

  seed(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: `M ${cx} ${cy + r} C ${cx + r * 0.55} ${cy}, ${cx + r * 0.55} ${cy - r * 0.6}, ${cx} ${cy - r}`,
      fill: "none", stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round",
    }));
    out.push(el("path", {
      d: `M ${cx} ${cy + r} C ${cx - r * 0.55} ${cy}, ${cx - r * 0.55} ${cy - r * 0.6}, ${cx} ${cy - r}`,
      fill: "none", stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round",
    }));
    out.push(el("circle", { cx, cy: cy + r * 0.05, r: r * 0.13, fill: c }));
    return out;
  },

  compass(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.85, fill: `url(#${uid}-halo)` }));
    out.push(el("circle", { cx, cy, r, fill: "none", stroke: c, "stroke-width": r * 0.08 }));
    out.push(el("polygon", {
      points: `${cx},${cy - r * 0.85} ${cx + r * 0.18},${cy} ${cx},${cy + r * 0.85} ${cx - r * 0.18},${cy}`,
      fill: c, opacity: 0.85,
    }));
    out.push(el("circle", { cx, cy, r: r * 0.1, fill: c }));
    return out;
  },

  heart(cx, cy, r, c, fs, uid) {
    const path = `M ${cx} ${cy + r * 0.85} C ${cx - r * 1.1} ${cy + r * 0.15}, ${cx - r * 1.1} ${cy - r * 0.7}, ${cx} ${cy - r * 0.25} C ${cx + r * 1.1} ${cy - r * 0.7}, ${cx + r * 1.1} ${cy + r * 0.15}, ${cx} ${cy + r * 0.85} Z`;
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.9, fill: `url(#${uid}-halo)` }));
    out.push(el("path", {
      d: path,
      fill: fs === "line" ? "none" : c,
      stroke: c,
      "stroke-width": fs === "line" ? r * 0.1 : 0,
      "stroke-linejoin": "round",
    }));
    return out;
  },

  spiral(cx, cy, r, c, fs, uid) {
    const pts = [];
    const N = 80, turns = 3;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const a = t * turns * Math.PI * 2;
      const rr = t * r;
      pts.push(`${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`);
    }
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.85, fill: `url(#${uid}-halo)` }));
    out.push(el("polyline", {
      points: pts.join(" "), fill: "none", stroke: c, "stroke-width": r * 0.1, "stroke-linecap": "round",
    }));
    return out;
  },

  hand(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.85, fill: `url(#${uid}-halo)` }));
    out.push(el("circle", {
      cx, cy, r: r * 0.95,
      fill: fs === "line" ? "none" : c, stroke: c, "stroke-width": r * 0.08,
      opacity: fs === "line" ? 1 : 0.85,
    }));
    out.push(el("circle", {
      cx, cy, r: r * 0.42,
      fill: fs === "line" ? "none" : "#000", stroke: c, "stroke-width": r * 0.07, opacity: 0.55,
    }));
    return out;
  },

  key(cx, cy, r, c, fs, uid) {
    const out = [];
    if (fs !== "line") out.push(el("circle", { cx, cy, r: r * 1.85, fill: `url(#${uid}-halo)` }));
    out.push(el("circle", { cx: cx - r * 0.45, cy, r: r * 0.4, fill: "none", stroke: c, "stroke-width": r * 0.13 }));
    out.push(el("line", { x1: cx - r * 0.05, y1: cy, x2: cx + r,        y2: cy,            stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round" }));
    out.push(el("line", { x1: cx + r * 0.55, y1: cy, x2: cx + r * 0.55, y2: cy + r * 0.3,  stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round" }));
    out.push(el("line", { x1: cx + r * 0.85, y1: cy, x2: cx + r * 0.85, y2: cy + r * 0.4,  stroke: c, "stroke-width": r * 0.13, "stroke-linecap": "round" }));
    return out;
  },
};

const GLYPH_KEYS = Object.keys(GLYPHS);

// ─── seeded scenery (deterministic across renders for visual stability) ─────

function buildScenery(S) {
  let seed = 1337;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const stars = [];
  for (let i = 0; i < 14; i++) {
    stars.push({ x: rand() * S, y: rand() * S, r: 0.5 + rand() * 1.0, o: 0.25 + rand() * 0.45 });
  }
  const trees = [];
  let tx = S * 0.04;
  while (tx < S * 0.98) {
    const tw = S * (0.04 + rand() * 0.04);
    const th = S * (0.06 + rand() * 0.07);
    const baseY = S * (0.96 + rand() * 0.02);
    trees.push({ x: tx + tw / 2, baseY, w: tw, h: th, o: 0.35 + rand() * 0.25 });
    tx += tw * (0.7 + rand() * 0.7);
  }
  const buildings = [];
  let bx = 0;
  while (bx < S) {
    const bw = S * (0.025 + rand() * 0.045);
    const bh = S * (0.05 + rand() * 0.12);
    const baseY = S * 0.985;
    const windows = [];
    const cols = Math.floor(bw / (S * 0.012));
    const rows = Math.floor(bh / (S * 0.018));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rand() > 0.78) {
          windows.push({
            x: bx + (c + 0.5) * (bw / cols),
            y: baseY - bh + (r + 0.5) * (bh / rows),
            s: S * 0.005,
          });
        }
      }
    }
    buildings.push({ x: bx, y: baseY - bh, w: bw, h: bh, o: 0.45 + rand() * 0.2, windows });
    bx += bw + S * 0.002;
  }
  return { stars, trees, buildings };
}

// ─── public API ─────────────────────────────────────────────────────────────

let __uidCounter = 0;
function nextUid() { return `sq${(__uidCounter++).toString(36)}`; }

/**
 * Render a square SVG.
 *
 * opts:
 *   words:        [tl, tr, bl, br]
 *   colors:       [tl, tr, bl, br]   hex strings
 *   glyph:        glyph key (see GLYPH_KEYS)
 *   glyphColor:   hex
 *   fillStyle:    "filled" | "line"
 *   gradient:     "subtle" | "strong" | "flat"  (also accepts legacy "radial" → subtle)
 *   scenery:      "stars" | "trees" | "city" | "none"   (legacy "buildings" === "city")
 *   showDividers, showBorder: bool
 *   fontFamily:   CSS font stack
 *   cornerRadius: px on a 320 viewBox; scaled internally
 *   size:         viewBox size (default 320). Output uses width=100% so it scales.
 *   onQuadrantClick(idx): optional handler
 *   activeQuadrant: -1 | 0..3
 *
 * Returns an <svg> element.
 */
export function renderSquare(opts) {
  const {
    words = ["", "", "", ""],
    colors = ["#321e5c", "#3d1020", "#0a3626", "#0a2a52"],
    glyph = "moon",
    glyphColor = "#daeef8",
    fillStyle = "filled",
    gradient: gradientRaw = "subtle",
    scenery: sceneryRaw = "stars",
    showDividers = true,
    showBorder = true,
    fontFamily = "'Space Grotesk', sans-serif",
    cornerRadius = 0,
    size = 320,
    onQuadrantClick = null,
    activeQuadrant = -1,
  } = opts;

  // Normalize legacy values.
  const gradient = gradientRaw === "radial" ? "subtle" : gradientRaw;
  const scenery = sceneryRaw === "buildings" ? "city" : sceneryRaw;

  const uid = nextUid();
  const S = size;
  const half = S / 2;
  const sceneryShapes = buildScenery(S);

  const svg = el("svg", {
    viewBox: `0 0 ${S} ${S}`,
    width: "100%",
    height: "100%",
    xmlns: NS,
    style: "display:block",
  });

  // ── defs ──
  const defs = el("defs");
  for (let i = 0; i < 4; i++) {
    const c = colors[i];
    const ox = i % 2 === 0 ? "100%" : "0%";
    const oy = i < 2 ? "100%" : "0%";
    const grad = el("radialGradient", { id: `${uid}-q${i}`, cx: ox, cy: oy, r: "100%" });
    grad.appendChild(el("stop", { offset: "0%",   "stop-color": lighten(c, 0.18) }));
    grad.appendChild(el("stop", { offset: "55%",  "stop-color": c }));
    grad.appendChild(el("stop", { offset: "100%", "stop-color": darken(c, gradient === "strong" ? 0.7 : 0.5) }));
    defs.appendChild(grad);
  }

  const bigGlow = el("radialGradient", { id: `${uid}-bigGlow`, cx: "50%", cy: "50%", r: "50%" });
  bigGlow.appendChild(el("stop", { offset: "0%",   "stop-color": lighten(glyphColor, 0.4), "stop-opacity": 0.32 }));
  bigGlow.appendChild(el("stop", { offset: "22%",  "stop-color": glyphColor, "stop-opacity": 0.18 }));
  bigGlow.appendChild(el("stop", { offset: "50%",  "stop-color": glyphColor, "stop-opacity": 0.07 }));
  bigGlow.appendChild(el("stop", { offset: "100%", "stop-color": glyphColor, "stop-opacity": 0 }));
  defs.appendChild(bigGlow);

  const halo = el("radialGradient", { id: `${uid}-halo`, cx: "50%", cy: "50%", r: "50%" });
  halo.appendChild(el("stop", { offset: "0%",   "stop-color": lighten(glyphColor, 0.5), "stop-opacity": 0.55 }));
  halo.appendChild(el("stop", { offset: "60%",  "stop-color": glyphColor, "stop-opacity": 0.2 }));
  halo.appendChild(el("stop", { offset: "100%", "stop-color": glyphColor, "stop-opacity": 0 }));
  defs.appendChild(halo);

  const face = el("radialGradient", { id: `${uid}-face`, cx: "38%", cy: "35%", r: "65%" });
  face.appendChild(el("stop", { offset: "0%",   "stop-color": lighten(glyphColor, 0.5) }));
  face.appendChild(el("stop", { offset: "35%",  "stop-color": glyphColor }));
  face.appendChild(el("stop", { offset: "100%", "stop-color": darken(glyphColor, 0.25) }));
  defs.appendChild(face);

  const clip = el("clipPath", { id: `${uid}-clip` });
  clip.appendChild(el("rect", { x: 0, y: 0, width: S, height: S, rx: cornerRadius, ry: cornerRadius }));
  defs.appendChild(clip);
  svg.appendChild(defs);

  // ── clipped contents ──
  const g = el("g", { "clip-path": `url(#${uid}-clip)` });

  // Quadrants
  const quadFill = (idx) => gradient === "flat" ? colors[idx] : `url(#${uid}-q${idx})`;
  const quadCoords = [[0, 0], [half, 0], [0, half], [half, half]];
  quadCoords.forEach(([x, y], i) => {
    const rect = el("rect", { x, y, width: half, height: half, fill: quadFill(i) });
    if (onQuadrantClick) {
      rect.style.cursor = "pointer";
      rect.addEventListener("click", (ev) => onQuadrantClick(i, ev));
    }
    g.appendChild(rect);
  });

  // Big central glow
  if (gradient !== "flat") {
    g.appendChild(el("circle", { cx: half, cy: half, r: S * 0.48, fill: `url(#${uid}-bigGlow)`, "pointer-events": "none" }));
  }

  // Scenery
  if (scenery === "stars") {
    for (const s of sceneryShapes.stars) {
      g.appendChild(el("circle", { cx: s.x, cy: s.y, r: s.r, fill: "white", opacity: s.o, "pointer-events": "none" }));
    }
  } else if (scenery === "trees") {
    const treeG = el("g", { "pointer-events": "none" });
    for (const t of sceneryShapes.trees) {
      treeG.appendChild(el("polygon", {
        points: `${t.x - t.w/2},${t.baseY} ${t.x + t.w/2},${t.baseY} ${t.x},${t.baseY - t.h}`,
        fill: "#000", opacity: t.o * 0.85,
      }));
    }
    for (const t of sceneryShapes.trees) {
      treeG.appendChild(el("polygon", {
        points: `${t.x - t.w/2},${t.baseY} ${t.x + t.w/2},${t.baseY} ${t.x},${t.baseY - t.h}`,
        fill: "none", stroke: lighten(glyphColor, 0.2), "stroke-width": S * 0.0015, opacity: t.o * 0.4,
      }));
    }
    g.appendChild(treeG);
  } else if (scenery === "city") {
    const bG = el("g", { "pointer-events": "none" });
    for (const b of sceneryShapes.buildings) {
      bG.appendChild(el("rect", { x: b.x, y: b.y, width: b.w, height: b.h, fill: "#000", opacity: b.o }));
      bG.appendChild(el("rect", {
        x: b.x, y: b.y, width: b.w, height: b.h,
        fill: "none", stroke: lighten(glyphColor, 0.1), "stroke-width": S * 0.0012, opacity: 0.25,
      }));
      for (const w of b.windows) {
        bG.appendChild(el("rect", {
          x: w.x - w.s / 2, y: w.y - w.s / 2, width: w.s, height: w.s,
          fill: lighten(glyphColor, 0.4), opacity: 0.55,
        }));
      }
    }
    g.appendChild(bG);
  }

  // Dividers
  if (showDividers) {
    const dG = el("g", { "pointer-events": "none" });
    dG.appendChild(el("line", { x1: half, y1: 0, x2: half, y2: S, stroke: lighten(glyphColor, 0.3), "stroke-width": S * 0.0016, opacity: 0.18 }));
    dG.appendChild(el("line", { x1: 0, y1: half, x2: S, y2: half, stroke: lighten(glyphColor, 0.3), "stroke-width": S * 0.0016, opacity: 0.18 }));
    g.appendChild(dG);
  }

  // Glyph
  const glyphFn = GLYPHS[glyph] || GLYPHS.moon;
  const glyphG = el("g", { "pointer-events": "none" });
  for (const node of glyphFn(half, half, S * 0.07, glyphColor, fillStyle, uid)) {
    glyphG.appendChild(node);
  }
  g.appendChild(glyphG);

  // Words
  const textColor = (idx) => lighten(colors[idx], 0.55);
  const wordPositions = [
    { x: S * 0.25, y: S * 0.26, idx: 0 },
    { x: S * 0.75, y: S * 0.26, idx: 1 },
    { x: S * 0.25, y: S * 0.77, idx: 2 },
    { x: S * 0.75, y: S * 0.77, idx: 3 },
  ];
  const wordsG = el("g", { "pointer-events": "none", style: `font-family:${fontFamily}` });
  for (const { x, y, idx } of wordPositions) {
    const w = words[idx];
    if (!w) continue;
    const t = el("text", {
      x, y,
      "text-anchor": "middle",
      fill: textColor(idx),
      "font-size": S * 0.04,
      "font-weight": 500,
      "letter-spacing": "0.18em",
      opacity: 0.9,
      style: "text-transform:uppercase",
    }, [String(w).slice(0, 12)]);
    wordsG.appendChild(t);
  }
  g.appendChild(wordsG);

  // Active quadrant outline
  if (activeQuadrant >= 0 && onQuadrantClick) {
    g.appendChild(el("rect", {
      x: (activeQuadrant % 2) * half,
      y: (activeQuadrant < 2 ? 0 : 1) * half,
      width: half, height: half,
      fill: "none",
      stroke: lighten(glyphColor, 0.4),
      "stroke-width": S * 0.008,
      "stroke-dasharray": `${S * 0.012} ${S * 0.008}`,
      opacity: 0.85,
      "pointer-events": "none",
    }));
  }

  svg.appendChild(g);

  // Border (outside clip so corners look right)
  if (showBorder) {
    svg.appendChild(el("rect", {
      x: 0, y: 0, width: S, height: S,
      rx: cornerRadius, ry: cornerRadius,
      fill: "none",
      stroke: lighten(glyphColor, 0.15),
      "stroke-width": S * 0.011,
      opacity: 0.55,
    }));
  }

  return svg;
}

export { GLYPHS, GLYPH_KEYS, lighten, darken };

// Also expose globally for non-module callers.
if (typeof window !== "undefined") {
  window.SquareRenderer = { renderSquare, GLYPHS, GLYPH_KEYS, lighten, darken };
}
