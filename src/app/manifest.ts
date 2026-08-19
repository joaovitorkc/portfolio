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
    background_color: '#f2efe9',
    theme_color: '#f2efe9',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
