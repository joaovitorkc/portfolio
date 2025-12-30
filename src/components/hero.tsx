'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-muted-foreground border animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Full Stack Developer
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
          {t('greeting')}{' '}
          <span className="text-primary relative">
            João Vitor
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C47.6667 2.16667 141.4 -2.4 199 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary/40"
              />
            </svg>
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8 h-12 text-base group">
            <Link href="#projects" className="flex items-center gap-2">
              {t('viewWork')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-12 text-base bg-transparent"
          >
            <Link href="#contact">{t('contact')}</Link>
          </Button>
        </div>
      </div>

      <div className="absolute -bottom-5 md:bottom-12 left-1/2 -translate-x-1/2">
        <Link
          href="#about"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
