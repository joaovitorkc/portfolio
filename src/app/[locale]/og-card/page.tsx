import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { HalftonePortrait } from '@/components/fx/halftone-portrait';
import { Monogram } from '@/components/brand/monogram';

/**
 * Source artwork for /public/open-graph-image.png.
 *
 * Rendered at exactly 1200×630 and captured by `scripts/capture-og.mjs`, which
 * is why it exists as a real page: it uses the site's actual fonts, tokens and
 * halftone canvas instead of an approximation. Never indexed.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function OgCard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = toLocale(locale);

  return (
    <div className="og-card relative flex h-[630px] w-[1200px] flex-col overflow-hidden bg-paper">
      {/* hide the site chrome for the capture */}
      <style>{`
        body:has(.og-card) header,
        body:has(.og-card) .grain,
        body:has(.og-card) [data-nextjs-toast] { display: none !important; }
        body:has(.og-card) { overflow: hidden; }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 dots opacity-60" />

      <div className="relative flex flex-1 items-center gap-14 px-16">
        <div className="flex-1">
          <p className="label flex items-center gap-3 text-ink-muted">
            <Monogram plate="ink" className="h-6 w-6 shrink-0" />
            {profile.domain}
          </p>

          <h1 className="display mt-6 text-[7.5rem] leading-[0.82]">
            João
            <br />
            <span className="text-brand">Vitor</span>
          </h1>

          <p className="serif-italic mt-7 max-w-[34ch] text-[1.75rem] leading-tight text-ink">
            {profile.headline[loc]}
          </p>
        </div>

        <figure className="relative w-[300px] shrink-0 border-rule border-ink">
          <HalftonePortrait
            src="/profile-image.png"
            alt=""
            className="aspect-[4/5] w-full"
            cell={6}
          />
          <span className="absolute -left-px -top-px h-4 w-4 border-l-rule border-t-rule border-brand" />
          <span className="absolute -bottom-px -right-px h-4 w-4 border-b-rule border-r-rule border-brand" />
        </figure>
      </div>

      <div className="relative flex items-center justify-between gap-6 rule-t bg-brand px-16 py-5 text-brand-foreground">
        <span className="label">{profile.role[loc]}</span>
        <span className="label">{profile.location.label[loc]}</span>
      </div>
    </div>
  );
}
