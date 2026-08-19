import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { chapters } from '@/libs/chapters';
import { projects } from '@/content/projects';
import Footer from '@/components/sections/footer';

/** A 404 must never be indexed, and must never be a dead end. */
export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <>
      <section className="relative flex min-h-[70svh] flex-col justify-center overflow-hidden pb-16 pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 dots opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_20%,transparent_75%)]"
        />

        <div className="dossier-shell">
          <div className="flex items-baseline gap-4 rule-b pb-4">
            <span className="label text-brand">404</span>
            <span className="label text-ink-muted">{t('notFound.label')}</span>
            <span className="ml-auto label hidden text-ink-faint sm:block">REF · JVCS-404</span>
          </div>

          <h1 className="display mt-10 max-w-4xl text-step-6">{t('notFound.title')}</h1>

          <p className="mt-6 max-w-xl text-step-0 text-ink-muted">{t('notFound.body')}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-3 border-rule border-ink bg-ink px-6 py-4 text-paper transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
              <span className="label">{t('notFound.home')}</span>
            </Link>
            <Link
              href="/#contact"
              className="flex items-center gap-3 border-rule border-ink px-6 py-4 transition-colors hover:bg-ink hover:text-paper"
            >
              <span className="label">{t('contact.title')}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* A 404 is still a crawlable page — give it real links out. */}
          <div className="mt-16 grid gap-10 rule-t pt-8 md:grid-cols-2">
            <nav aria-label={t('nav.chapters')}>
              <h2 className="label mb-4 text-ink-faint">{t('nav.chapters')}</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <Link
                      href={`/#${chapter.id}`}
                      className="link-draw text-step--1 text-ink-muted transition-colors hover:text-ink"
                    >
                      {t(`chapters.${chapter.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={t('palette.groups.projects')}>
              <h2 className="label mb-4 text-ink-faint">{t('palette.groups.projects')}</h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/work/${project.slug}`}
                      className="link-draw text-step--1 text-ink-muted transition-colors hover:text-ink"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
