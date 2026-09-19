/**
 * @file apps/web/src/i18n/navigation.ts
 * @layer Application Layer / Navigation Wrappers
 * @description Localized navigation components and hooks configured with defined locales.
 */

import { createNavigation } from "next-intl/navigation";
import { routingConfig } from "@/i18n/routing";

/**
 * Localized navigation utilities generated from next-intl.
 *
 * Link: Localized next/link equivalent that automatically prefixes current locale.
 * redirect: Server and client redirect helper preserving locale awareness.
 * usePathname: Hook returning the current pathname stripped of the locale prefix.
 * useRouter: Hook providing router methods (push, replace) bound to current locale.
 * getPathname: Utility to resolve localized pathname strings.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingConfig as any);
