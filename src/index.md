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
      Anyone you'd actually want to represent you. <a href="/write-it-in/">Read more about the working mission →</a>
    </p>

    <p class="home-landing__body">
      The party's square is empty on purpose. What goes inside is for each member to decide for themself, at that time.
    </p>

  </div>

  <div class="home-landing__hero-visual">
    {% include "partials/empty-square.njk" %}
    <p class="home-landing__hero-caption">
      Empty on purpose. <a href="/square/">Make yours →</a>
    </p>
  </div>
</section>

<section class="home-landing__cards">

  <div class="home-landing__cards-grid home-landing__cards-grid--4">
    <a class="home-landing__card" href="/write-it-in/">
      <div>
        <p class="home-landing__card-meta">the action</p>
        <h3 class="home-landing__card-title">Where do I start?</h3>
        <p class="home-landing__card-blurb">The simplest action — pledge to write someone in, every election.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/income-viz/">
      <div>
        <p class="home-landing__card-meta">the picture</p>
        <h3 class="home-landing__card-title">Let me see the wealth</h3>
        <p class="home-landing__card-blurb">Income, mapped. Get a feel for how unevenly the country actually lives.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/paul/campaign/empower/">
      <div>
        <p class="home-landing__card-meta">the ground</p>
        <h3 class="home-landing__card-title">See my district</h3>
        <p class="home-landing__card-blurb">PA-3, mapped by issue domain. Where formal representation falls short.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
    <a class="home-landing__card" href="/square-party/">
      <div>
        <p class="home-landing__card-meta">the idea</p>
        <h3 class="home-landing__card-title">What is this?</h3>
        <p class="home-landing__card-blurb">The empty square, the People's Assembly, the guts and ideas.</p>
      </div>
      <span class="home-landing__card-arrow" aria-hidden="true">→</span>
    </a>
  </div>

</section>

<section class="home-landing__pledge">
  <div class="home-landing__pledge-card">
    <p class="home-landing__pledge-eyebrow">we should have a universal pledge</p>
    <p class="home-landing__pledge-body">
      I pledge allegiance to the square.<br>
      And to representative government for which it stands.<br>
      We are people living in peace, with faith and protection for us and our beliefs.<br>
      Of course, with liberty and justice for all.
    </p>
  </div>
</section>

<section class="home-landing__sub">
<div class="home-landing__sub-grid">
<div class="home-landing__sub-col">
<p class="home-landing__section-eyebrow">The lightest possible ask</p>
<h2 class="home-landing__section-title">Sign up.</h2>
<p class="home-landing__section-body">
Name and email, takes a few seconds. Get on the list so you can hear when there's something to hear.
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
<h2 class="home-landing__section-title">News and perspectives.</h2>
<p class="home-landing__section-body">
Essays, reports, perspectives, and other ways to understand the system.
</p>
<p class="home-landing__section-aux">
<a href="https://squareparty.substack.com">squareparty.substack.com →</a>
</p>
<div class="home-landing__sub-embed">
<iframe src="https://squareparty.substack.com/embed" width="480" height="320" frameborder="0" scrolling="no"></iframe>
</div>
</div>
</div>
</section>

</div>
