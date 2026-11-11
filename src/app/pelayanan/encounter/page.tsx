"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  Flame,
  Phone,
  ArrowRight,
  ShieldCheck,
  Home,
  CheckCircle2,
  Calendar,
  Compass,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SwipeableCarousel, CarouselSlide } from "@/components/common/SwipeableCarousel";

const encounterSlides: CarouselSlide[] = [
  {
    src: "/uploads/pelayanan/encounter_1.jpg",
    alt: "Diskusi Alkitab dan Worldview Mahasiswa Kampus",
    badge: "KTB Kampus • Banten & Ternate",
    title: "Diskusi Firman yang Hidup & Berakar",
    caption: "Membentengi iman mahasiswa dari relativisme moral dan skeptisisme melalui dialog Alkitabiah yang kritis dan terbuka.",
  },
  {
    src: "/uploads/pelayanan/encounter_2.jpg",
    alt: "Kehangatan Persekutuan Asrama Mahasiswa di Ternate",
    badge: "Ministry House • Kota Rempah Ternate",
    title: "Rumah Rohani bagi Mahasiswa Perantau",
    caption: "Malam doa, pujian, dan keluarga kedua bagi adik-adik mahasiswa dari kepulauan Halmahera dan Maluku Utara.",
  },
];

export default function EncounterPage() {
  const { t, locale } = useLanguage();
  const en = t.encounterPage;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. BESPOKE SPLIT-HERO WITH INTERACTIVE SWIPEABLE CAROUSEL
            Positioned Side-by-Side: text on left, swipeable gallery on right!
            Distinct from Explore's centered overlapping single photo
            ============================================================ */}
        <section className="relative bg-gradient-to-b from-[#240508] via-[#32080D] to-[#1A0306] text-white pt-24 pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Mission Narrative & Kicker */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200">
                  <GraduationCap className="size-3.5 text-amber-300" />
                  <span>Tahap 02 • Perintisan & Pemuridan Mahasiswa</span>
                </div>

                <h1 className="font-sans text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                  Membentuk Murid Kampus yang{" "}
                  <span className="font-serif italic font-normal text-amber-200">
                    Kritis, Berakar, & Berjiwa Misi
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-stone-200/90 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Perguruan tinggi adalah kancah pertempuran pemikiran. Melalui gerakan Encounter, kami membimbing mahasiswa tidak hanya bertahan di tengah arus dunia, tetapi berani menjadi saksi Kristus yang berintegritas di Banten dan Maluku Utara.
                </p>

                {/* Quick Field Badges */}
                <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-amber-200/90 font-medium">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    📍 2 Basis Utama: Banten & Ternate
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    🎓 8+ Kampus Jaringan
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">
                    🏡 Asrama Binaan Mahasiswa
                  </span>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#180306]">
                    <a href="https://wa.me/6281296106611?text=Halo%20Kak%2C%20aku%20mahasiswa%20mau%20gabung%20Encounter%20ESM" target="_blank" rel="noopener noreferrer">
                      <span>Gabung KTB Mahasiswa</span>
                      <ArrowRight className="size-4 ml-1.5" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                    <Link href="/sumber-daya">Modul Worldview KTB</Link>
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive Swipeable Carousel (Different Position & Swipable!) */}
              <div className="lg:col-span-6">
                <div className="relative">
                  {/* Subtle decorative glow ring */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-xl opacity-75" />
                  <SwipeableCarousel
                    slides={encounterSlides}
                    aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                    className="border-white/20 shadow-2xl"
                  />
                  <div className="mt-2.5 flex items-center justify-between px-2 text-[11px] text-stone-300">
                    <span className="italic">💡 Geser / swipe foto untuk melihat kegiatan KTB & Asrama</span>
                    <span className="font-semibold text-amber-300">Dokumentasi Nyata ESM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. REALITAS INTELEKTUAL & TANTANGAN KAMPUS HARI INI
            ============================================================ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Dunia Kampus Sekuler
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Mengapa Mahasiswa Kristen Rentan Kehilangan Iman di Kampus?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Banyak pemuda Kristen yang aktif di gereja masa kecil mengalami guncangan iman begitu memasuki dunia perkuliahan dan indekos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-red-50 text-primary flex items-center justify-center font-bold">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Relativisme Moral & Skeptisisme</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Gagasan bahwa kebenaran mutlak tidak ada sering kali membuat mahasiswa enggan memegang firman Tuhan. Encounter memperlengkapi nalar mereka dengan apologetika Alkitabiah.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Home className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Keterasingan Mahasiswa Perantau</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Jauh dari keluarga dan gereja asal, godaan gaya hidup permisif di kosan sangat tinggi. Komunitas KTB dan Asrama Binaan hadir sebagai jangkar perlindungan rohani.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Flame className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Kekosongan Pemimpin yang Melipatgandakan</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Banyak persekutuan kampus hanya fokus pada ibadah seremonial mingguan. Encounter fokus membina murid satu per satu agar siap memuridkan mahasiswa lain.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. TIGA PILAR GERAKAN ENCOUNTER
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-y border-stone-200/90">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Strategi Pelayanan Kampus
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                Tiga Pilar Pemuridan Mahasiswa Encounter
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-bold text-lg text-foreground">Kelompok Tumbuh Bersama (KTB)</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kelompok kecil 3-6 orang mahasiswa yang bertemu setiap minggu untuk membedah Alkitab secara induktif, saling mendoakan beban akademik, dan menumbuhkan disiplin rohani.
                </p>
              </div>

              <div className="space-y-3">
                <div className="size-10 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-bold text-lg text-foreground">Asrama & Rumah Pelayanan (Ministry House)</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pusat pembinaan holistik di Ternate dan Banten yang menyediakan tempat tinggal bersahabat bagi mahasiswa perantau, dilengkapi jam doa bersama, saat teduh, dan mentoring staf.
                </p>
              </div>

              <div className="space-y-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-bold text-lg text-foreground">Pelatihan Kepemimpinan & Misi</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kamp pembinaan berkala untuk melatih mahasiswa menjadi pemimpin KTB baru, memimpin pengurus persekutuan kampus, serta melakukan aksi sosial dan eksposur misi ke desa-desa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. DUA WILAYAH LADANG UTAMA: BANTEN & TERNATE
            ============================================================ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Ladang Misi Kampus</span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                  Basis Pelayanan Encounter Saat Ini
                </h2>
              </div>
              <p className="text-xs text-stone-500 max-w-xs">
                Membangun mata rantai murid di wilayah barat (Tanah Jawara) dan timur Nusantara (Maluku Utara).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Banten Campus Hub */}
              <Card className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-base">
                    <MapPin className="size-5" />
                    <span>Perintisan Banten (Serang & Cilegon)</span>
                  </div>
                  <Badge className="bg-red-50 text-primary border border-primary/20 text-xs">Basis Jawa Barat</Badge>
                </div>
                <h3 className="font-bold text-xl text-foreground">
                  Gerakan Mahasiswa di Tanah Jawara
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Menjangkau mahasiswa di Universitas Sultan Ageng Tirtayasa (Untirta), UIN SMH Banten, Unsera, dan berbagai akademi di Serang dan Cilegon melalui kelompok mentoring KTB dan pembinaan karakter.
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>📍 Pusat Kegiatan: Sekretariat Serang</span>
                  <span className="font-semibold text-primary">KTB Mingguan Aktif</span>
                </div>
              </Card>

              {/* Ternate Campus Hub */}
              <Card className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
                    <MapPin className="size-5" />
                    <span>Perintisan Ternate (Maluku Utara)</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-900 border border-amber-300 text-xs">Basis Indonesia Timur</Badge>
                </div>
                <h3 className="font-bold text-xl text-foreground">
                  Mata Air Rohani di Kota Rempah
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Melayani ribuan mahasiswa kepulauan yang berkuliah di Universitas Khairun (Unkhair) Ternate dan institusi kesehatan. Menyediakan asrama persekutuan dan pembinaan dasar doktrin Alkitab.
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>📍 Pusat Kegiatan: Asrama Mahasiswa Ternate</span>
                  <span className="font-semibold text-amber-800">Ministry House & Doa</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. ACTION CALLOUT: GABUNG KTB ATAU HUBUNGI PEMBINA
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#240508] via-[#38080E] to-[#180305] text-white p-8 sm:p-12 shadow-warm-md space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Langkah Nyata Mahasiswa
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-white max-w-xl mx-auto leading-snug">
                Kamu Sedang Kuliah di Banten, Ternate, atau Ingin Memulai KTB di Kampusmu?
              </h2>
              <p className="text-xs sm:text-sm text-stone-200/90 max-w-lg mx-auto leading-relaxed">
                Staf pembina kampus dan kakak-kakak mentor alumni siap mendampingimu bertumbuh, menyediakan modul pembinaan gratis, atau menghubungkanmu dengan kelompok pemuridan terdekat.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#180306]">
                  <a href="https://wa.me/6281296106611?text=Halo%20Kak%2C%20aku%20mahasiswa%20mau%20gabung%20Encounter%20ESM" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <span>Hubungi Pembina Kampus di WhatsApp</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                  <Link href="/gabung">Formulir Gabung Komunitas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
