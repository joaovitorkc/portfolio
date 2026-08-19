/**
 * The dossier's table of contents. Single source for the nav, the index rail,
 * the command palette and keyboard navigation.
 *
 * Order here IS the printed order, and the index is derived from it — so
 * inserting a chapter renumbers everything downstream automatically. Sections
 * read their number via `chapterNum()` rather than hardcoding it, which is what
 * stops the page and the rail from ever disagreeing.
 */
export type ChapterKey =
  | 'cover'
  | 'manifesto'
  | 'work'
  | 'clients'
  | 'stack'
  | 'trajectory'
  | 'signals'
  | 'offEditor'
  | 'terminal'
  | 'contact';

export type Chapter = {
  /** DOM id of the <section> */
  id: string;
  /** printed index, derived from position */
  num: string;
  key: ChapterKey;
  /** shown in the desktop top bar (space is finite) */
  inNav: boolean;
};

const order: { id: string; key: ChapterKey; inNav: boolean }[] = [
  { id: 'cover', key: 'cover', inNav: false },
  { id: 'manifesto', key: 'manifesto', inNav: true },
  { id: 'work', key: 'work', inNav: true },
  { id: 'clients', key: 'clients', inNav: true },
  { id: 'stack', key: 'stack', inNav: false },
  { id: 'trajectory', key: 'trajectory', inNav: true },
  { id: 'signals', key: 'signals', inNav: false },
  { id: 'off-editor', key: 'offEditor', inNav: false },
  { id: 'terminal', key: 'terminal', inNav: false },
  { id: 'contact', key: 'contact', inNav: true },
];

export const chapters: Chapter[] = order.map((c, i) => ({
  ...c,
  num: String(i).padStart(2, '0'),
}));

export const navChapters = chapters.filter((c) => c.inNav);

/** The printed index for a chapter, e.g. chapterNum('clients') → '03'. */
export function chapterNum(key: ChapterKey): string {
  return chapters.find((c) => c.key === key)?.num ?? '00';
}
