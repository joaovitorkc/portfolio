import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { projects } from '@/content/projects';
import { absoluteUrl, CONTENT_UPDATED } from '@/libs/site';
import { bcp47 } from '@/libs/seo';
import type { Locale } from '@/content/types';

/**
 * Every locale × every indexable route, with hreflang alternates and the OG
 * image attached so Google Images can associate it with the pages.
 *
 * `lastModified` is a pinned content date rather than build time — a timestamp
 * that moves on every deploy teaches crawlers to ignore the signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: 0.8 })),
  ];

  const lastModified = new Date(CONTENT_UPDATED);
  const ogImage = absoluteUrl('/open-graph-image.png');

  return routing.locales.flatMap((locale) =>
    paths.map(({ path, priority }) => ({
      url: absoluteUrl(`/${locale}${path}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      images: [ogImage],
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((alt) => [bcp47(alt as Locale), absoluteUrl(`/${alt}${path}`)]),
          ),
          'x-default': absoluteUrl(`/${routing.defaultLocale}${path}`),
        },
      },
    })),
  );
}
