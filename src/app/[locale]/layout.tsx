import type React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'João Vitor | Full-Stack Developer',
  description: 'Meu site pessoal mostrando meus projetos e habilidades.',
  openGraph: {
    title: 'João Vitor | Full-Stack Developer',
    description: 'Meu site pessoal mostrando meus projetos e habilidades.',
    url: 'https://wi-consultoria.com',
    type: 'website',
    images: [
      {
        url: '/open-graph-image.png',
        width: 1200,
        height: 628,
        alt: 'João Vitor | Full-Stack Developer',
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en-PT" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="
            joaovitorkc,
            joaovitor,
            full-stack developer,
            full stack developer,
            developer,
            portfolio,
            personal portfolio,
            portfolio website,
            personal website,
            nextjs,
            typescript,
            tailwindcss,
            react,
            next.js,
           desenvolvedor full stack,
           desenvolvedor pleno,
           desenvolvedor web,
           desenvolvedor,
           desenvolvedor de software,
           desenvolvedor de aplicações,
           desenvolvedor de sistemas,
           desenvolvedor de plataformas,
           desenvolvedor de aplicativos,
           desenvolvedor de soluções,
           desenvolvedor de tecnologia,
           desenvolvedor de softwares,
           desenvolvedor de aplicações web            
           "
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Toaster position="top-center" />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
