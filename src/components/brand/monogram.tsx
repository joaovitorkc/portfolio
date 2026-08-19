import { cn } from '@/libs/utils';

/** Supplied mark, on a 120×120 artboard — the mirrored cut, which reads as a J. */
const MARK = 'M54 99L28 47H54L67 21H93L54 99Z';

/**
 * The brand mark.
 *
 * Geometry is verbatim from the supplied icon. Fills are design tokens rather
 * than baked hex, so the plate follows the theme and the mark is always exactly
 * the same orange as the rest of the site.
 *
 * `plate` — the square behind the mark:
 *   'ink'   dark square (matches the supplied dark icon)
 *   'paper' light square, for the inverted ink footer
 *   'none'  mark only, used as a typographic ornament
 *
 * `tone` — 'brand' paints the mark orange; 'current' inherits `color`, which is
 * what the orange marquee band needs (an orange mark on orange is invisible).
 *
 * `label` — pass it for the identity lockups so screen readers announce the
 * brand. Omit it for ornamental use and the mark is hidden from assistive tech,
 * which is what lets the same component stand in for a decorative glyph.
 */
export function Monogram({
  className,
  plate = 'ink',
  tone = 'brand',
  label,
}: {
  className?: string;
  plate?: 'ink' | 'paper' | 'none';
  tone?: 'brand' | 'current';
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('block', className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {plate !== 'none' && (
        <rect width="120" height="120" className={plate === 'ink' ? 'fill-ink' : 'fill-paper'} />
      )}
      <path d={MARK} className={tone === 'current' ? 'fill-current' : 'fill-brand'} />
    </svg>
  );
}
