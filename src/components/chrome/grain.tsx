'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/libs/motion';

/**
 * Film grain over the whole page. This is what stops cream-and-ink from
 * looking like flat CSS and starts it looking like printed stock.
 *
 * The noise is a generated data-URI (no network request, no image asset) and
 * the animation degrades to a single static frame under reduced motion.
 */
const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)" opacity="0.62"/></svg>`;

export default function Grain() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(prefersReducedMotion());
  }, []);

  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE_SVG)}")`;

  return (
    <div
      aria-hidden
      className="grain"
      style={
        {
          '--grain-url': url,
          animation: still ? 'none' : undefined,
        } as React.CSSProperties
      }
    />
  );
}
