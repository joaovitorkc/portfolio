import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import { getGithubSnapshot } from '@/libs/github';
import { toLocale } from '@/content/types';
import { chapterNum } from '@/libs/chapters';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';

/**
 * Live GitHub signals.
 *
 * A server component on purpose: the fetch happens on the server with an hour
 * of cache, so no API key ships to the browser and there is no client-side
 * loading spinner. If GitHub is unreachable the chapter degrades to a note.
 */
export default async function Signals() {
  const t = await getTranslations();
  const locale = toLocale(await getLocale());
  const snapshot = await getGithubSnapshot();

  const dateFmt = new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Chapter
      id="signals"
      num={chapterNum('signals')}
      label={t('chapters.signals')}
      tone="surface"
      title={
        <div className="grid grid-cols-12 items-end gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-7">
            {t('signals.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-5">
            <p className="max-w-md text-step--1 text-ink-muted">{t('signals.note')}</p>
          </Reveal>
        </div>
      }
    >
      {!snapshot ? (
        <Reveal className="mt-12">
          <p className="border-rule border-hairline bg-paper p-6 text-step--1 text-ink-muted">
            {t('signals.unavailable')}
          </p>
        </Reveal>
      ) : (
        <div className="mt-12 md:mt-16">
          {/* headline numbers */}
          <Reveal
            className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-3"
            stagger={0.07}
            distance={20}
          >
            <Stat label={t('signals.reposLabel')} value={String(snapshot.publicRepos)} />
            <Stat label={t('signals.followersLabel')} value={String(snapshot.followers)} />
            <Stat
              label={t('signals.sinceLabel')}
              value={dateFmt.format(new Date(snapshot.createdAt))}
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-12 gap-y-12 md:gap-x-10">
            {/* languages */}
            <div className="col-span-12 lg:col-span-5">
              <h3 className="label rule-b pb-3 text-ink-faint">{t('signals.languagesLabel')}</h3>
              <ul className="mt-5 space-y-4">
                {snapshot.languages.map((lang) => (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-step--1 font-medium">{lang.name}</span>
                      <span className="label tabular text-ink-faint">
                        {lang.count} · {Math.round(lang.share * 100)}%
                      </span>
                    </div>
                    {/* a real distribution, not a self-assessed skill bar */}
                    <div className="mt-2 h-1.5 w-full bg-hairline">
                      <div
                        className="h-full bg-brand"
                        style={{ width: `${Math.max(4, Math.round(lang.share * 100))}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* recent pushes */}
            <div className="col-span-12 lg:col-span-7">
              <h3 className="label rule-b pb-3 text-ink-faint">{t('signals.recentLabel')}</h3>
              <ul>
                {snapshot.recent.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rule-b py-4 transition-colors hover:bg-paper"
                    >
                      <GitBranch
                        className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-brand"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-mono text-step--1 font-medium">{repo.name}</span>
                          {repo.language && (
                            <span className="label text-brand">{repo.language}</span>
                          )}
                          <span className="label ml-auto text-ink-faint">
                            {t('signals.updated')} {dateFmt.format(new Date(repo.pushedAt))}
                          </span>
                        </span>
                        {repo.description && (
                          <span className="mt-1.5 block text-step--2 leading-snug text-ink-muted">
                            {repo.description}
                          </span>
                        )}
                      </span>
                      <ArrowUpRight
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={snapshot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 label link-draw text-ink-muted transition-colors hover:text-ink"
              >
                {t('signals.viewProfile')}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      )}
    </Chapter>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-6">
      <p className="label mb-3 text-ink-faint">{label}</p>
      <p className="display tabular text-step-4 leading-none">{value}</p>
    </div>
  );
}

/**
 * Streaming placeholder for the chapter above.
 *
 * The GitHub call lives inside the page render, so without a Suspense boundary
 * the whole document waits on api.github.com before the browser sees a single
 * byte of the hero. With one, the shell streams instantly and this stands in
 * until the data lands.
 *
 * Chapter 05 sits far below the fold, so the height swap when real content
 * arrives happens off-screen and contributes nothing to CLS.
 */
export function SignalsSkeleton() {
  return (
    <section id="signals" aria-hidden className="relative bg-surface-1 py-chapter">
      <div className="dossier-shell">
        <header className="mb-10 flex items-baseline gap-4 rule-b pb-4 md:mb-16">
          <span className="label text-brand">05</span>
          <span className="label text-ink-faint">— — —</span>
        </header>

        <div className="h-[calc(2*var(--step-5,3rem))] max-w-2xl bg-ink/[0.06]" />

        <div className="grid-cells mt-12 grid grid-cols-1 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-paper p-6">
              <div className="mb-4 h-2 w-24 bg-ink/10" />
              <div className="h-8 w-20 bg-ink/[0.08]" />
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="h-2 w-32 rule-b bg-ink/10 pb-3" />
            <ul className="mt-5 space-y-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <li key={i}>
                  <div className="h-3 w-28 bg-ink/[0.07]" />
                  <div className="mt-2 h-1.5 w-full bg-hairline" />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="h-2 w-40 bg-ink/10" />
            <ul className="mt-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="rule-b py-4">
                  <div className="h-3 w-40 bg-ink/[0.07]" />
                  <div className="mt-2 h-2.5 w-64 max-w-full bg-ink/[0.05]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
