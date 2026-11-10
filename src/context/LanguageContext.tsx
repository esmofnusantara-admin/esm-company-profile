"use client";

import * as React from "react";
import { id } from "@/lib/translations/id";
import { en } from "@/lib/translations/en";

type Locale = "id" | "en";
type TranslationType = typeof id;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationType;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("id");

  React.useEffect(() => {
    // Baca preference dari localStorage jika ada
    const saved = localStorage.getItem("esm_locale") as Locale;
    if (saved === "id" || saved === "en") {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("esm_locale", newLocale);
    document.cookie = `esm_locale=${newLocale}; path=/; max-age=31536000`;
  };

  const t = locale === "en" ? en : id;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    return {
      locale: "id" as Locale,
      setLocale: () => {},
      t: id,
    };
  }
  return context;
}
