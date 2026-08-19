import { certifications, personal, profile, stack, timeline } from '@/content/profile';
import type { Project } from '@/content/projects';
import { projects } from '@/content/projects';
import type { Locale } from '@/content/types';
import { routing } from '@/i18n/routing';
import { absoluteUrl, SITE_URL } from './site';

/* ============================================================
   Structured data.

   One graph, entities cross-referenced by @id so search engines resolve
   "João Vitor" as a single person across every page rather than as a new
   unnamed thing per document.

   Rule followed throughout: never claim more than is true. The systems are
   client work he contributes to, so they use `contributor`, never `author`.
   ============================================================ */

const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  employer: `${SITE_URL}/#wi-consultoria`,
  school: `${SITE_URL}/#unifavip`,
} as const;

export const OG_IMAGE = {
  url: absoluteUrl('/open-graph-image.png'),
  width: 1200,
  height: 630,
} as const;

/** Locale → BCP 47 tag used in metadata and schema. */
export const bcp47 = (locale: Locale) => (locale === 'pt' ? 'pt-BR' : 'en');

/** Open Graph locale format. */
export const ogLocale = (locale: Locale) => (locale === 'pt' ? 'pt_BR' : 'en_US');

/** hreflang map for a path, including x-default. */
export function languageAlternates(path = '') {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[bcp47(locale as Locale)] = absoluteUrl(`/${locale}${path}`);
  }
  languages['x-default'] = absoluteUrl(`/${routing.defaultLocale}${path}`);
  return languages;
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

const employer = {
  '@type': 'Organization',
  '@id': ID.employer,
  name: 'Wi Consultoria',
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location.city,
    addressRegion: profile.location.state,
    addressCountry: 'BR',
  },
} as const;

const school = {
  '@type': 'CollegeOrUniversity',
  '@id': ID.school,
  name: 'UniFavip Wyden',
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location.city,
    addressRegion: profile.location.state,
    addressCountry: 'BR',
  },
} as const;

/** Everything he works with, flattened — feeds `knowsAbout` and `skills`. */
function skillNames() {
  const tools = stack.flatMap((group) => group.items.map((item) => item.name));
  const domain = [
    'e-SUS APS',
    'Public health information systems',
    'Multi-tenant architecture',
    'Report generation',
    'ETL pipelines',
  ];
  return Array.from(new Set([...tools, ...domain]));
}

function credentials(locale: Locale) {
  return certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.title[locale],
    credentialCategory: cert.kind === 'certificate' ? 'certificate' : 'course',
    educationalLevel: cert.kind === 'certificate' ? 'Professional certification' : 'Course',
    dateCreated: cert.year,
    recognizedBy: { '@type': 'Organization', name: cert.issuer },
  }));
}

export function personSchema(locale: Locale) {
  const current = timeline.find((entry) => entry.kind === 'work' && entry.to === null);

  return {
    '@type': 'Person',
    '@id': ID.person,
    name: profile.fullName,
    alternateName: profile.name,
    url: absoluteUrl(`/${locale}`),
    mainEntityOfPage: { '@id': `${absoluteUrl(`/${locale}`)}#profilepage` },
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl('/profile-photo.jpg'),
      caption: profile.fullName,
    },
    description: profile.headline[locale],
    disambiguatingDescription: personal.cards[1].body[locale],
    email: `mailto:${profile.contact.email}`,
    telephone: profile.contact.phoneRaw,
    jobTitle: profile.role[locale],
    nationality: { '@type': 'Country', name: 'Brazil' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.stateFull,
      addressCountry: 'BR',
    },
    homeLocation: {
      '@type': 'Place',
      name: profile.location.label[locale],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: profile.location.coords.lat,
        longitude: profile.location.coords.lon,
      },
    },
    worksFor: employer,
    alumniOf: school,
    hasOccupation: {
      '@type': 'Occupation',
      name: profile.role[locale],
      occupationLocation: {
        '@type': 'City',
        name: `${profile.location.city}, ${profile.location.stateFull}`,
      },
      skills: skillNames().join(', '),
      ...(current ? { description: current.detail[locale] } : {}),
    },
    hasCredential: credentials(locale),
    knowsAbout: skillNames(),
    knowsLanguage: [
      { '@type': 'Language', name: 'Portuguese', alternateName: 'pt-BR' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    sameAs: profile.socials.map((social) => social.url),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE_URL,
    name: profile.fullName,
    alternateName: profile.name,
    inLanguage: bcp47(locale),
    publisher: { '@id': ID.person },
    copyrightHolder: { '@id': ID.person },
  };
}

/**
 * The home page. ProfilePage is the type Google documents for a page that *is*
 * somebody's profile, with the person as its mainEntity.
 */
export function homeSchema(locale: Locale, description: string) {
  const url = absoluteUrl(`/${locale}`);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(locale),
      personSchema(locale),
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profilepage`,
        url,
        name: `${profile.fullName} — ${profile.role[locale]}`,
        description,
        inLanguage: bcp47(locale),
        isPartOf: { '@id': ID.website },
        about: { '@id': ID.person },
        mainEntity: { '@id': ID.person },
        primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE.url },
        hasPart: projects.map((project) => ({
          '@type': 'CreativeWork',
          '@id': `${absoluteUrl(`/${locale}/work/${project.slug}`)}#project`,
          name: project.name,
          description: project.kicker[locale],
          url: absoluteUrl(`/${locale}/work/${project.slug}`),
        })),
      },
    ],
  };
}

/** A case study page: breadcrumbs + the system it documents. */
export function projectSchema(project: Project, locale: Locale) {
  const url = absoluteUrl(`/${locale}/work/${project.slug}`);
  const startYear = /\d{4}/.exec(project.year[locale])?.[0];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(locale),
      personSchema(locale),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: profile.name,
            item: absoluteUrl(`/${locale}`),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'pt' ? 'Trabalho' : 'Work',
            item: `${absoluteUrl(`/${locale}`)}#work`,
          },
          { '@type': 'ListItem', position: 3, name: project.name },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${project.name} — ${project.kicker[locale]}`,
        description: project.summary[locale],
        inLanguage: bcp47(locale),
        isPartOf: { '@id': ID.website },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
        primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE.url },
        about: { '@id': `${url}#project` },
        mainEntity: { '@id': `${url}#project` },
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#project`,
        name: project.name,
        alternateName: project.kicker[locale],
        description: project.summary[locale],
        abstract: project.problem[locale],
        url,
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
        inLanguage: 'pt-BR',
        ...(startYear ? { dateCreated: startYear } : {}),
        // `contributor`, not `author`: this is client work built by a team.
        contributor: { '@id': ID.person },
        sourceOrganization: employer,
        keywords: project.tech.join(', '),
        genre: project.sector[locale],
        audience: {
          '@type': 'Audience',
          audienceType:
            locale === 'pt' ? 'Secretarias municipais de saúde' : 'Municipal health departments',
        },
      },
    ],
  };
}
