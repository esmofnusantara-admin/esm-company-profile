"use client";
import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/common/PageHero";
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
  const { t, locale } = useLanguage();
  const m = t.ministryPage;
  const c = t.communities;
  const [cmsData, setCmsData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/content?section=pelayanan")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setCmsData(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const f3c = cmsData?.framework3C;
  const commList = cmsData?.communities;

  const communionItem = f3c?.[0];
  const communityItem = f3c?.[1];
  const commissionItem = f3c?.[2];

  const c1Title = communionItem ? (locale === "en" ? communionItem.titleEn || communionItem.titleId : communionItem.titleId) : m.c1Title;
  const c1Desc = communionItem ? (locale === "en" ? communionItem.descEn || communionItem.descId : communionItem.descId) : m.c1Desc;

  const c2Title = communityItem ? (locale === "en" ? communityItem.titleEn || communityItem.titleId : communityItem.titleId) : m.c2Title;
  const c2Desc = communityItem ? (locale === "en" ? communityItem.descEn || communityItem.descId : communityItem.descId) : m.c2Desc;

  const c3Title = commissionItem ? (locale === "en" ? commissionItem.titleEn || commissionItem.titleId : commissionItem.titleId) : m.c3Title;
  const c3Desc = commissionItem ? (locale === "en" ? commissionItem.descEn || commissionItem.descId : commissionItem.descId) : m.c3Desc;

  const exploreComm = Array.isArray(commList) ? commList.find((cm: any) => cm.slug === "explore") : null;
  const encounterComm = Array.isArray(commList) ? commList.find((cm: any) => cm.slug === "encounter") : null;
  const connectComm = Array.isArray(commList) ? commList.find((cm: any) => cm.slug === "connect") : null;

  const exploreDesc = exploreComm ? (locale === "en" ? exploreComm.descEn || exploreComm.descId : exploreComm.descId) : c.exploreDesc;
  const encounterDesc = encounterComm ? (locale === "en" ? encounterComm.descEn || encounterComm.descId : encounterComm.descId) : c.encounterDesc;
  const connectDesc = connectComm ? (locale === "en" ? connectComm.descEn || connectComm.descId : connectComm.descId) : c.connectDesc;

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={m.heroBadge}
          title={m.heroTitle}
          quote={m.heroQuote}
        />

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
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{c1Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c1Desc}
                </p>
              </Card>

              <Card className="p-6 border-border hover:border-accent/60 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center font-bold mb-4">
                  <Users className="size-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{m.c2Number}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{c2Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c2Desc}
                </p>
              </Card>

              <Card className="p-6 border-border hover:border-primary/40 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold mb-4">
                  <Send className="size-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{m.c3Number}</span>
                <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{c3Title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {c3Desc}
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
                    {exploreDesc}
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
                    {encounterDesc}
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
                    {connectDesc}
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
