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
  status: "tickets" | "sold-out" | "rsvp";
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

export const siteConfig = {
  artist: {
    name: "ANDHRAY",
    tagline: "Industrial Hard Techno & Relentless Sonic Energy",
    bioHeadline: "HIGH VOLTAGE HARD TECHNO // DARK SONIC RITUALS",
    bio: [
      "ANDHRAY commands the underground with razor-sharp industrial precision, apocalyptic percussion, and visceral sound engineering designed for raw warehouse catharsis.",
      "Rooted in the unyielding heritage of industrial techno and driven by relentless modern tempo, ANDHRAY's performances blur the line between a techno set and a sensory ritual.",
      "From legendary European basement raves to thunderous South American festival stages, ANDHRAY continues to conquer dancefloors worldwide with unrelenting devotion to the hard sound."
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
    seatedArtistId: "c96949f0-d93e-45b7-aa12-925369587d20"
  },

  tourDates: [
    {
      id: "tour-1",
      date: "OCT 24, 2026",
      dayNumber: "24",
      month: "OCT",
      year: "2026",
      city: "Amsterdam",
      country: "Netherlands",
      venue: "Awakenings ADE // Gashouder",
      ticketUrl: "https://tickets.example.com",
      status: "sold-out"
    },
    {
      id: "tour-2",
      date: "NOV 06, 2026",
      dayNumber: "06",
      month: "NOV",
      year: "2026",
      city: "Berlin",
      country: "Germany",
      venue: "RSO // Kraftwerk Industrial",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
    },
    {
      id: "tour-3",
      date: "NOV 14, 2026",
      dayNumber: "14",
      month: "NOV",
      year: "2026",
      city: "London",
      country: "United Kingdom",
      venue: "Drumsheds // Teletech Arena",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
    },
    {
      id: "tour-4",
      date: "NOV 28, 2026",
      dayNumber: "28",
      month: "NOV",
      year: "2026",
      city: "Paris",
      country: "France",
      venue: "Nexus // Possession Night",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
    },
    {
      id: "tour-5",
      date: "DEC 05, 2026",
      dayNumber: "05",
      month: "DEC",
      year: "2026",
      city: "Bogotá",
      country: "Colombia",
      venue: "Baum Festival // Main Warehouse",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
    },
    {
      id: "tour-6",
      date: "DEC 12, 2026",
      dayNumber: "12",
      month: "DEC",
      year: "2026",
      city: "Medellín",
      country: "Colombia",
      venue: "Plaza Mayor // Hard Sound Ritual",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
    },
    {
      id: "tour-7",
      date: "DEC 19, 2026",
      dayNumber: "19",
      month: "DEC",
      year: "2026",
      city: "Miami, FL",
      country: "United States",
      venue: "Space Miami // The Terrace",
      ticketUrl: "https://tickets.example.com",
      status: "rsvp"
    },
    {
      id: "tour-8",
      date: "DEC 31, 2026",
      dayNumber: "31",
      month: "DEC",
      year: "2026",
      city: "Barcelona",
      country: "Spain",
      venue: "Input High Fidelity Dance Club",
      ticketUrl: "https://tickets.example.com",
      status: "tickets"
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
