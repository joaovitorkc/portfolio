'use client';

import { useEffect } from 'react';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import {
  ArrowUpRight,
  Copy,
  FileDown,
  Github,
  Instagram,
  Languages,
  Linkedin,
  SunMoon,
  TerminalSquare,
} from 'lucide-react';
import { chapters } from '@/libs/chapters';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { toLocale } from '@/content/types';
import { useUi } from '@/stores/ui.store';
import { useSmoothScroll } from './smooth-scroll';

const socialIcon = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export default function CommandPalette() {
  const t = useTranslations();
  const localeParam = useLocale();
  const locale = toLocale(localeParam);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const { scrollTo, stop, start } = useSmoothScroll();

  const open = useUi((s) => s.paletteOpen);
  const setOpen = useUi((s) => s.setPaletteOpen);
  const togglePalette = useUi((s) => s.togglePalette);
  const requestTerminalFocus = useUi((s) => s.requestTerminalFocus);

  // ⌘K / Ctrl+K anywhere, and "/" when not already typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePalette]);

  // Freeze the smooth scroller while the palette owns the screen.
  useEffect(() => {
    if (open) stop();
    else start();
  }, [open, start, stop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const run = (fn: () => void) => {
    setOpen(false);
    // let the dialog unmount before we move the page
    requestAnimationFrame(fn);
  };

  const isHome = pathname === '/';

  if (!open) return null;

  const goChapter = (id: string) =>
    run(() => {
      if (isHome) {
        scrollTo(`#${id}`, -72);
      } else {
        router.push(`/#${id}`);
      }
    });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('palette.open')}
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
    >
      {/* click-outside surface; not a tab stop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
      />
      <Command
        label={t('palette.open')}
        className="relative w-full max-w-xl border-rule border-ink bg-paper shadow-[8px_8px_0_0_hsl(var(--ink))]"
      >
        <div className="flex items-center gap-3 rule-b px-4 py-3">
          <span className="label text-brand">⌘K</span>
          <Command.Input
            autoFocus
            placeholder={t('palette.placeholder')}
            className="w-full bg-transparent text-step-0 text-ink outline-none placeholder:text-ink-faint"
          />
        </div>

        <Command.List className="max-h-[52vh] overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="px-3 py-8 text-center text-step--1 text-ink-muted">
            {t('palette.empty')}
          </Command.Empty>

          <Group heading={t('palette.groups.chapters')}>
            {chapters.map((c) => (
              <Item key={c.id} onSelect={() => goChapter(c.id)}>
                <span className="label w-7 text-ink-faint">{c.num}</span>
                <span>{t(`chapters.${c.key}`)}</span>
              </Item>
            ))}
          </Group>

          <Group heading={t('palette.groups.projects')}>
            {projects.map((p) => (
              <Item key={p.slug} onSelect={() => run(() => router.push(`/work/${p.slug}`))}>
                <span className="label w-7 text-ink-faint">{p.index}</span>
                <span>{p.name}</span>
                <span className="ml-auto truncate text-step--2 text-ink-faint">
                  {p.kicker[locale]}
                </span>
              </Item>
            ))}
          </Group>

          <Group heading={t('palette.groups.actions')}>
            <Item
              onSelect={() => run(() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'))}
              icon={<SunMoon className="h-4 w-4" aria-hidden />}
            >
              {t('palette.actions.toggleTheme')}
            </Item>
            <Item
              onSelect={() =>
                run(() => router.replace(pathname, { locale: locale === 'pt' ? 'en' : 'pt' }))
              }
              icon={<Languages className="h-4 w-4" aria-hidden />}
            >
              {t('palette.actions.switchLang')}
            </Item>
            <Item
              onSelect={() =>
                run(() => {
                  navigator.clipboard?.writeText(profile.contact.email);
                  toast.success(t('contact.copied'), { description: profile.contact.email });
                })
              }
              icon={<Copy className="h-4 w-4" aria-hidden />}
            >
              {t('palette.actions.copyEmail')}
            </Item>
            <Item
              onSelect={() =>
                run(() => {
                  const link = document.createElement('a');
                  link.href = profile.resume[locale];
                  link.download = `joaovitorkc-${locale === 'en' ? 'resume' : 'curriculo'}.pdf`;
                  link.click();
                })
              }
              icon={<FileDown className="h-4 w-4" aria-hidden />}
            >
              {t('palette.actions.downloadResume')}
            </Item>
            <Item
              onSelect={() =>
                run(() => {
                  if (isHome) {
                    scrollTo('#terminal', -72);
                    setTimeout(requestTerminalFocus, 900);
                  } else {
                    router.push('/#terminal');
                  }
                })
              }
              icon={<TerminalSquare className="h-4 w-4" aria-hidden />}
            >
              {t('palette.actions.openTerminal')}
            </Item>
          </Group>

          <Group heading={t('palette.groups.social')}>
            {profile.socials.map((s) => {
              const Icon = socialIcon[s.key as keyof typeof socialIcon] ?? ArrowUpRight;
              return (
                <Item
                  key={s.key}
                  onSelect={() => run(() => window.open(s.url, '_blank', 'noopener,noreferrer'))}
                  icon={<Icon className="h-4 w-4" aria-hidden />}
                >
                  {s.label}
                  <span className="ml-auto text-step--2 text-ink-faint">{s.handle}</span>
                </Item>
              );
            })}
          </Group>
        </Command.List>

        <div className="flex items-center justify-between rule-t px-4 py-2">
          <span className="label text-ink-faint">↑ ↓ · ↵ · esc</span>
          <span className="label text-ink-faint">{t('palette.hint')}</span>
        </div>
      </Command>
    </div>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:label mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-ink-faint"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
  icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-step--1 text-ink-muted transition-colors data-[selected=true]:bg-ink data-[selected=true]:text-paper"
    >
      {icon}
      {children}
    </Command.Item>
  );
}
