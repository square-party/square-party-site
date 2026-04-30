# Data model

## `squares` table

One row per submission. Schema in `worker/schema.sql`.

| field | type | notes |
|---|---|---|
| `id` | TEXT (ULID) | primary key, monotonically sortable |
| `created_at` | INTEGER | unix seconds |
| `status` | TEXT | `pending` / `approved` / `rejected` |
| `reviewed_at` | INTEGER? | when moderated |
| `reviewed_by` | TEXT? | email from `Cf-Access-Authenticated-User-Email` |
| `color_tl` … `color_br` | TEXT | hex strings, e.g. `#1f3a4d` |
| `word_tl` … `word_br` | TEXT | trimmed, ≤ 18 chars, alphanum + `'-’ ` |
| `glyph` | TEXT | one of the 15 known glyph keys |
| `glyph_color` | TEXT | hex |
| `style_json` | TEXT | JSON blob: gradient, fillStyle, scenery, fontFamily, showDividers, showBorder, cornerRadius |
| `ip_hash` | TEXT | sha256(ip + daily_salt) — never raw IP |
| `user_agent` | TEXT? | truncated to 200 chars |
| `notes` | TEXT? | free-text moderator notes |

## Status lifecycle

```
        ┌──────────────────────┐
        │                      │
   submit                      │
        │                      │
        ▼                      ▼
  ┌──────────┐  approve   ┌──────────┐
  │ pending  │ ─────────> │ approved │  → visible in /gallery
  └──────────┘            └──────────┘
        │
        │ reject
        ▼
  ┌──────────┐
  │ rejected │  → kept for audit, never shown publicly
  └──────────┘
```

Moderation transitions are one-way. If you reject and want to undo it,
re-approve via SQL:

```bash
npx wrangler d1 execute squares --command="UPDATE squares SET status='approved' WHERE id='ULID'"
```

## Why we store inputs, not images

The renderer is deterministic — given the same inputs, it produces the
same SVG. By storing the inputs we can:

- Re-render at any size without quality loss
- Tweak the visual design later (e.g. add a new gradient mode) and apply
  it to the whole gallery automatically
- Keep rows tiny (~400 bytes) so D1 stays fast and cheap

If we ever want to freeze old submissions to their original visual
treatment (so a redesign doesn't affect them), add a `renderer_version`
column and have the gallery render each square with the version it was
submitted under.
