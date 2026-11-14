"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/common/PageHero";
import {
  BookOpen,
  Heart,
  Flame,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  Download,
  Users,
  CheckCircle2,
  FileText,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function KabarDoaHubPage() {
  const { locale } = useLanguage();

  const sections = [
    {
      id: "renungan",
      badge: "Pilar 1 • Santapan Rohani",
      title: "Renungan & Saat Teduh",
      desc: "Menyediakan renungan harian yang praktis, ayat emas hari ini yang meneguhkan iman, serta panduan 4 langkah saat teduh yang melatih disiplin hening bersama Kristus.",
      features: [
        "Ayat Emas Hari Ini (Verse of the Day)",
        "Panduan 4 Langkah Saat Teduh Harian",
        "Refleksi Firman Pemuridan & Karakter",
        "Unduh Jurnal Saat Teduh 30 Hari",
      ],
      href: "/renungan",
      cta: "Buka Renungan Harian",
      icon: BookOpen,
      color: "from-amber-500/10 to-transparent",
      badgeColor: "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/5",
    },
    {
      id: "doa",
      badge: "Pilar 2 • Mezbah Bersama",
      title: "Pokok Doa Bersama",
      desc: "Mezbah doa bersama untuk menopang perintisan ladang misi di Banten & Ternate. Anda dapat melihat pokok doa bulanan, ikut berdoa secara interaktif, dan mengirimkan pokok doa pergumulan pribadi.",
      features: [
        "Pokok Doa Bulanan Banten & Ternate",
        "Mezbah Doa Syafaat Siswa & Mahasiswa",
        "Penghitung Doa Interaktif ('Saya Ikut Berdoa')",
        "Form Kirim Pokok Doa (Privat / Publik)",
      ],
      href: "/doa",
      cta: "Lihat Pokok Doa Bersama",
      icon: Heart,
      color: "from-rose-500/10 to-transparent",
      badgeColor: "border-rose-500/40 text-rose-600 dark:text-rose-400 bg-rose-500/5",
    },
    {
      id: "warta",
      badge: "Pilar 3 • Kabar Lapangan",
      title: "Warta Misi Pelayanan",
      desc: "Laporan terkini dan catatan lapangan dari para staf misi dan pembina persekutuan. Menyajikan artikel refleksi ladang, dokumentasi foto pelayanan, serta unduhan Buletin Warta Misi ESM resmi.",
      features: [
        "Catatan Lapangan Banten & Ternate",
        "Unduh Buletin Warta Misi ESM (PDF)",
        "Dokumentasi Galeri Foto Pelayanan",
        "Kisah Transformasi Siswa & Mahasiswa",
      ],
      href: "/artikel",
      cta: "Baca Warta Misi",
      icon: Flame,
      color: "from-primary/10 to-transparent",
      badgeColor: "border-primary/40 text-primary bg-primary/5",
    },
    {
      id: "bahan-ajar",
      badge: "Pilar 4 • Kurikulum & Modul",
      title: "Bahan Ajar & Panduan Pembuat Murid",
      desc: "Pusat sumber daya Alkitabiah gratis yang memuat kurikulum bahan PA (Pendalaman Alkitab) untuk siswa SMA & mahasiswa kampus, serta buku saku panduan praktis bagi pemimpin kelompok KTB.",
      features: [
        "Modul Bahan PA Siswa SMP & SMA",
        "Kurikulum KTB Mahasiswa Kampus",
        "Buku Saku Panduan Pembuat Murid",
        "Modul Penginjilan Pribadi & Mentoring",
      ],
      href: "/sumber-daya",
      cta: "Akses Bahan Ajar",
      icon: Compass,
      color: "from-blue-500/10 to-transparent",
      badgeColor: "border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-500/5",
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <PageHero
          badge="Pusat Pertumbuhan Rohani & Informasi Misi"
          title="Kabar dan Doa"
          quote="Tetaplah berdoa. Mengucap syukurlah dalam segala hal, sebab itulah yang dikehendaki Allah di dalam Kristus Yesus bagi kamu. — 1 Tesalonika 5:17-18"
          description="Wadah terpadu pergerakan rohani ESM Nusantara. Jelajahi 4 pilar utama: Renungan & saat teduh harian, mezbah pokok doa bersama, warta perkembangan ladang misi, serta modul bahan ajar pembuat murid."
        />

        {/* 4 Core Pillars Overview */}
        <section className="py-14 sm:py-20 bg-canvas">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                Empat Pilar Ruang Kabar & Doa
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                Pilih bagian yang ingin Anda akses untuk memperlengkapi kehidupan rohani pribadi, mendukung dalam doa, maupun memimpin kelompok pemuridan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((sec) => {
                const IconComponent = sec.icon;
                return (
                  <Card
                    key={sec.id}
                    className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/20 p-8 sm:p-10 shadow-warm-sm hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                  >
                    <div className={cn("absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl blur-3xl pointer-events-none rounded-bl-full", sec.color)} />

                    <div className="space-y-6 relative">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={cn("text-xs font-bold px-3 py-1", sec.badgeColor)}>
                          {sec.badge}
                        </Badge>
                        <div className="p-3 rounded-2xl bg-muted text-primary group-hover:scale-110 transition-transform">
                          <IconComponent className="size-6" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {sec.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {sec.desc}
                        </p>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="pt-2 space-y-2.5 border-t border-border/50">
                        {sec.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-foreground font-medium">
                            <CheckCircle2 className="size-4 text-primary shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 relative">
                      <Link
                        href={sec.href}
                        className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-warm-xs hover:bg-primary/90 transition-all group-hover:shadow-warm-sm"
                      >
                        <span>{sec.cta}</span>
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Highlights Strip */}
        <section className="py-12 border-t border-border/60 bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-warm-xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Ayat Emas Hari Ini</span>
                <p className="text-xs font-serif italic text-muted-foreground">
                  &ldquo;Orang yang menanti-nantikan TUHAN mendapat kekuatan baru...&rdquo; (Yesaya 40:31)
                </p>
                <Link href="/renungan" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline pt-1">
                  <span>Buka Renungan Lengkap</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-warm-xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Pokok Doa Aktif</span>
                <p className="text-xs text-muted-foreground">
                  Perintisan KTB Siswa Cilegon & Pembinaan Mahasiswa Asrama Ternate.
                </p>
                <Link href="/doa" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline pt-1">
                  <span>Lihat Mezbah Doa</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-warm-xs space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Modul Pembuat Murid</span>
                <p className="text-xs text-muted-foreground">
                  Modul Murid Kritis, Jati Diri Siswa, dan Buku Saku Pemimpin KTB.
                </p>
                <Link href="/sumber-daya" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline pt-1">
                  <span>Unduh Bahan Ajar</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
