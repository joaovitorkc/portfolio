import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/hero';
import Manifesto from '@/components/sections/manifesto';
import Work from '@/components/sections/work';
import Stack from '@/components/sections/stack';
import Trajectory from '@/components/sections/trajectory';
import Signals, { SignalsSkeleton } from '@/components/sections/signals';
import Personal from '@/components/sections/personal';
import Terminal from '@/components/sections/terminal';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { homeSchema } from '@/libs/seo';
import { toLocale } from '@/content/types';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <>
      <JsonLd data={homeSchema(toLocale(locale), t('description'))} />

      <Hero />
      <Manifesto />
      <Work />
      <Stack />
      <Trajectory />
      {/* Live GitHub data, cached for an hour. Behind a Suspense boundary so the
          document streams without waiting on api.github.com. */}
      <Suspense fallback={<SignalsSkeleton />}>
        <Signals />
      </Suspense>
      <Personal />
      <Terminal />
      <Contact />
      <Footer />
    </>
  );
}
