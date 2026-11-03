/**
 * @file apps/web/src/components/home/news-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Latest News & Streams Section featuring Tour Announcement flyer (Closing 2026 // Opening 2027),
 * HÖR Berlin YouTube DJ set embed, and MEMENTO Spotify mini player.
 * Fully localized across 10 languages.
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/client";
import { siteConfig } from "@/data/site-config";
import { Calendar, Mail, ArrowUpRight, Sparkles, MessageCircle } from "lucide-react";

/**
 * NewsSection Component
 *
 * Renders the featured media section with:
 * 1. Top feature: ANDHRAY Closing 2026 // Opening 2027 official tour announcement with verified flyer asset.
 * 2. Left column: HÖR Berlin YouTube DJ set responsive video player and direct watch button.
 * 3. Right column: MEMENTO track featured mini player and upcoming EP teaser card.
 *
 * @returns {React.JSX.Element} The rendered NewsSection.
 */
export function NewsSection(): React.JSX.Element {
  // Step 1: Consumption of localized messages and active locale
  const { locale, t } = useI18n();

  // Step 2: Extraction of tour announcement parameters
  const tourImage = (siteConfig.tourConfig.featuredTour as any)?.flyerImage || "/primeras-fechas-confirmadas-tour-cierre-2026/ANDHRAY_TOUR 2026 2027.jpg";

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-neutral-800 w-full">
      {/* Step 3: Section Header */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          <span className="text-[#FF0000]">{"//"}</span> {t.news.title}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
          {t.news.subtitle}
        </span>
      </div>

      {/* Step 4: Featured Tour Announcement Card (Closing 2026 // Opening 2027) */}
      <div className="mb-12 p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF0000]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Official Tour Flyer Image */}
          <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-md mx-auto rounded-sm overflow-hidden border border-neutral-800 bg-black group-hover:border-[#FF0000]/40 transition-colors duration-300 shadow-2xl">
            <Image
              src={tourImage}
              alt="ANDHRAY Tour Closing 2026 Opening 2027"
              fill
              className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <span>LATAM • EUROPE • MIDDLE EAST</span>
              <span className="text-[#FF0000] font-bold">2026 - 2027</span>
            </div>
          </div>

          {/* Right Column: Tour Details & Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-neutral-800 bg-black text-[10px] font-mono uppercase tracking-widest text-white font-semibold rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                {t.news.tourAnnouncementBadge}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>FIRST CONFIRMED DATES</span>
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono leading-none">
                {t.news.tourAnnouncementTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                {t.news.tourAnnouncementDescription}
              </p>
            </div>

            {/* Itinerary highlights summary */}
            <div className="p-4 bg-black/60 border border-neutral-800/80 rounded-sm space-y-2">
              <div className="text-[11px] font-mono text-neutral-400">
                <span className="text-white font-bold text-xs uppercase tracking-wider block mb-1">
                  LATAM:
                </span>
                <p className="text-neutral-400 text-xs">
                  Pereira, Colombia ☑️ • Pasto, Colombia ☑️ • Quito, Ecuador • Cuenca, Ecuador • 💿 18.11 EP: 02 ++GATTA
                </p>
              </div>
              <div className="text-[11px] font-mono text-neutral-400 pt-1 border-t border-neutral-900">
                <span className="text-white font-bold text-xs uppercase tracking-wider block mb-1">
                  EUROPE & MIDDLE EAST:
                </span>
                <p className="text-neutral-400 text-xs">
                  Barcelona, Spain • Spain • Padua, Italy • Lyon, France • Tenerife, Spain • Dubai, UAE • Madrid, Spain
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href={`/${locale}/#events`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest rounded-sm font-mono shadow-[0_0_15px_rgba(255,0,0,0.15)] w-full sm:w-auto text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.news.viewTourDatesButton}</span>
              </Link>
              <a
                href="https://wa.me/573137721671?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20de%20Booking%20para%20el%20Tour%20de%20ANDHRAY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#25D366]/70 bg-black text-white hover:bg-[#25D366] hover:text-black transition-colors text-xs font-mono uppercase tracking-widest rounded-sm w-full sm:w-auto text-center group"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-black transition-colors" />
                <span>WhatsApp Booking</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:industrialgirls.techno@gmail.com?subject=Booking%20Inquiry%20-%20ANDHRAY%20Tour%20Closing%202026%20Opening%202027"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-xs font-mono uppercase tracking-widest rounded-sm w-full sm:w-auto text-center"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>Email Booking</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: Media Streams Grid (HÖR Berlin & Memento) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: HÖR Berlin video */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF0000] animate-pulse mr-2" />
              HÖR BERLIN <span className="text-[#FF0000] mx-1">{"//"}</span> {t.news.liveBadge}
            </span>
            <span className="text-[11px] font-mono text-neutral-500">{t.news.liveDate}</span>
          </div>
          <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-neutral-800 bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_xtvbbRCeGU"
              title="Andhray - HÖR Berlin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <p className="text-xs font-mono text-neutral-400">
              {t.news.liveDescription}
            </p>
            <a
              href="https://www.youtube.com/watch?v=_xtvbbRCeGU"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors shrink-0"
            >
              <span>{t.news.watchLiveButton}</span>
              <span className="transition-colors group-hover:text-[#FF0000]">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Right column: Memento player & upcoming EP teaser */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              {t.news.featuredTrackTitle} <span className="text-[#FF0000] mx-1">{"//"}</span> MEMENTO
            </span>
            <p className="text-[11px] font-mono text-neutral-500 mt-1">
              {t.news.featuredTrackType}
            </p>
          </div>
          
          <div className="w-full rounded-sm overflow-hidden border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-2 transition-colors duration-200">
            <iframe
              style={{ borderRadius: "4px" }}
              src="https://open.spotify.com/embed/track/68KwzzA0ybAGpUALiaJ0Ci?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Andhray - Memento"
            />
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-4 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-mono text-[#FF0000] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                {t.news.upcomingBadge}
              </span>
              <span className="px-2 py-0.5 bg-black border border-neutral-800 text-[10px] font-mono font-bold text-white rounded-sm">
                18 NOV 2026
              </span>
            </div>
            <h4 className="text-sm font-bold text-white uppercase font-mono">
              {t.news.upcomingTitle}
            </h4>
            <p className="text-xs text-neutral-400 font-sans mt-1">
              {t.news.upcomingDescription}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
