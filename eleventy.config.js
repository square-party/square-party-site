export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  // Cloudflare Pages reads _redirects from the published root.
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // income-viz: copy as plain files so Nunjucks doesn't try to parse the JSX
  // `{{ ... }}` style objects inside the HTML, and so the Python-generated
  // data.json + audit figures are reachable at the relative paths the HTML
  // uses (`./income-viz-src/data.json`, `./income-viz-src/figures/*.png`).
  // Both copy AND ignore are needed for the HTML: addPassthroughCopy alone
  // copies the file but doesn't prevent Eleventy from also trying to process
  // it as a Nunjucks template (which fails because JSX uses `{{ ... }}` for
  // inline objects).
  eleventyConfig.addPassthroughCopy("src/income-viz.html");
  eleventyConfig.addPassthroughCopy("src/income-viz-src");
  eleventyConfig.ignores.add("src/income-viz.html");

  // Domain collections. All 26 domains live under
  // src/paul/campaign/empower/domain/*/index.{md,njk}. The framework groups
  // them into "verified" (analytical work complete) and the rest. Two
  // collections expose that split for templates; both sort alphabetically by
  // title so honeycomb cell order and any future list ordering is stable.

  const titleSort = (a, b) =>
    (a.data.title || "").localeCompare(b.data.title || "");

  // All 26 domains, alphabetical by title. Used by anything that wants the
  // full inventory regardless of verification state.
  eleventyConfig.addCollection("domains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.{md,njk}")
      .sort(titleSort);
  });

  // Verified subset — domains whose analysis is complete per DOMAIN_FRAMEWORK.
  // Identified by `verified: true` in each domain's frontmatter.
  // Used by the honeycomb partial on the empower landing.
  eleventyConfig.addCollection("verifiedDomains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.{md,njk}")
      .filter(item => item.data.verified === true)
      .sort(titleSort);
  });

  // Non-verified subset — the other 13 domains (mix of planned, deferred,
  // structurally-distinct cases). Used by the "Others" section on the
  // empower landing for the methodological-adjustment notes.
  eleventyConfig.addCollection("otherDomains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.{md,njk}")
      .filter(item => item.data.verified !== true)
      .sort(titleSort);
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
