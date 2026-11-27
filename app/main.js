// main.js — the router and every control on the site.
//
// Routes (hash, so the site works from plain files):
//   #/                overview        #/labour      labour market
//   #/population      population      #/prices      prices & inflation
//   #/economy         economy         #/health      health & births
//   #/prefectures     prefectures     #/sources     sources & methods
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PREFECTURES, UNEMPLOYMENT, CPI_SERIES, SOURCES } from './data.js';
import { hbarChart, lineChart } from './charts.js';
import { overview, population, economy, prefectures, labour, prices, health, sources, notFound } from './views.js';

const app = document.getElementById('app');

const ROUTES = {
  '': overview,
  population,
  economy,
  prefectures,
  labour,
  prices,
  health,
  sources,
};

function currentRoute() {
  const m = location.hash.match(/^#\/([a-z-]*)/);
  return m ? m[1] : '';
}

function render() {
  window.__shotReady = false;
  const route = currentRoute();
  const view = ROUTES[route] || null;
  if (view) {
    app.innerHTML = view();
    document.title = document.querySelector('h1')
      ? `${document.querySelector('h1').textContent} | Japan by the Numbers`
      : 'Japan by the Numbers';
  } else {
    app.innerHTML = notFound(route);
    document.title = 'No such page | Japan by the Numbers';
  }
  document.querySelectorAll('#topnav a').forEach((a) => {
    a.classList.toggle('on', a.dataset.route === route);
  });
  wirePage(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// ---- shared table sorting -------------------------------------------------
function makeSortable(table, getRows, renderRow) {
  let sortKey = null;
  let dir = 1;
  const body = table.querySelector('tbody');
  function draw() {
    let list = getRows().slice();
    if (sortKey) {
      list.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av === null || av === undefined) return 1;
        if (bv === null || bv === undefined) return -1;
        return (av < bv ? -1 : av > bv ? 1 : 0) * dir;
      });
    }
    body.innerHTML = list.map(renderRow).join('');
    table.querySelectorAll('th').forEach((th) => {
      th.setAttribute('aria-sort', th.dataset.key === sortKey ? (dir === 1 ? 'ascending' : 'descending') : 'none');
    });
  }
  table.querySelectorAll('th').forEach((th) => {
    th.addEventListener('click', () => {
      if (sortKey === th.dataset.key) dir = -dir;
      else {
        sortKey = th.dataset.key;
        dir = 1;
      }
      draw();
    });
  });
  return draw;
}

// ---- per-page controls ----------------------------------------------------
function wirePage(route) {
  if (route === 'prefectures') wirePrefectures();
  if (route === 'labour') wireLabour();
  if (route === 'prices') wirePrices();
  if (route === 'sources') wireSources();
}

function wirePrefectures() {
  const table = document.getElementById('pref-table');
  const search = document.getElementById('pref-search');
  const count = document.getElementById('pref-count');
  const fmt = (n) => n.toLocaleString('en-US');
  const row = (p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td><td>${fmt(p.pop)}</td><td>${p.change > 0 ? '+' : ''}${p.change.toFixed(2)}%</td><td>${fmt(p.density)}</td></tr>`;
  function visibleRows() {
    const q = search.value.trim().toLowerCase();
    return PREFECTURES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  }
  const draw = makeSortable(table, visibleRows, row);
  function applyFilter() {
    draw();
    const shown = visibleRows().length;
    count.textContent = shown === PREFECTURES.length
      ? `${PREFECTURES.length} prefectures shown.`
      : `${shown} of ${PREFECTURES.length} prefectures match “${search.value.trim()}”.`;
  }
  search.addEventListener('input', applyFilter);
  applyFilter();

  // Chart measure switch.
  const chartBox = document.getElementById('pref-chart');
  document.querySelectorAll('#app .panel [data-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#app .panel [data-metric]').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      if (btn.dataset.metric === 'change') {
        chartBox.innerHTML = hbarChart(
          PREFECTURES.map((p) => ({ label: p.name, value: Math.abs(p.change) })),
          { unit: '%' },
        );
        chartBox.insertAdjacentHTML(
          'beforeend',
          '<p class="fine">Bars show the size of the 2020–25 change. Only Tokyo rose (+1.35%); every other bar is a fall.</p>',
        );
      } else {
        chartBox.innerHTML = hbarChart(PREFECTURES.map((p) => ({ label: p.name, value: p.pop })));
      }
    });
  });

  // Head-to-head comparison.
  const aSel = document.getElementById('cmp-a');
  const bSel = document.getElementById('cmp-b');
  const out = document.getElementById('cmp-out');
  bSel.value = 'Osaka';
  function compare() {
    const a = PREFECTURES.find((p) => p.name === aSel.value);
    const b = PREFECTURES.find((p) => p.name === bSel.value);
    if (!a || !b) return;
    const bigger = a.pop >= b.pop ? a : b;
    const ratio = (Math.max(a.pop, b.pop) / Math.min(a.pop, b.pop)).toFixed(1);
    out.innerHTML = `<div class="compare">
      <p><strong>${a.name}</strong> has ${a.pop.toLocaleString('en-US')} people and <strong>${b.name}</strong> has ${b.pop.toLocaleString('en-US')}.</p>
      <p>${bigger.name} is larger by ${Math.abs(a.pop - b.pop).toLocaleString('en-US')} people — about ${ratio}× the size of ${bigger === a ? b.name : a.name}.</p>
      <p>${a.name} ${a.change >= 0 ? 'grew' : 'shrank'} ${a.change > 0 ? '+' : ''}${a.change.toFixed(2)}% since 2020; ${b.name} ${b.change >= 0 ? 'grew' : 'shrank'} ${b.change > 0 ? '+' : ''}${b.change.toFixed(2)}%.</p>
    </div>`;
  }
  aSel.addEventListener('change', compare);
  bSel.addEventListener('change', compare);
  compare();
}

function wireLabour() {
  const chartBox = document.getElementById('labour-chart');
  document.querySelectorAll('#app [data-metric]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#app [data-metric]').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      if (btn.dataset.metric === 'unemployed') {
        const rows = UNEMPLOYMENT.filter((u) => u.unemployed !== null)
          .map((u) => ({ label: u.month, value: u.unemployed }));
        chartBox.innerHTML = lineChart(rows, { unit: 'm', color: '#1f3a5f' });
      } else {
        chartBox.innerHTML = lineChart(
          UNEMPLOYMENT.map((u) => ({ label: u.month, value: u.rate })),
          { unit: '%' },
        );
      }
    });
  });
}

function wirePrices() {
  const table = document.getElementById('cpi-table');
  const rows = CPI_SERIES.map((c) => ({ ...c, core: c.core }));
  const draw = makeSortable(
    table,
    () => rows,
    (c) => `<tr><td>${c.month}</td><td>${c.headline.toFixed(1)}</td><td>${c.core === null ? '—' : c.core.toFixed(1)}</td></tr>`,
  );
  draw();
}

function wireSources() {
  const input = document.getElementById('src-search');
  const list = document.getElementById('src-list');
  const count = document.getElementById('src-count');
  function apply() {
    const q = input.value.trim().toLowerCase();
    const shown = SOURCES.filter((s) => !q || `${s.body} ${s.what}`.toLowerCase().includes(q));
    list.innerHTML = shown
      .map((s) => `<li><strong>${s.body}</strong> — ${s.what} <span class="fine">(${s.url})</span></li>`)
      .join('') || '<li>No sources match that search.</li>';
    count.textContent = `${shown.length} of ${SOURCES.length} sources shown.`;
  }
  input.addEventListener('input', apply);
  apply();

  const btn = document.getElementById('csv-btn');
  const msg = document.getElementById('csv-msg');
  btn.addEventListener('click', () => {
    const lines = ['Prefecture,Capital,Population 2025,Change 2020-25 (%),Density per km2'];
    PREFECTURES.forEach((p) => lines.push(`${p.name},${p.capital},${p.pop},${p.change},${p.density}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'japan-prefectures-2025-census.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    msg.textContent = `Downloaded ${PREFECTURES.length} prefecture rows as CSV. Source: Statistics Bureau of Japan, 2025 Population Census.`;
  });
}

// ---- theme toggle ---------------------------------------------------------
const themeBtn = document.getElementById('theme-btn');
function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  themeBtn.textContent = dark ? '☀ Light' : '◐ Dark';
  try {
    localStorage.setItem('jbn-theme', dark ? 'dark' : 'light');
  } catch {
    /* storage unavailable — the toggle still works for this visit */
  }
}
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('jbn-theme');
} catch {
  /* ignore */
}
applyTheme(savedTheme === 'dark');
themeBtn.addEventListener('click', () => {
  applyTheme(!document.documentElement.classList.contains('dark'));
});

window.addEventListener('hashchange', render);
render();
