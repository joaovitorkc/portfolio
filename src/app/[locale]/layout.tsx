import type { Metadata } from 'next';
import type React from 'react';
import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { routing } from '@/i18n/routing';
import { fontVariables } from '@/libs/fonts';
import { absoluteUrl, SITE_URL } from '@/libs/site';
import { bcp47, languageAlternates, ogLocale, OG_IMAGE } from '@/libs/seo';
import { profile } from '@/content/profile';
import { toLocale } from '@/content/types';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import SmoothScroll from '@/components/chrome/smooth-scroll';
import Nav from '@/components/chrome/nav';
import ChapterRail from '@/components/chrome/chapter-rail';
import CommandPalette from '@/components/chrome/command-palette';
import Grain from '@/components/chrome/grain';
import Crosshair from '@/components/chrome/crosshair';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    applicationName: profile.fullName,
    authors: [{ name: profile.fullName, url: profile.url }],
    creator: profile.fullName,
    keywords: [
      'João Vitor',
      'João Vitor Cavalcanti da Silva',
      'joaovitorkc',
      'desenvolvedor full stack',
      'full stack developer',
      'desenvolvedor Caruaru',
      'desenvolvedor Pernambuco',
      'TypeScript',
      'Next.js',
      'React',
      'Node.js',
      'PostgreSQL',
      'e-SUS APS',
      'saúde pública',
      'sistemas de gestão em saúde',
      'e-Gestão',
      'R-SUS',
    ],
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'profile',
      firstName: 'João Vitor',
      lastName: 'Cavalcanti da Silva',
      username: 'joaovitorkc',
      siteName: profile.fullName,
      locale: ogLocale(toLocale(locale)),
      alternateLocale: locale === 'pt' ? 'en_US' : 'pt_BR',
      url: absoluteUrl(`/${locale}`),
      title: t('title'),
      description: t('description'),
      images: [{ ...OG_IMAGE, alt: t('ogAlt'), type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [{ url: OG_IMAGE.url, alt: t('ogAlt') }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    manifest: '/manifest.webmanifest',
    other: {
      'geo.region': 'BR-PE',
      'geo.placename': profile.location.city,
      'geo.position': `${profile.location.coords.lat};${profile.location.coords.lon}`,
      ICBM: `${profile.location.coords.lat}, ${profile.location.coords.lon}`,
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2efe9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0c0a' },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={bcp47(toLocale(locale))} suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider>
          {/* Respects the visitor's OS preference — both themes are fully designed.
              Set defaultTheme to "light" to always open on the cream/paper look. */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#main"
              className="skip border-rule border-ink bg-brand px-4 py-2 label text-brand-foreground"
            >
              {t('skip')}
            </a>

            <SmoothScroll>
              <Grain />
              <Crosshair />
              <Nav />
              <ChapterRail />
              <CommandPalette />
              <main id="main">{children}</main>
            </SmoothScroll>

            <Toaster position="bottom-right" />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
