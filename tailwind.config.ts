import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ESM Official Brand Palette (Diselaraskan dengan Logo ESM - Vibrant Crimson, Tidak Terlalu Gelap)
        primary: {
          DEFAULT: "#BA2421",
          foreground: "#FFFFFF",
          50:  "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#BA2421", // BRAND CORE (ESM Logo Red - Segar, Wibawa, & Nyaman)
          700: "#A41D1A", // Tone Logo Asli
          800: "#7F1D1D",
          900: "#450A0A",
          950: "#2D0606",
        },
        // Warm Kingdom Gold (Aksen Kemuliaan & Terang)
        accent: {
          DEFAULT: "#D4A346",
          foreground: "#1E1617",
          50:  "#FAF6ED",
          100: "#F5EEDB",
          200: "#EBDDB7",
          300: "#DFC88E",
          400: "#D4A346", // GOLD CORE
          500: "#B8862D",
          600: "#916720",
          700: "#6E4C17",
        },
        // Warm Canvas Palette (Pengganti Stark White)
        canvas: {
          DEFAULT: "#FAF7F2",
          subtle:  "#F3EFEA",
          muted:   "#EBE5DD",
        },
        // Deep Rose Charcoal (Untuk Hero/CTA gelap yang bernafas)
        darkmesh: {
          start: "#241416",
          mid:   "#3D1C22",
          end:   "#1E1012",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "1rem",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        "warm-sm": "0 1px 3px 0 rgba(36, 20, 22, 0.05), 0 1px 2px -1px rgba(36, 20, 22, 0.05)",
        "warm-md": "0 4px 16px -2px rgba(139, 38, 53, 0.08), 0 2px 6px -2px rgba(36, 20, 22, 0.04)",
        "warm-lg": "0 12px 32px -4px rgba(139, 38, 53, 0.12), 0 4px 12px -2px rgba(36, 20, 22, 0.05)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
