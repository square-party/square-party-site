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
