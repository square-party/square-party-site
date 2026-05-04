// Site-wide data accessible in templates as `site.*`
// Update these as needed before deploying.

export default {
  name: "Square Party",
  url: "https://squareparty.org",
  description: "A vehicle for civic reform.",

  // GitHub-based contribution workflow.
  repoUrl: "https://github.com/square-party/square-party-site",
  // Used to build per-page "Edit on GitHub" / "View history" links.
  // Pattern: ${repoUrl}/blob/main/${pagePath} for view, /edits/main/${pagePath} for edit
  defaultBranch: "main",

  // For per-page "Last updated" — until we have git-driven dates,
  // pages can set their own `updated:` in frontmatter and we fall back
  // to the build date.
  buildDate: new Date().toISOString().slice(0, 10),

  // Contact email for the project. Used in mailto: links and as a fallback
  // when GitHub-based contribution isn't workable for someone.
  email: "paul@squareparty.org",

  // Square generator (handoff/INTEGRATION.md). The frontend works against
  // a Cloudflare Worker exposing /api/* endpoints; Turnstile validates
  // submissions. Both must be deployed before the form will accept input.
  // - apiBase: route the Worker is mounted at (default /api).
  // - turnstileSiteKey: public key from Cloudflare dashboard → Turnstile.
  //   Set to a non-empty value (placeholder OK) so the form attempts to
  //   render the widget; replace with your real key before going live.
  apiBase: "/api",
  turnstileSiteKey: "REPLACE-WITH-CLOUDFLARE-TURNSTILE-SITE-KEY",

  // Tally form IDs (last segment of the Tally form URL).
  // Update these in one place; templates pull from site.tally.*.
  // Set a value to `null` for forms that don't exist yet — the embed partial
  // will render a placeholder card instead of a broken iframe.
  tally: {
    voter: "BzLAVA",     // home page — Square Party voter sign-up (lightest touch)
    assembly: "EkBJGL",  // /square-party/assembly/ — per-domain interest sign-up
    pledge: null,        // /paul/campaign/ — write-in pledge (TBD: create in Tally, paste ID here)
    prefs: null          // /paul/campaign/empower/contribute/ — broad-issue preferences (TBD)
  },

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
