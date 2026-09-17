/**
 * @file apps/web/src/app/musica/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Dedicated Music route featuring official Spotify releases, SoundCloud bootlegs, and HÖR Berlin live video.
 */

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MusicSection } from "@/components/home/music-section";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // MÚSICA & DISCOGRAFÍA`,
  description: `Catálogo musical y discografía oficial de ${siteConfig.artist.name}: Top Tracks en Spotify (SENSUAL, Danseo Mental, MI, EN NAPL, MEMENTO), bootlegs en SoundCloud y sesiones en vivo como HÖR Berlin.`,
};

export default function MusicaPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16">
        <MusicSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
