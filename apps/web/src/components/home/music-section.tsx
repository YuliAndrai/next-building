"use client";

/**
 * @file apps/web/src/components/home/music-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Official Music Section featuring the digital tracklist with direct embedded Spotify mini-players, official channels quickbar, and curated podcasts/DJ sets.
 */

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
import { ExternalLink, Radio } from "lucide-react";

/**
 * MusicSection Component
 *
 * Renders the comprehensive music portfolio of ANDHRAY:
 * 1. Main Header with Official channels quick-access bar.
 * 2. Complete digital tracklist with direct integrated Spotify/SoundCloud mini-players per track.
 * 3. Podcasts and live DJ sets subsection with responsive video/audio players.
 *
 * @returns {React.JSX.Element} The rendered Music section.
 */
export function MusicSection(): React.JSX.Element {
  // Step 1: Retrieve configuration data directly from official releases and podcasts
  const channels: OfficialChannel[] = siteConfig.officialChannels;
  const tracks: TrackItem[] = releasesData;
  const podcasts: PodcastSetItem[] = podcastsData;

  // Step 2: Separate featured HÖR Berlin live video from curated podcasts/sets
  const featuredVideoSet = podcasts.find((p) => Boolean(p.embedUrl)) || podcasts[0];
  const otherPodcasts = podcasts.filter((p) => p !== featuredVideoSet);

  return (
    <section id="music" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        
        {/* Step 3: Main Section Header, Channels Quickbar */}
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
                PRODUCCIONES Y PODCASTS
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

        {/* Step 4: Tracklist Digital con Mini Players Embebidos Directos */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-neutral-900">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                {"// COMPLETE DIGITAL TRACKLIST"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                CATÁLOGO DE TRACKS (14)
              </h3>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              DISCOGRAFÍA DIGITAL &bull; 2025 – 2021
            </p>
          </div>

          {/* Lista de Tracks con Reproductor Embebido Directo */}
          <div className="divide-y divide-neutral-900 border border-neutral-900 bg-black">
            {tracks.map((track) => (
              <article
                key={track.id}
                className="p-4 sm:p-5 hover:bg-neutral-900/20 transition-colors"
              >
                {/* Cabecera del track con Año, Título, Badge de Tipo y Enlaces a Plataformas */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-[11px] font-semibold tracking-wider">
                      {track.year}
                    </span>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wide">
                      {track.title}
                    </h4>
                    <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 text-neutral-400 text-[10px] uppercase tracking-wider font-mono">
                      {track.type}
                    </span>
                  </div>

                  {/* Enlaces con iconos a plataformas */}
                  <div className="flex items-center gap-3">
                    {track.links.spotify && (
                      <a
                        href={track.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Escuchar ${track.title} en Spotify`}
                        title="Spotify"
                      >
                        <SpotifyIcon className="w-5 h-5" />
                      </a>
                    )}
                    {track.links.soundcloud && (
                      <a
                        href={track.links.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Escuchar ${track.title} en SoundCloud`}
                        title="SoundCloud"
                      >
                        <SoundcloudIcon className="w-5 h-5" />
                      </a>
                    )}
                    {track.links.beatport && (
                      <a
                        href={track.links.beatport}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Comprar ${track.title} en Beatport`}
                        title="Beatport"
                      >
                        <BeatportIcon className="w-5 h-5" />
                      </a>
                    )}
                    {track.links.bandcamp && (
                      <a
                        href={track.links.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Comprar ${track.title} en Bandcamp`}
                        title="Bandcamp"
                      >
                        <BandcampIcon className="w-5 h-5" />
                      </a>
                    )}
                    {track.links.appleMusic && (
                      <a
                        href={track.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={`Escuchar ${track.title} en Apple Music`}
                        title="Apple Music"
                      >
                        <AppleMusicIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Reproductor Embebido Directo */}
                {track.spotifyId ? (
                  <div className="w-full my-2">
                    <iframe
                      style={{ borderRadius: "12px" }}
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full my-2 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                    <span className="text-sm font-mono text-neutral-300">BOOTLEG EXCLUSIVO SOUNDCLOUD</span>
                    <a
                      href="https://soundcloud.com/andhray/andhray-daga-adicta-re-edit-luigi-21-plus-ftj-alvarez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase px-3 py-1 bg-[#ff5500] text-white rounded font-bold hover:opacity-90"
                    >
                      Escuchar en SoundCloud
                    </a>
                  </div>
                )}
              </article>
            ))}
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

