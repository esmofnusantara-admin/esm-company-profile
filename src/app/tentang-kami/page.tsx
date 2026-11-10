"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Flame,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TentangKamiPage() {
  const { t } = useLanguage();
  const p = t.aboutPage;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge variant="amber" className="text-xs">{p.heroBadge}</Badge>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight">
              {p.heroTitle}
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed font-serif italic">
              &ldquo;{p.heroQuote}&rdquo;
            </p>
          </div>
        </section>

        {/* Sejarah & Panggilan Awal */}
        <section id="sejarah" className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.historyKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {p.historyTitle}
              </h2>
            </div>

            <div className="space-y-5 text-base text-foreground/80 leading-relaxed">
              <p>{p.historyP1}</p>
              <p>{p.historyP2}</p>
              <p>{p.historyP3}</p>
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
                    {p.visionCardDesc}
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
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* PENGAKUAN IMAN / STATEMENT OF FAITH */}
        <section id="dasar-iman" className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3 text-center">
              <Badge variant="amber">{p.faithBadge}</Badge>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {p.faithTitle}
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                {p.faithSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4" />
                  <span>{p.faith1Title}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.faith1Desc}
                </p>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4" />
                  <span>{p.faith2Title}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.faith2Desc}
                </p>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4" />
                  <span>{p.faith3Title}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.faith3Desc}
                </p>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="font-bold text-sm text-primary flex items-center gap-2">
                  <ShieldCheck className="size-4" />
                  <span>{p.faith4Title}</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.faith4Desc}
                </p>
              </Card>
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
                    <h3 className="font-bold text-lg text-foreground">{p.region1Title}</h3>
                    <p className="text-xs text-muted-foreground">{p.region1Sub}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.region1Desc}
                </p>
              </Card>

              {/* Ternate */}
              <Card className="p-6 space-y-4 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{p.region2Title}</h3>
                    <p className="text-xs text-muted-foreground">{p.region2Sub}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {p.region2Desc}
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
