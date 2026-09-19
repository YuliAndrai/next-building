/**
 * @file apps/web/src/i18n/routing.ts
 * @layer Layer 2: Application / Consumption Layer
 * @description Internationalized routing configuration and navigation contracts for Next.js 16 App Router.
 * Establishes locale prefixes, path translations, and prepares navigation interfaces.
 */

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './constants';
import type { I18nRoutingConfig, LocalizedPathnames, SupportedLocale } from './types';

/**
 * Pathname localization dictionary for all internal platform routes.
 * Preserves brand identities and artist trademarks while providing native URL slugs.
 */
export const localizedPathnames: LocalizedPathnames = {
  '/': '/',
  '/contacto': {
    en: '/contact',
    es: '/contacto',
    de: '/kontakt',
    it: '/contatti',
    fr: '/contact',
    pt: '/contato',
    zh: '/contact',
    ja: '/contact',
  },
  '/musica': {
    en: '/music',
    es: '/musica',
    de: '/musik',
    it: '/musica',
    fr: '/musique',
    pt: '/musica',
    zh: '/music',
    ja: '/music',
  },
  '/eventos': {
    en: '/tour',
    es: '/eventos',
    de: '/tour-daten',
    it: '/date-tour',
    fr: '/tournee',
    pt: '/turne',
    zh: '/tour',
    ja: '/tour',
  },
  '/bio': {
    en: '/bio',
    es: '/bio',
    de: '/bio',
    it: '/bio',
    fr: '/bio',
    pt: '/bio',
    zh: '/bio',
    ja: '/bio',
  },
  '/press': {
    en: '/press',
    es: '/prensa',
    de: '/presse',
    it: '/stampa',
    fr: '/presse',
    pt: '/imprensa',
    zh: '/press',
    ja: '/press',
  },
};

/**
 * Canonical internationalized routing configuration for Next.js 16 App Router.
 * Used by middleware and navigation wrappers.
 */
export const routingConfig: I18nRoutingConfig = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
  pathnames: localizedPathnames,
};

/**
 * Resolves a localized path for a given internal route and target locale.
 *
 * @param path - Internal canonical route key (e.g., '/contacto').
 * @param locale - Target supported locale.
 * @returns Localized URL pathname segment prefixed with locale.
 */
export function getLocalizedHref(path: string, locale: SupportedLocale): string {
  // Step 1: Normalize root path directly with locale prefix
  if (path === '/' || path === '') {
    return `/${locale}`;
  }

  // Step 2: Look up localized slug mapping if defined
  const mapping = localizedPathnames[path];
  if (mapping && typeof mapping === 'object' && locale in mapping) {
    const slug = mapping[locale];
    return `/${locale}${slug.startsWith('/') ? slug : `/${slug}`}`;
  }

  // Step 3: Default fallback if path has no custom translation
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}

/**
 * Interface contract for navigation components and hooks.
 * To be fulfilled during implementation slice using next-intl/navigation.
 */
export interface I18nNavigationContract {
  /** Localized Link component type contract */
  readonly href: string;
  /** Active locale context */
  readonly locale: SupportedLocale;
}
