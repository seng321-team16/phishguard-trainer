// Exports every prototype screen in design/screens/ as PNG files (task T-54).
//
//   node design/export.mjs
//
// Each screen is captured at two viewports: 1366×768 ("desktop") and 390×844 ("mobile").
// The files are written to design/exports/SCR-xx-<name>-desktop.png and -mobile.png.
// The capture is a full-page screenshot: the width is exactly the viewport width; a screen
// that is longer than the viewport is captured to its full length so that nothing is cut off.
//
// Needs Playwright: `npm install --no-save playwright`. The script uses the Chromium that
// Playwright downloads (`npx playwright install chromium`); if that is missing it falls back
// to an installed Microsoft Edge or Google Chrome. Set PW_CHANNEL=msedge|chrome to force one.
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const screensDir = path.join(here, 'screens');
const exportsDir = path.join(here, 'exports');

const VIEWPORTS = [
  { name: 'desktop', width: 1366, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
];

// State shown in the export when it is not the default state of the file.
const STATE = {
  'SCR-08': '#delete-dialog', // the delete confirmation dialog (FLOW-05 step 7)
};

async function launch() {
  const channels = process.env.PW_CHANNEL
    ? [process.env.PW_CHANNEL]
    : [undefined, 'msedge', 'chrome'];
  let lastError;
  for (const channel of channels) {
    try {
      return await chromium.launch(channel ? { channel } : {});
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

const files = (await readdir(screensDir)).filter((f) => /^SCR-\d{2}-.+\.html$/.test(f)).sort();
await mkdir(exportsDir, { recursive: true });

const browser = await launch();
let count = 0;
let failed = false;
try {
  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const fileName of files) {
      const base = fileName.replace(/\.html$/, '');
      const url =
        pathToFileURL(path.join(screensDir, fileName)).href + (STATE[base.slice(0, 6)] ?? '');
      await page.goto(url, { waitUntil: 'load' });

      // NFR-36: no screen may scroll horizontally at either viewport.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) {
        failed = true;
        console.error(`FAIL ${base} (${viewport.name}): ${overflow}px wider than the viewport`);
      }

      const target = path.join(exportsDir, `${base}-${viewport.name}.png`);
      // An overlay state covers the window, not the page, so it is captured at viewport size.
      await page.screenshot({ path: target, fullPage: !STATE[base.slice(0, 6)] });
      count += 1;
      console.log(`wrote ${path.relative(process.cwd(), target)}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

console.log(`${count} PNG files from ${files.length} screens`);
if (failed) process.exitCode = 1;
