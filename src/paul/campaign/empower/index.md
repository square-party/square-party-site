---
layout: empower.njk
title: How to empower through representation
description: The PA-3 application of the People's Assembly framework — twenty-six policy domains analyzed for the gap between formal representation and operational reality.
---

# How to empower through representation

{% include "partials/schoolhouse-hook.njk" %}

This project applies a [People's Assembly framework](/square-party/assembly/) to Pennsylvania's 3rd Congressional District — Philadelphia plus parts of Delaware and Montgomery Counties. The framework is twenty-six policy domains, organized to cover everything government touches. For each one, we document what the law says, how it actually runs in PA-3, and where the two diverge.

The methodology is the same across all twenty-six: five lenses (statutory architecture, administrative implementation, constituent experience, gap analysis, and statutory-vs-administrative durability), applied uniformly so readers can compare across domains. [Read the methodology in full →](/paul/campaign/empower/methodology/)

Policy proposals are out of scope on these analytical pages. They get generated downstream by contributors through the [propose tier](/paul/campaign/empower/contribute/#propose). Surfacing the gap is the job of the analysis; closing it is the job of whoever does the proposing.

The framework — domains as topical seats of a People's Assembly — is the Square Party-level idea this project applies in one place. [Express interest in any of the topical seats →](/square-party/assembly/#express-interest)

## Start here — domains with content

<div class="standard-row" id="domains-with-content">
{%- for stateOrder in ["published", "in-review", "drafting"] -%}
{%- for domain in collections.domains -%}
{%- if (domain.data.state or "planned") == stateOrder -%}
{%- if stateOrder == "published" %}{% set stateLabel = "Published" %}{% elif stateOrder == "in-review" %}{% set stateLabel = "Ready for review" %}{% else %}{% set stateLabel = "Drafting" %}{% endif -%}
<a class="entry-card" href="{{ domain.url }}">
<div class="entry-card__head"><span class="entry-card__head-text"><span class="entry-card__title">{{ domain.data.title }}</span><span class="entry-card__state" data-state="{{ stateOrder }}">{{ stateLabel }}</span></span></div>
<span class="entry-card__desc">{{ domain.data.description }}</span>
<span class="entry-card__cta">Open the analysis →</span>
</a>
{%- endif -%}
{%- endfor -%}
{%- endfor -%}
</div>

## The twenty-six domains, in PA-3

State indicators describe analytical state, not domain importance. *Published* domains have verified PA-3 content. *In review* is drafted but unchecked. *Drafting* is research underway. *Planned* is scaffolded, not yet researched. The honest current state: one domain is being adapted from a separate research document; the rest are scaffolded and await contributors.

{% include "partials/domain-card-grid.njk" %}

## Tools & references

**A descriptive map of every park, recreation center, pool, playground, trail, and community garden inside PA-3** (and a 2-mile buffer). Live-fetched from OpenDataPhilly. Used by several domain analyses as a shared reference.

[Open the parks &amp; open space map →](/paul/campaign/empower/parks/)

**What happens when one player wins?** Three concepts for visualizing income distribution at scale: the bell-curve myth drawn to scale, real-income-growth-by-percentile-band over time, and a physical-metaphor view (football field vs. house). Useful for thinking about the distributional findings in [Finance &amp; Taxation](/paul/campaign/empower/domain/finance-taxation/).

[Open the income visualizations →](/income-viz/)


{% include "partials/help-block.njk" %}

## How to engage

{% include "partials/engagement-block.njk" %}

## Related

- [The People's Assembly →](/square-party/assembly/) — the framework this project applies, with the interest sign-up form
- [About this project →](/paul/campaign/empower/about/)
- [Methodology →](/paul/campaign/empower/methodology/)
- [Timeline of changes →](/paul/campaign/empower/timeline/)

{% include "partials/page-meta.njk" %}
