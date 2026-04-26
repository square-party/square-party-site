# Voice Guide

A working reference for the site's prose. Goal: keep the things that make the
writing serious and credible, drop the things that mark it as machine-drafted.
Companion to `SITE_REFERENCE.md`.

---

## The principle

The site has two writing modes that shouldn't be collapsed into one voice:

1. **Analytical mode** — the empower domain pages, methodology, gap analysis.
   Stays literary. Long, careful sentences. Specific numbers. Sourced. The
   reader is a serious person doing serious work, and the writing meets them
   there.
2. **Direct mode** — landing copy, CTAs, contribute, write-in, Paul's bio,
   anything that's trying to invite a person in or move them to do something.
   Shorter. Plainer. More verbs. Less rhythm-for-rhythm's-sake.

Most of the existing site is in analytical mode by default, even where direct
mode would work better. That's the imbalance to correct.

---

## AI tells to strip

These are the patterns that flag prose as machine-drafted, especially in
direct-mode contexts. They're not always wrong — they're overused. The fix is
to use them when they earn their place and skip them when they don't.

### 1. Em-dash chains and dramatic asides

**Problem.** The em-dash gets used to:
- Insert long parenthetical asides mid-sentence
- Set up a punchline ("X — and that's the point")
- Stack two or three asides in a row
- Replace commas, parentheses, and colons indiscriminately

**Example from the site** (`/paul/campaign/empower/index.md`):
> This project applies the People's Assembly framework — twenty-two policy
> domains organized to span the scope of governmental activity — to
> Pennsylvania's 3rd Congressional District.

Three constructs in 28 words. The middle clause could be a parenthetical, or
a separate sentence, or just removed.

**Direct-mode rewrite:**
> This project applies a People's Assembly framework to Pennsylvania's 3rd
> Congressional District. The framework is twenty-two policy domains
> organized to span the scope of government.

**Rule of thumb.** One em-dash per paragraph in direct mode. Save em-dashes
for genuine asides where parentheses would feel too quiet and a separate
sentence would feel too loud.

### 2. "Not X but Y" rhythms

**Problem.** Setting up a foil to knock down. Looks thoughtful, often filler.

**Examples from the site:**
> It's not a personal platform.
> It's also not a Roosevelt revival.
> It's not a replacement for geography. It's an addition.

Each one alone is fine. Together, they form a pattern. Pattern reads as voice.
Voice reads as machine.

**When it earns its place:** when the X you're knocking down is actually
believed by the reader. If nobody assumed Y was a personal platform, you don't
need to deny it.

**Fix.** Just say what it is. "It's an addition to geography-based
representation." "It takes the Square Deal name as a lineage, not as a model."

### 3. Lists of three

**Problem.** Tricolons feel rhetorical, balanced, complete. Used twice on a
page they're elegant; used six times they're a tic.

**Examples from the site:**
> Federal, state, and local layers.
> The framework, the analysis, the engagement.
> Square Party, the assembly, the empower project.
> Anonymous, first name + neighborhood, full name + neighborhood.
> Read, Contribute, Propose.

Some of these (the rungs ladder) are actual structures and earn the three.
Others are decorative.

**Fix.** Use two when two is enough. Use four when four is true. Resist the
three by default.

### 4. Throat-clearing setups

Phrases that announce what's coming instead of just saying it:

- "Here's the situation as cleanly as I can state it."
- "The deepest truth I know is this:"
- "Let me be clear:"
- "What this is, at its root, is..."
- "The honest framing is that..."

**Fix.** Cut the setup. Say the thing.

### 5. Sentence-fragment punchlines

**Problem.** A short fragment after a long sentence, used for emphasis. Once
per essay it's a flourish; every paragraph it's a tic.

**Examples from the site:**
> Different lens, complementary work.
> That's fine.
> We know.
> That's it.
> Either is fine.
> Pattern reads as voice. Voice reads as machine.

Even this guide has them — used here on purpose, but it's the same trick.

**Fix.** Earn each one. If two paragraphs in a row end with a one-word
capstone, lose at least one.

### 6. Abstract-noun stacks

**Problem.** Strings of abstract nouns where verbs and concrete nouns would
land harder.

**Examples:**
> "the systematic mapping of the gap between formal representation and lived
> experience"

becomes:

> "we map where formal representation falls short of how people actually
> live"

The first is technically more compact. The second is faster to read.

**Rule.** When you can swap an `-ion`/`-ment` noun for a verb, swap it.

### 7. "The X is Y" definitional sentences

**Problem.** Grand statements that frame instead of inform.

> "Capitalism is a game that can be won."
> "The deepest problem isn't healthcare or housing."
> "Politics is the experience of living in that box."

These work as a hook once. Used as the dominant sentence shape, they sound
ex-cathedra.

**Fix.** Mix in sentences that show rather than declare. "When one player
owns half the board, nobody else can lose well enough to keep playing." Same
idea, less pulpit.

### 8. Predictable parallelism

**Problem.** Two or three sentences with identical grammatical structure for
rhetorical balance.

**Example:**
> Pledging a vote doesn't require reading the analysis. Reading the
> analysis doesn't require pledging a vote.

Once is fine. Twice on a page is a tell.

### 9. "It's about X. It's about Y. It's about Z."

The "it's about" frame is almost always reframable as a more specific
sentence. If you can't reframe it, the sentence wasn't doing real work.

### 10. Over-numbered structure

Section after section opening with "Three reasons," "Two tracks," "Five
lenses," "Four corners." Numbers are useful when they're the actual count of
real things; they're padding when they're imposed.

**Rule.** If the count is doing analytical work (five lenses on the
methodology page), keep it. If the count is decorative, drop it.

---

## What to keep

The literary register has real strengths. Don't lose:

- **Sourced specifics.** Numbers, statutes, named institutions. The opposite
  of vague.
- **Honest scoping.** "We don't know yet." "This is one example." "The
  trajectory is clear; the timing isn't."
- **The "what it is / what it's not" move when it's earning.** When the X
  being denied is actually a thing readers might assume, the denial does work.
- **Dry humor.** "Yes, this is friction. We know." (from the contribute
  page) — fine, lands, doesn't overstay.
- **Tonal range across page types.** A bio page can be warm and a
  methodology page can be clinical and that's correct.

---

## Page-type table

| Page type                              | Mode       | Notes                                                      |
|----------------------------------------|------------|------------------------------------------------------------|
| Home (`/`)                             | Direct     | Hook, three+ entry points, signup. Short sentences.        |
| Square Party (`/square-party/`)        | Direct→mid | Manifesto, but not a sermon. Cut em-dash chains.           |
| People's Assembly (`/square-party/assembly/`) | Mid | Concept page, needs to teach without lecturing.            |
| PA-3 campaign (`/paul/campaign/`)      | Direct     | Campaign page. Punchy, candid, action-oriented.            |
| Paul bio (`/paul/`)                    | Direct     | Personal. Contractions OK. AI disclosure stays as-is.      |
| Empower home (`/paul/campaign/empower/`) | Mid     | Project entry. Hook + invite + structure. Direct upfront.  |
| Empower domain analytical pages        | Analytical | Keep literary. The work is the work.                       |
| Methodology, About, Glossary           | Mid        | Explanatory. Plain over poetic.                            |
| Contribute, Saved, How-to-vote         | Direct     | Functional pages. Plain language, clear steps.             |
| Ideas / Proposals                      | Analytical | Long-form essays. Literary register appropriate.           |

---

## [SCIENCE] mode — the language-precision pass

A separate review lens. Not about whether claims are true (that's the
sourcing standard the methodology page already covers). About whether the
**language** is doing what it claims to do.

When applied to a passage, ask:

1. **Is each word load-bearing?** If you delete a word and the meaning
   survives, the word wasn't earning.
2. **Are quantifiers specific where specificity matters?** "Many," "some,"
   "often," "most" — pick a number when you have one. "Roughly 4.5% of
   eligible filers" beats "few eligible filers."
3. **Are abstract nouns hiding concrete actions?** "The implementation of
   the program" → "running the program." "The mapping of power structures" →
   "we map where power lives."
4. **Are pronouns unambiguous?** "It," "this," "that" — does the referent
   sit within ten words?
5. **Are hedges doing work or signaling humility?** "Probably," "may,"
   "could be argued" — keep when uncertainty is real, cut when reflexive.
6. **Is jargon either defined or doing work?** A term like "non-refoulement"
   needs a parenthetical the first time. "Throughput," "discretionary
   implementation," "topical specialization" — define on first use.
7. **Does the sentence have a verb that does something?** "Is," "are,"
   "exists" — fine in moderation. A page heavy in stative verbs reads
   inert.
8. **Could a precise opposite be stated?** If the inverse of your claim
   isn't clearly false (or clearly different), the original claim wasn't
   precise enough. ("The system is broken" → opposite isn't clear. "The
   FEC has had no quorum since April 30, 2025" → opposite is clearly
   false.)
9. **Does the metaphor pay rent?** A metaphor is doing work if removing it
   loses meaning. If you can paraphrase it without loss, it's decoration.
10. **Is the cognitive load appropriate for the page type?** A landing
    paragraph that requires three re-reads is failing its job; a methodology
    section that requires two re-reads may be doing exactly what it should.

**How to apply it.** Mark a passage as `[SCIENCE]`-pending in a comment or
PR note. Walk the checklist. Return revised prose. Use sparingly — most
prose doesn't need it. Reach for it when:

- A sentence reads important but you can't say what it means
- An abstraction is doing the work of three concretes
- The language is fancier than the claim warrants
- A reader asks what something means and you can't say it differently

---

## Before / after examples

### Example 1 — a definition under construction

**Before** (`/paul/campaign/empower/index.md` line 9):
> This project applies the People's Assembly framework — twenty-two policy
> domains organized to span the scope of governmental activity — to
> Pennsylvania's 3rd Congressional District. The analytical unit is the
> domain. The geographic scope is PA-3: parts of Philadelphia, Delaware
> County, and Montgomery County. The aim is to document, in sourced terms,
> where formal representation diverges from operational reality.

Tells: em-dash aside; "the analytical unit is" / "the geographic scope is"
parallelism; abstract-noun stack ("formal representation diverges from
operational reality").

**After:**
> This project applies a People's Assembly framework to Pennsylvania's 3rd
> Congressional District — Philadelphia plus parts of Delaware and Montgomery
> Counties. The framework is twenty-two policy domains, chosen to cover
> everything government touches. For each one, we write up what the law says,
> how it actually runs in PA-3, and where the two diverge.

### Example 2 — a CTA paragraph

**Before** (`/paul/campaign/empower/contribute/index.md`):
> This project gets better when readers push back on it. Every page is
> editable. Every change is tracked. Every contributor is credited at
> whatever level of identity they choose.

Tells: tricolon parallelism ("every X / every Y / every Z").

**After:**
> The project gets better when readers push back. Every page is editable on
> GitHub, every change is tracked, and you choose how you want to be
> credited — anonymous, first name, full name, your call.

### Example 3 — a flat declaration

**Before** (`/square-party/index.md`):
> The party's square is empty on purpose.

Already strong. Leave it.

**Before** (continuation):
> What goes inside is whatever each member decides matters most — four
> corners, picked and named by them.

Tell: em-dash + tricolon-ish completion.

**After:**
> What goes inside is whatever each member picks — four corners, named by
> you, that say what you stand for.

(Keeping one em-dash per paragraph as the rule of thumb.)

---

## Quick checklist for the Phase 4 sweep

When walking a page:

- [ ] Count em-dashes. If more than one per paragraph in direct mode, trim.
- [ ] Count tricolons. If more than one per page, demote at least one.
- [ ] Highlight every "not X but Y" — keep the ones that knock down a real
      assumption, cut the rest.
- [ ] Check sentence-fragment capstones. Keep one per essay; cut the others.
- [ ] Hunt for abstract-noun stacks. Swap to verbs.
- [ ] Read aloud. If you wouldn't say it, rewrite it.
- [ ] Mark passages that need a [SCIENCE] pass — apply the 10-question
      checklist before final.
- [ ] Don't break the analytical pages. The literary register is part of
      what makes the empower work credible. Sweep light there.
