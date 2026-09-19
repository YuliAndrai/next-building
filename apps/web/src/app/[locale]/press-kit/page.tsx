/**
 * @file apps/web/src/app/[locale]/press-kit/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Localized Press Kit (EPK) route for ANDHRAY.
 */

import React from "react";
import PressKitPage from "@/app/press-kit/page";

interface LocalizedPressKitPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LocalizedPressKitPage({
  params,
}: LocalizedPressKitPageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  return <PressKitPage locale={locale} />;
}
