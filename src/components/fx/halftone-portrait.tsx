'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/libs/utils';
import { isCoarsePointer, prefersReducedMotion } from '@/libs/motion';

/**
 * Risograph halftone portrait, rendered on a 2D canvas.
 *
 * The image is sampled on a grid and each cell becomes a dot sized by that
 * cell's luminance — the same trick a newspaper press uses. Chosen over a
 * WebGL shader on purpose: no extra dependency, works on every device, and
 * the printed-matter look is exactly the art direction.
 *
 * Hovering (pointer devices only) cross-fades to the real photograph.
 */
export function HalftonePortrait({
  src,
  alt,
  className,
  cell = 6,
  /** dot radius multiplier — >1 lets dark areas bleed into each other */
  bleed = 1.16,
}: {
  src: string;
  alt: string;
  className?: string;
  cell?: number;
  bleed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const image = imageRef.current;
    if (!canvas || !wrap || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = wrap.getBoundingClientRect();
    if (rect.width === 0) return;

    // Cap DPR at 2 — beyond that we pay memory for dots nobody can see.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Sample the image into a small offscreen buffer at grid resolution.
    const cols = Math.max(1, Math.floor(w / cell));
    const rows = Math.max(1, Math.floor(h / cell));
    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const octx = off.getContext('2d');
    if (!octx) return;

    // cover-fit the source into the grid
    const scale = Math.max(cols / image.width, rows / image.height);
    const dw = image.width * scale;
    const dh = image.height * scale;
    octx.drawImage(image, (cols - dw) / 2, (rows - dh) / 2, dw, dh);

    const data = octx.getImageData(0, 0, cols, rows).data;

    const styles = getComputedStyle(document.documentElement);
    const inkToken = styles.getPropertyValue('--ink').trim();
    const paperToken = styles.getPropertyValue('--paper').trim();
    const brandToken = styles.getPropertyValue('--brand').trim();

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = `hsl(${paperToken})`;
    ctx.fillRect(0, 0, w, h);

    const maxR = (cell / 2) * bleed;

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const i = (y * cols + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255;
        if (a < 0.15) continue;

        // Rec. 709 luminance
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        // Dark pixels get big dots. Gamma pushes midtones open so the face reads.
        const strength = Math.pow(1 - lum, 1.35) * a;
        if (strength < 0.04) continue;

        // Two-colour separation: the deepest 18% prints in brand orange,
        // which is what makes it read as risograph rather than grayscale.
        ctx.fillStyle = strength > 0.82 ? `hsl(${brandToken})` : `hsl(${inkToken})`;

        const radius = maxR * strength;
        ctx.beginPath();
        ctx.arc(x * cell + cell / 2, y * cell + cell / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [bleed, cell]);

  useEffect(() => {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    image.onload = () => {
      imageRef.current = image;
      setLoaded(true);
      draw();
    };
    return () => {
      image.onload = null;
    };
  }, [draw, src]);

  // Redraw on resize and on theme change (the palette lives in CSS vars).
  useEffect(() => {
    if (!loaded) return;
    draw();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw, loaded, resolvedTheme]);

  const interactive = !prefersReducedMotion() && !isCoarsePointer();

  return (
    <div
      ref={wrapRef}
      className={cn('relative isolate overflow-hidden bg-paper', className)}
      onPointerEnter={interactive ? () => setHovered(true) : undefined}
      onPointerLeave={interactive ? () => setHovered(false) : undefined}
    >
      {/* The real photograph, revealed under the dots on hover. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={cn(
          'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-expo',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{ filter: 'saturate(0.9) contrast(1.04)' }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          'relative h-full w-full transition-opacity duration-700 ease-expo',
          hovered ? 'opacity-0' : 'opacity-100',
        )}
      />
      {/* Fallback while the canvas is empty — never a blank hole. */}
      {!loaded && <span className="absolute inset-0 dots" aria-hidden />}
    </div>
  );
}
