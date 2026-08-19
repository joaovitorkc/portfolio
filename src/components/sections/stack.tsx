'use client';

import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/libs/utils';
import { chapterNum } from '@/libs/chapters';
import { stack } from '@/content/profile';
import { toLocale } from '@/content/types';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';

const DEPTH_MARKS = { daily: 3, working: 2, learning: 1 } as const;

export default function Stack() {
  const t = useTranslations();
  const locale = toLocale(useLocale());

  return (
    <Chapter
      id="stack"
      num={chapterNum('stack')}
      label={t('chapters.stack')}
      title={
        <div className="grid grid-cols-12 gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-7">
            {t('stack.title')}
          </TextReveal>
          <Reveal className="col-span-12 self-end lg:col-span-5">
            <p className="max-w-md text-step-0 text-ink-muted">{t('stack.intro')}</p>
          </Reveal>
        </div>
      }
    >
      {/* legend */}
      <Reveal className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 rule-b pb-5">
        <span className="label text-ink-faint">{t('stack.depthLegend')}</span>
        {(['daily', 'working', 'learning'] as const).map((depth) => (
          <span key={depth} className="flex items-center gap-2">
            <DepthMark depth={depth} />
            <span className="label text-ink-muted">{t(`stack.depth.${depth}`)}</span>
          </span>
        ))}
      </Reveal>

      <div className="mt-2">
        {stack.map((group, gi) => (
          <Reveal key={group.id} className="group/row rule-b py-8" from="bottom" distance={22}>
            <div className="grid grid-cols-12 gap-y-6 md:gap-x-8">
              {/* group heading */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="label text-brand">{String(gi + 1).padStart(2, '0')}</span>
                  <h3 className="display text-step-2 leading-none">{group.title[locale]}</h3>
                </div>
                <p className="mt-4 max-w-sm text-step--1 leading-relaxed text-ink-muted">
                  {group.note[locale]}
                </p>
              </div>

              {/* items */}
              <ul className="grid-cells col-span-12 grid grid-cols-2 self-start sm:grid-cols-3 md:col-span-8 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group/item flex items-center justify-between gap-2 px-3 py-3 transition-colors hover:bg-ink hover:text-paper"
                  >
                    <span className="text-step--1 font-medium leading-tight">{item.name}</span>
                    <DepthMark depth={item.depth} className="shrink-0" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}

/**
 * Three squares, filled by depth. Deliberately not a percentage bar —
 * "React: 87%" is a number nobody can defend in an interview.
 */
function DepthMark({ depth, className }: { depth: keyof typeof DEPTH_MARKS; className?: string }) {
  const filled = DEPTH_MARKS[depth];
  return (
    <span className={cn('flex items-center gap-[3px]', className)} aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            'block h-1.5 w-1.5',
            i < filled ? 'bg-brand' : 'bg-hairline group-hover/item:bg-paper/25',
          )}
        />
      ))}
    </span>
  );
}
