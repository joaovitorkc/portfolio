'use client';

import { useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/**
 * Screen-only controls for the CV page.
 *
 * `?print=1` fires the dialog on load, which is what the site's "download CV"
 * buttons link to — one click still ends in a PDF, it is just generated from
 * live content instead of served from a stale file. Visiting /cv directly
 * shows the CV first and leaves saving to the reader.
 */
export function PrintButton({ label, backLabel }: { label: string; backLabel: string }) {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('print') !== '1') return;
    // Wait for webfonts, otherwise the dialog can snapshot fallback metrics.
    const fire = () => window.setTimeout(() => window.print(), 350);
    if (document.fonts?.ready) document.fonts.ready.then(fire).catch(fire);
    else fire();
  }, []);

  return (
    <div className="cv-controls">
      <Link
        href="/"
        className="flex items-center gap-2 border-[1.5px] border-[#111] bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111] transition-colors hover:bg-[#111] hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        {backLabel}
      </Link>

      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 border-[1.5px] border-[#111] bg-[#FF5A1F] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111] transition-colors hover:bg-[#111] hover:text-white"
      >
        <Printer className="h-3.5 w-3.5" aria-hidden />
        {label}
      </button>
    </div>
  );
}
