"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  ShieldCheck,
  HeartHandshake,
  Building,
  Phone,
  ArrowRight,
  TrendingUp,
  Coins,
  Compass,
  CheckCircle2,
  Users2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SwipeableCarousel, CarouselSlide } from "@/components/common/SwipeableCarousel";

const connectSlides: CarouselSlide[] = [
  {
    src: "/uploads/pelayanan/connect_1.jpg",
    alt: "Forum Profesional dan Diskusi Integritas Kerja",
    badge: "Marketplace Forum • Faith & Work",
    title: "Menghidupi Iman di Meja Konferensi & Ruang Rapat",
    caption: "Wadah bagi kaum profesional Kristen berdiskusi terbuka tentang etika bisnis, godaan korupsi, dan menghadirkan nilai Kerajaan Allah di tempat kerja sekuler.",
  },
  {
    src: "/uploads/pelayanan/connect_2.jpg",
    alt: "Mentoring One-on-One Alumni dengan Lulusan Baru",
    badge: "Generational Mentoring",
    title: "Mendampingi Adik-Adik Melangkah ke Dunia Kerja",
    caption: "Alumni senior mendampingi fresh graduate melewati masa transisi karier, wawancara kerja, dan mempertahankan idealisme kristiani.",
  },
];

export default function ConnectPage() {
  const { t, locale } = useLanguage();
  const c = t.connectPage;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. DIGNIFIED MARKETPLACE HERO
            Authoritative, professional, and purpose-driven
            ============================================================ */}
        <section className="relative bg-gradient-to-b from-[#251508] via-[#331C0C] to-[#1A0E06] text-white pt-24 pb-20 sm:pb-28 overflow-hidden">
          <div className="absolute top-0 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200">
              <Briefcase className="size-3.5 text-amber-300" />
              <span>Tahap 03 • Pengutusan di Marketplace & Profesi</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Menghadirkan Kebenaran Kristus di{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Ruang Rapat & Dunia Kerja
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Pekerjaan Anda bukan sekadar mencari nafkah, melainkan mimbar misi Allah di tengah dunia sekuler. Melalui Connect, alumni dan kaum profesional saling meneguhkan integritas iman dan membimbing generasi berikutnya.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#1A0E06]">
                <a href="https://wa.me/6281296106611?text=Halo%20Tim%20Connect%2C%20saya%20alumni%20ingin%20terhubung%20dengan%20komunitas%20profesional%20ESM" target="_blank" rel="noopener noreferrer">
                  <span>Gabung Komunitas Profesional</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                <Link href="/sumber-daya">Buku: Iman di Ruang Rapat</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. REALITAS MARKETPLACE: DILEMA ETIKA & KEBUTUHAN KOMUNITAS
            ============================================================ */}
        <section className="py-16 sm:py-20 -mt-10 sm:-mt-14 relative z-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-3">
                <div className="size-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Tekanan Kompromi Etika</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Godaan korupsi, manipulasi laporan, dan politik kantor sering kali menguji idealisme iman. Connect menyediakan ruang akuntabilitas rohani bagi para profesional.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-3">
                <div className="size-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold">
                  <TrendingUp className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Kejenuhan & Krisis Makna Karier</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bekerja puluhan tahun tanpa memahami tujuan ilahi berujung pada kekosongan batin. Kami membimbing alumni memandang profesi mereka sebagai mandat ibadah harian.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-3">
                <div className="size-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <HeartHandshake className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Mata Rantai Generasi yang Terputus</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Banyak alumni sukses namun tidak lagi terhubung mendampingi adik-adik mahasiswa. Connect membangun jembatan mentoring lintas generasi.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. CENTER-STAGE SWIPEABLE SHOWCASE (Distinct Image Placement!)
            Positioned as a dedicated featured spotlight right between
            the marketplace challenges and the 3 strategic pillars
            ============================================================ */}
        <section className="py-12 sm:py-16 bg-stone-100/70 border-y border-stone-200/80">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Dokumentasi Kegiatan Nyata
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                Denyut Komunitas Alumni & Marketplace
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Geser / swipe foto untuk melihat kehangatan persekutuan profesional dan mentoring generasi muda.
              </p>
            </div>

            <div className="relative">
              <SwipeableCarousel
                slides={connectSlides}
                aspectRatio="aspect-[16/9]"
                className="max-w-4xl mx-auto shadow-2xl border-white"
              />
              <div className="mt-3 text-center text-[11px] text-stone-500 italic">
                💡 Sentuh & geser ke kiri/kanan (swipe) atau klik panah untuk melihat slide berikutnya
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TIGA PERAN STRATEGIS ALUMNI CONNECT
            ============================================================ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Bentuk Keterlibatan
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
                Tiga Peran Strategis di Komunitas Connect
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="size-11 rounded-2xl bg-[#2D060B] text-amber-300 flex items-center justify-center font-black text-sm shadow-warm-xs">
                  01
                </div>
                <h3 className="font-bold text-lg text-foreground">Marketplace Fellowship</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pertemuan berkala alumni profesional lintas bidang (korporasi, kesehatan, pendidikan, wirausaha) untuk berdoa bersama, membagikan pergumulan etika, dan saling menguatkan integritas kerja.
                </p>
              </div>

              <div className="space-y-3">
                <div className="size-11 rounded-2xl bg-[#2D060B] text-amber-300 flex items-center justify-center font-black text-sm shadow-warm-xs">
                  02
                </div>
                <h3 className="font-bold text-lg text-foreground">Mentoring Adik Lulusan Baru</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Menjadi kakak mentor bagi adik-adik mahasiswa tingkat akhir dan *fresh graduate*, membantu mereka beradaptasi di dunia kerja pertama mereka tanpa menanggalkan nilai-nilai Kristiani.
                </p>
              </div>

              <div className="space-y-3">
                <div className="size-11 rounded-2xl bg-[#2D060B] text-amber-300 flex items-center justify-center font-black text-sm shadow-warm-xs">
                  03
                </div>
                <h3 className="font-bold text-lg text-foreground">Penatalayanan Misi (Mission Stewardship)</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Menyalurkan berkat finansial dan keahlian profesional untuk mendukung ladang perintisan misi di Banten dan Ternate, pengadaan modul pembinaan gratis, serta operasional asrama mahasiswa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. KOTA & TITIK PERSEKUTUAN ALUMNI
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Jejaring Profesi</span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                  Basis Jejaring Alumni Connect
                </h2>
              </div>
              <Badge variant="outline" className="border-stone-300 text-stone-700 w-fit">
                Jabodetabek • Banten • Ternate
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 rounded-3xl bg-[#FAF7F2] border border-stone-200/90 shadow-warm-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Jabodetabek</span>
                <h4 className="font-bold text-base text-foreground">Komunitas Profesional Ibu Kota</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pertemuan sarapan pagi / makan malam bulanan dan kelompok doa profesional di sekitar Jakarta, Tangerang, dan sekitarnya.
                </p>
              </Card>

              <Card className="p-6 rounded-3xl bg-[#FAF7F2] border border-stone-200/90 shadow-warm-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Banten (Serang-Cilegon)</span>
                <h4 className="font-bold text-base text-foreground">Alumni Industri & Pelayanan</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Kaum profesional yang bekerja di kawasan industri Cilegon dan instansi di Serang, mendampingi perintisan siswa SMA dan mahasiswa Untirta.
                </p>
              </Card>

              <Card className="p-6 rounded-3xl bg-[#FAF7F2] border border-stone-200/90 shadow-warm-xs space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Maluku Utara (Ternate)</span>
                <h4 className="font-bold text-base text-foreground">Alumni Pendidik & Medis Kota Rempah</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Dokter, perawat, guru, dan pegawai di Ternate yang setia menopang asrama mahasiswa perantau dan gerakan doa kepulauan.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. ACTION CARD: GABUNG JEJARING ATAU JADI MENTOR
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-[#FAF7F2]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#251508] via-[#331C0C] to-[#1A0E06] text-white p-8 sm:p-12 shadow-warm-md space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Panggilan Berbuah di Dunia Kerja
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-white max-w-xl mx-auto leading-snug">
                Rindukan Komunitas Teman Sekerja yang Sama-Sama Rindu Hidup Kudus?
              </h2>
              <p className="text-xs sm:text-sm text-stone-200/90 max-w-lg mx-auto leading-relaxed">
                Bergabunglah dengan jejaring alumni Connect, temukan teman seiman di industri yang sama, atau daftarkan diri Anda menjadi kakak mentor bagi generasi penerus.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#180A04]">
                  <a href="https://wa.me/6281296106611?text=Halo%20Tim%20Connect%2C%20saya%20alumni%20ingin%20bergabung%20atau%20menjadi%20mentor%20ESM" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Phone className="size-4" />
                    <span>Hubungi Koordinator Alumni (WhatsApp)</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                  <Link href="/kemitraan">Dukung Pelayanan Misi</Link>
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
