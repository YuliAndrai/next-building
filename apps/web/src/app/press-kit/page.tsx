/**
 * @file apps/web/src/app/press-kit/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Official Electronic Press Kit (EPK) route for ANDHRAY.
 * Delivers high-resolution photography and live video archive.
 */

import React from "react";
import fs from "node:fs";
import path from "node:path";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // PRESS KIT`,
  description: `Material oficial de prensa de ${siteConfig.artist.name}: Fotografías en alta resolución y registros de video en vivo.`,
};

/**
 * Retrieve verified local media assets from public folders with fallback defaults.
 */
function getPressKitMedia(): { photos: string[]; videos: string[] } {
  const fallbackPhotos = [
    "ANDHRAY1.jpg",
    "IMG_4123.JPG",
    "IMG_8451.JPG"
  ];

  const fallbackVideos = [
    "Andhray 1.mp4",
    "C4811_00661212.mp4",
    "IMG_0012.MOV",
    "IMG_1468.mov",
    "IMG_2191.MOV"
  ];

  let photos = fallbackPhotos;
  let videos = fallbackVideos;

  try {
    const photosDir = path.join(process.cwd(), "apps/web/public/press-kit/photos");
    if (fs.existsSync(photosDir)) {
      const scanned = fs
        .readdirSync(photosDir)
        .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));
      if (scanned.length > 0) {
        photos = scanned;
      }
    }
  } catch {
    // Fallback to static references if filesystem is restricted
  }

  try {
    const videosDir = path.join(process.cwd(), "apps/web/public/press-kit/videos");
    if (fs.existsSync(videosDir)) {
      const scanned = fs
        .readdirSync(videosDir)
        .filter((file) => /\.(mp4|mov|webm)$/i.test(file));
      if (scanned.length > 0) {
        videos = scanned;
      }
    }
  } catch {
    // Fallback to static references if filesystem is restricted
  }

  return { photos, videos };
}

/**
 * PressKitPage Component
 *
 * Official press and booking resources hub:
 * - Section 01: High-resolution official photographs (FOTOS).
 * - Section 02: Raw live video records & footage (VIDEOS).
 *
 * @returns {React.JSX.Element} Rendered EPK page.
 */
export default function PressKitPage(): React.JSX.Element {
  // Step 1: Read media assets from directory
  const { photos, videos } = getPressKitMedia();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#FF0000] selection:text-white">
      {/* Floating Header */}
      <Header />

      {/* Main Content Container */}
      <main className="flex-1 w-full pt-28 pb-20">
        <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12 max-w-7xl mx-auto">
          
          {/* ENCABEZADO */}
          <header className="border-b border-neutral-800 pb-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              PRESS KIT
            </h1>
          </header>

          {/* SECCIÓN 01 // FOTOS */}
          <section className="mb-16">
            <h2 className="mb-6">
              <span className="text-xs font-mono tracking-widest uppercase">
                <span className="text-[#FF0000]">{"//"}</span> FOTOS
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photoName) => (
                <article
                  key={photoName}
                  className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-3 rounded-sm transition-colors duration-200 group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/press-kit/photos/${encodeURIComponent(photoName)}`}
                      alt={`Fotografía oficial de prensa - ${photoName}`}
                      className="w-full h-full object-cover rounded-sm filter contrast-110 group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <a
                    href={`/press-kit/photos/${encodeURIComponent(photoName)}`}
                    download
                    className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400 hover:text-[#FF0000] transition-colors pt-1"
                  >
                    <span>DESCARGAR ORIGINAL</span>
                    <span className="font-bold text-xs">&darr;</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* SECCIÓN 02 // VIDEOS */}
          <section className="mb-8">
            <h2 className="mb-6">
              <span className="text-xs font-mono tracking-widest uppercase">
                <span className="text-[#FF0000]">{"//"}</span> VIDEOS
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((videoName) => (
                <article
                  key={videoName}
                  className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-3 rounded-sm transition-colors duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full aspect-video object-cover rounded-sm bg-black"
                      src={`/press-kit/videos/${encodeURIComponent(videoName)}`}
                    >
                      Tu navegador no soporta la reproducción de video.
                    </video>
                  </div>

                  <a
                    href={`/press-kit/videos/${encodeURIComponent(videoName)}`}
                    download
                    className="flex items-center justify-between text-[11px] font-mono text-neutral-400 hover:text-[#FF0000] transition-colors pt-1"
                  >
                    <span className="truncate pr-2">{videoName}</span>
                    <span className="shrink-0 font-bold text-xs">&darr;</span>
                  </a>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
