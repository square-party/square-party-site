// Site-wide data accessible in templates as `site.*`
// Update these as needed before deploying.

export default {
  name: "Square Party",
  url: "https://squareparty.org",

  // GitHub-based contribution workflow.
  // Replace with your actual repo when set up.
  repoUrl: "https://github.com/REPLACE-ME/square-party-site",
  // Used to build per-page "Edit on GitHub" / "View history" links.
  // Pattern: ${repoUrl}/blob/main/${pagePath} for view, /edits/main/${pagePath} for edit
  defaultBranch: "main",

  // For per-page "Last updated" — until we have git-driven dates,
  // pages can set their own `updated:` in frontmatter and we fall back
  // to the build date.
  buildDate: new Date().toISOString().slice(0, 10),

  // Project-level structure for the empower project's nav and breadcrumb
  empower: {
    title: "How to empower through representation",
    base: "/paul/campaign/empower/",
    nav: [
      { label: "Home", href: "/paul/campaign/empower/" },
      { label: "Domains", href: "/paul/campaign/empower/#domains" },
      { label: "Timeline", href: "/paul/campaign/empower/timeline/" },
      { label: "Contribute", href: "/paul/campaign/empower/contribute/" },
      { label: "Contributors", href: "/paul/campaign/empower/contributors/" },
      { label: "About", href: "/paul/campaign/empower/about/" }
    ],
    breadcrumb: [
      { label: "Square Party", href: "/" },
      { label: "Paul", href: "/paul/" },
      { label: "Campaign", href: "/paul/campaign/" },
      { label: "Empower through representation", href: "/paul/campaign/empower/" }
    ]
  }
};
