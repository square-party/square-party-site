export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Domain collection — drives the 26-domain grid on the empower home page.
  // Sorts by cluster letter (A–H per DOMAIN_FRAMEWORK Section 6), then by
  // within-cluster `order`, then alphabetical title as a final tiebreaker.
  // The grid partial walks this sorted list and emits a section heading
  // whenever the cluster changes.
  eleventyConfig.addCollection("domains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.md")
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
      .getFilteredByGlob("src/ideas/*/index.md")
      .sort(proposalSort);
  });

  eleventyConfig.addCollection("policyProposals", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/policy/*/index.md")
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
