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
