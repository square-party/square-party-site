# Privacy

## What we collect

Per submission:
- The creative payload (colors, words, glyph, style)
- A **hash** of the submitter's IP address, salted with a daily-rotated
  random key. Used only for rate limiting (1 per hour by default).
- A truncated User-Agent string (first 200 chars). Used only for
  diagnosing abuse.
- The Cloudflare Turnstile token at submit time, verified server-side
  and not stored.

## What we don't collect

- Names, emails, accounts, or any personal identifier.
- Cookies (the page sets none).
- Analytics events. There is no analytics tag on `/square` or `/gallery`.
- Raw IPs. We hash with a daily salt and rotate every 24h, so a leaked
  database can't be cross-referenced against future log data.

## Data retention

- **Approved squares**: indefinite (they're public).
- **Pending squares**: indefinite until moderated. Most get approved or
  rejected within a day.
- **Rejected squares**: kept for audit. If you want them purged, run:
  ```bash
  npx wrangler d1 execute squares \
    --command="DELETE FROM squares WHERE status='rejected' AND created_at < unixepoch() - 30*86400"
  ```
- **IP hashes**: same lifetime as the row they're attached to. Salts are
  pruned after 7 days, so any hash older than a week is effectively
  irreversible even with the DB.

## What visitors see

The footer of `/square` should mention this in plain language:

> Your submission is anonymous. We don't store your IP, set cookies, or
> ask for an email. Once approved, your square appears in the public
> gallery alongside everyone else's.

Add the footer copy to your site's standard layout — it's not in the
generator template by default since it depends on your overall design.
