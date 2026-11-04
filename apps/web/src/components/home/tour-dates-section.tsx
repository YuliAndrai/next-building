/**
 * @file apps/web/src/components/home/tour-dates-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Interactive Tour Schedule and Events Section for ANDHRAY.
 * Delivers Closing 2026 // Opening 2027 tour dates across LATAM, Europe & Middle East,
 * past shows isolation, month-based segmentation, and mobile-optimized compact presentation.
 * Fully localized across 10 languages.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { siteConfig, TourDate, pastTourDates } from "@/data/site-config";
import { useI18n } from "@/i18n/client";
import { Ticket, MapPin, Search, Globe, Disc, CheckCircle2, MessageCircle, Mail } from "lucide-react";

interface TourDatesSectionProps {
  standalone?: boolean;
}

type TourSegment = "upcoming" | "nov-2026" | "dic-2026" | "ene-2027" | "past" | "all";

/**
 * TourDatesSection Component
 *
 * Renders tour dates schedule, featured tour banner, and search filter with full 10-language localization.
 * Features mobile-first compact row cards and month-based segmentation controls to optimize vertical viewport footprint.
 *
 * @param props Configuration options.
 * @returns {React.JSX.Element} Rendered tour dates section.
 */
export function TourDatesSection({ standalone = false }: TourDatesSectionProps): React.JSX.Element {
  // Step 1: Consumption of internationalization context and active locale
  const { locale, t } = useI18n();

  // Step 2: Component local state for search query and tab/segment filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TourSegment>("upcoming");

  // Step 3: Source data extraction & segment partitioning
  const allUpcoming = siteConfig.tourDates;
  const allPast = (siteConfig as any).pastTourDates || pastTourDates;
  const allCombined = [...allUpcoming, ...allPast];

  const novUpcoming = allUpcoming.filter((d) => d.month === "NOVIEMBRE" && d.year === "2026");
  const dicUpcoming = allUpcoming.filter((d) => d.month === "DICIEMBRE" && d.year === "2026");
  const eneUpcoming = allUpcoming.filter((d) => d.month === "ENERO" && d.year === "2027");

  const upcomingCount = allUpcoming.length;
  const pastCount = allPast.length;
  const totalCount = allCombined.length;
  const novCount = novUpcoming.length;
  const dicCount = dicUpcoming.length;
  const eneCount = eneUpcoming.length;

  const baseDates: TourDate[] =
    activeTab === "upcoming"
      ? allUpcoming
      : activeTab === "nov-2026"
      ? novUpcoming
      : activeTab === "dic-2026"
      ? dicUpcoming
      : activeTab === "ene-2027"
      ? eneUpcoming
      : activeTab === "past"
      ? allPast
      : allCombined;

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

  // Track previous month for group dividers in multi-month views
  let previousMonthTracker = "";

  return (
    <section id="events" className="w-full py-12 sm:py-20 px-3.5 sm:px-6 lg:px-8 bg-transparent relative z-10">
      <span id="tour" className="sr-only -top-20 relative" />
      <div className="max-w-6xl mx-auto">
        {/* Step 5: Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-neutral-800">
          <div>
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-1">
              <span className="text-[#FF0000]">{"//"}</span> {t.tour.title}
            </span>
            <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-widest text-white leading-tight">
              {t.tour.subtitle}
            </h2>
            <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-mono">
              {t.tour.description}
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder={t.tour.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-sm text-[11px] sm:text-xs uppercase tracking-widest text-white pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 focus:outline-none focus:border-[#FF0000] placeholder:text-neutral-600 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Step 6: Featured Tour Announcement Card with Flyer Preview (Compact on Mobile) */}
        {siteConfig.tourConfig.featuredTour && (
          <div className="mb-6 sm:mb-10 p-4 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF0000]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              
              {/* Optional Flyer Thumbnail */}
              {flyerImage && (
                <div className="relative w-16 h-22 sm:w-28 sm:h-36 shrink-0 rounded-sm overflow-hidden border border-neutral-800 bg-black block mx-auto sm:mx-0 shadow-lg">
                  <Image
                    src={flyerImage}
                    alt="Tour Flyer"
                    fill
                    className="object-cover object-top"
                    sizes="120px"
                  />
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-2 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-neutral-800 bg-black text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white font-semibold rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                    {t.tour.featuredBadge}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-[#FF0000]/60 bg-[#FF0000]/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#FF0000] font-semibold rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                    {t.tour.bookingOpenBadge}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-neutral-500" />
                    <span>{t.tour.currentLocationPrefix} {t.tour.featuredLocation}</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-white font-mono">
                  {t.tour.campaignTitle || t.tour.featuredTitle || siteConfig.tourConfig.featuredTour.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
                  {siteConfig.tourConfig.featuredTour.detail || t.tour.featuredDetail}
                </p>
              </div>

              <div className="shrink-0 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-2.5">
                <a
                  href="https://wa.me/573137721671?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20de%20Booking%20para%20el%20Tour%20de%20ANDHRAY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 sm:py-3 border border-[#25D366]/70 bg-black text-white hover:bg-[#25D366] hover:text-black transition-all duration-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm font-mono shadow-[0_0_15px_rgba(37,211,102,0.15)] group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-black transition-colors" />
                  <span>WHATSAPP</span>
                </a>
                <a
                  href="mailto:industrialgirls.techno@gmail.com?subject=Booking%20Inquiry%20-%20ANDHRAY%20Tour%20Closing%202026%20Opening%202027"
                  className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 sm:py-3 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm font-mono"
                >
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF0000]" />
                  <span>EMAIL</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Segmented Controls (Scroll horizontal fluido en móvil, segmentado por mes) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-6 pb-2 border-b border-neutral-800/80 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "upcoming"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>{t.tour.upcomingShowsTitle || "PRÓXIMOS"}</span>
            <span className="ml-1.5 text-[10px] opacity-70">({upcomingCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("nov-2026")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "nov-2026"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>NOV &apos;26</span>
            <span className="ml-1.5 text-[10px] opacity-70">({novCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dic-2026")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "dic-2026"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span className="text-[#FF0000] font-black mr-1">•</span>
            <span>DIC &apos;26</span>
            <span className="ml-1.5 text-[10px] opacity-70">({dicCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ene-2027")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "ene-2027"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>ENE &apos;27</span>
            <span className="ml-1.5 text-[10px] opacity-70">({eneCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "past"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>{t.tour.pastShowsTitle || "PASADAS"}</span>
            <span className="ml-1.5 text-[10px] opacity-70">({pastCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              activeTab === "all"
                ? "bg-white text-black"
                : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            <span>TODAS ({totalCount})</span>
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
          /* Step 9: Interactive High-End Tour Schedule Table (Ultra-compact mobile layout) */
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm divide-y divide-neutral-800 overflow-hidden">
            {filteredDates.length > 0 ? (
              filteredDates.map((show: TourDate) => {
                const isRelease = show.type === "release";
                const isCompleted = show.status === "completed" || show.type === "past";

                // In multi-month views, insert month divider
                const isMultiMonthView = (activeTab === "upcoming" || activeTab === "all") && !searchQuery;
                const showMonthDivider = isMultiMonthView && show.month !== previousMonthTracker;
                if (showMonthDivider) {
                  previousMonthTracker = show.month;
                }

                return (
                  <React.Fragment key={show.id}>
                    {showMonthDivider && (
                      <div className="bg-neutral-900/90 px-3.5 sm:px-6 py-1.5 border-b border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#FF0000]">{"//"}</span>
                          <span>{show.month} {show.year}</span>
                        </span>
                      </div>
                    )}

                    <div
                      className={`group py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6 transition-colors duration-200 hover:bg-neutral-900/40 px-3.5 sm:px-6 ${
                        isCompleted ? "opacity-75 bg-neutral-950/40" : ""
                      }`}
                    >
                      {/* Left: Date Display + Location Details */}
                      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
                        {/* Compact Date Box */}
                        <div className="text-center font-mono border-r border-neutral-800 pr-2.5 sm:pr-4 shrink-0 w-11 sm:w-16">
                          <span className="text-[9px] sm:text-[11px] uppercase text-neutral-500 font-bold block leading-none">
                            {show.month.slice(0, 3)}
                          </span>
                          <span className="text-lg sm:text-2xl font-black text-white block leading-tight mt-0.5">
                            {show.dayNumber}
                          </span>
                          {show.year && show.year !== show.dayNumber && (
                            <span className="text-[8px] sm:text-[10px] font-mono text-neutral-600 block leading-none">
                              {show.year}
                            </span>
                          )}
                        </div>

                        {/* Middle: City, Venue & Milestone details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            {isRelease ? (
                              <Disc className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                            ) : isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                            ) : (
                              <MapPin className="w-3 h-3 text-neutral-500 shrink-0" />
                            )}

                            <h3 className="text-xs sm:text-base font-bold uppercase tracking-wide text-white group-hover:text-neutral-200 transition-colors">
                              {show.city}{show.country ? `, ${show.country}` : ""}
                            </h3>

                            {isRelease && (
                              <span className="px-1.5 py-0.2 border border-[#FF0000]/60 bg-[#FF0000]/10 text-[#FF0000] text-[8px] sm:text-[10px] font-mono uppercase tracking-widest font-bold rounded-sm">
                                {t.tour.milestoneReleaseBadge}
                              </span>
                            )}

                            {isCompleted && (
                              <span className="px-1.5 py-0.2 border border-neutral-800 bg-neutral-900 text-neutral-400 text-[8px] sm:text-[10px] font-mono uppercase tracking-widest font-semibold rounded-sm">
                                {t.tour.completedBadge}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-mono line-clamp-2 sm:line-clamp-none">
                            {show.venue}
                          </p>
                        </div>
                      </div>

                      {/* Right: Ticket / Booking / Release Action Button (Responsive Pill) */}
                      <div className="shrink-0 flex items-center justify-end">
                        {isCompleted ? (
                          <span className="px-2.5 sm:px-4 py-1 sm:py-1.5 border border-neutral-800 bg-neutral-900/60 text-neutral-500 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest rounded-sm text-center">
                            <span className="hidden sm:inline">{t.tour.completedBadge}</span>
                            <span className="sm:hidden">HECHO</span>
                          </span>
                        ) : isRelease ? (
                          <Link
                            href={`/${locale}/musica`}
                            className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-4 py-1 sm:py-1.5 border border-neutral-700 bg-neutral-950 text-white hover:border-[#FF0000] hover:text-[#FF0000] text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors rounded-sm font-mono text-center"
                          >
                            <Disc className="w-3 h-3 text-[#FF0000]" />
                            <span className="hidden sm:inline">DISCOGRAFÍA</span>
                            <span className="sm:hidden">EP</span>
                          </Link>
                        ) : show.status === "sold-out" ? (
                          <span className="px-2.5 sm:px-4 py-1 sm:py-1.5 border border-neutral-800 bg-neutral-900 text-neutral-500 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest rounded-sm text-center">
                            {t.tour.soldOutBadge}
                          </span>
                        ) : show.status === "rsvp" ? (
                          <a
                            href={show.ticketUrl.startsWith("http") ? show.ticketUrl : `/${locale}${show.ticketUrl.startsWith("/") ? "" : "/"}${show.ticketUrl}`}
                            target={show.ticketUrl.startsWith("http") ? "_blank" : undefined}
                            rel={show.ticketUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center justify-center px-3 sm:px-5 py-1 sm:py-1.5 border border-neutral-700 bg-black text-white hover:border-[#FF0000] hover:text-[#FF0000] text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors rounded-sm font-mono text-center"
                          >
                            {t.tour.rsvpBadge}
                          </a>
                        ) : (
                          <a
                            href={show.ticketUrl.startsWith("http") ? show.ticketUrl : `/${locale}${show.ticketUrl.startsWith("/") ? "" : "/"}${show.ticketUrl}`}
                            target={show.ticketUrl.startsWith("http") ? "_blank" : undefined}
                            rel={show.ticketUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-1 sm:py-1.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-sm font-mono text-center group"
                          >
                            <Ticket className="w-3 h-3" />
                            <span>{t.tour.ticketsBadge}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
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
          <div className="mt-8 sm:mt-10 flex items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-widest pt-4">
            <span className="text-[10px] sm:text-[11px] text-neutral-600">
              MORE DATES TO BE ANNOUNCED // Bookings: industrialgirls.techno@gmail.com
            </span>
            <Link 
              href={`/${locale}/eventos`} 
              className="group text-white hover:text-neutral-300 underline underline-offset-4 inline-flex items-center gap-1.5 text-[11px] sm:text-xs"
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
