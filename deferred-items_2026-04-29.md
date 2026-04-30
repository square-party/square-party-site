# Deferred items — 2026-04-29 session

## Deployment topology (project-lead-confirmed 2026-04-30)

The site has **two deployment paths**:

- **Production: `squareparty.org`** — managed via GitHub. Cloudflare Pages auto-rebuilds on `git push`. This is the canonical path for changes to reach readers.
- **Backup: `square-party.paulplonski.workers.dev`** — manual deploy via `npm run deploy` (which runs `clean && eleventy && wrangler deploy`). Intended as a fallback while production is git-managed.

The two can drift out of sync if one is updated without the other. The `_redirects` file works identically on both (Cloudflare Pages and Workers Static Assets both read it from the published root).

When testing changes: source-of-truth is the local `_site/` after `npm run build`. Production is downstream from GitHub; backup is downstream from `wrangler deploy`. If a change appears in the local build but not on the deployed site, the deploy step (git push for production, `npm run deploy` for backup) is what's missing.



Items raised or surfaced during the long D9-flip / D13-transformation / D2+D4 session of 2026-04-29 that we agreed to defer. Each entry has enough context to pick up cold in a future session.

---

## Site-wide items

### ~~1. Above-the-fold "domains with content" shortcut on the empower index~~ — **DONE 2026-04-29**

Added "## Start here — domains with content" section above the cluster grid, iterating `collections.domains` filtered by `state != "planned"` and ordered by state priority (published → in-review → drafting). D2 and D4 frontmatter descriptions also updated from `_To be drafted_` placeholders to real prose.

### ~~2. Glossary alphabetical resort pass~~ — **DONE 2026-04-29**

Python script-based resort within each letter section, case-insensitive sort by entry title. Six sections needed reordering (B, C, P, R, S, W). All 81 entries preserved; 29 D13-relevant entries verified present after resort.

### ~~NEW — Income visualization redesign~~ — **REDESIGNED 2026-04-29**

User produced a `-public` re-export from Claude Design (`income-viz-public.html`, 2.17 MB, title "What happens when one player wins?") with the DesignCanvas / DCArtboard / TweaksPanel framework removed. Swapped in over the original; link in the empower index "Tools &amp; references" section restored. Income viz also linked from `/ideas/01-game-maintenance/` "The empirical case" section as a related visualization. Frontmatter unchanged.

### NEW — Square generator: Cloudflare backend deployment

**What:** The square generator's frontend (3 templates, 6 vanilla-JS/CSS assets) was integrated into Eleventy on 2026-04-29. The generator UI loads at `/square/`, the gallery at `/gallery/`, and the moderation queue at `/admin/queue/`. **Submissions will fail until the Cloudflare backend is deployed.** Without the backend, users see the generator, can compose a square, but the form's submit will hit a non-existent `/api/*` endpoint.

**Why deferred:** Cloudflare account work (D1, Worker, Turnstile, Cloudflare Access) is project-lead-only — not doable from a sandbox.

**Where to start:** `/tmp/square-gen/handoff/INTEGRATION.md` (extracted from the user's uploaded `square-generator.zip`) has the step-by-step. Sections 1a–1e are the Cloudflare bits:
1. **1a. Create the D1 database** — `npx wrangler d1 create squares` from `handoff/worker/`. Copy the printed `database_id` into `wrangler.toml`.
2. **1b. Run the migration** — `npx wrangler d1 execute squares --file=./schema.sql`.
3. **1c. Set up Turnstile** — Cloudflare dashboard → Turnstile → Add site (Managed mode). Copy the secret key via `npx wrangler secret put TURNSTILE_SECRET`. The site key goes into `src/_data/site.js` as `turnstileSiteKey` (currently set to `REPLACE-WITH-CLOUDFLARE-TURNSTILE-SITE-KEY` placeholder).
4. **1d. Set up Cloudflare Access** for `yoursite.com/admin/*` — One-Time PIN identity provider is simplest. **Don't skip this** — without Access, anyone on the internet can approve squares.
5. **1e. Deploy the Worker** — `npm install && npx wrangler deploy` from `handoff/worker/`. Set up a custom route to `yoursite.com/api/*` so the Eleventy page can hit it as same-origin.

After 1a–1e complete, smoke-test per INTEGRATION.md §3.

**Open decisions to make before deploying** (per `handoff/README.md`):
- Name/handle field for gallery attribution? Default no.
- Approval emails? No by recommendation.
- Featured square on homepage? Handler is wired; flip the flag in `worker/src/index.ts` `featuredEndpoint`.
- Word profanity filter — edit `worker/src/profanity.ts` (placeholder list included).
- Rate limit — 1 submission per IP per hour by default; adjust in `wrangler.toml`.

**Where it lives now:**
- Frontend: `src/square.njk`, `src/gallery.njk`, `src/admin/queue.njk`; assets at `src/assets/square-app/*` (6 files: square-app.css, square-renderer.js, generator.js, gallery.js, admin-queue.js, word-suggestions.js); `apiBase` and `turnstileSiteKey` placeholders in `src/_data/site.js`.
- Linked prominently from the home page hero (the SVG square + the "Make yours →" caption text both point at `/square/`).
- Backend handoff package extracted to `square-generator-backend/` at the workspace root (148K — README, INTEGRATION.md, eleventy/ templates that match what's already in `src/`, worker/ source + schema + wrangler.toml, docs/ for data-model + moderation + privacy). The `eleventy/` subfolder is reference; the actual templates are already copied into `src/`. The `worker/` subfolder is what needs deploying per INTEGRATION.md §1.

### Original deferred-item-1 (preserved for reference)

**What:** A small section above the cluster grid on `/paul/campaign/empower/` (and as a navigation aid from the party-level pages) linking directly to domains that have actual content rather than stubs. With D9 in `in-review` and D13 in `drafting`, plus D2 and D4 incoming, the visitor's path to live content currently runs through the cluster grid only — which on first load is collapsed (per the inverted-collapse default).

**Why deferred:** Surfaced mid-session; would have interrupted the D13 SD-page production rhythm. Is small (probably 30–60 min) but interacts with the cluster grid behavior.

**Where to start:** `/Users/paul/codeProjects/square-party-site/src/paul/campaign/empower/index.md` is the file. Look at the existing intro before `{% include "partials/domain-card-grid.njk" %}`. Probably wants a small `<aside>` or a horizontal row of `entry-card`-style links above the grid, listing the domains where `state != "planned"`. Could iterate the `collections.domains` collection filtered by state to be future-proof.

**Acceptance test:** A new visitor landing on `/paul/campaign/empower/` sees direct links to D9 Finance & Taxation, D13 Physical Infrastructure (and D2 Public Health, D4 Food & Drugs once they have content) above the cluster grid. The links bypass the cluster-collapsed default.

---

### 2. Glossary alphabetical resort pass

**What:** A one-time pass through `src/paul/campaign/empower/glossary/index.md` to ensure entries within each letter section are in correct case-insensitive alphabetical order.

**Why deferred:** Inserting many new entries fast (33 D13 entries across 4 SD passes plus a Justice40 entry that required a new J section) introduced ordering errors easily. The N section was reordered manually mid-session; SDWA was inserted between Schedule H and Schedule SP rather than between Schedule SP and SE tax (off by one position). Other minor mis-orderings likely.

**Where to start:** Read all of `src/paul/campaign/empower/glossary/index.md`. Within each `## X` section, verify entries are alphabetized case-insensitively. The simplest implementation is a Python script that parses the file by `<h3 id="...">` blocks, sorts them within each section, and writes back. Or by hand if the count is small enough — probably 2–4 swaps total.

**Acceptance test:** Entries within each letter section are in case-insensitive alphabetical order with no skipped positions.

---

### 3. SDP "Accelerating Opportunity" vote outcome (April 30, 2026)

**What:** The SDP Board of Education vote on the Facilities Master Plan was scheduled for April 30, 2026 (postponed from April 23). The plan parameters in the D13 sub-domain page and the recent-changes entry note the vote as pending. After the vote, both pages should be updated with the outcome (approved / approved-with-amendments / postponed-again / rejected) and any revised plan parameters.

**Why deferred:** Vote was after the verification window for D13 verified (2026-04-27). Will become a recent-changes entry once known.

**Where to start:** `src/paul/campaign/empower/domain/physical-infrastructure/sub-domains/schools/index.md` (Local architecture section, "Accelerating Opportunity" subsection) and `src/paul/campaign/empower/domain/physical-infrastructure/recent-changes/index.md` (the "April 30, 2026 (pending)" changelog entry — would convert to actual-date with outcome).

---

## D13 Physical Infrastructure — remaining

### 4. D13 Neighbors page (composite household profiles)

**What:** Fully drafted Neighbors page with composite household profiles illustrating each of the seven sub-domain's structural conditions at the household scale.

**Why deferred:** This is the candidate that needs the dedicated `pa3-website-neighbors-page` skill we discussed. Composite-profile construction risks the same confabulation failure that bit the D5 substructure overreach earlier in the session — the rhetorical register expects specific numbers, names, and addresses, and without source-discipline running, those slots get filled by plausibility rather than retrieval. Doing it freehand in the same session as 7 SD pages was rejected on confabulation-risk grounds.

**Where to start:** Recommended approach (recorded in `website-transform_process-log_2026-04-29.md` under "Recommendation — neighbors-skill architecture"): a post-verification, interactive, source-disciplined skill that reads only verified pathway tracing + statistical profile + geographic variation as data sources; composes draft profiles using only data from the verified document; surfaces each draft to project lead for approval before commit. Operates in two modes: **transform mode** when verified already has constituent profiles (D9 has Constituent 1/2/3 named composites); **construct mode** when verified has only pathway tracing (D13).

For D13: the verified file (`uploads/D13_phsInf_verified_2026-04-27.md`) has Pathway Tracing — Three Aggregate Pathways in each substantive sub-domain. The construct-mode skill would assemble profiles drawing strictly from those pathways plus the four-sub-area characterizations.

**Acceptance test:** A composite profile for each of the four sub-areas (or one per pathway type, project-lead's choice) constructed without inventing any specific number, statute, name, or address not present in the verified document; project lead reviews each profile inline before commit.

---

### 5. D13 Top-level overview review

**What:** The top-level `physical-infrastructure/index.md` was filled with real content this session — lead paragraph, six populated cards, and two `<aside class="layered-section">` blocks ("Where there's traction" / "What's at stake"). It's substantive but synthesis-heavy and needs project-lead voice review before flipping to `in-review`.

**Why deferred:** Voice/synthesis review is project-lead work, not skill-extractable.

**Where to start:** `src/paul/campaign/empower/domain/physical-infrastructure/index.md`. The "Where there's traction" and "What's at stake" sections in particular benefit from a voice pass.

---

## D2 Public Health and D4 Food & Medicine — incoming

### 6. D2 / D4 SD-page transformations

**What:** Process the verified docs uploaded 2026-04-29 (`uploads/D2_pubHealth_verified_2026-04-29.md` and `uploads/D4_foodMed_verified_2026-04-29.md`) into website pages following the established D9/D13 pattern.

**Why deferred:** Scope. Each domain is 5–7 sub-domains × 30–60 min/page = 4–7 hours of focused work each. The pattern is well-validated; this is throughput work.

**Where to start:** Re-read `website-transform_process-log_2026-04-29.md` first to load the established patterns. Then use the same workflow used for D13: skeleton first (12 page stubs + directory data file for sub-nav), then SD-page transformations one at a time, then cross-SD synthesis pages (overview, gaps, recent-changes), then neighbors via the dedicated skill.

---

## Cross-cutting / tooling

### 7. Skill extraction — `pa3-website-subdomain-page`

**What:** Extract the SD-page transformation skill from the now-stable pattern documented in `website-transform_process-log_2026-04-29.md`. After 7 D13 SD pages and the cross-SD pages, the pattern is fully validated across substantive SDs, synthesis SDs, and the structurally-distinct schools SD.

**Why deferred:** Building a proper SKILL.md (with trigger description, references files for protocols, edge-case handling, and installation in Cowork's skills directory) is 1–3 hours minimum and would have delayed content production.

**Where to start:** Follow the structure of the existing PA3 skills (in the uploaded `complete_domain_analysis_skills.zip`). The process log captures the substance; the skill is the formalization. Suggested skill candidates per the process log: `pa3-website-subdomain-page` (largest leverage); `pa3-website-domain-overview`; `pa3-website-gaps-page`; `pa3-website-recent-changes-page`; `pa3-website-neighbors-page` (the dedicated one with construct-mode and transform-mode).

### 8. Glossary-extraction skill (or sub-skill)

**What:** Smaller skill or sub-skill that reads an SD page draft and surfaces terms-of-art, statutes, agencies, and acronyms; checks against existing glossary anchors; drafts missing entries in correct alphabetical position.

**Why deferred:** Surfaced during D13 work as part of the larger skill-extraction question; would have delayed content production.

**Where to start:** The 33 D13 glossary entries added across SD1, SD2, SD3, SD4, SD5, SD6, SD7 plus the synthesis-SD7 are a complete worked example of what the skill should produce.

---

## Session housekeeping

### 9. Stub files needing physical removal (sandbox could not delete)

Two files exist on disk only because the sandbox could not delete them:

- `D5_emerMgmt_substructure-draft_2026-04-29.md` — overreached substructure draft; now contains a "DELETE ME" marker
- `src/paul/process/index.md` — replaced by `/ideas/` move; now stub with `permalink: false`

When convenient: `rm D5_emerMgmt_substructure-draft_2026-04-29.md` and `git rm src/paul/process/index.md && rmdir src/paul/process/`.

### 10. D9 status flip eventual

**What:** D9 Finance & Taxation is currently in `state: in-review`. The framework's progression is `drafting → in-review → published`. When the project-lead has fully reviewed D9, flip its 8 frontmatter `state:` values to `published`.

**Why deferred:** Awaiting project-lead review.

**Where to start:** `find src/paul/campaign/empower/domain/finance-taxation -name '*.md' -exec sed -i 's/^state: in-review$/state: published/' {} +` and rebuild.

---

*This file lives at the workspace root. When all items are addressed, delete or archive.*
