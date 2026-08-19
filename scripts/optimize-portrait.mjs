/**
 * Right-size the portrait.
 *
 *   node scripts/optimize-portrait.mjs [source]
 *
 * The original is a 1000×1000 PNG at ~745 KB, displayed at ~450 CSS px and then
 * sampled down to a ~75×95 dot grid by the halftone canvas. That is roughly 15×
 * more bytes than the design can ever show, and it was the LCP element.
 *
 * Writes:
 *   public/profile-portrait.webp — 800px, what the page actually loads
 *   public/profile-photo.jpg     — 1000px, for JSON-LD / social consumers
 *                                  that would rather not be handed a WebP
 */
import { readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = resolve(root, process.argv[2] ?? 'public/profile-image.png');
const input = await readFile(source);

const kb = (n) => `${Math.round(n / 1024)} KB`;
const before = (await stat(source)).size;

// 800px covers the largest render (~450px) at 2× DPR with room to spare.
const webp = await sharp(input)
  .resize(800, 800, { fit: 'cover', position: 'top' })
  .webp({ quality: 82, effort: 6 })
  .toBuffer();

const jpg = await sharp(input)
  .resize(1000, 1000, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toBuffer();

await writeFile(resolve(root, 'public/profile-portrait.webp'), webp);
await writeFile(resolve(root, 'public/profile-photo.jpg'), jpg);

console.log(`✓ portrait optimised (source ${kb(before)})`);
console.log(`  public/profile-portrait.webp  800px   ${kb(webp.length)}`);
console.log(`  public/profile-photo.jpg     1000px   ${kb(jpg.length)}`);
