"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Briefcase,
  Flame,
  Users,
  Target,
  Sparkles,
  Heart,
  Calendar,
  ChevronRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ============================================================
            1. HERO SECTION (Warm Dignified Dark Mesh, Bukan Merah Pekat)
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Headline & Action */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-accent">
                  <Sparkles className="size-3.5" />
                  <span>{t.hero.kicker}</span>
                </div>

                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.12]">
                  {t.hero.titleLine1} <br />
                  <span className="text-accent font-serif italic font-normal">{t.hero.titleLine2}</span>
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
                  {t.hero.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild size="lg" className="rounded-xl shadow-warm-md">
                    <Link href="/pelayanan">
                      <span>{t.hero.ctaPrimary}</span>
                      <ArrowRight className="size-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outlineWhite" className="rounded-xl">
                    <Link href="/tentang-kami">
                      <span>{t.hero.ctaSecondary}</span>
                    </Link>
                  </Button>
                </div>

                {/* Regional Presence Badges */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-accent" />
                    <span>{t.hero.regionBanten}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-accent" />
                    <span>{t.hero.regionTernate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-accent" />
                    <span>{t.hero.communityList}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Highlight Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                        <Flame className="size-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.hero.cardTitle}</h4>
                        <p className="text-xs text-white/60">{t.hero.cardSubtitle}</p>
                      </div>
                    </div>
                    <Badge variant="amber" className="text-[10px]">{t.hero.cardBadge}</Badge>
                  </div>

                  {/* 3 Pillars Compact Cards */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5 hover:border-white/20 transition-colors">
                      <div className="size-8 rounded-lg bg-primary/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                        <Compass className="size-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{t.hero.cardExplore}</span>
                        <span className="text-[11px] text-white/70 leading-snug block">
                          {t.hero.cardExploreDesc}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5 hover:border-white/20 transition-colors">
                      <div className="size-8 rounded-lg bg-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <GraduationCap className="size-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{t.hero.cardEncounter}</span>
                        <span className="text-[11px] text-white/70 leading-snug block">
                          {t.hero.cardEncounterDesc}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5 border border-white/5 hover:border-white/20 transition-colors">
                      <div className="size-8 rounded-lg bg-primary/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                        <Briefcase className="size-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{t.hero.cardConnect}</span>
                        <span className="text-[11px] text-white/70 leading-snug block">
                          {t.hero.cardConnectDesc}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button asChild variant="white" className="w-full justify-center rounded-xl text-xs font-bold">
                      <Link href="/kemitraan">
                        <span>{t.hero.cardCta}</span>
                        <ArrowRight className="size-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. MENGAPA ESM HADIR? (Editorial 2-Kolom Seimbang)
            ============================================================ */}
        <section className="py-20 md:py-28 bg-canvas">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
              {/* Left: Narrative Philosophy */}
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {t.whyEsm.kicker}
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  {t.whyEsm.headlineStart}
                  <span className="text-primary underline decoration-accent decoration-2 underline-offset-4">
                    {t.whyEsm.discipleship}
                  </span>
                  {t.whyEsm.and}
                  <span className="text-primary underline decoration-accent decoration-2 underline-offset-4">
                    {t.whyEsm.mission}
                  </span>
                  {t.whyEsm.headlineEnd}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t.whyEsm.description}
                </p>
                <div className="pt-2">
                  <Button asChild variant="link" className="px-0 font-bold text-primary group">
                    <Link href="/tentang-kami#sejarah" className="flex items-center gap-1.5">
                      <span>{t.whyEsm.historyLink}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: 3 Value Proposition Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Card className="hover:border-primary/40 transition-colors shadow-warm-sm">
                  <CardHeader className="p-5 pb-3">
                    <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3">
                      <Flame className="size-5" />
                    </div>
                    <CardTitle className="text-base">{t.whyEsm.card1Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.whyEsm.card1Desc}
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/40 transition-colors shadow-warm-sm">
                  <CardHeader className="p-5 pb-3">
                    <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center mb-3">
                      <Target className="size-5" />
                    </div>
                    <CardTitle className="text-base">{t.whyEsm.card2Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.whyEsm.card2Desc}
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:border-primary/40 transition-colors shadow-warm-sm">
                  <CardHeader className="p-5 pb-3">
                    <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-3">
                      <Users className="size-5" />
                    </div>
                    <CardTitle className="text-base">{t.whyEsm.card3Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.whyEsm.card3Desc}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. METRIK DAMPAK & TRANSPARANSI
            ============================================================ */}
        <section className="py-14 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-primary">{t.impact.stat1Number}</span>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.impact.stat1Title}
                </p>
                <p className="text-[11px] text-muted-foreground/80">{t.impact.stat1Desc}</p>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-accent">{t.impact.stat2Number}</span>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.impact.stat2Title}
                </p>
                <p className="text-[11px] text-muted-foreground/80">{t.impact.stat2Desc}</p>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-primary">{t.impact.stat3Number}</span>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.impact.stat3Title}
                </p>
                <p className="text-[11px] text-muted-foreground/80">{t.impact.stat3Desc}</p>
              </div>

              <div className="space-y-1">
                <span className="font-sans text-3xl sm:text-4xl font-extrabold text-accent">{t.impact.stat4Number}</span>
                <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.impact.stat4Title}
                </p>
                <p className="text-[11px] text-muted-foreground/80">{t.impact.stat4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TIGA LADANG PELAYANAN (Explore, Encounter, Connect)
            ============================================================ */}
        <section className="py-20 md:py-28 bg-canvas">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <Badge variant="primarySoft">{t.communities.kicker}</Badge>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {t.communities.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.communities.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Explore */}
              <Card className="flex flex-col justify-between hover:shadow-warm-md hover:border-primary/50 transition-all">
                <CardHeader className="space-y-3">
                  <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center">
                    <Compass className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Explore Community</span>
                    <CardTitle className="text-2xl mt-1">{t.communities.exploreTitle}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {t.communities.exploreDesc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-primary font-bold">
                    <Link href="/pelayanan/explore" className="flex items-center gap-1">
                      <span>{t.communities.exploreLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Encounter */}
              <Card className="flex flex-col justify-between hover:shadow-warm-md hover:border-accent/60 transition-all border-accent/30 bg-card">
                <CardHeader className="space-y-3">
                  <div className="size-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center">
                    <GraduationCap className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Encounter Community</span>
                    <CardTitle className="text-2xl mt-1">{t.communities.encounterTitle}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {t.communities.encounterDesc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-accent font-bold">
                    <Link href="/pelayanan/encounter" className="flex items-center gap-1">
                      <span>{t.communities.encounterLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Connect */}
              <Card className="flex flex-col justify-between hover:shadow-warm-md hover:border-primary/50 transition-all">
                <CardHeader className="space-y-3">
                  <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center">
                    <Briefcase className="size-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Connect Community</span>
                    <CardTitle className="text-2xl mt-1">{t.communities.connectTitle}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {t.communities.connectDesc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-primary font-bold">
                    <Link href="/pelayanan/connect" className="flex items-center gap-1">
                      <span>{t.communities.connectLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. ARTIKEL & AGENDA BENTO GRID
            ============================================================ */}
        <section className="py-20 bg-card border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t.newsAndEvents.kicker}</span>
                <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
                  {t.newsAndEvents.title}
                </h2>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/mobilisasi">
                  <span>{t.newsAndEvents.viewCalendar}</span>
                  <ArrowRight className="size-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 2 Featured Articles */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="p-6 hover:border-primary/40 transition-colors shadow-warm-sm group cursor-pointer">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="size-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <Flame className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="primarySoft">Refleksi Pemuridan</Badge>
                        <span className="text-xs text-muted-foreground">5 min read</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        Mengapa pemuridan harus hidup di tengah misi?
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas internal.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:border-accent/40 transition-colors shadow-warm-sm group cursor-pointer">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="size-14 rounded-2xl bg-accent-50 text-accent flex items-center justify-center shrink-0">
                      <MapPin className="size-7" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="amber">Kabar Ladang</Badge>
                        <span className="text-xs text-muted-foreground">Banten & Ternate</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        Melihat api perintisan kembali menyala di Kota Rempah
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Catatan perjalanan tim pelayan ESM saat menyusuri persekutuan mahasiswa di Maluku Utara.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Mini Agenda Schedule Card */}
              <div className="lg:col-span-5">
                <Card className="p-6 border-border bg-canvas-subtle shadow-warm-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-primary" />
                      <h4 className="font-bold text-sm text-foreground">{t.newsAndEvents.calendarMonth}</h4>
                    </div>
                    <Badge variant="outline" className="text-[11px]">2026</Badge>
                  </div>

                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3.5 p-3 rounded-xl bg-card border border-border">
                      <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-primary text-white shrink-0 font-bold">
                        <span className="text-[10px] uppercase tracking-wider">Agt</span>
                        <span className="text-base leading-none">23</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-foreground block">Annual Movement Prayer</span>
                        <span className="text-[11px] text-muted-foreground block">Doa serentak lintas komunitas (Online Zoom)</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-xl bg-card border border-border">
                      <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-accent text-accent-foreground shrink-0 font-bold">
                        <span className="text-[10px] uppercase tracking-wider">Sep</span>
                        <span className="text-base leading-none">06</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-foreground block">Hari Mitra & Sahabat ESM</span>
                        <span className="text-[11px] text-muted-foreground block">Temu keakraban & warta perkembangan misi (Serang)</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild variant="default" className="w-full justify-center rounded-xl text-xs font-bold">
                    <Link href="/mobilisasi">
                      <span>{t.newsAndEvents.viewCalendar}</span>
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. TESTIMONI (Warm Quote Card)
            ============================================================ */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card to-canvas-subtle p-8 md:p-12 shadow-warm-md text-center space-y-6">
              <div className="size-12 mx-auto rounded-full bg-accent/15 text-accent flex items-center justify-center font-serif text-2xl font-bold">
                &ldquo;
              </div>
              <blockquote className="font-serif italic text-xl md:text-2xl text-foreground/90 leading-relaxed font-normal">
                &ldquo;Melalui kelompok pemuridan di ESM, aku belajar bahwa mengikut Yesus bukan cuma soal apa yang aku percaya di dalam gereja, tetapi bagaimana aku hadir di sekolah, menghargai sesama, dan berani bersaksi dengan hidup nyata.&rdquo;
              </blockquote>
              <div className="space-y-0.5">
                <p className="font-sans font-bold text-foreground">Andreas Pratama</p>
                <p className="text-xs text-muted-foreground">Siswa SMA • Komunitas Explore Banten</p>
              </div>
            </Card>
          </div>
        </section>

        {/* ============================================================
            7. FAQ (Focused Max-w-3xl)
            ============================================================ */}
        <section className="py-20 bg-card border-t border-border">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{t.faq.kicker}</span>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-foreground">
                {t.faq.title}
              </h2>
            </div>

            <div className="space-y-4">
              <Card className="p-5">
                <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{t.faq.q1}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  {t.faq.a1}
                </p>
              </Card>

              <Card className="p-5">
                <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{t.faq.q2}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  {t.faq.a2}
                </p>
              </Card>

              <Card className="p-5">
                <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{t.faq.q3}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                  {t.faq.a3}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            8. CTA KEMITRAAN & DUKUNG MISI
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {t.ctaFooter.kicker}
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t.ctaFooter.title}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/80 leading-relaxed">
              {t.ctaFooter.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-xl shadow-warm-md">
                <Link href="/kemitraan">
                  <span>{t.ctaFooter.supportBtn}</span>
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outlineWhite" className="rounded-xl">
                <Link href="/kemitraan#doa">
                  <Heart className="size-4 mr-1 text-accent" />
                  <span>{t.ctaFooter.prayerBtn}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
