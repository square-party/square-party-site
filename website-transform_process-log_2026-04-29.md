# Website Transformation — Process Log

**Started:** 2026-04-29
**Purpose:** Capture the patterns and decisions involved in transforming a verified PA-3 domain analytical document (`D{n}_{slug}_verified_{date}.md`) into the website's multi-page structure (one per domain under `src/paul/campaign/empower/domain/{slug}/`). Intended to seed eventual website-skill development. Pulled at the moment patterns surface; not formalized prematurely.

**Source-of-truth pattern:** D9 Finance & Taxation (verified → already on site). D13 Physical Infrastructure (verified → in progress as the second exemplar).

---

## Working hypotheses about skills to extract

These are working hypotheses, not commitments. Revisit after we've completed D13 and have two exemplars to compare.

1. **`pa3-website-subdomain-page`** — transformation of one verified `## SUB-DOMAIN N` block into `src/.../sub-domains/{short-slug}/index.md`. Largest unit of repeated work; likely the most leveraged skill. Mechanical-ish: lead paragraph synthesis + Track 1 → Legal Architecture restructure + glossary linking + frontmatter.
2. **`pa3-website-domain-overview`** — composing the domain top-level `index.md` (overview prose + the rich `cards:` frontmatter block). Synthesis-heavy; one-shot per domain.
3. **`pa3-website-gaps-page`** — transforming per-SD gap analyses + cross-cutting findings into a single `gaps/index.md`. Synthesis + extraction.
4. **`pa3-website-recent-changes-page`** — transforming the verified doc's "Summary of Material Changes" into the changelog format. Mostly mechanical.
5. **`pa3-website-neighbors-page`** — composite-profile construction with filtering UI. Likely fresh writing per domain (verified content won't have polished composites). Probably its own skill, not subsumable into the others.

The above-the-fold "domains with content" shortcut and the sub-domain-listing page (`sub-domains/index.md`) are minor enough to fold into the overview skill.

---

## Established patterns from D9 (the source-of-truth exemplar)

### Domain page structure under `src/paul/campaign/empower/domain/{slug}/`

```
{slug}/
├── index.md                    — overview, rich cards: frontmatter, two layered <aside> sections
├── sub-domains/
│   ├── index.md                — sub-domain listing with .subdomain-list HTML block
│   └── {short-slug}/index.md   — one per SD, full analytical content
├── gaps/index.md               — synthesis of gap patterns + per-SD summaries
├── neighbors/index.md          — composite profiles with filter chips
└── recent-changes/index.md     — changelog format
```

### Sub-domain page transformation pattern (D9 → on-site)

**Frontmatter additions** (not present in verified):
- `layout: empower.njk`
- `title: {SD short title}` (e.g., "Philadelphia Wage Tax")
- `saveable: true`
- `savedContext: "{Domain name} · Sub-Domain"`
- `description: {one-sentence summary of the SD}`
- `state: {drafting | in-review | published}` — matches domain top-level state
- `updated: {YYYY-MM-DD}`
- `breadcrumbExtras:` array — Domains, Domain name, Sub-Domains

**Body structure transformations:**
- **Lead paragraph (NEW).** A `<p class="domain-lead">…</p>` paragraph composed from the SD content but written specifically for the page. Synthesizes the SD's key facts (rate, scope, key gap, fiscal magnitude) into 2–4 sentences. Not a copy from verified.
- **`# {SD title}`** as page H1 (matches `title:` frontmatter).
- **Verified `### Track 1: Legal and Institutional Architecture` → on-site `## Legal Architecture`.** Promote one heading level (since the page is about a single SD, the H1 is the SD).
- **Verified bold sub-headers (`**Constitutional Foundation**`, `**State Statutory Layer**`, etc.) → on-site `### {Reader-friendly name}`.** Examples from D9 SD1: "Constitutional Foundation" → "Constitutional foundation"; "Local Statutory Layer — Philadelphia Code § 19-1500" → "Local statute — Philadelphia Code § 19-1500".
- **Bold "feature" markers preserved:** `**Feature 1 — {name}.**` paragraphs stay bold-led.
- **Glossary linking.** Inline links on key terms via `[Term](/paul/campaign/empower/glossary/#anchor)`. Examples seen: `Schedule SP`, `LTEA`, `uniformity clause`, `NPT`, `SIT`. The glossary page itself owns the anchors. Need to keep a working list of glossary entries to know what's link-able.
- **Constituent profiles.** Promoted from inline content to a labeled section: `<h2 id="constituent-profiles">Constituent profiles</h2>` with introductory framing about composites being illustrative.

### Top-level domain page (`{slug}/index.md`) pattern

**Rich `cards:` frontmatter block** drives the `domain-page-cards.njk` partial. Six cards: `neighbors`, `contribute`, `changes`, `gaps`, `subdomains`, `law`. Each has `desc` (description prose, ~3 sentences) and `cta` (button label). Some have explicit `href`; others fall back to defaults.

**Body has two `<aside class="layered-section">` blocks:**
- `layered-section--light` "Where there's traction" — what's structurally fixable, what's within unilateral authority, what reform paths exist.
- `layered-section--dark` "What's at stake" — distributional consequences, fiscal magnitude, why the gap matters.

Each aside is 3–4 paragraphs of prose synthesizing across SDs.

### Sub-domain listing page (`sub-domains/index.md`) pattern

Brief `<p class="domain-lead">` framing, then a `<div class="subdomain-list">` containing one `<a class="subdomain-row">` per SD with `<span class="subdomain-row__num">N</span>` + title + 2–3 sentence description. No frontmatter `cards:` block (that's only for the domain top-level).

### Gaps page pattern

`<p class="domain-lead">` defining what a "gap" means in this analysis. Then "## The recurring patterns" with 3 numbered patterns each as a bold-led paragraph. Then "## Gaps by sub-domain" with brief summaries linking to each SD's full gap analysis.

### Recent-changes page pattern

`<p class="domain-lead">` summarizing the change set. Then a `<div class="changelog">` wrapping `<article class="changelog-entry">` blocks. Each entry has `<header>` with date + H2 title, then prose + `<ul>` of key points + cross-references.

### Per-domain section nav (Eleventy directory data file)

The per-domain `<nav class="project-nav">` strip (Home / Neighbors / Sub-Domains / Recent Changes / The Gaps / Glossary, with the domain name as the label) is wired via an Eleventy **directory data file** named `{slug}.11tydata.json` co-located with the domain's `index.md`. The JSON sets `sectionNav` with `label` and `items`, which the `empower.njk` layout reads. Without this file, pages fall back to the global `site.empower.nav` (Home / Domains / Timeline / Contribute / Contributors / About) — which is the wrong nav for inside-a-domain context.

**Skeleton must include this file.** Forgetting it leaves the new domain's pages showing the global empower nav instead of the per-domain nav. Caught the omission on D13's first dev review (2026-04-29). Optional `Legal Text` entry should be added to the data file only after a `/paul/campaign/empower/law/{slug}/` page exists.

### Neighbors page pattern

`<p class="domain-lead">` framing the composite-profile device. A `<aside class="construction-note">` explaining why composites (rather than real named individuals). Filter chips by sub-domain and sub-area. Then composite cards (each with neighborhood, sub-domain tag, name placeholder, narrative).

---

## Decisions log (D13 work)

### 2026-04-29

- **State field for new D13 pages:** `drafting` (per project lead). Will iterate wording, then flip to `in-review` before publishing.
- **D9 (Finance & Taxation) state:** flipped from `drafting` to `in-review` across all 8 D9 files since it's already published-quality. (Done.)
- **D13 sub-domain slugs (short, per project lead):** `transit`, `water`, `roads`, `waste`, `schools`, `parks`, `federal-funding`. The verified file uses descriptive titles; the website uses short slugs and titles can stay descriptive in frontmatter.
- **Tonight's scope:** skeleton (12 page stubs) + 2 fully-fleshed sub-domain pages (Transit & Mobility, Federal Funding). Defer overview, gaps, neighbors, recent-changes to subsequent sessions.
- **Glossary integration:** D9 references multiple glossary anchors (`schedule-sp`, `article-viii-1`, `ltea`, `npt`, `sit`). D13 will need its own glossary entries; for tonight's two SD pages, flag glossary-link opportunities inline as `_[term needs glossary entry]_` rather than blocking on the glossary page itself.

---

### Patterns confirmed and refined after Transit & Mobility (D13 SD1)

The D9 → on-site transformation patterns documented above largely held when applied to D13 SD1. Refinements observed:

- **Verified-doc structures differ between domains.** D13 SD1 has no `Constituent-Level Experience` section and no `Conversational Narrative Note` section — D13's verified format uses `Pathway Tracing — Three Aggregate Pathways` instead, embedded inside Track 2 rather than separate. The on-site D13 SD1 page therefore has no "Constituent profiles" section and no "Conversational note" section. **Skill implication:** the transformation skill must detect which sections exist in the verified and only emit sections for which content exists. Don't impose D9's section set on every domain.
- **Track 1 sub-section markup varies.** D9 verified uses bold sub-headers (`**Constitutional Foundation**`); D13 verified uses H4 (`#### Constitutional and statutory grounding`). The on-site target is H3 (`### Constitutional foundation`) regardless. Skill must accept either input format and emit H3 (lower-case, sentence-style).
- **Gap-item annotations are analytical-workspace artifacts.** D13 verified gap items include trailing `*Confidence: HIGH on...*` and `*Representation implication: ...*` notes. D9's verified is similar. The on-site page strips both — they're for the project's analytical workflow, not the reader. Skill must strip these.
- **Stable gap IDs (`G13-SD1-XX`) get dropped on-site.** Verified uses `**G13-SD1-XX: Title.**`; on-site uses `**Gap N — name.**`. Stable IDs live in the analytical workspace and the eventual Gaps page if needed.
- **Verification flag IDs and OUTPUT-correction inline notes get stripped.** Verified prose includes things like `(F13-T2-S1-3)` and `*The OUTPUT identified ... Verification clarification: ...*`. On-site strips the meta-flags and keeps only the corrected substantive content.
- **Cross-domain references reformulated.** Verified says "(Finance SD7 carry-forward; F9-46 in Finance verification flags)". On-site reframes more naturally: "carried forward from the [Finance & Taxation] analysis" with an inline link to the domain page.
- **Glossary linking with not-yet-existent anchors.** D13 SD1 needed terms not in the existing glossary (Title VI, ADA Title II, IIJA, FTA Section 5307, CIG, Act 89, DVRPC). Used the `/paul/campaign/empower/glossary/#term-slug` URL pattern even when the anchor doesn't yet exist — link works as soon as the glossary entry is added; until then, click sends reader to the glossary page (graceful degradation).

### Lead-paragraph pattern (refined after Transit feedback)

The first cut of the Transit lead opened with structural framing ("Transit and mobility in PA-3 is principally SEPTA…") packed with five-or-so dense facts. Per project-lead feedback, the right pattern is:

1. **First sentence: human entry point.** "Most workers in PA-3 get to work on a bus." Where the constituent meets the system. Not the institutional framing.
2. **Second/third sentences: surface disability accessibility content if the verified contains it.** Skill rule: scan the verified SD for accessibility metrics (ADA Title II compliance rates, paratransit access, station accessibility percentages, Section 504, accommodations) and surface what's present in the lead. Don't invent if absent. For Transit: the 46% station accessibility figure is in the verified; surfacing it in the lead is high-value.
3. **Body sentences: structural framing with key facts.** Crisis chronology, fiscal magnitude, federal/state/local layered architecture — the dense material that the original first cut led with — moves down into the body of the lead paragraph.
4. **Closing sentences: leverage limits.** What level of government has what authority. Sets up the gap analysis that follows.

Length unchanged (~5 sentences). Density distribution changed — opens gentler, lands the same.

### Markdown-inside-HTML-block gotcha (caught on dev review of D13 pages)

Inside any `<p class="domain-lead">` block (and any other Type 6 HTML block per CommonMark — `<aside>`, `<div>`, etc.), markdown-it treats contents as raw HTML and does NOT process markdown link syntax. So `[Term](url)` written inside a lead paragraph renders as literal text, not as an anchor tag.

**Pattern:** any link inside `<p class="domain-lead">` (and inside `<aside>` blocks like construction-note or schoolhouse-hook) MUST be written as raw HTML `<a href="url">Term</a>`, not as markdown `[Term](url)`.

**Where this is wrong on the existing site:** D9 wage-tax `index.md` line 17 has `[Schedule SP](/paul/campaign/empower/glossary/#schedule-sp)` inside its lead paragraph — currently renders as literal markdown. Same fix needed there. Worth a sweep across all D9 lead paragraphs to catch any others. Skill rule: in transform/construct mode, when emitting a lead paragraph or aside, all glossary / cross-reference links must be raw HTML, never markdown link syntax.

### Patterns confirmed and refined after Federal Funding (D13 SD7)

D13 SD7 is structurally a synthesis sub-domain (parallel to D9 SD7 Burden Distribution). Re-applying the established patterns held with these refinements:

- **Synthesis SDs follow the same H2 structure** (`## Legal Architecture` / `## Geography & representation` / `<h2 id="gaps">Gap analysis</h2>`) but with heavier content under each H2. D9 SD7 confirmed this; D13 SD7 confirms again.
- **Legal Architecture for synthesis SDs may include analytic sub-sections beyond Constitutional/Federal/State/Local.** D13 SD7 has an `### Administrative-vulnerability taxonomy` H3 and an `### IIJA reauthorization as structural inflection point` H3 inside Legal Architecture. These are synthesis structures the verified provides; the on-site page preserves them as additional H3s under Legal Architecture rather than promoting to H2.
- **Geographic variation may not be sub-area-based for synthesis SDs.** D13 SD7's geographic-variation section is by funding-channel (direct-recipient / state-pass-through / competitive-grant / cross-jurisdictional) rather than by the four-sub-area framework. The verified text explicitly notes the four-sub-area framework's relevance is indirect for this SD. The on-site page preserves the funding-channel structure as bullets within Geography & representation.
- **The Domain-Synthesis Representation Question is a domain-level synthesis** (in D13 SD7, explicitly labeled as such), distinct from per-SD representation questions. On-site treatment: keep it inside Geography & representation but recognize it carries the full domain synthesis weight.
- **Verification-update markers are even denser in synthesis SDs** because the cross-cutting nature surfaces more changes. D13 SD7 had `***Verification update — ...:***` markers on most major program descriptions (IIJA, OBBBA, Justice40, CDBG, PA state transit funding, IIJA reauthorization status). All stripped on-site, keeping only the corrected substantive content.
- **No disability-accessibility content present for SD7** because it's about funding architecture, not delivery. Per the lead-paragraph pattern: scan, surface if present, skip if absent. SD7 lead skipped the disability sentence.
- **Lead paragraph for synthesis SD opens with cross-SD framing** — "Most of what reaches PA-3 residents through the other six physical-infrastructure sub-domains starts as a check from somewhere in Washington." Sets the synthesis context before naming the substantive content. Pattern: synthesis-SD lead paragraphs reference the SDs they synthesize across.

### Glossary entries added (D13 SD1 pass, 2026-04-29)

All seven D13 SD1 glossary entries plus a SEPTA entry are now in `src/paul/campaign/empower/glossary/index.md` in correct alphabetical positions:

- **Act 89** (A section) — Pennsylvania transit funding act
- **ADA Title II** (A section) — public-entity accessibility under 42 U.S.C. § 12131 et seq.
- **CIG** (C section) — Capital Investment Grants Program (49 U.S.C. § 5309)
- **DVRPC** (D section) — Delaware Valley Regional Planning Commission
- **FTA Section 5307** (F section) — Urbanized Area Formula Program (49 U.S.C. § 5307)
- **IIJA** (I section) — Infrastructure Investment and Jobs Act (Pub. L. 117-58)
- **SEPTA** (S section) — Southeastern Pennsylvania Transportation Authority
- **Title VI** (T section) — Title VI of the Civil Rights Act of 1964 (42 U.S.C. § 2000d)

Status callout at top of glossary updated to mention Physical Infrastructure alongside Finance & Taxation.

**Skill implication.** A glossary-extraction skill (or sub-skill) should be part of the SD-page transformation flow: scan the SD page draft for terms-of-art, statutes, agencies, and acronyms; check whether each has an existing glossary entry; if not, draft one and append in alphabetical position. Otherwise glossary work happens by hand at the end and is easy to skip.

### Glossary entries added (D13 SD7 pass, 2026-04-29)

Eight more after SD7 transformation:
- **BRIC** (B section) — Building Resilient Infrastructure and Communities
- **CDBG** (C section) — Community Development Block Grant
- **DWSRF / CWSRF** (D section) — Drinking Water and Clean Water State Revolving Funds
- **HMGP** (H section) — Hazard Mitigation Grant Program
- **Justice40** (new J section) — federal equity-targeting framework (revoked 2025)
- **LWCF** (L section) — Land and Water Conservation Fund
- **PENNVEST** (P section) — Pennsylvania Infrastructure Investment Authority
- **Stafford Act** (S section) — Robert T. Stafford Disaster Relief and Emergency Assistance Act

Glossary now covers **23 D13-relevant entries** in addition to the original Finance & Taxation entries.

### Patterns confirmed after Water & Stormwater (D13 SD2)

Third pass; pattern stable. Notable observations:

- **Substantive SD pattern is rock-solid.** SD2's Track 1 (Constitutional/Federal/State/Local), Track 2 (Data Provenance, Statistical Profile, Geographic Variation, Pathway Tracing, Representation Question), and Gap Analysis all mapped cleanly to the established on-site sections.
- **Lead paragraph "less dense" pattern works on a glossary-heavy SD.** SD2 needed 9 glossary links in the lead alone. Using raw `<a>` tags keeps it readable; opening with PWD as a familiar anchor, then walking the three pathways (lead, CSO, affordability, flooding) keeps the density manageable.
- **No disability-accessibility content in SD2.** Per the lead-paragraph pattern, scan-and-skip-if-absent was applied. SD3 (roads/pedestrian) will likely have ADA Title II content (sidewalks, curb ramps); track it.
- **Cross-domain reference to Finance & Taxation** ("PILOET fiscal gap...") reframed inline as `<a href="/paul/campaign/empower/domain/finance-taxation/">Finance &amp; Taxation</a>` rather than the verified's "Finance SD4 carry-forward" framing. Same pattern as SD1's reference.
- **Glossary alphabetical-order discipline.** Inserting many new entries at once introduces ordering errors easily. SDWA was inserted slightly out of position (between Schedule H and Schedule SP rather than between Schedule SP and SE tax) — visually fine, alphabetically off-by-one. Skill rule: alphabetize on insertion using case-insensitive sort. A periodic alphabetization pass on the whole glossary is worth running before publication.

### Income visualization page added (end-of-session, 2026-04-29)

User-supplied React/Babel income visualization (Claude Design export, `income-viz.html`, 2.18 MB) added at `/income-viz/`. Eleventy integration: dropped at `src/income-viz.html` with frontmatter:

```yaml
---
permalink: /income-viz/index.html
layout: false
templateEngineOverride: false
---
```

`templateEngineOverride: false` is necessary because the embedded JSX uses `{...t, scale: 'linear'}` and other brace patterns that Nunjucks would attempt to interpret as template expressions. With the override, Eleventy strips frontmatter and writes the rest of the file unchanged (verified: source 2,187,418 bytes → output 2,187,418 bytes).

**Runtime caveat known.** The file contains UUID-named external script references (e.g., `d2674773-660c-4004-85ae-dbcaa860a4e5`) inside the embedded React/Babel app. These appear to be Claude Design bundler refs. Whether the visualization renders depends on whether the embedded JS handles those references internally or actually fetches them from a bundler URL. Untested in browser; user to verify on dev. If it fails to render, the precompiled JS version (~80 KB per the user's note) is the next step.

**Update 2026-04-29:** First export rendered the design-canvas comparison view (3x3 grid of variant artboards) with non-functional Tweaks panel — wrong layout for end users. User re-exported as `income-viz-public.html` (title "What happens when one player wins?", 2.17 MB) with the `<DesignCanvas>` / `<DCArtboard>` / `<TweaksPanel>` framework removed; swapped in over the original. Link in empower index restored. Same frontmatter, same Eleventy treatment. Bundler-ref runtime caveat may still apply — verify on dev.

Discovery: linked from `/paul/campaign/empower/` "Tools &amp; references" section (renamed from "PA-3 reference"; now lists both the parks map and the income viz).

### Visual patterns ported from prototype mockups (end-of-session, 2026-04-29)

Three CSS-only visual patterns added to `src/assets/css/main.css`, ported from `representation.html` and `web_v3_draft.html` mockups in the workspace root:

- **`.bar-chart`** — horizontal bar chart for comparisons. Title (small uppercase eyebrow), `<div class="bar-row">` per bar with `<span class="bar-label">` and `<div class="bar-track"><div class="bar-fill" data-tone="...">value</div></div>`. Tone variants via `data-tone="accent|warm|published|in-review|drafting"`. Optional `<p class="bar-note">` footer. Stacks vertically below 600px.
- **`.timeline`** — vertical timeline with dot markers. `<div class="timeline-item">` per entry, with `.tl-label`, `.tl-title`, and a `<p>` description. Used inline in markdown via raw HTML.
- **`.stat-row`** + **`.stat-card`** — featured-number cards. Border-top accent, large display number, small uppercase label. Tone variants via `data-tone="warm|published|in-review|drafting"` on the card.

All three use existing CSS variables (`--ink`, `--accent`, `--accent-warm`, `--parchment-light`, `--divider`, `--muted`, plus the state-color vars). Mobile-friendly. No JS dependencies.

**Worked examples landed tonight:**
- D13 Transit & Mobility: SEPTA fiscal crisis chronology bullet list converted to a 11-item vertical timeline (Aug 2025 ultimatum → Jan 2026 averted second wave).
- D13 Physical Infrastructure overview: 5-card stat row (2.4× KSI disparity / $3.8B William Penn gap / 22°F heat differential / 46% SEPTA station accessibility / Sept 30 2026 IIJA expiration).

**Skill implication.** Visual-pattern selection is a substantive choice that varies by SD content; not directly skill-extractable, but the skill can prompt for opportunities. Specific visual candidates surfaced during D13 work: timeline for OBBBA/Justice40/P.L. 119-75 cascade (federal-funding SD); bar charts for HIN concentration vs UC tract (roads SD); stat cards for PWD lead service line inventory totals (water SD); bar charts for tree canopy by sub-area (parks SD); bar charts for SDP environmental management budget growth FY21–FY25 (schools SD). All deferred to next session.

### D2 + D4 skeleton scaffolding (end-of-session, 2026-04-29)

D2 Public Health (~19,750 words verified) and D4 Food &amp; Medicine (~39,800 words verified) skeletons added end-of-session. Both follow the established 12-page structure (top-level index + sub-domains/index + 7 SD stubs + gaps + neighbors + recent-changes) plus the `{slug}.11tydata.json` directory data file for sub-nav. Generated programmatically via Python script (preserved in chat history) — saving ~1 hour over hand-writing the 26 stub files.

Both domain stubs flipped from `state: planned` to `state: drafting`. Cluster grid now shows D9 (in-review), D13 (drafting), D2 (drafting), D4 (drafting) — four domains with content states beyond "planned."

**D4 structural-shape note for future sessions.** D4's per-SD verified content has a 12-section internal structure (§1 Data Provenance through §12 Verification Flags) that is materially richer than D9 or D13:
- §1 Data Provenance — maps to existing "Data provenance." in Geography &amp; representation
- §2 Hierarchical Authority Chain Diagram — NEW; not in D9 or D13 — needs new on-site treatment (probably an H3 sub-section under Legal Architecture)
- §3 Supporting prose — bulk of Legal Architecture content
- §4 Statistical profile — maps to existing pattern
- §5 Geographic variation across four sub-areas — maps to existing pattern
- §6 Aggregate Pathway Analysis — maps to "Pathway tracing"
- §7 Conversational Narrative Note — matches D9 pattern (D13 didn't have these); on-site `## Conversational note` section
- §8 Pathway tracing — specific breakdown points — additional pathway detail
- §9 Representation Question — matches existing pattern
- §10 Temporal Change Tracking — NEW; could surface as inline notes within affected sections, OR feed into the Recent Changes page directly
- §11 Gap Analysis (revised) — matches existing pattern
- §12 Verification Flags — analytical workspace; strip from on-site

The skill that processes D4 content needs to handle this richer schema. The skill that processed D13 would over-collapse D4.

**D4 sub-domain count and shape:** 7 SDs — Food, Meat &amp; Poultry, Drugs (CDER + CVM + IRA pricing), Biologics &amp; Devices, Tobacco, Controlled Substances, Federal Regulatory Architecture (Synthesis). Slugs: `food`, `meat-poultry`, `drugs`, `biologics-devices`, `tobacco`, `controlled-substances`, `federal-architecture`.

**D2 sub-domain count and shape:** 7 SDs — Public Health Infrastructure &amp; Governance, Communicable Disease Control, Maternal &amp; Child Health, Chronic &amp; Non-Communicable Disease, Environmental Health, Health Access FQHCs &amp; SDOH, Substance Use &amp; Harm Reduction. Slugs: `infrastructure`, `communicable-disease`, `maternal-child`, `chronic-disease`, `environmental-health`, `access-fqhc`, `substance-use`. D2's per-SD shape should map cleanly to the established D13 pattern.

### Tally update (after SD3, SD4, SD5, SD6)

| Domain | Verified date | On-site state | Pages on site (filled / total) | Process notes |
|---|---|---|---|---|
| D9 Finance & Taxation | (verified) | in-review (flipped 2026-04-29; D9 sweep 2026-04-30 converted 12 markdown links inside HTML blocks to raw `<a>`) | 12 / 12 | The exemplar |
| D13 Physical Infrastructure | 2026-04-27 | drafting | 7 / 12 (SD1 Transit, SD2 Water, SD3 Roads, SD4 Waste, SD5 Schools, SD6 Parks, SD7 Federal Funding) | All seven sub-domain pages drafted. Remaining: top-level overview synthesis, gaps page, neighbors page, recent-changes page. |

### Patterns confirmed across all seven D13 sub-domains

After completing all seven D13 sub-domain pages, the transformation pattern is fully validated:

- **Substantive SDs** (SD1, SD2, SD3, SD4, SD6) follow Track 1 (Constitutional/Federal/State/Local) → Track 2 (Data Provenance, Statistical Profile, Geographic Variation across four sub-areas, Pathway Tracing, Representation Question) → Gap Analysis. On-site pattern: `## Legal Architecture` (with H3 sub-sections) → `## Geography & representation` (with bold-led paragraphs and bulleted sub-area breakdown) → `<h2 id="gaps">Gap analysis</h2>`. All five substantive SDs followed this structure cleanly.
- **Synthesis SDs** (SD7 Federal Funding) follow the same H2 structure but with heavier content under each H2; geographic variation may be by funding-channel rather than by sub-area.
- **Schools SD (SD5)** is structurally distinctive — has its own "Constitutional Authority" section in the verified (rather than under Track 1 grounding), and the AHERA federal-floor/funding-absence finding (Gap 1) is the most distinctive federal-floor gap in the entire domain. Lead paragraph leads with the criminal DPA news rather than abstract framing.
- **Disability accessibility content surfaced when present:** SD1 (ADA Title II 46% station compliance), SD3 (ADA Title II sidewalk/curb-ramp compliance variation, mobility-impaired pedestrian pathway). Skipped where absent (SD2, SD4, SD5, SD6, SD7).
- **Cross-domain references** consistently reframed inline as `<a href="/paul/campaign/empower/domain/finance-taxation/">Finance &amp; Taxation</a>` rather than verified's "carry-forward" framing.
- **Cross-SD references within D13** added inline (SD3 references SD2 Cobbs Creek; SD5 references SD4 Lower Darby Creek Superfund; SD6 references SD2 watershed and SD3 active transportation; SD7 references all six substantive SDs in its synthesis).
- **Verification update markers** stripped consistently across all seven SDs (`*Verification update on...`*, `*Verification clarification...*`, OUTPUT-correction inline notes, F-flag IDs, Confidence/Representation-implication notes on gaps).
- **Gap items**: stable IDs (G13-SDn-XX) dropped; Confidence/Representation-implication notes integrated into gap prose where useful, stripped where redundant; numbered as **Gap N** on-site rather than the verified's gap-ID format.

### Glossary entries added across SD3, SD4, SD5, SD6

- **HIN** (H section) — High Injury Network
- **PDPH UC metric** (P section) — Underserved Communities metric
- **Vision Zero** (V section)
- **CERCLA** (C section) — Superfund
- **RCRA** (R section) — Resource Conservation and Recovery Act
- **SWEEP** (S section) — Streets and Walkways Education and Enforcement Program
- **AHERA** (A section) — Asbestos Hazard Emergency Response Act
- **William Penn ruling** (W section) — *William Penn School District v. PDE* state-constitutional ruling

Total glossary now contains 83 entries — original ~50 Finance & Taxation entries plus 33 D13-related entries added across the four-pass process.

### Glossary entries added (D13 SD2 pass, 2026-04-29)

- **Article I § 27** (A section) — PA Environmental Rights Amendment
- **COA** (C section) — Consent Order &amp; Agreement (PADEP)
- **CWA** (C section) — Clean Water Act
- **LCRR / LCRI** (L section) — Lead and Copper Rule Revisions / Improvements
- **LIHWAP** (L section) — Low-Income Household Water Assistance Program
- **NFIP** (N section) — National Flood Insurance Program
- **NPDES** (N section) — National Pollutant Discharge Elimination System
- **SDWA** (S section) — Safe Drinking Water Act
- **TAP** (T section) — Tiered Assistance Program (PWD)

Glossary now covers **32 D13-relevant entries** total across SD1, SD2, and SD7. The N section was reordered after insertion (Nexus → NFIP → NMTC → NPDES → NPT) to maintain case-insensitive alphabetical order.

## Open questions / things to revisit

- Is there a canonical mapping between verified-doc "Track 1 / Track 2" structure and on-site sectioning? D9 collapsed Track 1 into "Legal Architecture" but Track 2 isn't visible as a labeled section — it appears to be folded into the Constituent Profiles + body prose. Need to re-examine after one D13 SD page is drafted.
- For the top-level overview, the `cards:` frontmatter block has `desc` and `cta` for six cards. These are written specifically per domain. Could a skill draft these from the SDs? Maybe, but the language is voice-y enough that human review is mandatory.
- Glossary discipline: who owns the glossary, when do new entries get added, what's the approval workflow?
- Statistical / numerical claims: when transforming verified content into web prose, do any claims need re-verification (since time has passed)? D9 verified is from 2026-04-25; if a citation says "as of FY 2024" the web page can keep it; if "as of last week" the web page needs updating.

---

## Tally

| Domain | Verified date | On-site state | Pages on site | Process notes |
|---|---|---|---|---|
| D9 Finance & Taxation | (verified upload available, file dated implicitly recent) | in-review (flipped 2026-04-29) | 12 (index, sub-domains/index, 7 SDs, gaps, neighbors, recent-changes) | The exemplar |
| D13 Physical Infrastructure | 2026-04-27 | drafting (in progress) | 1 (stub only, pre-transformation) → 12 (target) | Second exemplar; this log |
