"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Heart,
  RotateCcw,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DEVOTIONALS_DATA, type DevotionalItem } from "@/lib/devotionalsData";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

export default function DevotionalDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale } = useLanguage();
  const { success: showSuccessToast } = useToast();

  const currentIndex = DEVOTIONALS_DATA.findIndex((d) => d.slug === slug);
  const devotional: DevotionalItem | undefined = DEVOTIONALS_DATA[currentIndex];

  if (!devotional) {
    notFound();
  }

  const prevDevotional =
    currentIndex > 0 ? DEVOTIONALS_DATA[currentIndex - 1] : null;
  const nextDevotional =
    currentIndex < DEVOTIONALS_DATA.length - 1
      ? DEVOTIONALS_DATA[currentIndex + 1]
      : null;

  // Audio simulator state
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSeconds, setCurrentSeconds] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const totalDuration = devotional.audioDurationSeconds || 240;

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalDuration]);

  const formatAudioTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  // Font size state: 0 = normal, 1 = large, 2 = extra large
  const [fontSizeLevel, setFontSizeLevel] = React.useState<0 | 1 | 2>(0);
  const fontSizeClasses = ["text-base sm:text-lg", "text-lg sm:text-xl", "text-xl sm:text-2xl"];

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`bookmark_renungan_${devotional.slug}`);
      if (saved === "true") setIsBookmarked(true);
    }
  }, [devotional.slug]);

  const handleToggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem(`bookmark_renungan_${devotional.slug}`, String(nextState));
    }
    showSuccessToast(
      nextState ? "Renungan Disimpan" : "Dihapus dari Simpanan",
      nextState
        ? "Renungan ini telah disimpan untuk dibaca kembali."
        : "Renungan telah dihapus dari daftar simpanan."
    );
  };

  // Scripture collapse state
  const [showFullScripture, setShowFullScripture] = React.useState(true);

  // Copy Link State
  const [hasCopied, setHasCopied] = React.useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setHasCopied(true);
      showSuccessToast("Tautan Disalin", "Tautan renungan ini berhasil disalin ke papan klip.");
      setTimeout(() => setHasCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(
        `*Santapan Rohani Hari Ini - ESM Indonesia*\n\n"${devotional.title}"\nNas: ${devotional.scriptureRef}\n\n"${devotional.goldenVerse}"\n\nBaca renungan selengkapnya di:\n${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2]">
        {/* ============================================================
            1. BREADCRUMBS BAR
            ============================================================ */}
        <div className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-16 z-30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs text-stone-600">
            <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
              <Link href="/kabar-doa" className="hover:text-primary transition-colors">
                Kabar & Doa
              </Link>
              <span className="text-stone-300">/</span>
              <Link href="/renungan" className="hover:text-primary transition-colors">
                Santapan Rohani
              </Link>
              <span className="text-stone-300">/</span>
              <span className="font-bold text-stone-900 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {devotional.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="h-8 px-2.5 text-xs text-stone-600 hover:text-stone-900"
              >
                {hasCopied ? <Check className="size-3.5 text-emerald-600 mr-1" /> : <Copy className="size-3.5 mr-1" />}
                <span className="hidden sm:inline">{hasCopied ? "Tersalin" : "Salin"}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShareWhatsApp}
                className="h-8 px-2.5 text-xs text-emerald-700 hover:bg-emerald-50"
              >
                <Share2 className="size-3.5 mr-1" />
                <span className="hidden sm:inline">Bagikan</span>
              </Button>
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleToggleBookmark}
                className={cn(
                  "h-8 px-2.5 text-xs font-bold gap-1 rounded-xl transition-all",
                  isBookmarked
                    ? "bg-primary text-white"
                    : "border-stone-300 text-stone-700 hover:bg-stone-100"
                )}
              >
                {isBookmarked ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
                <span className="hidden sm:inline">{isBookmarked ? "Tersimpan" : "Simpan"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ============================================================
            2. GAMBAR DI ATAS (HERO BANNER AT TOP)
            User Request: "buat aja gambar diatas, trus dibawahnya isinya gt"
            Dramatic atmospheric banner across top with full title & scripture
            ============================================================ */}
        <section className="relative overflow-hidden bg-[#120204] text-white">
          <div className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center">
            {/* Background Image */}
            <Image
              src={devotional.coverImage}
              alt={devotional.title}
              fill
              priority
              className="object-cover object-center"
            />

            {/* Cinematic Gradient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-black/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />

            {/* Content atop banner */}
            <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-5">
              {/* Category & Read Time */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-200 shadow-sm">
                  <Sparkles className="size-3 text-amber-300" />
                  <span>{devotional.categoryLabel}</span>
                </span>
                <span className="text-xs font-medium text-stone-300 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  <Clock className="size-3 inline mr-1" />
                  {devotional.readTime}
                </span>
              </div>

              {/* Devotional Title */}
              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md max-w-3xl mx-auto">
                {devotional.title}
              </h1>

              {/* Scripture Badge */}
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-300 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-300/40 shadow-sm">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{devotional.scriptureRef}</span>
              </div>

              {/* Golden Verse Quote */}
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-stone-200/95 max-w-2xl mx-auto leading-relaxed pt-1">
                &ldquo;{devotional.goldenVerse}&rdquo;
              </p>

              {/* Author & Date Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300 border-t border-white/15 max-w-lg mx-auto">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-full overflow-hidden bg-stone-800 border border-white/30 relative shrink-0">
                    <Image
                      src={devotional.authorAvatar || devotional.coverImage}
                      alt={devotional.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">{devotional.author}</p>
                    <p className="text-stone-400 text-[11px]">{devotional.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-stone-200 font-semibold bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  <Calendar className="size-3.5 text-amber-300" />
                  <span>{devotional.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. DIBAWAHNYA ISINYA GT (CONTENT UNDERNEATH)
            Focused reading container stacked neatly below the top image
            ============================================================ */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
          {/* Top Navigation & Yearly Reading Bar */}
          <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-warm-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              {/* Prev / Next buttons */}
              <div className="flex items-center gap-2">
                {prevDevotional ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-stone-600 hover:text-stone-900 font-bold"
                  >
                    <Link href={`/renungan/${prevDevotional.slug}`}>
                      <ChevronLeft className="size-4 mr-0.5" />
                      <span>Hari Sebelumnya</span>
                    </Link>
                  </Button>
                ) : (
                  <span className="text-stone-400 text-xs px-2">Hari Pertama</span>
                )}

                <span className="text-stone-300">•</span>

                {nextDevotional ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-stone-600 hover:text-stone-900 font-bold"
                  >
                    <Link href={`/renungan/${nextDevotional.slug}`}>
                      <span>Hari Berikutnya</span>
                      <ChevronRight className="size-4 ml-0.5" />
                    </Link>
                  </Button>
                ) : (
                  <span className="text-stone-400 text-xs px-2">Terbaru</span>
                )}
              </div>

              {/* Current Date Badge */}
              <div className="flex items-center gap-1.5 text-stone-700 font-bold bg-stone-100 px-3 py-1 rounded-full self-start sm:self-auto">
                <Calendar className="size-3.5 text-primary" />
                <span>{devotional.date}</span>
              </div>
            </div>

            {/* Yearly Bible Reading Pill */}
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[11px] uppercase tracking-wider text-stone-500">
                Bacaan Alkitab Setahun:
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold text-xs border border-stone-200">
                  {devotional.yearlyReading.ot}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold text-xs border border-stone-200">
                  {devotional.yearlyReading.nt}
                </span>
              </div>
            </div>
          </div>

          {/* Ayat Bacaan Card (Scripture Box) */}
          <Card className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-6 sm:p-8 shadow-warm-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900/80 block">
                  Ayat Bacaan Hari Ini
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950">
                  {devotional.scriptureRef}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowFullScripture(!showFullScripture)}
                className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full border border-amber-300/50 shadow-xs cursor-pointer"
              >
                <span>{showFullScripture ? "Tutup Teks" : "Buka Teks Lengkap"}</span>
                {showFullScripture ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>
            </div>

            {showFullScripture && (
              <div className="pt-3 border-t border-amber-200/80 space-y-3 font-serif text-sm sm:text-base text-amber-950/90 leading-relaxed">
                {devotional.scripturePassage.map((v) => (
                  <p key={v.verseNumber} className="flex gap-2.5">
                    <span className="font-sans font-bold text-amber-700 text-xs mt-1 shrink-0 select-none">
                      {v.verseNumber}
                    </span>
                    <span>{v.text}</span>
                  </p>
                ))}
              </div>
            )}
          </Card>

          {/* Interactive Audio Player Simulator */}
          <div className="rounded-2xl bg-white border border-stone-200/90 p-4 sm:p-5 shadow-warm-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Volume2 className="size-4 text-primary animate-pulse" />
                <span className="font-bold text-stone-900">
                  Dengar Audio Renungan Hari Ini
                </span>
              </div>
              <span className="text-stone-500 font-mono text-[11px]">
                {formatAudioTime(currentSeconds)} / {devotional.audioDuration}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 rounded-full p-0 bg-primary hover:bg-primary-700 text-white shadow-warm-xs shrink-0 cursor-pointer"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </Button>

              {/* Progress Bar / Scrubber */}
              <div
                className="flex-1 h-3 rounded-full bg-stone-100 border border-stone-200 overflow-hidden relative cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientX - rect.left) / rect.width;
                  setCurrentSeconds(Math.floor(ratio * totalDuration));
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min(100, (currentSeconds / totalDuration) * 100)}%`,
                  }}
                />
              </div>

              {/* Reset & Mute buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrentSeconds(0)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                  title="Ulangi dari Awal"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                  title={isMuted ? "Suara Nyala" : "Bisukan"}
                >
                  {isMuted ? <VolumeX className="size-3.5 text-red-500" /> : <Volume2 className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Font Size Adjuster Pill */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Ukuran Tulisan Pembaca:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFontSizeLevel(0)}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-sans text-xs font-bold transition-all",
                    fontSizeLevel === 0 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  )}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSizeLevel(1)}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-sans text-sm font-bold transition-all",
                    fontSizeLevel === 1 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  )}
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontSizeLevel(2)}
                  className={cn(
                    "px-2.5 py-1 rounded-md font-sans text-base font-bold transition-all",
                    fontSizeLevel === 2 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  )}
                >
                  A++
                </button>
              </div>
            </div>
          </div>

          {/* Main Reading Card: Renungan Hari Ini */}
          <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-warm-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Refleksi Firman & Kehidupan
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Renungan Hari Ini
              </h2>
            </div>

            {/* Paragraphs with adjustable font size */}
            <div
              className={cn(
                "font-serif text-stone-800 leading-relaxed space-y-5 transition-all duration-200",
                fontSizeClasses[fontSizeLevel]
              )}
            >
              {devotional.reflectionParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={cn(
                    idx === 0 &&
                      "first-letter:text-4xl first-letter:font-sans first-letter:font-black first-letter:text-primary first-letter:mr-2 first-letter:float-left"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* ============================================================
                RENUNGKAN DAN DOAKAN (Box Refleksi & Doa)
                ============================================================ */}
            <div className="mt-8 rounded-2xl bg-amber-50/70 border-l-4 border-l-amber-500 border border-stone-200/80 p-5 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="size-4 text-amber-700" />
                <h3 className="font-sans text-sm sm:text-base font-bold text-amber-950 uppercase tracking-wide">
                  Renungkan dan Doakan
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800">
                {devotional.reflectionQuestions.map((q, i) => (
                  <p key={i} className="font-medium leading-relaxed">
                    • {q}
                  </p>
                ))}
              </div>

              <div className="pt-3 border-t border-amber-200/60 font-serif italic text-xs sm:text-sm text-stone-700 bg-white/70 p-3.5 rounded-xl border border-amber-200/50">
                <span className="font-sans font-bold not-italic text-primary block mb-1 text-[11px] uppercase tracking-wider">
                  Doa Hari Ini:
                </span>
                &ldquo;{devotional.closingPrayer}&rdquo;
              </div>
            </div>

            {/* ============================================================
                WAWASAN TEOLOGIS & BUDAYA (Insight Box)
                ============================================================ */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-4 text-primary" />
                <h3 className="font-sans text-sm font-bold text-stone-900">
                  {devotional.insight.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif">
                {devotional.insight.content}
              </p>
              {devotional.insight.authorSignOff && (
                <p className="text-[11px] font-sans font-bold text-stone-400 text-right pt-1">
                  — {devotional.insight.authorSignOff}
                </p>
              )}
            </div>

            {/* ============================================================
                RELATED RESOURCE CARD (Proyek Misi / Modul Pelayanan)
                ============================================================ */}
            {devotional.relatedResource && (
              <div className="pt-4 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-3">
                  Langkah Aksi & Kemitraan Terkait
                </span>
                <Link
                  href={devotional.relatedResource.href}
                  className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-stone-200 hover:border-primary/40 bg-white hover:bg-stone-50 transition-all shadow-xs"
                >
                  <div className="relative aspect-[16/10] sm:aspect-square w-full sm:w-28 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={devotional.relatedResource.image}
                      alt={devotional.relatedResource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-bold text-primary bg-primary/10"
                    >
                      {devotional.relatedResource.tag}
                    </Badge>
                    <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-primary transition-colors leading-snug">
                      {devotional.relatedResource.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {devotional.relatedResource.description}
                    </p>
                  </div>
                  <ChevronRight className="size-5 text-stone-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
                </Link>
              </div>
            )}

            {/* Footer Navigation Buttons */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button asChild variant="outline" size="sm" className="w-full sm:w-auto rounded-xl">
                <Link href="/renungan">
                  <ChevronLeft className="size-4 mr-1.5" />
                  <span>Kembali ke Indeks Renungan</span>
                </Link>
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-none rounded-xl text-xs"
                >
                  {hasCopied ? <Check className="size-3.5 text-emerald-600 mr-1" /> : <Copy className="size-3.5 mr-1" />}
                  <span>{hasCopied ? "Tersalin" : "Salin Tautan"}</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleShareWhatsApp}
                  className="flex-1 sm:flex-none rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  <Share2 className="size-3.5 mr-1" />
                  <span>WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
