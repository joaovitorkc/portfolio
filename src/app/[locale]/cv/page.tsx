import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  certifications,
  clientOrgs,
  cv,
  ownOrgs,
  profile,
  stack,
  stackName,
  timeline,
} from '@/content/profile';
import { projects } from '@/content/projects';
import { toLocale, type Locale } from '@/content/types';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/libs/site';
import { Monogram } from '@/components/brand/monogram';
import { PrintButton } from './print-button';

/**
 * The CV, generated from the same content layer as the site.
 *
 * Replaces a hand-made PDF that could — and did — drift out of date. The page
 * is the source; `scripts/capture-cv.mjs` renders this exact route to
 * public/curriculo.pdf and public/resume.pdf, so the file and the page can
 * never disagree.
 *
 * Built for A4 and for print:
 *  · real selectable text, never an image — ATS parsers read it
 *  · `print-color-adjust: exact` so the ink bands and the orange survive
 *  · `break-inside: avoid` so no entry gets split across the page fold
 *  · the site chrome (nav, rail, grain, crosshair) is suppressed via :has()
 */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cv' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: absoluteUrl(`/${locale}/cv`) },
    // A CV page competing with the home page for the same queries helps nobody.
    robots: { index: false, follow: true },
  };
}

const monthLabel = (value: string, locale: Locale, present: string) => {
  if (!value) return present;
  const [year, month] = value.split('-');
  if (!month) return year;
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })
    .replace('.', '');
};

export default async function Cv({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = toLocale(locale);
  const t = await getTranslations('cv');

  // Only formal education here — the courses and certificates have their own
  // section, and listing them twice on a two-page CV reads as padding.
  const studies = timeline.filter((entry) => entry.relation === 'school');
  const dailyStack = stack.map((group) => ({
    title: group.title[loc],
    items: group.items
      .filter((item) => item.depth !== 'learning')
      .map((item) => stackName(item, loc)),
  }));

  return (
    <div className="cv-root bg-white text-[#111]">
      <PrintButton label={t('save')} backLabel={t('back')} />

      <article className="cv-page">
        {/* ───────── header ───────── */}
        <header className="flex items-start justify-between gap-8 border-b-[1.5px] border-[#111] pb-5">
          <div>
            <h1 className="font-display text-[38px] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
              {profile.fullName}
            </h1>
            <p className="mt-2 text-[13px] font-semibold text-[#FF5A1F]">{profile.role[loc]}</p>
          </div>
          <Monogram plate="ink" label={profile.fullName} className="h-12 w-12 shrink-0" />
        </header>

        {/* ───────── contact strip ───────── */}
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] text-[#444]">
          <li>{profile.location.label[loc]}</li>
          <li>{profile.contact.email}</li>
          <li>{profile.contact.phoneDisplay}</li>
          <li>{profile.domain}</li>
          {profile.socials
            .filter((s) => s.key !== 'instagram')
            .map((s) => (
              <li key={s.key}>
                {s.label} {s.handle}
              </li>
            ))}
        </ul>

        {/* ───────── summary ───────── */}
        <section className="cv-block mt-6">
          <h2 className="cv-label">{t('summary')}</h2>
          <p className="mt-2 text-[11.5px] leading-[1.55] text-[#222]">{cv.summary[loc]}</p>
        </section>

        {/* ───────── impact ───────── */}
        <section className="cv-block mt-5">
          <h2 className="cv-label">{t('impact')}</h2>
          <div className="mt-2 flex divide-x-[1.5px] divide-[#DDD] border-y-[1.5px] border-[#111]">
            {cv.impact.map((metric) => (
              <div key={metric.value} className="flex-1 px-3 py-2.5 first:pl-0">
                <p className="font-display text-[19px] font-extrabold leading-none">
                  {metric.value}
                </p>
                <p className="mt-1 text-[8.5px] uppercase leading-tight tracking-[0.06em] text-[#555]">
                  {metric.label[loc]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── experience ───────── */}
        <section className="mt-6">
          <h2 className="cv-label">{t('experience')}</h2>

          {cv.roles.map((role) => (
            <div key={role.id} className="cv-block mt-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-[15px] font-extrabold uppercase leading-tight">
                  {role.title[loc]}
                </h3>
                {role.from && (
                  <span className="text-[10px] font-semibold text-[#555]">
                    {monthLabel(role.from, loc, t('present'))} —{' '}
                    {role.to ? monthLabel(role.to, loc, t('present')) : t('present')}
                  </span>
                )}
              </div>

              <p className="mt-1 text-[10.5px] text-[#555]">
                <span className="font-semibold uppercase tracking-[0.08em] text-[#FF5A1F]">
                  {t('client')}
                </span>{' '}
                {role.org} · {role.place[loc]}
              </p>

              <ul className="mt-2.5 space-y-1.5">
                {role.bullets[loc].map((bullet) => (
                  <li
                    key={bullet}
                    className="cv-bullet flex gap-2 text-[11px] leading-[1.5] text-[#222]"
                  >
                    <span aria-hidden className="mt-[6px] h-[3px] w-[3px] shrink-0 bg-[#FF5A1F]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-2.5 text-[9.5px] leading-relaxed text-[#666]">
                <span className="font-semibold uppercase tracking-[0.08em]">{t('stackLabel')}</span>{' '}
                {role.stack.join(' · ')}
              </p>
            </div>
          ))}
        </section>
      </article>

      {/* ═════════ page 2 ═════════ */}
      <article className="cv-page">
        {/* ───────── systems ───────── */}
        <section className="cv-block">
          <h2 className="cv-label">{t('systems')}</h2>
          <p className="mt-1.5 text-[9.5px] text-[#666]">{t('systemsNote')}</p>
          <ul className="mt-2.5 divide-y-[1.5px] divide-[#EEE] border-y-[1.5px] border-[#111]">
            {projects.map((project) => (
              <li key={project.slug} className="cv-bullet flex items-baseline gap-3 py-[5px]">
                <span className="w-[100px] shrink-0 font-display text-[10.5px] font-extrabold uppercase leading-tight">
                  {project.name}
                </span>
                <span className="flex-1 text-[10px] leading-[1.4] text-[#333]">
                  {project.kicker[loc]}
                </span>
                {project.client && (
                  <span className="w-[86px] shrink-0 text-[8.5px] uppercase tracking-[0.06em] text-[#888]">
                    {project.client}
                  </span>
                )}
                <span className="w-[112px] shrink-0 text-right text-[8.5px] uppercase tracking-[0.06em] text-[#888]">
                  {project.tech.slice(0, 2).join(' · ')}
                </span>
              </li>
            ))}
          </ul>
        </section>
        {/* ───────── stack ───────── */}
        <section className="cv-block mt-6">
          <h2 className="cv-label">{t('stackTitle')}</h2>
          <dl className="mt-2.5 space-y-2">
            {dailyStack.map((group) => (
              <div key={group.title} className="flex gap-3">
                <dt className="w-[96px] shrink-0 text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-[#555]">
                  {group.title}
                </dt>
                <dd className="flex-1 text-[10.5px] leading-[1.5] text-[#222]">
                  {group.items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ───────── education ───────── */}
        <section className="mt-6">
          <h2 className="cv-label">{t('education')}</h2>
          {studies.map((entry, index) => (
            <div key={entry.id} className="cv-block mt-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[12px] font-bold leading-tight">{entry.title[loc]}</h3>
                <span className="text-[9.5px] font-semibold text-[#555]">
                  {monthLabel(entry.from, loc, t('present'))}
                  {entry.to && entry.to !== entry.from
                    ? ` — ${monthLabel(entry.to, loc, t('present'))}`
                    : entry.to
                      ? ''
                      : ` — ${t('present')}`}
                </span>
              </div>
              <p className="text-[10px] text-[#FF5A1F]">{entry.org}</p>
              {index === 0 && (
                <p className="mt-1 text-[10px] leading-[1.45] text-[#333]">{entry.detail[loc]}</p>
              )}
            </div>
          ))}
        </section>

        {/* ───────── certifications ───────── */}
        <section className="cv-block mt-6">
          <h2 className="cv-label">{t('certifications')}</h2>
          <ul className="mt-2.5 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="flex gap-2 text-[10px] leading-[1.4]">
                <span className="w-[28px] shrink-0 font-semibold text-[#FF5A1F]">{cert.year}</span>
                <span className="flex-1 text-[#222]">
                  {cert.title[loc]}
                  <span className="text-[#666]"> — {cert.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ───────── clients + languages ───────── */}
        <div className="mt-6 grid grid-cols-2 gap-8">
          <section className="cv-block">
            <h2 className="cv-label">{t('clients')}</h2>
            <ul className="mt-2.5 space-y-1.5">
              {ownOrgs.map((org) => (
                <li key={org.id} className="text-[10.5px] leading-[1.4]">
                  <span className="font-bold">{org.name}</span>
                  <span className="text-[#666]"> — {t('ownCompany')}</span>
                </li>
              ))}
              {clientOrgs.map((org) => (
                <li key={org.id} className="text-[10.5px] leading-[1.4]">
                  <span className="font-bold">{org.name}</span>
                  <span className="text-[#666]"> — {org.sector[loc]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-block">
            <h2 className="cv-label">{t('languages')}</h2>
            <ul className="mt-2.5 space-y-1.5">
              {cv.languages.map((lang) => (
                <li key={lang.name[loc]} className="text-[10.5px] leading-[1.4]">
                  <span className="font-bold">{lang.name[loc]}</span>
                  <span className="text-[#666]"> — {lang.level[loc]}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ───────── footer band ───────── */}
        <footer className="mt-auto flex items-center justify-between gap-4 border-t-[1.5px] border-[#111] pt-3">
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#555]">
            {profile.fullName}
          </span>
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#555]">
            {profile.domain}
          </span>
        </footer>
      </article>
    </div>
  );
}
