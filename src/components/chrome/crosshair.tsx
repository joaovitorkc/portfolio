'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, isCoarsePointer, prefersReducedMotion, registerMotion } from '@/libs/motion';

/**
 * Registration-mark crosshair that tracks the pointer.
 *
 * Deliberately *not* a custom cursor: the native cursor stays visible, so text
 * selection, resize handles and link affordances all keep working. This only
 * adds two hairlines and a coordinate readout — the technical-drawing feel —
 * and removes itself entirely on touch or under reduced motion.
 */
export default function Crosshair() {
  const [enabled, setEnabled] = useState(false);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerMotion();
    if (prefersReducedMotion() || isCoarsePointer()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const v = vRef.current;
    const h = hRef.current;
    const tag = tagRef.current;
    if (!v || !h || !tag) return;

    const xTo = gsap.quickTo(v, 'x', { duration: 0.42, ease: 'power3.out' });
    const yTo = gsap.quickTo(h, 'y', { duration: 0.42, ease: 'power3.out' });
    const tagX = gsap.quickTo(tag, 'x', { duration: 0.5, ease: 'power3.out' });
    const tagY = gsap.quickTo(tag, 'y', { duration: 0.5, ease: 'power3.out' });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([v, h, tag], { opacity: 1, duration: 0.35 });
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      show();
      xTo(event.clientX);
      yTo(event.clientY);
      tagX(event.clientX + 14);
      tagY(event.clientY + 14);
      tag.textContent = `${Math.round(event.clientX)} ⁄ ${Math.round(event.clientY)}`;
    };

    const hide = () => {
      visible = false;
      gsap.to([v, h, tag], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', hide);
    document.addEventListener('mouseleave', hide);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', hide);
      document.removeEventListener('mouseleave', hide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        ref={vRef}
        className="absolute left-0 top-0 h-full w-px bg-ink/15 opacity-0 dark:bg-ink/20"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={hRef}
        className="absolute left-0 top-0 h-px w-full bg-ink/15 opacity-0 dark:bg-ink/20"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={tagRef}
        className="label absolute left-0 top-0 text-ink-faint opacity-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
