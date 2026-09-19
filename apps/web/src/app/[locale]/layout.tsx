/**
 * @file apps/web/src/app/[locale]/layout.tsx
 * @layer Presentation Layer / Localized Layout
 * @description Localized layout providing language validation and static route generation for the 8 supported locales.
 */

import React from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, SUPPORTED_LOCALES } from "@/i18n/constants";

/**
 * Pre-renders all 8 supported language variants at build time.
 */
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

interface LocalizedLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * LocalizedLayout Component
 *
 * Validates the route locale parameter against canonical supported locales.
 * If unsupported, triggers a 404 boundary.
 *
 * @param props Layout properties containing children and route params.
 * @returns {Promise<React.JSX.Element>} The rendered localized layout.
 */
export default async function LocalizedLayout({
  children,
  params,
}: LocalizedLayoutProps): Promise<React.JSX.Element> {
  // Step 1: Await asynchronous route parameters (Next.js 16 App Router)
  const { locale } = await params;

  // Step 2: Validate locale against supported locales contract
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Step 3: Render localized child components
  return <>{children}</>;
}
