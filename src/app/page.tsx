"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Briefcase,
  Flame,
  Users,
  Sparkles,
  Heart,
  ChevronRight,
  ChevronDown,
  MapPin,
  BookOpen,
  Calendar,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [featuredArticles, setFeaturedArticles] = React.useState<any[]>([]);
  const [homeContent, setHomeContent] = React.useState<any>(null);

  // Interactive prayer state
  const [hasPrayed, setHasPrayed] = React.useState(false);
  const [prayerCount, setPrayerCount] = React.useState(86);

  // FAQ Accordion State (0 is open by default)
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  React.useEffect(() => {
    fetch("/api/articles?limit=2&status=PUBLISHED")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFeaturedArticles(data.data);
        }
      })
      .catch(() => {});

    fetch("/api/content?section=home")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setHomeContent(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const hero = homeContent?.hero;
  const stats = homeContent?.stats;

  const heroKicker = hero
    ? locale === "en"
      ? hero.kickerEn || hero.kickerId
      : hero.kickerId
    : t.hero.kicker;

  const heroHeadline = hero
    ? locale === "en"
      ? hero.headlineEn || hero.headlineId
      : hero.headlineId
    : null;

  const heroSubheadline = hero
    ? locale === "en"
      ? hero.subheadlineEn || hero.subheadlineId
      : hero.subheadlineId
    : t.hero.description;

  const primaryCtaText = hero
    ? locale === "en"
      ? hero.primaryCtaTextEn || hero.primaryCtaTextId
      : hero.primaryCtaTextId
    : t.hero.ctaPrimary;

  const primaryCtaUrl = hero?.primaryCtaUrl || "/pelayanan";

  const secondaryCtaText = hero
    ? locale === "en"
      ? hero.secondaryCtaTextEn || hero.secondaryCtaTextId
      : hero.secondaryCtaTextId
    : t.hero.ctaSecondary;

  const secondaryCtaUrl = hero?.secondaryCtaUrl || "/tentang-kami";

  const faqItems = [
    {
      q: locale === "en" ? "Is ESM a church denomination or an independent mission?" : "Apakah ESM adalah gereja lokal atau yayasan misi?",
      a: locale === "en"
        ? "ESM is an interdenominational Christian student movement (parachurch) dedicated to discipling pupils, university students, and professionals to be rooted in God's Word and live on mission."
        : "ESM adalah gerakan pemuridan antargereja (parachurch movement) yang berfokus mendampingi siswa sekolah, mahasiswa kampus, dan kaum profesional untuk berakar kuat dalam firman Tuhan dan aktif bermisi.",
    },
    {
      q: locale === "en" ? "How can I join a discipleship group in Banten or Ternate?" : "Bagaimana cara bergabung dalam kelompok pemuridan di Banten atau Ternate?",
      a: locale === "en"
        ? "You can fill out the form on our Get Involved page. Our local ministry coordinators in Serang, Pandeglang, Lebak, or Ternate will personally connect with you."
        : "Anda dapat mengisi formulir minat di halaman Gabung Komunitas. Koordinator pelayan kami di Serang, Pandeglang, Lebak, atau Ternate akan segera menyapa dan menghubungkan Anda dengan kelompok terdekat.",
    },
    {
      q: locale === "en" ? "How is mission partnership and financial giving managed?" : "Bagaimana bentuk kemitraan doa dan transparansi donasi misi?",
      a: locale === "en"
        ? "All partnership donations directly support student retreats, free Bible study modules, and mission outpost operations, backed by regular stewardship reports."
        : "Seluruh donasi kemitraan digunakan untuk pembinaan siswa/mahasiswa di lapangan, pengadaan modul Alkitab gratis, dan sarana pos misi dengan laporan pertanggungjawaban berkala.",
    },
    {
      q: locale === "en" ? "Can students outside Banten and Ternate take part in mentorship?" : "Apakah siswa atau mahasiswa di luar Banten dan Ternate bisa ikut?",
      a: locale === "en"
        ? "Yes! In addition to on-site gatherings in Banten and Ternate, we host online alumni mentoring cohorts and provide downloadable study resources accessible nationwide."
        : "Tentu! Selain persekutuan tatap muka di Banten dan Ternate, kami memfasilitasi kelompok mentoring online bagi alumni serta materi pembinaan digital yang dapat diunduh bebas.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ============================================================
            1. HERO SECTION (Solid Royal Ruby & Crimson Glow - Grounded & Authoritative)
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#1C0407] via-[#2D060B] to-[#180306] text-white pt-20 pb-20 sm:pt-24 sm:pb-24 md:pt-28 md:pb-28 text-center border-b border-white/10">
          {/* Luminous Warm Light Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-br from-amber-400/20 via-orange-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[350px] bg-gradient-to-tr from-primary/60 via-red-600/40 to-rose-500/25 rounded-full blur-[130px] pointer-events-none opacity-85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(186,36,33,0.18)_40%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Top Amber Badge Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold tracking-wide text-amber-200 backdrop-blur-md shadow-sm">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>{heroKicker}</span>
            </div>

            {/* Primary Hero Title (Large, Centered, Majestic) */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14] text-white drop-shadow-md">
              {heroHeadline ? (
                heroHeadline
              ) : (
                <>
                  {t.hero.titleLine1} <br />
                  <span className="font-serif italic font-normal text-amber-200 drop-shadow-md">
                    {t.hero.titleLine2}
                  </span>
                </>
              )}
            </h1>

            {/* Narrative Subheadline */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              {heroSubheadline}
            </p>

            {/* Centered Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-full shadow-warm-lg px-8 py-6 text-sm font-bold bg-gradient-to-r from-primary to-red-600 hover:from-primary-600 hover:to-red-700 transition-all hover:scale-[1.02]"
              >
                <Link href={primaryCtaUrl}>
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outlineWhite"
                className="rounded-full px-7 py-6 text-sm font-semibold border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
              >
                <Link href={secondaryCtaUrl}>
                  <span>{secondaryCtaText}</span>
                </Link>
              </Button>
            </div>

            {/* Regional Presence Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 text-xs text-white/85">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.09] border border-white/20 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <MapPin className="size-3.5 text-amber-300" />
                <span className="font-medium text-white/90">{t.hero.regionBanten}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.09] border border-white/20 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <MapPin className="size-3.5 text-amber-300" />
                <span className="font-medium text-white/90">{t.hero.regionTernate}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.09] border border-white/20 px-3.5 py-1.5 backdrop-blur-sm shadow-xs">
                <Users className="size-3.5 text-amber-300" />
                <span className="font-medium text-white/90">{t.hero.communityList}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. STATISTIK ANGKA DAMPAK (Contained Framed Card - Tidak Sampai Pinggir)
            ============================================================ */}
        <div className="relative -mt-8 sm:-mt-10 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 md:p-10 shadow-warm-md border border-stone-200/90">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200/80">
              {stats && Array.isArray(stats) && stats.length > 0 ? (
                stats.map((st: any, idx: number) => {
                  const label = locale === "en" ? st.labelEn || st.labelId : st.labelId;
                  const icons = [GraduationCap, Users, MapPin, Flame];
                  const Icon = icons[idx % icons.length];
                  const isGold = idx % 2 === 1;
                  return (
                    <div key={idx} className={`space-y-2 text-center ${idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}>
                      <div className={`size-10 rounded-xl mx-auto flex items-center justify-center ${isGold ? "bg-amber-500/10 text-amber-700" : "bg-primary/10 text-primary"}`}>
                        <Icon className="size-5" />
                      </div>
                      <span className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-black block ${isGold ? "text-accent" : "text-primary"}`}>
                        {st.number}
                      </span>
                      <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                        {label}
                      </p>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="space-y-2 text-center">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                      <GraduationCap className="size-5" />
                    </div>
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-primary block">
                      {t.impact.stat1Number}
                    </span>
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      {t.impact.stat1Title}
                    </p>
                  </div>
                  <div className="space-y-2 text-center pt-4 md:pt-0 md:pl-6">
                    <div className="size-10 rounded-xl bg-amber-500/10 text-amber-700 mx-auto flex items-center justify-center">
                      <Users className="size-5" />
                    </div>
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-accent block">
                      {t.impact.stat2Number}
                    </span>
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      {t.impact.stat2Title}
                    </p>
                  </div>
                  <div className="space-y-2 text-center pt-4 md:pt-0 md:pl-6">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                      <MapPin className="size-5" />
                    </div>
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-primary block">
                      {t.impact.stat3Number}
                    </span>
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      {t.impact.stat3Title}
                    </p>
                  </div>
                  <div className="space-y-2 text-center pt-4 md:pt-0 md:pl-6">
                    <div className="size-10 rounded-xl bg-amber-500/10 text-amber-700 mx-auto flex items-center justify-center">
                      <Flame className="size-5" />
                    </div>
                    <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-accent block">
                      {t.impact.stat4Number}
                    </span>
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                      {t.impact.stat4Title}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            3. PANGGILAN & NILAI 3C (Grounded Warm Ivory Canvas - Terstruktur & Jelas)
            ============================================================ */}
        <section className="pt-16 pb-20 sm:pt-20 sm:pb-28 bg-[#FAF7F2] relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Bold Narrative with Amber Accent Bar */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                  {t.whyEsm.kicker}
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.18]">
                  {t.whyEsm.headlineStart}
                  <span className="text-primary italic font-serif"> {t.whyEsm.discipleship} </span>
                  {t.whyEsm.and}
                  <span className="text-accent italic font-serif"> {t.whyEsm.mission} </span>
                  {t.whyEsm.headlineEnd}
                </h2>
                <p className="text-base text-stone-600 leading-relaxed">
                  {t.whyEsm.description}
                </p>
                <div className="pt-2">
                  <Button asChild variant="link" className="px-0 font-bold text-primary hover:underline text-sm">
                    <Link href="/tentang-kami" className="flex items-center gap-1.5">
                      <span>Pelajari Sejarah & Panggilan Awal</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: 3 Structured Cards */}
              <div className="lg:col-span-7 space-y-4">
                {/* Value 1: Communion */}
                <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-warm-xs border border-stone-200/90 space-y-2 hover:border-primary/40 hover:shadow-warm-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold shrink-0">
                      <Compass className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Nilai 01 • Communion</span>
                      <h3 className="text-lg font-bold text-foreground">{t.whyEsm.card1Title}</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-14">
                    {t.whyEsm.card1Desc}
                  </p>
                </div>

                {/* Value 2: Community */}
                <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-warm-xs border border-stone-200/90 space-y-2 hover:border-amber-400/60 hover:shadow-warm-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                      <Flame className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Nilai 02 • Community</span>
                      <h3 className="text-lg font-bold text-foreground">{t.whyEsm.card2Title}</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-14">
                    {t.whyEsm.card2Desc}
                  </p>
                </div>

                {/* Value 3: Commission */}
                <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-warm-xs border border-stone-200/90 space-y-2 hover:border-primary/40 hover:shadow-warm-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold shrink-0">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Nilai 03 • Commission</span>
                      <h3 className="text-lg font-bold text-foreground">{t.whyEsm.card3Title}</h3>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-14">
                    {t.whyEsm.card3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TIGA KOMUNITAS PELAYANAN (Mata Rantai Pemuridan - Konsep Roda & Rantai Elegan)
            ============================================================ */}
        <section className="py-20 sm:py-28 bg-[#F3ECE4] border-y border-stone-300/80 relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
            {/* Header: Mata Rantai Pemuridan */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-xs">
                  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{locale === "en" ? "DISCIPLESHIP CHAIN" : "MATA RANTAI PEMURIDAN"}</span>
                </div>
                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                  {locale === "en" ? "Three Communities, One Movement" : "Tiga Komunitas, Satu Kegerakan"}
                </h2>
                <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
                  {locale === "en"
                    ? "Accompanying the journey of faith from school benches, university halls, to marketplace and family."
                    : "Menemani perjalanan iman dari bangku sekolah, ruang kuliah kampus, hingga dunia kerja dan keluarga."}
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full px-5 font-bold border-stone-300 bg-white shadow-xs shrink-0 hover:bg-stone-50">
                <Link href="/pelayanan" className="flex items-center gap-1.5">
                  <span>Lihat Seluruh Komunitas</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            {/* Grid 3 Kartu Komunitas dengan Rantai & Roda Penghubung */}
            <div className="relative">
              {/* Desktop Kinetic Chain Connectors (Card 1 -> Card 2) */}
              <div className="hidden lg:block absolute -top-5 left-[33.3%] w-20 -translate-x-1/2 z-20 pointer-events-none">
                <svg viewBox="0 0 80 32" fill="none" className="w-full text-primary/70">
                  <path
                    d="M 4 24 C 24 4, 56 4, 74 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                  <polygon points="77,20 68,15 70,22" fill="currentColor" />
                  <circle cx="40" cy="10" r="3" fill="#F3ECE4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="40" cy="10" r="1.5" fill="currentColor" />
                </svg>
              </div>

              {/* Desktop Kinetic Chain Connectors (Card 2 -> Card 3) */}
              <div className="hidden lg:block absolute -top-5 left-[66.6%] w-20 -translate-x-1/2 z-20 pointer-events-none">
                <svg viewBox="0 0 80 32" fill="none" className="w-full text-amber-600/70">
                  <path
                    d="M 4 24 C 24 4, 56 4, 74 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                  <polygon points="77,20 68,15 70,22" fill="currentColor" />
                  <circle cx="40" cy="10" r="3" fill="#F3ECE4" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="40" cy="10" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                {/* 1. Explore (Siswa Sekolah) */}
                <div className="rounded-[2.25rem] bg-gradient-to-b from-white via-white to-[#FAF6F2] p-8 shadow-warm-xs hover:shadow-warm-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group border border-stone-200/90 relative overflow-hidden">
                  {/* Subtle, Proportionate Bicycle Wheel Background Graphic (45% smaller, light stroke, never obscures text) */}
                  <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 pointer-events-none text-primary/[0.08] group-hover:text-primary/[0.16] transition-all duration-700">
                    <svg className="w-full h-full transition-transform duration-1000 group-hover:rotate-45" viewBox="0 0 160 160" fill="none">
                      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="80" cy="80" r="36" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="16" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.3" />
                      <line x1="80" y1="8" x2="80" y2="152" stroke="currentColor" strokeWidth="1" />
                      <line x1="8" y1="80" x2="152" y2="80" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="29" x2="131" y2="131" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="131" x2="131" y2="29" stroke="currentColor" strokeWidth="1" />
                      <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 5" />
                    </svg>
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* Header: Proportionate Bicycle Wheel Hub + Loop Arrow + Stage Pill */}
                    <div className="flex items-center justify-between gap-2.5">
                      {/* Refined Bicycle Wheel Hub (~45% smaller) */}
                      <div className="relative group/hub shrink-0 size-11 sm:size-12 flex items-center justify-center">
                        <svg className="absolute inset-0 size-full text-primary/70 transition-transform duration-700 group-hover:rotate-90" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.25" />
                          <line x1="24" y1="3" x2="24" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="3" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="9" x2="39" y2="39" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="39" x2="39" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                        </svg>
                        <div className="relative z-10 size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                          <Compass className="size-4" />
                        </div>
                      </div>

                      {/* Clean Loop Arrow */}
                      <svg className="w-10 h-5 text-stone-400 group-hover:text-primary transition-colors hidden sm:block shrink-0" viewBox="0 0 50 20" fill="none">
                        <path
                          d="M 3 13 C 12 13, 16 5, 23 5 C 30 5, 32 15, 25 15 C 20 15, 22 7, 30 7 L 43 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                          strokeLinecap="round"
                        />
                        <polygon points="46,10 38,6 40,12" fill="currentColor" />
                      </svg>

                      {/* Stage Pill */}
                      <Badge variant="outline" className="text-[11px] font-bold border border-primary/30 text-primary bg-red-50 rounded-full px-3 py-1 shrink-0">
                        Tahap 01 • Siswa Sekolah
                      </Badge>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-2xl font-black text-foreground">Explore</h3>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                        Menemani remaja SMP & SMA mengenal Kristus secara personal, membangun ketahanan iman terhadap arus zaman, dan menjadi saksi di lingkungan sekolah.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-200/80 relative z-10">
                    <Link href="/pelayanan/explore" className="text-xs font-bold text-primary flex items-center gap-1.5 group-hover:underline">
                      <span>Pelajari Program Explore</span>
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* 2. Encounter (Mahasiswa Kampus) */}
                <div className="rounded-[2.25rem] bg-gradient-to-b from-white via-white to-[#FDFBF7] p-8 shadow-warm-xs hover:shadow-warm-md hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group border border-stone-200/90 relative overflow-hidden">
                  {/* Subtle, Proportionate Bicycle Wheel Background Graphic (Gold Accent) */}
                  <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 pointer-events-none text-amber-600/[0.08] group-hover:text-amber-600/[0.16] transition-all duration-700">
                    <svg className="w-full h-full transition-transform duration-1000 group-hover:rotate-45" viewBox="0 0 160 160" fill="none">
                      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="80" cy="80" r="36" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="16" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.3" />
                      <line x1="80" y1="8" x2="80" y2="152" stroke="currentColor" strokeWidth="1" />
                      <line x1="8" y1="80" x2="152" y2="80" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="29" x2="131" y2="131" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="131" x2="131" y2="29" stroke="currentColor" strokeWidth="1" />
                      <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 5" />
                    </svg>
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* Header: Proportionate Bicycle Wheel Hub + Loop Arrow + Stage Pill */}
                    <div className="flex items-center justify-between gap-2.5">
                      {/* Refined Bicycle Wheel Hub (~45% smaller) */}
                      <div className="relative group/hub shrink-0 size-11 sm:size-12 flex items-center justify-center">
                        <svg className="absolute inset-0 size-full text-amber-600/70 transition-transform duration-700 group-hover:rotate-90" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.25" />
                          <line x1="24" y1="3" x2="24" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="3" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="9" x2="39" y2="39" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="39" x2="39" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                        </svg>
                        <div className="relative z-10 size-8 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
                          <GraduationCap className="size-4" />
                        </div>
                      </div>

                      {/* Clean Loop Arrow */}
                      <svg className="w-10 h-5 text-stone-400 group-hover:text-amber-600 transition-colors hidden sm:block shrink-0" viewBox="0 0 50 20" fill="none">
                        <path
                          d="M 3 13 C 12 13, 16 5, 23 5 C 30 5, 32 15, 25 15 C 20 15, 22 7, 30 7 L 43 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                          strokeLinecap="round"
                        />
                        <polygon points="46,10 38,6 40,12" fill="currentColor" />
                      </svg>

                      {/* Stage Pill */}
                      <Badge variant="outline" className="text-[11px] font-bold border border-amber-400/40 text-amber-900 bg-amber-50 rounded-full px-3 py-1 shrink-0">
                        Tahap 02 • Mahasiswa Kampus
                      </Badge>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-2xl font-black text-foreground">Encounter</h3>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                        Membangun komunitas persekutuan mahasiswa yang kritis, berakar pada teologi Alkitab, serta aktif menggarami iklim intelektual di Banten dan Ternate.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-200/80 relative z-10">
                    <Link href="/pelayanan/encounter" className="text-xs font-bold text-amber-800 flex items-center gap-1.5 group-hover:underline">
                      <span>Pelajari Program Encounter</span>
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* 3. Connect (Alumni & Profesi) */}
                <div className="rounded-[2.25rem] bg-gradient-to-b from-white via-white to-[#FAF6F2] p-8 shadow-warm-xs hover:shadow-warm-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group border border-stone-200/90 relative overflow-hidden">
                  {/* Subtle, Proportionate Bicycle Wheel Background Graphic (45% smaller, light stroke, never obscures text) */}
                  <div className="absolute -bottom-6 -right-6 w-36 h-36 sm:w-40 sm:h-40 pointer-events-none text-primary/[0.08] group-hover:text-primary/[0.16] transition-all duration-700">
                    <svg className="w-full h-full transition-transform duration-1000 group-hover:rotate-45" viewBox="0 0 160 160" fill="none">
                      <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="80" cy="80" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="80" cy="80" r="36" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="16" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="80" cy="80" r="6" fill="currentColor" opacity="0.3" />
                      <line x1="80" y1="8" x2="80" y2="152" stroke="currentColor" strokeWidth="1" />
                      <line x1="8" y1="80" x2="152" y2="80" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="29" x2="131" y2="131" stroke="currentColor" strokeWidth="1" />
                      <line x1="29" y1="131" x2="131" y2="29" stroke="currentColor" strokeWidth="1" />
                      <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 5" />
                    </svg>
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* Header: Proportionate Bicycle Wheel Hub + Loop Arrow + Stage Pill */}
                    <div className="flex items-center justify-between gap-2.5">
                      {/* Refined Bicycle Wheel Hub (~45% smaller) */}
                      <div className="relative group/hub shrink-0 size-11 sm:size-12 flex items-center justify-center">
                        <svg className="absolute inset-0 size-full text-primary/70 transition-transform duration-700 group-hover:rotate-90" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.25" />
                          <line x1="24" y1="3" x2="24" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="3" y1="24" x2="45" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="9" x2="39" y2="39" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                          <line x1="9" y1="39" x2="39" y2="9" stroke="currentColor" strokeWidth="1" opacity="0.7" />
                        </svg>
                        <div className="relative z-10 size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                          <Briefcase className="size-4" />
                        </div>
                      </div>

                      {/* Clean Loop Arrow */}
                      <svg className="w-10 h-5 text-stone-400 group-hover:text-primary transition-colors hidden sm:block shrink-0" viewBox="0 0 50 20" fill="none">
                        <path
                          d="M 3 13 C 12 13, 16 5, 23 5 C 30 5, 32 15, 25 15 C 20 15, 22 7, 30 7 L 43 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                          strokeLinecap="round"
                        />
                        <polygon points="46,10 38,6 40,12" fill="currentColor" />
                      </svg>

                      {/* Stage Pill */}
                      <Badge variant="outline" className="text-[11px] font-bold border border-primary/30 text-primary bg-red-50 rounded-full px-3 py-1 shrink-0">
                        Tahap 03 • Alumni & Profesi
                      </Badge>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-2xl font-black text-foreground">Connect</h3>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                        Wadah bagi kaum profesional dan alumni untuk saling meneguhkan integritas iman, mentoring adik-adik, serta mengutus dampak Kerajaan Allah di marketplace.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-200/80 relative z-10">
                    <Link href="/pelayanan/connect" className="text-xs font-bold text-primary flex items-center gap-1.5 group-hover:underline">
                      <span>Pelajari Program Connect</span>
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ============================================================
            5. LANGKAH TERLIBAT & TANYA JAWAB (Combined CTA + FAQ Hub)
            Positioned directly after Mata Rantai Pemuridan as natural conversion funnel
            ============================================================ */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2] relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                Langkah Terlibat & Tanya Jawab
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
                Mari Menjadi Bagian dari Gerakan Ini
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Punya pertanyaan sebelum bergabung atau mendukung misi? Temukan jawabannya di sini, atau langsung melangkah bersama kami.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Warm Royal Garnet Action Card */}
              <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#2D0609] via-[#3E090F] to-[#1C0407] text-white p-8 sm:p-10 shadow-warm-lg border border-primary/25 flex flex-col justify-between space-y-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-200">
                    <Heart className="size-3 text-amber-300" />
                    Kemitraan & Perjalanan Misi
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                    Setiap Murid yang Bertumbuh Dimulai dari Keberanian Melangkah.
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                    Baik sebagai siswa, mahasiswa, mentor alumni, maupun mitra donatur, setiap dukungan Anda menghidupkan api pelayanan di Tanah Jawara (Banten) dan Kota Rempah (Ternate).
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-full shadow-warm-md text-xs sm:text-sm font-bold bg-gradient-to-r from-primary to-red-600 hover:from-primary-600 hover:to-red-700 transition-all py-6"
                  >
                    <Link href="/kemitraan">
                      <span>Dukung Misi (Kemitraan Donasi)</span>
                      <ArrowRight className="size-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outlineWhite"
                    className="w-full rounded-full text-xs sm:text-sm font-semibold border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all py-6"
                  >
                    <Link href="/gabung">
                      <span>Gabung Kelompok Pemuridan</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive FAQ Accordion */}
              <div className="lg:col-span-7 space-y-3.5">
                {faqItems.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "rounded-2xl border transition-all duration-200 bg-white shadow-warm-xs overflow-hidden",
                        isOpen ? "border-primary/40 ring-1 ring-primary/20" : "border-stone-200/90 hover:border-stone-300"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className={cn("size-4 shrink-0 transition-colors", isOpen ? "text-primary" : "text-stone-400")} />
                          <span className="font-bold text-sm sm:text-base text-foreground leading-snug">
                            {faq.q}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-stone-400 transition-transform duration-200",
                            isOpen && "rotate-180 text-primary"
                          )}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed pl-12 sm:pl-13 animate-in fade-in-50 duration-150">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. WARTA & MEZBAH DOA (Warm Ivory Canvas Section)
            ============================================================ */}
        <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-stone-200/80 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Kabar & Denyut Gerakan</span>
                <h2 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-1">
                  Kisah Misi & Pokok Doa
                </h2>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full px-5 text-xs font-bold border-stone-300 bg-white shadow-xs">
                <Link href="/artikel">
                  <span>Lihat Semua Artikel</span>
                  <ArrowRight className="size-3 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 2 Featured Articles */}
              <div className="lg:col-span-7 space-y-4">
                {featuredArticles.length > 0 ? (
                  featuredArticles.map((art) => {
                    const displayTitle = locale === "en" && art.titleEn ? art.titleEn : art.title;
                    const displayExcerpt = locale === "en" && art.excerptEn ? art.excerptEn : art.excerpt;

                    return (
                      <Link href="/artikel" key={art.id} className="block group">
                        <div className="rounded-2xl bg-white p-6 shadow-warm-xs hover:shadow-warm-sm border border-stone-200/90 hover:border-primary/40 transition-all flex gap-4 items-start">
                          <div className="size-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                            <Flame className="size-6" />
                          </div>
                          <div className="space-y-1.5">
                            <Badge variant="primarySoft" className="text-[10px]">{art.category}</Badge>
                            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                              {displayTitle}
                            </h3>
                            <p className="text-xs text-stone-600 line-clamp-2">
                              {displayExcerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <>
                    <Link href="/artikel" className="block group">
                      <div className="rounded-2xl bg-white p-6 shadow-warm-xs hover:shadow-warm-sm border border-stone-200/90 hover:border-primary/40 transition-all flex gap-4 items-start">
                        <div className="size-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                          <Flame className="size-6" />
                        </div>
                        <div className="space-y-1.5">
                          <Badge variant="primarySoft" className="text-[10px]">Refleksi Pemuridan</Badge>
                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            Mengapa pemuridan harus hidup di tengah misi?
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas internal.
                          </p>
                        </div>
                      </div>
                    </Link>

                    <Link href="/artikel" className="block group">
                      <div className="rounded-2xl bg-white p-6 shadow-warm-xs hover:shadow-warm-sm border border-stone-200/90 hover:border-primary/40 transition-all flex gap-4 items-start">
                        <div className="size-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                          <MapPin className="size-6" />
                        </div>
                        <div className="space-y-1.5">
                          <Badge variant="amber" className="text-[10px]">Kabar Ladang</Badge>
                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            Melihat api perintisan kembali menyala di Kota Rempah
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            Catatan perjalanan tim pelayan ESM saat menyusuri persekutuan mahasiswa di Maluku Utara.
                          </p>
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>

              {/* Right Column: Interactive Mezbah Doa Card & Free Module Pill */}
              <div className="lg:col-span-5 space-y-4">
                {/* Mezbah Doa Card */}
                <div className="rounded-2xl bg-[#280609] text-white p-6 sm:p-7 shadow-warm-md border border-[#3E0A10] space-y-5 relative overflow-hidden">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
                        Mezbah Doa Bulan Ini
                      </span>
                      <span className="text-[11px] text-white/60">Banten & Ternate</span>
                    </div>
                    <h4 className="text-base font-bold text-white leading-snug">
                      Perintisan Kelompok Siswa & Asrama Mahasiswa
                    </h4>
                    <p className="text-xs text-white/75 leading-relaxed">
                      Mari dukung dalam doa bagi adik-adik pengurus siswa di Banten dan mahasiswa perantauan di Ternate agar setia berakar dalam firman Tuhan.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-amber-200/90 font-medium">
                      {prayerCount} orang mendoakan
                    </span>
                    <button
                      onClick={() => {
                        setHasPrayed((prev) => !prev);
                        setPrayerCount((c) => (hasPrayed ? c - 1 : c + 1));
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        hasPrayed
                          ? "bg-amber-400 text-[#180306] scale-105"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart className={`size-3.5 ${hasPrayed ? "fill-current text-[#180306]" : ""}`} />
                      <span>{hasPrayed ? "Didoakan" : "Mendoakan"}</span>
                    </button>
                  </div>
                </div>

                {/* Free Resource Pill */}
                <div className="rounded-2xl bg-white p-5 border border-stone-200/90 shadow-warm-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold shrink-0">
                      <BookOpen className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">Modul PA & Saat Teduh Gratis</p>
                      <p className="text-[11px] text-stone-500">Unduh materi pembinaan untuk kelompokmu</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-bold border-stone-300 shrink-0">
                    <Link href="/sumber-daya">
                      <span>Buka Modul</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            7. TESTIMONI (Distinct Sand/Stone Editorial Section - Tegas & Elegan)
            Warm, human story closing the page before footer
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-[#F3ECE4] border-t border-stone-300/80 relative">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-warm-xs border border-stone-200/90 text-center space-y-5">
              <span className="font-serif text-3xl font-bold text-accent">&ldquo;</span>
              <p className="font-serif italic text-lg sm:text-xl text-foreground/90 leading-relaxed font-normal max-w-2xl mx-auto -mt-3">
                Melalui kelompok pemuridan di ESM, aku belajar bahwa mengikut Yesus bukan cuma soal apa yang kita bicarakan di ruang tertutup, melainkan bagaimana kita hadir di sekolah dan kampus, berani hidup berintegritas, dan mengasihi sesama.
              </p>
              <div className="space-y-0.5 pt-2">
                <p className="font-sans font-bold text-sm text-foreground">Andreas Pratama</p>
                <p className="text-xs text-stone-500">Siswa SMA • Komunitas Explore Banten</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
