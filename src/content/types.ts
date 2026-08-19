export type Locale = 'pt' | 'en';

/** A string that exists in both locales. */
export type I18nText = Record<Locale, string>;

/** A list of strings that exists in both locales. */
export type I18nList = Record<Locale, string[]>;

export const isLocale = (value: string): value is Locale => value === 'pt' || value === 'en';

/** Narrow an unknown route param down to a Locale, defaulting to pt. */
export const toLocale = (value: string | undefined): Locale =>
  value && isLocale(value) ? value : 'pt';
