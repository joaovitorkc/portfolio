'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/libs/utils';
import { prefersReducedMotion } from '@/libs/motion';
import ParticleText from './particle-text';

/**
 * The hero name, rendered as ink dots.
 *
 * Wraps the vendored React Bits ParticleText and adapts it to this site:
 *
 *  · Colours come from the live design tokens (`--ink` / `--brand`), converted to
 *    the hex the component needs and re-derived on theme change — the particles
 *    re-gather when you flip light/dark instead of staying the wrong colour.
 *  · Glow is off. Dots in ink, not neon, so it reads as printed halftone and
 *    rhymes with the portrait instead of fighting the art direction.
 *  · The real text is server-rendered and visible, and only cross-fades out once
 *    the dots have painted. The name is never missing before hydration, it
 *    survives JS being slow or off, and the <h1> stays a normal text LCP element.
 *  · Canvas can't see CSS `text-transform`, so the uppercase string is baked in for
 *    the dots while the DOM keeps natural case — one text node, no duplication.
 *  · Everything is sized in `em` against the inherited poster size, so the glyph
 *    box always has headroom for the tilde on Ã and nothing gets clipped.
 *  · Under prefers-reduced-motion the canvas never mounts: plain, crisp type
 *    instead of a static dot approximation of it.
 */

/** `"30 13% 6%"` (a Tailwind HSL token) → `"#12100e"`. */
function hslTokenToHex(token: string): string | null {
  const match = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*$/.exec(token);
  if (!match) return null;

  const hue = Number(match[1]);
  const saturation = Number(match[2]) / 100;
  const lightness = Number(match[3]) / 100;

  const k = (n: number) => (n + hue / 30) % 12;
  const a = saturation * Math.min(lightness, 1 - lightness);
  const channel = (n: number) =>
    lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (value: number) =>
    Math.round(255 * value)
      .toString(16)
      .padStart(2, '0');

  return `#${hex(channel(0))}${hex(channel(8))}${hex(channel(4))}`;
}

function readToken(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  return hslTokenToHex(raw) ?? fallback;
}

export function ParticleName({
  /** Accessible text, in natural case. */
  label,
  tone = 'ink',
  /** Glyph box height, in em of the inherited font size. Needs > 1 for diacritics. */
  heightEm = 1.2,
  uppercase = true,
  className,
  /** delay spread across the particles, so the two words land in sequence */
  stagger = 420,
}: {
  label: string;
  tone?: 'ink' | 'brand';
  heightEm?: number;
  uppercase?: boolean;
  className?: string;
  stagger?: number;
}) {
  const { resolvedTheme } = useTheme();
  const boxRef = useRef<HTMLSpanElement>(null);
  const [fontPx, setFontPx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [colors, setColors] = useState<{ base: string; highlight: string } | null>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    setMounted(true);
  }, []);

  // Re-derive on theme change; the component rebuilds when these props change.
  //
  // Deferred by one frame on purpose: next-themes toggles the `.dark` class on
  // <html> in its own effect, and there is no ordering guarantee between that and
  // this one. Reading synchronously here returned the *previous* theme's tokens,
  // which painted "João" in dark ink on the dark background.
  useEffect(() => {
    if (!mounted) return;
    const frame = requestAnimationFrame(() => {
      setColors(
        tone === 'brand'
          ? {
              base: readToken('--brand', '#ff5a1f'),
              highlight: readToken('--brand-dim', '#e44c13'),
            }
          : { base: readToken('--ink', '#12100e'), highlight: readToken('--ink', '#12100e') },
      );
    });
    return () => cancelAnimationFrame(frame);
  }, [mounted, resolvedTheme, tone]);

  // Canvas can't see CSS text-transform, so the case is baked into the string
  // handed to it — the DOM copy above stays in natural case.
  // The poster size is a clamp(), so dot size and sampling step have to follow it.
  // Absolute pixel values tuned for the desktop cut came out coarse and mushy at
  // mobile widths. Quantised so a resize only rebuilds at real thresholds.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const size = parseFloat(getComputedStyle(el).fontSize) || 0;
      setFontPx(Math.round(size / 8) * 8);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = fontPx > 0 ? fontPx / 68 : 1;
  const particleSize = Math.min(3.2, Math.max(1.35, Number(scale.toFixed(2))));
  const density = Math.min(4, Math.max(2, Math.round(scale)));

  const visual = uppercase ? label.toLocaleUpperCase('pt-BR') : label;
  const useParticles = mounted && !reduced && !!colors && fontPx > 0;

  return (
    <span
      ref={boxRef}
      className={cn('relative block w-full', className)}
      style={{ height: `${heightEm}em` }}
    >
      {/* The one and only copy of the text.
          Natural case in the DOM (so crawlers and screen readers get "João", not
          "JOÃO"), uppercased visually by the inherited `.display` transform, and
          faded — not hidden — once the dots land, which keeps it in the
          accessibility tree and in the page's text for search engines. */}
      <span
        className={cn(
          'absolute inset-0 flex items-center uppercase transition-opacity duration-500 ease-expo',
          tone === 'brand' ? 'text-brand' : 'text-ink',
          ready ? 'opacity-0' : 'opacity-100',
        )}
        style={{ lineHeight: 1 }}
      >
        {label}
      </span>

      {useParticles && (
        <span
          className={cn(
            'absolute inset-0 block transition-opacity duration-700 ease-expo',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <ParticleText
            text={visual}
            align="left"
            /* `inherit` + `1em` resolve against this element's poster font size */
            fontFamily="inherit"
            fontSize="1em"
            fontWeight={800}
            color={colors.base}
            highlightColor={colors.highlight}
            glow={false}
            particleSize={particleSize}
            density={density}
            /* poster type needs a much bigger budget than the component's default */
            maxParticles={16000}
            scatter={150}
            gatherDuration={1500}
            stagger={stagger}
            idleDrift={0.5}
            pointerRepel={44}
            repelRadius={130}
            onReady={() => setReady(true)}
          />
        </span>
      )}
    </span>
  );
}
