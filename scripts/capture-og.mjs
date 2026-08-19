/**
 * Capture the Open Graph card.
 *
 *   node scripts/capture-og.mjs [baseUrl] [locale]
 *
 * Renders /{locale}/og-card at exactly 1200×630 and writes
 * public/open-graph-image.png. Needs the app running (dev or start).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import puppeteer from 'puppeteer';

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');
const locale = process.argv[3] ?? 'pt';
const out = resolve(process.cwd(), 'public/open-graph-image.png');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});

try {
  const page = await browser.newPage();
  // deviceScaleFactor 1 — Open Graph consumers want exactly 1200×630
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  // The card is designed light; make sure the OS preference doesn't flip it.
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);

  const url = `${baseUrl}/${locale}/og-card`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });

  // Wait for web fonts, then for the halftone canvas to have actually painted.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () => {
      const canvas = document.querySelector('.og-card canvas');
      if (!canvas || !canvas.width) return false;
      const ctx = canvas.getContext('2d');
      const { data } = ctx.getImageData(0, 0, canvas.width, Math.min(canvas.height, 40));
      // any non-transparent pixel means the dots are down
      return data.some((v, i) => i % 4 === 3 && v > 0);
    },
    { timeout: 20_000 },
  );

  const card = await page.$('.og-card');
  if (!card) throw new Error('.og-card not found — did the route render?');

  const buffer = await card.screenshot({ type: 'png' });
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, buffer);

  console.log(`✓ open-graph-image.png written from ${url} (${buffer.length} bytes)`);
} finally {
  await browser.close();
}
