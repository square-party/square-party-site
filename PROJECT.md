# PROJECT.md — Coordination state

This file tracks live coordination state: what's in flight, what's decided, what's pending.
It is not site documentation. For that, read the canonical docs:

- `VOICE_GUIDE.md` — editorial voice, AI tells to strip, page-type table, [SCIENCE] checklist
- `SITE_REFERENCE.md` — site structure, stack, conventions, known gaps
- `SOURCE_DOCS.md` — source document index, placement status, recommended next steps

Read those before any content work. This file only covers what's currently moving.

---

## Coordination model

Two window types:

- **Admin (Opus)** — plans, decides, judges voice. Writes task briefs. Updates this file when state changes.
- **Execution (Sonnet or Haiku per task)** — carries out a specific brief. Reads this file on startup. Reports back; does not commit.

Handoffs flow admin → execution via self-contained task briefs. Each brief names: goal, constraints, voice notes, success criteria, and recommended model. Execution windows do not make site decisions — they stop and ask if a brief is incomplete.

State lives here. If this file is stale, the admin window owns the fix.

---

## GitHub sync ritual

Run this at the start of every session, before touching any files:

```
./scripts/check-updates.sh
```

Review the output. If the local branch is behind origin, pull before working. If there are uncommitted changes from a prior session, resolve them before starting new work.

---

## Tooling access for Claude windows (revised 2026-05-04)

All Claude windows in this project — admin and execution, PUBLIC_CONTENT and WEBSITE_MANAGE — have:

- Read/write access to files in the workspace.
- Permission to run `npm run build` (or `npx @11ty/eleventy`) **only when Paul explicitly asks for a build**.
- Read access to `_site/` after a build, for output inspection.

No window is authorized to:

- `git commit`, `git push`, or any git write operation.
- `npm run deploy`, `wrangler deploy`, `wrangler publish`, any deploy command.
- Modify `package.json` / `package-lock.json` (no `npm install` / `npm update`).
- Build on its own initiative, even when verification would be useful.

**Why the explicit-request rule for builds.** The bash sandbox runs as a different user than Paul's local environment. When Paul has recently built or deployed locally, `_site/` is owned by his user; the sandbox can't unlink those files for the next build, and builds fail with permission errors on asset passthrough. The fix requires Paul to delete `_site/` so the sandbox can regenerate it cleanly.

**Per-request build protocol.** When Paul asks for a build:

1. Paul deletes `_site/` (or confirms it's already absent).
2. The window runs `npm run build` once. No rebuilds within the same request.
3. The window reports outcome and any verification relevant to the edits.

**Default behavior.** After a coherent set of edits, the window declares work done by reporting files edited + inspectable details (line counts, before/after diffs for substantive changes). No build runs unless Paul asks.

`_site/` is in `.gitignore`, so any sandbox builds don't pollute commits. State is ephemeral; regenerated each build.

## `.md → .njk` conversion gotcha

When converting a page from `.md` to `.njk`, check `eleventy.config.js` for any `addCollection` glob that hardcodes `*/index.md`. Those collections silently exclude `.njk` files — pages disappear from listings, navigation, and any partial that walks the collection. Three known globs (all fixed 2026-05-04 to accept `{md,njk}`): `domains`, `ideas`, `policyProposals`. Re-check before any future conversion in case new collections get added.

## Two-Worker architecture (added 2026-05-05)

The site runs on TWO Cloudflare Workers, not one:

- **`square-party`** — static-site Worker. Serves `_site/` (Eleventy output). Config: root `wrangler.jsonc`. Deploys via `npm run deploy` (which runs `npm run build && wrangler deploy`) from project root. URL: `https://squareparty.org`.
- **`square-generator`** — API Worker. TypeScript code at `square-generator-backend/worker/src/index.ts`. Handles `/api/*` routes (square submission, gallery, admin moderation). Bound to D1 (`squares` database) and Turnstile secret. Config: `square-generator-backend/worker/wrangler.toml`. Deploys via `npx wrangler deploy -c wrangler.toml` from the `worker/` subdirectory.

Routes:

- `squareparty.org/*` (everything except `/api/*`) → static-site Worker via Cloudflare's default routing for `assets`-only Workers.
- `squareparty.org/api/*` → API Worker via explicit route registered in `worker/wrangler.toml`'s `[[routes]]` block.

`/admin/*` (HTML page, served by static-site Worker) AND `/api/admin/*` (API endpoint, on API Worker) are both gated by ONE Cloudflare Access application. The Access app must include both paths in its configuration; missing the API path leaves the admin queue page broken with "unauthorized" because the JS-side fetch to `/api/admin/queue` reaches the Worker without the `Cf-Access-Authenticated-User-Email` header.

## Wrangler config-discovery gotcha (added 2026-05-05)

Wrangler 3.x climbs directories looking for a config file. When run from `square-generator-backend/worker/`, it finds the root `wrangler.jsonc` first (because `.jsonc` outranks `.toml` in its discovery order, or simply because climbing) and uses THAT instead of the local `wrangler.toml`. This silently runs commands against the wrong Worker.

**Always use `-c wrangler.toml` when running wrangler commands from the worker subdirectory.** Affects: `deploy`, `secret put`, `secret list`, `deployments list`, `d1 execute`. Examples:

```bash
cd square-generator-backend/worker
npx wrangler deploy -c wrangler.toml
npx wrangler secret put TURNSTILE_SECRET -c wrangler.toml
npx wrangler secret list -c wrangler.toml
npx wrangler d1 execute squares --remote -c wrangler.toml --command="SELECT ..."
```

Without the flag, the command targets `square-party` instead of `square-generator`.

## Build & deploy ownership

Paul builds and deploys; sandboxes do syntactic verification only.

**Why not full builds in sandboxes:** Cross-session file ownership in the sandbox makes any persistent build output (`_site/`, `_site-sandbox/`, etc.) unable to be cleared by a subsequent session — files written by session A appear with permissions session B can't unlink, so Eleventy's passthrough-copy step fails on EPERM. The `build:sandbox` script and `_site-sandbox/` gitignore entry are retained but not recommended; rely on syntactic checks plus Paul's local build for visual verification.

- **Sandbox CAN**: edit source files, validate syntax (`npx @11ty/eleventy --dry-run` parses templates without writing files), inspect source for changes, run linters and other read-only or write-to-source checks.
- **Sandbox CANNOT (reliably)**: run a full Eleventy build that writes to disk, deploy, modify `.git/` internals, commit.
- **Paul does**: full builds (`npm run build`), Wrangler deploys to Cloudflare Workers Pages, GitHub commits.
- Acceptance criteria in execution-window briefs should target source-file outcomes and `--dry-run` parse success — NOT build-output outcomes. If a brief needs visual verification, Paul does the build locally and reports back.

---

## Current state — 2026-05-03

**Done:**
- Substack post-1 drafted (`drafts/substack-01-draft-01.md` working draft; `drafts/substack-01-final.md` Substack-ready). Topic: "If we don't want a King, what do we want?" — Charles addressing Congress as foil for Trump, cognitive science of personality politics. Ends in inquiry mode; does not reveal the Square Party. Not yet published.
- `PROJECT.md` and `scripts/check-updates.sh` created (Sonnet, 2026-05-03).
- Game-maintenance idea (`src/ideas/01-game-maintenance/index.md`) reorganized and revised: section reorder, premise paragraph edits, sports-analogy deduplication, law/act hyperlinks, status callout removed (Sonnet, 2026-05-03).
- Pre-launch hygiene batch (Sonnet, 2026-05-03):
  - `site.repoUrl` updated to `https://github.com/square-party/square-party-site`; `site.description` added.
  - Footer GitHub links (`page-footer-links.njk`) on every page via `base.njk` and `empower.njk`.
  - Tools submenu extracted from "The Party" into its own top-level nav item (Make a square, Square gallery, Income visualizations).
  - Substack cross-linking: `/newsletter/` page, homepage embed, footer link, contribute page "Subscribe" subsection.
  - Contribute page: three new subsections added (Subscribe to newsletter, Help review contributions, Attend an event).
  - `src/404.md` created — builds to `/404.html`.
  - og:image meta tags added to `base.njk`; `og-image.png` generated (1200×630, SVG square + wordmark, DejaVu Serif — Playfair not available in build env; flag for swap when Paul supplies preferred font).
  - `.page-footer-links` and `.newsletter-embed` CSS rules added to `main.css`.

**In flight:**
- **Aspect-toggle + multi-mode content system (PUBLIC_CONTENT M3 = WEBSITE_MANAGE WM-1).** Handed off from PUBLIC_CONTENT 2026-05-04. Source artifacts (spec + addendum + M1 architecture prototype + M2 content prototype) referenced in `../PA3_assembly_work/_not-site-content/public-content-admin/handoffs/aspect-toggle-multi-mode-handoff_2026-05-04.md` (admin work moved out of the site repo on 2026-05-09). PUBLIC_CONTENT M4 (content authoring across all four modes for D9 home + a sub-domain page) picks up after WM-1 ships.

  Architectural decisions locked in WEBSITE_MANAGE admin (2026-05-04):
  - Render-all-four-modes server-side; CSS-driven visibility on `[data-mode]` wrapper attribute.
  - Stack-bar viz with mode-aware emphasis for v1; flow-diagram is M2 follow-up.
  - URL query-string mode persistence (`?mode=synthesis|design|gap|neutral`).
  - Static toggle (not sticky); 200ms opacity fade with `prefers-reduced-motion` respect.
  - Supplementary blocks always inline desktop, expand-on-click mobile.
  - Primary palette ships (sky-teal #5d8a9e + aubergine #3d2e4a); warm-tone alternative parked for visual review.
  - Per-aspect `proseByMode` for tooltips/citations/neutral-fallback; per-profile `leadByMode` for paragraph-level swaps.

  Sub-milestones:
  - **WM-1A** — Toggle widget + state machine. **Done** 2026-05-04. Sandbox HTML at `../PA3_assembly_work/_not-site-content/website-manage/prototype/wm1a-toggle-widget.html`.
  - **WM-1B** — Data file + mode-aware Nunjucks partials + CSS contract. **Done** 2026-05-04. Profile card emitted spurious `data-mode` attributes; admin patched post-return.
  - **WM-1C** — Stack-bar viz partial (server-rendered SVG, CSS-driven mode emphasis). **Done** 2026-05-04. Geometry verified; neutral-mode swaps hatch for solid muted fill (consistent with spec's no-kind-coding rule).
  - **WM-1D** — D9 page restructure. **Done** 2026-05-04. Toggle widget extracted to partial + JS; D9 page wrapped in `data-mode-root`; framingByMode populated with M3-prototype starter content for PUBLIC_CONTENT M4 to rewrite.
  - **Whitespace cleanup pass** (admin, post-WM-1D) — markdown-it was wrapping `<dl>` and other block elements in `<p>` because Nunjucks partials emit blank lines between block elements when included in `.md` files. Applied `{#- ... #}` left-trim modifier across profile-card, prose-block, cta-block, supplementary-block, framing-block to consume the inter-block blank lines.
  - **WM-1E** — Response file to PUBLIC_CONTENT at `../PA3_assembly_work/_not-site-content/public-content-admin/handoffs/aspect-toggle-multi-mode-response_2026-05-04.md`. **Done** 2026-05-04 evening, after Paul's browser-review iteration cycle.
  - **Browser-review iteration pass** (admin, post-WM-1D) — Paul's local review surfaced four issues, all fixed:
    1. SVG rendering as escaped text — caused by markdown-it block-element chunking on a missed blank line in `stack-bar.njk`. Compacted with `{#- ... #}` left-trim pattern.
    2. Toggle stuck under site-header — sticky offset corrected to `top: 56px` (desktop), `top: 64px` (≤768px mobile) to match site-header height.
    3. Viz too small / too big iterations — settled at viewBox `480 × 160` (aspect 3:1), bars at `BAR_H = 40`. Renders ~230px tall in the typical 700px column. `viz-slot` had inherited a placeholder-era `display: flex` that was squeezing the SVG into a column; converted to `display: block`.
    4. Mode-accent-strip CSS rules were targeting `data-mode` on the profile-card (which was removed in the F5 cascade fix); moved selectors to read from page-wrapper `[data-mode]` so the 3px left border now tracks active mode.
  - **Legend added** to stack-bar.njk between the SVG and net-summary — three swatches (design / neutral / gap-with-hatch) with labels. Each item carries `data-aspect-kind` so the same mode-emphasis CSS dims swatches in lockstep with bars.

  Carried over to follow-up:
  - **`.md` → `.njk` conversion for D9 home page.** The current `.md` integrating template is fragile — any blank line introduced between block elements will re-trigger markdown-it wrapping. Converting to `.njk` removes the markdown processing layer entirely and is the clean structural fix. Not urgent for v1; do before M5 (D7 brief) so the D7 page can use the cleaner pattern from the start.
  - **TBD links inside supplementary-block contentMarkdown.** The CTA partial strips `href="TBD"` to no-link; the markdown filter in supplementary blocks does not. Several supplementary blocks contain `[Text →](TBD)` links that render as `<a href="TBD">` and 404. PUBLIC_CONTENT M4 should either supply real URLs or rewrite the markdown to drop the linked TBDs.
  - **Flow-diagram viz** for profiles flagged with `vizFallbackFlag: true` (currently just home-care-aide-Strawberry-Mansion). Stack-bar with annotation ships in v1; flow-diagram is an M2 follow-up.
  - **Final chart-size calibration.** Paul flagged 2026-05-04 evening that the chart at viewBox 480×160 may still be slightly larger than ideal. Defer fine-tuning until either (a) PUBLIC_CONTENT M4 authors more profiles and the size question can be tested across a real curated set, or (b) the flow-diagram viz lands and the visual hierarchy gets re-evaluated. Likely a single-line geometry tweak when the time comes.

**Planned, in order:**
1. "Empower — Domains" content organization — substantial content exists; needs organizing, not drafting. Note: the aspect-toggle architecture in flight changes the architectural target; sequencing this after M3 lands is appropriate.
2. Substack post-2 (Square Party reveal piece) — only after post-1 is published. Will absorb the geographic-plus-topical-representation idea and the empty-square-as-symbol move cut from post-1's "What a different show might look like" section.

---

## Open decisions

- **Post-2 timing and scope.** Blocked on post-1 publication. Scope is roughly settled (see above) but the exact framing hasn't been drafted. Admin window to brief when ready.
- **Empower — Domains organization approach.** The section has substantial content. The question is how to surface and sequence it. No decision yet; admin window to assess and brief.
- **og:image font.** Generated with DejaVu Serif (build env default). If Paul wants Playfair Display, supply the font file and re-run the generator script, or replace `og-image.png` manually.
- **per-page og:image overrides.** Base template supports `ogImage` frontmatter (relative to `/assets/img/`). No per-page overrides set yet.
- **`/events/` page.** Contribute page links to it; page doesn't exist yet. Will 404 until created. Admin window to brief when ready.
- **Light/dark theme on `/paul` subpages.** Paul flagged as pending. Admin window to assess scope and brief.
