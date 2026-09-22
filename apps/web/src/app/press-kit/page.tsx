/**
 * @file apps/web/src/app/press-kit/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Official Electronic Press Kit (EPK) route for ANDHRAY.
 * Delivers high-resolution photography and live video archive with multi-language support.
 * Integrates Vercel Blob photography pipeline and zero-egress YouTube video embeds.
 */

import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site-config";
import { resolvePressKitMedia, getPressKitVideos } from "@/lib/pipelines/media-pipeline";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import type { Metadata } from "next";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import fr from "@/messages/fr.json";
import pt from "@/messages/pt.json";
import zh from "@/messages/zh.json";
import ja from "@/messages/ja.json";
import { resolveSafeLocale } from "@/i18n/constants";
import type { MessagesSchema, SupportedLocale } from "@/i18n/types";

const dictionaries: Record<SupportedLocale, MessagesSchema> = {
  en,
  es,
  de,
  it,
  fr,
  pt,
  zh,
  ja,
};

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} // PRESS KIT`,
  description: `Official press material for ${siteConfig.artist.name}: High-resolution photography, live performance videos, and technical riders.`,
};

interface PressKitPageProps {
  locale?: string;
}

/**
 * PressKitPage Component
 *
 * Official press and booking resources hub:
 * - Section 01: High-resolution official photographs (PHOTOS) resolved via Vercel Blob / CDN pipeline.
 * - Section 02: Official YouTube video archive (VIDEOS) honoring vertical (9:16) and landscape (16:9) formats.
 *
 * Security Invariants:
 * - Videos are streamed via privacy-enhanced youtube-nocookie.com, incurring zero Vercel bandwidth egress.
 * - Photography is secured and delivered via Vercel Blob storage Edge CDN.
 *
 * @param {PressKitPageProps} [props] Optional locale property for server rendering.
 * @returns {Promise<React.JSX.Element>} Rendered EPK page.
 */
export default async function PressKitPage({ locale }: PressKitPageProps = {}): Promise<React.JSX.Element> {
  // Step 1: Read photography media assets through resilient application pipeline (Vercel Blob + fallbacks)
  const { photos } = await resolvePressKitMedia();

  // Step 2: Read canonical YouTube video showcases with native aspect ratio classifications
  const videos = getPressKitVideos();

  // Step 3: Resolve safe locale and matching dictionary
  const safeLocale = resolveSafeLocale(locale);
  const t = dictionaries[safeLocale] || dictionaries.en;

  // Step 4: Partition videos by native aspect ratio for optimal visual presentation
  const shortVideos = videos.filter((v) => v.kind === "short");
  const standardVideos = videos.filter((v) => v.kind === "standard");

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
              {t.pressKitPage.title}
            </h1>
          </header>

          {/* SECCIÓN 01 // FOTOS */}
          <section className="mb-16">
            <h2 className="mb-6">
              <span className="text-xs font-mono tracking-widest uppercase">
                <span className="text-[#FF0000]">{"//"}</span> {t.pressKitPage.photosTag.replace(/^\/\/\s*/, "")}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <article
                  key={photo.id}
                  className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-3 rounded-sm transition-colors duration-200 group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={`${t.pressKitPage.photoAlt} - ${photo.id}`}
                      className="w-full h-full object-cover rounded-sm filter contrast-110 group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <a
                    href={photo.downloadUrl || photo.url}
                    download={photo.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400 hover:text-[#FF0000] transition-colors pt-1"
                  >
                    <span>{t.pressKitPage.downloadOriginal}</span>
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
                <span className="text-[#FF0000]">{"//"}</span> {t.pressKitPage.videosTag.replace(/^\/\/\s*/, "")}
              </span>
            </h2>

            {/* Vertical Shorts / Reels (9:16) */}
            {shortVideos.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-[#FF0000]">&bull;</span> SHORTS & REELS (9:16)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {shortVideos.map((video) => (
                    <YouTubeEmbed
                      key={video.id}
                      videoId={video.youtubeId}
                      title={video.title}
                      aspectRatio={video.aspectRatio}
                      watchUrl={video.watchUrl}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Widescreen Live Concerts / Performances (16:9) */}
            {standardVideos.length > 0 && (
              <div>
                <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-[#FF0000]">&bull;</span> LIVE PERFORMANCES (16:9)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {standardVideos.map((video) => (
                    <YouTubeEmbed
                      key={video.id}
                      videoId={video.youtubeId}
                      title={video.title}
                      aspectRatio={video.aspectRatio}
                      watchUrl={video.watchUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
