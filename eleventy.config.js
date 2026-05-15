import markdownIt from "markdown-it";

// Markdown renderer used by the `markdown` filter below.
// html: true — allows inline HTML in contentMarkdown fields (e.g. table cells).
// linkify: false — don't auto-link bare URLs; links must be explicit.
const md = markdownIt({ html: true, linkify: false });

export default function(eleventyConfig) {
  // markdown filter — renders a contentMarkdown string to HTML.
  // Used by supplementary-block.njk: {{ block.contentMarkdown | markdown | safe }}
  // Added for WM-1B (mode-aware Nunjucks partials, 2026-05-04).
  eleventyConfig.addFilter("markdown", (content) => {
    if (!content) return "";
    return md.render(String(content));
  });
  // stackBarGeometry filter — pre-computes all SVG geometry for stack-bar.njk.
  // Registered here because Nunjucks lacks:
  //   • Math.abs / Math.max (no native equivalents)
  //   • scoped variable accumulation across a for-loop (for the inflow-cursor)
  // Returns a geometry object consumed by stack-bar.njk, or null if required
  // aspects are missing (partial renders nothing in that case).
  //
  // Aspect-finding strategy (generic, not hard-coded to specific IDs):
  //   designAspects — kind="design", magnitude present, direction="inflow"
  //   gapAspect     — kind="gap", subOf present (marks it as a sub-segment),
  //                   magnitude present
  //   wageTaxAspect — the aspect whose id matches gapAspect.subOf (the neutral
  //                   outflow parent of the gap sub-segment)
  eleventyConfig.addFilter("stackBarGeometry", (profile) => {
    // Geometry refined 2026-05-04 (third pass): bars at 40 still read well,
    // but the prior VB_H 260 left substantial empty space inside the SVG
    // canvas. Tightened to VB_H 160 (aspect 3:1) — bars sit closer to the
    // top, gap between inflow/outflow rows reduced to 24, minimal bottom
    // margin. Rendered height at a 700px column drops to ~230px from ~380px;
    // bars themselves don't change size.
    const VB_W = 480, VB_H = 160;
    const PAD_LEFT = 70, PAD_RIGHT = 90;
    const BAR_W = VB_W - PAD_LEFT - PAD_RIGHT;   // 320
    const BAR_H = 40;
    const Y_INFLOW = 16, Y_OUTFLOW = 80;

    const fmt = (n) => "$" + Math.round(Math.abs(n)).toLocaleString("en-US");

    const aspects = profile.aspects || [];

    const designAspects = aspects.filter(
      (a) => a.kind === "design" && a.magnitude && a.magnitude.direction === "inflow"
    );
    if (!designAspects.length) return null;

    const inflowTotal = designAspects.reduce((sum, a) => sum + a.magnitude.value, 0);

    // Find the gap sub-segment and its neutral outflow parent.
    const gapAspect = aspects.find((a) => a.kind === "gap" && a.subOf && a.magnitude);
    const wageTaxAspect = gapAspect ? aspects.find((a) => a.id === gapAspect.subOf) : null;
    if (!gapAspect || !wageTaxAspect) return null;

    const wageTaxTotal  = Math.abs(wageTaxAspect.magnitude.value);   // 1047
    const gapAmount     = Math.abs(gapAspect.magnitude.value);       // 627
    const neutralAmount = wageTaxTotal - gapAmount;                  // 420
    const netResult     = inflowTotal - wageTaxTotal;                // 5733

    const maxMag       = Math.max(inflowTotal, wageTaxTotal);
    const dollarsPerPx = maxMag / BAR_W;
    const px           = (d) => Math.round(d / dollarsPerPx);

    // Inflow segments with cumulative x position (cursor accumulation —
    // not expressible in Nunjucks for-loop scope).
    let cursor = PAD_LEFT;
    const designSegments = designAspects.map((a) => {
      const w   = px(a.magnitude.value);
      const seg = { x: cursor, y: Y_INFLOW, w, h: BAR_H, aspect: a, amtFmt: fmt(a.magnitude.value) };
      cursor   += w;
      return seg;
    });

    const neutralW = px(neutralAmount);
    const gapW     = px(gapAmount);

    return {
      // Viewport constants
      VB_W, VB_H, PAD_LEFT, PAD_RIGHT, BAR_W, BAR_H, Y_INFLOW, Y_OUTFLOW,
      // Computed magnitudes
      inflowTotal, wageTaxTotal, gapAmount, neutralAmount, netResult,
      // Formatted amounts for labels and aria-label
      inflowTotalFmt:   fmt(inflowTotal),
      wageTaxTotalFmt:  fmt(wageTaxTotal),
      gapAmountFmt:     fmt(gapAmount),
      neutralAmountFmt: fmt(neutralAmount),
      netResultFmt:     fmt(netResult),
      // Inflow segment geometry (array)
      designSegments,
      // Outflow geometry
      outflowX:    PAD_LEFT,
      neutralW,
      gapW,
      inflowBarW:  px(inflowTotal),
      outflowBarW: px(wageTaxTotal),
      // Divider line y position
      dividerY:    Y_OUTFLOW + BAR_H + 14,
      // Aspect objects needed for segment titles
      wageTaxAspect,
      gapAspect,
      // Label anchor positions
      rowLabelX:        PAD_LEFT - 8,
      rowLabelYInflow:  Y_INFLOW  + BAR_H / 2 + 4,
      rowLabelYOutflow: Y_OUTFLOW + BAR_H / 2 + 4,
      inflowLabelX:     PAD_LEFT + px(inflowTotal)   + 8,
      inflowLabelY:     Y_INFLOW  + BAR_H / 2 + 4,
      outflowLabelX:    PAD_LEFT + px(wageTaxTotal)  + 8,
      outflowLabelY:    Y_OUTFLOW + BAR_H / 2 + 4,
    };
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  // Cloudflare Pages reads _redirects from the published root.
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // income-viz: copy as plain files so Nunjucks doesn't try to parse the JSX
  // `{{ ... }}` style objects inside the HTML, and so the Python-generated
  // data.json is reachable at the relative fetch path the HTML uses
  // (`./income-viz-src/data.json`).
  // Both copy AND ignore are needed: addPassthroughCopy alone copies the file
  // but doesn't prevent Eleventy from also trying to process it as a Nunjucks
  // template (which fails because JSX uses `{{ ... }}` for inline objects).
  eleventyConfig.addPassthroughCopy("src/income-viz.html");
  eleventyConfig.addPassthroughCopy("src/income-viz-src/data.json");
  eleventyConfig.ignores.add("src/income-viz.html");

  // Domain collection — drives the 26-domain grid on the empower home page.
  // Sorts by cluster letter (A–H per DOMAIN_FRAMEWORK Section 6), then by
  // within-cluster `order`, then alphabetical title as a final tiebreaker.
  // The grid partial walks this sorted list and emits a section heading
  // whenever the cluster changes.
  eleventyConfig.addCollection("domains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.{md,njk}")
      .sort((a, b) => {
        const ac = a.data.cluster || "Z";
        const bc = b.data.cluster || "Z";
        if (ac !== bc) return ac.localeCompare(bc);
        const ao = a.data.order ?? 999;
        const bo = b.data.order ?? 999;
        if (ao !== bo) return ao - bo;
        return (a.data.title || "").localeCompare(b.data.title || "");
      });
  });

  // Ideas & Policy collections — drive the two proposal lists on
  // /ideas/ and /paul/policy/. One folder per proposal under each section,
  // with bucket-internal numbering. Sorted by `order` frontmatter.
  // Sort helper shared by both.
  const proposalSort = (a, b) => {
    const ao = a.data.order ?? 999;
    const bo = b.data.order ?? 999;
    if (ao !== bo) return ao - bo;
    return (a.data.title || "").localeCompare(b.data.title || "");
  };

  eleventyConfig.addCollection("ideas", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/ideas/*/index.{md,njk}")
      .sort(proposalSort);
  });

  eleventyConfig.addCollection("policyProposals", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/policy/*/index.{md,njk}")
      .sort(proposalSort);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
