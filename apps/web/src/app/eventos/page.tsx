/**
 * @file apps/web/src/app/eventos/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Dedicated Tour Dates & Events route featuring upcoming live rituals and Euro Tour 2026 dates in Italy and Germany.
 */

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TourDatesSection } from "@/components/home/tour-dates-section";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // SIGUIENTES EVENTOS & TOUR DATES`,
  description: `Calendario oficial de fechas de gira de ${siteConfig.artist.name}: Euro Tour 2026 (Italia y Alemania), festivales y actuaciones en clubes.`,
};

export default function EventosPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16">
        <TourDatesSection standalone={true} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
