/**
 * @file apps/web/src/app/live/page.tsx
 * @description Dedicated Tour Dates & Live Shows Route (/live), mirroring saralandry.com/live
 */

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TourDatesSection } from "@/components/home/tour-dates-section";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // TOUR DATES & LIVE DATES`,
  description: `Official tour schedule and tickets for ${siteConfig.artist.name}. European, American and world tour dates.`,
};

export default function LivePage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-ultra text-red-600 font-bold block mb-2">
              OFFICIAL TOUR CALENDAR
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-ultra text-white">
              {siteConfig.artist.name} LIVE
            </h1>
          </div>
        </div>
        <TourDatesSection standalone={true} />
      </main>
      <Footer />
    </div>
  );
}
