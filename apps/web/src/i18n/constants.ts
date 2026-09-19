/**
 * @file apps/web/src/i18n/constants.ts
 * @layer Layer 3: Domain / Pipelines / Constants
 * @description Canonical constants, metadata registry, and runtime guards for supported locales.
 * Enforces the 8 supported languages for ANDHRAY official platform.
 */

import type { LocaleMetadata, SupportedLocale } from './types';

/**
 * Immutable tuple of all supported language codes.
 * Order: default English first, followed by European and Asian markets.
 */
export const SUPPORTED_LOCALES: readonly SupportedLocale[] = [
  'en',
  'es',
  'de',
  'it',
  'fr',
  'pt',
  'zh',
  'ja',
] as const;

/**
 * Default fallback locale for requests without explicit locale match.
 */
export const DEFAULT_LOCALE: SupportedLocale = 'en';

/**
 * Comprehensive metadata registry for all 8 supported locales.
 * Native endonyms are prioritized for intuitive user interface rendering.
 */
export const LOCALE_METADATA: Record<SupportedLocale, LocaleMetadata> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    bcp47: 'en-US',
    direction: 'ltr',
    flag: '🇬🇧',
    isDefault: true,
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    bcp47: 'es-ES',
    direction: 'ltr',
    flag: '🇪🇸',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    bcp47: 'de-DE',
    direction: 'ltr',
    flag: '🇩🇪',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    bcp47: 'it-IT',
    direction: 'ltr',
    flag: '🇮🇹',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    bcp47: 'fr-FR',
    direction: 'ltr',
    flag: '🇫🇷',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    bcp47: 'pt-PT',
    direction: 'ltr',
    flag: '🇵🇹',
  },
  zh: {
    code: 'zh',
    name: 'Simplified Chinese',
    nativeName: '简体中文',
    bcp47: 'zh-CN',
    direction: 'ltr',
    flag: '🇨🇳',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    bcp47: 'ja-JP',
    direction: 'ltr',
    flag: '🇯🇵',
  },
};

/**
 * Simplified key-value labels for compact language selector components.
 */
export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  it: 'IT',
  fr: 'FR',
  pt: 'PT',
  zh: 'ZH',
  ja: 'JA',
};

/**
 * Type guard to validate whether an unknown value is a supported locale code.
 *
 * @param locale - Candidate value to inspect.
 * @returns True if value is a member of SUPPORTED_LOCALES, false otherwise.
 */
export function isSupportedLocale(locale: unknown): locale is SupportedLocale {
  // Step 1: Validate candidate is a non-empty string primitive
  if (typeof locale !== 'string' || locale.trim().length === 0) {
    return false;
  }

  // Step 2: Normalize case to lowercase
  const normalized = locale.toLowerCase().trim();

  // Step 3: Verify membership within canonical SUPPORTED_LOCALES array
  return (SUPPORTED_LOCALES as readonly string[]).includes(normalized);
}

/**
 * Resolves a safe locale code from arbitrary input, falling back to DEFAULT_LOCALE.
 *
 * @param candidate - Optional or untrusted candidate string from URL or headers.
 * @returns Validated SupportedLocale guaranteed to exist in SUPPORTED_LOCALES.
 */
export function resolveSafeLocale(candidate?: string | null): SupportedLocale {
  // Step 1: Check if candidate matches a supported locale
  if (candidate && isSupportedLocale(candidate)) {
    return candidate;
  }

  // Step 2: Fall back to canonical DEFAULT_LOCALE
  return DEFAULT_LOCALE;
}
