'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { Marquee, VelocitySkew } from '@/components/fx/marquee';
import { useSmoothScroll } from '@/components/chrome/smooth-scroll';

export default function Footer() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* oversized name marquee — the closing signature */}
      <div className="rule-b border-paper/15 py-6">
        <VelocitySkew max={2.5}>
          <Marquee speed={44} coupling={0.34} itemClassName="gap-10 pr-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                <span className="display text-step-6 leading-none">{profile.fullName}</span>
                <span aria-hidden className="text-brand text-step-4">
                  ✳
                </span>
              </span>
            ))}
          </Marquee>
        </VelocitySkew>
      </div>

      <div className="dossier-shell grid grid-cols-12 gap-y-10 py-14 md:gap-x-8">
        {/* identity */}
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border-rule border-brand bg-brand font-display text-sm font-extrabold text-brand-foreground">
              {profile.initials}
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-extrabold uppercase tracking-tight">
                {profile.name}
              </span>
              <span className="label mt-1 text-paper/50">{profile.role[locale]}</span>
            </span>
          </div>

          <p className="mt-6 max-w-sm text-step--1 leading-relaxed text-paper/65">
            {profile.headline[locale]}
          </p>

          <p className="mt-6 label text-paper/40">
            © {year} {profile.fullName}. {t('footer.rights')}
          </p>
        </div>

        {/* links */}
        <nav className="col-span-6 md:col-span-3" aria-label={t('palette.groups.social')}>
          <h2 className="label mb-4 rule-b border-paper/15 pb-3 text-paper/40">
            {t('palette.groups.social')}
          </h2>
          <ul className="space-y-2.5">
            {profile.socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-step--1 text-paper/75 transition-colors hover:text-brand"
                >
                  {s.label}
                  <span className="label text-paper/35">{s.handle}</span>
                  <ArrowUpRight
                    className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-step--1 text-paper/75 transition-colors hover:text-brand"
              >
                {profile.contact.email}
              </a>
            </li>
          </ul>
        </nav>

        {/* colophon */}
        <div className="col-span-6 md:col-span-4">
          <h2 className="label mb-4 rule-b border-paper/15 pb-3 text-paper/40">
            {t('footer.colophonLabel')}
          </h2>
          <dl className="space-y-3 text-step--2 text-paper/65">
            <div>
              <dt className="label text-paper/35">{t('footer.typeLabel')}</dt>
              <dd className="mt-1">
                Bricolage Grotesque · Instrument Sans · Instrument Serif · JetBrains Mono
              </dd>
            </div>
            <div>
              <dt className="label text-paper/35">Build</dt>
              <dd className="mt-1">{t('footer.builtWith')}</dd>
            </div>
            <div>
              <dt className="label text-paper/35">{t('footer.sourceLabel')}</dt>
              <dd className="mt-1">
                <a
                  href="https://github.com/joaovitorkc/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-paper/85 transition-colors hover:text-brand"
                >
                  github.com/joaovitorkc/portfolio
                </a>
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => scrollTo('#cover')}
            className="mt-8 flex items-center gap-2 border-rule border-paper/25 px-4 py-3 transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            <span className="label">{t('footer.backTop')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
