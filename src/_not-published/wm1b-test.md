---
layout: base.njk
title: "WM-1B Smoke Test — Profile Card"
description: "End-to-end render test for the mode-aware profile card partial."
eleventyExcludeFromCollections: true
permalink: /wm1b-test/
---

<p style="font-family: var(--font-ui); font-size: 0.8rem; color: var(--muted); margin-bottom: 1.5rem;">
  <strong>WM-1B smoke test.</strong> Not published. Verifies that the profile data, Nunjucks partials, and CSS rules
  compose end-to-end. Default mode: synthesis (data-mode="synthesis" set on the card). WM-1A's toggle JS will
  override this at runtime.
</p>

{% set profile = profiles["finance-taxation"].profiles["home-care-aide-strawberry-mansion"] %}

{% include "partials/profile-card.njk" %}
