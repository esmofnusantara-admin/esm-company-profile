"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/common/PageHero";
import { MapPin, Users, Flame, Phone, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EncounterPage() {
  const { t } = useLanguage();
  const en = t.encounterPage;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={en.badge}
          title={en.title}
          quote={en.quote}
        />

        {/* Wilayah Encounter: Banten & Ternate */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{en.regionsKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {en.regionsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-3 border-primary/30">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MapPin className="size-4" />
                  <span>{en.r1Title}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{en.r1Sub}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {en.r1Desc}
                </p>
              </Card>

              <Card className="p-6 space-y-3 border-accent/40 bg-accent-50/10">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <MapPin className="size-4" />
                  <span>{en.r2Title}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{en.r2Sub}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {en.r2Desc}
                </p>
              </Card>
            </div>

            {/* Program Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Card className="p-5 space-y-2">
                <div className="size-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <BookOpen className="size-4" />
                </div>
                <h4 className="font-bold text-sm text-foreground">{en.p1Title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {en.p1Desc}
                </p>
              </Card>

              <Card className="p-5 space-y-2">
                <div className="size-8 rounded-lg bg-accent-50 text-accent flex items-center justify-center font-bold">
                  <Flame className="size-4" />
                </div>
                <h4 className="font-bold text-sm text-foreground">{en.p2Title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {en.p2Desc}
                </p>
              </Card>

              <Card className="p-5 space-y-2">
                <div className="size-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <Users className="size-4" />
                </div>
                <h4 className="font-bold text-sm text-foreground">{en.p3Title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {en.p3Desc}
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card border-border text-center space-y-4 shadow-warm-sm">
              <h3 className="text-xl font-bold text-foreground">{en.ctaTitle}</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                {en.ctaDesc}
              </p>
              <Button asChild size="default" className="rounded-full">
                <a href="https://wa.me/6281296106611?text=Halo%20Tim%20Encounter%20ESM" target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4 mr-1.5" />
                  <span>{en.ctaBtn}</span>
                </a>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
