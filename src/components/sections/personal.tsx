'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { personal, profile } from '@/content/profile';
import { toLocale, type I18nText } from '@/content/types';
import { chapterNum } from '@/libs/chapters';
import { Chapter } from '@/components/chrome/chapter';
import { Reveal, TextReveal } from '@/components/fx/reveal';
import { Monogram } from '@/components/brand/monogram';

const isI18n = (v: string | I18nText): v is I18nText => typeof v === 'object';

export default function Personal() {
  const t = useTranslations();
  const locale = toLocale(useLocale());

  return (
    <Chapter
      id="off-editor"
      num={chapterNum('offEditor')}
      label={t('chapters.offEditor')}
      title={
        <div className="grid grid-cols-12 items-end gap-6">
          <TextReveal as="h2" className="display col-span-12 text-step-5 lg:col-span-8">
            {t('personal.title')}
          </TextReveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:justify-self-end">
            <LocalClock label={t('personal.localTime')} />
          </Reveal>
        </div>
      }
    >
      <Reveal
        className="mt-14 grid grid-cols-1 gap-px bg-hairline md:mt-20 md:grid-cols-2 xl:grid-cols-3"
        stagger={0.06}
        distance={22}
      >
        {personal.cards.map((card) => (
          <article
            key={card.id}
            className="group flex min-h-[15rem] flex-col justify-between bg-paper p-6 transition-colors hover:bg-ink hover:text-paper md:p-8"
          >
            <div className="flex items-baseline justify-between gap-3 rule-b pb-3">
              <span className="label text-ink-faint transition-colors group-hover:text-paper/55">
                {card.label[locale]}
              </span>
              <Monogram plate="none" className="h-3 w-3 shrink-0" />
            </div>

            <div className="mt-6">
              <h3 className="display text-step-2 leading-none">
                {isI18n(card.value) ? card.value[locale] : card.value}
              </h3>
              <p className="mt-4 text-step--1 leading-relaxed text-ink-muted transition-colors group-hover:text-paper/70">
                {card.body[locale]}
              </p>
            </div>
          </article>
        ))}

        {/* map-ish coordinate block — fills the grid instead of leaving a hole */}
        <div className="relative flex min-h-[15rem] flex-col justify-between overflow-hidden bg-ink p-6 text-paper md:p-8">
          <div aria-hidden className="absolute inset-0 hatch opacity-[0.16]" />
          <div className="relative flex items-baseline justify-between gap-3 rule-b border-paper/20 pb-3">
            <span className="label text-paper/55">{personal.intro[locale]}</span>
            <span className="label text-brand">{profile.location.utc}</span>
          </div>
          <div className="relative mt-6">
            <p className="display text-step-3 leading-none">
              {profile.location.coords.lat.toFixed(4)}° S
              <br />
              {Math.abs(profile.location.coords.lon).toFixed(4)}° W
            </p>
            <p className="mt-4 label text-paper/55">{profile.location.label[locale]}</p>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}

/** Live clock in Caruaru. Renders nothing until mounted to avoid hydration drift. */
function LocalClock({ label }: { label: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: profile.location.timezone,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="border-rule border-hairline px-5 py-4">
      <p className="label mb-2 text-ink-faint">{label}</p>
      <p className="font-mono tabular text-step-2 leading-none">
        {now ?? '--:--:--'}
        <span className="ml-2 animate-blink text-brand">▌</span>
      </p>
    </div>
  );
}
