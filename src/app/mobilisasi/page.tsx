"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/common/PageHero";
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface EventItem {
  id: string;
  title: string;
  titleEn?: string | null;
  community: string;
  startDate: string;
  location?: string | null;
  locationEn?: string | null;
  description: string;
  descriptionEn?: string | null;
}

export default function MobilisasiPage() {
  const { t, locale } = useLanguage();
  const m = t.mobilizationPage;

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events?status=PUBLISHED");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setEvents(json.data);
        } else {
          // Default fallbacks
          setEvents([
            {
              id: "1",
              title: "Annual Movement Prayer 2026",
              titleEn: "Annual Movement Prayer 2026",
              community: "ALL",
              startDate: "2026-08-23T19:00:00.000Z",
              location: "Zoom Online Meeting",
              locationEn: "Zoom Online Meeting",
              description:
                "Doa syafaat serentak seluruh staf, siswa, mahasiswa, alumni, dan sahabat gerakan bagi kegerakan pemuridan.",
              descriptionEn:
                "United intercession with all staff, students, alumni, and movement partners for discipleship in Banten and Ternate.",
            },
            {
              id: "2",
              title: "Hari Mitra & Sahabat ESM",
              titleEn: "ESM Partners & Friends Day",
              community: "CONNECT",
              startDate: "2026-09-06T10:00:00.000Z",
              location: "Gedung Pertemuan Serang, Banten",
              locationEn: "Serang Meeting Hall, Banten",
              description:
                "Temu keakraban tahunan, penyampaian warta laporan pertanggungjawaban pelayanan, dan kesaksian misi.",
              descriptionEn:
                "Annual fellowship gathering, ministry accountability report, student testimonies, and partner appreciation.",
            },
            {
              id: "3",
              title: "Explore Camp: Remaja Berakar & Berani",
              titleEn: "Explore Camp: Rooted & Courageous Youth",
              community: "EXPLORE",
              startDate: "2026-09-18T08:00:00.000Z",
              location: "Pusat Pelatihan Pemuda, Banten",
              locationEn: "Youth Training Center, Banten",
              description:
                "Kemah kepemimpinan dan pembinaan karakter rohani bagi siswa SMP & SMA.",
              descriptionEn:
                "Leadership camp and spiritual character building for secondary students.",
            },
          ]);
        }
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={m.badge}
          title={m.title}
          quote={m.quote}
        />

        {/* Timeline Acara */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Agenda & Misi 2026</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {m.subtitle}
              </h2>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                {locale === "en" ? "Loading mission events..." : "Memuat jadwal misi dari database..."}
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((ev) => {
                  const displayTitle = locale === "en" && ev.titleEn ? ev.titleEn : ev.title;
                  const displayLoc = locale === "en" && ev.locationEn ? ev.locationEn : ev.location;
                  const displayDesc = locale === "en" && ev.descriptionEn ? ev.descriptionEn : ev.description;

                  return (
                    <Card key={ev.id} className="p-6 border-border hover:border-primary/40 transition-colors shadow-warm-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge variant={ev.community === "EXPLORE" ? "primarySoft" : "amber"}>
                              {ev.community}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                              <Calendar className="size-3.5 text-primary" />
                              {formatDate(ev.startDate)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-foreground">
                            {displayTitle}
                          </h3>

                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {displayDesc}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                            {displayLoc && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="size-3.5 text-primary" />
                                <span>{displayLoc}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 flex flex-col gap-2">
                          <Button asChild size="sm" className="rounded-xl text-xs font-bold shadow-warm-sm">
                            <Link href="/kemitraan">
                              <span>{locale === "en" ? "Participate" : "Ikuti Agenda"}</span>
                              <ArrowRight className="size-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
