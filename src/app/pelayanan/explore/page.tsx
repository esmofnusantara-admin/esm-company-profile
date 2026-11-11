"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/common/PageHero";
import { Users, Sparkles, BookOpen, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ExplorePage() {
  const { t } = useLanguage();
  const e = t.explorePage;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={e.badge}
          title={e.title}
          quote={e.quote}
        />

        {/* Program & Kegiatan Siswa */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{e.programKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {e.programTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <BookOpen className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{e.p1Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {e.p1Desc}
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{e.p2Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {e.p2Desc}
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <Users className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{e.p3Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {e.p3Desc}
                </p>
              </Card>
            </div>

            {/* CTA Kontak Tim Explore */}
            <Card className="p-8 bg-card border-border text-center space-y-4 shadow-warm-sm">
              <h3 className="text-xl font-bold text-foreground">{e.ctaTitle}</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                {e.ctaDesc}
              </p>
              <Button asChild size="default" className="rounded-full">
                <a href="https://wa.me/6281296106611?text=Halo%20Tim%20Explore%20ESM" target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4 mr-1.5" />
                  <span>{e.ctaBtn}</span>
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
