"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
  Play,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [featuredArticles, setFeaturedArticles] = React.useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState<any[]>([]);
  const [homeContent, setHomeContent] = React.useState<any>(null);

  React.useEffect(() => {
    // 1. Fetch Featured Articles
    fetch("/api/articles?limit=2&status=PUBLISHED")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFeaturedArticles(data.data);
        }
      })
      .catch(() => {});

    // 2. Fetch Upcoming Events
    fetch("/api/events?limit=2&status=PUBLISHED")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setUpcomingEvents(data.data);
        }
      })
      .catch(() => {});

    // 3. Fetch Dynamic CMS Content for Home
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
  const values = homeContent?.values;
  const stats = homeContent?.stats;
  const testimonies = homeContent?.testimonies;
  const faqs = homeContent?.faqs;

  // Hero Display Text
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

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ============================================================
            1. HERO SECTION (Warm Dignified Dark Mesh, Bukan Merah Pekat)
            ============================================================ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Background Image / Video if configured in CMS */}
          {hero?.mediaUrl && (
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
              {hero.mediaType === "VIDEO" && !hero.mediaUrl.includes("youtube") ? (
                <video
                  src={hero.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={hero.mediaUrl}
                  alt="Hero Background"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          )}

          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Headline & Action */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-accent">
                  <Sparkles className="size-3.5" />
                  <span>{heroKicker}</span>
                </div>

                <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.12]">
                  {heroHeadline ? (
                    heroHeadline
                  ) : (
                    <>
                      {t.hero.titleLine1} <br />
                      <span className="text-accent font-serif italic font-normal">{t.hero.titleLine2}</span>
                    </>
                  )}
                </h1>

                <p className="max-w-xl text-base sm:text-lg text-white/80 leading-relaxed">
                  {heroSubheadline}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild size="lg" className="rounded-xl shadow-warm-md">
                    <Link href={primaryCtaUrl}>
                      <span>{primaryCtaText}</span>
                      <ArrowRight className="size-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outlineWhite" className="rounded-xl">
                    <Link href={secondaryCtaUrl}>
                      <span>{secondaryCtaText}</span>
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

                  <div className="rounded-2xl bg-accent/10 border border-accent/20 p-3.5 flex items-center justify-between text-xs">
                    <span className="text-white/80 font-medium">{t.hero.cardCta}</span>
                    <Link href="/pelayanan" className="text-accent font-bold hover:underline flex items-center gap-1">
                      <span>{t.common.readMore}</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. STATISTIK ANGKA DAMPAK (Impact Numbers)
            ============================================================ */}
        <section className="border-y border-border/80 bg-card py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats && Array.isArray(stats) && stats.length > 0 ? (
                stats.map((st: any, idx: number) => {
                  const label = locale === "en" ? st.labelEn || st.labelId : st.labelId;
                  return (
                    <div key={idx} className="text-center space-y-1">
                      <span className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">
                        {st.number}
                      </span>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {label}
                      </p>
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="text-center space-y-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">{t.impact.stat1Number}</span>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.impact.stat1Title}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-accent">{t.impact.stat2Number}</span>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.impact.stat2Title}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-primary">{t.impact.stat3Number}</span>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.impact.stat3Title}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-accent">{t.impact.stat4Number}</span>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t.impact.stat4Title}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            3. NILAI POKOK / VALUE PROPOSITION (3 Cards)
            ============================================================ */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {t.whyEsm.kicker}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {t.whyEsm.headlineStart}
                <span className="text-primary italic font-serif">{t.whyEsm.discipleship}</span>
                {t.whyEsm.and}
                <span className="text-accent italic font-serif">{t.whyEsm.mission}</span>
                {t.whyEsm.headlineEnd}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.whyEsm.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values && Array.isArray(values) && values.length === 3 ? (
                values.map((v: any, idx: number) => {
                  const title = locale === "en" ? v.titleEn || v.titleId : v.titleId;
                  const desc = locale === "en" ? v.descEn || v.descId : v.descId;
                  const icons = [Compass, Flame, Users];
                  const Icon = icons[idx % icons.length];

                  return (
                    <Card key={idx} className="p-8 border-border hover:border-primary/40 transition-colors shadow-warm-sm flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                          <Icon className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <>
                  <Card className="p-8 border-border hover:border-primary/40 transition-colors shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                        <Compass className="size-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{t.whyEsm.card1Title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t.whyEsm.card1Desc}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-8 border-border hover:border-accent/60 transition-colors shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="size-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                        <Flame className="size-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{t.whyEsm.card2Title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t.whyEsm.card2Desc}
                      </p>
                    </div>
                  </Card>

                  <Card className="p-8 border-border hover:border-primary/40 transition-colors shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                        <Users className="size-6" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{t.whyEsm.card3Title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {t.whyEsm.card3Desc}
                      </p>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TIGA KOMUNITAS PELAYANAN (Explore, Encounter, Connect)
            ============================================================ */}
        <section className="py-20 bg-card border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{t.communities.kicker}</span>
                <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {t.communities.title}
                </h2>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-xl">
                <Link href="/pelayanan">
                  <span>{t.common.viewAll}</span>
                  <ArrowRight className="size-3.5 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Explore */}
              <Card className="hover:border-primary/50 transition-colors shadow-warm-sm flex flex-col justify-between">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                      <Compass className="size-5" />
                    </div>
                    <Badge variant="outline">{t.communities.exploreBadge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Explore</CardTitle>
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
              <Card className="hover:border-accent/60 transition-colors shadow-warm-sm flex flex-col justify-between border-accent/30">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                      <GraduationCap className="size-5" />
                    </div>
                    <Badge variant="amber">{t.communities.encounterBadge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Encounter</CardTitle>
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
              <Card className="hover:border-primary/50 transition-colors shadow-warm-sm flex flex-col justify-between">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                      <Briefcase className="size-5" />
                    </div>
                    <Badge variant="outline">{t.communities.connectBadge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">Connect</CardTitle>
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
              {/* Left Column: Featured Articles */}
              <div className="lg:col-span-7 space-y-4">
                {featuredArticles.length > 0 ? (
                  featuredArticles.map((art) => {
                    const displayTitle = locale === "en" && art.titleEn ? art.titleEn : art.title;
                    const displayExcerpt = locale === "en" && art.excerptEn ? art.excerptEn : art.excerpt;

                    return (
                      <Link href="/artikel" key={art.id} className="block">
                        <Card className="p-6 hover:border-primary/40 transition-colors shadow-warm-sm group cursor-pointer">
                          <div className="flex flex-col sm:flex-row gap-5 items-start">
                            <div className="size-14 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                              <Flame className="size-7" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="primarySoft">{art.category}</Badge>
                                <span className="text-xs text-muted-foreground">5 min read</span>
                              </div>
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {displayTitle}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                {displayExcerpt}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })
                ) : (
                  <>
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
                  </>
                )}
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
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((ev, idx) => {
                        const dateObj = new Date(ev.startDate);
                        const month = dateObj.toLocaleDateString("id-ID", { month: "short" });
                        const day = dateObj.toLocaleDateString("id-ID", { day: "2-digit" });
                        const displayTitle = locale === "en" && ev.titleEn ? ev.titleEn : ev.title;
                        const displayLoc = locale === "en" && ev.locationEn ? ev.locationEn : ev.location;

                        return (
                          <div key={ev.id} className="flex items-start gap-3.5 p-3 rounded-xl bg-card border border-border">
                            <div className={`flex flex-col items-center justify-center size-12 rounded-lg ${
                              idx === 0 ? "bg-primary text-white" : "bg-accent text-accent-foreground"
                            } shrink-0 font-bold`}>
                              <span className="text-[10px] uppercase tracking-wider">{month}</span>
                              <span className="text-base leading-none">{day}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-xs font-bold text-foreground block">{displayTitle}</span>
                              <span className="text-[11px] text-muted-foreground block line-clamp-1">
                                {displayLoc || ev.description}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
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
                      </>
                    )}
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
            6. TESTIMONI (Warm Quote Card - Connected to Database)
            ============================================================ */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {testimonies && Array.isArray(testimonies) && testimonies.length > 0 ? (
              <div className="space-y-6">
                {testimonies.slice(0, 1).map((tItem: any) => {
                  const quote = locale === "en" ? tItem.quoteEn || tItem.quote : tItem.quote;
                  return (
                    <Card key={tItem.id} className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card to-canvas-subtle p-8 md:p-12 shadow-warm-md text-center space-y-6">
                      {tItem.photo && (
                        <div className="size-16 mx-auto rounded-full border-2 border-primary/20 overflow-hidden relative">
                          <Image src={tItem.photo} alt={tItem.name} fill className="object-cover" />
                        </div>
                      )}
                      <blockquote className="font-serif italic text-xl md:text-2xl text-foreground/90 leading-relaxed font-normal">
                        &ldquo;{quote}&rdquo;
                      </blockquote>
                      <div className="space-y-0.5">
                        <p className="font-sans font-bold text-foreground">{tItem.name}</p>
                        <p className="text-xs text-muted-foreground">{tItem.role || "Alumni / Murid ESM"}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
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
            )}
          </div>
        </section>

        {/* ============================================================
            7. FAQ (Focused Max-w-3xl - Connected to Database)
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
              {faqs && Array.isArray(faqs) && faqs.length > 0 ? (
                faqs.map((f: any) => {
                  const question = locale === "en" ? f.questionEn || f.question : f.question;
                  const answer = locale === "en" ? f.answerEn || f.answer : f.answer;
                  return (
                    <Card key={f.id} className="p-5">
                      <h4 className="font-bold text-sm text-foreground mb-1.5 flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        <span>{question}</span>
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                        {answer}
                      </p>
                    </Card>
                  );
                })
              ) : (
                <>
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
                </>
              )}
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
