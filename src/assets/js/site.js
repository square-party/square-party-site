/* ============================================================
   Square Party — site-wide JavaScript
   ------------------------------------------------------------
   Three things, kept small and dependency-free:
   1. Layer toggle (Light / Dark) — independent on/off, persisted
   2. Domain pill grid preview panel
   3. Nav dropdown (click to open, hover to peek, Esc to close)
   ============================================================ */
(function () {
  'use strict';

  // ---------- 1. Layer toggle ----------
  var STORAGE_KEY = 'sq.layers.v1';
  var body = document.body;

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

  function applyState(state) {
    body.classList.toggle('layer-light', !!state.light);
    body.classList.toggle('layer-dark', !!state.dark);
  }

  function syncButton(btn, active) {
    btn.setAttribute('aria-pressed', String(active));
    btn.classList.toggle('is-active', active);
  }

  // Apply persisted state immediately so the page paints with the right palette.
  var state = readState();
  applyState(state);

  // Wire toggle buttons.
  var toggleBtns = document.querySelectorAll('.layer-toggle__btn');
  toggleBtns.forEach(function (btn) {
    var layer = btn.getAttribute('data-layer');
    if (!layer) return;
    syncButton(btn, !!state[layer]);
    btn.addEventListener('click', function () {
      state = readState();
      state[layer] = !state[layer];
      writeState(state);
      applyState(state);
      syncButton(btn, !!state[layer]);
    });
  });

  // ---------- 2. Domain index — sticky detail panel ----------
  // Pre-populate the detail panel with the first domain on page load so it's
  // never empty. Update on hover / focus. Click on a row navigates normally.
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

    // Pre-populate with first domain so the panel is never empty.
    if (links.length > 0) showDomain(links[0]);
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

  // ---------- 4. Save / bookmark feature ----------
  var SAVED_KEY = 'sq.saved.v1';

  function readSaved() {
    try {
      var raw = localStorage.getItem(SAVED_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_e) {
      return [];
    }
  }

  function writeSaved(arr) {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
    } catch (_e) { /* private mode etc. — fine */ }
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
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatSavedDate(iso) {
    try {
      var d = new Date(iso);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    } catch (_e) {
      return '';
    }
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
        '</p>' +
        '</div>';
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
    html +=
      '<p class="saved-list__clear-row">' +
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
    var totalCards = allCards.length;

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
