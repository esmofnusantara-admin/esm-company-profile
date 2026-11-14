"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Sparkles,
  BookOpen,
  Phone,
  Users2,
  Calendar,
  MapPin,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

export default function ExplorePage() {
  const { t, locale } = useLanguage();
  const e = t.explorePage;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. YOUTH-CENTRIC HERO (Inspired by GraceLife Kids/Youth)
            Warm, empathetic, and inviting tone for teens and parents
            ============================================================ */}
        <section className="relative bg-gradient-to-b from-[#2D060A] via-[#3A0A10] to-[#1E0407] text-white pt-24 pb-16 sm:pb-24 overflow-hidden">
          {/* Subtle Ambient Wheel Background Watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200">
              <Compass className="size-3.5 text-amber-300" />
              <span>Tahap 01 • Pembinaan Generasi Remaja</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
              Komunitas Siswa yang{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Akrab, Terbuka, & Berakar
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Masa SMA adalah fase krusial pencarian jati diri. Melalui pelayanan Explore, kami mendampingi siswa menghadapi tekanan teman sebaya, krisis identitas, dan tantangan digital melalui sahabat sejati dan mentor firman Tuhan.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#1A0306]">
                <Link href="/gabung">
                  <span>Cari Kakak Mentor & KTB</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                <Link href="/sumber-daya">Lihat Modul Siswa</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. VISUAL PHOTO SHOWCASE (Like GraceLife Kids Image Feature)
            Large authentic photograph of students in discipleship circle
            ============================================================ */}
        <section className="relative -mt-10 sm:-mt-16 z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-stone-200/90 p-3 sm:p-4 shadow-warm-lg overflow-hidden">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="/uploads/pelayanan/explore_hero.jpg"
                alt="Persekutuan dan Kelompok Pemuridan Siswa SMA Explore"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Kehangatan Komunitas Explore
                  </p>
                  <p className="font-serif italic text-sm sm:text-lg text-white font-medium">
                    &ldquo;Belajar Alkitab bukan membosankan saat kita mendiskusikannya bersama teman-teman yang tulus dan kakak pembina yang setia mendengar.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. REALITA SISWA HARI INI & MENGAPA EXPLORE ADA
            ============================================================ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Tantangan Generasi Z & Gen Alpha
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                Apa yang Sedang Dialami Siswa Remaja Kita?
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Di tengah paparan media sosial 24/7 dan tuntutan akademik, remaja membutuhkan ruang aman untuk bertanya dan bertumbuh secara rohani tanpa dihakimi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-red-50 text-primary flex items-center justify-center font-bold">
                  <HeartHandshake className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Krisis Kesepian & Penerimaan</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Banyak remaja merasa terisolasi meskipun memiliki ratusan pengikut digital. Explore menyediakan kelompok kecil (3-5 orang) tempat mereka didengar dan dikasihi.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Tekanan Moral & Gaya Hidup</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Tuntutan untuk kompromi etika dan pergaulan bebas sangat kuat. Kami melatih siswa memiliki prinsip kebenaran yang teguh dan berani berkata &quot;tidak&quot; pada dosa.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-3">
                <div className="size-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <BookOpen className="size-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Keraguan Intelektual Terhadap Iman</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Apakah Alkitab relevan dengan sains dan realita zaman sekarang? Siswa diajak berdiskusi secara terbuka dan kritis mengenai doktrin keselamatan dan iman sejati.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TIGA PILAR PEMBINAAN SISWA EXPLORE
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-y border-stone-200/90">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Kurikulum & Alur Tumbuh
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                Bagaimana Siswa Dilatih & Dimuridkan?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 text-center sm:text-left">
                <span className="text-3xl font-black text-primary/30">01</span>
                <h3 className="font-bold text-lg text-foreground">Persekutuan & KTB Mingguan</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pertemuan mingguan santai dengan modul &quot;Menemukan Jati Diri di Dalam Kristus&quot;, membahas pergumulan nyata anak sekolah secara hangat.
                </p>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <span className="text-3xl font-black text-amber-500/40">02</span>
                <h3 className="font-bold text-lg text-foreground">Mentoring One-on-One</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Setiap siswa didampingi seorang kakak mentor (mahasiswa atau alumni) yang berdoa bagi mereka dan mendampingi keputusan-keputusan penting hidup mereka.
                </p>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <span className="text-3xl font-black text-primary/30">03</span>
                <h3 className="font-bold text-lg text-foreground">Kamp Pembinaan & Pengutusan</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Retret tahunan dan pelatihan kepemimpinan siswa untuk mempersiapkan mereka menjadi terang di OSIS, persekutuan sekolah, hingga siap melangkah ke kampus.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. JADWAL & LOKASI PERSEKUTUAN SISWA (Banten & Ternate)
            ============================================================ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Ladang Pelayanan Nyata</span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                  Titik Kumpul Komunitas Explore
                </h2>
              </div>
              <Badge variant="outline" className="border-stone-300 text-stone-700 w-fit">
                Wilayah Banten (Serang & Cilegon)
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Banten Serang */}
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <MapPin className="size-4" />
                    <span>Wilayah Serang (Tanah Jawara)</span>
                  </div>
                  <Badge className="bg-red-50 text-primary border border-primary/20 text-[10px]">Aktif</Badge>
                </div>
                <h3 className="font-bold text-lg text-foreground">Komunitas Siswa Kota Serang</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pertemuan KTB dan kelompok doa siswa diadakan di dekat SMA/SMK mitra di Kota Serang setiap Jumat sore sepulang sekolah.
                </p>
                <div className="pt-2 text-xs font-semibold text-stone-700 flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  <span>Jumat Sore • Dekat SMA/SMK Pusat Kota Serang</span>
                </div>
              </Card>

              {/* Card Banten Cilegon */}
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <MapPin className="size-4" />
                    <span>Wilayah Cilegon (Kota Baja)</span>
                  </div>
                  <Badge className="bg-red-50 text-primary border border-primary/20 text-[10px]">Aktif</Badge>
                </div>
                <h3 className="font-bold text-lg text-foreground">Komunitas Siswa Cilegon</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pembinaan karakter dan diskusi firman bagi siswa-siswi sekolah menengah kejuruan dan umum di kawasan Cilegon.
                </p>
                <div className="pt-2 text-xs font-semibold text-stone-700 flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  <span>Sabtu Pagi • Pos Pembinaan Siswa Cilegon</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. ACTION CARD: GABUNG / HUBUNGI KAKAK MENTOR
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#2D060A] via-[#3E0A10] to-[#1C0407] text-white p-8 sm:p-12 shadow-warm-md space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Langkah Pertama Bergabung
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-white max-w-xl mx-auto leading-snug">
                Mau Ikut Kelompok Murid SMA atau Mau Konseling Santai?
              </h2>
              <p className="text-xs sm:text-sm text-stone-200/90 max-w-lg mx-auto leading-relaxed">
                Kakak-kakak pembina kami siap mengobrol, mendengarkan ceritamu, atau menghubungkanmu dengan teman-teman kelompok KTB terdekat di kotamu.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <MaskedWhatsAppLink
                  phone="6281296106611"
                  text="Halo Kak, aku mau tanya atau gabung kelompok Explore ESM"
                  variant="button"
                  className="rounded-full px-7 py-3 font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-[#180306] text-sm"
                  label="Chat Pembina WA"
                />
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-white/30 text-white hover:bg-white/10">
                  <Link href="/gabung">Formulir Pendaftaran</Link>
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
