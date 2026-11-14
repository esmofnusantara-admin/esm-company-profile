"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Compass,
  GraduationCap,
  Briefcase,
  Heart,
  CheckCircle2,
  Send,
  MessageCircle,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitJoinForm } from "@/actions/join";
import { useToast } from "@/context/ToastContext";
import { Loader2 } from "lucide-react";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

export default function JoinGroupPage() {
  const { locale } = useLanguage();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = React.useState<"siswa" | "mahasiswa" | "alumni">("mahasiswa");
  const [selectedRegion, setSelectedRegion] = React.useState<string>("banten");
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    schoolOrCampus: "",
    city: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await submitJoinForm({
        fullName: formData.fullName,
        phone: formData.phone,
        schoolOrCampus: formData.schoolOrCampus,
        role: selectedRole,
        region: selectedRegion,
        notes: formData.notes,
      });

      if (res.success) {
        setSubmitted(true);
        toast({
          title: "Pendaftaran Berhasil!",
          description: "Data Anda telah tersimpan. Tim pembina ESM akan segera menghubungi Anda.",
          type: "success",
        });
      } else {
        toast({
          title: "Gagal Mengirim",
          description: res.error || "Terjadi kendala saat mengirim formulir. Coba lagi atau hubungi via WhatsApp.",
          type: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungi server. Silakan hubungi kami via WhatsApp.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-canvas">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#420B10] via-[#5C1117] to-[#240407] text-white py-20 md:py-28">
          <div className="absolute -top-24 right-0 w-[550px] sm:w-[750px] h-[450px] bg-gradient-to-br from-amber-400/25 via-orange-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] sm:w-[850px] h-[420px] bg-gradient-to-tr from-primary/55 via-red-600/35 to-rose-500/20 rounded-full blur-[130px] pointer-events-none opacity-85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,248,235,0.05)_0%,rgba(186,36,33,0.14)_45%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold tracking-wide text-amber-200 backdrop-blur-md">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>LANGKAH PERTAMA • BERGABUNG DALAM KOMUNITAS</span>
            </div>

            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Bertumbuh Bersama <br />
              <span className="font-serif italic font-normal text-amber-200">
                dalam Kelompok Pemuridan Murid
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed">
              Mengikut Yesus bukanlah perjalanan yang ditempuh seorang diri. Di ESM, kami menyambut Anda untuk bertumbuh bersama saudara seiman dalam kelompok kecil (KTB) yang saling mendoakan, belajar firman, dan saling menguatkan.
            </p>
          </div>
        </section>

        {/* 3 Steps Overview Cards */}
        <section className="py-12 bg-card border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-canvas border border-border">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Isi Formulir Singkat</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Beri tahu kami jenjang dan kota Anda agar kami bisa menghubungkan dengan kelompok terdekat.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-canvas border border-border">
                <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Disapa oleh Kakak Pembina</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Staf atau mentor ESM akan menghubungi Anda via WhatsApp dengan ramah dan penuh kehangatan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-canvas border border-border">
                <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Mulai Bersekutu & Bertumbuh</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Bergabung dalam kelompok kecil mingguan, berbagi hidup, mendalami firman, dan bermisi bersama.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Form Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <Card className="rounded-[2.5rem] p-8 sm:p-12 border-primary/30 bg-card text-center space-y-6 shadow-warm-lg">
                <div className="size-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="size-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-foreground">Puji Tuhan! Data Anda Sudah Diterima</h3>
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                    Terima kasih <strong>{formData.fullName || "Sahabat ESM"}</strong> telah melangkah. Tim pembina ESM akan menyapa Anda melalui WhatsApp dalam 1–2 hari kerja untuk memperkenalkan kelompok pemuridan terdekat.
                  </p>
                </div>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild className="rounded-full px-6 font-bold">
                    <Link href="/">Kembali ke Beranda</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6 font-bold">
                    <Link href="/doa">Lihat Pokok Doa</Link>
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="rounded-[2.5rem] p-6 sm:p-10 border-border bg-card shadow-warm-md space-y-8">
                {/* Step 1: Choose Your Community Category */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary block">
                    1. Pilih Jenjang Anda
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("siswa")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedRole === "siswa"
                          ? "border-primary bg-primary-50/70 shadow-xs"
                          : "border-border hover:border-primary/40 bg-canvas"
                      }`}
                    >
                      <Compass className="size-5 text-primary mb-2" />
                      <p className="text-sm font-bold text-foreground">Siswa SMA / SMK</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Komunitas Explore</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole("mahasiswa")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedRole === "mahasiswa"
                          ? "border-accent bg-accent-50/70 shadow-xs"
                          : "border-border hover:border-accent/40 bg-canvas"
                      }`}
                    >
                      <GraduationCap className="size-5 text-accent mb-2" />
                      <p className="text-sm font-bold text-foreground">Mahasiswa Kampus</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Komunitas Encounter</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedRole("alumni")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedRole === "alumni"
                          ? "border-primary bg-primary-50/70 shadow-xs"
                          : "border-border hover:border-primary/40 bg-canvas"
                      }`}
                    >
                      <Briefcase className="size-5 text-primary mb-2" />
                      <p className="text-sm font-bold text-foreground">Alumni & Profesional</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Komunitas Connect</p>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Contoh: Daniel Siregar"
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Nomor WhatsApp Aktif</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Asal Sekolah / Kampus / Kantor</label>
                      <input
                        type="text"
                        required
                        value={formData.schoolOrCampus}
                        onChange={(e) => setFormData({ ...formData, schoolOrCampus: e.target.value })}
                        placeholder="Nama SMA, Universitas, atau Tempat Kerja"
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Wilayah Domisili</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
                      >
                        <option value="banten">Tanah Jawara (Serang, Cilegon, Tangerang, Banten)</option>
                        <option value="ternate">Kota Rempah (Ternate, Maluku Utara)</option>
                        <option value="jabodetabek">Jabodetabek</option>
                        <option value="online">Wilayah Lain (Ingin Kelompok Online)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      Kerinduan / Catatan Khusus (Opsional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Apa yang Anda harapkan dari kelompok pemuridan ini?"
                      className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full rounded-full font-bold shadow-warm-md text-sm py-6 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 mr-2 animate-spin" />
                          <span>Mengirim Pendaftaran...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-4 mr-2" />
                          <span>Kirimkan dan Terhubung dengan Komunitas</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="pt-2 text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <span>Atau ingin bertanya langsung terlebih dahulu?</span>
                    <MaskedWhatsAppLink
                      phone="6281296106611"
                      text="Halo ESM, saya ingin tahu lebih banyak tentang kelompok pemuridan"
                      variant="pill"
                      className="text-primary font-bold hover:underline"
                      label="WhatsApp ESM"
                    />
                  </div>
                </form>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
