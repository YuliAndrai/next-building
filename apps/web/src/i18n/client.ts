/**
 * @file apps/web/src/i18n/client.ts
 * @layer Application Layer / Client i18n
 * @description Type-safe translation accessor hook for React Client Components.
 */

"use client";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
import zh from "@/messages/zh.json";
import ja from "@/messages/ja.json";
import { usePathname } from "next/navigation";
import { isSupportedLocale, DEFAULT_LOCALE } from "@/i18n/constants";
import type { MessagesSchema, SupportedLocale } from "@/i18n/types";

const dictionaries: Record<SupportedLocale, MessagesSchema> = {
  en,
  es,
  de,
  it,
  fr,
  pt,
  zh,
  ja,
};

/**
 * Hook to retrieve current active locale and strongly-typed translation messages.
 *
 * @returns An object containing:
 * - locale: The current SupportedLocale detected from pathname or fallback.
 * - messages: The complete MessagesSchema dictionary for the current locale.
 * - t: Alias to messages for concise access.
 */
export function useI18n(): {
  locale: SupportedLocale;
  messages: MessagesSchema;
  t: MessagesSchema;
} {
  // Step 1: Extract pathname from client navigation context
  const rawPathname = usePathname() || "/";
  const firstSegment = rawPathname.split("/").filter(Boolean)[0];

  // Step 2: Validate if first segment matches one of the 8 supported locales
  const locale: SupportedLocale = isSupportedLocale(firstSegment)
    ? firstSegment
    : DEFAULT_LOCALE;

  // Step 3: Return active dictionary with guaranteed fallback
  const messages = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];

  return {
    locale,
    messages,
    t: messages,
  };
}
