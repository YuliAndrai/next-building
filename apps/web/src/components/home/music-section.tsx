"use client";

/**
 * @file apps/web/src/components/home/music-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Official Music Section featuring the digital tracklist with direct embedded Spotify mini-players, official channels quickbar, and curated podcasts/DJ sets.
 */

import {
  siteConfig,
  releasesData,
  TrackItem,
  OfficialChannel
} from "@/data/site-config";
import {
  SpotifyIcon,
  SoundcloudIcon,
  AppleMusicIcon,
  BeatportIcon,
  BandcampIcon
} from "@/components/ui/social-icons";
import { ExternalLink } from "lucide-react";
import { PodcastsSection } from "@/components/home/podcasts-section";

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
  // Step 1: Retrieve configuration data directly from official releases
  const channels: OfficialChannel[] = siteConfig.officialChannels;
  const tracks: TrackItem[] = releasesData;

  return (
    <section id="music" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10">
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
                  className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[44px] bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl hover:border-white/40 hover:bg-white/10 text-neutral-300 hover:text-white transition-all text-xs font-mono font-bold uppercase tracking-wider"
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
          <div className="divide-y divide-neutral-800/60 border border-neutral-800/60 bg-black/40 backdrop-blur-md rounded-xl overflow-hidden">
            {tracks.map((track) => (
              <article
                key={track.id}
                className="p-4 sm:p-5 hover:bg-white/5 transition-colors"
              >
                {/* Cabecera del track con Año, Título, Badge de Tipo y Enlaces a Plataformas */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-0.5 bg-black/50 border border-neutral-800/60 text-neutral-300 font-mono text-[11px] font-semibold tracking-wider rounded-md">
                      {track.year}
                    </span>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-wide">
                      {track.title}
                    </h4>
                    <span className="px-2.5 py-0.5 bg-black/50 border border-neutral-800/60 text-neutral-400 text-[10px] uppercase tracking-wider font-mono rounded-md">
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
                        className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                        className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                        className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                        className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                        className="p-2 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                  <div className="w-full my-2 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-neutral-800/60 flex items-center justify-between">
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


        {/* Step 5: Subsección de Podcasts y DJ Sets con Red Accents */}
        <PodcastsSection className="px-0 py-0" />

      </div>
    </section>
  );
}

export { PodcastsSection };


