# Square Party Site — Reference

A current-state snapshot of the site, written for someone (human or AI) opening
the repo for the first time. Companion to `website_decisions.md` (the
*decisions* doc that explains *why* the stack was chosen) and to
`VOICE_GUIDE.md` (the *voice* doc that explains how to write for the site);
this doc explains what is actually here, how it fits together, and the
conventions to follow when adding to it.

Last regenerated: 2026-04-27 (post Process/Policy split + representation pulled into its own root section).

---

## 1. Stack at a glance

| Layer            | Choice                                              |
|------------------|-----------------------------------------------------|
| Static generator | Eleventy 3.1.5 (ESM)                                |
| Templating       | Nunjucks (`.njk`) — also used to render `.md` files |
| Styling          | Vanilla CSS with custom properties (one `main.css`) |
| Client JS        | One vanilla `site.js`, no bundler                   |
| Hosting          | Cloudflare Workers static-asset serving             |
| Forms            | Tally embeds (voter signup, assembly, pledge, prefs)|
| Email            | `paul@squareparty.org` (Cloudflare Email Routing + Gmail send-as) |
| Analytics        | Cloudflare Web Analytics (privacy-respecting)       |
| Comments         | None in v1                                          |

`package.json` declares `"type": "module"`, so all JS in the build pipeline is
ESM. Only two `devDependencies`: `@11ty/eleventy ^3.1.5` and `wrangler ^4.83.0`.

### Commands

- `npm run dev` — local Eleventy dev server with live reload
- `npm run build` — produce static output in `_site/`
- `npm run deploy` — `build` then `wrangler deploy` to Cloudflare Workers

### Eleventy config (`eleventy.config.js`)

Three non-default things:

1. `addPassthroughCopy("src/assets")` — copies CSS/JS/SVG/maps verbatim to `_site/`.
2. **`domains` collection** — globs every `src/paul/campaign/empower/domain/*/index.md`
   and sorts by the `order` frontmatter field (alphabetical fallback). Drives
   the 22-domain grid.
3. **`processProposals` and `policyProposals` collections** — each globs every
   `src/paul/process/*/index.md` or `src/paul/policy/*/index.md` and sorts by
   `order`. Drive the two proposal lists at `/paul/process/` and `/paul/policy/`.

`markdownTemplateEngine` and `htmlTemplateEngine` are both `njk`, so Markdown
files can use Nunjucks tags (`{% include %}`, `{{ var }}`) inline.

### Cloudflare config (`wrangler.jsonc`)

```jsonc
{
  "name": "square-party",
  "compatibility_date": "2026-04-19",
  "assets": {
    "directory": "./_site/",
    "not_found_handling": "404-page"
  }
}
```

No Workers script — assets-only deployment. `not_found_handling: "404-page"`
will look for `404.html` (which doesn't exist yet — see §12).

---

## 2. Top-level information architecture

The site has these primary entry points, all reachable from the global header
or the Paul dropdown:

```
/                                    Home — hero, voter signup, "where to go"
/square-party/                       The party itself — empty square, assembly, tenets
/square-party/assembly/              People's Assembly + per-domain interest form
/representation/                     Standalone framing-idea network (rooted; not in any collection)
/paul/                               Paul's bio + AI-drafting disclosure + email
/paul/campaign/                      PA-3 write-in campaign overview + pledge embed
/paul/campaign/how-to-vote/          Write-in mechanics + a few name options
/paul/campaign/if-elected/           Candid "what if I actually win" page
/paul/campaign/empower/              The 22-domain analytical project
/paul/campaign/empower/parks/        Live PA-3 parks & open space map
/paul/campaign/empower/contribute/   Tiered contribution on-ramp
/paul/process/                       Proposals that change how the system works (3 slots)
/paul/process/01-game-maintenance/   ...the first of those (and 2 others)
/paul/policy/                        Proposals inside specific issue domains (7 slots)
/paul/policy/01-border-healthcare/   ...the first of those (and 6 others)
/paul/proposals/                     Redirect stub — points to /paul/process/
/ideas/                              Square Party-level long-form essays (placeholder)
/saved/                              User's localStorage-bookmarked pages
```

`Saved` is unusual: it's a client-rendered list backed by `localStorage`,
exposed in the global nav.

The Paul dropdown in the header includes: About Paul · PA-3 campaign · Empower
(PA-3 application) · PA-3 parks map · Process areas · Policy areas · Contribute.

---

## 3. The EMPOWER project

`/paul/campaign/empower/` applies Square Party's "People's Assembly" framework
to Pennsylvania's 3rd Congressional District. Largest editorial section;
deepest information architecture.

### Project shell

```
/paul/campaign/empower/
├── index.md                domain grid + parks reference + engagement
├── about/
├── methodology/
├── timeline/
├── glossary/
├── contribute/             tiered: lightest → editorial track
├── contributors/
├── parks/                  PA-3 parks & open space iframe map
├── law/                    legal-text appendix index
│   └── finance-taxation/
└── domain/                 22 domain folders
```

A second nav strip (under the main header) is rendered by `empower.njk` from
`site.empower.nav` in `src/_data/site.js`.

### The 22 domains

Each domain lives at `src/paul/campaign/empower/domain/<slug>/index.md` and is
listed in the `domains` collection. State frontmatter is one of:
`published` / `in-review` / `drafting` / `planned` (planned is the default;
most are here). The grid component uses a sticky desktop detail panel and
collapses inline on mobile (≤800px).

`finance-taxation` is the reference implementation for what a fully-built
domain looks like (sub-domains, neighbors, gaps, recent-changes, law/, plus
a `sectionNav` from `finance-taxation.11tydata.json`).

### PA-3 parks & open space map

`/paul/campaign/empower/parks/` embeds a self-contained Leaflet map (located
at `/assets/maps/pa3-parks-map.html`) via iframe. The map fetches data live
from OpenDataPhilly each visit; categories color-coded; covers PA-3 plus a
2-mile buffer. Used by several domain analyses as a shared reference.

---

## 4. The proposals series — Process and Policy

The proposals series is split into two parallel sections. **Process areas**
target *how the system works* — rules, structures, incentives behind
decision-making. **Policy areas** target *what the system does* — substantive
interventions inside specific issue domains. Both use bucket-internal
numbering (each starts at 01).

```
/paul/process/                                  list driven by `processProposals`
├── index.md
├── 01-game-maintenance/        Capitalism as a game that can be won
├── 02-american-experiment/     "The Reins Are Loose" — civic revival
└── 03-fossil-fuels/            Fossil Fuels — case for planning around finitude

/paul/policy/                                   list driven by `policyProposals`
├── index.md
├── 01-border-healthcare/       IBPHTC integrated processing complexes
├── 02-gambling-regulation/     "The House Always Wins" — prediction markets
├── 03-asylum-law/              "The Gray Area" — closing the law/reality gap
├── 04-ag-competition/          Seed sovereignty + antitrust
├── 05-community-kitchens/      Community Kitchen and Open Table Act
├── 06-mandatory-civil-service/ "Growing up with civil service"
└── 07-campaign-finance/        "Corporations speak for money" — post-Citizens United

/representation/                                standalone, not in any collection
└── index.md                    Three nested proposals on representation; intended as a framing-idea network in development (peer-level to /paul/ and /square-party/).
```

All current slots are at `drafting` state with substantive content.

`partials/proposals-list.njk` is parameterized: callers must
`{% set proposalsList = collections.processProposals %}` (or
`policyProposals`) before including. It reuses the same `.domain-list` /
`.domain-row` CSS as the empower domain grid, with project numbers prefixed.

The old `/paul/proposals/` URL still resolves — it's been repurposed as a
3-second meta-refresh redirect to `/paul/process/`, with `eleventyExcludeFromCollections: true`.

To add a new proposal: decide whether it's a process- or policy-level change,
create `<NN-slug>/index.md` under the appropriate section (NN = next available
number in that bucket), with frontmatter (`title`, `description`, `state`,
`order`, `updated`) and a `domain-lead` paragraph, then write the body. The
collection picks it up automatically.

---

## 5. Layouts and partials

```
src/_includes/
├── base.njk             global layout (all pages)
├── empower.njk          project layout (everything under /paul/campaign/empower/)
└── partials/
    ├── domain-card-grid.njk      22-domain list + sticky detail panel
    ├── domain-page-cards.njk     six-cards "ways in" block on each domain
    ├── engagement-block.njk      Read / Contribute / Propose ladder
    ├── help-block.njk            "Help us make our laws better!" CTA
    ├── layer-toggle.njk          Light/Dark layer toggles (currently hidden)
    ├── page-meta.njk             updated date + history/edit links + reviewed flag
    ├── proposals-list.njk        proposals grid — pass `proposalsList` (mirrors domain grid)
    ├── save-button.njk           bookmark button (renders only if saveable: true)
    ├── schoolhouse-hook.njk      "Remember Schoolhouse Rock?" onramp
    └── tally-embed.njk           parameterized Tally form embed (with placeholder fallback)
```

### `base.njk` — global shell

Header (sticky, dark `--ink` background), Paul dropdown nav, `layer-toggle`
aside, `<main>`, footer. Skip link to `#main` for accessibility.

### `empower.njk` — project shell

Wraps content in `<div class="project project--empower">` with breadcrumb
(global crumbs + per-page `breadcrumbExtras`), save button (when
`saveable: true`), project nav (uses `sectionNav` from `.11tydata.json` if
present, otherwise `site.empower.nav`), article content, project footer
with the canonical link set.

### `tally-embed.njk` — Tally infrastructure

Parameterized partial used wherever a Tally form is embedded. The calling
page sets `tallyId`, `tallyTitle`, `tallyHeight` then includes the partial.
Form IDs are centralized in `site.tally.*`. If a form ID is `null`, the
partial renders a placeholder card explaining that the form is being built —
useful while a Tally form hasn't been created yet.

---

## 6. CSS — theming and conventions

`src/assets/css/main.css` (~1,800 lines) is a single hand-authored stylesheet.
Component-by-section architecture, separated by big banner comments.

### Type stack

- Display: Playfair Display (headings, hero)
- Body: Source Serif 4 (prose)
- UI: DM Sans (nav, labels, chips, captions)

### Palette and the layer system

A neutral baseline palette (ink + parchment) lives on `:root`. Two **layer
classes** on `<body>` swap accent colors:

| Body class           | Accent                | Intent                           |
|----------------------|-----------------------|----------------------------------|
| (none)               | `--accent: #5a5a6e`   | Dim, analytical baseline         |
| `.layer-light`       | Gold `#b8860b`        | Hope · agency content            |
| `.layer-dark`        | Sienna `#8b2500`      | Stakes · costs content           |
| both classes         | Gold + sienna         | Both layered sections visible    |

**Layer toggle UI is currently disabled in v1.** The aside is rendered by
`base.njk` but `.layer-toggle` is `display: none` in CSS. Re-enable per the
inline comments in `main.css` (one CSS line to remove; the JS in `site.js` is
still wired up).

### State indicator colors (independent of layer state)

- `published` → green (`#0f6e56` on `#e1f5ee`)
- `in-review` → amber (`#b45309` on `#fef3c7`)
- `drafting` → muted (`#5a5a6e` on `#ece9df`)
- `planned`  → gray (`#8a8a98` on `#f0ece2`)

### Major component sections in `main.css`

Site header + nav, layer toggle, project layout, domain index (compact list +
sticky panel), sub-domain list, per-domain page cards, engagement block, page
meta, home/party/paul squares, assembly Tally embed, domain lead, AI
disclaimer, status callout, domain tag, changelog, save button, saved list,
neighbors grid + filter chips, **help block** (new), **schoolhouse hook**
(new), **tally placeholder** (new), **map frame** (new for parks iframe).

### Responsive

Two main breakpoints used throughout: 800px (domain index collapse), 720px
(layer toggle goes to bottom rail; home hero stacks; neighbors grid stacks),
600px (cards → single column; header relaxes; smaller H1/body).

---

## 7. JavaScript — `src/assets/js/site.js`

A single ~370-line IIFE, dependency-free, with five features:

1. **Layer toggle.** Persists `{ light: bool, dark: bool }` to
   `localStorage` under key `sq.layers.v1`.
2. **Domain index detail panel.** Hover/focus updates the sticky detail
   panel. Pre-populates with the first domain.
3. **Nav dropdown.** Click-to-open with hover-peek (80ms in / 220ms out),
   Esc-to-close, click-outside-to-close.
4. **Save / bookmark.** Buttons toggle entries in `localStorage` under key
   `sq.saved.v1`. The `/saved/` page renders the list.
5. **Neighbors filter.** Two-dimension chip filter over `.neighbor-card`s.

Everything is `localStorage`-only — no server-side state.

---

## 8. Frontmatter conventions

Pages typically pull from this set. Most are optional.

| Key                  | Used by              | Notes                                                              |
|----------------------|----------------------|--------------------------------------------------------------------|
| `layout`             | Eleventy             | `base.njk` for site-level pages, `empower.njk` for the project     |
| `title`              | base/empower/save    | Title tag, breadcrumb current crumb, save list label               |
| `description`        | base/save            | `<meta description>`, save list subtitle                           |
| `state`              | empower domains, process/policy proposals | `published` / `in-review` / `drafting` / `planned`              |
| `order`              | empower domains, process/policy proposals | Sort key for the relevant collection (bucket-internal for proposals) |
| `updated`            | page-meta            | YYYY-MM-DD; falls back to `site.buildDate`                         |
| `reviewed`           | page-meta            | `true` shows the green "Reviewed" flag                             |
| `saveable`           | save-button          | `true` to render the bookmark button                               |
| `savedContext`       | save-button          | Short label shown above title in saved list                        |
| `breadcrumbExtras`   | empower.njk          | List of `{label, href}` inserted between the global crumbs and the current page |
| `cards`              | domain-page-cards    | Per-slot `desc` / `cta` / `href` overrides for the six cards       |
| `engagementContext`  | engagement-block     | Optional short string appended to "Verify & contribute"            |
| `bodyClass`          | base.njk             | Extra class on `<body>` (rarely used)                              |
| `sectionNav` (json)  | empower.njk          | Set in `<slug>.11tydata.json` to swap the project nav for a section nav |
| `eleventyExcludeFromCollections` | Eleventy | `true` keeps a page out of all collections (used by the redirect stub at `/paul/proposals/03-redistricting/`) |

---

## 9. Site-wide data (`src/_data/site.js`)

Anything in here is available to all templates as `site.*`. Key fields:

- `site.name` — "Square Party"
- `site.url` — `https://squareparty.org`
- `site.email` — `paul@squareparty.org` (used in mailto links across the site)
- `site.repoUrl` — **placeholder right now** (`github.com/REPLACE-ME/...`).
  This breaks the "View history" / "Suggest an edit" links generated by
  `page-meta.njk` until it is filled in.
- `site.defaultBranch` — `main`
- `site.buildDate` — `new Date().toISOString().slice(0, 10)`, fallback for
  `updated`
- `site.empower` — title / base / nav / breadcrumb config used by `empower.njk`
- `site.tally` — Tally form IDs:
  - `voter` — `BzLAVA` (home page primary signup)
  - `assembly` — `EkBJGL` (per-domain interest form on `/assembly/`)
  - `pledge` — `null` (Paul write-in pledge — TBD; placeholder card shown until set)
  - `prefs` — `null` (broad-issue preferences survey — TBD; placeholder card shown until set)

---

## 10. Voice and editorial conventions

The site has a defined voice — see `VOICE_GUIDE.md` for the full guide,
including AI-tells inventory, page-type table, and the [SCIENCE]
language-precision checklist.

Quick summary of patterns to preserve when adding content:

- **Sourced and candid.** Most assertions on the empower side carry citations
  inline. Pages openly state when they're scaffolded vs. researched.
- **No reform proposals on analytical pages.** The empower domain pages
  surface the gap; proposals are pushed downstream to the contribute workflow
  and live at `/paul/proposals/`.
- **AI drafting is disclosed.** The bio page (`/paul/`) carries an
  `<aside class="ai-disclaimer">` explaining that prose is AI-drafted and
  that pages without the green "Reviewed" flag are still awaiting Paul's eyes.
- **Two-column "layered" callouts** on domain pages: a `--light` aside for
  "Where there's traction" and a `--dark` aside for "What's at stake".
- **Italicized parenthetical asides** mark explicit "to be drafted" or "demo
  planned" notes.
- **Reading widths**: long-form prose is constrained to `--max-width` (70ch);
  layout components get `--max-width-wide` (1100px).

---

## 11. Adding a new page — quick recipes

### A new domain analysis (planned → drafting)

1. Open `src/paul/campaign/empower/domain/<slug>/index.md`.
2. Frontmatter: `state: drafting`, `saveable: true`,
   `savedContext: "Empower · <Domain Name>"`, add `breadcrumbExtras` pointing
   back to `#domains`, fill in the `cards` block.
3. Replace the lead with the real lead.
4. Optionally add `<aside class="layered-section--light">` and `--dark` blocks.
5. If section nav is needed, drop a `<slug>.11tydata.json` next to `index.md`.
6. Create child pages under `<slug>/neighbors/`, `<slug>/sub-domains/`, etc.

### A new proposal (process or policy)

1. Decide which bucket: process (changes how the system works) or policy
   (substantive intervention in an issue domain).
2. Create `src/paul/process/<NN-slug>/index.md` or
   `src/paul/policy/<NN-slug>/index.md` (NN = next available number in that
   bucket; numbering is bucket-internal).
3. Frontmatter: `layout: base.njk`, `title`, `description`, `state: drafting`,
   `order: NN`, `updated: YYYY-MM-DD`.
4. Open with `<p class="domain-lead">…</p>` then sections. The H1 follows the
   pattern `# Project NN — Title`.
5. End with cross-project connections, references, and
   `{% include "partials/page-meta.njk" %}`.
6. The matching collection picks it up automatically.

### A new top-level page

1. Add `src/<path>/index.md` with `layout: base.njk` and at least
   `title` and `description`.
2. If it should appear in the global nav or the Paul dropdown, edit
   `src/_includes/base.njk`.

### A new Tally form embed

1. Create the form in your Tally account; copy the form ID (last segment of
   the URL).
2. Add or update the entry in `site.tally.*` in `src/_data/site.js`.
3. On the page, set `tallyId = site.tally.<key>`, `tallyTitle`, `tallyHeight`,
   then `{% include "partials/tally-embed.njk" %}`.

---

## 12. Known gaps and small inconsistencies

These are surfaced for awareness — not necessarily things to fix today.

- **`site.repoUrl` is a placeholder.** Until set to the real GitHub repo,
  every `View history` / `Suggest an edit` link in the page-meta footer is
  broken.
- **No `404.html` exists** but `wrangler.jsonc` declares
  `not_found_handling: "404-page"`. Either add a `src/404.md` or change the
  setting to `single-page-application` or `none` until ready.
- **Layer toggle is dead UI.** The aside is rendered into every page but
  hidden by CSS. Re-enable per the inline note in `main.css` if the layered
  content concept is still wanted; otherwise the partial and the JS block
  can be removed.
- **`/paul/proposals/` is now a redirect stub.** The whole proposals series
  was split into `/paul/process/` and `/paul/policy/` (2026-04-27). The old
  `/paul/proposals/index.md` is a meta-refresh redirect to `/paul/process/`,
  with `eleventyExcludeFromCollections: true`. The earlier
  `/paul/proposals/03-redistricting/` per-page redirect stub is now under a
  defunct parent — keep it for now or remove with the rest of the old
  folder. Stale `_site/paul/proposals/<NN>-…/` build artifacts may remain
  from prior builds; an `rm -rf _site && npm run build` clears them.
- **Two Tally forms still TBD.** `pledge` (Paul write-in) and `prefs`
  (broad-issue preferences survey). Placeholder cards explain this in
  rendered pages.
- **`/ideas/` is a placeholder.** The Ideas section (Square Party-level
  essays, distinct from Paul-level Proposals) is wired into the global nav
  and home page but contains only a "to be added" note.
- **The `finance-taxation` domain** is `state: drafting` but is the most-
  developed domain on the site; could be promoted to `in-review`.
- **Deferred concept (Paul, 2026-04-29): "representation at the edges."** The
  framing idea that Paul's effort goes to making things work the way they're
  *supposed* to after appropriations and laws are passed, rather than into
  appropriation and law announcements themselves. Not yet drafted; will need
  a home in `/representation/` or as a sibling. Surface to Paul when working
  on `/representation/` next.

---

## 13. Where to look for things

| You want to…                            | Open                                                                  |
|------------------------------------------|-----------------------------------------------------------------------|
| Change the global header / footer        | `src/_includes/base.njk`                                              |
| Change the empower project shell         | `src/_includes/empower.njk`                                           |
| Edit the domain card grid                | `src/_includes/partials/domain-card-grid.njk` + `.domain-row` CSS     |
| Edit the proposals list partial          | `src/_includes/partials/proposals-list.njk` (parameterized — pass `proposalsList`) |
| Edit the six per-domain entry cards      | `src/_includes/partials/domain-page-cards.njk` + `.entry-card` CSS    |
| Edit the engagement / verify-and-contribute block | `src/_includes/partials/engagement-block.njk`              |
| Edit the "Help us make our laws better" block | `src/_includes/partials/help-block.njk`                          |
| Edit the Schoolhouse Rock onramp         | `src/_includes/partials/schoolhouse-hook.njk`                         |
| Add a new domain                         | new `src/paul/campaign/empower/domain/<slug>/index.md`               |
| Add a new proposal                       | new `src/paul/process/<NN-slug>/index.md` or `src/paul/policy/<NN-slug>/index.md` |
| Update the parks map                     | replace `src/assets/maps/pa3-parks-map.html`; map is self-contained   |
| Add a section nav under a domain         | `<slug>.11tydata.json` next to `index.md`                            |
| Change global accents or fonts           | `:root` in `src/assets/css/main.css`                                 |
| Wire new client behavior                 | `src/assets/js/site.js`                                               |
| Change site.name / repoUrl / email / nav | `src/_data/site.js`                                                   |
| Update Tally form IDs                    | `site.tally.*` in `src/_data/site.js`                                |
| Cloudflare / domain settings             | `wrangler.jsonc` + Cloudflare dashboard                               |
| Voice + [SCIENCE] guide                  | `VOICE_GUIDE.md` at the project root                                  |
