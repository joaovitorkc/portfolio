'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/libs/utils';
import { registerMotion, ScrollTrigger } from '@/libs/motion';
import { useUi } from '@/stores/ui.store';

/**
 * A chapter of the dossier.
 *
 * Renders the printed header (index + label + hairline) and reports itself to
 * the UI store while it owns the viewport, which drives the nav and the index rail.
 */
export function Chapter({
  id,
  num,
  label,
  title,
  children,
  className,
  /** wide chapters (horizontal scroll, pinned) manage their own padding */
  bare = false,
  tone = 'paper',
}: {
  id: string;
  num: string;
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
  tone?: 'paper' | 'ink' | 'surface';
}) {
  const ref = useRef<HTMLElement>(null);
  const setActiveChapter = useUi((s) => s.setActiveChapter);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      registerMotion();

      const trigger = ScrollTrigger.create({
        trigger: el,
        // "owns the viewport" = its top has passed the middle of the screen
        start: 'top 55%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActiveChapter(id);
        },
      });

      return () => trigger.kill();
    },
    { scope: ref, dependencies: [id] },
  );

  return (
    <section
      ref={ref}
      id={id}
      /* Labelled directly, so the real section title can own the <h2>.
         The chapter label ("Manifesto") is navigation furniture, not a heading —
         making it the h2 buried the actual headline at h3 in the outline. */
      aria-label={label}
      data-chapter={num}
      className={cn(
        'relative',
        tone === 'ink' && 'bg-ink text-paper',
        tone === 'surface' && 'bg-surface-1',
        !bare && 'py-chapter',
        className,
      )}
    >
      {!bare && (
        <div className="dossier-shell">
          <header className="mb-10 flex items-baseline gap-4 rule-b pb-4 md:mb-16">
            <span className="label text-brand">{num}</span>
            <span className="label text-ink-muted">{label}</span>
            <span className="ml-auto label hidden text-ink-faint sm:block">
              {profileMarkLabel(num)}
            </span>
          </header>
          {title}
        </div>
      )}
      {bare ? <>{children}</> : <div className="dossier-shell">{children}</div>}
    </section>
  );
}

/** Fake-but-consistent archival mark, like a page stamp in a real dossier. */
function profileMarkLabel(num: string) {
  return `REF · JVCS-${num}`;
}
