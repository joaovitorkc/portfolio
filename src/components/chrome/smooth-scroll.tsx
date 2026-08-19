'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import {
  gsap,
  prefersReducedMotion,
  registerMotion,
  ScrollTrigger,
  scrollState,
} from '@/libs/motion';

type ScrollApi = {
  /** Smooth-scroll to an element id or offset. Falls back to native when Lenis is off. */
  scrollTo: (target: string | number, offset?: number) => void;
  stop: () => void;
  start: () => void;
  ready: boolean;
};

const ScrollContext = createContext<ScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
  ready: false,
});

export const useSmoothScroll = () => useContext(ScrollContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    registerMotion();

    // Web fonts and the halftone canvas both change layout after first paint.
    // Without these refreshes, every pinned trigger keeps stale start/end values
    // and anchor navigation lands one or two chapters off target.
    ScrollTrigger.config({ ignoreMobileResize: true });
    const refresh = () => ScrollTrigger.refresh();
    const onLoad = () => refresh();
    window.addEventListener('load', onLoad);
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    const settleTimer = window.setTimeout(refresh, 900);

    // Reduced motion: no Lenis at all. Native scrolling, ScrollTrigger still works.
    if (prefersReducedMotion()) {
      setReady(true);
      return () => {
        window.removeEventListener('load', onLoad);
        window.clearTimeout(settleTimer);
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      // long, gentle tail — the "expensive" scroll feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Touch devices keep native momentum; forcing Lenis there feels laggy.
      syncTouch: false,
    });
    lenisRef.current = lenis;

    // Lenis drives ScrollTrigger, GSAP's ticker drives Lenis. One clock, no jitter.
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Telemetry consumed by marquees and velocity-coupled effects.
    const telemetry = () => {
      const v = lenis.velocity ?? 0;
      scrollState.velocity = v;
      scrollState.progress = lenis.progress ?? 0;
      scrollState.y = lenis.scroll ?? 0;
      if (Math.abs(v) > 0.05) scrollState.direction = v > 0 ? 1 : -1;
    };
    gsap.ticker.add(telemetry);

    setReady(true);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(settleTimer);
      gsap.ticker.remove(raf);
      gsap.ticker.remove(telemetry);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number, offset = 0) => {
    // Resolve the destination to an absolute px value *at click time*.
    // Passing a selector to Lenis would read positions that pinned sections
    // may have since invalidated, which lands the reader on the wrong chapter.
    const resolve = (): number | null => {
      if (typeof target === 'number') return target + offset;
      const el = document.querySelector(target);
      if (!el) return null;
      const currentY = window.scrollY;
      return el.getBoundingClientRect().top + currentY + offset;
    };

    // Make sure pinned triggers have settled before we measure.
    ScrollTrigger.refresh();

    const top = resolve();
    if (top === null) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.25, lock: true });
      return;
    }
    window.scrollTo({ top });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <ScrollContext.Provider value={{ scrollTo, stop, start, ready }}>
      {children}
    </ScrollContext.Provider>
  );
}
