'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Lock } from 'lucide-react';
import { cn } from '@/libs/utils';
import { chapterNum } from '@/libs/chapters';
import { gsap, prefersReducedMotion, registerMotion } from '@/libs/motion';
import { featuredProjects, secondaryProjects } from '@/content/projects';
import { toLocale, type Locale } from '@/content/types';
import type { Project } from '@/content/projects';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Counter } from '@/components/fx/counter';
import { Magnetic } from '@/components/fx/magnetic';

export default function Work() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const project = featuredProjects[0];

  return (
    <Chapter
      id="work"
      num={chapterNum('work')}
      label={t('chapters.work')}
      tone="surface"
      title={
        <div className="grid grid-cols-12 gap-6">
          <TextReveal
            as="h2"
            className="display col-span-12 text-step-5 lg:col-span-7"
            stagger={0.08}
          >
            {t('work.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-5" from="bottom">
            <p className="max-w-md text-step-0 text-ink-muted">{t('work.intro')}</p>
          </Reveal>
        </div>
      }
    >
      {project ? (
        <>
          <MetricsBand project={project} locale={locale} />
          <FeaturedCard project={project} locale={locale} />
          <ModuleTrack project={project} locale={locale} />
        </>
      ) : null}

      <OtherProjects locale={locale} />
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* Metrics — real, counted numbers                                     */
/* ------------------------------------------------------------------ */

function MetricValue({ value }: { value: string }) {
  // Animate the numeric core and keep any prefix/suffix literal, so "400+"
  // counts up while "~405k" and "SIGTAP" stay exactly as written.
  const match = /^(\D*)(\d+)(\D*)$/.exec(value);
  if (match) {
    const [, prefix, digits, suffix] = match;
    return <Counter value={Number(digits)} prefix={prefix} suffix={suffix} />;
  }
  return <span className="tabular">{value}</span>;
}

function MetricsBand({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations();

  return (
    <div className="mt-14 md:mt-20">
      <div className="mb-5 flex items-baseline gap-4">
        <span className="label text-ink-faint">{t('metrics.label')}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <Reveal
        className="grid-cells grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
        stagger={0.07}
        from="bottom"
        distance={20}
      >
        {project.metrics.map((m) => (
          <div
            key={m.label[locale]}
            className="group relative bg-paper p-5 transition-colors hover:bg-ink hover:text-paper"
          >
            <p className="display text-step-4 leading-none">
              <MetricValue value={m.value} />
            </p>
            <p className="mt-3 text-step--2 font-medium uppercase leading-tight tracking-wide text-ink-muted transition-colors group-hover:text-paper/80">
              {m.label[locale]}
            </p>
            {m.hint && (
              <p className="mt-2 hidden text-step--2 leading-snug text-ink-faint transition-colors group-hover:text-paper/60 xl:block">
                {m.hint[locale]}
              </p>
            )}
          </div>
        ))}
      </Reveal>

      <p className="mt-4 label text-ink-faint">{t('metrics.note')}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured project — the dossier record                               */
/* ------------------------------------------------------------------ */

function FeaturedCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations();

  const rows = [
    { label: t('work.roleLabel'), value: project.role[locale] },
    ...(project.client ? [{ label: t('work.clientLabel'), value: project.client }] : []),
    { label: t('work.sectorLabel'), value: project.sector[locale] },
    { label: t('work.yearLabel'), value: project.year[locale] },
    { label: t('work.statusLabel'), value: t(`work.status.${project.status}`), live: true },
  ];

  return (
    <Reveal className="mt-16 md:mt-24">
      <article className="border-rule border-ink bg-paper">
        {/* header band */}
        <div className="flex flex-wrap items-center justify-between gap-4 rule-b bg-ink px-5 py-4 text-paper md:px-8">
          <div className="flex items-baseline gap-4">
            <span className="label text-brand">{project.index}</span>
            <h3 className="display text-step-3 leading-none">{project.name}</h3>
          </div>
          <span className="label text-paper/60">{project.kicker[locale]}</span>
        </div>

        <div className="grid grid-cols-12">
          {/* left: story */}
          <div className="col-span-12 p-5 md:p-8 lg:col-span-7 lg:rule-r">
            <p className="text-step-1 leading-snug">{project.summary[locale]}</p>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="border-rule border-hairline px-2.5 py-1 text-step--2 text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex items-center gap-3 border-rule border-ink bg-brand px-6 py-4 text-brand-foreground transition-colors hover:bg-ink hover:text-paper"
                >
                  <span data-magnetic-inner className="label">
                    {t('work.openCase')}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Magnetic>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-rule border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-paper"
                >
                  <span className="label">{t('work.visitLive')}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">({t('a11y.externalLink')})</span>
                </a>
              )}
            </div>

            {project.codeVisibility === 'private' && (
              <p className="mt-5 flex items-start gap-2.5 text-step--2 text-ink-faint">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>
                  <span className="font-medium text-ink-muted">{t('work.privateCode')}.</span>{' '}
                  {t('work.privateCodeHint')}
                </span>
              </p>
            )}
          </div>

          {/* right: record table */}
          <dl className="col-span-12 lg:col-span-5">
            {rows.map((row, i) => (
              <div key={row.label} className={cn('px-5 py-5 md:px-8', i > 0 && 'rule-t')}>
                <dt className="label mb-2 text-ink-faint">{row.label}</dt>
                <dd className="flex items-center gap-2 text-step--1 font-medium leading-snug">
                  {row.live && <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot bg-brand" />}
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Module track — horizontal on desktop, swipeable on touch            */
/* ------------------------------------------------------------------ */

function ModuleTrack({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const modules = project.modules ?? [];

  useGSAP(
    () => {
      registerMotion();
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;
      if (prefersReducedMotion()) return;

      // Desktop only: vertical scroll drives horizontal travel.
      // Touch keeps native horizontal swiping, which is the better interaction there.
      //
      // The pinning is CSS `position: sticky`, NOT ScrollTrigger's `pin`. That
      // matters a lot: `pin: true` wraps the element in a .pin-spacer and injects
      // ~1400px of padding-bottom *after* hydration, which shoved every section
      // below it down the page — a single shift worth more than a full viewport,
      // and the reason field CLS was 1.74. Sticky reserves its space in the
      // server-rendered CSS, so nothing moves. GSAP now only writes `x`, and a
      // transform can never cause layout shift.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const distance = () => Math.max(0, track.scrollWidth - outer.clientWidth + 48);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: outer,
            start: 'top top',
            // The scroll distance is the wrapper's own height (set in CSS below),
            // so travel and available scroll always agree.
            end: 'bottom bottom',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: outerRef },
  );

  if (modules.length === 0) return null;

  return (
    <div className="mt-16 md:mt-24">
      <div className="mb-5 flex items-baseline gap-4">
        <span className="label text-ink-faint">{t('work.case.modules')}</span>
        <span className="h-px flex-1 bg-hairline" />
        <span className="label hidden text-ink-faint md:block">↔</span>
      </div>

      {/* Height is the scroll budget for the horizontal travel, declared in CSS so
          the space exists from first paint. Mobile stays auto-height and swipes. */}
      <div ref={outerRef} className="relative md:h-[240vh]">
        <div className="flex md:sticky md:top-0 md:h-[100svh] md:items-center md:overflow-hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar md:snap-none md:overflow-visible md:pb-0"
          >
            {modules.map((mod, i) => (
              <article
                key={mod.name}
                className={cn(
                  'group flex w-[80vw] shrink-0 snap-start flex-col justify-between border-rule border-ink bg-paper p-6 transition-colors sm:w-[52vw] md:w-[30vw] md:min-h-[22rem] lg:w-[26vw]',
                  i % 3 === 1 && 'md:mt-16',
                  i % 3 === 2 && 'md:mb-16',
                  'hover:bg-brand hover:text-brand-foreground',
                )}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3 rule-b pb-3">
                    <span className="label text-ink-faint transition-colors group-hover:text-brand-foreground/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="label text-right text-ink-faint transition-colors group-hover:text-brand-foreground/70">
                      {mod.tag[locale]}
                    </span>
                  </div>
                  <h4 className="display mt-5 text-step-2 leading-none">{mod.name}</h4>
                </div>
                <p className="mt-6 text-step--1 leading-relaxed text-ink-muted transition-colors group-hover:text-brand-foreground/85">
                  {mod.body[locale]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The rest of the portfolio — one card per case study                 */
/* ------------------------------------------------------------------ */

function OtherProjects({ locale }: { locale: Locale }) {
  const t = useTranslations();
  if (secondaryProjects.length === 0) return null;

  return (
    <div className="mt-16 md:mt-24">
      <Reveal className="flex flex-wrap items-baseline gap-4 rule-b pb-4">
        <h3 className="display text-step-2 leading-none">{t('work.otherTitle')}</h3>
        <span className="h-px flex-1 bg-hairline" />
        <span className="label text-ink-faint">{t('work.otherIntro')}</span>
      </Reveal>

      <Reveal
        className="grid-cells mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        stagger={0.07}
        distance={22}
      >
        {secondaryProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex min-h-[19rem] flex-col justify-between p-6 transition-colors hover:bg-ink hover:text-paper md:p-7"
          >
            <div>
              <div className="flex items-baseline justify-between gap-3 rule-b pb-3">
                <span className="label text-brand">{p.index}</span>
                <span className="label text-right text-ink-faint transition-colors group-hover:text-paper/55">
                  {t(`work.status.${p.status}`)}
                </span>
              </div>

              <h4 className="display mt-6 text-step-3 leading-none">{p.name}</h4>
              <p className="mt-2.5 label text-brand">{p.kicker[locale]}</p>

              <p className="mt-5 text-step--1 leading-relaxed text-ink-muted transition-colors group-hover:text-paper/75">
                {p.summary[locale]}
              </p>
            </div>

            <div className="mt-6">
              <ul className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 5).map((tech) => (
                  <li
                    key={tech}
                    className="border-rule border-hairline px-2 py-0.5 text-step--2 text-ink-faint transition-colors group-hover:border-paper/25 group-hover:text-paper/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="mt-5 flex items-center gap-2 label">
                {t('work.openCaseShort')}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        ))}
      </Reveal>

      <p className="mt-5 flex items-center gap-3 label text-ink-faint">
        <span className="text-brand">+</span>
        {t('work.moreSoon')}
      </p>
    </div>
  );
}
