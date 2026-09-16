import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./apps/web/src/**/*.{js,ts,jsx,tsx}",
    "./apps/web/src/app/**/*.{js,ts,jsx,tsx}",
    "./apps/web/src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#030303",
        darkCard: "#0a0a0a",
        darkBorder: "#171717",
      },
      letterSpacing: {
        ultra: "0.28em",
        widestPlus: "0.2em",
      }
    }
  },
  plugins: []
};

export default config;
