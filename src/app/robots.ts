import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl, SITE_URL } from '@/libs/site';

export default function robots(): MetadataRoute.Robots {
  // Source artwork for the Open Graph image — a render target, not a page.
  const ogCardPaths = routing.locales.map((locale) => `/${locale}/og-card`);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ogCardPaths,
      },
      // AI crawlers are allowed deliberately: this is a portfolio, and being
      // quotable by assistants is upside, not leakage.
      { userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'], allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
