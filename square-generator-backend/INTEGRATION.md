# Integration guide

Follow these steps end to end. None of them are optional.

## 1. Cloudflare bits (do these first)

### 1a. Create the D1 database

```bash
cd handoff/worker
npx wrangler d1 create squares
```

Copy the `database_id` it prints into `wrangler.toml` under `[[d1_databases]]`.

### 1b. Run the migration

```bash
npx wrangler d1 execute squares --file=./schema.sql
```

### 1c. Set up Turnstile

1. Cloudflare dashboard → Turnstile → Add site.
2. Mode: **Managed**. Copy the site key + secret key.
3. `npx wrangler secret put TURNSTILE_SECRET` → paste the secret key.
4. Site key goes into your Eleventy `_data/site.json` as `turnstileSiteKey`.

### 1d. Set up Cloudflare Access for the admin route

1. Cloudflare dashboard → Zero Trust → Access → Applications → Add.
2. Application type: **Self-hosted**.
3. Application domain: `yoursite.com/admin/*`.
4. Identity provider: One-Time PIN to your email (simplest).

The admin queue page is otherwise identical to the public gallery — the
only thing protecting it is Cloudflare Access. Don't skip this.

### 1e. Deploy the Worker

```bash
cd handoff/worker
npm install
npx wrangler deploy
```

It deploys to `<workername>.<account>.workers.dev`. Set up a custom route
to `yoursite.com/api/*` in the Cloudflare dashboard so the Eleventy page
can hit it as same-origin.

## 2. Eleventy bits

### 2a. Copy the templates

```bash
cp handoff/eleventy/square.njk        src/square.njk
cp handoff/eleventy/gallery.njk       src/gallery.njk
cp handoff/eleventy/admin-queue.njk   src/admin/queue.njk
```

### 2b. Copy the assets

```bash
mkdir -p src/assets/square-app
cp handoff/assets/square-app/* src/assets/square-app/
```

Make sure your Eleventy config passthrough-copies `assets/`:

```js
// .eleventy.js
eleventyConfig.addPassthroughCopy("src/assets");
```

### 2c. Add the Turnstile site key

In `src/_data/site.json`:

```json
{
  "turnstileSiteKey": "0x4AAA...",
  "apiBase": "/api"
}
```

The templates pull these in via `{{ site.turnstileSiteKey }}`.

### 2d. Build + deploy

```bash
npx @11ty/eleventy
# then your usual cloudflare-pages or git-push deploy
```

## 3. Smoke test

1. Visit `/square`. Make a square. Submit. You should:
   - See the celebratory reveal.
   - Be able to download PNG and SVG.
   - Get a `submission_id` shown in the meta.
2. Visit `/admin/queue` (Cloudflare Access will challenge you). Approve the square.
3. Visit `/gallery`. Your square should be there.

## 4. Done

If anything looks off, the most likely culprits:
- API base URL mismatch — check `_data/site.json` `apiBase` matches your Worker route.
- Turnstile keys — site key in template, secret key in Worker secret.
- D1 not migrated — re-run `wrangler d1 execute squares --file=./schema.sql`.
