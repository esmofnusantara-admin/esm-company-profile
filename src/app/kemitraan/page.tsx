"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  HandCoins,
  Users2,
  Copy,
  Check,
  Send,
  Building2,
  Phone,
  Mail,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  BookOpen,
  Home,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitDonation } from "@/actions/donation";
import { cn } from "@/lib/utils";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

export default function KemitraanPage() {
  const { t, locale } = useLanguage();
  const k = t.partnershipPage;

  const [copied, setCopied] = React.useState(false);
  const [donationType, setDonationType] = React.useState<"SEKALI_BERI" | "MITRA_BULANAN">("MITRA_BULANAN");
  const [selectedNominal, setSelectedNominal] = React.useState("100.000");
  const [customNominal, setCustomNominal] = React.useState("");

  // Form states
  const [donorName, setDonorName] = React.useState("");
  const [donorPhone, setDonorPhone] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Dynamic CMS Data
  const [kemitraanData, setKemitraanData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/content?section=kemitraan")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setKemitraanData(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const bank = kemitraanData?.bank;
  const prayers = kemitraanData?.prayers;
  const settings = kemitraanData?.settings;

  const bankAccount = bank?.accountNumber || "8420-991-888";
  const bankName = bank?.bankName || "Bank Central Asia (BCA)";
  const accountName = bank?.accountHolder || "Yayasan Evangelical Student Movement";
  const qrisUrl = bank?.qrisUrl || null;
  const waContact = bank?.waConfirmNumber || settings?.phone?.replace(/[^0-9]/g, "") || "6281296106611";

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const rawNominal = customNominal
      ? customNominal.replace(/[^0-9]/g, "")
      : selectedNominal.replace(/[^0-9]/g, "");
    const amount = parseInt(rawNominal, 10);

    if (!amount || amount < 10000) {
      setErrorMessage(locale === "en" ? "Minimum donation amount is Rp 10.000" : "Nominal donasi minimal Rp 10.000");
      setIsSubmitting(false);
      return;
    }

    const res = await submitDonation({
      donorName,
      donorPhone,
      donorEmail,
      amount,
      type: donationType,
      message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setDonorName("");
      setDonorPhone("");
      setDonorEmail("");
      setMessage("");
    } else {
      setErrorMessage(res.error || "Gagal mengirim komitmen donasi");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. PHOTO-DRIVEN MISSION STEWARDSHIP HERO
            Featuring real photo of smiling students with books in learning center
            ============================================================ */}
        <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/hero/kemitraan_hero.jpg"
              alt="Dukungan Misi dan Kemitraan Pemuridan ESM"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Multi-stop Deep Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-[#120204]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <Heart className="size-3.5 text-amber-300" />
              <span>Kemitraan Misi & Penatalayanan Gerakan</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Menjadi Rekan Sekerja Allah untuk{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Menjangkau Generasi Muda
              </span>
            </h1>

            <p className="font-serif italic text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto font-normal leading-relaxed">
              &ldquo;Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita.&rdquo; — 2 Korintus 9:7
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-400" />
                100% Akuntabel & Terbuka
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 text-amber-400" />
                Penyaluran Langsung: Banten & Maluku Utara
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users2 className="size-4 text-blue-400" />
                Menopang Siswa, Mahasiswa, & Asrama
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. TRANSPARANSI DAMPAK: KE MANA SETIAP DUKUNGAN MENGALIR?
            Concrete financial stewardship impact cards
            ============================================================ */}
        <section className="py-16 sm:py-20 -mt-10 sm:-mt-14 relative z-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-4">
                <div className="size-12 rounded-2xl bg-red-50 text-primary flex items-center justify-center font-bold">
                  <BookOpen className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Dampak Rp 50.000 / bln</span>
                  <h3 className="font-bold text-lg text-foreground">Modul PA & Alkitab Siswa</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Menyediakan 1 paket buku panduan pemuridan dan Alkitab saku gratis bagi siswa SMA yang rindu belajar firman di Banten dan Ternate.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-4">
                <div className="size-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <Home className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Dampak Rp 250.000 / bln</span>
                  <h3 className="font-bold text-lg text-foreground">Subsidi Asrama Mahasiswa</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Membantu biaya sewa asrama dan fasilitas belajar bagi 1 orang mahasiswa perantau dari kepulauan Halmahera di Ministry House Ternate.
                </p>
              </Card>

              <Card className="p-7 rounded-3xl bg-white border border-stone-200/90 shadow-warm-md space-y-4">
                <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <TrendingUp className="size-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Dampak Rp 500.000+ / bln</span>
                  <h3 className="font-bold text-lg text-foreground">Operasional Staf Perintis Misi</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  Mendukung biaya transportasi antar-pulau, kesehatan, dan bekal hidup para staf penuh waktu yang mengabdi memuridkan generasi muda.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. FORM KOMITMEN DONASI & REKENING BANK TERINTEGRASI
            ============================================================ */}
        <section id="donasi" className="py-16 sm:py-24 bg-white border-y border-stone-200/90">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Saluran Kemitraan Finansial
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                Komitmen Dukungan & Rekening Resmi
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Pilih frekuensi dan nominal yang sesuai dengan kerelaan hati Anda. Seluruh persembahan dialokasikan langsung bagi pelayanan siswa, mahasiswa, dan staf perintis.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input */}
              <div className="lg:col-span-7 rounded-3xl border border-stone-200/90 bg-[#FAF7F2] p-6 sm:p-9 space-y-6 shadow-warm-xs">
                {submitSuccess ? (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4 animate-in fade-in duration-300">
                    <div className="size-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                      <Check className="size-7" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900">
                      Terima Kasih atas Komitmen Anda!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed max-w-md mx-auto">
                      Komitmen kemitraan Anda telah tercatat di sistem ESM. Kiranya Tuhan yang empunya ladang memberkati setiap benih yang Anda tabur bagi generasi murid di Nusantara.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSubmitSuccess(false)}
                        className="rounded-full text-xs bg-white text-emerald-800 border-emerald-300"
                      >
                        Kirim Komitmen Lain
                      </Button>
                      <MaskedWhatsAppLink
                        phone={waContact}
                        text="Halo Admin ESM, saya ingin konfirmasi komitmen donasi kemitraan misi."
                        variant="button"
                        className="rounded-full text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2"
                        label="Konfirmasi WA"
                      />
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}

                    {/* Tipe Donasi Tabs */}
                    <div className="flex rounded-2xl bg-white p-1 border border-stone-200">
                      <button
                        type="button"
                        onClick={() => setDonationType("MITRA_BULANAN")}
                        className={cn(
                          "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
                          donationType === "MITRA_BULANAN"
                            ? "bg-[#2D060B] text-white shadow-warm-xs"
                            : "text-stone-600 hover:text-stone-900"
                        )}
                      >
                        Mitra Bulanan (Rutin)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("SEKALI_BERI")}
                        className={cn(
                          "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
                          donationType === "SEKALI_BERI"
                            ? "bg-[#2D060B] text-white shadow-warm-xs"
                            : "text-stone-600 hover:text-stone-900"
                        )}
                      >
                        Dukungan Sekali Waktu
                      </button>
                    </div>

                    {/* Preset Nominal */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-foreground block">
                        Pilih Nominal Dukungan:
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {["50.000", "100.000", "250.000", "500.000", "1.000.000"].map((nom) => (
                          <button
                            key={nom}
                            type="button"
                            onClick={() => {
                              setSelectedNominal(nom);
                              setCustomNominal("");
                            }}
                            className={cn(
                              "rounded-xl border py-2 text-xs font-bold transition-all cursor-pointer",
                              selectedNominal === nom && !customNominal
                                ? "border-[#2D060B] bg-[#2D060B] text-white shadow-warm-xs"
                                : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                            )}
                          >
                            Rp {nom}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="text-[11px] text-stone-500 block mb-1">
                          Atau masukkan nominal lainnya (Rp):
                        </label>
                        <input
                          type="text"
                          value={customNominal}
                          onChange={(e) => {
                            setCustomNominal(e.target.value);
                            setSelectedNominal("");
                          }}
                          placeholder="Contoh: 1.500.000"
                          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                        />
                      </div>
                    </div>

                    {/* Identitas Donatur */}
                    <div className="space-y-4 pt-4 border-t border-stone-200">
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">
                          Nama Lengkap / Inisial *
                        </label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Nama Anda atau Anonim"
                          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-foreground block mb-1">
                            Nomor WhatsApp / HP *
                          </label>
                          <input
                            type="tel"
                            required
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground block mb-1">
                            Alamat Email (Opsional)
                          </label>
                          <input
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="nama@email.com"
                            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">
                          Pesan Doa atau Kerinduan Anda
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tuliskan doa atau permohonan khusus bagi ladang misi..."
                          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium leading-relaxed"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full justify-center rounded-full font-bold text-xs py-5 shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white"
                      >
                        {isSubmitting ? (
                          <span>Menyimpan Komitmen...</span>
                        ) : (
                          <>
                            <Send className="size-4 mr-2" />
                            <span>Simpan Komitmen Donasi Misi</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Bank Transfer Info & QRIS Card */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-7 rounded-3xl border border-stone-200/90 bg-[#FAF7F2] space-y-5 shadow-warm-xs">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Building2 className="size-4" />
                    <span>Rekening Resmi Yayasan</span>
                  </div>

                  <div className="space-y-1.5 rounded-2xl bg-white p-5 border border-stone-200">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                      {bankName}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl sm:text-2xl font-black text-foreground tracking-wider">
                        {bankAccount}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 rounded-full text-xs font-bold border-stone-300"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3.5 text-emerald-600 mr-1" />
                            <span className="text-emerald-600">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5 mr-1" />
                            <span>Salin No.</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <span className="text-xs text-stone-600 block pt-1 font-medium">
                      Atas Nama: <strong>{accountName}</strong>
                    </span>
                  </div>

                  {/* QRIS Display */}
                  <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-3 text-center">
                    {qrisUrl ? (
                      <div className="size-48 mx-auto rounded-xl border border-stone-200 bg-white flex items-center justify-center p-2 relative overflow-hidden">
                        <Image src={qrisUrl} alt="Barcode QRIS ESM" fill className="object-contain p-1" />
                      </div>
                    ) : (
                      <div className="size-28 mx-auto rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-center p-2">
                        <QrCode className="size-20 text-stone-600" />
                      </div>
                    )}
                    <p className="text-[11px] text-stone-500 font-medium">
                      Scan via GoPay, OVO, Dana, BCA Mobile, atau aplikasi perbankan apa pun
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium pt-1">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>Laporan pertanggungjawaban donasi dikirimkan secara berkala kepada seluruh mitra terdaftar.</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. KONTAK KONSULTASI KEMITRAAN & KONFIRMASI TRANSFER
            (Elevated and prominent before or alongside donation)
            ============================================================ */}
        <section id="kontak" className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-stone-200/90">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="size-12 rounded-2xl bg-[#2D060B] text-amber-300 mx-auto flex items-center justify-center shadow-warm-xs">
              <Phone className="size-5" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Layanan Mitra & Donatur
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                Butuh Konsultasi atau Konfirmasi Transfer Kemitraan?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                Sebelum mentransfer atau jika Anda membutuhkan proposal kemitraan institusi/gereja, tim bendahara dan sekretariat ESM siap melayani dan memberikan bukti tanda terima donasi Anda.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <MaskedWhatsAppLink
                phone={waContact}
                text="Halo Bendahara ESM, saya ingin berkonsultasi mengenai kemitraan misi."
                variant="button"
                className="rounded-full px-7 py-3 font-bold shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white text-sm"
                label="WhatsApp Bendahara"
              />
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-stone-300 bg-white">
                <a href={`mailto:${settings?.email || "halo@esm.or.id"}`} className="flex items-center gap-2">
                  <Mail className="size-4" />
                  <span>{settings?.email || "halo@esm.or.id"}</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
