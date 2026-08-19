import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/**
 * Shared, mutable scroll telemetry.
 *
 * Read this imperatively inside a ticker/rAF — never through React state.
 * Velocity coupling at 60fps through `useState` would re-render the tree
 * every frame; this keeps it at zero renders.
 */
export const scrollState = {
  /** px per second, signed */
  velocity: 0,
  /** normalised 0..1 over the document */
  progress: 0,
  /** 1 down, -1 up */
  direction: 1,
  y: 0,
};

let registered = false;

/** Register GSAP plugins exactly once, client-side only. */
export function registerMotion() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

/** True when the user asked the OS to calm things down. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Coarse pointer = touch. Custom cursors and hover-only affordances must bail. */
export function isCoarsePointer() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/** The house easing. Slow out, decisive in. */
export const EASE = 'expo.out';
export const EASE_INOUT = 'power4.inOut';

export { gsap, ScrollTrigger, SplitText };
