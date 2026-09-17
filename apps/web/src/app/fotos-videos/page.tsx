/**
 * @file apps/web/src/app/fotos-videos/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Dedicated Multimedia route featuring live performance photography, video records, and press archive.
 */

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MediaPressKitSection } from "@/components/home/media-press-kit-section";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // FOTOS Y VIDEOS`,
  description: `Galería multimedia oficial de ${siteConfig.artist.name}: Fotos de directo, registros de video en vivo y archivo de prensa.`,
};

export default function FotosVideosPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16">
        <MediaPressKitSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
