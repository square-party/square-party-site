export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Domain collection — drives the 22-domain grid on the empower home page.
  // Sorts by `order` frontmatter field, falling back to alphabetical.
  eleventyConfig.addCollection("domains", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/campaign/empower/domain/*/index.md")
      .sort((a, b) => {
        const ao = a.data.order ?? 999;
        const bo = b.data.order ?? 999;
        if (ao !== bo) return ao - bo;
        return (a.data.title || "").localeCompare(b.data.title || "");
      });
  });

  // Process & Policy collections — drive the two proposal lists on
  // /paul/process/ and /paul/policy/. One folder per proposal under each
  // section, with bucket-internal numbering. Sorted by `order` frontmatter.
  // Sort helper shared by both.
  const proposalSort = (a, b) => {
    const ao = a.data.order ?? 999;
    const bo = b.data.order ?? 999;
    if (ao !== bo) return ao - bo;
    return (a.data.title || "").localeCompare(b.data.title || "");
  };

  eleventyConfig.addCollection("processProposals", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/paul/process/*/index.md")
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
