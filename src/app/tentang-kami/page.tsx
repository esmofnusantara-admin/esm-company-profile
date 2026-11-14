"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/common/PageHero";
import {
  Compass,
  Flame,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Users2,
  Phone,
  BookOpen,
  Sparkles,
  Crown,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Download,
  Scroll,
  ArrowRight,
  Quote,
  FileText,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { AboutLegalOrg, defaultLegalOrg } from "@/lib/legalOrgConfig";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

export default function TentangKamiPage() {
  const { t, locale } = useLanguage();
  const p = t.aboutPage;

  const [aboutData, setAboutData] = React.useState<any>(null);
  const [expandedFaithVerses, setExpandedFaithVerses] = React.useState<Record<string, boolean>>({});

  const toggleFaithVerse = (id: string) => {
    setExpandedFaithVerses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  React.useEffect(() => {
    fetch("/api/content?section=about")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setAboutData(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const history = aboutData?.history;
  const visionMission = aboutData?.visionMission;
  const regions = aboutData?.regions;
  const team = aboutData?.team;
  const legalOrg: AboutLegalOrg = aboutData?.legalOrg || defaultLegalOrg;

  // History text
  const historyTitle = history
    ? locale === "en"
      ? history.titleEn || history.titleId
      : history.titleId
    : p.historyTitle;

  const historyStory = history
    ? locale === "en"
      ? history.storyEn || history.storyId
      : history.storyId
    : null;

  // Vision text
  const visionStatement = visionMission
    ? locale === "en"
      ? visionMission.visionEn || visionMission.visionId
      : visionMission.visionId
    : p.visionCardDesc;

  // Banten text
  const bantenTitle = regions
    ? locale === "en"
      ? regions.bantenTitleEn || regions.bantenTitleId
      : regions.bantenTitleId
    : p.region1Title;

  const bantenDesc = regions
    ? locale === "en"
      ? regions.bantenDescEn || regions.bantenDescId
      : regions.bantenDescId
    : p.region1Desc;

  // Ternate text
  const ternateTitle = regions
    ? locale === "en"
      ? regions.ternateTitleEn || regions.ternateTitleId
      : regions.ternateTitleId
    : p.region2Title;

  const ternateDesc = regions
    ? locale === "en"
      ? regions.ternateDescEn || regions.ternateDescId
      : regions.ternateDescId
    : p.region2Desc;

  // Swipeable Team Carousel State & Touch Handlers
  const [teamIndex, setTeamIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setItemsPerPage(1);
        } else if (window.innerWidth < 1024) {
          setItemsPerPage(2);
        } else {
          setItemsPerPage(3);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const defaultTeam = [
    {
      id: "team-1",
      name: "Pdt. Daniel S. Th., M.Min.",
      role: "Koordinator Wilayah Banten",
      roleEn: "Banten Regional Coordinator",
      community: "ALL",
      bio: "Melayani pembinaan kelompok kecil dan perintisan pelayanan mahasiswa di Serang dan Tangerang sejak 2012.",
      bioEn: "Serving small group discipleship and campus ministry pioneering across Serang and Tangerang since 2012.",
      whatsapp: "6281296106611",
    },
    {
      id: "team-2",
      name: "Grace Hutapea, S.Psi.",
      role: "Pembina Explore Community (Siswa)",
      roleEn: "Explore Community Mentor (High School)",
      community: "EXPLORE",
      bio: "Mendampingi konseling pribadi dan retret kepemimpinan siswa SMP & SMA se-Banten.",
      bioEn: "Mentoring personal counseling and leadership camps for junior & senior high school students in Banten.",
      whatsapp: "6281296106611",
    },
    {
      id: "team-3",
      name: "Markus Maluku, S.Kel.",
      role: "Perintis Pelayanan Ternate",
      roleEn: "Ternate Ministry Pioneer",
      community: "ENCOUNTER",
      bio: "Mengkoordinasi kelompok pemuridan mahasiswa kepulauan dan jejaring alumni di Maluku Utara.",
      bioEn: "Coordinating island student discipleship groups and alumni network in North Maluku.",
      whatsapp: "6281296106611",
    },
    {
      id: "team-4",
      name: "Yosua Pratama, S.Kom.",
      role: "Pembina Encounter Mahasiswa Kampus",
      roleEn: "Encounter Campus Ministry Leader",
      community: "ENCOUNTER",
      bio: "Memfasilitasi pembentukan kelompok KTB mahasiswa baru dan mentoring kepemimpinan di perguruan tinggi negeri Banten.",
      bioEn: "Facilitating freshman discipleship small groups and leadership mentoring across state universities in Banten.",
      whatsapp: "6281296106611",
    },
    {
      id: "team-5",
      name: "dr. Stephanie Chandra",
      role: "Koordinator Alumni & Profesi (Connect)",
      roleEn: "Alumni & Professional Coordinator",
      community: "CONNECT",
      bio: "Mendorong persekutuan profesional muda dan dokter Kristen untuk mengintegrasikan iman di dunia kerja sekuler.",
      bioEn: "Empowering young professionals and Christian healthcare workers to integrate faith in secular workplaces.",
      whatsapp: "6281296106611",
    },
    {
      id: "team-6",
      name: "Ruth Simanjuntak, S.E.",
      role: "Penatalayanan Finansial & Administrasi",
      roleEn: "Financial Stewardship & Operations",
      community: "ALL",
      bio: "Mengelola akuntabilitas dana kemitraan, pelaporan donasi bulanan, dan koordinasi logistik retret gerakan.",
      bioEn: "Managing ministry partnership accountability, monthly donation reporting, and retreat logistics coordination.",
      whatsapp: "6281296106611",
    },
  ];

  const teamList = React.useMemo(() => {
    if (team && Array.isArray(team) && team.length > 0) {
      return team;
    }
    return defaultTeam;
  }, [team]);

  const maxTeamIndex = Math.max(0, teamList.length - itemsPerPage);

  const onTeamTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchDeltaX(0);
  };
  const onTeamTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchDeltaX(e.targetTouches[0].clientX - touchStartX);
  };
  const onTeamTouchEnd = () => {
    if (touchDeltaX < -40) {
      setTeamIndex((prev) => Math.min(prev + 1, maxTeamIndex));
    } else if (touchDeltaX > 40) {
      setTeamIndex((prev) => Math.max(prev - 1, 0));
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const onTeamMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setTouchDeltaX(0);
  };
  const onTeamMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) return;
    setTouchDeltaX(e.clientX - touchStartX);
  };
  const onTeamMouseUp = () => {
    if (!isDragging) return;
    if (touchDeltaX < -40) {
      setTeamIndex((prev) => Math.min(prev + 1, maxTeamIndex));
    } else if (touchDeltaX > 40) {
      setTeamIndex((prev) => Math.max(prev - 1, 0));
    }
    setIsDragging(false);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ============================================================
            1. BESPOKE CHAPTER HERO (Living Ministry Odyssey)
            Atmospheric Photo Hero + 4 Interactive Chapter Cards (Menggambarkan Isi Page)
            ============================================================ */}
        <section className="relative min-h-[520px] sm:min-h-[580px] flex items-center justify-center text-white overflow-hidden pb-14 sm:pb-20">
          {/* Background Image: Student Pioneers Fellowship */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/hero/kemitraan_hero.jpg"
              alt="Persekutuan dan Perjalanan Gerakan ESM Indonesia"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Cinematic Multi-Stop Deep Garnet Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140204] via-[#24060A]/90 to-[#140204]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140204]/60 to-[#140204]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <Scroll className="size-3.5 text-amber-300" />
              <span>{p.heroBadge || "Mengenal Gerakan ESM Indonesia"}</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-300 font-semibold">Sejak 2012</span>
            </div>

            {/* Master Headline */}
            <div className="space-y-3 max-w-4xl mx-auto">
              <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Lahir dari Sebuah Kegelisahan,{" "}
                <span className="font-serif italic font-normal text-amber-200">
                  Mengalir Menjadi Gerakan Murid
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-amber-100/90 leading-relaxed font-serif italic">
                &ldquo;{p.heroQuote || "Bukan sekadar menghasilkan orang yang tahu banyak tentang iman, melainkan murid yang hadir, peduli, dan mengambil bagian dalam karya Allah di tempat ia berada."}&rdquo;
              </p>
            </div>

            {/* 5 Interactive Chapter Cards (MENGGAMBARKAN ISI SELURUH HALAMAN) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
              {[
                {
                  id: "sejarah",
                  numeral: "BAGIAN 1",
                  title: "Kisah & Panggilan",
                  subtitle: "Awal Mula Gerakan (2012)",
                  desc: "Kisah perintisan pembinaan siswa & mahasiswa di Banten dan Ternate.",
                  icon: BookOpen,
                  iconBg: "bg-amber-500/20 text-amber-300 border-amber-400/30",
                  href: "#sejarah",
                },
                {
                  id: "visi-misi",
                  numeral: "BAGIAN 2",
                  title: "Visi & 3 Misi",
                  subtitle: "Arah & Strategi Inkarnasional",
                  desc: "Hadir secara nyata, Memuridkan karakter, dan Mengutus bagi bangsa.",
                  icon: Compass,
                  iconBg: "bg-rose-500/20 text-rose-300 border-rose-400/30",
                  href: "#visi-misi",
                },
                {
                  id: "dasar-iman",
                  numeral: "BAGIAN 3",
                  title: "Mission of Faith",
                  subtitle: "Pondasi Teologis & Credo",
                  desc: "Setia pada Alkitab, Tritunggal, Kristus, dan Mandat Agung Injil.",
                  icon: ShieldCheck,
                  iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
                  href: "#dasar-iman",
                },
                {
                  id: "wilayah",
                  numeral: "BAGIAN 4",
                  title: "Ladang Wilayah",
                  subtitle: "Banten & Ternate",
                  desc: "Pelayanan di Tanah Jawara & Kota Rempah.",
                  icon: MapPin,
                  iconBg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
                  href: "#wilayah",
                },
                {
                  id: "mitra-legalitas",
                  numeral: "BAGIAN 5",
                  title: "Mitra & Legalitas",
                  subtitle: "Naungan Yayasan MMB",
                  desc: "Akuntabilitas hukum, integritas tata kelola, dan struktur organisasi.",
                  icon: Building2,
                  iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/30",
                  href: "#mitra-legalitas",
                },
              ].map((chapter) => {
                const Icon = chapter.icon;
                return (
                  <a
                    key={chapter.id}
                    href={chapter.href}
                    className="group rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-md border border-white/15 hover:border-amber-400/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-3 cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={cn("size-8 rounded-xl flex items-center justify-center border", chapter.iconBg)}>
                          <Icon className="size-3.5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300/80">
                          {chapter.numeral}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="font-sans text-sm font-bold text-white group-hover:text-amber-200 transition-colors flex items-center justify-between">
                          <span>{chapter.title}</span>
                          <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-amber-300" />
                        </h4>
                        <p className="text-[10px] font-semibold text-amber-200/90">
                          {chapter.subtitle}
                        </p>
                      </div>

                      <p className="text-[11px] text-stone-300 leading-relaxed font-normal line-clamp-2">
                        {chapter.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-amber-300/90 group-hover:text-amber-200">
                      <span>Jelajahi Bagian Ini</span>
                      <span>↓</span>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Quick Action Navigation Buttons (High-Contrast Guaranteed) */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-md bg-amber-400 hover:bg-amber-300 text-stone-950 font-sans border-2 border-amber-400">
                <a href="#sejarah" className="flex items-center gap-2">
                  <span>Baca Sejarah Gerakan</span>
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-2 border-white/70 bg-white/15 text-white hover:bg-white/30 backdrop-blur-md shadow-sm">
                <a href="#tim" className="flex items-center gap-2">
                  <Users2 className="size-4 mr-1 text-amber-300" />
                  <span>Lihat Tim Pengurus & Staf</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Sejarah & Panggilan Awal */}
        <section id="sejarah" className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.historyKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {historyTitle}
              </h2>
            </div>

            <div className="space-y-5 text-base text-foreground/80 leading-relaxed">
              {historyStory ? (
                <p className="whitespace-pre-line">{historyStory}</p>
              ) : (
                <>
                  <p>{p.historyP1}</p>
                  <p>{p.historyP2}</p>
                  <p>{p.historyP3}</p>
                </>
              )}
            </div>

            {history?.mediaUrl && (
              <div className="rounded-2xl overflow-hidden border border-border shadow-warm-sm aspect-video relative mt-6">
                {history.mediaUrl.endsWith(".mp4") ? (
                  <video src={history.mediaUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <Image src={history.mediaUrl} alt="Dokumentasi Sejarah" fill className="object-cover" />
                )}
              </div>
            )}

            {/* CTA: Baca Sejarah Lengkap di Artikel Gerakan */}
            <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-border/80">
              <Button asChild className="rounded-full px-6 text-xs font-bold shadow-warm-xs bg-primary hover:bg-primary/90 text-white">
                <Link href="/artikel" className="flex items-center gap-2">
                  <FileText className="size-3.5" />
                  <span>Baca Kisah & Sejarah Lengkap di Artikel</span>
                  <ArrowRight className="size-3.5 ml-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Visi & Misi */}
        <section id="visi-misi" className="py-20 bg-card border-y border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.visionKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">{p.visionTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Visi */}
              <Card className="p-8 border-primary/30 bg-primary-50/30 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold">
                    <Compass className="size-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground">{p.visionCardTitle}</h3>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {visionStatement}
                  </p>
                </div>
              </Card>

              {/* Misi */}
              <Card className="p-8 border-border bg-card flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="size-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center font-bold">
                    <Flame className="size-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground">{p.missionCardTitle}</h3>
                  <ul className="space-y-3 text-sm text-foreground/80">
                    {visionMission && Array.isArray(visionMission.missionListId) ? (
                      visionMission.missionListId.map((mItem: string, idx: number) => {
                        const text =
                          locale === "en" && visionMission.missionListEn?.[idx]
                            ? visionMission.missionListEn[idx]
                            : mItem;
                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                            <span>{text}</span>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                          <span><strong>{p.missionItem1Title}</strong> {p.missionItem1Desc}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                          <span><strong>{p.missionItem2Title}</strong> {p.missionItem2Desc}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                          <span><strong>{p.missionItem3Title}</strong> {p.missionItem3Desc}</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* PENGAKUAN IMAN / STATEMENT OF FAITH (Bespoke Sacred Monumental Credo Sanctum) */}
        <section id="dasar-iman" className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#140204] via-[#24060A] to-[#120204] text-white">
          {/* Ambient Lighting & Geometric Sacred Lattice */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-primary/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header with Sacred Credo Banner */}
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-sm">
                <Scroll className="size-3.5 text-amber-400" />
                <span>{p.faithBadge || "Pondasi Teologis & Credo Historis"}</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Pernyataan Misi Iman{" "}
                <span className="font-serif italic font-normal text-amber-200">
                  (Mission of Faith)
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300/90 leading-relaxed font-normal max-w-2xl mx-auto">
                {p.faithSubtitle}
              </p>

              {/* 3 Theological Foundations Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-amber-200/90 font-medium">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  <span>Sola Scriptura & Doktrin Reformasi</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <CheckCircle2 className="size-3.5 text-amber-400" />
                  <span>The Lausanne Covenant (1974)</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="size-3.5 text-blue-400" />
                  <span>Pengakuan Iman Rasuli Historis</span>
                </span>
              </div>
            </div>

            {/* 4 Majestic Monumental Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  id: "otoritas-alkitab",
                  numeral: "01",
                  latinTerm: "Sola Scriptura",
                  title: p.faith1Title,
                  description: p.faith1Desc,
                  icon: BookOpen,
                  iconBg: "bg-amber-500/20 border-amber-400/40 text-amber-300",
                  iconColor: "text-amber-300",
                  scriptureRef: "2 Timotius 3:16-17; Mazmur 119:105",
                  scriptureText:
                    "Segala tulisan yang diilhamkan Allah memang bermanfaat untuk mengajar, menyatakan kesalahan, memperbaiki kelakuan dan mendidik orang dalam kebenaran. Dengan demikian tiap-tiap manusia kepunyaan Allah diperlengkapi untuk setiap perbuatan baik.",
                  pillarRole: "Otoritas Tertinggi Iman & Hidup",
                },
                {
                  id: "allah-tritunggal",
                  numeral: "02",
                  latinTerm: "Solus Deus",
                  title: p.faith2Title,
                  description: p.faith2Desc,
                  icon: Sparkles,
                  iconBg: "bg-indigo-500/20 border-indigo-400/40 text-indigo-300",
                  iconColor: "text-indigo-300",
                  scriptureRef: "Ulangan 6:4; Matius 28:19",
                  scriptureText:
                    "Dengarlah, hai orang Israel: TUHAN itu Allah kita, TUHAN itu esa!... Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama Bapa dan Anak dan Roh Kudus.",
                  pillarRole: "Pusat Penyembahan Gerakan",
                },
                {
                  id: "tuhan-yesus",
                  numeral: "03",
                  latinTerm: "Solus Christus",
                  title: p.faith3Title,
                  description: p.faith3Desc,
                  icon: Crown,
                  iconBg: "bg-rose-500/20 border-rose-400/40 text-rose-300",
                  iconColor: "text-rose-300",
                  scriptureRef: "Yohanes 1:1, 14; 1 Korintus 15:3-4",
                  scriptureText:
                    "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah... Firman itu telah menjadi manusia, dan diam di antara kita... bahwa Kristus telah mati karena dosa-dosa kita, bahwa Ia telah dikuburkan, dan bahwa Ia telah dibangkitkan pada hari yang ketiga.",
                  pillarRole: "Juruselamat & Kepala Gerakan",
                },
                {
                  id: "mandat-agung",
                  numeral: "04",
                  latinTerm: "Missio Dei",
                  title: p.faith4Title,
                  description: p.faith4Desc,
                  icon: Compass,
                  iconBg: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
                  iconColor: "text-emerald-300",
                  scriptureRef: "Matius 28:18-20; 2 Timotius 2:2",
                  scriptureText:
                    "Kepadaku telah diberikan segala kuasa di sorga dan di bumi. Karena itu pergilah, jadikanlah semua bangsa murid-Ku... Apa yang telah engkau dengar dari padaku di depan banyak saksi, percayakanlah itu kepada orang-orang yang dapat dipercayai, yang juga cakap mengajar orang lain.",
                  pillarRole: "Amanat Pemuridan Nusantara",
                },
              ].map((pillar) => {
                const isExpanded = !!expandedFaithVerses[pillar.id];
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="group relative rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-amber-400/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:bg-white/[0.07] flex flex-col justify-between"
                  >
                    {/* Watermark Numeral */}
                    <span className="absolute top-4 right-6 text-4xl sm:text-5xl font-serif font-black text-white/[0.06] select-none group-hover:text-amber-400/10 transition-colors pointer-events-none">
                      {pillar.numeral}
                    </span>

                    <div className="space-y-4">
                      {/* Icon & Sola Badge */}
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            "size-12 rounded-2xl flex items-center justify-center shadow-lg border",
                            pillar.iconBg
                          )}
                        >
                          <Icon className={cn("size-6", pillar.iconColor)} />
                        </div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                          {pillar.latinTerm}
                        </span>
                      </div>

                      {/* Title & Core Doctrine */}
                      <div className="space-y-1.5">
                        <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Scripture Reference Tag */}
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-stone-400 flex items-center gap-1.5">
                          <BookOpen className="size-3 text-amber-400" />
                          <span>Landasan Alkitab:</span>
                        </span>
                        <span className="text-xs font-bold text-amber-200 bg-black/40 px-2.5 py-0.5 rounded-md border border-white/10">
                          {pillar.scriptureRef}
                        </span>
                      </div>

                      {/* Expandable Scripture Passage Text */}
                      {isExpanded && (
                        <div className="mt-3 p-4 rounded-2xl bg-black/50 border-l-2 border-l-amber-400 border border-white/10 space-y-2 animate-in fade-in duration-200">
                          <p className="text-xs italic text-stone-200 leading-relaxed font-serif">
                            &ldquo;{pillar.scriptureText}&rdquo;
                          </p>
                          <span className="block text-[10px] font-bold text-amber-300">
                            — {pillar.scriptureRef}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action: Toggle Biblical Verse */}
                    <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleFaithVerse(pillar.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Tutup Landasan Firman" : "Lihat Teks Landasan Firman"}</span>
                        {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                      </button>

                      <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                        {pillar.pillarRole}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom High-Trust Historic Covenant Banner */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-sans text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>Komitmen Integritas Teologis & Doktrin Gerakan</span>
                </h4>
                <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                  Seluruh pengurus, staf pembina, dan mentor KTB ESM mengikatkan diri pada pengakuan iman ini untuk menjaga kemurnian Injil dan kepemimpinan yang berakar pada Kristus.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button
                  asChild
                  size="sm"
                  className="rounded-full px-5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-md font-sans border border-amber-400"
                >
                  <a href="/documents/mission-of-faith-esm.pdf" download="mission-of-faith-esm.pdf" className="flex items-center gap-1.5">
                    <Download className="size-3.5" />
                    <span>Unduh Dokumen Resmi (PDF)</span>
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full px-5 text-xs font-bold border-2 border-white/60 bg-white/15 text-white hover:bg-white/25"
                >
                  <Link href="/kemitraan#kontak">
                    <span>Tanya Teologis</span>
                    <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Wilayah Pelayanan (Banten & Ternate) */}
        <section id="wilayah" className="py-20 bg-card border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.regionsKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {p.regionsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Banten */}
              <Card className="p-6 space-y-4 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{bantenTitle}</h3>
                    <p className="text-xs text-muted-foreground">{p.region1Sub}</p>
                  </div>
                </div>
                {regions?.bantenImageUrl && (
                  <div className="rounded-xl overflow-hidden border border-border aspect-video relative">
                    <Image src={regions.bantenImageUrl} alt="Wilayah Banten" fill className="object-cover" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {bantenDesc}
                </p>
              </Card>

              {/* Ternate */}
              <Card className="p-6 space-y-4 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{ternateTitle}</h3>
                    <p className="text-xs text-muted-foreground">{p.region2Sub}</p>
                  </div>
                </div>
                {regions?.ternateImageUrl && (
                  <div className="rounded-xl overflow-hidden border border-border aspect-video relative">
                    <Image src={regions.ternateImageUrl} alt="Wilayah Maluku Utara" fill className="object-cover" />
                  </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ternateDesc}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. MITRA STRATEGIS, LEGALITAS & STRUKTUR ORGANISASI
            Naungan Hukum di Bawah Yayasan MMB (Murid Muda Bermisi) & Bagan Organisasi
            ============================================================ */}
        <section id="mitra-legalitas" className="py-20 bg-canvas border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary">
                <Building2 className="size-3.5" />
                <span>{locale === "en" ? (legalOrg.legalStatementBadgeEn || "Legal Statement & Compliance") : (legalOrg.legalStatementBadgeId || "Legalitas Gerakan & Naungan Hukum")}</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                {locale === "en"
                  ? `Institutional Partnership with ${legalOrg.foundationAbbr || "Yayasan MMB"}`
                  : `Hubungan Kemitraan dengan ${legalOrg.foundationAbbr || "Yayasan MMB"}`}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {locale === "en"
                  ? "Commitment to legal compliance, ecclesiastical accountability, and high integrity in next-generation mission stewardship."
                  : "Komitmen akuntabilitas hukum, integritas tata kelola organisasi, dan transparansi pelayanan misi di hadapan Allah dan sesama."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Legal Statement Card */}
              <div className="lg:col-span-6 rounded-3xl bg-white p-7 sm:p-9 border border-stone-200/90 shadow-warm-xs flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {locale === "en" ? (legalOrg.legalStatementBadgeEn || "Legal Statement") : (legalOrg.legalStatementBadgeId || "Pernyataan Hukum (Legal Statement)")}
                      </span>
                      <h3 className="font-sans text-xl font-bold text-foreground">
                        {locale === "en" ? (legalOrg.legalStatementTitleEn || "Legal Entity of Yayasan MMB") : (legalOrg.legalStatementTitleId || "Badan Hukum Yayasan MMB")}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                    {locale === "en" ? (
                      <>
                        The <strong>Evangelical Student Movement (ESM) Indonesia</strong> operates and partners institutionally under the official legal umbrella of <strong>{legalOrg.foundationName} ({legalOrg.foundationAbbr})</strong>.
                      </>
                    ) : (
                      <>
                        Gerakan <strong>Evangelical Student Movement (ESM) Indonesia</strong> bernaung dan bermitra secara institusional di bawah payung hukum resmi <strong>{legalOrg.foundationName} ({legalOrg.foundationAbbr})</strong>.
                      </>
                    )}
                  </p>

                  {/* Legal Credentials Banner (SK AHU & Kontak Sekretaris Yayasan) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        {locale === "en" ? "AHU Legal Decree:" : "SK AHU Kemenkumham:"}
                      </span>
                      <span className="font-mono font-bold text-stone-900 block text-[11px] sm:text-xs">
                        {legalOrg.skAhu || "AHU-0013520.AH.01.04.Tahun 2024"}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                        {locale === "en" ? "Foundation Secretary Contact:" : "Sekretaris Yayasan :"}
                      </span>
                      <MaskedWhatsAppLink
                        phone={legalOrg.secretaryPhone || "6281296106611"}
                        text="Halo Sekretaris Yayasan MMB"
                        variant="pill"
                        className="text-[11px] sm:text-xs text-primary font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-1 text-xs text-stone-600">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{locale === "en" ? legalOrg.point1TitleEn : legalOrg.point1TitleId}:</strong>{" "}
                        {locale === "en" ? legalOrg.point1DescEn : legalOrg.point1DescId}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{locale === "en" ? legalOrg.point2TitleEn : legalOrg.point2TitleId}:</strong>{" "}
                        {locale === "en" ? legalOrg.point2DescEn : legalOrg.point2DescId}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>{locale === "en" ? legalOrg.point3TitleEn : legalOrg.point3TitleId}:</strong>{" "}
                        {locale === "en" ? legalOrg.point3DescEn : legalOrg.point3DescId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600">
                  <span className="font-bold text-foreground block mb-0.5">
                    {locale === "en" ? legalOrg.integrityTitleEn : legalOrg.integrityTitleId}
                  </span>
                  {locale === "en" ? legalOrg.integrityDescEn : legalOrg.integrityDescId}
                </div>
              </div>

              {/* Right Column: Organizational Structure Diagram */}
              <div className="lg:col-span-6 rounded-3xl bg-white p-7 sm:p-9 border border-stone-200/90 shadow-warm-xs flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-primary-50 text-primary border border-primary/20 flex items-center justify-center font-bold">
                      <Users2 className="size-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {locale === "en" ? (legalOrg.chartBadgeEn || "Governance Structure") : (legalOrg.chartBadgeId || "Struktur Tata Kelola")}
                      </span>
                      <h3 className="font-sans text-xl font-bold text-foreground">
                        {locale === "en" ? (legalOrg.chartTitleEn || "Movement Organizational Chart") : (legalOrg.chartTitleId || "Bagan Organisasi Gerakan")}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {locale === "en" ? legalOrg.chartSubtitleEn : legalOrg.chartSubtitleId}
                  </p>
                </div>

                {/* Structured Hierarchy Tree */}
                <div className="space-y-2.5 pt-1 text-xs">
                  {/* Tier 1: Yayasan MMB */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300 text-center space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      {locale === "en" ? (legalOrg.tier1BadgeEn || "Level 1 • Legal Umbrella") : (legalOrg.tier1BadgeId || "Tingkat 1 • Naungan Hukum")}
                    </span>
                    <strong className="text-sm font-bold text-amber-950 block">
                      {legalOrg.foundationName} ({legalOrg.foundationAbbr})
                    </strong>
                    <div className="text-[11px] font-semibold text-stone-800 pt-0.5">
                      <span>{locale === "en" ? "Foundation Chairman:" : "Ketua Yayasan :"} </span>
                      <span className="font-bold text-primary underline">{legalOrg.foundationHead}</span>
                    </div>
                    <div className="text-[10px] text-stone-600 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 pt-0.5">
                      <span>SK AHU: <strong className="font-mono text-stone-800">{legalOrg.skAhu}</strong></span>
                      <span>•</span>
                      <span>{locale === "en" ? "Sec:" : "Sekretaris:"} <strong className="text-stone-800">{legalOrg.secretaryPhone}</strong></span>
                    </div>
                    <span className="text-[10px] text-stone-500 block">
                      {locale === "en" ? legalOrg.tier1SubEn : legalOrg.tier1SubId}
                    </span>
                  </div>

                  <div className="flex justify-center text-stone-400 font-bold text-xs -my-1">↓</div>

                  {/* Tier 2: Sekretaris Jenderal (Koordinator Nasional Gerakan ESM) */}
                  <div className="p-3.5 rounded-2xl bg-[#2D060B] text-white text-center shadow-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      {locale === "en" ? (legalOrg.tier2BadgeEn || "Level 2 • Secretary General (National Coordinator of ESM Movement)") : (legalOrg.tier2BadgeId || "Tingkat 2 • Sekretaris Jendral (Koordinator Nasional Gerakan ESM)")}
                    </span>
                    <strong className="text-sm font-bold text-white block">
                      {legalOrg.tier2LeaderName}
                    </strong>
                    <span className="text-[10px] text-stone-300 block">
                      {locale === "en" ? legalOrg.tier2RoleSubEn : legalOrg.tier2RoleSubId}
                    </span>
                  </div>

                  <div className="flex justify-center text-stone-400 font-bold text-xs -my-1">↓</div>

                  {/* Tier 3: Ladang Pelayanan Lapangan: Banten - Ternate (+ Connect) */}
                  <div className="grid grid-cols-2 gap-2 text-left text-[11px]">
                    <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary flex items-center gap-1">
                          <MapPin className="size-3 shrink-0" />
                          <span>{legalOrg.tier3BantenTitle}</span>
                        </span>
                        <Badge className="bg-red-100 text-primary border-primary/20 text-[9px] px-1 py-0">Banten</Badge>
                      </div>
                      <span className="text-[10px] text-stone-600 block leading-tight">
                        {locale === "en" ? legalOrg.tier3BantenDescEn : legalOrg.tier3BantenDescId}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-300 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 flex items-center gap-1">
                          <MapPin className="size-3 shrink-0" />
                          <span>{legalOrg.tier3TernateTitle}</span>
                        </span>
                        <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[9px] px-1 py-0">Ternate</Badge>
                      </div>
                      <span className="text-[10px] text-stone-600 block leading-tight">
                        {locale === "en" ? legalOrg.tier3TernateDescEn : legalOrg.tier3TernateDescId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center border-t border-stone-100">
                  <a href="#tim" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                    <span>{locale === "en" ? "Meet our leadership and team below" : "Kenali profil para pelayan di bawah ini"}</span>
                    <span>↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tim Pelayanan & Dewan Pengurus (Touch-Swipeable Carousel Slider) */}
        <section id="tim" className="py-20 bg-stone-50/70 border-t border-stone-200/90 relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header with Title and Carousel Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Users2 className="size-3.5" />
                  <span>{locale === "en" ? "LEADERSHIP & WORKERS" : "PENGURUS & STAF"}</span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
                  {locale === "en" ? "Meet Our Ministry Team" : "Tim Pelayanan & Pengurus ESM"}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-normal">
                  {locale === "en"
                    ? "Dedicated leaders and workers laboring across student and community ministries."
                    : "Hamba-hamba Tuhan yang mendedikasikan hidup untuk membina dan melayani generasi muda."}
                </p>
              </div>

              {/* Slider Chevrons & Page Counter */}
              {maxTeamIndex > 0 && (
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
                    Geser kartu atau gunakan tombol
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTeamIndex((prev) => Math.max(0, prev - 1))}
                      disabled={teamIndex === 0}
                      aria-label="Sebelumnya"
                      className="size-9 rounded-full bg-white border border-stone-200 shadow-2xs hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamIndex((prev) => Math.min(maxTeamIndex, prev + 1))}
                      disabled={teamIndex >= maxTeamIndex}
                      aria-label="Selanjutnya"
                      className="size-9 rounded-full bg-white border border-stone-200 shadow-2xs hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Swipeable Viewport */}
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing py-2 select-none"
              onTouchStart={onTeamTouchStart}
              onTouchMove={onTeamTouchMove}
              onTouchEnd={onTeamTouchEnd}
              onMouseDown={onTeamMouseDown}
              onMouseMove={onTeamMouseMove}
              onMouseUp={onTeamMouseUp}
              onMouseLeave={onTeamMouseUp}
            >
              <div
                className="flex transition-transform duration-500 ease-out -mx-3"
                style={{
                  transform: `translateX(-${(teamIndex * 100) / itemsPerPage}%)`,
                }}
              >
                {teamList.map((m: any, idx: number) => {
                  const role = locale === "en" ? m.roleEn || m.role : m.role;
                  const bio = locale === "en" ? m.bioEn || m.bio : m.bio;
                  const initials = m.name
                    ? m.name
                        .split(" ")
                        .filter((w: string) => !w.includes(".") && w.length > 1)
                        .slice(0, 2)
                        .map((w: string) => w.charAt(0))
                        .join("") || m.name.charAt(0)
                    : "E";

                  return (
                    <div
                      key={m.id || idx}
                      className="shrink-0 px-3 w-full sm:w-1/2 lg:w-1/3"
                    >
                      <Card className="p-6 sm:p-7 text-center rounded-3xl border border-stone-200/90 bg-white hover:border-primary/40 hover:shadow-warm-md transition-all flex flex-col justify-between h-full group">
                        <div className="space-y-4">
                          {/* Avatar Photo / Styled Gradient Initials */}
                          <div className="size-20 mx-auto rounded-full bg-gradient-to-br from-[#2D060B] via-[#4A0D15] to-[#1E0407] text-amber-200 border-2 border-primary/20 shadow-md flex items-center justify-center font-bold text-xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            {m.photo ? (
                              <Image src={m.photo} alt={m.name} fill className="object-cover" />
                            ) : (
                              <span className="tracking-widest font-sans font-black">{initials}</span>
                            )}
                          </div>

                          {/* Name & Role */}
                          <div className="space-y-1.5">
                            <h4 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                              {m.name}
                            </h4>
                            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20">
                              {role}
                            </span>
                          </div>

                          {/* Bio */}
                          {bio && (
                            <p className="text-xs text-stone-600 leading-relaxed font-normal">
                              {bio}
                            </p>
                          )}
                        </div>

                        {/* Contact Action */}
                        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-center">
                          {m.whatsapp ? (
                            <MaskedWhatsAppLink
                              phone={m.whatsapp}
                              text={`Shalom ${m.name}, saya ingin berkonsultasi mengenai pelayanan ESM.`}
                              variant="button"
                              className="text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                              label="WA"
                            />
                          ) : (
                            <span className="text-[11px] text-stone-400 font-medium">
                              Pelayan Gerakan ESM
                            </span>
                          )}
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Swipe Hint & Dot Indicators */}
            {maxTeamIndex > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-stone-400 flex items-center gap-1.5">
                  <span>💡 Tip:</span>
                  <span>Sentuh dan geser kartu ke kiri/kanan pada layar sentuh</span>
                </span>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: maxTeamIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTeamIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                        teamIndex === idx
                          ? "w-7 bg-[#2D060B]"
                          : "w-2 bg-stone-300 hover:bg-stone-400"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
