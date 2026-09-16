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
    residentAdvisor: "https://ra.co"
  },

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
