'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import { cn } from '@/libs/utils';
import { certifications, profile, timeline } from '@/content/profile';
import { toLocale, type Locale } from '@/content/types';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Magnetic } from '@/components/fx/magnetic';

/** A period label that never repeats itself: "2022", not "2022 — 2022". */
function formatRange(from: string, to: string | null, locale: Locale, presentLabel: string) {
  const start = formatMonth(from, locale);
  if (!to) return `${start} — ${presentLabel}`;
  const end = formatMonth(to, locale);
  return start === end ? start : `${start} — ${end}`;
}

/** "2023-03" → "mar 2023" in the reader's locale. */
function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split('-');
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date
    .toLocaleDateString(locale === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })
    .replace('.', '');
}

export default function Trajectory() {
  const t = useTranslations();
  const locale = toLocale(useLocale());

  const download = () => {
    const link = document.createElement('a');
    link.href = profile.resume[locale];
    link.download = `joaovitorkc-${locale === 'en' ? 'resume' : 'curriculo'}.pdf`;
    link.click();
  };

  return (
    <Chapter
      id="trajectory"
      num="04"
      label={t('chapters.trajectory')}
      title={
        <div className="grid grid-cols-12 items-end gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-7">
            {t('trajectory.title')}
          </TextReveal>
          <Reveal className="col-span-12 lg:col-span-5 lg:justify-self-end">
            <Magnetic>
              <button
                type="button"
                onClick={download}
                className="group flex items-center gap-3 border-rule border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-paper"
              >
                <Download className="h-4 w-4" aria-hidden />
                <span data-magnetic-inner className="label">
                  {t('trajectory.resume')}
                </span>
                <span className="label text-ink-faint transition-colors group-hover:text-paper/60">
                  {t('trajectory.resumeHint')}
                </span>
              </button>
            </Magnetic>
          </Reveal>
        </div>
      }
    >
      {/* ---------- timeline ---------- */}
      <ol className="mt-14 md:mt-20">
        {timeline.map((entry, i) => (
          <Reveal key={entry.id} from="bottom" distance={24}>
            <li className="grid grid-cols-12 gap-y-4 rule-t py-8 md:gap-x-8">
              {/* period */}
              <div className="col-span-12 md:col-span-3">
                <p className="label text-brand">
                  {formatRange(entry.from, entry.to, locale, t('trajectory.present'))}
                </p>
                <p className="mt-2 label text-ink-faint">{t(`trajectory.kind.${entry.kind}`)}</p>
              </div>

              {/* content */}
              <div className="col-span-12 md:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-step-3 leading-none">{entry.title[locale]}</h3>
                  <span className="text-step-0 text-brand">{entry.org}</span>
                  {entry.place && <span className="label text-ink-faint">{entry.place}</span>}
                </div>

                <p className="mt-4 max-w-3xl text-step-0 leading-relaxed text-ink-muted">
                  {entry.detail[locale]}
                </p>

                {entry.tags && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-rule border-hairline px-2.5 py-1 text-step--2 text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <span className="sr-only">{i + 1}</span>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* ---------- certifications ---------- */}
      <div className="mt-16 md:mt-24">
        <Reveal className="flex flex-wrap items-baseline gap-4 rule-b pb-4">
          <h3 className="display text-step-2 leading-none">
            {t('trajectory.certificationsTitle')}
          </h3>
          <span className="h-px flex-1 bg-hairline" />
          <span className="label text-ink-faint">{t('trajectory.certificationsNote')}</span>
        </Reveal>

        <Reveal
          className="grid-cells grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.05}
          distance={18}
        >
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="group flex min-h-[9.5rem] flex-col justify-between p-5 transition-colors hover:bg-ink hover:text-paper"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="label tabular text-brand">{cert.year}</span>
                <span
                  className={cn(
                    'label',
                    cert.kind === 'certificate' ? 'text-ink-muted' : 'text-ink-faint',
                    'transition-colors group-hover:text-paper/60',
                  )}
                >
                  {t(`trajectory.type.${cert.kind}`)}
                </span>
              </div>
              <div className="mt-6">
                <p className="text-step--1 font-semibold leading-snug">{cert.title[locale]}</p>
                <p className="mt-1.5 label text-ink-faint transition-colors group-hover:text-paper/60">
                  {cert.issuer}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </Chapter>
  );
}
