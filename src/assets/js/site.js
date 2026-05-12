/* ============================================================
   Square Party — site-wide JavaScript
   ------------------------------------------------------------
   Five things, kept small and dependency-free:
   1. Layer toggle (Light / Dark) — wrapper-level four-state, persisted
   2. Domain pill grid preview panel
   3. Nav dropdown (click to open, hover to peek, Esc to close)
   4. Save / bookmark feature
   5. Neighbors filter
   ============================================================ */
(function () {
  'use strict';

  // ---------- 1. Layer toggle ----------
  // State is stored in localStorage under sq.layers.v1 and applied to
  // .layer-stage (the wrapper inside <main>), NOT body. Keeps site
  // header/footer neutral across all four states. See LAYERS.md.
  var STORAGE_KEY = 'sq.layers.v1';

  // The wrapper element. If absent (e.g. error pages without base.njk),
  // we no-op gracefully — the rest of the script still runs.
  var stage = document.getElementById('layer-stage');

  // Lens summary strings — shown in the toggle strip's aria-live region
  // so screen readers and sighted users get a tiny semantic anchor for
  // each state, not just a visual shift.
  var LENS_SUMMARY = {
    neutral: 'standard view',
    light:   'light side filter',
    dark:    'dark side filter',
    both:    'the best of both worlds'
  };

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (_e) {
      return {};
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_e) { /* private mode etc. — fine */ }
  }

  function currentLens(state) {
    if (state.light && state.dark) return 'both';
    if (state.light) return 'light';
    if (state.dark) return 'dark';
    return 'neutral';
  }

  function applyState(state) {
    if (!stage) return;
    stage.classList.toggle('layer-light', !!state.light);
    stage.classList.toggle('layer-dark', !!state.dark);

    // Update lens summary line in any visible toggle strip.
    var summaryEls = document.querySelectorAll('[data-layer-summary]');
    var lens = currentLens(state);
    summaryEls.forEach(function (el) {
      el.textContent = LENS_SUMMARY[lens] || LENS_SUMMARY.neutral;
    });
  }

  function syncButton(btn, active) {
    btn.setAttribute('aria-pressed', String(active));
    btn.classList.toggle('is-active', active);
  }

  // Apply persisted state immediately so the page paints with the right palette.
  var state = readState();
  applyState(state);

  // Wire toggle buttons. Selector matches both the new sticky strip
  // (.layer-toggle-strip__btn) and any legacy widget that might still
  // be on a page; they both share data-layer="light|dark" attributes.
  var toggleBtns = document.querySelectorAll(
    '.layer-toggle-strip__btn[data-layer], .layer-toggle__btn[data-layer]'
  );
  toggleBtns.forEach(function (btn) {
    var layer = btn.getAttribute('data-layer');
    if (!layer) return;
    syncButton(btn, !!state[layer]);
    btn.addEventListener('click', function () {
      state = readState();
      state[layer] = !state[layer];
      writeState(state);
      applyState(state);
      // Resync ALL buttons for this layer (page may have more than one strip)
      document.querySelectorAll('[data-layer="' + layer + '"]').forEach(function (b) {
        if (b.classList.contains('layer-toggle-strip__btn') ||
            b.classList.contains('layer-toggle__btn')) {
          syncButton(b, !!state[layer]);
        }
      });
    });
  });

  // ---------- 2. Domain index — sticky detail panel ----------
  // The panel updates on hover / focus of a domain row. Click on a row
  // navigates normally. With cluster sections collapsed by default (see 2b),
  // the panel starts in its intro state rather than pre-populating with a
  // domain that isn't visible in the grid.
  var grid = document.querySelector('.domain-index');
  if (grid) {
    var detail = grid.querySelector('.domain-detail');
    var titleEl = detail && detail.querySelector('.domain-detail__title');
    var descEl = detail && detail.querySelector('.domain-detail__desc');
    var stateEl = detail && detail.querySelector('.domain-detail__state');
    var openEl = detail && detail.querySelector('.domain-detail__open');

    function showDomain(link) {
      if (!detail) return;
      var title = link.getAttribute('data-title') || '';
      var desc = link.getAttribute('data-description') || '';
      var stateLabel = link.getAttribute('data-state-label') || '';
      var stateKey = link.getAttribute('data-state') || 'planned';
      var href = link.getAttribute('href') || '#';

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (stateEl) {
        stateEl.textContent = stateLabel;
        stateEl.setAttribute('data-state', stateKey);
        stateEl.removeAttribute('hidden');
      }
      if (openEl) {
        openEl.setAttribute('href', href);
        openEl.textContent = 'Open ' + title + ' →';
        openEl.removeAttribute('hidden');
      }
      // Visually mark the active row
      grid.querySelectorAll('.domain-row__link').forEach(function (l) {
        l.classList.remove('is-active');
      });
      link.classList.add('is-active');
    }

    var links = grid.querySelectorAll('.domain-row__link');
    links.forEach(function (link) {
      link.addEventListener('mouseenter', function () { showDomain(link); });
      link.addEventListener('focus', function () { showDomain(link); });
    });

    // The panel intentionally starts in its intro/empty state. With
    // clusters collapsed by default, pre-populating with a domain that
    // isn't visible in the grid would be confusing.
  }

  // ---------- 2b. Domain cluster collapse/expand ----------
  // Each cluster heading on the Empower index is a button that toggles the
  // visibility of its list. State persists per cluster across visits.
  // Default (no stored state) is COLLAPSED for every cluster — the index
  // wants to lead with the eight cluster names, then let the visitor open
  // whichever neighborhoods they care about.
  // Storage records ONLY the affirmatively-expanded clusters; absence of a
  // key means "use the default, which is collapsed." A new cluster added
  // later gets the default treatment for returning visitors automatically.
  var CLUSTER_KEY = 'sq.clusters.v2';
  var clusterToggles = document.querySelectorAll('[data-cluster-toggle]');
  if (clusterToggles.length > 0) {
    function readClusterState() {
      try {
        var raw = localStorage.getItem(CLUSTER_KEY);
        return raw ? (JSON.parse(raw) || {}) : {};
      } catch (_e) { return {}; }
    }
    function writeClusterState(s) {
      try { localStorage.setItem(CLUSTER_KEY, JSON.stringify(s)); }
      catch (_e) { /* private mode etc. — fine */ }
    }
    var clusterState = readClusterState();
    clusterToggles.forEach(function (btn) {
      var key = btn.getAttribute('data-cluster-toggle');
      // Apply persisted state. If the value is missing, leave the
      // server-rendered default (collapsed) in place.
      if (key && clusterState[key] === true) {
        btn.setAttribute('aria-expanded', 'true');
      }
      btn.addEventListener('click', function () {
        var nowOpen = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(nowOpen));
        if (key) {
          clusterState = readClusterState();
          // Only store affirmative-expanded so storage stays compact and
          // any cluster we add later defaults to collapsed.
          if (nowOpen) clusterState[key] = true;
          else delete clusterState[key];
          writeClusterState(clusterState);
        }
      });
    });
  }

  // ---------- 3. Nav dropdown ----------
  // Click-to-open with hover-peek. Esc closes. Click outside closes.
  var dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach(function (wrap) {
    var trigger = wrap.querySelector('[data-dropdown-trigger]');
    var panel = wrap.querySelector('[data-dropdown-panel]');
    if (!trigger || !panel) return;

    function open() {
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      if (wrap.classList.contains('is-open')) close(); else open();
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      toggle();
    });

    // Hover-peek: open on hover, close on mouse leave (only if not click-locked).
    var hoverTimer;
    wrap.addEventListener('mouseenter', function () {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(open, 80);
    });
    wrap.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
      // Don't auto-close if user explicitly clicked it open — but for simplicity
      // we close on leave; the click can re-open if needed.
      hoverTimer = setTimeout(close, 220);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrap.classList.contains('is-open')) close();
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target) && wrap.classList.contains('is-open')) close();
    });
  });

  // ---------- 3b. Mobile nav (hamburger) toggle ----------
  // Below the mobile breakpoint (see main.css @media max-width: 600px) the
  // link list is hidden until the user taps the hamburger. Tapping a link
  // closes the menu so navigation feels right; Esc and resize-up also close.
  var navToggle = document.querySelector('[data-nav-toggle]');
  var navMenu = document.getElementById('site-nav-menu');
  if (navToggle && navMenu) {
    function setNav(open) {
      navMenu.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    navToggle.addEventListener('click', function () {
      setNav(!navMenu.classList.contains('is-open'));
    });
    // Tapping a real link inside the menu closes it (dropdown triggers are
    // <button>s, so they're naturally excluded from this selector).
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setNav(false);
      }
    });
    // If the viewport grows back to desktop while the menu is open, close it
    // so the desktop layout doesn't carry a stuck "is-open" state.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 600 && navMenu.classList.contains('is-open')) {
        setNav(false);
      }
    });
  }

  // ---------- 4. Save / bookmark feature ----------
  var SAVED_KEY = 'sq.saved.v1';

  function readSaved() {
    try {
      var raw = localStorage.getItem(SAVED_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_e) { return []; }
  }

  function writeSaved(arr) {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(arr)); }
    catch (_e) { /* private mode etc. — fine */ }
  }

  function isSavedUrl(url) {
    return readSaved().some(function (item) { return item.url === url; });
  }

  function toggleSaved(item) {
    var arr = readSaved();
    var i = arr.findIndex(function (x) { return x.url === item.url; });
    if (i >= 0) {
      arr.splice(i, 1);
    } else {
      arr.unshift({
        url: item.url,
        title: item.title,
        description: item.description || '',
        context: item.context || '',
        savedAt: new Date().toISOString()
      });
    }
    writeSaved(arr);
    return i < 0; // true if just saved
  }

  function syncSaveButton(btn) {
    var saved = isSavedUrl(btn.getAttribute('data-url') || '');
    btn.setAttribute('data-saved', saved ? 'true' : 'false');
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
  }

  // Wire up save buttons on the current page
  var saveBtns = document.querySelectorAll('[data-save-button]');
  saveBtns.forEach(function (btn) {
    syncSaveButton(btn);
    btn.addEventListener('click', function () {
      toggleSaved({
        url: btn.getAttribute('data-url') || '',
        title: btn.getAttribute('data-title') || '',
        description: btn.getAttribute('data-description') || '',
        context: btn.getAttribute('data-context') || ''
      });
      syncSaveButton(btn);
    });
  });

  // Render the saved list on the /saved/ page
  var savedContainer = document.getElementById('saved-list-container');
  if (savedContainer) {
    renderSavedList(savedContainer);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatSavedDate(iso) {
    try {
      var d = new Date(iso);
      var months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
      return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    } catch (_e) { return ''; }
  }

  function renderSavedList(container) {
    var items = readSaved();
    if (items.length === 0) {
      container.innerHTML =
        '<div class="saved-list__empty">' +
        '<p>No saved pages yet.</p>' +
        '<p class="saved-list__empty-hint">' +
        'While reading any long-form page, click the bookmark icon at the top of ' +
        'the page to save it here for later. Saves are stored in this browser ' +
        'only — they don\'t follow you across devices.' +
        '</p></div>';
      return;
    }
    var html = '<ul class="saved-list">';
    items.forEach(function (item) {
      html +=
        '<li class="saved-list__item">' +
          '<div class="saved-list__head">' +
            (item.context ? '<p class="saved-list__context">' + escapeHtml(item.context) + '</p>' : '') +
            '<h2 class="saved-list__title"><a href="' + escapeHtml(item.url) + '">' + escapeHtml(item.title) + '</a></h2>' +
          '</div>' +
          (item.description ? '<p class="saved-list__desc">' + escapeHtml(item.description) + '</p>' : '') +
          '<div class="saved-list__foot">' +
            '<span class="saved-list__date">Saved ' + escapeHtml(formatSavedDate(item.savedAt)) + '</span>' +
            '<button class="saved-list__remove" data-remove-url="' + escapeHtml(item.url) + '" aria-label="Remove from saved">Remove</button>' +
          '</div>' +
        '</li>';
    });
    html += '</ul>';
    html += '<p class="saved-list__clear-row">' +
            '<button class="saved-list__clear" type="button">Clear all saved pages</button>' +
            '</p>';
    container.innerHTML = html;

    // Wire remove buttons
    container.querySelectorAll('[data-remove-url]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.getAttribute('data-remove-url') || '';
        var arr = readSaved().filter(function (x) { return x.url !== url; });
        writeSaved(arr);
        renderSavedList(container);
      });
    });
    // Wire clear-all
    var clearBtn = container.querySelector('.saved-list__clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Remove all ' + items.length + ' saved page(s)?')) {
          writeSaved([]);
          renderSavedList(container);
        }
      });
    }
  }

  // ---------- 5. Neighbors filter ----------
  // The Meet the Neighbors page renders a card grid with two filter dimensions
  // (sub-domain, sub-area). Filter chips toggle on click; cards whose
  // data-attributes don't match all active filters are hidden.
  var neighborsGrid = document.querySelector('.neighbors-grid');
  if (neighborsGrid) {
    var filterChips = document.querySelectorAll('.neighbors-filter__chip');
    var clearFiltersBtn = document.querySelector('.neighbors-filter__clear');
    var countEl = document.getElementById('neighbors-count');
    var allCards = neighborsGrid.querySelectorAll('.neighbor-card');

    var activeFilters = { subdomain: [], subarea: [] };

    function applyFilters() {
      var visible = 0;
      allCards.forEach(function (card) {
        var subdomain = card.getAttribute('data-subdomain') || '';
        var subareasAttr = card.getAttribute('data-subarea') || '';
        var subareas = subareasAttr.split(/\s+/).filter(Boolean);

        var matchesSubdomain = activeFilters.subdomain.length === 0 ||
          activeFilters.subdomain.indexOf(subdomain) !== -1;
        var matchesSubarea = activeFilters.subarea.length === 0 ||
          subareas.some(function (a) { return activeFilters.subarea.indexOf(a) !== -1; });

        var shouldShow = matchesSubdomain && matchesSubarea;
        if (shouldShow) {
          card.removeAttribute('hidden');
          visible++;
        } else {
          card.setAttribute('hidden', '');
        }
      });
      if (countEl) countEl.textContent = String(visible);
    }

    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var dim = chip.getAttribute('data-filter');
        var val = chip.getAttribute('data-value');
        if (!dim || !val || !activeFilters[dim]) return;
        var idx = activeFilters[dim].indexOf(val);
        if (idx >= 0) {
          activeFilters[dim].splice(idx, 1);
          chip.classList.remove('is-active');
          chip.setAttribute('aria-pressed', 'false');
        } else {
          activeFilters[dim].push(val);
          chip.classList.add('is-active');
          chip.setAttribute('aria-pressed', 'true');
        }
        applyFilters();
      });
    });

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function () {
        activeFilters.subdomain = [];
        activeFilters.subarea = [];
        filterChips.forEach(function (chip) {
          chip.classList.remove('is-active');
          chip.setAttribute('aria-pressed', 'false');
        });
        applyFilters();
      });
    }
  }

})();
