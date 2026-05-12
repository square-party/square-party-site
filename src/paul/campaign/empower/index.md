---
layout: empower.njk
title: How to empower through representation
description: The PA-3 application of the People's Assembly framework — issue domains analyzed for the gap between formal representation and operational reality.
---

# How to empower through representation

{% include "partials/schoolhouse-hook.njk" %}

This project applies a [People's Assembly framework](/square-party/assembly/) to Pennsylvania's 3rd Congressional District, which includes parts of Philadelphia county. I started by thinking about possible ways to classify ares by discrete laws, regulations, and implications for constituents. In theory, a People's Assembly framework could be applied in any district and it might look different. The idea is to break down the system into more manageable subsets that the public can meaningful engage with. In turn, a representative for the district gains a highly effecient constituent feedback system and real human connection. This type of transparency allows for greater representation and accountability, as well as a cumulative public record. For some areas that I thought might be most important for the constituents in PA-3, I developeed a methodology and documented what the law says, how it actually runs in the district, and where the two diverge.

The methodology applies five lenses (statutory architecture, administrative implementation, constituent experience, gap analysis, and statutory-vs-administrative durability) with rough standardization.
[Read the methodology in full →](/paul/campaign/empower/methodology/)

Policy proposals are not found here, but one use for this work might be as the starting point for new legislation. In theory, anyone could [propose](/paul/campaign/empower/contribute/#propose) real legislation for their representatives. After verification, representatives could engage in an iterative process - on the public record - to integrate (or not) the proposal into a current set of legislation. Representatives can keep their legislative platform public (see the very beginnings of this idea [here](/paul/policy)).

*Disclaimer* This workflow was developed with AI as an assistant. Claims should be reasonably calibrated, but should be checked by humans. The workflow is public, but the nature of the project challenges direct reproducibility. 

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

## Domains in PA-3

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
