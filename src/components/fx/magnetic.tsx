'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, isCoarsePointer, prefersReducedMotion, registerMotion } from '@/libs/motion';

/**
 * Magnetic hover. The element leans toward the cursor and snaps back.
 * Disabled entirely on touch (no hover to react to) and under reduced motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  /** the inner label can travel further than the box for a nice parallax */
  innerStrength = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  innerStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();
      if (prefersReducedMotion() || isCoarsePointer()) return;

      const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');

      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'expo.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'expo.out' });
      const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.85, ease: 'expo.out' }) : null;
      const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.85, ease: 'expo.out' }) : null;

      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo?.(dx * (innerStrength - strength));
        iyTo?.(dy * (innerStrength - strength));
      };

      const leave = () => {
        xTo(0);
        yTo(0);
        ixTo?.(0);
        iyTo?.(0);
      };

      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
