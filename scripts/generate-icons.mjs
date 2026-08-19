/**
 * Generate every icon the site needs, from the brand mark.
 *
 *   node scripts/generate-icons.mjs
 *
 * Writes:
 *   public/brand/icon-dark.svg · icon-light.svg    — the two plate variants
 *   src/app/icon.svg                              — SVG favicon (Next links it)
 *   src/app/favicon.ico                           — 16/32/48, for /favicon.ico
 *   src/app/apple-icon.png                        — 180×180 home-screen icon
 *   public/brand/icon-192.png · icon-512.png      — manifest icons
 *   public/brand/icon-maskable-512.png            — Android maskable (safe zone)
 *
 * The mark's geometry is verbatim from the supplied artwork. ORANGE below is the
 * single source of truth for every raster asset — keep it in step with the
 * `--brand` token in src/app/[locale]/globals.css.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

/** Supplied mark, on a 120×120 artboard. */
const MARK = 'M66 99L92 47H66L53 21H27L66 99Z';
const ORANGE = '#FF5A1F'; // === --brand
const PLATE_DARK = '#1A1A1A';
const PLATE_LIGHT = '#FFFFFF';

/**
 * @param plate   background fill
 * @param inset   0 = mark fills the artboard (the supplied lockup).
 *                Android crops maskable icons to a circle, so that variant pulls
 *                the mark in — otherwise the tips of the V get sliced off.
 */
function iconSvg({ plate, inset = 0, size = 120 } = {}) {
  const scale = 1 - inset;
  const offset = (120 - 120 * scale) / 2;
  const mark =
    inset === 0
      ? `<path d="${MARK}" fill="${ORANGE}"/>`
      : `<g transform="translate(${offset} ${offset}) scale(${scale})"><path d="${MARK}" fill="${ORANGE}"/></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" fill="${plate}"/>
  ${mark}
</svg>`;
}

/** Minimal multi-size ICO with PNG payloads (universally supported today). */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;

  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const darkSvg = iconSvg({ plate: PLATE_DARK });
const lightSvg = iconSvg({ plate: PLATE_LIGHT });
const maskableSvg = iconSvg({ plate: PLATE_DARK, inset: 0.42, size: 512 });

const png = (size, svg = darkSvg) =>
  sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: 'contain' })
    .png({ compressionLevel: 9 })
    .toBuffer();

await mkdir(resolve(root, 'public/brand'), { recursive: true });

await writeFile(resolve(root, 'public/brand/icon-dark.svg'), darkSvg);
await writeFile(resolve(root, 'public/brand/icon-light.svg'), lightSvg);

// SVG favicon — scalable, and the crispest option in modern browsers
await writeFile(resolve(root, 'src/app/icon.svg'), darkSvg);

// .ico for the bare /favicon.ico request browsers still make on their own
const ico = buildIco(
  await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size) }))),
);
await writeFile(resolve(root, 'src/app/favicon.ico'), ico);

await writeFile(resolve(root, 'src/app/apple-icon.png'), await png(180));
await writeFile(resolve(root, 'public/brand/icon-192.png'), await png(192));
await writeFile(resolve(root, 'public/brand/icon-512.png'), await png(512));
await writeFile(resolve(root, 'public/brand/icon-maskable-512.png'), await png(512, maskableSvg));

console.log(`✓ icons generated in ${ORANGE}`);
console.log('  public/brand/icon-dark.svg · icon-light.svg');
console.log('  src/app/icon.svg · favicon.ico (16/32/48) · apple-icon.png (180)');
console.log('  public/brand/icon-192.png · icon-512.png · icon-maskable-512.png');
