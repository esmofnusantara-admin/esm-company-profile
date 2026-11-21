"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowLeft,
  Home,
  MessageCircle,
  HeartHandshake,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ComingSoonViewProps {
  pageTitle: string;
  pageTitleEn?: string;
  category?: string;
  customMessage?: string;
  customMessageEn?: string;
}

export function ComingSoonView({
  pageTitle,
  pageTitleEn,
  category = "Pelayanan & Materi",
  customMessage,
  customMessageEn,
}: ComingSoonViewProps) {
  const { locale } = useLanguage();

  const title = locale === "en" && pageTitleEn ? pageTitleEn : pageTitle;
  const message =
    locale === "en" && customMessageEn
      ? customMessageEn
      : customMessage ||
        "Halaman ini sedang dipersiapkan dan diselaraskan oleh tim pelayanan ESM. Kami berkomitmen menyajikan konten terbaik bagi pertumbuhan iman generasi muda.";

  return (
    <>
      <Navbar />

      <main className="flex-1 min-h-[75vh] bg-[#FAF7F2] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary shadow-2xs">
            <Sparkles className="size-3.5 text-primary" />
            <span>{category} • Segera Hadir</span>
          </div>

          {/* Majestic Title & Narrative */}
          <div className="space-y-3">
            <h1 className="font-sans text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
              {title} <br />
              <span className="font-serif italic font-normal text-primary">
                Sedang Dipersiapkan
              </span>
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
              {message}
            </p>
          </div>

          {/* Value Pillars Box */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs text-left grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>Berakar Firman</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Materi disiapkan dengan ketelitian teologis Alkitabiah.
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>Relevan & Kontekstual</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Menjawab dinamika pergumulan siswa, kampus, dan alumni.
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>Akses Terbuka</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Dapat diakses dan diunduh cuma-cuma oleh para pembina.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full shadow-warm-sm px-6 py-5 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white"
            >
              <Link href="/">
                <Home className="size-3.5 mr-2" />
                <span>Kembali ke Beranda</span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 py-5 text-xs font-bold border-stone-300 hover:bg-stone-100"
            >
              <Link href="/doa">
                <HeartHandshake className="size-3.5 mr-2 text-primary" />
                <span>Lihat Pokok Doa Bersama</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
