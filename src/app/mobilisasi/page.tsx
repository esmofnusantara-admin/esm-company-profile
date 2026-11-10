"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Clock, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobilisasiPage() {
  const { t, locale } = useLanguage();
  const m = t.mobilizationPage;

  const upcomingEvents = [
    {
      id: "1",
      title: locale === "en" ? "Annual Movement Prayer 2026" : "Annual Movement Prayer 2026",
      community: locale === "en" ? "Cross-Regional & Communities" : "Lintas Wilayah & Komunitas",
      date: locale === "en" ? "August 23, 2026" : "23 Agustus 2026",
      time: "19.00 - 21.00 WIB",
      location: locale === "en" ? "Zoom Online Meeting" : "Zoom Online Meeting",
      type: "ONLINE",
      description:
        locale === "en"
          ? "United intercession with all staff, students, alumni, and movement partners for discipleship in Banten, Ternate, and beyond."
          : "Doa syafaat serentak seluruh staf, siswa, mahasiswa, alumni, dan sahabat gerakan bagi kegerakan pemuridan di Banten, Ternate, dan seluruh Nusantara.",
      badge: locale === "en" ? "Prayer Rally" : "Doa Akbar",
      variant: "primarySoft" as const,
    },
    {
      id: "2",
      title: locale === "en" ? "ESM Partners & Friends Day" : "Hari Mitra & Sahabat ESM",
      community: locale === "en" ? "Churches, Donors & Alumni" : "Gereja, Donatur & Alumni",
      date: locale === "en" ? "September 06, 2026" : "06 September 2026",
      time: "10.00 - 14.00 WIB",
      location: locale === "en" ? "Serang Meeting Hall, Banten" : "Gedung Pertemuan Serang, Banten",
      type: "OFFLINE",
      description:
        locale === "en"
          ? "Annual fellowship gathering, ministry accountability report, student testimonies, and partner appreciation."
          : "Temu keakraban tahunan, penyampaian warta laporan pertanggungjawaban pelayanan, kesaksian siswa-mahasiswa, dan penguatan persekutuan mitra.",
      badge: locale === "en" ? "Partnership" : "Kemitraan",
      variant: "amber" as const,
    },
    {
      id: "3",
      title: locale === "en" ? "Explore Camp: Rooted & Courageous Youth" : "Explore Camp: Remaja Berakar & Berani",
      community: locale === "en" ? "Explore (High School)" : "Explore (Siswa SMA)",
      date: locale === "en" ? "September 18 - 20, 2026" : "18 - 20 September 2026",
      time: locale === "en" ? "3 Days 2 Nights" : "3 Hari 2 Malam",
      location: locale === "en" ? "Youth Training Center, Banten" : "Pusat Pelatihan Pemuda, Banten",
      type: "CAMP",
      description:
        locale === "en"
          ? "Leadership camp and spiritual character building for secondary students, equipping them to be bold witnesses of Christ."
          : "Kemah kepemimpinan dan pembinaan karakter rohani bagi siswa SMP & SMA. Memperlengkapi siswa menjadi saksi Kristus di sekolah.",
      badge: locale === "en" ? "High School" : "Siswa SMA",
      variant: "primarySoft" as const,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge variant="amber" className="text-xs">{m.badge}</Badge>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight">
              {m.title}
            </h1>
            <p className="max-w-2xl mx-auto text-base text-white/80 leading-relaxed font-serif italic">
              &ldquo;{m.quote}&rdquo;
            </p>
          </div>
        </section>

        {/* Master Agenda List */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{m.subtitle}</h2>
                <p className="text-xs text-muted-foreground">{m.subdesc}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl text-xs">
                  {m.filterAll}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((evt) => (
                <Card key={evt.id} className="p-6 hover:shadow-warm-md hover:border-primary/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={evt.variant}>{evt.badge}</Badge>
                        <span className="text-xs font-semibold text-muted-foreground">
                          {evt.community}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{evt.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {evt.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/80 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-primary" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="size-3.5 text-accent" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {evt.type === "ONLINE" ? (
                            <Video className="size-3.5 text-blue-600" />
                          ) : (
                            <MapPin className="size-3.5 text-primary" />
                          )}
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pt-2 md:pt-0">
                      <Button asChild size="sm" className="rounded-xl text-xs w-full sm:w-auto">
                        <a
                          href={`https://wa.me/6281296106611?text=Halo%20ESM%2C%20saya%20ingin%20mendaftar%20acara%3A%20${encodeURIComponent(
                            evt.title
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{m.registerBtn}</span>
                          <ArrowRight className="size-3.5 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
