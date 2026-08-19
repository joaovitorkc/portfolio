'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { clientOrgs, ownOrgs, type Org } from '@/content/profile';
import { projects } from '@/content/projects';
import { toLocale, type Locale } from '@/content/types';
import { chapterNum } from '@/libs/chapters';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Monogram } from '@/components/brand/monogram';

/**
 * Two tiers, on purpose.
 *
 * Quiral Labs is his own company; Wi Consultoria and Catsuc Labs hired him.
 * Rendering all three as one "clients" grid would both inflate the client count
 * and misdescribe the first one, so the section states the difference instead of
 * hiding it — the own company gets a wide banded block, the clients get cards.
 *
 * Client cards pull their case studies straight out of the project registry via
 * the `client` field, so the section is wired to the actual work rather than
 * being a logo wall.
 */
export default function Clients() {
  const t = useTranslations();
  const locale = toLocale(useLocale());

  return (
    <Chapter
      id="clients"
      num={chapterNum('clients')}
      label={t('chapters.clients')}
      title={
        <div className="grid grid-cols-12 gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-7">
            {t('clients.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-5">
            <p className="max-w-md text-step-0 text-ink-muted">{t('clients.intro')}</p>
          </Reveal>
        </div>
      }
    >
      {/* ---------- tier 1: his own company ---------- */}
      {ownOrgs.map((org) => (
        <Reveal key={org.id} className="mt-14 md:mt-20">
          <a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-rule border-ink bg-ink text-paper transition-colors hover:bg-brand hover:text-brand-foreground"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 rule-b border-paper/20 px-5 py-4 group-hover:border-ink/20 md:px-8">
              <span className="label text-brand group-hover:text-brand-foreground">
                {t('clients.ownLabel')}
              </span>
              <span className="label text-paper/55 group-hover:text-brand-foreground/70">
                {org.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              </span>
            </div>

            <div className="grid grid-cols-12 items-center gap-6 px-5 py-8 md:px-8 md:py-10">
              <div className="col-span-12 flex items-center gap-5 lg:col-span-5">
                <Monogram plate="none" tone="current" className="h-10 w-10 shrink-0" />
                <span>
                  <span className="display block text-step-4 leading-none">{org.name}</span>
                  <span className="mt-2 block label text-paper/55 group-hover:text-brand-foreground/70">
                    {org.sector[locale]}
                  </span>
                </span>
              </div>

              <p className="col-span-12 text-step-0 leading-relaxed text-paper/75 group-hover:text-brand-foreground/85 lg:col-span-6">
                {org.what[locale]}
              </p>

              <span className="col-span-12 lg:col-span-1 lg:justify-self-end">
                <ArrowUpRight
                  className="h-8 w-8 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                  aria-hidden
                />
                <span className="sr-only">({t('a11y.externalLink')})</span>
              </span>
            </div>
          </a>
        </Reveal>
      ))}

      {/* ---------- tier 2: the clients ---------- */}
      <div className="mt-16 md:mt-20">
        <Reveal className="flex flex-wrap items-baseline gap-4 rule-b pb-4">
          <h3 className="display text-step-2 leading-none">{t('clients.clientsTitle')}</h3>
          <span className="h-px flex-1 bg-hairline" />
          <span className="label text-ink-faint">
            {t('clients.count', { count: clientOrgs.length })}
          </span>
        </Reveal>

        <Reveal
          className="grid-cells mt-8 grid grid-cols-1 lg:grid-cols-2"
          stagger={0.08}
          distance={22}
        >
          {clientOrgs.map((org) => (
            <ClientCard key={org.id} org={org} locale={locale} />
          ))}
        </Reveal>
      </div>
    </Chapter>
  );
}

function ClientCard({ org, locale }: { org: Org; locale: Locale }) {
  const t = useTranslations();
  // Wired to the registry: whatever was delivered for this client shows up here.
  const delivered = projects.filter((p) => p.client === org.name);

  return (
    <article className="group flex min-h-[20rem] flex-col justify-between p-6 transition-colors hover:bg-ink hover:text-paper md:p-8">
      <div>
        <div className="flex items-baseline justify-between gap-3 rule-b pb-3">
          <span className="label text-brand">{t('clients.clientLabel')}</span>
          {org.since && (
            <span className="label text-ink-faint transition-colors group-hover:text-paper/55">
              {t('clients.since')} {org.since.replace('-', '/')}
            </span>
          )}
        </div>

        <h4 className="display mt-6 text-step-3 leading-none">{org.name}</h4>
        <p className="mt-2.5 label text-brand">{org.sector[locale]}</p>

        <p className="mt-5 text-step--1 leading-relaxed text-ink-muted transition-colors group-hover:text-paper/75">
          {org.what[locale]}
        </p>
      </div>

      <div className="mt-8">
        {delivered.length > 0 && (
          <>
            <p className="label mb-3 text-ink-faint transition-colors group-hover:text-paper/55">
              {t('clients.delivered', { count: delivered.length })}
            </p>
            <ul className="mb-6 flex flex-wrap gap-1.5">
              {delivered.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="block border-rule border-hairline px-2.5 py-1 text-step--2 text-ink-muted transition-colors hover:border-brand hover:text-brand group-hover:border-paper/25 group-hover:text-paper/70"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 label link-draw"
        >
          {org.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">({t('a11y.externalLink')})</span>
        </a>
      </div>
    </article>
  );
}
