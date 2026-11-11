"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/common/PageHero";
import { Building, ShieldCheck, HeartHandshake, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ConnectPage() {
  const { t } = useLanguage();
  const c = t.connectPage;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={c.badge}
          title={c.title}
          quote={c.quote}
        />

        {/* 3 Pilar Marketplace Impact */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{c.pillarsKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {c.pillarsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{c.p1Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.p1Desc}
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                  <HeartHandshake className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{c.p2Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.p2Desc}
                </p>
              </Card>

              <Card className="p-6 space-y-3">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <Building className="size-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{c.p3Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c.p3Desc}
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-card border-border text-center space-y-4 shadow-warm-sm">
              <h3 className="text-xl font-bold text-foreground">{c.ctaTitle}</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                {c.ctaDesc}
              </p>
              <Button asChild size="default" className="rounded-full">
                <a href="https://wa.me/6281296106611?text=Halo%20Tim%20Connect%20ESM" target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4 mr-1.5" />
                  <span>{c.ctaBtn}</span>
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
