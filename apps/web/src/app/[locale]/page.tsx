/**
 * @file apps/web/src/app/[locale]/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Localized Home Page for ANDHRAY delivering full editorial experience in the active language.
 */

import React from "react";
import HomePage from "@/app/page";

/**
 * LocalizedHomePage Component
 *
 * Renders the official ANDHRAY landing page with continuous fixed background architecture,
 * responsive to the active locale context.
 *
 * @returns {React.JSX.Element} The rendered home page.
 */
export default function LocalizedHomePage(): React.JSX.Element {
  return <HomePage />;
}
