# Square Generator — Handoff package

This folder contains everything you need to drop the Square Generator into an Eleventy + Cloudflare site. The next Claude (or you) should read **this file first**, then `INTEGRATION.md` for the step-by-step.

## What's here

```
handoff/
├── README.md                  ← you are here
├── INTEGRATION.md             ← step-by-step integration guide
├── eleventy/
│   ├── square.njk             ← /square — the generator page
│   ├── gallery.njk            ← /gallery — the public mosaic
│   └── admin-queue.njk        ← /admin/queue — moderation (gate behind Cloudflare Access)
├── assets/square-app/
│   ├── square-app.css         ← styles (was styles.css in the prototype)
│   ├── square-renderer.js     ← the SVG renderer (no React; vanilla JS)
│   ├── word-suggestions.js    ← curated word lists
│   ├── generator.js           ← the generator UI (vanilla JS, no React)
│   └── gallery.js             ← gallery rendering + lightbox
├── worker/
│   ├── src/index.ts           ← Cloudflare Worker — submit / list / moderate
│   ├── schema.sql             ← D1 schema + initial migration
│   ├── wrangler.toml          ← Worker config
│   └── package.json
└── docs/
    ├── data-model.md          ← schema, fields, status lifecycle
    ├── moderation.md          ← admin flow + Cloudflare Access setup
    └── privacy.md             ← what we collect, what we don't, and why
```

## Recommended approach

The prototype was built in React for fast iteration. The shipped version
should be **vanilla JS** so it loads instantly on a static Eleventy page
without React/Babel runtime weight. The handoff includes the vanilla
rewrite — same UX, same visuals, ~80% less JS.

If you'd rather keep React, the original `.jsx` files in the project root
work fine; just add the React + Babel script tags in the Eleventy template
and reference them. The vanilla bundle is recommended.

## Tech choices (already decided)

- **Storage**: Cloudflare D1 (SQLite). One row per square. Status field controls visibility.
- **Anti-spam**: Cloudflare Turnstile, server-verified.
- **Moderation**: separate `/admin/queue` route gated by Cloudflare Access. No third-party.
- **No tracking**: no analytics on the generator page, no cookies set, no email collected.
- **Tally**: not used for this form. The live preview requires custom JS.

## Open decisions to make before deploying

1. Do you want a "name / handle" field for gallery attribution? Default: **no**, fully anonymous.
2. Approval emails: **no** by recommendation (would require email collection).
3. Featured square on homepage: handler is wired; flip the flag in `worker/src/index.ts` `featuredEndpoint`.
4. Word profanity filter: edit `worker/src/profanity.ts` (placeholder list included).
5. Rate limit: 1 submission per IP per hour by default. Adjust in `wrangler.toml`.
