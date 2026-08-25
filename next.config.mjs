import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Slugs that used to have their own case page and were demoted to compact
 * listings. They shipped, so they are indexed and may be linked — a 301 to the
 * work index keeps whatever equity they earned and avoids handing crawlers a
 * page that answers 404 where it used to answer 200.
 */
const DEMOTED = ['visa', 'bpa-online', 'raid'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',
  async redirects() {
    return [
      // With locale prefix, as the site actually serves them.
      ...DEMOTED.flatMap((slug) =>
        ['pt', 'en'].map((locale) => ({
          source: `/${locale}/work/${slug}`,
          destination: `/${locale}#work`,
          permanent: true,
        })),
      ),
      // And without, for any old link that skipped the prefix.
      ...DEMOTED.map((slug) => ({
        source: `/work/${slug}`,
        destination: '/#work',
        permanent: true,
      })),
    ];
  },
};

export default withNextIntl(nextConfig);
