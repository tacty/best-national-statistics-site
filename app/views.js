// views.js — one function per page. Each returns an HTML string; main.js
// puts it on screen and wires up the page's controls.

import {
  HEADLINES, CENSUS_SERIES, POPULATION_FACTS, PREFECTURES, PREFECTURE_NOTE,
  CITIES, UNEMPLOYMENT, LABOUR_FACTS, CPI_SERIES, PRICE_FACTS,
  HEALTH_FACTS, ECONOMY_FACTS, SOURCES, META,
} from './data.js';
import { barChart, hbarChart, lineChart } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function factGrid(facts) {
  return `<div class="facts">${facts
    .map((f) => `<div class="fact"><div class="fact-label">${esc(f.label)}</div><div class="fact-value">${esc(f.value)}</div><div class="fact-note">${esc(f.note)}</div></div>`)
    .join('')}</div>`;
}

function sectionHead(kicker, title, intro) {
  return `<p class="kicker">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p>`;
}

// ---- Overview -------------------------------------------------------------
export function overview() {
  const cards = HEADLINES.map(
    (h) =>
      `<a class="card" href="#/${h.id === 'population' ? 'population' : h.id === 'gdp' ? 'economy' : h.id === 'unemployment' ? 'labour' : h.id === 'cpi' ? 'prices' : h.id === 'births' || h.id === 'life' ? 'health' : 'population'}">
        <span class="card-label">${esc(h.label)}</span>
        <span class="card-value">${esc(h.value)}</span>
        <span class="card-detail">${esc(h.detail)}</span>
        <span class="card-change">${esc(h.change)}</span>
      </a>`,
  ).join('');
  return `
  ${sectionHead('Japan · ' + META.updated, 'Japan by the Numbers', 'The country in six headline figures — population, economy, work, prices, births and how long people live. Every number names its source and year.')}
  <div class="cards">${cards}</div>
  <div class="panel">
    <h2>Population: the long decline</h2>
    <p>Japan counted fewer people in every census since 2010. The 2025 Census found 122.97 million people — 3.17 million fewer than in 2020, the largest five-year fall since the census began in 1920.</p>
    ${barChart(CENSUS_SERIES.map((c) => ({ label: String(c.year), value: c.pop })), { unit: 'm' })}
    ${sourceLine('Statistics Bureau of Japan, Population Census 2010, 2020 and 2025 (final tabulation).')}
  </div>
  <div class="panel">
    <h2>What changed lately</h2>
    <ul class="updates">
      <li><strong>Sep 2026</strong> — Unemployment fell to 2.4%, the lowest in over a year; 68.68 million people were in work.</li>
      <li><strong>Oct 2026</strong> — Consumer prices rose 2.3% on a year earlier, up from 2.1% in September.</li>
      <li><strong>Sep 2026</strong> — Final 2025 Census: 122,972,528 people; only Tokyo grew among the 47 prefectures.</li>
      <li><strong>2024</strong> — Births fell below 700,000 for the first time, to 686,061; the fertility rate hit a record low of 1.15.</li>
    </ul>
  </div>
  <div class="panel">
    <h2>Explore the sections</h2>
    <p class="linkrow">
      <a href="#/population">Population</a><a href="#/economy">Economy</a><a href="#/prefectures">Prefectures</a>
      <a href="#/labour">Labour</a><a href="#/prices">Prices</a><a href="#/health">Health &amp; births</a><a href="#/sources">Sources</a>
    </p>
    <p>Figures are updated as the Statistics Bureau, the Cabinet Office and the Ministry of Health, Labour and Welfare publish them. Nothing on this site is fetched from the network — every figure is in its own files.</p>
  </div>`;
}

// ---- Population -----------------------------------------------------------
export function population() {
  return `
  ${sectionHead('People', 'Population', 'Japan is shrinking, and shrinking faster: the 2025 Census recorded the largest five-year fall in a century of censuses.')}
  ${factGrid(POPULATION_FACTS)}
  <div class="panel">
    <h2>Census totals</h2>
    ${barChart(CENSUS_SERIES.map((c) => ({ label: String(c.year), value: c.pop })), { unit: 'm' })}
    <ul class="notes">
      ${CENSUS_SERIES.map((c) => `<li><strong>${c.year} — ${c.pop} million.</strong> ${esc(c.note)}</li>`).join('')}
    </ul>
    ${sourceLine('Statistics Bureau of Japan, Population Census 2010, 2020 and 2025 (final tabulation, Sep 2026).')}
  </div>
  <div class="panel">
    <h2>Births and deaths</h2>
    <p>In 2024, 686,061 babies were born and 1,605,298 people died — a natural decrease of 919,237 people, before migration. Births have fallen for nine straight years.</p>
    ${factGrid([
      { label: 'Births, 2024', value: '686,061', note: 'Down 41,227 on 2023' },
      { label: 'Deaths, 2024', value: '1,605,298', note: 'Post-war high, up 29,282' },
      { label: 'Fertility rate, 2024', value: '1.15', note: 'Record low; below 2.1 since 1974' },
    ])}
    ${sourceLine('Ministry of Health, Labour and Welfare, Vital Statistics 2024.')}
  </div>`;
}

// ---- Economy --------------------------------------------------------------
export function economy() {
  return `
  ${sectionHead('Money', 'Economy', 'The world’s fourth-largest economy: nominal GDP passed ¥600 trillion in 2024, helped by inflation, while real growth stayed slow.')}
  ${factGrid(ECONOMY_FACTS)}
  <div class="panel">
    <h2>Reading the GDP figures</h2>
    <p><strong>Nominal GDP</strong> is the value of everything produced, at current prices: ¥609.3 trillion in calendar 2024, up 2.9% on the year. The fiscal-year figure (April 2024 – March 2025) is higher, ¥642.4 trillion, because prices kept rising into 2025.</p>
    <p><strong>Real GDP</strong> strips out price rises. It grew 0.8% in fiscal 2024 — the fourth straight year of real growth, but a slow one. In dollars, Japan’s economy was about $4.19 trillion in 2024, behind the United States, China and Germany.</p>
    <p>Japan’s share of world GDP has fallen from 10.2% in 2005 to 3.8% in 2024 — mostly because the yen weakened and other economies grew faster, not because Japan produced less.</p>
    ${sourceLine('Cabinet Office, National Accounts of Japan (preliminary GDP 2024; FY2024 annual estimates) and International Comparison of GDP (Dec 2025); IMF World Economic Outlook (Apr 2026).')}
  </div>
  <div class="panel">
    <h2>Why it matters</h2>
    <p>A shrinking population with a growing economy means output per person keeps rising even as the total stalls — the question for the next decade is whether productivity can outrun the fall in workers.</p>
  </div>`;
}

// ---- Prefectures ----------------------------------------------------------
export function prefectures() {
  const options = PREFECTURES.map((p) => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('');
  return `
  ${sectionHead('Places', 'Prefectures', '47 prefectures, one story in 2025: only Tokyo grew. Search the table, sort any column, or compare two prefectures head to head.')}
  <div class="panel">
    <h2>The seven largest prefectures</h2>
    <div class="controls">
      <label>Search <input id="pref-search" type="search" placeholder="Type a prefecture name…" autocomplete="off"></label>
      <span class="hint">Tap a column heading to sort. Tap again to reverse.</span>
    </div>
    <div class="tablewrap"><table id="pref-table">
      <thead><tr>
        <th data-key="name" aria-sort="none">Prefecture</th>
        <th data-key="capital" aria-sort="none">Capital</th>
        <th data-key="pop" aria-sort="none">Population, 2025</th>
        <th data-key="change" aria-sort="none">Change 2020–25</th>
        <th data-key="density" aria-sort="none">People / km²</th>
      </tr></thead>
      <tbody></tbody>
    </table></div>
    <p id="pref-count" class="count" aria-live="polite"></p>
    <p class="fine">${esc(PREFECTURE_NOTE)}</p>
    ${sourceLine('Statistics Bureau of Japan, 2025 Population Census (final tabulation).')}
  </div>
  <div class="panel">
    <h2>How the big seven compare</h2>
    <div class="controls" role="group" aria-label="Chart measure">
      <button class="seg on" data-metric="pop" type="button">Population</button>
      <button class="seg" data-metric="change" type="button">Change since 2020 (%)</button>
    </div>
    <div id="pref-chart">${hbarChart(PREFECTURES.map((p) => ({ label: p.name, value: p.pop })))}</div>
    <p class="fine">Tokyo alone holds 14.24 million people — 11.6% of the whole country.</p>
  </div>
  <div class="panel">
    <h2>Compare two prefectures</h2>
    <div class="controls">
      <label>First <select id="cmp-a">${options}</select></label>
      <label>Second <select id="cmp-b">${options}</select></label>
    </div>
    <div id="cmp-out" aria-live="polite"></div>
  </div>
  <div class="panel">
    <h2>Largest cities</h2>
    <ol class="ranked">
      ${CITIES.map((c) => `<li><strong>${esc(c.name)}</strong> — ${c.pop.toLocaleString('en-US')} people (${esc(c.prefecture)})</li>`).join('')}
    </ol>
    <p class="fine">Tokyo’s 23 special wards count as one built-up area of 9.94 million; Yokohama, at 3.75 million, is Japan’s largest single municipality.</p>
    ${sourceLine('Statistics Bureau of Japan, 2025 Population Census (final tabulation).')}
  </div>`;
}

// ---- Labour ---------------------------------------------------------------
export function labour() {
  return `
  ${sectionHead('Work', 'Labour', 'Unemployment has sat near 2.5% for a year: jobs are plentiful, workers are scarce, and employment keeps setting records.')}
  ${factGrid(LABOUR_FACTS)}
  <div class="panel">
    <h2>Unemployment rate, month by month</h2>
    <div class="controls" role="group" aria-label="Chart measure">
      <button class="seg on" data-metric="rate" type="button">Unemployment rate (%)</button>
      <button class="seg" data-metric="unemployed" type="button">Unemployed (millions)</button>
    </div>
    <div id="labour-chart">${lineChart(UNEMPLOYMENT.map((u) => ({ label: u.month, value: u.rate })), { unit: '%' })}</div>
    <p class="fine">The survey covers about 40,000 households each month. There is a gap in the chart: monthly releases for January–July 2026 are not shown here, so the line jumps from December 2025 to August 2026. The “unemployed” view only has the months the Bureau published a count for.</p>
    ${sourceLine('Statistics Bureau of Japan, Labour Force Survey, Jul 2025 – Sep 2026 (seasonally adjusted).')}
  </div>
  <div class="panel">
    <h2>What the numbers mean</h2>
    <p><strong>2.4% unemployed</strong> is low by any standard. <strong>1.19 jobs per applicant</strong> means employers are chasing workers, not the other way round. And with 68.68 million people in work, employment is at a record high even as the population falls, because more women and older people are working than ever before.</p>
  </div>`;
}

// ---- Prices ---------------------------------------------------------------
export function prices() {
  return `
  ${sectionHead('Prices', 'Prices &amp; inflation', 'Inflation cooled from 3.0% in late 2025 to just above 2% a year later — but food prices were still rising 6.4% in October 2025.')}
  ${factGrid(PRICE_FACTS)}
  <div class="panel">
    <h2>Consumer prices, year on year</h2>
    ${barChart(CPI_SERIES.map((c) => ({ label: c.month, value: c.headline })), { unit: '%' })}
    <p class="fine">Headline CPI, all items. The Bank of Japan watches the “core” index (all items less fresh food): it was 3.0% in October 2025 and 2.2% in October 2026.</p>
    ${sourceLine('Statistics Bureau of Japan, Consumer Price Index, Sep 2025 – Oct 2026.')}
  </div>
  <div class="panel">
    <h2>The monthly table — tap a heading to sort</h2>
    <div class="tablewrap"><table id="cpi-table">
      <thead><tr>
        <th data-key="month" aria-sort="none">Month</th>
        <th data-key="headline" aria-sort="none">Headline CPI (%)</th>
        <th data-key="core" aria-sort="none">Core CPI (%)</th>
      </tr></thead>
      <tbody>
        ${CPI_SERIES.map((c) => `<tr><td>${esc(c.month)}</td><td>${c.headline.toFixed(1)}</td><td>${c.core === null ? '—' : c.core.toFixed(1)}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="fine">“—” means the core figure was not carried in the release this site checked. Sort treats it as missing, not zero.</p>
  </div>`;
}

// ---- Health ---------------------------------------------------------------
export function health() {
  return `
  ${sectionHead('Lives', 'Health &amp; births', 'People in Japan live longer than almost anywhere else — 84 years at birth — while fewer babies are born each year.')}
  ${factGrid(HEALTH_FACTS)}
  <div class="panel">
    <h2>Long lives, few births</h2>
    <p>Life expectancy of 84.0 years (World Bank, 2024) sits near the top of the world table, and infant mortality is 1.8 deaths per 1,000 live births — among the lowest anywhere. The other side of the same coin is the birth rate: 686,061 births in 2024, the ninth straight record low, and a fertility rate of 1.15 children per woman, far below the 2.1 needed to replace the population.</p>
    <p>Put together, that is why the population falls by roughly 900,000 people a year before migration: deaths outnumber births by a wide margin, and the gap is widening.</p>
    ${sourceLine('Ministry of Health, Labour and Welfare, Vital Statistics 2024; World Bank, World Development Indicators 2024.')}
  </div>`;
}

// ---- Sources --------------------------------------------------------------
export function sources() {
  return `
  ${sectionHead('About', 'Sources &amp; methods', 'Where every number comes from, how to check it, and how to take the data with you.')}
  <div class="panel">
    <h2>How this site is built</h2>
    <p>Every figure on this site is stored in the site’s own files — nothing is fetched from the network, so the pages work offline and load fast. Figures are taken from the publishing body’s release (census, survey or accounts) and the source and year are printed next to the number. Where a preliminary release was later revised, the final figure is used.</p>
    <p>Figures were last checked in November 2026. The next census is in 2030; the Labour Force Survey and the CPI are monthly, so those pages will move first.</p>
  </div>
  <div class="panel">
    <h2>Download the data</h2>
    <p>Take the prefecture table with you as a CSV file — it is generated on your device from the same numbers the table shows.</p>
    <button id="csv-btn" type="button">Download prefectures as CSV</button>
    <p id="csv-msg" class="count" aria-live="polite"></p>
  </div>
  <div class="panel">
    <h2>Source list — search it</h2>
    <div class="controls">
      <label>Search sources <input id="src-search" type="search" placeholder="Try “census” or “Cabinet Office”…" autocomplete="off"></label>
    </div>
    <ul id="src-list" class="srclist">
      ${SOURCES.map((s) => `<li><strong>${esc(s.body)}</strong> — ${esc(s.what)} <span class="fine">(${esc(s.url)})</span></li>`).join('')}
    </ul>
    <p id="src-count" class="count" aria-live="polite"></p>
  </div>
  <div class="panel">
    <h2>About this site</h2>
    <p>“Japan by the Numbers” is an independent guide to Japan’s official statistics. It is not affiliated with the Statistics Bureau of Japan, the Cabinet Office, or any government body, and it reproduces no other site’s text, brand or images. All charts are drawn by the site itself.</p>
  </div>`;
}

export function notFound(route) {
  return `
  ${sectionHead('Lost', 'No such page', 'There is no statistics page at “' + esc(route) + '”. Try one of the sections below.')}
  <div class="panel"><p class="linkrow">
    <a href="#/">Overview</a><a href="#/population">Population</a><a href="#/economy">Economy</a>
    <a href="#/prefectures">Prefectures</a><a href="#/labour">Labour</a><a href="#/prices">Prices</a>
    <a href="#/health">Health &amp; births</a><a href="#/sources">Sources</a>
  </p></div>`;
}
