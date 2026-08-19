'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/libs/utils';
import { gsap, prefersReducedMotion, registerMotion, scrollState } from '@/libs/motion';

/**
 * Velocity-coupled marquee — the 2026 signature detail.
 *
 * Base speed is constant, but scrolling adds to it and scrolling *up*
 * flips the direction. It reads as one physical object reacting to you
 * rather than a looping CSS animation.
 */
export function Marquee({
  children,
  className,
  itemClassName,
  speed = 60,
  reverse = false,
  /** how hard scroll velocity pushes the track */
  coupling = 0.22,
  repeat = 2,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  /** px per second at rest */
  speed?: number;
  reverse?: boolean;
  coupling?: number;
  repeat?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      registerMotion();

      const dir = reverse ? 1 : -1;

      if (prefersReducedMotion()) {
        // Static: still readable, just parked.
        return;
      }

      let offset = 0;
      // One "set" is 1/repeat of the track — wrapping there is seamless.
      const setWidth = () => track.scrollWidth / repeat;
      let width = setWidth();

      const onResize = () => {
        width = setWidth();
      };
      window.addEventListener('resize', onResize);

      const tick = (_t: number, delta: number) => {
        const dt = delta / 1000;
        const boost = scrollState.velocity * coupling;
        // Scrolling up reverses the track; scrolling down accelerates it.
        offset += (speed * dir + boost * dir * scrollState.direction) * dt;
        if (width > 0) {
          // keep offset inside one set width, both directions
          offset = ((offset % width) + width) % width;
        }
        gsap.set(track, { x: -offset });
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('resize', onResize);
      };
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden', className)} aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className={cn('flex shrink-0 items-center', itemClassName)}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Scroll-velocity skew. Wrap a block and it leans into fast scrolling,
 * clamped so it never becomes a gimmick.
 */
export function VelocitySkew({
  children,
  className,
  max = 4,
  factor = 0.006,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  factor?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();
      if (prefersReducedMotion()) return;

      const setter = gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3.out' });
      const tick = () => {
        const skew = gsap.utils.clamp(-max, max, scrollState.velocity * factor);
        setter(skew);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ transformOrigin: 'center' }}>
      {children}
    </div>
  );
}
