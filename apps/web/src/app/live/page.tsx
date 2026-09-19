/**
 * @file apps/web/src/app/live/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Dedicated Tour Dates & Live Shows Route (/live), localized across 8 languages.
 */

"use client";

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TourDatesSection } from "@/components/home/tour-dates-section";
import { useI18n } from "@/i18n/client";

export default function LivePage(): React.JSX.Element {
  // Step 1: Retrieve localized translations
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-ultra text-[#FF0000] font-bold block mb-2">
              {t.livePage.tag}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-ultra text-white">
              {t.livePage.title}
            </h1>
          </div>
        </div>
        <TourDatesSection standalone={true} />
      </main>
      <Footer />
    </div>
  );
}
