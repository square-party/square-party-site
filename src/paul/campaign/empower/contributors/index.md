---
layout: empower.njk
title: Contributors
description: People who have publicly endorsed this project. Opt-in, separate from per-contribution attribution.
---

# Contributors

The people listed here have explicitly chosen to be publicly associated with this project. This is an endorsement, not a contribution log — the per-page history (and the [Timeline](/paul/campaign/empower/timeline/)) is where specific contributions are tracked.

Two independent decisions:

- A contributor can appear here without attaching their name to any specific edit.
- A contributor can make attributed contributions without appearing here.

Showing up on this page is a public statement: *I think this project is worth doing, and I'll put my name on saying so.*

## Levels of visibility

Same options as per-contribution attribution:

- First name + neighborhood
- Full name + neighborhood
- Full name + link to your own page (website, ORCID, LinkedIn, whatever)

You set the level you want when you opt in.

## How to opt in

*(For now, opt-in happens by adding yourself to a contributors file in the repo via pull request, the same way as any other contribution. Once the magic-link auth system is in place — v2 — this becomes a one-click opt-in from your contributor profile.)*

The relevant file in the repo is `src/_data/contributors.json` (or similar — to be set up when the first opt-in arrives). The PR adds a single entry: name (at your chosen visibility level), neighborhood if applicable, optional link, optional one-sentence statement.

## Current contributors

*(No public contributors yet. The list will populate as people opt in.)*

## Future ideas (post-launch)

- A map view of contributors by PA-3 sub-area, respecting whatever geographic precision each contributor opted into.
- Contribution-count indicators next to names, for contributors who want them shown.
- A "supporter stories" section — short first-person notes from contributors about why they're involved.

These are deferred until there are enough contributors to make any of them visually meaningful.

{% include "partials/page-meta.njk" %}
