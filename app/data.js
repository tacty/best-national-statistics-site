// Japan by the Numbers — the figures behind the site.
//
// Every number below was checked against the publishing body named in
// `source` before it was typed in. Years are the reference year of the
// figure, not the year this file was written. Where two releases disagree
// (preliminary vs final census counts) the final tabulation is used and
// the note says so.

export const META = {
  country: 'Japan',
  updated: 'November 2026',
  note: 'All figures are official statistics. Each card and table names its source and year.',
};

// Headline indicators shown on the overview page.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Total population',
    value: '122.97m',
    detail: '1 Oct 2025, final 2025 Census',
    change: '−2.5% vs the 2020 Census',
    source: 'Statistics Bureau of Japan, 2025 Population Census (final tabulation, Sep 2026)',
  },
  {
    id: 'gdp',
    label: 'Nominal GDP',
    value: '¥609.3tn',
    detail: 'Calendar year 2024',
    change: '+2.9% on the year, 4th year of growth',
    source: 'Cabinet Office, National Accounts (preliminary GDP, 2024)',
  },
  {
    id: 'unemployment',
    label: 'Unemployment rate',
    value: '2.4%',
    detail: 'September 2026, seasonally adjusted',
    change: 'Down 0.2 points on a year earlier',
    source: 'Statistics Bureau of Japan, Labour Force Survey, Sep 2026',
  },
  {
    id: 'cpi',
    label: 'Consumer prices (CPI)',
    value: '+2.3%',
    detail: 'October 2026, year on year',
    change: 'Core (excl. fresh food) +2.2%',
    source: 'Statistics Bureau of Japan, Consumer Price Index, Oct 2026',
  },
  {
    id: 'births',
    label: 'Births in 2024',
    value: '686,061',
    detail: 'Fewest on record; first year below 700,000',
    change: 'Total fertility rate 1.15',
    source: 'Ministry of Health, Labour and Welfare, Vital Statistics 2024',
  },
  {
    id: 'life',
    label: 'Life expectancy',
    value: '84.0 years',
    detail: 'At birth, 2024',
    change: 'Among the longest in the world',
    source: 'World Bank, World Development Indicators 2024',
  },
];

// Census population totals (millions) — the long decline, in three counts.
export const CENSUS_SERIES = [
  { year: 2010, pop: 128.06, note: 'Peak: the largest census count ever recorded' },
  { year: 2020, pop: 126.15, note: 'Down 0.8% on 2015' },
  { year: 2025, pop: 122.97, note: 'Down 2.5% on 2020 — the largest five-year fall since 1920' },
];

export const POPULATION_FACTS = [
  { label: 'Japanese nationals', value: '119.13m', note: 'Down 3.5% on 2020' },
  { label: 'Foreign residents', value: '3.84m', note: 'Record high, up 39.8% on 2020' },
  { label: 'Households', value: '57.13m', note: 'Up 2.3% on 2020 — households grow as population shrinks' },
  { label: 'Children under 15', value: '13.29m', note: 'Estimate for 1 April 2026, down 370,000 on the year' },
  { label: 'Only prefecture that grew, 2020–2025', value: 'Tokyo', note: 'Every other prefecture lost population' },
];

// Largest prefectures, 2025 Census final tabulation (1 Oct 2025).
// Density uses the census area; change is on the 2020 Census.
export const PREFECTURES = [
  { name: 'Tokyo', pop: 14236627, change: 1.35, density: 6471, capital: 'Shinjuku' },
  { name: 'Kanagawa', pop: 9193922, change: -0.47, density: 3805, capital: 'Yokohama' },
  { name: 'Osaka', pop: 8759312, change: -0.89, density: 4597, capital: 'Osaka' },
  { name: 'Aichi', pop: 7448043, change: -1.25, density: 1440, capital: 'Nagoya' },
  { name: 'Saitama', pop: 7287325, change: -0.78, density: 1919, capital: 'Saitama' },
  { name: 'Chiba', pop: 6257000, change: -0.4, density: 1214, capital: 'Chiba' },
  { name: 'Fukuoka', pop: 5078000, change: -1.1, density: 1020, capital: 'Fukuoka' },
];

export const PREFECTURE_NOTE =
  'Chiba and Fukuoka are rounded to the nearest thousand as published in the ' +
  'Statistics Bureau summary table; densities are computed from the census ' +
  'populations and areas and are approximate. Tottori is the smallest prefecture, about 0.53 million ' +
  'people (resident register, 1 Jan 2025). Only the seven largest prefectures are listed here; ' +
  'the full 47-prefecture table is in the 2025 Census release.';

// Largest cities, 2025 Census final tabulation.
export const CITIES = [
  { name: 'Tokyo, 23 special wards', pop: 9944109, prefecture: 'Tokyo' },
  { name: 'Yokohama', pop: 3750952, prefecture: 'Kanagawa' },
  { name: 'Osaka', pop: 2805371, prefecture: 'Osaka' },
  { name: 'Nagoya', pop: 2345186, prefecture: 'Aichi' },
  { name: 'Sapporo', pop: 1961996, prefecture: 'Hokkaido' },
  { name: 'Fukuoka', pop: 1662793, prefecture: 'Fukuoka' },
];

// Labour market, Labour Force Survey (seasonally adjusted unless noted).
export const UNEMPLOYMENT = [
  { month: 'Jul 2025', rate: 2.4, unemployed: null },
  { month: 'Aug 2025', rate: 2.6, unemployed: null },
  { month: 'Sep 2025', rate: 2.6, unemployed: 1.81 },
  { month: 'Oct 2025', rate: 2.6, unemployed: 1.84 },
  { month: 'Nov 2025', rate: 2.6, unemployed: 1.81 },
  { month: 'Dec 2025', rate: 2.6, unemployed: 1.85 },
  { month: 'Aug 2026', rate: 2.5, unemployed: 1.77 },
  { month: 'Sep 2026', rate: 2.4, unemployed: 1.67 },
];

export const LABOUR_FACTS = [
  { label: 'Employed', value: '68.68m', note: 'September 2026, seasonally adjusted' },
  { label: 'Labour force', value: '70.34m', note: 'September 2026, seasonally adjusted' },
  { label: 'Unemployed', value: '1.67m', note: 'September 2026, down 0.10m on the month' },
  { label: 'Jobs per applicant', value: '1.19', note: 'September 2026, effective job-openings ratio' },
  { label: 'Participation rate', value: '64.2%', note: 'September 2025, not seasonally adjusted' },
];

// Consumer prices, year-on-year change in the all-items CPI.
export const CPI_SERIES = [
  { month: 'Sep 2025', headline: 2.9, core: 2.9 },
  { month: 'Oct 2025', headline: 3.0, core: 3.0 },
  { month: 'Nov 2025', headline: 2.9, core: null },
  { month: 'Dec 2025', headline: 2.1, core: null },
  { month: 'Sep 2026', headline: 2.1, core: 2.1 },
  { month: 'Oct 2026', headline: 2.3, core: 2.2 },
];

export const PRICE_FACTS = [
  { label: 'Food inflation', value: '+6.4%', note: 'October 2025, year on year' },
  { label: 'Core-core CPI', value: '+3.1%', note: 'Excl. fresh food and energy, October 2025' },
  { label: 'Bank of Japan target', value: '2%', note: 'Price stability target for the CPI' },
];

// Health and vital statistics.
export const HEALTH_FACTS = [
  { label: 'Life expectancy at birth', value: '84.0 years', note: '2024, World Bank' },
  { label: 'Births', value: '686,061', note: '2024 — ninth straight record low' },
  { label: 'Deaths', value: '1,605,298', note: '2024 — post-war high' },
  { label: 'Natural change', value: '−919,237', note: 'Births minus deaths, 2024' },
  { label: 'Total fertility rate', value: '1.15', note: '2024, down 0.05 on 2023; below 2.1 since 1974' },
  { label: 'Infant mortality', value: '1.8', note: 'Deaths per 1,000 live births, 2024' },
];

// Economy — nominal GDP, Cabinet Office national accounts.
export const ECONOMY_FACTS = [
  { label: 'Nominal GDP (calendar 2024)', value: '¥609.3tn', note: 'Up 2.9% on the year' },
  { label: 'Nominal GDP (fiscal 2024)', value: '¥642.4tn', note: 'April 2024 – March 2025' },
  { label: 'Real GDP growth (fiscal 2024)', value: '+0.8%', note: 'Fourth straight year of real growth' },
  { label: 'Nominal GDP in dollars', value: '≈ $4.19tn', note: '2024 — the world’s 4th largest economy' },
  { label: 'Share of world GDP', value: '3.8%', note: '2024, down from 10.2% in 2005' },
];

// Sources, shown on the Sources page and searchable there.
export const SOURCES = [
  { body: 'Statistics Bureau of Japan', what: '2025 Population Census — final tabulation (Sep 2026) and preliminary counts (May 2026)', url: 'stat.go.jp' },
  { body: 'Statistics Bureau of Japan', what: 'Labour Force Survey, monthly releases Jul 2025 – Sep 2026', url: 'stat.go.jp' },
  { body: 'Statistics Bureau of Japan', what: 'Consumer Price Index, monthly releases Sep 2025 – Oct 2026', url: 'stat.go.jp' },
  { body: 'Cabinet Office (ESRI)', what: 'National Accounts of Japan — preliminary GDP, calendar 2024; FY2024 annual estimates', url: 'cao.go.jp' },
  { body: 'Cabinet Office', what: 'International Comparison of GDP, FY2024 annual estimates (Dec 2025)', url: 'cao.go.jp' },
  { body: 'Ministry of Health, Labour and Welfare', what: 'Vital Statistics 2024 — births, deaths, total fertility rate', url: 'mhlw.go.jp' },
  { body: 'World Bank', what: 'World Development Indicators 2024 — life expectancy, infant mortality', url: 'worldbank.org' },
  { body: 'Ministry of Internal Affairs and Communications', what: 'Resident register (Basic Resident Registration), 1 Jan 2025', url: 'soumu.go.jp' },
];
