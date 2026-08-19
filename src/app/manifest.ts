import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

/**
 * Minimal, honest web manifest. Not a PWA — there is nothing to install and no
 * offline story — but it gives mobile browsers a proper name, icon and theme
 * colour when someone adds the site to their home screen.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.fullName} — ${profile.role.pt}`,
    short_name: profile.name,
    description: profile.headline.pt,
    start_url: '/pt',
    scope: '/',
    display: 'browser',
    lang: 'pt-BR',
    dir: 'ltr',
    background_color: '#1a1a1a',
    theme_color: '#f2efe9',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      // Android crops maskable icons to a circle, hence the padded variant.
      {
        src: '/brand/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
