"use client";

/**
 * @file apps/web/src/components/home/music-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Official Music Section featuring the digital tracklist table, embedded MEMENTO Spotify mini-player, official channels quickbar, and curated podcasts/DJ sets.
 */

import React, { useState } from "react";
import {
  siteConfig,
  releasesData,
  podcastsData,
  TrackItem,
  PodcastSetItem,
  OfficialChannel
} from "@/data/site-config";
import {
  SpotifyIcon,
  SoundcloudIcon,
  AppleMusicIcon,
  BeatportIcon,
  BandcampIcon,
  YoutubeIcon
} from "@/components/ui/social-icons";
import { ExternalLink, Radio, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ActiveTrackState Interface
 *
 * Represents the track actively loaded in the embedded Spotify mini-player.
 */
type ActiveTrackState = TrackItem | {
  title: string;
  year: string;
  spotifyId?: string | null;
};

/**
 * MusicSection Component
 *
 * Renders the comprehensive music portfolio of ANDHRAY:
 * 1. Main Header with Official channels quick-access bar.
 * 2. Embedded Dynamic Spotify mini-player with stateful track switching.
 * 3. Complete digital tracklist table with row-level selection and fallback SoundCloud highlighting.
 * 4. Podcasts and live DJ sets subsection with responsive video/audio players.
 *
 * @returns {React.JSX.Element} The rendered Music section.
 */
export function MusicSection(): React.JSX.Element {
  // Step 1: Retrieve configuration data directly from official releases and podcasts
  const channels: OfficialChannel[] = siteConfig.officialChannels;
  const tracks: TrackItem[] = releasesData;
  const podcasts: PodcastSetItem[] = podcastsData;

  // Step 2: Initialize reactive activeTrack state (defaults to tracks[0])
  const [activeTrack, setActiveTrack] = useState<TrackItem>(tracks[0]);
  const [soundCloudHighlightId, setSoundCloudHighlightId] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  /**
   * Handles user selection on a track row or title to update the active mini-player.
   * If the track provides a valid spotifyId, updates activeTrack immediately and clears highlights.
   * If the track lacks a spotifyId (e.g. DAGA ADICTA RE EDIT), preserves activeTrack
   * and highlights the SoundCloud action button with an informative notice.
   *
   * @param track - Selected TrackItem from releasesData
   */
  const handleSelectTrack = (track: TrackItem) => {
    // Step 2.1: Verify if track has a Spotify ID
    if (track.spotifyId) {
      setActiveTrack(track);
      setSoundCloudHighlightId(null);
      setNoticeMessage(null);
    } else {
      // Step 2.2: Track lacks Spotify -> keep previous player, highlight SoundCloud
      setSoundCloudHighlightId(track.id);
      setNoticeMessage(
        `"${track.title}" no está disponible en Spotify. Escúchalo directamente en SoundCloud.`
      );
    }
  };

  // Step 3: Separate featured HÖR Berlin live video from curated podcasts/sets
  const featuredVideoSet = podcasts.find((p) => Boolean(p.embedUrl)) || podcasts[0];
  const otherPodcasts = podcasts.filter((p) => p !== featuredVideoSet);

  return (
    <section id="music" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        
        {/* Step 3: Main Section Header, Channels Quickbar & MEMENTO Spotify Mini Player */}
        <div className="space-y-8 pb-8 border-b border-neutral-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
                {"// DIGITAL DISCOGRAPHY & ARCHIVE"}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
                MÚSICA // RELEASES
              </h2>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-neutral-400 max-w-2xl">
                Catálogo sonoro digital 100% oficial. Producciones originales, colaboraciones y remixes.
              </p>
            </div>

            {/* Step 3.1: Barra de Canales Oficiales */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {channels.map((channel) => (
                <a
                  key={channel.platform}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 min-h-[44px] bg-neutral-900/80 border border-neutral-800 hover:border-white hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider"
                  aria-label={`Visitar canal oficial de ${channel.name}`}
                >
                  {channel.platform === "spotify" && <SpotifyIcon className="w-3.5 h-3.5 text-emerald-400" />}
                  {channel.platform === "soundcloud" && <SoundcloudIcon className="w-4 h-4 text-orange-400" />}
                  {channel.platform === "appleMusic" && <AppleMusicIcon className="w-4 h-4 text-pink-400" />}
                  {channel.platform === "beatport" && <BeatportIcon className="w-4 h-4 text-cyan-400" />}
                  {channel.platform === "bandcamp" && <BandcampIcon className="w-4 h-4 text-sky-400" />}
                  <span>{channel.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4: Tracklist Digital (Tabla minimalista oscura en orden cronológico estricto) */}
        <div className="space-y-6">
          {/* Contenedor del Reproductor con iframe oficial embebido de Spotify */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2 font-mono flex items-center justify-between">
              <span>{"// REPRODUCTOR // "}{activeTrack ? `${activeTrack.title} [${activeTrack.year}]` : "MEMENTO [2025]"}</span>
              {noticeMessage && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 flex items-center gap-1.5 animate-pulse">
                  <Radio className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{noticeMessage}</span>
                </span>
              )}
            </div>
            <iframe
              key={activeTrack?.spotifyId || "68KwzzA0ybAGpUALiaJ0Ci"}
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/track/${activeTrack?.spotifyId || "68KwzzA0ybAGpUALiaJ0Ci"}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify Mini Player - ${activeTrack?.title || "MEMENTO"}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-neutral-900">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                {"// COMPLETE DIGITAL TRACKLIST"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                CATÁLOGO DE TRACKS ({tracks.length})
              </h3>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              DISCOGRAFÍA DIGITAL &bull; 2025 – 2021
            </p>
          </div>

          {/* Tabla Minimalista Oscura de Releases */}
          <div className="overflow-x-auto border border-neutral-900 bg-black">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Catálogo y discografía completa de lanzamientos digitales oficiales de ANDHRAY</caption>
              <thead>
                <tr className="border-b border-neutral-800 bg-neutral-950 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  <th scope="col" className="py-3 px-4 font-bold text-neutral-400 w-24 sm:w-28">AÑO</th>
                  <th scope="col" className="py-3 px-4 font-bold text-neutral-400">TÍTULO DEL TRACK</th>
                  <th scope="col" className="py-3 px-4 font-bold text-neutral-400 w-36 sm:w-48">TIPO / SELLO</th>
                  <th scope="col" className="py-3 px-4 font-bold text-neutral-400 text-right sm:text-left w-48 sm:w-60">PLATAFORMAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-mono text-xs">
                {tracks.map((track) => {
                  const isCurrentlyPlaying = activeTrack.spotifyId === track.spotifyId;
                  const isSoundcloudHighlighted = soundCloudHighlightId === track.id;

                  return (
                    <tr
                      key={track.id}
                      onClick={() => handleSelectTrack(track)}
                      className={cn(
                        "cursor-pointer hover:bg-neutral-900/50 transition-colors group",
                        isCurrentlyPlaying
                          ? "bg-neutral-900/60 border-l-2 border-l-red-500"
                          : isSoundcloudHighlighted
                          ? "bg-orange-950/20 border-l-2 border-l-orange-500"
                          : ""
                      )}
                    >
                      {/* Columna [Año] */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px] font-semibold tracking-wider">
                          {track.year}
                        </span>
                      </td>

                      {/* Columna [Título del Track] con botón interactivo para actualizar reproductor */}
                      <td className="py-3.5 px-4">
                        <div
                          className="text-left font-sans font-bold text-sm text-white group-hover:text-red-400 transition-colors uppercase tracking-wide flex items-center gap-2"
                        >
                          {isCurrentlyPlaying && (
                            <Play className="w-3 h-3 text-red-500 fill-red-500 shrink-0 animate-pulse" />
                          )}
                          <span>{track.title}</span>
                          {isCurrentlyPlaying && (
                            <span className="text-[9px] font-mono text-red-400 border border-red-500/40 px-1 py-0.5 bg-red-500/10 uppercase tracking-widest hidden sm:inline-block">
                              SONANDO
                            </span>
                          )}
                          {isSoundcloudHighlighted && (
                            <span className="text-[9px] font-mono text-orange-400 border border-orange-500/40 px-1 py-0.5 bg-orange-500/10 uppercase tracking-widest animate-pulse flex items-center gap-1">
                              <Radio className="w-2.5 h-2.5" />
                              EXCLUSIVO SOUNDCLOUD
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Columna [Tipo / Sello] */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800/80 text-neutral-400 text-[10px] uppercase tracking-wider font-mono">
                          {track.type}
                        </span>
                      </td>

                      {/* Columna [Enlaces con iconos discretos a Spotify, SoundCloud, Beatport, Apple Music, Bandcamp] */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end sm:justify-start gap-1 sm:gap-2">
                          {track.links.spotify && (
                            <a
                              href={track.links.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-emerald-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
                              aria-label={`Escuchar ${track.title} en Spotify`}
                              title="Spotify"
                            >
                              <SpotifyIcon className="w-4 h-4" />
                            </a>
                          )}
                          {track.links.soundcloud && (
                            <a
                              href={track.links.soundcloud}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-all",
                                isSoundcloudHighlighted
                                  ? "bg-orange-500/20 border border-orange-500 text-orange-400 ring-2 ring-orange-500/60 shadow-[0_0_12px_rgba(249,115,22,0.4)] animate-pulse scale-105"
                                  : "text-neutral-500 hover:text-orange-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
                              )}
                              aria-label={`Escuchar ${track.title} en SoundCloud`}
                              title="SoundCloud"
                            >
                              <SoundcloudIcon className="w-4 h-4" />
                            </a>
                          )}
                          {track.links.beatport && (
                            <a
                              href={track.links.beatport}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-cyan-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
                              aria-label={`Comprar ${track.title} en Beatport`}
                              title="Beatport"
                            >
                              <BeatportIcon className="w-4 h-4" />
                            </a>
                          )}
                          {track.links.appleMusic && (
                            <a
                              href={track.links.appleMusic}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-pink-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
                              aria-label={`Escuchar ${track.title} en Apple Music`}
                              title="Apple Music"
                            >
                              <AppleMusicIcon className="w-4 h-4" />
                            </a>
                          )}
                          {track.links.bandcamp && (
                            <a
                              href={track.links.bandcamp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-sky-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
                              aria-label={`Adquirir ${track.title} en Bandcamp`}
                              title="Bandcamp"
                            >
                              <BandcampIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Step 5: Subsección de Podcasts y DJ Sets (Ordenados por fecha) */}
        <div className="space-y-10 pt-8 border-t border-neutral-900">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-neutral-900">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                {"// LIVE RECORDINGS & CURATED PODCASTS"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                PODCASTS & DJ SETS
              </h3>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              SESIONES EN VIVO &bull; EMISIONES Y PODCASTS EXCLUSIVOS
            </p>
          </div>

          {/* Step 5.1: Video Performance Destacada: HÖR Berlin (July 24 / 2026) con Embed Responsivo */}
          {featuredVideoSet && (
            <article className="bg-black border border-neutral-800 p-5 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-900">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      SESIÓN EN VIVO // YOUTUBE
                    </span>
                    <span className="text-xs font-mono text-neutral-400 font-semibold">
                      {featuredVideoSet.date}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-3xl font-black uppercase tracking-wide text-white">
                    {featuredVideoSet.title}
                  </h4>
                  {featuredVideoSet.description && (
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      {featuredVideoSet.description}
                    </p>
                  )}
                </div>

                <a
                  href={featuredVideoSet.url || "https://www.youtube.com/watch?v=_xtvbbRCeGU"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-white text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-all self-start sm:self-auto shrink-0"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-500" />
                  <span>VER EN YOUTUBE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Reproductor de Video Embebido Responsivo de YouTube (450px) */}
              <div className="relative aspect-video w-full max-h-[450px] overflow-hidden bg-neutral-950 border border-neutral-800">
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/_xtvbbRCeGU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </article>
          )}

          {/* Step 5.2: Grilla de Sets y Podcasts Curados (Riöt.scampia, Techno Germany 127, TMORCAST115, Comme Dans Les Films) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPodcasts.map((item) => {
              const isYouTube = Boolean(item.url?.includes("youtube.com"));
              return (
                <article
                  key={item.title}
                  className="bg-black border border-neutral-900 p-5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      {isYouTube ? (
                        <span className="px-2.5 py-0.5 bg-red-600/20 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <YoutubeIcon className="w-3 h-3 text-red-500" />
                          YOUTUBE LIVE SET
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-orange-600/20 border border-orange-500/40 text-orange-400 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Radio className="w-3 h-3 text-orange-400" />
                          SOUNDCLOUD PODCAST
                        </span>
                      )}
                      <span className="text-xs font-mono text-neutral-400 font-semibold">
                        [{item.date}]
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-white">
                      {item.title}
                    </h4>

                    {item.description && (
                      <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-900 flex justify-end">
                    <a
                      href={item.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
                    >
                      {isYouTube ? (
                        <>
                          <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                          <span>VER EN YOUTUBE</span>
                        </>
                      ) : (
                        <>
                          <SoundcloudIcon className="w-3.5 h-3.5 text-orange-400" />
                          <span>ESCUCHAR EN SOUNDCLOUD</span>
                        </>
                      )}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

