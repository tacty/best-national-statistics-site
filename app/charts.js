// charts.js — small SVG chart builders. No libraries, no network: every
// chart is drawn from the numbers in data.js and returned as an SVG string.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function fmt(n) {
  return Number(n).toLocaleString('en-US');
}

// Vertical bars with value labels. `rows` is [{label, value, note?}].
// `unit` is appended to the value labels (e.g. 'm' or '%').
export function barChart(rows, { unit = '', height = 260, color = '#b3402a', baseline = 0 } = {}) {
  const w = 640;
  const h = height;
  const padL = 8;
  const padB = 34;
  const padT = 30;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const min = Math.min(baseline, ...rows.map((r) => r.value));
  const span = max - min || 1;
  const slot = (w - padL * 2) / rows.length;
  const barW = Math.min(64, slot * 0.58);
  const y = (v) => padT + (max - v) * ((h - padT - padB) / span);
  const zeroY = y(Math.max(min, 0));
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" preserveAspectRatio="xMidYMid meet">`;
  out += `<line x1="${padL}" y1="${zeroY}" x2="${w - padL}" y2="${zeroY}" stroke="currentColor" stroke-width="1" opacity="0.35"/>`;
  rows.forEach((r, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = y(Math.max(r.value, 0));
    const bottom = r.value < 0 ? y(r.value) : zeroY;
    const bh = Math.max(1, Math.abs(bottom - top));
    const by = r.value < 0 ? zeroY : top;
    const fill = r.value < 0 ? '#5b7a99' : color;
    out += `<rect x="${x.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"><title>${esc(r.label)}: ${r.value}${unit}</title></rect>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${(by - 7).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${r.value}${unit}</text>`;
    out += `<text x="${(x + barW / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.75">${esc(r.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

// Horizontal bars, best for ranked lists such as prefectures.
export function hbarChart(rows, { unit = '', color = '#1f3a5f' } = {}) {
  const w = 640;
  const rowH = 44;
  const h = rows.length * rowH + 16;
  const labelW = 110;
  const max = Math.max(...rows.map((r) => r.value), 1);
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Horizontal bar chart" preserveAspectRatio="xMidYMid meet">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - 110) * r.value) / max;
    out += `<text x="0" y="${y + 22}" font-size="13" font-weight="600" fill="currentColor">${esc(r.label)}</text>`;
    out += `<rect x="${labelW}" y="${y + 6}" width="${bw.toFixed(1)}" height="22" rx="3" fill="${color}"><title>${esc(r.label)}: ${fmt(r.value)}${unit}</title></rect>`;
    out += `<text x="${(labelW + bw + 8).toFixed(1)}" y="${y + 22}" font-size="13" font-weight="700" fill="currentColor">${fmt(r.value)}${unit}</text>`;
  });
  out += '</svg>';
  return out;
}

// Simple line chart with dots and value labels.
export function lineChart(rows, { unit = '%', color = '#b3402a' } = {}) {
  const w = 640;
  const h = 260;
  const padL = 44;
  const padR = 16;
  const padT = 30;
  const padB = 34;
  const vals = rows.map((r) => r.value);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const span = max - min || 1;
  const lo = min - span * 0.25;
  const hi = max + span * 0.25;
  const x = (i) => padL + (i * (w - padL - padR)) / (rows.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * (h - padT - padB);
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" preserveAspectRatio="xMidYMid meet">`;
  [0.25, 0.5, 0.75].forEach((f) => {
    const gy = padT + f * (h - padT - padB);
    out += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${w - padR}" y2="${gy.toFixed(1)}" stroke="currentColor" stroke-width="1" opacity="0.12"/>`;
  });
  const pts = rows.map((r, i) => `${x(i).toFixed(1)},${y(r.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  rows.forEach((r, i) => {
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(r.value).toFixed(1)}" r="4.5" fill="${color}"><title>${esc(r.label)}: ${r.value}${unit}</title></circle>`;
    out += `<text x="${x(i).toFixed(1)}" y="${(y(r.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">${r.value}${unit}</text>`;
    out += `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11.5" fill="currentColor" opacity="0.75">${esc(r.label)}</text>`;
  });
  out += '</svg>';
  return out;
}
