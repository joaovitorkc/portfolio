'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/libs/utils';
import { chapterNum } from '@/libs/chapters';
import {
  about,
  certifications,
  clientOrgs,
  orgs,
  profile,
  stack,
  timeline,
} from '@/content/profile';
import { projects } from '@/content/projects';
import { toLocale, type Locale } from '@/content/types';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { useUi } from '@/stores/ui.store';

type Line = { kind: 'in' | 'out' | 'dim' | 'brand'; text: string };

/**
 * Interactive terminal.
 *
 * Explicitly a *shortcut*, not a gate: every fact reachable here is also
 * written in plain prose in the chapters above. Portfolios that hide their
 * work behind a command prompt fail the five-second recruiter test.
 */
export default function Terminal() {
  const t = useTranslations();
  const locale = toLocale(useLocale());
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const focusRequest = useUi((s) => s.terminalFocusRequest);

  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([{ kind: 'brand', text: t('terminal.welcome') }]);
  }, [t]);

  useEffect(() => {
    if (focusRequest > 0) inputRef.current?.focus();
  }, [focusRequest]);

  // keep the newest output in view without hijacking page scroll
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const commands = useMemo(() => buildCommands(locale), [locale]);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;

      const [name, ...args] = input.toLowerCase().split(/\s+/);
      const next: Line[] = [{ kind: 'in', text: input }];

      if (name === 'clear') {
        setLines([{ kind: 'dim', text: t('terminal.cleared') }]);
        return;
      }

      if (name === 'theme') {
        const target = args[0] === 'light' || args[0] === 'dark' ? args[0] : undefined;
        setTheme(target ?? (resolvedTheme === 'dark' ? 'light' : 'dark'));
        next.push({
          kind: 'out',
          text: `theme → ${target ?? (resolvedTheme === 'dark' ? 'light' : 'dark')}`,
        });
        setLines((prev) => [...prev, ...next]);
        return;
      }

      if (name === 'lang') {
        const target =
          args[0] === 'pt' || args[0] === 'en' ? args[0] : locale === 'pt' ? 'en' : 'pt';
        next.push({ kind: 'out', text: `locale → ${target}` });
        setLines((prev) => [...prev, ...next]);
        router.replace(pathname, { locale: target });
        return;
      }

      if (name === 'open') {
        const slug = args[0];
        const project = projects.find((p) => p.slug === slug);
        if (project) {
          next.push({ kind: 'out', text: `→ /work/${project.slug}` });
          setLines((prev) => [...prev, ...next]);
          router.push(`/work/${project.slug}`);
          return;
        }
        next.push({
          kind: 'dim',
          text:
            locale === 'pt'
              ? `use: open <slug> · disponíveis: ${projects.map((p) => p.slug).join(', ')}`
              : `usage: open <slug> · available: ${projects.map((p) => p.slug).join(', ')}`,
        });
        setLines((prev) => [...prev, ...next]);
        return;
      }

      const handler = commands[name];
      if (!handler) {
        next.push({ kind: 'dim', text: `${name}: ${t('terminal.notFound')}` });
      } else {
        next.push(...handler());
      }

      setLines((prev) => [...prev, ...next]);
    },
    [commands, locale, pathname, resolvedTheme, router, setTheme, t],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    run(value);
    setHistory((prev) => [value, ...prev]);
    setHistoryIndex(-1);
    setValue('');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setValue(nextIndex >= 0 ? history[nextIndex] : '');
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const partial = value.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((c) => c.startsWith(partial));
      if (match) setValue(match);
    }
  };

  return (
    <Chapter
      id="terminal"
      num={chapterNum('terminal')}
      label={t('chapters.terminal')}
      title={
        <div className="grid grid-cols-12 gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-7">
            {t('terminal.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-5">
            <p className="max-w-md text-step--1 text-ink-muted">{t('terminal.intro')}</p>
          </Reveal>
        </div>
      }
    >
      <Reveal className="mt-12 md:mt-16">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <div
          className="border-rule border-ink bg-ink text-paper"
          onClick={() => inputRef.current?.focus()}
        >
          {/* title bar */}
          <div className="flex items-center justify-between gap-4 rule-b border-paper/20 px-4 py-2.5">
            <span className="label text-paper/55">
              {profile.domain} — {locale === 'pt' ? 'dossiê' : 'dossier'}
            </span>
            <span className="label text-paper/40">{t('terminal.hint')}</span>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label={t('chapters.terminal')}
            className="h-[22rem] overflow-y-auto overscroll-contain p-4 font-mono text-step--1 leading-relaxed md:h-[26rem] md:p-6"
          >
            {lines.map((line, i) => (
              <p
                key={i}
                className={cn(
                  'whitespace-pre-wrap break-words',
                  line.kind === 'in' && 'mt-3 text-paper',
                  line.kind === 'out' && 'text-paper/85',
                  line.kind === 'dim' && 'text-paper/45',
                  line.kind === 'brand' && 'text-brand',
                )}
              >
                {line.kind === 'in' ? <span className="text-brand">❯ </span> : null}
                {line.text}
              </p>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-3 rule-t border-paper/20 px-4 py-3 md:px-6"
          >
            <label htmlFor="terminal-input" className="sr-only">
              {t('terminal.inputLabel')}
            </label>
            <span aria-hidden className="font-mono text-brand">
              ❯
            </span>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="help"
              className="w-full bg-transparent font-mono text-step--1 text-paper outline-none placeholder:text-paper/35"
            />
            <span aria-hidden className="animate-blink font-mono text-brand">
              ▌
            </span>
          </form>
        </div>
      </Reveal>
    </Chapter>
  );
}

/* ------------------------------------------------------------------ */
/* Command registry — all output derives from the content layer         */
/* ------------------------------------------------------------------ */

function buildCommands(locale: Locale): Record<string, () => Line[]> {
  const pt = locale === 'pt';
  const out = (text: string): Line => ({ kind: 'out', text });
  const dim = (text: string): Line => ({ kind: 'dim', text });
  const brand = (text: string): Line => ({ kind: 'brand', text });

  const years = Math.floor(
    (Date.now() - new Date(profile.careerStart).getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );

  // Clients, not an employer — read from the content layer so the positioning
  // can never drift between the page and the terminal.
  const clientNames = clientOrgs.map((o) => o.name).join(', ');
  const clientLine = pt ? `clientes: ${clientNames}` : `clients: ${clientNames}`;

  const commands: Record<string, () => Line[]> = {
    help: () => [
      brand(pt ? 'comandos disponíveis' : 'available commands'),
      out('  whoami        ' + (pt ? 'quem eu sou' : 'who I am')),
      out('  about         ' + (pt ? 'o resumo longo' : 'the long version')),
      out('  stack         ' + (pt ? 'ferramentas por profundidade' : 'tools by depth')),
      out('  work          ' + (pt ? 'projetos' : 'projects')),
      out('  open <slug>   ' + (pt ? 'abrir o case completo' : 'open the full case study')),
      out('  xp            ' + (pt ? 'experiência e formação' : 'experience and education')),
      out('  certs         ' + (pt ? 'certificações' : 'certifications')),
      out('  clients       ' + (pt ? 'quem eu atendo' : 'who I work with')),
      out('  contact       ' + (pt ? 'como me achar' : 'how to reach me')),
      out('  resume        ' + (pt ? 'baixar o currículo' : 'download the resume')),
      out('  where         ' + (pt ? 'localização e fuso' : 'location and timezone')),
      out('  theme [x]     ' + (pt ? 'claro / escuro' : 'light / dark')),
      out('  lang [pt|en]  ' + (pt ? 'trocar idioma' : 'switch language')),
      out('  clear         ' + (pt ? 'limpar a tela' : 'clear the screen')),
      dim(pt ? '  (tem alguns comandos escondidos também)' : '  (there are a few hidden ones too)'),
    ],

    whoami: () => [
      out(profile.fullName),
      out(`${profile.role[locale]} · ${profile.location.label[locale]}`),
      brand(profile.headline[locale]),
      dim(
        pt
          ? `${years} anos de prática · ${clientLine}`
          : `${years} years of practice · ${clientLine}`,
      ),
    ],

    // The long-form positioning, verbatim from the content layer.
    about: () => about.paragraphs[locale].flatMap((para) => [out(para), out('')]),

    stack: () =>
      stack.flatMap((group) => [
        brand(group.title[locale].toUpperCase()),
        ...group.items.map((item) =>
          out(
            `  ${item.depth === 'daily' ? '■■■' : item.depth === 'working' ? '■■□' : '■□□'}  ${item.name}`,
          ),
        ),
      ]),

    work: () =>
      projects.flatMap((p) => [
        brand(`${p.index} · ${p.name} — ${p.kicker[locale]}`),
        out(`  ${p.summary[locale]}`),
        out(`  stack: ${p.tech.slice(0, 8).join(', ')}…`),
        p.liveUrl ? out(`  live:  ${p.liveUrl}`) : dim('  live:  —'),
        p.codeVisibility === 'private'
          ? dim(
              pt
                ? '  código: proprietário (sem repositório público)'
                : '  code: proprietary (no public repo)',
            )
          : out('  code:  ' + (p.repoUrl ?? '—')),
        dim(pt ? `  → open ${p.slug}` : `  → open ${p.slug}`),
      ]),

    xp: () =>
      timeline.flatMap((entry) => [
        brand(`${entry.from} → ${entry.to ?? (pt ? 'hoje' : 'now')}  ${entry.title[locale]}`),
        out(`  ${entry.org}${entry.place ? ` · ${entry.place}` : ''}`),
        out(`  ${entry.detail[locale]}`),
      ]),

    certs: () => [
      brand(
        pt
          ? `${certifications.length} certificações e cursos`
          : `${certifications.length} certifications and courses`,
      ),
      ...certifications.map((c) => out(`  ${c.year}  ${c.issuer.padEnd(22)} ${c.title[locale]}`)),
    ],

    contact: () => [
      out(`email     ${profile.contact.email}`),
      out(`whatsapp  ${profile.contact.phoneDisplay}`),
      ...profile.socials.map((s) => out(`${s.key.padEnd(10)}${s.url}`)),
      brand(profile.availability.label[locale]),
    ],

    resume: () => {
      const link = document.createElement('a');
      link.href = profile.resume[locale];
      link.download = `joaovitorkc-${locale === 'en' ? 'resume' : 'curriculo'}.pdf`;
      link.click();
      return [out(pt ? 'baixando currículo…' : 'downloading resume…')];
    },

    clients: () =>
      orgs.flatMap((o) => [
        brand(
          `${o.name} — ${
            o.relation === 'own' ? (pt ? 'minha empresa' : 'my company') : pt ? 'cliente' : 'client'
          }`,
        ),
        out(`  ${o.sector[locale]}`),
        out(`  ${o.url}`),
        ...(o.since ? [dim(`  ${pt ? 'desde' : 'since'} ${o.since}`)] : []),
      ]),

    where: () => [
      out(profile.location.label[locale]),
      out(
        `${profile.location.coords.lat}, ${profile.location.coords.lon} · ${profile.location.timezone} (${profile.location.utc})`,
      ),
    ],

    /* --- easter eggs --- */
    sudo: () => [
      dim(pt ? 'boa tentativa.' : 'nice try.'),
      out(
        pt
          ? 'joaovitor não está no arquivo sudoers. este incidente será reportado.'
          : 'joaovitor is not in the sudoers file. This incident will be reported.',
      ),
    ],
    coffee: () => [
      brand('☕'),
      out(pt ? 'sempre. obrigado por perguntar.' : 'always. thanks for asking.'),
    ],
    forro: () => [
      brand('🪗'),
      out(
        pt
          ? 'Caruaru é a capital do forró. Em junho a cidade inteira vira São João.'
          : 'Caruaru is the capital of forró. Every June the whole city becomes one festival.',
      ),
    ],
    ls: () => [
      out('cover  manifesto  work  stack  trajectory  signals  off-editor  terminal  contact'),
    ],
    'rm -rf': () => [dim(pt ? 'não.' : 'no.')],
    exit: () => [dim(pt ? 'ainda tem mais coisa aqui embaixo.' : 'there is still more below.')],
  };

  // aliases
  commands.who = commands.whoami;
  commands.experience = commands.xp;
  commands.projects = commands.work;
  commands.cv = commands.resume;
  commands.location = commands.where;
  commands.social = commands.contact;
  commands.skills = commands.stack;

  return commands;
}
