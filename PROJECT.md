# PROJECT.md — Coordination state

This file tracks live coordination state: what's in flight, what's decided, what's pending.
It is not site documentation. For that, read the canonical docs:

- `VOICE_GUIDE.md` — editorial voice, AI tells to strip, page-type table, [SCIENCE] checklist
- `SITE_REFERENCE.md` — site structure, stack, conventions, known gaps
- `SOURCE_DOCS.md` — source document index, placement status, recommended next steps

Read those before any content work. This file only covers what's currently moving.

---

## Coordination model

Two window types:

- **Admin (Opus)** — plans, decides, judges voice. Writes task briefs. Updates this file when state changes.
- **Execution (Sonnet or Haiku per task)** — carries out a specific brief. Reads this file on startup. Reports back; does not commit.

Handoffs flow admin → execution via self-contained task briefs. Each brief names: goal, constraints, voice notes, success criteria, and recommended model. Execution windows do not make site decisions — they stop and ask if a brief is incomplete.

State lives here. If this file is stale, the admin window owns the fix.

---

## GitHub sync ritual

Run this at the start of every session, before touching any files:

```
./scripts/check-updates.sh
```

Review the output. If the local branch is behind origin, pull before working. If there are uncommitted changes from a prior session, resolve them before starting new work.

---

## Current state — 2026-05-03

**Done:**
- Substack post-1 drafted (`drafts/substack-01-draft-01.md` working draft; `drafts/substack-01-final.md` Substack-ready). Topic: "If we don't want a King, what do we want?" — Charles addressing Congress as foil for Trump, cognitive science of personality politics. Ends in inquiry mode; does not reveal the Square Party. Not yet published.
- `PROJECT.md` and `scripts/check-updates.sh` created (this handoff, Sonnet, 2026-05-03).

**In flight:**
- Nothing else active as of this writing.

**Planned, in order:**
1. "Empower — Domains" content organization — substantial content exists; needs organizing, not drafting.
2. Substack post-2 (Square Party reveal piece) — only after post-1 is published. Will absorb the geographic-plus-topical-representation idea and the empty-square-as-symbol move cut from post-1's "What a different show might look like" section.

---

## Open decisions

- **Post-2 timing and scope.** Blocked on post-1 publication. Scope is roughly settled (see above) but the exact framing hasn't been drafted. Admin window to brief when ready.
- **Empower — Domains organization approach.** The section has substantial content. The question is how to surface and sequence it. No decision yet; admin window to assess and brief.
