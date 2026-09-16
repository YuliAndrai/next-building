"use client";

import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { siteConfig, TourDate } from "@/data/site-config";
import { Ticket, MapPin, Search, Globe } from "lucide-react";

interface TourDatesSectionProps {
  standalone?: boolean;
}

export function TourDatesSection({ standalone = false }: TourDatesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDates = siteConfig.tourDates.filter((item) => {
    const term = searchQuery.toLowerCase();
    return (
      item.city.toLowerCase().includes(term) ||
      item.country.toLowerCase().includes(term) ||
      item.venue.toLowerCase().includes(term) ||
      item.date.toLowerCase().includes(term)
    );
  });

  return (
    <section id="tour" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// LIVE EXPERIENCE"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
              TOUR DATES
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
              Upcoming rituals, festival headline dates, and club ceremonies.
            </p>
          </div>

          {/* Search Filter */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="FILTER BY CITY OR VENUE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-xs uppercase tracking-widest text-white pl-9 pr-4 py-2.5 focus:outline-none focus:border-neutral-500 placeholder:text-neutral-600 font-mono"
            />
          </div>
        </div>

        {/* Featured Tour Announcement Card */}
        {siteConfig.tourConfig.featuredTour && (
          <div className="mb-10 p-6 sm:p-8 bg-neutral-950 border border-neutral-850 hover:border-neutral-700 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-950/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-red-900/60 bg-red-950/50 text-[10px] font-mono uppercase tracking-widest text-red-400 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    GIRA DESTACADA
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Ubicación actual: {siteConfig.tourConfig.featuredTour.currentLocation}</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white">
                  {siteConfig.tourConfig.featuredTour.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-w-2xl">
                  {siteConfig.tourConfig.featuredTour.detail}
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                >
                  CONTACTAR BOOKING
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Optional Seated.com Widget (As used by Sara Landry) */}
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
          /* Interactive High-End Tour Schedule Table */
          <div className="divide-y divide-neutral-900 border-y border-neutral-900">
            {filteredDates.length > 0 ? (
              filteredDates.map((show: TourDate) => (
                <div
                  key={show.id}
                  className="group py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 hover:bg-neutral-950/80 px-2 sm:px-4"
                >
                  {/* Left: Date Display */}
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <div className="text-center font-mono border-r border-neutral-800 pr-4">
                      <span className="text-xs uppercase text-neutral-500 font-bold block">
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

                  {/* Middle: City & Venue */}
                  <div className="flex-1 md:px-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-neutral-200 transition-colors">
                        {show.city}{show.country ? `, ${show.country}` : ""}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-widest text-neutral-400 font-mono">
                      {show.venue}
                    </p>
                  </div>

                  {/* Right: Ticket Action Button */}
                  <div className="flex items-center justify-end">
                    {show.status === "booking" ? (
                      <a
                        href={show.ticketUrl.startsWith("#") ? `/${show.ticketUrl}` : show.ticketUrl}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-sm"
                      >
                        <span>BOOKING ABIERTO</span>
                      </a>
                    ) : show.status === "sold-out" ? (
                      <span className="px-5 py-2 border border-neutral-800 bg-neutral-900 text-neutral-500 text-xs font-mono font-bold uppercase tracking-widest">
                        SOLD OUT
                      </span>
                    ) : show.status === "rsvp" ? (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white transition-colors"
                      >
                        RSVP
                      </a>
                    ) : (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-sm"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>TICKETS</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-neutral-500 text-xs uppercase tracking-widest font-mono">
                NO UPCOMING SHOWS MATCHING &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        )}

        {/* Footer Note / Dedicated route link */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono uppercase tracking-widest pt-4">
          <span>ALL DATES SUBJECT TO CHANGE // 18+ UNLESS NOTED</span>
          {!standalone && (
            <Link 
              href="/live" 
              className="mt-2 sm:mt-0 text-white hover:text-neutral-300 underline underline-offset-4"
            >
              VIEW FULL TOUR CALENDAR ON /LIVE &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
