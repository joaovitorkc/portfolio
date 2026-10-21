/**
 * Render the CV route to PDF.
 *
 *   node scripts/capture-cv.mjs [baseUrl]
 *
 * Writes public/curriculo.pdf (pt) and public/resume.pdf (en) from
 * /{locale}/cv — the exact page a visitor sees. That is the whole point: the
 * downloadable file is *derived*, so it can never drift out of date the way a
 * hand-made PDF does.
 *
 * Uses Chromium's own print pipeline via `printBackground`, so the ink rules
 * and the orange survive, and the text stays real selectable text — which is
 * what applicant tracking systems parse.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';

const baseUrl = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');

// Nome com o nome da pessoa (é o que o recrutador vê ao baixar). Os nomes antigos
// continuam sendo gerados para não quebrar links já enviados.
const targets = [
  {
    locale: 'pt',
    out: ['public/JoaoVitorCavalcanti-Curriculo.pdf', 'public/curriculo.pdf'],
  },
  {
    locale: 'en',
    out: ['public/JoaoVitorCavalcanti-Resume.pdf', 'public/resume.pdf'],
  },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});

try {
  for (const { locale, out } of targets) {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1 });
    // The CV is designed light; don't let the OS preference flip it.
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);

    const url = `${baseUrl}/${locale}/cv`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);

    // Fail loudly rather than shipping a blank PDF.
    const pages = await page.$$eval('.cv-page', (els) => els.length);
    if (pages === 0) throw new Error(`no .cv-page found at ${url}`);

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    for (const file of out) await writeFile(resolve(process.cwd(), file), pdf);

    // Os mesmos dados do PDF, para o robô de candidaturas adaptar por vaga (fora de public/).
    const data = await page.$eval('#cv-data', (el) => el.textContent);
    await mkdir(resolve(process.cwd(), 'scripts/out'), { recursive: true });
    await writeFile(resolve(process.cwd(), `scripts/out/cv-${locale}.json`), data);
    console.log(
      `✓ ${out.join(' + ')}  ${pages} página(s)  ${Math.round(pdf.length / 1024)} KB  ← ${url}`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
