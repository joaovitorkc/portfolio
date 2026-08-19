'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/libs/utils';
import { EASE, gsap, prefersReducedMotion, registerMotion, SplitText } from '@/libs/motion';

/* ------------------------------------------------------------------ */
/* TextReveal — masked line-by-line rise, driven by scroll             */
/* ------------------------------------------------------------------ */

type TextRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds between lines */
  stagger?: number;
  delay?: number;
  /** render as a different element */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  /** start the animation without waiting for scroll (hero) */
  immediate?: boolean;
};

export function TextReveal({
  children,
  className,
  stagger = 0.075,
  delay = 0,
  as: Tag = 'div',
  immediate = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const el = ref.current;
      if (!el) return;

      // Reduced motion: the text is already in the DOM and visible. Do nothing.
      if (prefersReducedMotion()) return;

      // autoSplit re-splits on font load and resize, so lines never break mid-animation.
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'reveal-line',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: EASE,
            stagger,
            delay,
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true,
                  },
                }),
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — generic scroll-in for blocks                               */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** direction the block travels in from */
  from?: 'bottom' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  /** stagger direct children instead of the wrapper */
  stagger?: number;
};

export function Reveal({
  children,
  className,
  from = 'bottom',
  distance = 34,
  delay = 0,
  duration = 0.95,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();
      if (prefersReducedMotion()) return;

      const targets = stagger ? Array.from(el.children) : el;
      const offset =
        from === 'bottom'
          ? { y: distance }
          : from === 'left'
            ? { x: -distance }
            : from === 'right'
              ? { x: distance }
              : {};

      gsap.from(targets, {
        opacity: 0,
        ...offset,
        duration,
        delay,
        ease: EASE,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrambleIn — mono text that decodes into place                      */
/* ------------------------------------------------------------------ */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#$%&*+=';

export function ScrambleIn({
  text,
  className,
  duration = 900,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();
      if (prefersReducedMotion()) {
        el.textContent = text;
        return;
      }

      const st = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });

      // Hand-rolled scramble: locks characters left-to-right over `duration`.
      st.to(
        {},
        {
          duration: duration / 1000,
          onUpdate() {
            const p = this.progress();
            const locked = Math.floor(p * text.length);
            let out = text.slice(0, locked);
            for (let i = locked; i < text.length; i += 1) {
              out += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            el.textContent = out;
          },
          onComplete() {
            el.textContent = text;
          },
        },
      );
    },
    { scope: ref, dependencies: [text] },
  );

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {text}
    </span>
  );
}
