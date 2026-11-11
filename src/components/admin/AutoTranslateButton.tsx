"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AutoTranslateButtonProps {
  sourceText: string;
  onTranslated: (translatedText: string) => void;
  className?: string;
}

export function AutoTranslateButton({
  sourceText,
  onTranslated,
  className = "",
}: AutoTranslateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText || !sourceText.trim()) {
      alert("Silakan isi teks bahasa Indonesia terlebih dahulu sebelum menerjemahkan.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          from: "id",
          to: "en",
        }),
      });

      const data = await res.json();
      if (data.translated) {
        onTranslated(data.translated);
      } else {
        alert("Gagal menerjemahkan teks.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghubungi layanan terjemahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={loading || !sourceText?.trim()}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 hover:bg-amber-100 disabled:opacity-50 transition-colors shadow-xs ${className}`}
      title="Terjemahkan otomatis ke Bahasa Inggris"
    >
      {loading ? (
        <>
          <Loader2 className="size-3 animate-spin text-amber-700" />
          <span>Menerjemahkan...</span>
        </>
      ) : (
        <>
          <Sparkles className="size-3 text-amber-600" />
          <span>Auto EN</span>
        </>
      )}
    </button>
  );
}
