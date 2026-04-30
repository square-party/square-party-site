-- Square Generator schema.
-- Run with: npx wrangler d1 execute squares --file=./schema.sql
--
-- Status lifecycle:
--   pending  → submission received, awaiting moderation
--   approved → visible in /gallery
--   rejected → kept in DB for audit, never shown
--
-- We store the canonical creative inputs (colors, words, glyph, style)
-- rather than a rendered image — this lets us re-render server-side if
-- the visual design changes, and keeps rows tiny (~400 bytes).

CREATE TABLE IF NOT EXISTS squares (
  id           TEXT PRIMARY KEY,            -- ulid; assigned at submit
  created_at   INTEGER NOT NULL,            -- unix seconds
  status       TEXT NOT NULL DEFAULT 'pending',  -- pending|approved|rejected
  reviewed_at  INTEGER,                     -- unix seconds, nullable
  reviewed_by  TEXT,                        -- email from CF Access header

  -- Creative payload. Validated by the Worker on insert.
  color_tl     TEXT NOT NULL,               -- hex, e.g. "#1f3a4d"
  color_tr     TEXT NOT NULL,
  color_bl     TEXT NOT NULL,
  color_br     TEXT NOT NULL,
  word_tl      TEXT NOT NULL,               -- ≤ 18 chars
  word_tr      TEXT NOT NULL,
  word_bl      TEXT NOT NULL,
  word_br      TEXT NOT NULL,
  glyph        TEXT NOT NULL,               -- glyph id from word-suggestions.js
  glyph_color  TEXT NOT NULL,
  style_json   TEXT NOT NULL,               -- JSON: gradient, fillStyle, scenery, etc.

  -- Submission metadata. NOT shown publicly.
  ip_hash      TEXT NOT NULL,               -- sha256(ip + daily_salt) — for rate limit only
  user_agent   TEXT,                        -- truncated to 200 chars; debugging only
  notes        TEXT                         -- free-text moderator notes
);

CREATE INDEX IF NOT EXISTS idx_squares_status_created
  ON squares (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_squares_ip_hash_created
  ON squares (ip_hash, created_at DESC);

-- Daily salts for IP hashing. We rotate the salt every day so old IP
-- hashes can't be re-derived from a leaked DB. Keep ~7 days of history.
CREATE TABLE IF NOT EXISTS ip_salts (
  day   TEXT PRIMARY KEY,                   -- ISO date, e.g. "2026-04-30"
  salt  TEXT NOT NULL                       -- random 32 bytes, hex
);

-- Optional: featured square for the homepage. Single row, id 1.
CREATE TABLE IF NOT EXISTS featured (
  id           INTEGER PRIMARY KEY CHECK (id = 1),
  square_id    TEXT NOT NULL,
  set_at       INTEGER NOT NULL,
  FOREIGN KEY (square_id) REFERENCES squares (id)
);
