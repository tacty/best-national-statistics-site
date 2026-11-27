# Japan by the Numbers

An independent guide to Japan's official statistics, built as a static site
that runs offline in a browser — on a desktop and on a phone.

## What it is

One country, eight sections: an overview of six headline figures, then
population, economy, prefectures, labour, prices, health & births, and a
sources & methods page. Every figure names its source and year on the page
where it appears.

Highlights:

- **Population** — 122.97 million people in the final 2025 Census, down 2.5%
  on 2020, the largest five-year fall since the census began in 1920.
- **Economy** — nominal GDP ¥609.3 trillion in calendar 2024 (Cabinet Office).
- **Prefectures** — a searchable, sortable table of the seven largest
  prefectures, a comparison tool, and a chart that switches between
  population and five-year change.
- **Labour** — unemployment 2.4% (September 2026), with a chart that switches
  between the rate and the number of unemployed.
- **Prices** — CPI year-on-year, with a sortable monthly table.
- **Health** — life expectancy 84.0 years, 686,061 births in 2024, fertility
  rate 1.15.
- **Sources** — a searchable source list and a one-click CSV download of the
  prefecture table.

All charts are plain SVG drawn by the site itself. There is no build step,
no framework, and no network request: every script, stylesheet and figure is
a file under `app/`.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 — or open `app/index.html` directly.

## Layout

- `main.ts` — copies `app/` and `screenshots/` to the output directory and
  writes `dossier.json` (the make.fun hand-in).
- `app/index.html` — the shell: header, navigation, theme button.
- `app/main.js` — the hash router and every control (search, sort, chart
  switches, comparison, CSV download, theme).
- `app/views.js` — one function per page.
- `app/charts.js` — small SVG chart builders (bar, horizontal bar, line).
- `app/data.js` — every figure, with its source and year.
- `app/style.css` — paper, ink and vermilion; phone layout under 700px.
- `screenshots/` — real renders of the site running.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## Support

If this site helped you, you can support its maker:

- Wallet: `8muodSLymFUxtKZi7r3Bb9uR2fHdj61naiViryKdWyjc`
- Referral code: `kwg9khhh`

## License

MIT — see `LICENSE`.
