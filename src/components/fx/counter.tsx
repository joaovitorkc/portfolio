'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/libs/utils';
import { gsap, prefersReducedMotion, registerMotion } from '@/libs/motion';

/**
 * Counts a real number into place, once.
 *
 * Deliberately restrained: these are measured facts (161 screens, 297 migrations),
 * not vanity "years of experience" counters. Prefix/suffix keep values like
 * "~405k" honest while still animating the numeric part.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  className,
  duration = 1.5,
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();

      const format = (n: number) =>
        `${prefix}${n.toLocaleString('pt-BR', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;

      if (prefersReducedMotion()) {
        el.textContent = format(value);
        return;
      }

      const state = { n: 0 };
      gsap.to(state, {
        n: value,
        duration,
        ease: 'expo.out',
        onUpdate: () => {
          el.textContent = format(state.n);
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={cn('tabular', className)}>
      {prefix}
      {value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
