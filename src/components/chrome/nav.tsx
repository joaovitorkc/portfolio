'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Command, Moon, Sun, X } from 'lucide-react';
import { cn } from '@/libs/utils';
import { chapters, navChapters } from '@/libs/chapters';
import { profile } from '@/content/profile';
import { Monogram } from '@/components/brand/monogram';
import { useUi } from '@/stores/ui.store';
import { useSmoothScroll } from './smooth-scroll';

export default function Nav() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const { setTheme, resolvedTheme } = useTheme();

  const activeChapter = useUi((s) => s.activeChapter);
  const menuOpen = useUi((s) => s.menuOpen);
  const setMenuOpen = useUi((s) => s.setMenuOpen);
  const togglePalette = useUi((s) => s.togglePalette);

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    // Offset by the bar so the chapter header isn't hidden under it.
    scrollTo(`#${id}`, -72);
  };

  const otherLocale = locale === 'pt' ? 'en' : 'pt';
  const switchLocale = () => router.replace(pathname, { locale: otherLocale });
  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled ? 'bg-paper rule-b' : 'bg-transparent',
        )}
      >
        <div className="dossier-shell flex h-16 items-center gap-4">
          {/* monogram */}
          <button
            type="button"
            onClick={() => goTo('cover')}
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label={t('nav.top')}
          >
            <Monogram
              plate="ink"
              label={profile.fullName}
              className="h-9 w-9 border-rule border-ink transition-opacity group-hover:opacity-80"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-extrabold uppercase tracking-tight">
                {profile.name}
              </span>
              <span className="label mt-1 text-ink-faint">{t('hero.eyebrow')}</span>
            </span>
          </button>

          {/* desktop chapters */}
          <nav aria-label={t('nav.chapters')} className="ml-auto hidden items-center gap-1 lg:flex">
            {navChapters.map((c) => {
              const active = activeChapter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goTo(c.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'group relative flex items-baseline gap-1.5 px-3 py-2 transition-colors',
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn('label', active ? 'text-brand' : 'text-ink-faint')}
                  >
                    {c.num}
                  </span>
                  <span className="text-step--1 font-medium">{t(`chapters.${c.key}`)}</span>
                  <span
                    className={cn(
                      'absolute inset-x-3 bottom-1 h-px origin-left bg-brand transition-transform duration-300 ease-expo',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </button>
              );
            })}
          </nav>

          {/* actions */}
          <div className={cn('flex items-center gap-2', 'lg:ml-4', 'ml-auto lg:ml-4')}>
            <button
              type="button"
              onClick={togglePalette}
              className="hidden items-center gap-2 border-rule border-hairline px-3 py-2 text-ink-muted transition-colors hover:border-ink hover:text-ink sm:flex"
              aria-label={t('palette.open')}
            >
              <Command className="h-3.5 w-3.5" aria-hidden />
              <span className="label">K</span>
            </button>

            <button
              type="button"
              onClick={switchLocale}
              className="border-rule border-hairline px-3 py-2 transition-colors hover:border-ink"
              aria-label={t('nav.language.title')}
            >
              <span className="label">
                <span className={locale === 'pt' ? 'text-ink' : 'text-ink-faint'}>PT</span>
                <span className="text-ink-faint"> / </span>
                <span className={locale === 'en' ? 'text-ink' : 'text-ink-faint'}>EN</span>
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border-rule border-hairline transition-colors hover:border-ink"
              aria-label={t('nav.theme.title')}
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : (
                <Moon className="h-4 w-4" aria-hidden />
              )}
            </button>

            {/* mobile menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 items-center gap-2 border-rule border-ink bg-ink px-3 text-paper lg:hidden"
              aria-label={t('nav.menu')}
              aria-expanded={menuOpen}
            >
              <span className="label">{t('nav.index')}</span>
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={cn(
          'fixed inset-0 z-[70] bg-paper transition-[opacity,visibility] duration-300 lg:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        role="dialog"
        aria-modal={menuOpen}
        aria-label={t('nav.chapters')}
      >
        <div className="dossier-shell flex h-16 items-center justify-between rule-b">
          <span className="label text-ink-faint">{t('nav.index')}</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center border-rule border-ink"
            aria-label={t('nav.close')}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <nav className="dossier-shell flex flex-col py-4">
          {chapters.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => goTo(c.id)}
              className="group flex items-baseline gap-4 rule-b py-4 text-left"
            >
              <span aria-hidden className="label w-8 shrink-0 text-brand">
                {c.num}
              </span>
              <span className="display text-step-3 transition-colors group-hover:text-brand">
                {t(`chapters.${c.key}`)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
