import { cn } from '@/libs/utils';

/**
 * The brand mark.
 *
 * Geometry is verbatim from the supplied icon (120×120 artboard). The two fills
 * are design tokens rather than baked hex, so the square follows the theme and
 * the mark is always exactly the same orange as the rest of the site.
 *
 * `plate` is the square behind the mark:
 *   'ink'   — dark square, the default (matches the supplied dark icon)
 *   'paper' — light square, for use on the inverted ink footer
 *   'none'  — mark only, no square
 */
export function Monogram({
  className,
  plate = 'ink',
}: {
  className?: string;
  plate?: 'ink' | 'paper' | 'none';
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('block', className)}
      role="img"
      aria-label="João Vitor"
    >
      {plate !== 'none' && (
        <rect width="120" height="120" className={plate === 'ink' ? 'fill-ink' : 'fill-paper'} />
      )}
      <path d="M66 99L92 47H66L53 21H27L66 99Z" className="fill-brand" />
    </svg>
  );
}
