import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { certifications, cv, profile, timeline } from '@/content/profile';
import { toLocale, type Locale } from '@/content/types';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/libs/site';
import { PrintButton } from './print-button';

/**
 * The CV, generated from the same content layer as the site.
 *
 * `scripts/capture-cv.mjs` prints this route to public/curriculo.pdf and
 * public/resume.pdf. One column, real text, no icons: that is what an
 * applicant tracking system can parse.
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
    robots: { index: false, follow: true },
  };
}

const monthLabel = (value: string, locale: Locale, present: string) => {
  if (!value) return present;
  const [year, month] = value.split('-');
  if (!month) return year;
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })
    .replace('.', '')
    .replace(' de ', ' ');
};

const shownCertifications = cv.certificationIds.flatMap((id) => {
  const cert = certifications.find((item) => item.id === id);
  return cert ? [cert] : [];
});

export default async function Cv({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = toLocale(locale);
  const t = await getTranslations('cv');

  const studies = timeline.filter((entry) => entry.relation === 'school');
  const linkedin = profile.socials.find((s) => s.key === 'linkedin');
  const github = profile.socials.find((s) => s.key === 'github');

  const contacts = [
    profile.location.label[loc],
    profile.contact.email,
    profile.contact.phoneDisplay,
    linkedin ? 'linkedin.com/in/joaovitorkc' : null,
    github ? 'github.com/joaovitorkc' : null,
    profile.domain,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="cv-root bg-white text-[#111]">
      <PrintButton label={t('save')} backLabel={t('back')} />

      <article className="cv-page">
        <header className="border-b border-[#111] pb-3">
          <h1 className="text-[26px] font-bold leading-tight">{profile.fullName}</h1>
          <p className="mt-1 text-[14px] font-semibold">{cv.title[loc]}</p>
        </header>

        <p className="mt-2 text-[10.5px] leading-[1.45] text-[#222]">{contacts.join(' · ')}</p>

        <section className="cv-block mt-3">
          <h2 className="cv-label">{t('summary')}</h2>
          <p className="mt-2 text-[11.5px] leading-[1.5] text-[#222]">{cv.summary[loc]}</p>
        </section>

        <section className="mt-3">
          <h2 className="cv-label">{t('experience')}</h2>

          {cv.roles.map((role) => (
            <div key={role.id} className="cv-block mt-3">
              <h3 className="text-[13px] font-bold leading-tight">
                {role.title[loc]}
                {role.from && (
                  <span className="font-normal text-[#333]">
                    {' '}
                    · {monthLabel(role.from, loc, t('present'))} —{' '}
                    {role.to ? monthLabel(role.to, loc, t('present')) : t('present')}
                  </span>
                )}
              </h3>

              <p className="mt-0.5 text-[11px] text-[#333]">
                {role.org} · {role.arrangement[loc]} · {role.place[loc]}
              </p>
              <p className="mt-1 text-[11px] leading-[1.45] text-[#222]">{role.context[loc]}</p>

              <ul className="mt-1 space-y-0.5">
                {role.bullets[loc].map((bullet) => (
                  <li
                    key={bullet}
                    className="cv-bullet flex gap-2 text-[10.5px] leading-[1.35] text-[#222]"
                  >
                    <span aria-hidden className="shrink-0">
                      •
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="cv-block mt-3">
          <h2 className="cv-label">{t('stackTitle')}</h2>
          <dl className="mt-2 space-y-1">
            {cv.skills.map((group) => (
              <div key={group.title[loc]} className="text-[11px] leading-[1.45]">
                <dt className="inline font-semibold">{group.title[loc]}: </dt>
                <dd className="inline">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-3">
          <h2 className="cv-label">{t('education')}</h2>
          {studies.map((entry) => (
            <div key={entry.id} className="cv-block mt-2">
              <h3 className="text-[12px] font-bold leading-tight">
                {entry.title[loc]}
                <span className="font-normal text-[#333]">
                  {' '}
                  · {monthLabel(entry.from, loc, t('present'))}
                  {entry.to && entry.to !== entry.from
                    ? ` — ${monthLabel(entry.to, loc, t('present'))}`
                    : entry.to
                      ? ''
                      : ` — ${t('present')}`}
                </span>
              </h3>
              <p className="text-[11px] text-[#222]">{entry.org}</p>
              <p className="mt-0.5 text-[11px] leading-[1.45] text-[#222]">{cv.education[loc]}</p>
            </div>
          ))}
        </section>

        <section className="cv-block mt-3">
          <h2 className="cv-label">{t('certifications')}</h2>
          <ul className="mt-2 space-y-1">
            {shownCertifications.map((cert) => (
              <li key={cert.id} className="text-[11px] leading-[1.4] text-[#222]">
                <span className="font-semibold">{cert.year}</span> {cert.title[loc]} — {cert.issuer}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-block mt-3">
          <h2 className="cv-label">{t('languages')}</h2>
          <ul className="mt-2 space-y-1">
            {cv.languages.map((lang) => (
              <li key={lang.name[loc]} className="text-[11px] leading-[1.4] text-[#222]">
                {lang.name[loc]} — {lang.level[loc]}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
