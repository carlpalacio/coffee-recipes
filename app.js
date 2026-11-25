/* =====================================================================
   Kape — app
   Plain JS, no build step. Data lives in recipes.js and photos.js.
   ===================================================================== */
(() => {
  'use strict';

  const RECIPES = window.RECIPES || [];
  const PHOTOS = window.PHOTOS || {};
  const STYLES = window.STYLES || [];
  const ROUNDS = window.ROUNDS || [];
  const SYRUPS = window.SYRUPS || [];
  const SITE = window.SITE || { name: 'Kape' };

  // Old links and saved ticks from before the menu was renamed
  const ALIASES = { 'iced-spanish-latte': 'spanish-latte', 'brown-sugar-latte': 'latte' };
  const BUILD_ORDER = ['hot', 'iced'];
  const BUILD_LABEL = { hot: 'Hot', iced: 'Iced' };

  RECIPES.forEach((r, i) => {
    r.n = i + 1;
    // every recipe gets at least one build; menu drinks have hot + iced, each with its own cup
    if (!r.builds) r.builds = { base: { parts: r.parts, steps: r.steps } };
    r.buildKeys = Object.keys(r.builds).sort((a, b) => BUILD_ORDER.indexOf(a) - BUILD_ORDER.indexOf(b));
    r.defaultBuild = r.defaultBuild || (r.builds.iced ? 'iced' : r.buildKeys[0]);
  });
  const BY = Object.fromEntries(RECIPES.map(r => [r.slug, r]));

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const COLS = [
    { id: 'all', label: 'All' },
    { id: 'menu', label: 'Menu' },
    { id: 'try', label: 'Must try' },
    { id: 'classic', label: 'Classics' },
  ];
  const COL_LABEL = { menu: 'Menu', try: 'Must try', classic: 'Classic' };
  const SERVES = [{ id: 'all', label: 'Hot & iced' }, { id: 'iced', label: 'Iced' }, { id: 'hot', label: 'Hot' }];

  /* ---------------- storage (per browser, optional) ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode etc. */ } },
  };
  const tried = new Set(store.get('kape.tried', []).map(k => ALIASES[k] || k));

  /* ---------------- toast ---------------- */
  const toastEl = $('[data-toast]');
  let toastT;
  function toast(html) {
    toastEl.innerHTML = html;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  /* ---------------- photos ---------------- */
  function photoSrc(slug, size) {
    const p = PHOTOS[slug];
    if (!p || !p.src) return null;
    if (/images\.unsplash\.com/.test(p.src)) {
      const base = `${p.src}?w=${size}&h=${size}&fit=crop&crop=entropy&auto=format&q=70`;
      return { src: base, srcset: `${base} 1x, ${base}&dpr=2 2x` };
    }
    return { src: p.src, srcset: '' };
  }

  function photoHTML(slug, size, eager = false) {
    const r = BY[slug];
    const s = photoSrc(slug, size);
    if (!s) return `<div class="ph ph--empty" role="img" aria-label="${esc(r.name)}"></div>`;
    const alt = esc(PHOTOS[slug].alt || r.name);
    const common = `src="${s.src}" ${s.srcset ? `srcset="${s.srcset}"` : ''} loading="${eager ? 'eager' : 'lazy'}" decoding="async" data-loading`;
    return `<div class="ph">
      <img class="ph__color" ${common} alt="${alt}">
      <img class="ph__duo" ${common} alt="" aria-hidden="true">
    </div>`;
  }

  // fade images in once loaded; fall back to an empty frame if one fails
  document.addEventListener('load', e => {
    if (e.target.tagName === 'IMG' && e.target.hasAttribute('data-loading')) e.target.removeAttribute('data-loading');
  }, true);
  document.addEventListener('error', e => {
    const img = e.target;
    if (img.tagName !== 'IMG' || !img.closest('.ph')) return;
    const ph = img.closest('.ph');
    ph.classList.add('ph--empty');
    $$('img', ph).forEach(i => i.remove());
  }, true);

  /* ---------------- amounts ---------------- */
  const PLURAL = { shot: 'shots', slice: 'slices', bag: 'bags', spoon: 'spoons', scoop: 'scoops', pc: 'pcs' };
  const SINGULAR = Object.fromEntries(Object.entries(PLURAL).map(([a, b]) => [b, a]));
  const FRAC = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

  function fmtNum(x, unit) {
    const metric = /^(g|ml)$/.test(unit);
    if (metric) return x >= 10 ? String(Math.round(x)) : String(Math.round(x * 10) / 10);
    const whole = Math.floor(x + 1e-9);
    const rest = Math.round((x - whole) * 4) / 4;
    if (rest === 0) return String(whole);
    if (rest === 1) return String(whole + 1);
    if (FRAC[rest]) return (whole ? whole : '') + FRAC[rest];
    return String(Math.round(x * 10) / 10);
  }

  function amount(raw, k) {
    let s = String(raw);
    let sugg = false;
    if (s.startsWith('~')) { sugg = true; s = s.slice(1); }
    const m = s.match(/^(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*(.*)$/);
    if (!m) return { text: s, sugg };
    let unit = m[3].trim();
    const lo = parseFloat(m[1]) * k;
    const hi = m[2] ? parseFloat(m[2]) * k : null;
    const n = hi ?? lo;
    if (n > 1 && PLURAL[unit]) unit = PLURAL[unit];
    if (n <= 1 && SINGULAR[unit]) unit = SINGULAR[unit];
    const text = fmtNum(lo, unit) + (hi != null ? '–' + fmtNum(hi, unit) : '') + (unit ? ' ' + unit : '');
    return { text, sugg };
  }

  /* =====================================================================
     Header bits
     ===================================================================== */
  function setupChrome() {
    const total = `(${pad(RECIPES.length)})`;
    $$('[data-total]').forEach(el => { el.textContent = total; });
    $$('[data-site-name]').forEach(el => { el.textContent = SITE.name; });
    document.title = `${SITE.name} — Coffee Recipes`;

    const word = $('[data-wordmark]');
    word.innerHTML = [...SITE.name].map((ch, i) =>
      `<span class="ch" style="animation-delay:${reduceMotion ? 0 : 80 + i * 70}ms">${esc(ch)}</span>`).join('');
    word.closest('h1').setAttribute('aria-label', SITE.name);

    // size the big wordmarks so they run edge to edge, like the reference
    const fit = () => {
      [[$('.hero__word'), word], [$('.footer__word'), $('.footer__word span')]].forEach(([box, inner]) => {
        if (!box || !inner) return;
        const cs = getComputedStyle(box);
        const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const sup = $('sup', box);
        const reserve = sup ? sup.getBoundingClientRect().width + 16 : 0;
        box.style.fontSize = '100px';
        const w = inner.getBoundingClientRect().width;
        if (w) box.style.fontSize = `${Math.max(64, Math.floor(100 * (avail - reserve) / w * 0.985))}px`;
      });
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
    let rT;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(fit, 120); });
  }

  /* =====================================================================
     Index: filters + grid
     ===================================================================== */
  const state = { col: 'all', serve: 'all', style: null, q: '' };
  const gridEl = $('[data-grid]');
  const colsEl = $('[data-collections]');
  const serveEl = $('[data-serve]');
  const famEl = $('[data-families]');
  const searchEl = $('[data-search]');
  const resultsEl = $('[data-results]');
  const emptyEl = $('[data-empty]');
  let current = RECIPES.slice();

  const haystack = r => [r.name, r.desc, r.style, COL_LABEL[r.col], ...r.serve,
    ...Object.values(r.builds).flatMap(b => b.parts.flatMap(p => p.items.map(i => i[1])))].join(' ').toLowerCase();
  RECIPES.forEach(r => { r._hay = haystack(r); });

  function matches(r, ignore) {
    if (ignore !== 'col' && state.col !== 'all' && r.col !== state.col) return false;
    if (state.serve !== 'all' && !r.serve.includes(state.serve)) return false;
    if (state.style && r.style !== state.style) return false;
    if (state.q) {
      const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!terms.every(t => r._hay.includes(t))) return false;
    }
    return true;
  }

  function renderFilters() {
    colsEl.innerHTML = COLS.map(c => {
      const n = RECIPES.filter(r => (c.id === 'all' || r.col === c.id) && matches(r, 'col')).length;
      const dot = c.id === 'try' ? '<span class="tab__dot" aria-hidden="true"></span>' : '';
      return `<button type="button" class="tab" role="tab" aria-selected="${state.col === c.id}" data-col="${c.id}">
        <span>${dot}${c.label}</span><span class="paren">(${pad(n)})</span></button>`;
    }).join('');
    serveEl.innerHTML = SERVES.map(s =>
      `<button type="button" class="chip" aria-pressed="${state.serve === s.id}" data-serve-id="${s.id}">${s.label}</button>`).join('');
    famEl.innerHTML = STYLES.map(s =>
      `<button type="button" class="chip" aria-pressed="${state.style === s}" data-style="${esc(s)}">${esc(s)}</button>`).join('');
  }

  function cardHTML(r, i) {
    const isTried = tried.has(r.slug);
    const flag = r.col === 'try'
      ? `<span class="card__flag card__flag--try ${isTried ? 'card__flag--tried' : ''}">${isTried ? 'Tested' : 'Must try'}</span>`
      : `<span class="card__flag">${COL_LABEL[r.col]}</span>`;
    const serve = r.serve.map(s => s[0].toUpperCase() + s.slice(1)).join(' / ');
    return `<li class="card reveal" style="--d:${(i % 4) * 70}ms">
      <a class="card__link" href="#/${r.slug}" data-slug="${r.slug}">
        <div class="card__top">${flag}<span>${serve}</span></div>
        <div class="card__media">${photoHTML(r.slug, 360)}</div>
        <div class="card__foot">
          <div><span class="card__num">(${pad(r.n)})</span><span class="card__name">${esc(r.name)}</span></div>
          <span class="dot" aria-hidden="true"></span>
        </div>
      </a>
    </li>`;
  }

  let io;
  function observeReveal(root) {
    const els = $$('.reveal:not(.is-in)', root);
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    io = io || new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    els.forEach(el => io.observe(el));
  }

  function renderGrid() {
    current = RECIPES.filter(r => matches(r));
    gridEl.innerHTML = current.map(cardHTML).join('');
    emptyEl.hidden = current.length > 0;
    const bits = [];
    if (state.col !== 'all') bits.push(COLS.find(c => c.id === state.col).label);
    if (state.serve !== 'all') bits.push(state.serve[0].toUpperCase() + state.serve.slice(1));
    if (state.style) bits.push(state.style);
    if (state.q) bits.push(`“${esc(state.q)}”`);
    resultsEl.innerHTML = `Showing ${pad(current.length)} of ${pad(RECIPES.length)}${bits.length ? ' · ' + bits.join(' · ') : ''}`;
    observeReveal(gridEl);
  }

  function update() { renderFilters(); renderGrid(); }

  colsEl.addEventListener('click', e => {
    const b = e.target.closest('[data-col]'); if (!b) return;
    state.col = b.dataset.col; update();
  });
  serveEl.addEventListener('click', e => {
    const b = e.target.closest('[data-serve-id]'); if (!b) return;
    state.serve = b.dataset.serveId; update();
  });
  famEl.addEventListener('click', e => {
    const b = e.target.closest('[data-style]'); if (!b) return;
    state.style = state.style === b.dataset.style ? null : b.dataset.style; update();
  });
  let qT;
  searchEl.addEventListener('input', () => {
    clearTimeout(qT);
    qT = setTimeout(() => { state.q = searchEl.value.trim(); update(); }, 120);
  });
  $('[data-clear]').addEventListener('click', () => {
    Object.assign(state, { col: 'all', serve: 'all', style: null, q: '' });
    searchEl.value = ''; update();
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !detailOpen && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault(); searchEl.focus({ preventScroll: true });
      $('#index').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });

  /* =====================================================================
     Recipe detail
     ===================================================================== */
  const detailEl = $('[data-detail]');
  const sheetEl = $('[data-detail-sheet]');
  const pageEl = $('.sheet');
  let detailOpen = false;
  let pushedFromPage = false;
  let returnFocus = null;
  let servings = 1;
  let build = null; // 'hot' | 'iced' | 'base' for the open drink
  let openSlug = null;
  let closeT;

  const curBuild = r => r.builds[build] || r.builds[r.defaultBuild];
  const buildKey = r => (r.builds[build] ? build : r.defaultBuild);
  const cap = s => s[0].toUpperCase() + s.slice(1);

  function listFor(slug) {
    return current.some(r => r.slug === slug) ? current : RECIPES;
  }

  function neighbours(slug) {
    const list = listFor(slug);
    const i = list.findIndex(r => r.slug === slug);
    return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
  }

  const inRounds = new Set(ROUNDS.flatMap(r => r.items.map(i => i.slug).filter(Boolean)));
  const canTry = r => r.col === 'try' || inRounds.has(r.slug);

  function partsHTML(r) {
    return curBuild(r).parts.map(p => {
      const k = p.batch ? 1 : servings;
      const rows = p.items.map(([a, name, note]) => {
        const am = amount(a, k);
        return `<div class="ing"><span class="ing__amt ${am.sugg ? 'is-sugg' : ''}">${esc(am.text)}</span>
          <span>${esc(name)}${note ? `<span class="ing__note">${esc(note)}</span>` : ''}</span></div>`;
      }).join('');
      const batch = p.batch ? `<span class="part__batch">Batch · makes ${esc(p.batch)}</span>` : '';
      return `<div class="part"><p class="part__title"><span>${esc(p.title)}</span>${batch}</p>${rows}</div>`;
    }).join('');
  }

  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = Math.round(sec % 60);
    return m ? `${m}:${pad(s)}` : `0:${pad(s)}`;
  }

  function sourceHTML(r) {
    const s = r.source || {};
    let t = '';
    if (s.by === 'flair') {
      t = `Recipe from <a href="https://www.tiktok.com/@flairshotscafe" target="_blank" rel="noopener">@flairshotscafe</a>.`;
      if (s.url) t += ` <a href="${esc(s.url)}" target="_blank" rel="noopener">Watch the video ↗</a>`;
    } else if (s.by === 'house') {
      t = 'House recipe.';
    } else {
      t = 'Classic café spec.';
      if (s.url) t += ` <a href="${esc(s.url)}" target="_blank" rel="noopener">Reference ↗</a>`;
    }
    if (s.note) t += ` ${esc(s.note)}`;
    return t;
  }

  function detailHTML(r) {
    const { prev, next } = neighbours(r.slug);
    const b = curBuild(r);
    const bk = buildKey(r);
    const serve = r.serve.length > 1 ? 'Hot or iced' : cap(r.serve[0]);
    // with a cup size, the fact names the cup for the build on screen
    const serveFact = b.cup ? `${BUILD_LABEL[bk] || cap(r.serve[0])} · ${b.cup}` : serve;
    const buildsHTML = r.buildKeys.length > 1 ? `
          <section class="d-builds" role="group" aria-label="Hot or iced">
            ${r.buildKeys.map(k => `<button type="button" data-build="${k}" aria-pressed="${k === bk}">
              <b>${BUILD_LABEL[k] || cap(k)}</b><span>${esc(r.builds[k].cup || '')}</span></button>`).join('')}
          </section>` : '';
    const shots = { 0: 'None', 1: '1 · single', 2: '2 · double', 4: '4 · quad' }[r.shots] ?? String(r.shots);
    const needs = r.needs.length ? r.needs.join(', ') : 'Nothing extra';
    const isTried = tried.has(r.slug);
    const p = PHOTOS[r.slug];
    const credit = p && p.author
      ? `<span>Photo: <a href="${esc(p.page || '#')}" target="_blank" rel="noopener">${esc(p.author)}</a>${p.license && p.license !== 'Unsplash' ? ` (${esc(p.license)})` : ' / Unsplash'}</span>`
      : '<span></span>';
    const standIn = p && p.match === 'stand-in' ? '<span>Similar drink shown</span>' : '';
    const hasSugg = b.parts.some(pt => pt.items.some(i => String(i[0]).startsWith('~')));
    const steps = b.steps.map((s, i) => {
      const [text, secs] = Array.isArray(s) ? s : [s, 0];
      const timer = secs ? `<button type="button" class="method__timer" data-secs="${secs}" aria-label="Start ${fmtTime(secs)} timer">${fmtTime(secs)}</button>` : '';
      return `<li data-step><span class="method__n">(${pad(i + 1)})</span><span class="method__t">${esc(text)}</span>${timer}</li>`;
    }).join('');
    const tags = [
      `<span class="tag ${r.col === 'try' ? (isTried ? 'tag--tried' : 'tag--try') : ''}">${r.col === 'try' && isTried ? 'Tested' : COL_LABEL[r.col]}</span>`,
      `<span class="tag">${esc(r.style)}</span>`,
    ].join('');

    return `
      <div class="d-bar">
        <div class="d-bar__crumb"><span>(${pad(r.n)})</span><b>${COL_LABEL[r.col]}</b><span>/ ${esc(serve)} / ${esc(r.style)}</span></div>
        <div class="d-bar__nav">
          <button type="button" data-go="${prev.slug}" aria-label="Previous: ${esc(prev.name)}">← Prev</button>
          <button type="button" data-go="${next.slug}" aria-label="Next: ${esc(next.name)}">Next →</button>
        </div>
        <button type="button" data-close>Close <span class="kbd">Esc</span></button>
      </div>
      <div class="d-body">
        <aside class="d-media"><div class="d-media__inner">
          ${photoHTML(r.slug, 900, true)}
          <p class="d-credit">${credit}${standIn}</p>
        </div></aside>
        <div class="d-main">
          <section class="d-head">
            <div class="d-tags">${tags}</div>
            <h2 class="d-name" id="detail-name"><span class="paren">(${pad(r.n)})</span>${esc(r.name)}</h2>
            <p class="d-desc">${esc(r.desc)}</p>
          </section>
          <section class="d-facts" aria-label="At a glance">
            <div class="d-fact"><span>Serve</span><b>${esc(serveFact)}</b></div>
            <div class="d-fact"><span>Espresso</span><b>${shots}</b></div>
            <div class="d-fact"><span>Time</span><b>~${r.time} min</b></div>
            <div class="d-fact"><span>Needs</span><b>${esc(needs)}</b></div>
          </section>
          ${buildsHTML}
          <section aria-labelledby="ing-h">
            <div class="d-sec-head">
              <h3 id="ing-h">Ingredients</h3>
              <div class="stepper" role="group" aria-label="Number of drinks">
                <button type="button" data-serv="-1" aria-label="Fewer drinks" ${servings <= 1 ? 'disabled' : ''}>−</button>
                <output data-serv-out aria-live="polite">${servings} ${servings === 1 ? 'drink' : 'drinks'}</output>
                <button type="button" data-serv="1" aria-label="More drinks" ${servings >= 12 ? 'disabled' : ''}>+</button>
              </div>
            </div>
            <div class="parts" data-parts>${partsHTML(r)}</div>
            ${hasSugg ? '<p class="parts-foot"><b>*</b> Amount not given in the video. This is our suggested amount.</p>' : ''}
          </section>
          <section aria-labelledby="method-h">
            <div class="d-sec-head"><h3 id="method-h">Method</h3><span class="eyebrow" style="margin:0">Tap a step to tick it off</span></div>
            <ol class="method">${steps}</ol>
          </section>
          ${r.notes && r.notes.length ? `<section class="d-notes"><p class="eyebrow" style="margin:0">(Notes)</p><ul class="list-plain">${r.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></section>` : ''}
          <section class="d-source">
            <p>${sourceHTML(r)}</p>
            ${canTry(r) ? `<button type="button" class="btn-try" data-try="${r.slug}" aria-pressed="${isTried}">${isTried ? 'Tested' : 'Mark as tested'}</button>` : ''}
          </section>
          <nav class="d-next" aria-label="More drinks">
            <a href="#/${prev.slug}" data-go="${prev.slug}"><span>← Previous</span><b>${esc(prev.name)}</b></a>
            <a href="#/${next.slug}" data-go="${next.slug}"><span>Next →</span><b>${esc(next.name)}</b></a>
          </nav>
        </div>
      </div>`;
  }

  function showDetail(slug) {
    const r = BY[slug];
    if (!r) return;
    stopTimer();
    const swapping = detailOpen && openSlug !== slug;
    if (openSlug !== slug) { servings = 1; build = r.defaultBuild; }
    openSlug = slug;
    document.title = `${r.name} — ${SITE.name}`;

    const paint = () => {
      sheetEl.innerHTML = detailHTML(r);
      sheetEl.scrollTop = 0;
    };

    if (swapping && !reduceMotion) {
      detailEl.classList.add('is-swapping');
      setTimeout(() => { paint(); setTimeout(() => detailEl.classList.remove('is-swapping'), 20); }, 180);
      return;
    }
    paint();
    if (detailOpen) return;

    clearTimeout(closeT);
    returnFocus = document.activeElement;
    detailOpen = true;
    detailEl.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    pageEl.inert = true;
    void detailEl.offsetWidth; // flush styles so the slide-up starts from the closed position
    detailEl.classList.add('is-open');
    setTimeout(() => $('[data-close]', sheetEl)?.focus({ preventScroll: true }), 60);
  }

  function hideDetail() {
    if (!detailOpen) return;
    stopTimer();
    detailOpen = false;
    openSlug = null;
    document.title = `${SITE.name} — Coffee Recipes`;
    detailEl.classList.remove('is-open');
    pageEl.inert = false;
    document.documentElement.style.overflow = '';
    closeT = setTimeout(() => { detailEl.hidden = true; sheetEl.innerHTML = ''; }, reduceMotion ? 0 : 750);
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
  }

  function requestClose() {
    if (pushedFromPage) { history.back(); }
    else { history.replaceState(null, '', location.pathname + location.search); hideDetail(); }
  }

  function go(slug) {
    // move between drinks without stacking history entries
    history.replaceState(null, '', '#/' + slug);
    showDetail(slug);
  }

  const slugFromHash = () => {
    const m = location.hash.match(/^#\/([\w-]+)$/);
    if (!m) return null;
    const s = ALIASES[m[1]] || m[1];
    return BY[s] ? s : null;
  };

  window.addEventListener('hashchange', e => {
    const slug = slugFromHash();
    if (slug) {
      if (!detailOpen) pushedFromPage = !/#\/[\w-]+$/.test(new URL(e.oldURL).hash);
      showDetail(slug);
    } else {
      hideDetail();
    }
  });

  sheetEl.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('[data-close]')) { requestClose(); return; }

    const goEl = t.closest('[data-go]');
    if (goEl) { e.preventDefault(); go(goEl.dataset.go); return; }

    const bt = t.closest('[data-build]');
    if (bt) {
      if (bt.dataset.build === build) return;
      stopTimer();
      build = bt.dataset.build;
      // swap only the recipe column so the photo doesn't reload
      const tmp = document.createElement('div');
      tmp.innerHTML = detailHTML(BY[openSlug]);
      $('.d-main', sheetEl).replaceWith($('.d-main', tmp));
      $$('.ing__amt', sheetEl).forEach(el => el.classList.add('is-bump'));
      $(`[data-build="${build}"]`, sheetEl)?.focus({ preventScroll: true });
      return;
    }

    const serv = t.closest('[data-serv]');
    if (serv) {
      servings = Math.min(12, Math.max(1, servings + Number(serv.dataset.serv)));
      const r = BY[openSlug];
      $('[data-parts]', sheetEl).innerHTML = partsHTML(r);
      $$('.ing__amt', sheetEl).forEach(el => { if (/^\d/.test(el.textContent)) el.classList.add('is-bump'); });
      $('[data-serv-out]', sheetEl).textContent = `${servings} ${servings === 1 ? 'drink' : 'drinks'}`;
      $('[data-serv="-1"]', sheetEl).disabled = servings <= 1;
      $('[data-serv="1"]', sheetEl).disabled = servings >= 12;
      return;
    }

    const tb = t.closest('.method__timer');
    if (tb) { e.stopPropagation(); toggleTimer(tb); return; }

    const step = t.closest('[data-step]');
    if (step) { step.classList.toggle('is-done'); return; }

    const tryBtn = t.closest('[data-try]');
    if (tryBtn) {
      const slug = tryBtn.dataset.try;
      const on = !tried.has(slug);
      setTried(slug, on);
      tryBtn.setAttribute('aria-pressed', on);
      tryBtn.textContent = on ? 'Tested' : 'Mark as tested';
      const tag = $('.d-tags .tag', sheetEl);
      if (BY[slug].col === 'try' && tag) { tag.className = `tag ${on ? 'tag--tried' : 'tag--try'}`; tag.textContent = on ? 'Tested' : 'Must try'; }
      toast(on ? `<b>●</b> ${esc(BY[slug].name)} marked as tested` : `${esc(BY[slug].name)} unmarked`);
    }
  });

  document.addEventListener('keydown', e => {
    if (!detailOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); requestClose(); }
    else if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      const { prev, next } = neighbours(openSlug);
      go(e.key === 'ArrowRight' ? next.slug : prev.slug);
    } else if (e.key === 'Tab') {
      // keep focus inside the open recipe
      const f = $$('a[href], button:not([disabled])', sheetEl).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- step timers ---------------- */
  let timer = null; // { btn, end, secs, raf }
  let audioCtx = null;

  function beep() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.22].forEach(off => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = 'sine'; o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, audioCtx.currentTime + off);
        g.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + off + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + off + 0.18);
        o.connect(g).connect(audioCtx.destination);
        o.start(audioCtx.currentTime + off); o.stop(audioCtx.currentTime + off + 0.2);
      });
    } catch { /* audio not available */ }
    if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
  }

  function stopTimer(reset = true) {
    if (!timer) return;
    cancelAnimationFrame(timer.raf);
    if (reset && document.contains(timer.btn)) {
      timer.btn.classList.remove('is-running');
      timer.btn.textContent = fmtTime(timer.secs);
    }
    timer = null;
  }

  function toggleTimer(btn) {
    if (timer && timer.btn === btn) { stopTimer(); return; }
    stopTimer();
    try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume?.(); } catch { /* ignore */ }
    const secs = Number(btn.dataset.secs);
    btn.classList.remove('is-done');
    btn.classList.add('is-running');
    timer = { btn, secs, end: performance.now() + secs * 1000, raf: 0 };
    const tick = () => {
      const left = Math.max(0, (timer.end - performance.now()) / 1000);
      btn.textContent = fmtTime(Math.ceil(left));
      if (left <= 0) {
        btn.classList.remove('is-running'); btn.classList.add('is-done'); btn.textContent = 'Done';
        btn.closest('[data-step]')?.classList.add('is-done');
        timer = null; beep(); toast('<b>●</b> Timer done');
        return;
      }
      timer.raf = requestAnimationFrame(tick);
    };
    tick();
  }

  /* =====================================================================
     Must try: testing plan
     ===================================================================== */
  const roundsEl = $('[data-rounds]');

  function laterItems() {
    const planned = new Set(ROUNDS.flatMap(r => r.items.map(i => i.slug).filter(Boolean)));
    return RECIPES.filter(r => r.col === 'try' && !planned.has(r.slug)).map(r => ({ slug: r.slug }));
  }

  function checkHTML(it) {
    const key = it.slug || it.key;
    const r = it.slug ? BY[it.slug] : null;
    const label = r ? `<a href="#/${r.slug}">${esc(r.name)}</a>` : `<a href="${esc(it.href || '#')}">${esc(it.label)}</a>`;
    const done = tried.has(key);
    return `<li><label class="check ${done ? 'is-done' : ''}">
      <input type="checkbox" data-try-key="${esc(key)}" ${done ? 'checked' : ''}>
      <span class="check__box" aria-hidden="true"></span>
      <span class="check__text">${label}${it.note ? `<span class="check__note">${esc(it.note)}</span>` : ''}</span>
    </label></li>`;
  }

  function renderRounds() {
    const groups = [...ROUNDS, { title: 'Later', sub: 'Not in a round yet', items: laterItems(), later: true }];
    roundsEl.innerHTML = groups.map(g => {
      const keys = g.items.map(i => i.slug || i.key);
      const done = keys.filter(k => tried.has(k)).length;
      return `<div class="round ${g.later ? 'round--later' : ''}">
        <div class="round__head"><div><span class="round__title">${esc(g.title)}</span><span class="round__sub">${esc(g.sub)}</span></div>
        <span class="round__count">${pad(done)} / ${pad(keys.length)}</span></div>
        <ul class="round__list">${g.items.map(checkHTML).join('')}</ul>
      </div>`;
    }).join('');
    renderProgress(groups);
  }

  function renderProgress(groups) {
    const keys = [...new Set(groups.flatMap(g => g.items.map(i => i.slug || i.key)))];
    const done = keys.filter(k => tried.has(k)).length;
    $('[data-progress-text]').textContent = `${done} of ${keys.length} tested`;
    $('[data-progress-bar]').style.width = `${keys.length ? (done / keys.length) * 100 : 0}%`;
    $('[data-try-count]').textContent = `(${pad(RECIPES.filter(r => r.col === 'try').length)})`;
  }

  roundsEl.addEventListener('change', e => {
    const cb = e.target.closest('[data-try-key]'); if (!cb) return;
    setTried(cb.dataset.tryKey, cb.checked);
  });

  function setTried(key, on) {
    if (on) tried.add(key); else tried.delete(key);
    store.set('kape.tried', [...tried]);
    renderRounds();
    // refresh card flags without re-rendering the grid (keeps images loaded)
    const card = $(`.card__link[data-slug="${CSS.escape(key)}"] .card__flag--try`);
    if (card) { card.classList.toggle('card__flag--tried', on); card.textContent = on ? 'Tested' : 'Must try'; }
  }

  /* =====================================================================
     Basics: syrups + shot timer
     ===================================================================== */
  const syrupsEl = $('[data-syrups]');
  const batchN = {}; // chosen batch size per scalable syrup

  const usedHTML = s => `<p class="syrup__used">Used in ${s.used.filter(u => BY[u]).map(u => `<a href="#/${u}">${esc(BY[u].name)}</a>`).join(', ')}</p>`;

  function batchHTML(s) {
    const n = batchN[s.id] ?? s.batch;
    const total = s.perDrink.reduce((t, [q, unit]) => t + (unit === 'g' ? q * n : 0), 0);
    const rows = s.perDrink.map(([q, unit, name]) =>
      `<div class="ing"><span class="ing__amt">${fmtNum(q * n, unit)} ${unit}</span><span>${esc(name)}</span></div>`).join('');
    return `
      <div class="syrup__head"><span class="syrup__name">${esc(s.name)}</span><span class="syrup__yield">Makes about ${fmtNum(total, 'g')} g</span></div>
      <div class="syrup__batch" role="group" aria-label="Batch size">
        ${s.batches.map(b => `<button type="button" class="chip" data-batch="${esc(s.id)}" data-n="${b}" aria-pressed="${b === n}">${b} ${esc(s.unit)}</button>`).join('')}
      </div>
      <div class="syrup__cols">
        <div class="syrup__ings">${rows}</div>
        <div class="syrup__text">
          <p class="syrup__method">${esc(s.method)}</p>
          ${s.notes ? `<ul class="list-plain syrup__notes">${s.notes.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
          ${usedHTML(s)}
        </div>
      </div>`;
  }

  function syrupBody(s) {
    if (s.perDrink) return batchHTML(s);
    return `
        <div class="syrup__head"><span class="syrup__name">${esc(s.name)}</span><span class="syrup__yield">${esc(s.yield)}</span></div>
        <p class="syrup__items">${s.items.map(esc).join(' · ')}</p>
        <p class="syrup__method">${esc(s.method)}</p>
        ${usedHTML(s)}`;
  }

  function renderSyrups() {
    syrupsEl.innerHTML = SYRUPS.map(s => `
      <li class="syrup ${s.feature ? 'syrup--feature' : ''}" ${s.id ? `id="${esc(s.id)}"` : ''}>
        ${s.feature ? '<p class="eyebrow syrup__eyebrow"><span class="dot" aria-hidden="true"></span> (Prep before opening)</p>' : ''}
        ${syrupBody(s)}
      </li>`).join('');
  }

  syrupsEl.addEventListener('click', e => {
    const b = e.target.closest('[data-batch]'); if (!b) return;
    const s = SYRUPS.find(x => x.id === b.dataset.batch);
    batchN[s.id] = Number(b.dataset.n);
    const li = b.closest('.syrup');
    li.innerHTML = (s.feature ? '<p class="eyebrow syrup__eyebrow"><span class="dot" aria-hidden="true"></span> (Prep before opening)</p>' : '') + syrupBody(s);
    $$('.ing__amt', li).forEach(el => el.classList.add('is-bump'));
    $(`[data-batch][data-n="${batchN[s.id]}"]`, li)?.focus({ preventScroll: true });
  });

  /* ---------------- menu board ---------------- */
  function renderMenu() {
    const el = $('[data-menu]');
    if (!el) return;
    const menu = RECIPES.filter(r => r.col === 'menu');
    el.innerHTML = menu.map((r, i) => {
      const ways = r.buildKeys.filter(k => BUILD_LABEL[k]).map(k => BUILD_LABEL[k]).join(' / ');
      return `<li class="menu__row reveal" style="--d:${i * 50}ms">
        <a href="#/${r.slug}" class="menu__link">
          <span class="menu__num">(${pad(i + 1)})</span>
          <span class="menu__thumb">${photoHTML(r.slug, 160)}</span>
          <span class="menu__name">${esc(r.name)}</span>
          <span class="menu__ways">${ways}</span>
          <span class="dot" aria-hidden="true"></span>
        </a>
      </li>`;
    }).join('');
    $$('[data-menu-count]').forEach(c => { c.textContent = `(${pad(menu.length)})`; });
  }

  function setupShot() {
    const dose = $('[data-dose]'), ratio = $('[data-ratio]');
    const doseOut = $('[data-dose-out]'), ratioOut = $('[data-ratio-out]');
    const yieldEls = [$('[data-yield]'), $('[data-yield-inline]')];
    const calc = () => {
      const d = parseFloat(dose.value), q = parseFloat(ratio.value);
      doseOut.textContent = `${d} g`;
      ratioOut.textContent = `1 : ${q.toFixed(1)}`;
      const y = Math.round(d * q);
      yieldEls.forEach(el => { if (el) el.textContent = `${y} g`; });
    };
    dose.addEventListener('input', calc);
    ratio.addEventListener('input', calc);
    calc();

    const read = $('[data-timer-read]'), fill = $('[data-timer-fill]');
    const toggle = $('[data-timer-toggle]'), reset = $('[data-timer-reset]'), verdict = $('[data-timer-verdict]');
    let t0 = 0, raf = 0, running = false, elapsed = 0;

    const paint = t => {
      read.textContent = t.toFixed(1);
      fill.style.width = `${Math.min(t / 40, 1) * 100}%`;
    };
    const loop = () => { elapsed = (performance.now() - t0) / 1000; paint(elapsed); raf = requestAnimationFrame(loop); };
    const judge = t => {
      if (t < 20) return '<strong>Way too fast.</strong> Grind a lot finer.';
      if (t < 25) return '<strong>A little fast.</strong> If it tastes sour or thin, grind finer.';
      if (t <= 30) return '<strong>In range.</strong> Now taste it.';
      if (t <= 35) return '<strong>A little slow.</strong> If it tastes bitter or harsh, grind coarser.';
      return '<strong>Way too slow.</strong> Grind a lot coarser.';
    };

    toggle.addEventListener('click', () => {
      if (!running) {
        running = true; t0 = performance.now() - elapsed * 1000; loop();
        toggle.textContent = 'Stop';
        verdict.innerHTML = `Stop when the scale reads <span>${yieldEls[0].textContent}</span>.`;
      } else {
        running = false; cancelAnimationFrame(raf);
        toggle.textContent = 'Resume';
        verdict.innerHTML = `${elapsed.toFixed(1)} s. ${judge(elapsed)}`;
      }
    });
    reset.addEventListener('click', () => {
      running = false; cancelAnimationFrame(raf); elapsed = 0; paint(0);
      toggle.textContent = 'Start';
      verdict.innerHTML = `Start the timer when you start the shot. Stop it when the scale reads <span data-yield-inline>${yieldEls[0].textContent}</span>.`;
      yieldEls[1] = $('[data-yield-inline]');
    });
  }

  /* ---------------- photo credits ---------------- */
  function renderCredits() {
    const el = $('[data-photo-credits]');
    const seen = new Map();
    RECIPES.forEach(r => {
      const p = PHOTOS[r.slug];
      if (p && p.author && !seen.has(p.author)) seen.set(p.author, p);
    });
    if (!seen.size) return;
    const list = [...seen.values()].map(p => `<a href="${esc(p.page || '#')}" target="_blank" rel="noopener">${esc(p.author)}</a>`).join(', ');
    const unsplash = [...seen.values()].some(p => (p.license || 'Unsplash') === 'Unsplash');
    const other = [...seen.values()].some(p => p.license && p.license !== 'Unsplash');
    el.innerHTML = `Photos by ${list}${unsplash ? ', on <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>' : ''}${other ? ' and Wikimedia Commons' : ''}. Some drinks show a similar drink where no photo of the exact recipe exists. In the grid every photo gets the same coffee duotone; hover a drink to see it in colour.`;
  }

  /* ---------------- boot ---------------- */
  setupChrome();
  renderMenu();
  update();
  renderRounds();
  renderSyrups();
  setupShot();
  renderCredits();
  observeReveal(document);

  const initial = slugFromHash();
  if (initial) { pushedFromPage = false; showDetail(initial); }

  // plain anchors (#menu, #batch-sea-salt-foam): land on them again once the wordmark has resized
  const anchor = !initial && /^#[\w-]+$/.test(location.hash) && document.getElementById(location.hash.slice(1));
  if (anchor) {
    (document.fonts ? document.fonts.ready : Promise.resolve())
      .then(() => setTimeout(() => anchor.scrollIntoView({ behavior: 'auto' }), 50));
  }
})();
