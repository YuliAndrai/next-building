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
    <section id="events" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10">
      <span id="tour" className="sr-only -top-20 relative" />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block mb-1">
              <span className="text-[#FF0000]">{"//"}</span> TOUR DATES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
              PRÓXIMOS EVENTOS
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
              Siguientes eventos.
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
              className="w-full bg-neutral-950 border border-neutral-800 rounded-sm text-xs uppercase tracking-widest text-white pl-9 pr-4 py-2.5 focus:outline-none focus:border-[#FF0000] placeholder:text-neutral-600 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Featured Tour Announcement Card */}
        {siteConfig.tourConfig.featuredTour && (
          <div className="mb-10 p-6 sm:p-8 bg-neutral-950 border border-neutral-800 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF0000]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-neutral-800 bg-black text-[10px] font-mono uppercase tracking-widest text-white font-semibold rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
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
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono"
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
          <div className="bg-neutral-950 border border-neutral-800 rounded-sm divide-y divide-neutral-800 overflow-hidden">
            {filteredDates.length > 0 ? (
              filteredDates.map((show: TourDate) => (
                <div
                  key={show.id}
                  className="group py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200 hover:bg-neutral-900/40 px-4 sm:px-6"
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
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono"
                      >
                        <span>BOOKING ABIERTO</span>
                      </a>
                    ) : show.status === "sold-out" ? (
                      <span className="px-5 py-2 border border-neutral-800 bg-neutral-900 text-neutral-500 text-xs font-mono font-bold uppercase tracking-widest rounded-sm">
                        SOLD OUT
                      </span>
                    ) : show.status === "rsvp" ? (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-neutral-700 bg-black text-white hover:border-[#FF0000] hover:text-[#FF0000] text-xs font-bold uppercase tracking-widest transition-colors rounded-sm font-mono"
                      >
                        RSVP
                      </a>
                    ) : (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-bold uppercase tracking-widest rounded-sm font-mono"
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
        {!standalone && (
          <div className="mt-10 flex items-center justify-end text-xs text-neutral-500 font-mono uppercase tracking-widest pt-4">
            <Link 
              href="/eventos" 
              className="group text-white hover:text-neutral-300 underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <span>VER CALENDARIO COMPLETO</span>
              <span className="transition-colors group-hover:text-[#FF0000]">&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
