/**
 * @file apps/web/src/i18n/request.ts
 * @layer Domain Layer / Message Loader
 * @description Dynamic request configuration and message bundle loader for Next.js 16 Server Components.
 */

import { getRequestConfig } from "next-intl/server";
import { isSupportedLocale, DEFAULT_LOCALE } from "@/i18n/constants";
import type { MessagesSchema, SupportedLocale } from "@/i18n/types";

export default getRequestConfig(async ({ requestLocale }) => {
  // Step 1: Await requested locale from Next.js request context
  const rawLocale = await requestLocale;

  // Step 2: Validate against supported locales or fallback to default
  const locale: SupportedLocale = rawLocale && isSupportedLocale(rawLocale)
    ? rawLocale
    : DEFAULT_LOCALE;

  // Step 3: Load matching JSON message catalog dynamically
  const messages = (await import(`@/messages/${locale}.json`)).default as MessagesSchema;

  return {
    locale,
    messages,
  };
});
