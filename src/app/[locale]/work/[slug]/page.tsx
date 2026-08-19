import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getProject, projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { absoluteUrl } from '@/libs/site';
import { languageAlternates, ogLocale, OG_IMAGE, projectSchema } from '@/libs/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Marquee } from '@/components/fx/marquee';
import Footer from '@/components/sections/footer';

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const loc = toLocale(locale);
  const title = `${project.name} — ${project.kicker[loc]}`;
  const description = project.summary[loc];

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/${locale}/work/${slug}`),
      languages: languageAlternates(`/work/${slug}`),
    },
    openGraph: {
      type: 'article',
      siteName: profile.fullName,
      locale: ogLocale(loc),
      alternateLocale: loc === 'pt' ? 'en_US' : 'pt_BR',
      title,
      description,
      url: absoluteUrl(`/${locale}/work/${slug}`),
      images: [{ ...OG_IMAGE, alt: title, type: 'image/png' }],
      authors: [profile.fullName],
      tags: project.tech,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: OG_IMAGE.url, alt: title }],
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const loc = toLocale(locale);
  const t = await getTranslations();

  // Dossier reference letters are assigned in render order, so a project
  // without an architecture or modules block never leaves a gap in the sequence.
  let markIndex = 0;
  const nextMark = () => String.fromCharCode(65 + markIndex++);
  const markContext = nextMark();
  const markProblem = nextMark();
  const markApproach = nextMark();
  const markArchitecture = project.architecture?.length ? nextMark() : null;
  const markModules = project.modules?.length ? nextMark() : null;
  const markHardParts = project.hardParts?.length ? nextMark() : null;
  const markResponsibilities = nextMark();
  const markOutcome = nextMark();

  // Sequential links keep every case study two clicks from the others, which
  // matters for crawl depth when the index is a single page.
  const position = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(position + 1) % projects.length];

  const record = [
    { label: t('work.roleLabel'), value: project.role[loc] },
    { label: t('work.sectorLabel'), value: project.sector[loc] },
    { label: t('work.yearLabel'), value: project.year[loc] },
    { label: t('work.statusLabel'), value: t(`work.status.${project.status}`) },
  ];

  return (
    <>
      <JsonLd data={projectSchema(project, loc)} />

      <article>
        {/* ---------------- masthead ---------------- */}
        <header className="relative overflow-hidden rule-b pb-14 pt-28 md:pb-20 md:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 dots opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_20%,transparent_75%)]"
          />

          <div className="dossier-shell">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 label text-ink-muted transition-colors hover:text-brand"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
              {t('work.backToIndex')}
            </Link>

            <div className="mt-10 flex items-baseline gap-4 rule-b pb-4">
              <span className="label text-brand">{project.index}</span>
              <span className="label text-ink-muted">{t('chapters.work')}</span>
              <span className="ml-auto label hidden text-ink-faint sm:block">
                REF · JVCS-{project.index}
              </span>
            </div>

            <TextReveal as="h1" className="display mt-8 text-poster" immediate stagger={0.08}>
              {project.name}
            </TextReveal>

            <p className="mt-6 max-w-3xl text-step-2 leading-snug">
              <span className="serif-italic text-brand">{project.kicker[loc]}</span>
            </p>

            <dl className="mt-14 grid grid-cols-2 rule-t md:grid-cols-4">
              {record.map((row, i) => (
                <div
                  key={row.label}
                  className={`py-5 md:px-6 ${i > 0 ? 'md:rule-l' : ''} ${i % 2 === 1 ? 'rule-l pl-5 md:pl-6' : ''}`}
                >
                  <dt className="label mb-2 text-ink-faint">{row.label}</dt>
                  <dd className="text-step--1 font-medium leading-snug">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-rule border-ink bg-ink px-6 py-4 text-paper transition-colors hover:bg-brand hover:text-brand-foreground"
                >
                  <span className="label">{t('work.visitLive')}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">({t('a11y.externalLink')})</span>
                </a>
              )}
              {project.codeVisibility === 'private' && (
                <p className="flex max-w-sm items-start gap-2.5 text-step--2 leading-snug text-ink-faint">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>
                    <span className="font-medium text-ink-muted">{t('work.privateCode')}.</span>{' '}
                    {t('work.privateCodeHint')}
                  </span>
                </p>
              )}
            </div>
          </div>
        </header>

        {/* ---------------- metrics ---------------- */}
        <section aria-labelledby="case-metrics" className="bg-ink text-paper">
          <div className="dossier-shell py-14 md:py-20">
            <h2 id="case-metrics" className="label mb-8 text-paper/45">
              {t('work.case.metricsLabel')}
            </h2>
            <div className="grid grid-cols-2 gap-px bg-paper/15 md:grid-cols-3 xl:grid-cols-6">
              {project.metrics.map((m) => (
                <div key={m.label[loc]} className="bg-ink p-5">
                  <p className="display tabular text-step-4 leading-none text-brand">{m.value}</p>
                  <p className="mt-3 text-step--2 font-medium uppercase leading-tight tracking-wide text-paper/75">
                    {m.label[loc]}
                  </p>
                  {m.hint && (
                    <p className="mt-2 text-step--2 leading-snug text-paper/45">{m.hint[loc]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- narrative ---------------- */}
        <div className="dossier-shell py-16 md:py-24">
          <div className="grid grid-cols-12 gap-y-14 md:gap-x-10">
            <Prose
              id="context"
              index={markContext}
              label={t('work.case.context')}
              body={project.context[loc]}
            />
            <Prose
              id="problem"
              index={markProblem}
              label={t('work.case.problem')}
              body={project.problem[loc]}
              accent
            />
            <Prose
              id="approach"
              index={markApproach}
              label={t('work.case.approach')}
              body={project.approach[loc]}
            />
          </div>
        </div>

        {/* ---------------- architecture ---------------- */}
        {project.architecture?.length && markArchitecture ? (
          <section aria-labelledby="case-architecture" className="bg-surface-1">
            <div className="dossier-shell py-16 md:py-24">
              <div className="flex items-baseline gap-4 rule-b pb-4">
                <span className="label text-brand">{markArchitecture}</span>
                <h2 id="case-architecture" className="label text-ink-muted">
                  {t('work.case.architecture')}
                </h2>
              </div>

              <ol className="mt-2">
                {project.architecture.map((layer) => (
                  <Reveal key={layer.step} from="bottom" distance={22}>
                    <li className="grid grid-cols-12 gap-y-4 rule-b py-8 md:gap-x-10">
                      <div className="col-span-12 flex items-baseline gap-4 md:col-span-3">
                        <span className="display text-step-4 leading-none text-brand">
                          {layer.step}
                        </span>
                        <h3 className="display text-step-2 leading-none">{layer.name[loc]}</h3>
                      </div>
                      <div className="col-span-12 md:col-span-6">
                        <p className="text-step-0 leading-relaxed text-ink-muted">
                          {layer.detail[loc]}
                        </p>
                      </div>
                      <ul className="col-span-12 flex flex-wrap gap-1.5 self-start md:col-span-3 md:justify-end">
                        {layer.tech.map((tech) => (
                          <li
                            key={tech}
                            className="border-rule border-hairline bg-paper px-2.5 py-1 text-step--2 text-ink-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ---------------- modules ---------------- */}
        {project.modules?.length && markModules ? (
          <section aria-labelledby="case-modules" className="dossier-shell py-16 md:py-24">
            <div className="flex items-baseline gap-4 rule-b pb-4">
              <span className="label text-brand">{markModules}</span>
              <h2 id="case-modules" className="label text-ink-muted">
                {t('work.case.modules')}
              </h2>
            </div>

            <Reveal
              className="mt-8 grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 xl:grid-cols-3"
              stagger={0.06}
              distance={20}
            >
              {project.modules.map((mod, i) => (
                <article
                  key={mod.name}
                  className="group flex min-h-[14rem] flex-col justify-between bg-paper p-6 transition-colors hover:bg-brand hover:text-brand-foreground"
                >
                  <div className="flex items-baseline justify-between gap-3 rule-b pb-3">
                    <span className="label text-ink-faint transition-colors group-hover:text-brand-foreground/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="label text-right text-ink-faint transition-colors group-hover:text-brand-foreground/70">
                      {mod.tag[loc]}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className="display text-step-2 leading-none">{mod.name}</h3>
                    <p className="mt-4 text-step--1 leading-relaxed text-ink-muted transition-colors group-hover:text-brand-foreground/85">
                      {mod.body[loc]}
                    </p>
                  </div>
                </article>
              ))}
            </Reveal>
          </section>
        ) : null}

        {/* ---------------- hard parts ---------------- */}
        {project.hardParts?.length && markHardParts ? (
          <section aria-labelledby="case-hard" className="bg-surface-1">
            <div className="dossier-shell py-16 md:py-24">
              <div className="flex items-baseline gap-4 rule-b pb-4">
                <span className="label text-brand">{markHardParts}</span>
                <h2 id="case-hard" className="label text-ink-muted">
                  {t('work.case.hardParts')}
                </h2>
              </div>

              <div className="mt-2">
                {project.hardParts.map((part, i) => (
                  <Reveal key={part.title[loc]} from="bottom" distance={22}>
                    <div className="grid grid-cols-12 gap-y-4 rule-b py-9 md:gap-x-10">
                      {/* The index sits outside the <h3> so the heading's text is
                          exactly the title — "01Authorization…" is what a crawler
                          would otherwise read. */}
                      <div className="col-span-12 flex items-start gap-4 md:col-span-5">
                        <span aria-hidden className="label mt-1.5 shrink-0 text-ink-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="display text-step-2 leading-tight">{part.title[loc]}</h3>
                      </div>
                      <p className="col-span-12 text-step-0 leading-relaxed text-ink-muted md:col-span-7">
                        {part.body[loc]}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ---------------- responsibilities + outcome ---------------- */}
        <section className="dossier-shell py-16 md:py-24">
          <div className="grid grid-cols-12 gap-y-14 md:gap-x-10">
            <div className="col-span-12 lg:col-span-5">
              <div className="flex items-baseline gap-4 rule-b pb-4">
                <span className="label text-brand">{markResponsibilities}</span>
                <h2 className="label text-ink-muted">{t('work.case.responsibilities')}</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {project.responsibilities[loc].map((item) => (
                  <li key={item} className="flex gap-3 text-step--1 leading-relaxed text-ink-muted">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-baseline gap-4 rule-b pb-4">
                <span className="label text-brand">{markOutcome}</span>
                <h2 className="label text-ink-muted">{t('work.case.outcome')}</h2>
              </div>
              <p className="mt-6 text-step-1 leading-snug">{project.outcome[loc]}</p>

              {project.learned ? (
                <div className="mt-10 border-rule border-ink bg-paper p-6 md:p-8">
                  <h3 className="label mb-5 text-ink-faint">{t('work.case.learned')}</h3>
                  <ol className="space-y-4">
                    {project.learned[loc].map((item, i) => (
                      <li key={item} className="flex gap-4">
                        <span className="label mt-1 shrink-0 tabular text-brand">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-step-0 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ---------------- stack strip ---------------- */}
        <section aria-labelledby="case-stack" className="rule-t bg-brand text-brand-foreground">
          <h2 id="case-stack" className="sr-only">
            {t('work.case.stackLabel')}
          </h2>
          <Marquee speed={48} coupling={0.28} itemClassName="gap-6 pr-6">
            {[...project.tech, ...project.tech].map((tech, i) => (
              <span key={`${tech}-${i}`} className="flex items-center gap-6 whitespace-nowrap py-3">
                <span className="label">{tech}</span>
                <span aria-hidden>·</span>
              </span>
            ))}
          </Marquee>
        </section>

        {/* ---------------- next ---------------- */}
        <nav aria-label={t('work.case.next')} className="dossier-shell py-16 md:py-24">
          <Reveal className="grid gap-4 lg:grid-cols-2">
            {nextProject && nextProject.slug !== project.slug && (
              <Link
                href={`/work/${nextProject.slug}`}
                className="group flex flex-col justify-between gap-8 border-rule border-ink p-6 transition-colors hover:bg-ink hover:text-paper md:p-10"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="label text-ink-faint transition-colors group-hover:text-paper/55">
                    {t('work.case.nextProject')}
                  </span>
                  <span className="label text-brand">{nextProject.index}</span>
                </span>
                <span>
                  <span className="display block text-step-4 leading-none">{nextProject.name}</span>
                  <span className="mt-3 flex items-center gap-2 label text-brand">
                    {nextProject.kicker[loc]}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </span>
              </Link>
            )}

            <Link
              href="/#contact"
              className="group flex flex-col justify-between gap-8 border-rule border-ink bg-brand p-6 text-brand-foreground transition-colors hover:bg-ink hover:text-paper md:p-10"
            >
              <span className="label opacity-70">{t('work.case.next')}</span>
              <span className="flex items-end justify-between gap-4">
                <span className="display block text-step-4 leading-none">{t('contact.title')}</span>
                <ArrowUpRight
                  className="h-9 w-9 shrink-0 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>
        </nav>
      </article>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Prose({
  id,
  index,
  label,
  body,
  accent = false,
}: {
  id: string;
  index: string;
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <section aria-labelledby={`case-${id}`} className="col-span-12 lg:col-span-4">
      <div className="flex items-baseline gap-4 rule-b pb-4">
        <span className="label text-brand">{index}</span>
        <h2 id={`case-${id}`} className="label text-ink-muted">
          {label}
        </h2>
      </div>
      <Reveal>
        <p
          className={
            accent
              ? 'mt-6 text-step-1 leading-snug text-ink'
              : 'mt-6 text-step-0 leading-relaxed text-ink-muted'
          }
        >
          {body}
        </p>
      </Reveal>
    </section>
  );
}
