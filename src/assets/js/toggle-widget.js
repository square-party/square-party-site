/*
  toggle-widget.js — Four-mode content toggle state machine.
  ===========================================================
  Ported from WM-1A sandbox (wm1a-toggle-widget.html).
  Sandbox-only display elements (mode-indicator outside [data-mode-root])
  are removed; all other logic is preserved verbatim.

  RESPONSIBILITIES:
  1. Init from URL query string (?mode=synthesis|design|gap|neutral).
  2. Set data-mode / data-design / data-gap on [data-mode-root].
  3. Sync aria-pressed on pill buttons.
  4. Handle pill clicks: flip individual toggle, recompute mode, update URL.
  5. Announce mode changes via ARIA live region.

  STATE CONTRACT — JS writes here; CSS reads from here:
    [data-mode-root][data-mode="synthesis"|"design"|"gap"|"neutral"]
    [data-mode-root][data-design="on"|"off"]
    [data-mode-root][data-gap="on"|"off"]

  STATE TABLE:
    design=on  + gap=on  → mode="synthesis"
    design=on  + gap=off → mode="design"
    design=off + gap=on  → mode="gap"
    design=off + gap=off → mode="neutral"

  GUARDS:
  - Returns silently if [data-mode-root] or pill buttons are absent.
    Safe to load on all empower pages; no-ops on pages without the widget.
  - Multiple [data-mode-root] on one page is not supported. If that case
    arises in future, update this script to iterate over all roots.
*/

(function () {
  'use strict';

  /* ── Selectors ─────────────────────────────────────── */
  var root = document.querySelector('[data-mode-root]');
  if (!root) return;

  var pillDesign = root.querySelector('[data-toggle="design"]');
  var pillGap    = root.querySelector('[data-toggle="gap"]');
  if (!pillDesign || !pillGap) return;

  var announcer = root.querySelector('[data-mode-announce]');

  /* ── State table ────────────────────────────────────── */
  function computeMode(designOn, gapOn) {
    if (designOn && gapOn)   return 'synthesis';
    if (designOn && !gapOn)  return 'design';
    if (!designOn && gapOn)  return 'gap';
    return 'neutral';
  }

  /* ── Mode → human label (for ARIA live announcements) ─ */
  var MODE_LABELS = {
    synthesis: 'Synthesis view active',
    design:    'Design view active',
    gap:       'Gap view active',
    neutral:   'Neutral analytical view active',
  };

  /* ── Valid modes ──────────────────────────────────────── */
  var VALID_MODES = { synthesis: true, design: true, gap: true, neutral: true };

  /* ── Init from URL query string ──────────────────────── */
  /*
    Reads ?mode=X. Invalid or absent → default to "neutral" silently.
    Does not push a URL update on init to avoid clobbering the canonical
    load URL before the user has interacted.
  */
  function initFromURL() {
    var params  = new URLSearchParams(window.location.search);
    var rawMode = params.get('mode');
    var mode    = (rawMode && VALID_MODES[rawMode]) ? rawMode : 'neutral';

    /* Reverse-map mode → individual toggle booleans */
    var designOn = (mode === 'synthesis' || mode === 'design');
    var gapOn    = (mode === 'synthesis' || mode === 'gap');

    applyState(designOn, gapOn, { announce: false, updateURL: false });
  }

  /* ── Apply state ─────────────────────────────────────── */
  /*
    Central state-write function. All mutations go through here.
    Writes data attributes, syncs aria-pressed, optionally announces
    and optionally pushes URL update.

    options:
      announce  {boolean} — fire ARIA live region (skip on init)
      updateURL {boolean} — replaceState (skip on init)
  */
  function applyState(designOn, gapOn, options) {
    var opts = Object.assign({ announce: true, updateURL: true }, options);
    var mode = computeMode(designOn, gapOn);

    /* Write wrapper attributes — CSS mode-show visibility reads from here. */
    root.setAttribute('data-mode',   mode);
    root.setAttribute('data-design', designOn ? 'on' : 'off');
    root.setAttribute('data-gap',    gapOn    ? 'on' : 'off');

    /* Sync aria-pressed on pills — individual toggle state, not derived mode. */
    pillDesign.setAttribute('aria-pressed', designOn ? 'true' : 'false');
    pillGap.setAttribute('aria-pressed',    gapOn    ? 'true' : 'false');

    /* Update URL so the current mode is shareable.
       history.replaceState — no page reload, no new history entry. */
    if (opts.updateURL) {
      var url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      history.replaceState(null, '', url.toString());
    }

    /* Announce mode change to screen readers.
       aria-live="polite" means announcement queues after current speech.
       Clear first, then write — some AT only fires on text change.
       rAF ensures DOM settles before text is written. */
    if (opts.announce && announcer) {
      announcer.textContent = '';
      requestAnimationFrame(function () {
        announcer.textContent = MODE_LABELS[mode] || mode;
      });
    }
  }

  /* ── Pill click handler ──────────────────────────────── */
  /*
    Each pill carries data-toggle="design" or data-toggle="gap".
    On click: read current individual states from root (authoritative),
    flip the clicked toggle, recompute mode, apply full state update.
    Reading from data attributes (not JS variables) avoids stale closure
    state under rapid successive clicks.
  */
  function handlePillClick(event) {
    var pill  = event.currentTarget;
    var which = pill.getAttribute('data-toggle'); /* "design" or "gap" */

    /* Read current state from root wrapper (authoritative). */
    var designOn = root.getAttribute('data-design') === 'on';
    var gapOn    = root.getAttribute('data-gap')    === 'on';

    /* Flip the clicked toggle. */
    if (which === 'design') designOn = !designOn;
    if (which === 'gap')    gapOn    = !gapOn;

    applyState(designOn, gapOn);
  }

  /* ── Wire up ─────────────────────────────────────────── */
  pillDesign.addEventListener('click', handlePillClick);
  pillGap.addEventListener('click', handlePillClick);

  /* Init — runs on DOMContentLoaded equivalent (script loaded with defer). */
  initFromURL();

}());
