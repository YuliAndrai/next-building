/**
 * @file apps/web/src/components/home/tour-dates-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Interactive Tour Schedule and Events Section for ANDHRAY.
 * Delivers Closing 2026 // Opening 2027 tour dates across LATAM, Europe & Middle East,
 * past shows isolation, and milestone release tracking. Fully localized across 10 languages.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { siteConfig, TourDate, pastTourDates } from "@/data/site-config";
import { useI18n } from "@/i18n/client";
import { Ticket, MapPin, Search, Globe, Disc, CheckCircle2, Calendar, MessageCircle, Mail } from "lucide-react";

interface TourDatesSectionProps {
  standalone?: boolean;
}

/**
 * TourDatesSection Component
 *
 * Renders tour dates schedule, featured tour banner, and search filter with full 10-language localization.
 *
 * @param props Configuration options.
 * @returns {React.JSX.Element} Rendered tour dates section.
 */
export function TourDatesSection({ standalone = false }: TourDatesSectionProps): React.JSX.Element {
  // Step 1: Consumption of internationalization context and active locale
  const { locale, t } = useI18n();

  // Step 2: Component local state for search query and tab filter (upcoming vs past)
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "all">("upcoming");

  // Step 3: Source data selection based on active tab
  const baseDates: TourDate[] =
    activeTab === "upcoming"
      ? siteConfig.tourDates
      : activeTab === "past"
      ? (siteConfig as any).pastTourDates || pastTourDates
      : [...siteConfig.tourDates, ...((siteConfig as any).pastTourDates || pastTourDates)];

  // Step 4: Search filter application across city, country, venue, and month
  const filteredDates = baseDates.filter((item) => {
    const term = searchQuery.toLowerCase();
    const city = item.id === "tour-octubre-2026" ? t.tour.tourDate1City : item.id === "tour-euro-2026" ? t.tour.tourDate2City : item.city;
    const venue = item.id === "tour-octubre-2026" ? t.tour.tourDate1Venue : item.id === "tour-euro-2026" ? t.tour.tourDate2Venue : item.venue;
    const month = item.id === "tour-octubre-2026" ? t.tour.tourDate1Month : item.id === "tour-euro-2026" ? t.tour.tourDate2Month : item.month;
    return (
      city.toLowerCase().includes(term) ||
      item.country.toLowerCase().includes(term) ||
      venue.toLowerCase().includes(term) ||
      month.toLowerCase().includes(term)
    );
  });

  const flyerImage = (siteConfig.tourConfig.featuredTour as any)?.flyerImage;

  return (
    <section id="events" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10">
      <span id="tour" className="sr-only -top-20 relative" />
      <div className="max-w-6xl mx-auto">
        {/* Step 5: Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-1">
              <span className="text-[#FF0000]">{"//"}</span> {t.tour.title}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
              {t.tour.subtitle}
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400 font-mono">
              {t.tour.description}
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder={t.tour.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-sm text-xs uppercase tracking-widest text-white pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#FF0000] placeholder:text-neutral-600 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Step 6: Featured Tour Announcement Card with Flyer Preview */}
        {siteConfig.tourConfig.featuredTour && (
          <div className="mb-10 p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF0000]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Optional Flyer Thumbnail */}
              {flyerImage && (
                <div className="relative w-20 h-28 sm:w-28 sm:h-36 shrink-0 rounded-sm overflow-hidden border border-neutral-800 bg-black block mx-auto sm:mx-0 shadow-lg">
                  <Image
                    src={flyerImage}
                    alt="Tour Flyer"
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
              )}

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-neutral-800 bg-black text-[10px] font-mono uppercase tracking-widest text-white font-semibold rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                    {t.tour.featuredBadge}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{t.tour.currentLocationPrefix} {t.tour.featuredLocation}</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white font-mono">
                  {t.tour.campaignTitle || t.tour.featuredTitle || siteConfig.tourConfig.featuredTour.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-2xl">
                  {siteConfig.tourConfig.featuredTour.detail || t.tour.featuredDetail}
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <a
                  href="https://wa.me/573137721671?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20de%20Booking%20para%20el%20Tour%20de%20ANDHRAY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#25D366]/70 bg-black text-white hover:bg-[#25D366] hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest rounded-sm font-mono w-full sm:w-auto shadow-[0_0_15px_rgba(37,211,102,0.15)] group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-black transition-colors" />
                  <span>WHATSAPP BOOKING</span>
                </a>
                <a
                  href="mailto:industrialgirls.techno@gmail.com?subject=Booking%20Inquiry%20-%20ANDHRAY%20Tour%20Closing%202026%20Opening%202027"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono w-full sm:w-auto"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF0000]" />
                  <span>EMAIL BOOKING</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Tab Selector (Próximos Shows vs. Fechas Pasadas) */}
        <div className="flex items-center gap-2 mb-6 border-b border-neutral-800/80 pb-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-colors ${
              activeTab === "upcoming"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>{t.tour.upcomingShowsTitle}</span>
            <span className="ml-2 text-[10px] opacity-70">({siteConfig.tourDates.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-colors ${
              activeTab === "past"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>{t.tour.pastShowsTitle}</span>
            <span className="ml-2 text-[10px] opacity-70">
              ({((siteConfig as any).pastTourDates || pastTourDates).length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-widest rounded-sm transition-colors hidden sm:inline-block ${
              activeTab === "all"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>TODAS ({siteConfig.tourDates.length + ((siteConfig as any).pastTourDates || pastTourDates).length})</span>
          </button>
        </div>

        {/* Step 8: Optional Seated.com Widget */}
        {siteConfig.tourConfig.useSeatedWidget ? (
          <div className="my-8">
            <div 
              id="seated-55fdf2c0" 
              data-artist-id={siteConfig.tourConfig.seatedArtistId} 
              data-css-version="3"
            />
            <Script src="https://widget.seated.com/app.js" strategy="lazyOnload" />
          </div>
        ) : (
          /* Step 9: Interactive High-End Tour Schedule Table */
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm divide-y divide-neutral-800 overflow-hidden">
            {filteredDates.length > 0 ? (
              filteredDates.map((show: TourDate) => {
                const isRelease = show.type === "release";
                const isCompleted = show.status === "completed" || show.type === "past";

                return (
                  <div
                    key={show.id}
                    className={`group py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200 hover:bg-neutral-900/40 px-4 sm:px-6 ${
                      isCompleted ? "opacity-75 bg-neutral-950/40" : ""
                    }`}
                  >
                    {/* Left: Date Display */}
                    <div className="flex items-center gap-4 min-w-[150px]">
                      <div className="text-center font-mono border-r border-neutral-800 pr-4">
                        <span className="text-[11px] uppercase text-neutral-500 font-bold block">
                          {show.month}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                          {show.dayNumber}
                        </span>
                      </div>
                      {show.year && show.year !== show.dayNumber && (
                        <span className="text-xs font-mono text-neutral-500">
                          {show.year}
                        </span>
                      )}
                    </div>

                    {/* Middle: City, Venue & Milestone details */}
                    <div className="flex-1 md:px-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isRelease ? (
                          <Disc className="w-4 h-4 text-[#FF0000]" />
                        ) : isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-neutral-500" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        )}

                        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-neutral-200 transition-colors">
                          {show.city}{show.country ? `, ${show.country}` : ""}
                        </h3>

                        {isRelease && (
                          <span className="px-2 py-0.5 border border-[#FF0000]/60 bg-[#FF0000]/10 text-[#FF0000] text-[10px] font-mono uppercase tracking-widest font-bold rounded-sm">
                            {t.tour.milestoneReleaseBadge}
                          </span>
                        )}

                        {isCompleted && (
                          <span className="px-2 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-400 text-[10px] font-mono uppercase tracking-widest font-semibold rounded-sm">
                            {t.tour.completedBadge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-widest text-neutral-400 font-mono">
                        {show.venue}
                      </p>
                    </div>

                    {/* Right: Ticket / Booking / Release Action Button */}
                    <div className="flex items-center justify-end">
                      {isCompleted ? (
                        <span className="px-5 py-2 border border-neutral-800 bg-neutral-900/60 text-neutral-500 text-xs font-mono font-bold uppercase tracking-widest rounded-sm">
                          {t.tour.completedBadge}
                        </span>
                      ) : isRelease ? (
                        <Link
                          href={`/${locale}/musica`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-700 bg-neutral-950 text-white hover:border-[#FF0000] hover:text-[#FF0000] text-xs font-bold uppercase tracking-widest transition-colors rounded-sm font-mono"
                        >
                          <Disc className="w-3.5 h-3.5" />
                          <span>DISCOGRAFÍA</span>
                        </Link>
                      ) : show.status === "booking" ? (
                        <a
                          href={`https://wa.me/573137721671?text=Hola%20ANDHRAY%2C%20quisiera%20consultar%20disponibilidad%20de%20Booking%20para%20${encodeURIComponent(show.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono w-full sm:w-auto"
                        >
                          <span>{t.tour.bookingOpenBadge}</span>
                        </a>
                      ) : show.status === "sold-out" ? (
                        <span className="px-5 py-2 border border-neutral-800 bg-neutral-900 text-neutral-500 text-xs font-mono font-bold uppercase tracking-widest rounded-sm">
                          {t.tour.soldOutBadge}
                        </span>
                      ) : show.status === "rsvp" ? (
                        <a
                          href={show.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 border border-neutral-700 bg-black text-white hover:border-[#FF0000] hover:text-[#FF0000] text-xs font-bold uppercase tracking-widest transition-colors rounded-sm font-mono"
                        >
                          {t.tour.rsvpBadge}
                        </a>
                      ) : (
                        <a
                          href={show.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>{t.tour.ticketsBadge}</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-neutral-500 text-xs uppercase tracking-widest font-mono">
                {t.tour.noShowsFound} &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        )}

        {/* Step 10: Footer Note / Dedicated route link */}
        {!standalone && (
          <div className="mt-10 flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-widest pt-4">
            <span className="text-[11px] text-neutral-600">
              MORE DATES TO BE ANNOUNCED // Bookings: industrialgirls.techno@gmail.com
            </span>
            <Link 
              href={`/${locale}/eventos`} 
              className="group text-white hover:text-neutral-300 underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <span>{t.tour.viewFullCalendar}</span>
              <span className="transition-colors group-hover:text-[#FF0000]">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
