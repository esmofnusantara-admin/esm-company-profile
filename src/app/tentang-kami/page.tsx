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
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TentangKamiPage() {
  const { t, locale } = useLanguage();
  const p = t.aboutPage;

  const [aboutData, setAboutData] = React.useState<any>(null);

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

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <PageHero
          badge={p.heroBadge}
          title={p.heroTitle}
          quote={p.heroQuote}
        />

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

        {/* Tim Pelayanan & Dewan Pengurus (Dynamic from Database) */}
        {team && Array.isArray(team) && team.length > 0 && (
          <section id="tim" className="py-20 bg-canvas border-t border-border">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {locale === "en" ? "LEADERSHIP & WORKERS" : "PENGURUS & STAF"}
                </span>
                <h2 className="font-sans text-3xl font-extrabold text-foreground">
                  {locale === "en" ? "Meet Our Ministry Team" : "Tim Pelayanan & Pengurus ESM"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {locale === "en"
                    ? "Dedicated leaders and workers laboring across student and community ministries."
                    : "Hamba-hamba Tuhan yang mendedikasikan hidup untuk membina dan melayani generasi muda."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((m: any) => {
                  const role = locale === "en" ? m.roleEn || m.role : m.role;
                  const bio = locale === "en" ? m.bioEn || m.bio : m.bio;
                  return (
                    <Card key={m.id} className="p-6 text-center space-y-4 hover:border-primary/40 transition-colors shadow-warm-sm">
                      <div className="size-20 mx-auto rounded-full bg-muted border-2 border-primary/20 overflow-hidden relative">
                        {m.photo ? (
                          <Image src={m.photo} alt={m.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-lg text-primary">
                            {m.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-base text-foreground">{m.name}</h4>
                        <p className="text-xs text-primary font-medium">{role}</p>
                      </div>
                      {bio && (
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {bio}
                        </p>
                      )}
                      {m.whatsapp && (
                        <div className="pt-2">
                          <a
                            href={`https://wa.me/${m.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-semibold"
                          >
                            <Phone className="size-3 text-primary" /> Hubungi
                          </a>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
