---
layout: base.njk
title: Ideas
description: Long-form essays about how the system works — the rules, structures, and incentives behind the decisions.
---

# Ideas

Long-form essays. The unit of change is meta: the rules, structures, and incentives that shape how decisions get made. How markets stay competitive. How citizens engage with self-governance. How the country plans for finite resources. Get those right and the room for productive policy widens.

These cut across specific domains and campaigns. They differ from the [Policy Areas](/paul/policy/), which are substantive interventions inside specific issue domains, and from the [PA-3 empower project](/paul/campaign/empower/), the analytical work of mapping where the system falls short in one district.

State indicators describe drafting state, not importance. *Drafting* means a substantive draft exists. *In review* means ready for outside scrutiny. *Planned* would be a slot identified but not yet written.

<div class="standard-row" id="ideas-grid">
{%- for idea in collections.ideas -%}
{%- set state = idea.data.state or "planned" -%}
{%- if state == "published" %}{% set stateLabel = "Published" %}{% elif state == "in-review" %}{% set stateLabel = "Ready for review" %}{% elif state == "drafting" %}{% set stateLabel = "Drafting" %}{% else %}{% set stateLabel = "Planned" %}{% endif -%}
<a class="entry-card" href="{{ idea.url }}">
<div class="entry-card__head"><span class="entry-card__head-text"><span class="entry-card__title">{{ idea.data.title }}</span>{% if state != "planned" %}<span class="entry-card__state" data-state="{{ state }}">{{ stateLabel }}</span>{% endif %}</span></div>
<span class="entry-card__desc">{{ idea.data.description }}</span>
<span class="entry-card__cta">Read the essay →</span>
</a>
{%- endfor -%}
</div>

## How to engage

Same engagement model as the rest of the site. Read, contribute corrections or sources via GitHub, or propose larger work — see the [contribute page](/paul/campaign/empower/contribute/) for the mechanics.

If a planned slot interests you and you want to draft it, that's a propose-tier contribution. Open an issue first to align on scope.

{% include "partials/page-meta.njk" %}
