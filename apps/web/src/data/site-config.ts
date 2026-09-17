/**
 * @file apps/web/src/data/site-config.ts
 * @description Centralized data configuration for ANDHRAY official website.
 * Tour dates, music releases, merchandise, booking info, and links.
 */

export interface TourDate {
  id: string;
  date: string;
  dayNumber: string;
  month: string;
  year: string;
  city: string;
  country: string;
  venue: string;
  ticketUrl: string;
  status: "tickets" | "sold-out" | "rsvp" | "booking";
}

export interface MusicRelease {
  id: string;
  title: string;
  type: "EP" | "Single" | "Album" | "Remix";
  label: string;
  releaseYear: string;
  artwork: string;
  links: {
    spotify?: string;
    soundcloud?: string;
    beatport?: string;
    appleMusic?: string;
    bandcamp?: string;
  };
}

/**
 * TrackItem Interface
 *
 * Represents an entry in the chronological discography catalog.
 */
export interface TrackItem {
  id: string;
  title: string;
  year: string;
  type?: string;
  spotifyId?: string | null;
  spotifyEmbed?: string;
  spotifyEmbedUrl?: string;
  hasMiniPlayer?: boolean;
  links: {
    spotify?: string;
    soundcloud?: string;
    beatport?: string;
    appleMusic?: string;
    bandcamp?: string;
  };
}

/**
 * PodcastSetItem Interface
 *
 * Represents a live DJ performance, radio broadcast, or curated podcast set.
 */
export interface PodcastSetItem {
  id?: string;
  title: string;
  date: string;
  year?: string;
  platform?: "youtube" | "soundcloud";
  url?: string;
  embedUrl?: string;
  description?: string;
}

/**
 * OfficialChannel Interface
 *
 * Represents an official streaming or purchase platform channel for the artist.
 */
export interface OfficialChannel {
  name: string;
  url: string;
  platform: "spotify" | "soundcloud" | "appleMusic" | "beatport" | "bandcamp";
}

export interface LiveSet {
  id: string;
  title: string;
  event: string;
  year: string;
  youtubeId: string;
  duration: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  image: string;
  badge?: "LIMITED" | "NEW" | "SOLD OUT";
  category: "Apparel" | "Vinyl" | "Accessories";
  link: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  youtubeEmbedUrl?: string;
  originalUrl?: string;
  spotifyEmbedUrl?: string;
  soundcloudEmbedUrl?: string;
  spotifyUrl?: string;
  soundcloudUrl?: string;
}

export const releasesData: TrackItem[] = [
  {
    id: "track-1",
    title: "MEMENTO",
    year: "2025",
    type: "SINGLE",
    spotifyId: "68KwzzA0ybAGpUALiaJ0Ci",
    spotifyEmbed: "https://open.spotify.com/embed/track/68KwzzA0ybAGpUALiaJ0Ci?utm_source=generator&theme=0",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/68KwzzA0ybAGpUALiaJ0Ci",
      soundcloud: "https://soundcloud.com/andhray/memento",
      beatport: "https://www.beatport.com/es/release/memento/5437260",
      appleMusic: "https://music.apple.com/co/song/memento/1842890835"
    }
  },
  {
    id: "track-2",
    title: "EN NAPL",
    year: "2025",
    type: "SINGLE",
    spotifyId: "0p10DSavZofwMZyQ02tMSM",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/0p10DSavZofwMZyQ02tMSM",
      soundcloud: "https://soundcloud.com/andhray/andhray-en-napl",
      beatport: "https://www.beatport.com/es/release/en-napl/5051876",
      appleMusic: "https://music.apple.com/co/song/en-napl/1810081598"
    }
  },
  {
    id: "track-3",
    title: "DANSEO MENTAL",
    year: "2024",
    type: "SINGLE",
    spotifyId: "73hIIW3p4wuX4HeJNYOGWf",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/73hIIW3p4wuX4HeJNYOGWf",
      soundcloud: "https://soundcloud.com/thefinesttechno/permiere-andhray-danseo-mental-va03d",
      beatport: "https://www.beatport.com/es/release/danseo-mental/4742455",
      bandcamp: "https://depthnoiserecords.bandcamp.com/track/danseo-mental"
    }
  },
  {
    id: "track-4",
    title: "SENSUAL",
    year: "2024",
    type: "INDUSTRIAL GIRLS",
    spotifyId: "5A7hfrGS41sSRTv6iQItQ6",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/5A7hfrGS41sSRTv6iQItQ6",
      appleMusic: "https://music.apple.com/co/song/sensual-industrial-girls/1723834597"
    }
  },
  {
    id: "track-5",
    title: "MI",
    year: "2024",
    type: "INDUSTRIAL GIRLS",
    spotifyId: "6lzYhRcxLNPX6gfveAXh0S",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/6lzYhRcxLNPX6gfveAXh0S",
      appleMusic: "https://music.apple.com/co/song/mi-industrial-girls/1723834818"
    }
  },
  {
    id: "track-6",
    title: "MAYBE, WE ARE CRAZY",
    year: "2024",
    type: "INDUSTRIAL GIRLS",
    spotifyId: "140e7NyEy4Sn5XIZHre9fM",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/140e7NyEy4Sn5XIZHre9fM",
      appleMusic: "https://music.apple.com/co/song/maybe-we-are-crazy-industrial-girls/1723834600"
    }
  },
  {
    id: "track-7",
    title: "FKN RYTHM",
    year: "2024",
    type: "INDUSTRIAL GIRLS",
    spotifyId: "6pffPRPNH7BF67Qub1ED67",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/6pffPRPNH7BF67Qub1ED67",
      appleMusic: "https://music.apple.com/co/song/fkn-rythm-industrial-girls/1723834825"
    }
  },
  {
    id: "track-8",
    title: "DAGA ADICTA RE EDIT",
    year: "Bootleg",
    type: "EDIT",
    spotifyId: null,
    links: {
      soundcloud: "https://soundcloud.com/andhray/andhray-daga-adicta-re-edit-luigi-21-plus-ftj-alvarez"
    }
  },
  {
    id: "track-9",
    title: "ILUSION",
    year: "2024",
    type: "SINGLE",
    spotifyId: "5Vvvbv1GnDLHR47nLo2Dwq",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/5Vvvbv1GnDLHR47nLo2Dwq",
      beatport: "https://www.beatport.com/es/track/ilusion/19596639",
      appleMusic: "https://music.apple.com/co/song/ilusion/1772158388"
    }
  },
  {
    id: "track-10",
    title: "EN UN RAVE",
    year: "2024",
    type: "SINGLE",
    spotifyId: "0EQGafE2qUvAIzLMbSP76C",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/0EQGafE2qUvAIzLMbSP76C",
      beatport: "https://www.beatport.com/es/track/en-un-rave/19596638",
      appleMusic: "https://music.apple.com/co/song/en-un-rave/1772158387"
    }
  },
  {
    id: "track-11",
    title: "FELINE BLINK (CON DEBBIE IT)",
    year: "2024",
    type: "SINGLE",
    spotifyId: "30TPs7A1WVHiqR3xCdh2TF",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/30TPs7A1WVHiqR3xCdh2TF",
      soundcloud: "https://on.soundcloud.com/bHYUYFYbZq2A4ds7Wk",
      beatport: "https://www.beatport.com/es/track/feline-blink/19463077",
      bandcamp: "https://industrialgirls.bandcamp.com/track/debbie-it-andhray-feline-blink",
      appleMusic: "https://music.apple.com/co/song/feline-blink/1766131706"
    }
  },
  {
    id: "track-12",
    title: "GIRL FROM THE DARK (KOBAL AND JAY VOICES)",
    year: "2022",
    type: "SINGLE",
    spotifyId: "1MzPqm1xWPSXZp9WtZimTp",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/1MzPqm1xWPSXZp9WtZimTp",
      soundcloud: "https://soundcloud.com/industrial_girls/andhray-girl-from-the-dark",
      beatport: "https://www.beatport.com/es/track/girl-from-the-dark-kobal-and-jay-voices/17187077",
      bandcamp: "https://industrialgirls.bandcamp.com/track/andhray-girl-from-the-dark-kobal-and-jay-voices",
      appleMusic: "https://music.apple.com/co/song/girl-from-the-dark-kobal-and-jay-voices/1657571142"
    }
  },
  {
    id: "track-13",
    title: "SIN MIEDO",
    year: "2022",
    type: "SINGLE",
    spotifyId: "4ZcCcVH4Df8GBdvUHXKcLJ",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/4ZcCcVH4Df8GBdvUHXKcLJ",
      soundcloud: "https://soundcloud.com/industrial_girls/andhray-sin-miedo-free-download",
      beatport: "https://www.beatport.com/es/track/sin-miedo/17050678",
      appleMusic: "https://music.apple.com/co/album/sin-miedo/1651128604?i=1651128605"
    }
  },
  {
    id: "track-14",
    title: "RESIGNIFICAR",
    year: "2021",
    type: "SINGLE",
    spotifyId: "1M9QtwVh1Cu4bIfxSVw6Vd",
    links: {
      spotify: "https://open.spotify.com/intl-es/track/1M9QtwVh1Cu4bIfxSVw6Vd",
      soundcloud: "https://soundcloud.com/andhray/andhray-resignificar-exclusive-industrial-girls",
      beatport: "https://www.beatport.com/es/release/resignificar/3911818",
      appleMusic: "https://music.apple.com/co/album/resignificar/1651128056?i=1651128057"
    }
  }
];

export const podcastsData: PodcastSetItem[] = [
  { title: "Andhray | HÖR Berlin", date: "24 Julio 2026", embedUrl: "https://www.youtube.com/embed/_xtvbbRCeGU" },
  { title: "ANDHRAY - Dj set Hard/Trance - 360 - Riöt.scampia", date: "2024", url: "https://www.youtube.com/watch?v=SZTMVVqo-HA" },
  { title: "Techno Germany Podcast 127", date: "2024", url: "https://soundcloud.com/technogermany/andhray-techno-germany-podcast-127" },
  { title: "TMORCAST115 | The Meaning Of Rave", date: "2024", url: "https://soundcloud.com/themeaningofrave/tmorcast115-andhray" },
  { title: "COMME DANS LES FILMS #16 by Parfait", date: "2023", url: "https://soundcloud.com/parfaitparfait/comme-dans-les-films-16-andhray" }
];

export const siteConfig = {
  artist: {
    name: "ANDHRAY",
    heroBanner: "EURO TOUR (NOV - DIC)",
    role: "DJ • Productora • Fundadora de Industrial Girls",
    slogan: "Música sensual para almas sensuales",
    genres: ["Hard Dance", "Acid", "Groove"],
    tourBadge: "Europa Tour 2026 – 2027 | Nov-Enero",
    tagline: "Industrial Hard Techno & Relentless Sonic Energy",
    bioHeadline: "SONIDO PROPIO // INDUSTRIAL GIRLS",
    bio: [
      "Nacida en Colombia, DJ, productora y organizadora de eventos. Desde 2018 ha forjado un sonido propio; Andhray es un universo donde los sonidos se encuentran, se transforman y conectan con el cuerpo. Ritmos, energía y sensualidad que se entremezclan entre lo oscuro, lo hipnótico, la psicodelia y el groove. Amante de la percusión, frecuencias ácidas y ritmos hipnóticos.",
      "En 2019 fundó Industrial Girls, un sello, colectivo y agencia de desarrollo artístico nacida en Colombia, enfocada en impulsar el talento femenino y LGBTQIA+. Con una visión internacional, el proyecto ha fortalecido su comunidad y proyección global a través de showcases y plataformas de visibilización artística."
    ],
    pressQuotes: [
      {
        quote: "A monumental force pushing hard techno into ferocious new dimensions.",
        source: "Resident Advisor"
      },
      {
        quote: "Pure adrenaline, dark elegance, and hypnotic mechanical precision.",
        source: "Mixmag"
      }
    ]
  },

  news: [
    {
      id: "news-hor-berlin",
      title: "Andhray | HÖR Berlin (July 24 / 2026)",
      category: "SESIÓN HÖR BERLIN // EN ALTA CALIDAD",
      youtubeEmbedUrl: "https://www.youtube.com/embed/_xtvbbRCeGU",
      originalUrl: "https://www.youtube.com/watch?v=_xtvbbRCeGU"
    },
    {
      id: "news-memento",
      title: "Último Lanzamiento: MEMENTO",
      category: "ÚLTIMO TRACK // OUT NOW",
      spotifyEmbedUrl: "https://open.spotify.com/embed/album/4zmRL1DHbEIYsITw4HOYRn?utm_source=generator&theme=0",
      soundcloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/andhray/mementosp&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      spotifyUrl: "https://open.spotify.com/album/4zmRL1DHbEIYsITw4HOYRn",
      soundcloudUrl: "https://soundcloud.com/andhray/mementosp"
    }
  ] as NewsItem[],

  announcement: {
    enabled: true,
    text: "ANDHRAY X MERCH — WORLD TOUR CAPSULE 01 NOW AVAILABLE",
    link: "#merch"
  },

  socials: {
    soundcloud: "https://soundcloud.com",
    instagram: "https://instagram.com",
    spotify: "https://spotify.com",
    appleMusic: "https://music.apple.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    twitch: "https://twitch.tv",
    tiktok: "https://tiktok.com",
    residentAdvisor: "https://ra.co",
    beatport: "https://www.beatport.com/es/artist/andhray/1089914",
    bandcamp: "https://andhray.bandcamp.com"
  },

  officialChannels: [
    { name: "SPOTIFY", url: "https://open.spotify.com/artist/4zmRL1DHbEIYsITw4HOYRn", platform: "spotify" },
    { name: "SOUNDCLOUD", url: "https://soundcloud.com/andhray", platform: "soundcloud" },
    { name: "APPLE MUSIC", url: "https://music.apple.com", platform: "appleMusic" },
    { name: "BEATPORT", url: "https://www.beatport.com/es/artist/andhray/1089914", platform: "beatport" },
    { name: "BANDCAMP", url: "https://andhray.bandcamp.com", platform: "bandcamp" }
  ] as OfficialChannel[],

  tourConfig: {
    useSeatedWidget: false,
    seatedArtistId: "c96949f0-d93e-45b7-aa12-925369587d20",
    featuredTour: {
      title: "EURO TOUR (NOV - DIC)",
      detail: "Fechas confirmadas en Italia y Alemania. Booking y agenda abierta para promotores y clubes.",
      currentLocation: "Colombia / Gira internacional"
    }
  },

  tourDates: [
    {
      id: "tour-euro-2026",
      date: "NOV - DIC 2026",
      dayNumber: "2026",
      month: "NOV - DIC",
      year: "2026",
      city: "Italia & Alemania",
      country: "",
      venue: "EURO TOUR 2026 // Clubes & Showcases",
      ticketUrl: "#contact",
      status: "booking"
    }
  ] as TourDate[],

  tracks: releasesData as TrackItem[],

  podcastsAndSets: podcastsData as PodcastSetItem[],

  merch: [] as MerchItem[],

  contacts: {
    general: "mgmt@andhray.com",
    management: "mgmt@andhray.com",
    bookingAmericas: "americas@andhray-agency.com",
    bookingEurope: "europe@andhray-agency.com",
    press: "press@andhray.com",
    pressKitUrl: "#"
  }
};
