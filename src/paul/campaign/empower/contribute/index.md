---
layout: empower.njk
title: Contribute
description: How to verify, correct, and add to this project. The mechanics of GitHub-based contribution, the privacy options, the moderation workflow.
---

# Contribute

This project gets better when readers push back on it. Every page is editable. Every change is tracked. Every contributor is credited at whatever level of identity they choose.

The mechanics use GitHub. That's a real barrier for non-technical contributors, and we're aware of it — but it gives us versioning, attribution, public review, and a permanent record without us having to build any of those things from scratch. A future version of this project will lower the barrier (probably with a magic-link form for the lightest contributions); for now, the GitHub path is the path.

## Three rungs

### Read

No account needed. Read anything on the site, follow citations, decide for yourself whether the analysis holds. This is the default mode and the only one most visitors will ever use. That's fine.

### Contribute (small fixes, sources, narrative edits)

Spotted a typo, a broken link, a missing source, or a framing problem? Open a pull request on GitHub.

If you've never done this before, here's the short version:

1. Click the "Suggest an edit" link at the bottom of any page. (It's part of the page footer next to "View history on GitHub.")
2. GitHub will prompt you to **fork the repository** if you don't already have your own copy. Click through.
3. The page opens in GitHub's web editor as a Markdown file. Make your changes.
4. At the bottom, write a short note describing what you changed and why. ("Fixed a broken link to the Pennsylvania Department of Revenue page" is fine — short and clear.)
5. Click **Propose changes**, then **Create pull request**.

That's it. Your edit lands in a queue. Paul (or a delegated reviewer) looks at it, asks questions if needed, and either merges it in or explains why not.

If you don't have a GitHub account, [creating one is free and takes about two minutes](https://github.com/signup). Yes, this is friction. We know.

### Propose (new analysis, sub-domains, profiles, policy proposals)

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

If GitHub is a real barrier for you and you want to contribute anyway, email the project (address forthcoming) and we'll figure something out manually.

{% include "partials/page-meta.njk" %}
