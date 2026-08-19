/**
 * The canonical origin, in one place.
 *
 * Production serves `www` — the apex 308-redirects to it — so every canonical,
 * hreflang, Open Graph url, sitemap entry and JSON-LD @id must use `www` too.
 * Pointing them at the apex made search engines follow a redirect for every
 * canonical, which splits signals for no reason.
 *
 * Override with NEXT_PUBLIC_SITE_URL if the primary domain ever changes
 * (e.g. to the apex, or to a preview domain).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.joaovitorkc.com.br')
  .trim()
  .replace(/\/+$/, '');

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/** The host, without protocol. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/**
 * Host for display in the UI — no `www.`.
 * The canonical origin keeps the `www`; nobody wants to read it on the page.
 */
export const SITE_HOST_DISPLAY = SITE_HOST.replace(/^www\./, '');

/**
 * Stable build date for sitemap `lastModified`.
 *
 * Deliberately not `new Date()`: a timestamp that changes on every deploy tells
 * crawlers the whole site changed when nothing did, and they learn to distrust it.
 * Bump this when the content actually changes.
 */
export const CONTENT_UPDATED = '2026-08-19';
