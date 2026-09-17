/**
 * @file apps/web/src/components/ui/social-icons.tsx
 * @layer Presentation Layer / UI Primitives
 * @description Accessible, minimalist SVG brand and media platform icons adhering to BRIDS typography and iconography guidelines.
 */

import React from "react";

/**
 * InstagramIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Instagram icon element.
 */
export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * YoutubeIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG YouTube icon element.
 */
export function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

/**
 * SoundcloudIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG SoundCloud icon element.
 */
export function SoundcloudIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1.17 12.23c-.04.22-.06.46-.06.7 0 2.21 1.79 4 4 4h12.56c2.93 0 5.33-2.35 5.33-5.28 0-2.83-2.22-5.14-5.02-5.27-.47-2.73-2.84-4.81-5.7-4.81-2.48 0-4.6 1.57-5.42 3.8-.32-.07-.65-.11-.99-.11-2.44 0-4.43 1.94-4.52 4.36-.08.77.1 1.51.48 2.15z" />
    </svg>
  );
}

/**
 * SpotifyIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Spotify icon element.
 */
export function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424a.627.627 0 0 1-.861.208c-2.358-1.441-5.326-1.767-8.823-.968a.627.627 0 1 1-.28-1.223c3.824-.874 7.108-.507 9.756 1.121a.627.627 0 0 1 .208.862zm1.225-2.724a.784.784 0 0 1-1.08.258c-2.699-1.659-6.814-2.14-10.007-1.171a.785.785 0 0 1-.462-1.5c3.655-1.109 8.211-.573 11.291 1.332a.785.785 0 0 1 .258 1.081zm.105-2.834C14.682 9.074 9.351 8.898 6.257 9.838a.942.942 0 1 1-.548-1.802c3.551-1.077 9.444-.875 13.167 1.336a.942.942 0 0 1-1.025 1.589z"/>
    </svg>
  );
}

/**
 * AppleMusicIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Apple Music icon element.
 */
export function AppleMusicIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm3.84 6.786l-4.8 1.067a.64.64 0 0 0-.5.626v5.328a2.133 2.133 0 1 1-1.067-1.847V8.533a.64.64 0 0 1 .5-.626l5.334-1.186a.64.64 0 0 1 .773.626v4.455a2.133 2.133 0 1 1-1.067-1.847V8.786a.64.64 0 0 1 .827-.614v.614z" />
    </svg>
  );
}

/**
 * BeatportIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Beatport icon element.
 */
export function BeatportIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.8 9.2c-.4-.6-1.1-1-1.9-1.1l.1-.8c.1-.7-.4-1.3-1.1-1.4l-4.5-.6c-.7-.1-1.3.4-1.4 1.1l-.4 3.2c-.5.1-.9.2-1.3.4-.9.5-1.4 1.5-1.4 2.5v.1c0 1 .5 2 1.4 2.5.4.2.8.4 1.3.4l-.4 3.2c-.1.7.4 1.3 1.1 1.4l4.5.6c.7.1 1.3-.4 1.4-1.1l.1-.8c.8-.1 1.5-.4 1.9-1.1.6-.8.7-1.7.4-2.6-.3-.9-1.1-1.5-2-1.6.9-.1 1.7-.7 2-1.6.3-.9.2-1.8-.4-2.6zm-6.2 6.6l.3-2.1c.5.2 1.1.1 1.5-.2.4-.4.6-.9.5-1.5-.1-.7-.7-1.2-1.4-1.3l.3-2.3 2.5.3-.6 4.7-2.6-.3c-.2.9-.4 1.8-.5 2.4z" />
    </svg>
  );
}

/**
 * BandcampIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Bandcamp icon element.
 */
export function BandcampIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="0,18.75 7.437,5.25 24,5.25 16.563,18.75" />
    </svg>
  );
}

/**
 * TiktokIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG TikTok icon element.
 */
export function TiktokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.04v.02z" />
    </svg>
  );
}

/**
 * FacebookIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Facebook icon element.
 */
export function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/**
 * TelegramIcon Component
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="w-4 h-4"] Tailwind CSS classes.
 * @returns {React.JSX.Element} SVG Telegram icon element.
 */
export function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.948z" />
    </svg>
  );
}

/**
 * Standardized configuration item for official socials & platforms.
 */
export interface OfficialSocialItem {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  title?: string;
}

/**
 * Complete, organized list of official Andhray platforms and social networks.
 */
export const OFFICIAL_SOCIAL_ITEMS: readonly OfficialSocialItem[] = [
  {
    id: "spotify",
    name: "Spotify",
    url: "https://open.spotify.com/intl-es/artist/7uu2JnXxaCT7K4AJHocHsT?si=11mEbq7hTYGBWbg6Fk__1w",
    icon: SpotifyIcon,
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    url: "https://soundcloud.com/andhray",
    icon: SoundcloudIcon,
  },
  {
    id: "apple-music",
    name: "Apple Music",
    url: "https://music.apple.com/co/artist/andhray/1576855539",
    icon: AppleMusicIcon,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/andhray_/?hl=es",
    icon: InstagramIcon,
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/Andhraymusic/?locale=es_LA",
    icon: FacebookIcon,
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@andhray",
    icon: TiktokIcon,
  },
  {
    id: "telegram",
    name: "Telegram",
    url: "#telegram",
    title: "Canal Oficial Telegram - Próximamente",
    icon: TelegramIcon,
  },
] as const;

/**
 * OfficialSocialLinksBar Component
 *
 * Renders the standardized list of official platforms and socials with uniform styling:
 * - Container: flex items-center gap-5 flex-wrap
 * - Style per icon: w-5 h-5 (20px), fill monocromático
 * - Colors and transitions: text-neutral-400 hover:text-white transition-colors duration-200
 * - Link attributes: target="_blank" rel="noopener noreferrer" aria-label with the network name
 *
 * @param {object} props Component properties.
 * @param {string} [props.className="flex items-center gap-5 flex-wrap"] Tailwind CSS container classes.
 * @param {string} [props.iconClassName="w-5 h-5"] Tailwind CSS icon classes.
 * @returns {React.JSX.Element} Rendered social links bar.
 */
export function OfficialSocialLinksBar({
  className = "flex items-center gap-5 flex-wrap",
  iconClassName = "w-5 h-5",
}: {
  className?: string;
  iconClassName?: string;
}): React.JSX.Element {
  return (
    <div className={className}>
      {OFFICIAL_SOCIAL_ITEMS.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            title={item.title}
            className="text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <IconComponent className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}

