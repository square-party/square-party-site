---
layout: empower.njk
title: Contribute
description: How to verify, correct, and add to this project. The mechanics of GitHub-based contribution, the privacy options, the moderation workflow.
---

# Contribute

Many ways to help, ranging from thirty seconds of clicking to drafting policy. The lightest options come first. The editorial track (where the project actually gets edited) is below that.

## Lightest ways to help

Three things take less than five minutes apiece, and each one feeds real infrastructure: knowing who's interested, growing the audience, and getting a baseline read on what people care about.

### Sign up as an interested voter

Tell us which of the twenty-six domains you care about. Email plus checkboxes.

[Express interest →](/square-party/assembly/#express-interest)

### Share the party link

If you think this is worth a look, send it to one person who'd think the same, or post it on social.

The link: **squareparty.org**

### Answer broad-issue preferences

A short, low-background survey on the rough shape of taxation, healthcare, immigration, environment, and the rest. We use the responses to see where ordinary preferences cluster.

{% set tallyId = site.tally.prefs %}
{% set tallyTitle = "Broad-issue preferences" %}
{% set tallyHeight = "320" %}
{% include "partials/tally-embed.njk" %}

These are real contributions. Most people will never do more than this, and that's fine — most of the value of an open project comes from people who show up at the lightest tier and stick around.

## Editorial contribution

The editorial track is where the project itself gets edited: fixing errors, adding sources, drafting analysis, proposing policy language. The mechanics are GitHub-based. That's a real barrier for non-technical contributors, and we know it. In exchange we get versioning, public review, and a permanent attribution record without building any of that from scratch. A future version will lower the barrier (probably a magic-link form for the lightest editorial contributions). For now, GitHub is the path.

### Read

No account needed. Read anything on the site, follow citations, decide for yourself whether the analysis holds. This is the default mode and the only one most visitors will ever use. That's fine.

### Suggest a fix or add a source

Spotted a typo, a broken link, a missing source, or a framing problem? Open a pull request on GitHub.

If you've never done this before, here's the short version:

1. Click the "Suggest an edit" link at the bottom of any page. (It's part of the page footer next to "View history on GitHub.")
2. GitHub will prompt you to **fork the repository** if you don't already have your own copy. Click through.
3. The page opens in GitHub's web editor as a Markdown file. Make your changes.
4. At the bottom, write a short note describing what you changed and why. ("Fixed a broken link to the Pennsylvania Department of Revenue page" is fine — short and clear.)
5. Click **Propose changes**, then **Create pull request**.

That's it. Your edit lands in a queue. Paul (or a delegated reviewer) looks at it, asks questions if needed, and either merges it in or explains why not.

If you don't have a GitHub account, [creating one is free and takes about two minutes](https://github.com/signup). Yes, this is friction. We know.

### Propose new analysis or policy

Bigger ideas — a new sub-domain analysis, a constituent profile, a policy proposal — go through a longer review. Same PR mechanism, more conversation around it.

For these, it usually helps to **open an issue first** rather than going straight to a pull request. Describe what you want to add and why. That gives a chance to align on scope before you do a lot of writing. Once the scope is clear, you can do the work and submit it as a PR.

Issues live at: `[repo URL]/issues` (link will be active once the repo is public).

## Privacy options

Every contribution is attributed at the level you pick. You set a default in your contributor profile, and you can override it per contribution. Someone can be anonymous on sensitive topics and named on policy drafts — no requirement to be the same level across the project.

The four levels:

1. **Anonymous.** Public attribution reads "Anonymous contributor." Your email is internal-only.
2. **First name + neighborhood.** "Jane in South Philly."
3. **Full name + neighborhood.** "Jane Doe, South Philly."
4. **Full name + link.** "Jane Doe ([link])." The link goes wherever you want — your website, ORCID, LinkedIn, whatever.

There's also a separate **public endorsement** wall — the [Contributors page](/paul/campaign/empower/contributors/) — where people who want to be publicly associated with the project can opt in independently of any specific contribution. You can appear there without making any specific edits, and you can make edits without appearing there. Two independent decisions.

## Moderation

Every contribution is reviewed before it's merged. The reviewer looks at:

- **Factual accuracy.** Are the claims sourced? Are the sources real and authoritative?
- **Fit.** Does this belong in this domain, or is there a better home for it?
- **Tone.** Does the contribution match the rest of the project's voice — analytical, evenhanded, willing to surface inconvenient findings?

Contributions can be:

- **Merged** as-is.
- **Returned for revision** with specific notes about what would need to change.
- **Declined** with an explanation. Declined doesn't mean ignored — the conversation around the decline is part of the public record on the PR.

Over time, contributors who've established a track record of clean work may be granted elevated permissions — typo corrections and source additions might be self-mergeable for trusted contributors, with full review reserved for substantive changes. We're not there yet but the trajectory is clear.

<a id="discuss"></a>
## Discuss

For conversation that isn't tied to a specific edit — questions, debates, methodology proposals, "have you thought about X" — the right place is GitHub Discussions on the project repo. Link will be active once the repo is public.

## What's deliberately not here yet

A magic-link auth system, an in-page comment system, an upvote/bookmark/flag mechanism. Those are all sensible features and they're all in scope for a v2. They aren't in v1 because they require backend infrastructure that the GitHub PR path lets us defer — and starting with the simplest workable system that produces a real public record is more important than starting with the prettiest one.

If GitHub is a real barrier for you and you want to contribute anyway, email <a href="mailto:{{ site.email }}">{{ site.email }}</a> and we'll figure something out manually.

{% include "partials/page-meta.njk" %}
