/**
 * The dossier's table of contents. Single source for the nav, the index rail,
 * the command palette and keyboard navigation.
 */
export type Chapter = {
  /** DOM id of the <section> */
  id: string;
  /** printed index, e.g. "02" */
  num: string;
  /** key inside the `chapters` message namespace */
  key:
    | 'cover'
    | 'manifesto'
    | 'work'
    | 'stack'
    | 'trajectory'
    | 'signals'
    | 'offEditor'
    | 'terminal'
    | 'contact';
  /** shown in the desktop top bar (space is finite) */
  inNav: boolean;
};

export const chapters: Chapter[] = [
  { id: 'cover', num: '00', key: 'cover', inNav: false },
  { id: 'manifesto', num: '01', key: 'manifesto', inNav: true },
  { id: 'work', num: '02', key: 'work', inNav: true },
  { id: 'stack', num: '03', key: 'stack', inNav: true },
  { id: 'trajectory', num: '04', key: 'trajectory', inNav: true },
  { id: 'signals', num: '05', key: 'signals', inNav: false },
  { id: 'off-editor', num: '06', key: 'offEditor', inNav: false },
  { id: 'terminal', num: '07', key: 'terminal', inNav: false },
  { id: 'contact', num: '08', key: 'contact', inNav: true },
];

export const navChapters = chapters.filter((c) => c.inNav);
