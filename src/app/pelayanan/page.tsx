"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Send,
  Compass,
  GraduationCap,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PelayananPage() {
  const { t } = useLanguage();
  const m = t.ministryPage;
  const c = t.communities;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge variant="amber" className="text-xs">{m.heroBadge}</Badge>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight">
              {m.heroTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed font-serif italic">
              &ldquo;{m.heroQuote}&rdquo;
            </p>
          </div>
        </section>

        {/* 3C Framework (Communion, Community, Commission) */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.strategyKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {m.strategyTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {m.strategySubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-border hover:border-primary/40 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold mb-4">
                  <Heart className="size-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.c1Number}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{m.c1Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.c1Desc}
                </p>
              </Card>

              <Card className="p-6 border-border hover:border-accent/60 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center font-bold mb-4">
                  <Users className="size-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{m.c2Number}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{m.c2Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.c2Desc}
                </p>
              </Card>

              <Card className="p-6 border-border hover:border-primary/40 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold mb-4">
                  <Send className="size-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.c3Number}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{m.c3Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {m.c3Desc}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* 3 Komunitas Pilihan */}
        <section className="py-20 bg-card border-t border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.fieldsKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {m.fieldsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="flex flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                    <Compass className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Explore Community</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.exploreDesc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-primary font-bold">
                    <Link href="/pelayanan/explore" className="flex items-center gap-1">
                      <span>{c.exploreLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col justify-between p-6 border-accent/40 bg-accent-50/10">
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center">
                    <GraduationCap className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Encounter Community</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.encounterDesc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-accent font-bold">
                    <Link href="/pelayanan/encounter" className="flex items-center gap-1">
                      <span>{c.encounterLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="flex flex-col justify-between p-6">
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
                    <Briefcase className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Connect Community</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {c.connectDesc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border">
                  <Button asChild variant="link" className="px-0 text-primary font-bold">
                    <Link href="/pelayanan/connect" className="flex items-center gap-1">
                      <span>{c.connectLink}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
