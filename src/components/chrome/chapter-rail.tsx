'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';
import { chapters } from '@/libs/chapters';
import { gsap, prefersReducedMotion, registerMotion, scrollState } from '@/libs/motion';
import { useUi } from '@/stores/ui.store';
import { useSmoothScroll } from './smooth-scroll';

/**
 * Fixed index rail — the spine of the dossier.
 *
 * Doubles as the reading-progress indicator, which is why there is no
 * separate progress bar pinned to the top of the page.
 */
export default function ChapterRail() {
  const t = useTranslations();
  const activeChapter = useUi((s) => s.activeChapter);
  const { scrollTo } = useSmoothScroll();
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerMotion();
    const el = progressRef.current;
    if (!el) return;

    const readProgress = () => {
      if (scrollState.progress) return scrollState.progress;
      // reduced-motion path: Lenis is off, so compute it natively
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    if (prefersReducedMotion()) {
      const onScroll = () => {
        gsap.set(el, { scaleY: readProgress() });
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const tick = () => {
      gsap.set(el, { scaleY: readProgress() });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      /* sits inside the gutter that .dossier-shell reserves at xl+ */
      style={{ paddingLeft: 'max(var(--gutter), calc((100vw - 96rem) / 2 + var(--gutter)))' }}
    >
      <div className="relative flex items-stretch gap-3">
        {/* the spine + progress fill */}
        <div className="relative w-px bg-hairline">
          <span
            ref={progressRef}
            className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>

        <ul className="pointer-events-auto flex flex-col gap-3 py-1">
          {chapters.map((c) => {
            const active = activeChapter === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => scrollTo(`#${c.id}`, -72)}
                  className="group flex items-center gap-2 text-left"
                >
                  <span
                    className={cn(
                      'label tabular transition-colors',
                      active ? 'text-brand' : 'text-ink-faint group-hover:text-ink',
                    )}
                  >
                    {c.num}
                  </span>
                  <span
                    className={cn(
                      'label whitespace-nowrap transition-all duration-300 ease-expo',
                      active
                        ? 'max-w-[12rem] text-ink opacity-100'
                        : 'max-w-0 overflow-hidden opacity-0 group-hover:max-w-[12rem] group-hover:opacity-100',
                    )}
                  >
                    {t(`chapters.${c.key}`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
