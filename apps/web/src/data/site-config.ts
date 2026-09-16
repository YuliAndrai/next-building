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
  hasMiniPlayer?: boolean;
  spotifyEmbedUrl?: string;
  soundcloudEmbedUrl?: string;
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
  id: string;
  title: string;
  date: string;
  year: string;
  platform: "youtube" | "soundcloud";
  url: string;
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
    beatport: "https://www.beatport.com",
    bandcamp: "https://andhray.bandcamp.com"
  },

  officialChannels: [
    { name: "SPOTIFY", url: "https://open.spotify.com/artist/4zmRL1DHbEIYsITw4HOYRn", platform: "spotify" },
    { name: "SOUNDCLOUD", url: "https://soundcloud.com/andhray", platform: "soundcloud" },
    { name: "APPLE MUSIC", url: "https://music.apple.com", platform: "appleMusic" },
    { name: "BEATPORT", url: "https://www.beatport.com", platform: "beatport" },
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

  tracks: [
    {
      id: "track-memento",
      title: "MEMENTO",
      year: "2025",
      hasMiniPlayer: true,
      spotifyEmbedUrl: "https://open.spotify.com/embed/album/4zmRL1DHbEIYsITw4HOYRn?utm_source=generator&theme=0",
      soundcloudEmbedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/andhray/mementosp&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      links: {
        spotify: "https://open.spotify.com/album/4zmRL1DHbEIYsITw4HOYRn",
        soundcloud: "https://soundcloud.com/andhray/mementosp",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-en-napl",
      title: "EN NAPL",
      year: "2025",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20EN%20NAPL",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-danseo-mental",
      title: "Danseo Mental",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20Danseo%20Mental",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-ilusion",
      title: "ILUSION",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20ILUSION",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-en-un-rave",
      title: "EN UN RAVE",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20EN%20UN%20RAVE",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-feline-blink",
      title: "Feline Blink (con DEBBIE IT)",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20Feline%20Blink",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-sensual",
      title: "SENSUAL",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20SENSUAL",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-mi",
      title: "MI",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20MI",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-maybe-we-are-crazy",
      title: "MAYBE, WE ARE CRAZY",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20MAYBE%20WE%20ARE%20CRAZY",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-fkn-rythm",
      title: "FKN RYTHM",
      year: "2024",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20FKN%20RYTHM",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-daga-adicta",
      title: "DAGA ADICTA RE EDIT",
      year: "Bootleg",
      links: {
        soundcloud: "https://soundcloud.com/andhray",
        bandcamp: "https://andhray.bandcamp.com",
        spotify: "https://open.spotify.com/search/ANDHRAY%20DAGA%20ADICTA"
      }
    },
    {
      id: "track-girl-from-the-dark",
      title: "Girl From the Dark",
      year: "2022",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20Girl%20From%20the%20Dark",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-sin-miedo",
      title: "Sin Miedo",
      year: "2022",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20Sin%20Miedo",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    },
    {
      id: "track-resignificar",
      title: "Resignificar",
      year: "2021",
      links: {
        spotify: "https://open.spotify.com/search/ANDHRAY%20Resignificar",
        soundcloud: "https://soundcloud.com/andhray",
        beatport: "https://www.beatport.com",
        appleMusic: "https://music.apple.com",
        bandcamp: "https://andhray.bandcamp.com"
      }
    }
  ] as TrackItem[],

  podcastsAndSets: [
    {
      id: "set-hor-berlin-2026",
      title: "HÖR Berlin",
      date: "July 24 / 2026",
      year: "2026",
      platform: "youtube",
      url: "https://www.youtube.com/watch?v=_xtvbbRCeGU",
      embedUrl: "https://www.youtube.com/embed/_xtvbbRCeGU",
      description: "Transmisión en vivo en alta fidelidad grabada en el estudio de HÖR Berlín."
    },
    {
      id: "set-riot-scampia-2024",
      title: "Riöt.scampia - 360 DJ Set",
      date: "2024",
      year: "2024",
      platform: "youtube",
      url: "https://www.youtube.com/watch?v=SZTMVVqo-HA",
      embedUrl: "https://www.youtube.com/embed/SZTMVVqo-HA",
      description: "Set inmersivo 360° con enfoque en hard techno y texturas ácidas."
    },
    {
      id: "podcast-techno-germany-127",
      title: "Techno Germany Podcast 127",
      date: "2024",
      year: "2024",
      platform: "soundcloud",
      url: "https://soundcloud.com/technogermany/andhray-techno-germany-podcast-127",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/technogermany/andhray-techno-germany-podcast-127&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Sesión curada exclusiva para la plataforma alemana Techno Germany."
    },
    {
      id: "podcast-tmorcast-115",
      title: "TMORCAST115 | The Meaning Of Rave",
      date: "2024",
      year: "2024",
      platform: "soundcloud",
      url: "https://soundcloud.com/themeaningofrave",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/themeaningofrave&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Episodio exclusivo en la serie de podcasts del colectivo The Meaning Of Rave."
    },
    {
      id: "podcast-comme-dans-les-films-16",
      title: "COMME DANS LES FILMS #16 by Parfait",
      date: "2023",
      year: "2023",
      platform: "soundcloud",
      url: "https://soundcloud.com/parfaitparfait/comme-dans-les-films-16-andhray",
      embedUrl: "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/parfaitparfait/comme-dans-les-films-16-andhray&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false",
      description: "Mix curado para la aclamada serie Comme Dans Les Films por Parfait."
    }
  ] as PodcastSetItem[],

  releases: [
    {
      id: "rel-1",
      title: "OBSIDIAN AWAKENING",
      type: "EP",
      label: "HEKATE RECORDS",
      releaseYear: "2026",
      artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      links: {
        spotify: "https://spotify.com",
        soundcloud: "https://soundcloud.com",
        beatport: "https://beatport.com",
        appleMusic: "https://apple.com",
        bandcamp: "https://bandcamp.com"
      }
    },
    {
      id: "rel-2",
      title: "INDUSTRIAL SEDUCTION",
      type: "Single",
      label: "BLACK RITUALS",
      releaseYear: "2026",
      artwork: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
      links: {
        spotify: "https://spotify.com",
        soundcloud: "https://soundcloud.com",
        beatport: "https://beatport.com"
      }
    },
    {
      id: "rel-3",
      title: "SONIC SACRAMENT",
      type: "EP",
      label: "REKIDS",
      releaseYear: "2025",
      artwork: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      links: {
        spotify: "https://spotify.com",
        soundcloud: "https://soundcloud.com",
        beatport: "https://beatport.com"
      }
    },
    {
      id: "rel-4",
      title: "HYPNOTIC FORCE",
      type: "Remix",
      label: "TELETECH RECS",
      releaseYear: "2025",
      artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
      links: {
        spotify: "https://spotify.com",
        soundcloud: "https://soundcloud.com",
        beatport: "https://beatport.com"
      }
    }
  ] as MusicRelease[],

  liveSets: [
    {
      id: "set-1",
      title: "ANDHRAY LIVE @ VERKNIPT ARENA",
      event: "Verknipt Hard Techno Festival",
      year: "2026",
      youtubeId: "dQw4w9WgXcQ",
      duration: "1h 32m"
    }
  ] as LiveSet[],

  merch: [
    {
      id: "merch-1",
      name: "ANDHRAY HEAVYWEIGHT OVERSIZED HOODIE",
      price: "€85.00",
      currency: "EUR",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
      badge: "NEW",
      category: "Apparel",
      link: "#"
    },
    {
      id: "merch-2",
      name: "OBSIDIAN AWAKENING 12\" DOUBLE VINYL",
      price: "€38.00",
      currency: "EUR",
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=800&auto=format&fit=crop",
      badge: "LIMITED",
      category: "Vinyl",
      link: "#"
    },
    {
      id: "merch-3",
      name: "ACID RITUAL VINTAGE ACID-WASH TEE",
      price: "€45.00",
      currency: "EUR",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      category: "Apparel",
      link: "#"
    },
    {
      id: "merch-4",
      name: "INDUSTRIAL RAVE TACTICAL CHEST BAG",
      price: "€50.00",
      currency: "EUR",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
      badge: "LIMITED",
      category: "Accessories",
      link: "#"
    }
  ] as MerchItem[],

  contacts: {
    general: "mgmt@andhray.com",
    management: "mgmt@andhray.com",
    bookingAmericas: "americas@andhray-agency.com",
    bookingEurope: "europe@andhray-agency.com",
    press: "press@andhray.com",
    pressKitUrl: "#"
  }
};
