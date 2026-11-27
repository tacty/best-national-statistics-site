// "Japan by the Numbers" — a national statistics site, entered in
// best-national-statistics-site-20261126-0539 (Node 22, standard library
// only). The site itself is the app/ folder beside this file: plain
// static files a browser opens at app/index.html (ES modules, CSS, no
// build step), every figure held in its own data files, nothing it
// runs, styles or shows loaded over the network.
//
// This program hands the site in: it copies app/ and screenshots/
// from beside this file to /output and writes /output/dossier.json,
// the summary the judge reads (the screenshots, the first load's
// files and bytes, and the source), using the vendored make.fun
// library. vendor/makefun-frontend.ts is left exactly as the kit
// handed it out: the scorer requires dossier.json to be byte for
// byte what its own copy writes.
//
// Run it locally (outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site while developing with `node serve.ts`, then open
// http://localhost:8080.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The scorer's caps (reference/gate.json): only text_max_bytes shapes
// the bytes; the others refuse an entry the scorer would refuse —
// more than 4 screenshots or one over 256 KiB; more than 993 files
// and directories in app/ or 16 MiB of app files (app/ counts beside
// /output's own 1000-entry cap, its screenshots/ and dossier.json).
const DOSSIER_OPTS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function countEntries(dir) {
  // A small pre-flight so a bloated app/ fails here with a plain
  // message instead of inside the dossier build.
  let files = 0;
  let bytes = 0;
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else {
        files += 1;
        bytes += st.size;
      }
    }
  };
  walk(dir);
  return { files, bytes };
}

function main() {
  const appDir = join(here, 'app');
  const { files, bytes } = countEntries(appDir);
  if (files > DOSSIER_OPTS.app_max_files) {
    throw new Error(`app/ has ${files} files, over the ${DOSSIER_OPTS.app_max_files} cap`);
  }
  if (bytes > DOSSIER_OPTS.app_max_bytes) {
    throw new Error(`app/ is ${bytes} bytes, over the ${DOSSIER_OPTS.app_max_bytes} cap`);
  }

  mkdirSync(out, { recursive: true });
  cpSync(appDir, join(out, 'app'), { recursive: true });

  const shotsDir = join(here, 'screenshots');
  mkdirSync(join(out, 'screenshots'), { recursive: true });
  if (existsSync(shotsDir)) {
    cpSync(shotsDir, join(out, 'screenshots'), { recursive: true });
  }

  writeFileSync(join(out, 'dossier.json'), buildDossier(out, DOSSIER_OPTS));
  console.log(`handed in ${files} app files (${bytes} bytes) to ${out}`);
}

main();
