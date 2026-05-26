---
layout: base.njk
title: Square Party
description: A Square Deal for our political future.
bodyClass: home-landing-page
---

<div class="home-landing">

<section class="home-landing__hero">
  <div class="home-landing__hero-copy">

    <p class="home-landing__eyebrow">
      <span class="home-landing__eyebrow-dot" aria-hidden="true"></span>
      A work in progress · 2026
    </p>

    <h1 class="home-landing__title">Square Party</h1>

    <p class="home-landing__subhead">A Square Deal for our political future.</p>

    <p class="home-landing__body">
      <strong>Write it in.</strong> Every election, every voter, every level — write someone in.  
      
      <a href="/write-it-in/">Read more about it →</a>
    </p>

  </div>

  <div class="home-landing__hero-visual">
    {% include "partials/empty-square.njk" %}
    <p class="home-landing__hero-caption">
      Forever open to change. <a href="/square/">Make yours →</a>
    </p>
  </div>
</section>

<section class="home-landing__cards">

  <div class="home-landing__cards-grid home-landing__cards-grid--4">
    <a class="home-landing__card" href="/write-it-in/">
      <div>
        <p class="home-landing__card-meta">the act</p>
        <h3 class="home-landing__card-title">Where do I start?</h3>
        <p class="home-landing__card-blurb">For yourself — pledge to write someone in, every election.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/income-viz/">
      <div>
        <p class="home-landing__card-meta">the viz</p>
        <h3 class="home-landing__card-title">A broken system</h3>
        <p class="home-landing__card-blurb">Feel inequality. Why capitalism needs game maintenance.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/ideas/">
      <div>
        <p class="home-landing__card-meta">the ideas</p>
        <h3 class="home-landing__card-title">Big ideas</h3>
        <p class="home-landing__card-blurb">Problems and solutions in a giant complex system.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/square-party/">
      <div>
        <p class="home-landing__card-meta">the group</p>
        <h3 class="home-landing__card-title">What is this?</h3>
        <p class="home-landing__card-blurb">An empty square and a group of people who imagine change.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
  </div>

</section>



<section class="home-landing__sub">
<div class="home-landing__sub-grid">
<div class="home-landing__sub-col">
<p class="home-landing__section-eyebrow">The lightest possible ask</p>
<h2 class="home-landing__section-title">Sign up.</h2>
<p class="home-landing__section-body">
Name and email. Get on the list.
</p>
<p class="home-landing__section-aux">
Want to learn more? <a href="/representation/">Read about the fundamental problem in representation →</a>
</p>
<p class="home-landing__section-aux">
Or just <a href="/write-it-in/#pledge">pledge to write someone in →</a>
</p>
<div class="home-landing__sub-embed">
{% set tallyId = site.tally.voter %}
{% set tallyTitle = "Square Party voter sign-up" %}
{% set tallyHeight = "260" %}
{% include "partials/tally-embed.njk" %}
</div>
</div>
<div class="home-landing__sub-col">
<p class="home-landing__section-eyebrow">The record</p>
<h2 class="home-landing__section-title">News and updates.</h2>
</div>
</div>
</section>

</div>
