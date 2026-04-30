# Moderation

## Daily flow

1. Visit `/admin/queue` — Cloudflare Access challenges you with a one-time
   PIN to your authorized email.
2. The page lists pending submissions oldest-first, full-size, with
   words and timestamp.
3. Click **Approve** to publish to `/gallery`, or **Reject** to hide.
4. Both actions are recorded in `reviewed_by` (your email) and
   `reviewed_at` (unix seconds).

## What to look for

The visitor-facing form already restricts inputs:

- Words: ≤ 18 chars, letters/numbers/spaces/apostrophes/hyphens only
- Glyph: one of 15 fixed shapes
- Colors: any hex
- Style: closed vocabulary

So the only things you actually need to evaluate are:

1. **Slurs / harassment** in the words. The placeholder profanity filter
   in `worker/src/index.ts` catches the obvious; you catch the rest.
2. **Spam / brand misuse**: someone using the four words to advertise.
3. **Coordinated abuse**: same IP-hash submitting near-identical squares.
   Check `created_at` clustering and `ip_hash` matches.

## Setting up Cloudflare Access

This is mandatory. Without it, anyone on the internet can approve
squares. Steps:

1. Cloudflare dashboard → **Zero Trust** → enable if needed (free for
   small teams).
2. **Access** → **Applications** → **Add an application** → **Self-hosted**.
3. Application domain: `yoursite.com` and path `/admin/*`.
4. Identity providers: **One-Time PIN** is fine for solo use.
5. Policies: **Allow** with rule `Emails` → your email(s).
6. Save.

Cloudflare will inject a `Cf-Access-Authenticated-User-Email` header
into requests reaching the Worker. The Worker reads this header to
decide who's authorized; it never trusts a client-supplied copy because
Cloudflare strips spoofed copies before they reach origin.

## Operations

Reset all moderation state for a square:

```bash
npx wrangler d1 execute squares \
  --command="UPDATE squares SET status='pending', reviewed_at=NULL, reviewed_by=NULL WHERE id='ULID'"
```

Bulk-export everything for backup:

```bash
npx wrangler d1 export squares --output=backup-$(date +%Y%m%d).sql
```
