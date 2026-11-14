"use client";

import * as React from "react";

export interface ColorPreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  accent: string;
  badgeBg: string;
}

export const THEME_PRESETS: ColorPreset[] = [
  {
    id: "crimson",
    name: "Crimson Red (Logo ESM Resmi)",
    description: "Merah wibawa dan semangat misi injili nusantara",
    primary: "#BA2421",
    accent: "#D4A346",
    badgeBg: "#FEF2F2",
  },
  {
    id: "burgundy",
    name: "Royal Burgundy",
    description: "Merah anggur mewah, teologis, dan reflektif",
    primary: "#8B1E2B",
    accent: "#E0B354",
    badgeBg: "#FDF2F4",
  },
  {
    id: "navy",
    name: "Deep Mission Navy",
    description: "Biru laut samudera nusantara & integritas kampus",
    primary: "#1E3A8A",
    accent: "#F59E0B",
    badgeBg: "#EFF6FF",
  },
  {
    id: "forest",
    name: "Forest Evergreen",
    description: "Hijau dedaunan, pertumbuhan iman, & berbuah lebat",
    primary: "#15803D",
    accent: "#EAB308",
    badgeBg: "#F0FDF4",
  },
  {
    id: "terracotta",
    name: "Warm Terracotta / Tanah Rempah",
    description: "Kehangatan tanah jawara dan kepulauan rempah",
    primary: "#B45309",
    accent: "#D97706",
    badgeBg: "#FFFBEB",
  },
];

export const PRESET_PALETTES = THEME_PRESETS;

interface ThemeContextType {
  currentPresetId: string;
  themePreset: string;
  primaryColor: string;
  customHex: string;
  accentColor: string;
  setTheme: (presetId: string, customPrimary?: string, customAccent?: string) => void;
  setThemePreset: (presetId: string) => void;
  setCustomHex: (hex: string) => void;
  resetTheme: () => void;
}

const ThemeCustomizerContext = React.createContext<ThemeContextType | undefined>(undefined);

// Helper to convert hex to HSL string: "H S% L%"
function hexToHsl(hex: string): string {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }

  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyThemeVariables(primaryHex: string, accentHex: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  root.style.setProperty("--color-primary", primaryHex);
  root.style.setProperty("--color-accent", accentHex);

  try {
    const primaryHsl = hexToHsl(primaryHex);
    const accentHsl = hexToHsl(accentHex);
    root.style.setProperty("--primary", primaryHsl);
    root.style.setProperty("--accent", accentHsl);
  } catch (err) {
    console.error("Gagal convert hex ke HSL:", err);
  }
}

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [currentPresetId, setCurrentPresetId] = React.useState<string>("crimson");
  const [primaryColor, setPrimaryColor] = React.useState<string>("#BA2421");
  const [accentColor, setAccentColor] = React.useState<string>("#D4A346");

  React.useEffect(() => {
    // 1. Baca dari localStorage
    const saved = localStorage.getItem("esm_site_theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.primaryColor && parsed.accentColor) {
          setCurrentPresetId(parsed.presetId || "custom");
          setPrimaryColor(parsed.primaryColor);
          setAccentColor(parsed.accentColor);
          applyThemeVariables(parsed.primaryColor, parsed.accentColor);
        }
      } catch (e) {}
    }

    // 2. Fetch dari server / database
    fetch("/api/content?key=site_theme")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          const { presetId, primaryColor: pCol, accentColor: aCol } = res.data;
          if (pCol && aCol) {
            setCurrentPresetId(presetId || "custom");
            setPrimaryColor(pCol);
            setAccentColor(aCol);
            applyThemeVariables(pCol, aCol);
            localStorage.setItem("esm_site_theme", JSON.stringify(res.data));
          }
        }
      })
      .catch(() => {});
  }, []);

  const setTheme = (presetId: string, customPrimary?: string, customAccent?: string) => {
    let p = customPrimary || "#BA2421";
    let a = customAccent || "#D4A346";

    const preset = THEME_PRESETS.find((pr) => pr.id === presetId);
    if (preset) {
      p = preset.primary;
      a = preset.accent;
    }

    setCurrentPresetId(presetId);
    setPrimaryColor(p);
    setAccentColor(a);
    applyThemeVariables(p, a);

    localStorage.setItem(
      "esm_site_theme",
      JSON.stringify({
        presetId,
        primaryColor: p,
        accentColor: a,
      })
    );
  };

  const setThemePreset = (presetId: string) => {
    setTheme(presetId);
  };

  const setCustomHex = (hex: string) => {
    setTheme("custom", hex);
  };

  const resetTheme = () => {
    setTheme("crimson");
  };

  return (
    <ThemeCustomizerContext.Provider
      value={{
        currentPresetId,
        themePreset: currentPresetId,
        primaryColor,
        customHex: primaryColor,
        accentColor,
        setTheme,
        setThemePreset,
        setCustomHex,
        resetTheme,
      }}
    >
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer() {
  const ctx = React.useContext(ThemeCustomizerContext);
  if (!ctx) {
    return {
      currentPresetId: "crimson",
      themePreset: "crimson",
      primaryColor: "#BA2421",
      customHex: "#BA2421",
      accentColor: "#D4A346",
      setTheme: () => {},
      setThemePreset: () => {},
      setCustomHex: () => {},
      resetTheme: () => {},
    };
  }
  return ctx;
}
