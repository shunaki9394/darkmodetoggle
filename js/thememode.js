
(function () {
  'use strict';

  const STORAGE_KEY = 'glpi_theme_mode';

  function prefersDark() { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; }
  function savedMode()  { const v = localStorage.getItem(STORAGE_KEY); return (v === 'dark' || v === 'light') ? v : null; }
  function getMode()    { return savedMode() || (prefersDark() ? 'dark' : 'light'); }

  function apply(mode) {
    const DOC = document.documentElement;
    if (mode === 'dark') { DOC.setAttribute('data-theme', 'dark'); document.body && document.body.classList.add('theme-dark'); }
    else { DOC.removeAttribute('data-theme'); document.body && document.body.classList.remove('theme-dark'); }
    localStorage.setItem(STORAGE_KEY, mode);
    updateToggle(mode);
  }

  function makeToggle() {
    let btn = document.getElementById('tm-toggle');
    if (btn) return btn;
    btn = document.createElement('button');
    btn.id = 'tm-toggle';
    btn.type = 'button';
    btn.className = 'tm-switch';
    btn.setAttribute('aria-label', 'Toggle dark / light mode');
    btn.setAttribute('title', 'Toggle dark / light');
    btn.innerHTML = '<span class="tm-track" aria-hidden="true"></span>' +
                    '<span class="tm-thumb" aria-hidden="true">' +
                    '  <span class="tm-icon tm-icon-sun">☀️</span>' +
                    '  <span class="tm-icon tm-icon-moon">🌙</span>' +
                    '</span>';
    btn.addEventListener('click', () => apply(getMode() === 'dark' ? 'light' : 'dark'));
    return btn;
  }

  const SEARCH_SELECTORS = [
    '#app-header input[type="search"]',
    'header input[type="search"]',
    '.navbar input[type="search"]',
    'input[type="search"][placeholder*="Search"]',
    'input[type="search"][placeholder*="search"]'
  ];

  function findSearchInput() {
    for (const sel of SEARCH_SELECTORS) {
      const el = document.querySelector(sel);
      if (el && el.offsetParent !== null) return el;
    }
    const f = document.querySelector('form[role="search"]');
    if (f) {
      const el = f.querySelector('input[type="search"], input[type="text"]');
      if (el && el.offsetParent !== null) return el;
    }
    return null;
  }

  function ensureFixedSlot() {
    let slot = document.getElementById('tm-fixed-slot');
    if (!slot) {
      slot = document.createElement('div');
      slot.id = 'tm-fixed-slot';
      slot.className = 'tm-fixed-slot';
      document.body.appendChild(slot);
    }
    return slot;
  }

  function placeNearSearch() {
    const target = findSearchInput();
    if (!target) return false;

    const btn  = makeToggle();
    const slot = ensureFixedSlot();
    if (!btn.isConnected) slot.appendChild(btn);

    const rect = target.getBoundingClientRect();
    const vw   = window.innerWidth || document.documentElement.clientWidth;
    const gap  = 10;

    const h = Math.max(32, Math.round(rect.height));
    btn.style.setProperty('--tm-h', h + 'px');
    const w = h * 2.2;

    let left = rect.left - w - gap;
    let top  = rect.top + (rect.height - h) / 2;

    if (left < 6) left = rect.right + gap;
    left = Math.max(6, Math.min(left, vw - w - 6));

    slot.style.position = 'fixed';
    slot.style.left = Math.round(left) + 'px';
    slot.style.top  = Math.round(top)  + 'px';
    slot.style.width  = w + 'px';
    slot.style.height = h + 'px';
    slot.style.zIndex = 2147483000;

    const srect = slot.getBoundingClientRect();
    const visible = srect.right > 0 && srect.left < vw && srect.bottom > 0 && srect.top < (window.innerHeight || 9999);
    if (!visible) { btn.classList.add('tm-floating'); } else { btn.classList.remove('tm-floating'); }
    return true;
  }

  function wireObservers() {
    const place = () => placeNearSearch();
    place();
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);

    const input = findSearchInput();
    if (window.ResizeObserver && input) {
      const ro = new ResizeObserver(place);
      ro.observe(input);
    }

    setTimeout(() => {
      const exists = document.getElementById('tm-toggle');
      if (!exists) {
        const btn = makeToggle();
        btn.classList.add('tm-floating');
        document.body.appendChild(btn);
        updateToggle(getMode());
      }
    }, 1500);
  }

  function updateToggle(mode) {
    const toggle = document.getElementById('tm-toggle');
    if (!toggle) return;
    toggle.setAttribute('data-mode', mode);
    toggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  }

  const mo = new MutationObserver(() => {
    const btn = document.getElementById('tm-toggle');
    if (!btn || !btn.isConnected) wireObservers();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', function () {
    wireObservers();
    apply(getMode());
  });
})();
