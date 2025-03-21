import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        {t('greeting')} <span className="text-primary"> João Vitor</span>
      </h1>
      <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl">{t('description')}</p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="#projects">{t('viewWork')}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#contact">{t('contact')}</Link>
        </Button>
      </div>
      <div className="absolute bottom-8 animate-bounce">
        <Link href="#about" aria-label="Scroll down">
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
