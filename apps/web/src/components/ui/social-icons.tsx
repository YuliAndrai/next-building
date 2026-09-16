import React from "react";

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
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function SoundcloudIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M1.17 12.23c-.04.22-.06.46-.06.7 0 2.21 1.79 4 4 4h12.56c2.93 0 5.33-2.35 5.33-5.28 0-2.83-2.22-5.14-5.02-5.27-.47-2.73-2.84-4.81-5.7-4.81-2.48 0-4.6 1.57-5.42 3.8-.32-.07-.65-.11-.99-.11-2.44 0-4.43 1.94-4.52 4.36-.08.77.1 1.51.48 2.15z" />
    </svg>
  );
}

export function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424a.627.627 0 0 1-.861.208c-2.358-1.441-5.326-1.767-8.823-.968a.627.627 0 1 1-.28-1.223c3.824-.874 7.108-.507 9.756 1.121a.627.627 0 0 1 .208.862zm1.225-2.724a.784.784 0 0 1-1.08.258c-2.699-1.659-6.814-2.14-10.007-1.171a.785.785 0 0 1-.462-1.5c3.655-1.109 8.211-.573 11.291 1.332a.785.785 0 0 1 .258 1.081zm.105-2.834C14.682 9.074 9.351 8.898 6.257 9.838a.942.942 0 1 1-.548-1.802c3.551-1.077 9.444-.875 13.167 1.336a.942.942 0 0 1-1.025 1.589z"/>
    </svg>
  );
}
