'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { EASE, gsap, prefersReducedMotion, registerMotion } from '@/libs/motion';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { HalftonePortrait } from '@/components/fx/halftone-portrait';
import { ParticleName } from '@/components/fx/particle-name';
import { Marquee } from '@/components/fx/marquee';
import { Magnetic } from '@/components/fx/magnetic';
import { Monogram } from '@/components/brand/monogram';
import { useSmoothScroll } from '@/components/chrome/smooth-scroll';

export default function Hero() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      registerMotion();
      const root = ref.current;
      if (!root) return;
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(root);

      // ---- entrance: the cover assembles itself ----
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      // The name is not animated here — ParticleName's own gather is its entrance.
      tl.from(q('[data-hero-portrait]'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.35,
        ease: 'power4.inOut',
        delay: 0.25,
      })
        .from(q('[data-hero-meta]'), { opacity: 0, y: 18, duration: 0.85, stagger: 0.07 }, 0.62)
        .from(q('[data-hero-lede]'), { opacity: 0, y: 22, duration: 0.9 }, 0.7)
        .from(q('[data-hero-cta]'), { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, 0.85)
        .from(q('[data-hero-strip]'), { opacity: 0, duration: 0.8 }, 0.95);

      // ---- exit: the cover leaves at a different speed than the page ----
      gsap.to(q('[data-hero-title]'), {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-hero-portrait]'), {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-hero-fade]'), {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: '55% top', scrub: true },
      });
    },
    { scope: ref },
  );

  const meta = [
    { label: t('hero.roleLabel'), value: profile.role[locale] },
    { label: t('hero.basedLabel'), value: `${profile.location.city}, ${profile.location.state}` },
    { label: t('hero.sinceLabel'), value: '2023' },
    { label: t('contact.availability'), value: profile.availability.label[locale], live: true },
  ];

  return (
    <section
      ref={ref}
      id="cover"
      aria-label={t('chapters.cover')}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* --- background layers --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 dots opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,#000_20%,transparent_75%)]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-hairline" />
      </div>

      <div className="dossier-shell flex flex-1 flex-col justify-center pb-10 pt-28 md:pt-32">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10">
          {/* ---------- type block ---------- */}
          <div className="col-span-12 lg:col-span-8">
            <div data-hero-fade className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 animate-pulse-dot bg-brand" />
              </span>
              <span className="label text-ink-muted">{t('hero.eyebrow')}</span>
              <span className="h-px flex-1 bg-hairline" />
              <span className="label hidden text-ink-faint sm:block">JVCS · {profile.domain}</span>
            </div>

            <h1 data-hero-title className="display text-poster">
              <ParticleName label={t('hero.line1')} tone="ink" stagger={360} />{' '}
              <ParticleName
                label={t('hero.line2')}
                tone="brand"
                stagger={520}
                className="-mt-[0.2em]"
              />
            </h1>

            <p
              data-hero-lede
              className="mt-8 max-w-2xl text-step-1 leading-snug text-ink-muted md:mt-10"
            >
              <span className="serif-italic text-ink">{profile.headline[locale]}</span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <div data-hero-cta>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollTo('#work', -72)}
                    className="group flex items-center gap-3 border-rule border-ink bg-ink px-6 py-4 text-paper transition-colors hover:bg-brand hover:text-brand-foreground"
                  >
                    <span data-magnetic-inner className="label">
                      {t('hero.cta')}
                    </span>
                    <ArrowDown
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                      aria-hidden
                    />
                  </button>
                </Magnetic>
              </div>

              <div data-hero-cta>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollTo('#contact', -72)}
                    className="group flex items-center gap-3 border-rule border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-paper"
                  >
                    <span data-magnetic-inner className="label">
                      {t('hero.ctaSecondary')}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* ---------- portrait ---------- */}
          <figure className="relative col-span-12 sm:col-span-7 lg:col-span-4">
            <Stamp className="absolute -bottom-6 -left-14 z-10 hidden h-28 w-28 text-ink/30 lg:block" />
            <div
              data-hero-portrait
              className="relative border-rule border-ink"
              style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            >
              <HalftonePortrait
                src="/profile-portrait.webp"
                alt={t('hero.portraitAlt')}
                className="aspect-[4/5] w-full"
                cell={6}
              />
              <span className="absolute -left-px -top-px h-3 w-3 border-l-rule border-t-rule border-brand" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b-rule border-r-rule border-brand" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="label text-ink-faint">{profile.fullName.toUpperCase()}</span>
              <span className="label hidden text-ink-faint md:block">{t('hero.portraitHint')}</span>
            </figcaption>
          </figure>
        </div>

        {/* ---------- dossier data strip ---------- */}
        <dl data-hero-strip className="mt-14 grid grid-cols-2 rule-t md:mt-16 md:grid-cols-4">
          {meta.map((m, i) => (
            <div
              key={m.label}
              data-hero-meta
              className={`px-0 py-5 md:px-6 ${i > 0 ? 'md:rule-l' : ''} ${i % 2 === 1 ? 'rule-l pl-5 md:pl-6' : ''}`}
            >
              <dt className="label mb-2 text-ink-faint">{m.label}</dt>
              <dd className="flex items-center gap-2 text-step--1 font-medium leading-snug">
                {m.live && <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot bg-brand" />}
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ---------- ticker ---------- */}
      <div className="relative rule-t bg-brand text-brand-foreground">
        <Marquee speed={52} coupling={0.3} itemClassName="gap-8 pr-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap py-3">
              <span className="label">{t('hero.ticker')}</span>
              <Monogram plate="none" tone="current" className="h-3 w-3 shrink-0" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Rotating archival stamp                                             */
/* ------------------------------------------------------------------ */

function Stamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`animate-stamp-spin ${className ?? ''}`} aria-hidden>
      <defs>
        <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        fill="currentColor"
        style={{ fontSize: 13, letterSpacing: '0.32em', fontFamily: 'var(--font-mono)' }}
      >
        <textPath href="#stamp-circle" startOffset="0%">
          FULL STACK · SAÚDE PÚBLICA · CARUARU PE · BRASIL ·
        </textPath>
      </text>
    </svg>
  );
}
