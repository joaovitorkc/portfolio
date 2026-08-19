'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLocale, useTranslations } from 'next-intl';
import { gsap, prefersReducedMotion, registerMotion, SplitText } from '@/libs/motion';
import { manifesto } from '@/content/profile';
import { toLocale } from '@/content/types';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';

/**
 * The pinned chapter.
 *
 * The section is 260vh tall and pins for its middle; scrolling scrubs the
 * statement in word by word. This is the single most "cinematic" moment on the
 * page, so it is also the one most carefully gated behind reduced motion —
 * with motion off, it degrades to a plain, fully legible block of text.
 */
export default function Manifesto() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const ref = useRef<HTMLDivElement>(null);
  const lines = manifesto.lines[locale];

  useGSAP(
    () => {
      registerMotion();
      const root = ref.current;
      if (!root) return;
      if (prefersReducedMotion()) return;

      const body = root.querySelector<HTMLElement>('[data-manifesto-body]');
      const pinWrap = root.querySelector<HTMLElement>('[data-manifesto-pin]');
      if (!body || !pinWrap) return;

      const split = SplitText.create(body.querySelectorAll('p'), {
        type: 'words',
        autoSplit: true,
        onSplit(self) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              pin: pinWrap,
              pinSpacing: false,
              scrub: 0.6,
            },
          });

          // Words go from faint to full as you scroll. Reading, not decoration.
          tl.fromTo(
            self.words,
            { opacity: 0.14 },
            { opacity: 1, stagger: 0.55, ease: 'none', duration: 1 },
          );

          return tl;
        },
      });

      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Chapter
      id="manifesto"
      num="01"
      label={t('chapters.manifesto')}
      title={
        <TextReveal as="h2" className="display max-w-4xl text-step-5 text-balance" stagger={0.09}>
          {manifesto.lead[locale]}
        </TextReveal>
      }
    >
      <div ref={ref} className="relative mt-14 h-[260vh] md:mt-20">
        <div data-manifesto-pin className="flex min-h-[100svh] items-center py-10">
          <div className="grid w-full grid-cols-12 gap-6">
            <div className="col-span-12 hidden lg:col-span-2 lg:block">
              <span className="label text-ink-faint">
                {t('manifesto.label')}
                <br />
                <span className="text-brand">01 / 08</span>
              </span>
            </div>

            <div data-manifesto-body className="col-span-12 space-y-5 lg:col-span-9">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={
                    i === lines.length - 1
                      ? 'serif-italic text-step-3 leading-tight text-brand'
                      : 'text-step-2 font-medium leading-tight'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Reveal>
        <p className="mt-6 flex items-center gap-4 rule-t pt-6 text-step-0 text-ink-muted">
          <span className="label text-brand">✳</span>
          {manifesto.close[locale]}
        </p>
      </Reveal>
    </Chapter>
  );
}
