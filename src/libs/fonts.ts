/* eslint-disable camelcase -- Google font identifiers are fixed by next/font */
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';

/**
 * Type system for the dossier.
 *
 * Bricolage Grotesque carries the whole display range through its `opsz` axis —
 * dramatic at poster sizes, sober in headings. NOTE: `opsz`/`wdth` must be listed
 * in `axes` or Next omits them from the font file and `font-optical-sizing` is a no-op.
 * Never pass `weight` together with `axes` — the validator rejects it.
 */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
  variable: '--font-display',
  display: 'swap',
});

export const fontSans = Instrument_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Static face — 400 only. Italic ONLY: the single consumer is `.serif-italic`,
 * so shipping the roman meant a second font file nothing on the site rendered.
 */
export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontSerif.variable,
  fontMono.variable,
].join(' ');
