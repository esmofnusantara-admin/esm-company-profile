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
  Heart,
  MapPin,
  Sparkles,
  Users,
  Compass,
  GraduationCap,
  Send,
  CheckCircle2,
  Calendar,
  Share2,
  BookMarked,
  ShieldAlert,
  Flame,
  Check,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface PrayerItem {
  id: string;
  category: "banten" | "ternate" | "siswa" | "kampus" | "misi";
  title: string;
  field: string;
  description: string;
  urgent?: boolean;
  prayedCount: number;
  month: string;
}

const initialPrayers: PrayerItem[] = [
  {
    id: "doa-1",
    category: "banten",
    title: "Perintisan Kelompok Pemuridan Siswa di Cilegon & Serang",
    field: "Tanah Jawara (Banten)",
    month: "November 2026",
    description:
      "Doakan keberanian siswa-siswa SMA yang sedang merintis kelompok PA di sekolah negeri, kiranya mereka menjadi saksi Kristus yang berintegritas dan dipenuhi kasih di tengah lingkungan mereka.",
    urgent: true,
    prayedCount: 84,
  },
  {
    id: "doa-2",
    category: "ternate",
    title: "Pemuridan Mahasiswa Kampus di Universitas Khairun & Asrama",
    field: "Kota Rempah (Ternate)",
    month: "November 2026",
    description:
      "Bersyukur atas persekutuan mahasiswa yang terus bertumbuh di Ternate. Doakan ketekunan para pemimpin KTB dalam mendampingi adik-adik tingkat, serta perlindungan rohani bagi seluruh tim staf perintis.",
    urgent: true,
    prayedCount: 112,
  },
  {
    id: "doa-3",
    category: "kampus",
    title: "Pertemuan Pembina Mahasiswa & Regenerasi Pemimpin Kampus 2026/2027",
    field: "Banten & Ternate",
    month: "November 2026",
    description:
      "Doakan persiapan regenerasi pengurus persekutuan mahasiswa agar lahir generasi pemimpin muda yang rendah hati, berakar kuat dalam kebenaran firman, dan memiliki visi misi jangka panjang.",
    prayedCount: 57,
  },
  {
    id: "doa-4",
    category: "siswa",
    title: "Explore Youth Camp & Ret-ret Siswa Akhir Tahun",
    field: "Wilayah Banten",
    month: "Desember 2026",
    description:
      "Doakan persiapan kepanitiaan, pemateri firman Tuhan, dan setiap siswa yang akan diundang agar hati mereka terbuka menerima panggilan Kristus sebagai Tuhan dan Juruselamat hidup mereka.",
    prayedCount: 69,
  },
  {
    id: "doa-5",
    category: "misi",
    title: "Kebutuhan Staf Penuh Waktu & Mitra Finansial Gerakan",
    field: "Nasional & Ladang Misi",
    month: "November 2026",
    description:
      "Doakan kecukupan hidup dan kesehatan para staf lapangan yang mendedikasikan hidupnya untuk melayani generasi muda. Kiranya Tuhan menggerakkan hati alumni dan sahabat misi untuk setia menopang.",
    urgent: true,
    prayedCount: 96,
  },
];

export default function PrayerWallPage() {
  const { locale } = useLanguage();
  const [prayers, setPrayers] = React.useState<PrayerItem[]>(initialPrayers);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [prayedMap, setPrayedMap] = React.useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    region: "Banten",
    prayerRequest: "",
    isPrivate: false,
  });

  const handlePray = (id: string) => {
    if (prayedMap[id]) return;
    setPrayedMap((prev) => ({ ...prev, [id]: true }));
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, prayedCount: p.prayedCount + 1 } : p))
    );
  };

  const handleShare = (p: PrayerItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`[Pokok Doa ESM] ${p.title} (${p.field})\n${p.description}\nMari bersama mendoakan!`);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prayerRequest) return;
    setSubmittedMessage(true);
    setFormData({ name: "", email: "", region: "Banten", prayerRequest: "", isPrivate: false });
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  const filteredPrayers =
    activeCategory === "all"
      ? prayers
      : prayers.filter((p) => p.category === activeCategory);

  const totalPrayedCount = prayers.reduce((acc, curr) => acc + curr.prayedCount, 0);

  const categories = [
    { id: "all", label: "Semua Pokok Doa", icon: Sparkles, count: prayers.length },
    { id: "banten", label: "Tanah Jawara (Banten)", icon: MapPin, count: prayers.filter((p) => p.category === "banten").length },
    { id: "ternate", label: "Kota Rempah (Ternate)", icon: MapPin, count: prayers.filter((p) => p.category === "ternate").length },
    { id: "kampus", label: "Kampus & Mahasiswa", icon: GraduationCap, count: prayers.filter((p) => p.category === "kampus").length },
    { id: "siswa", label: "Siswa & Sekolah", icon: Compass, count: prayers.filter((p) => p.category === "siswa").length },
    { id: "misi", label: "Kebutuhan Staf & Misi", icon: Heart, count: prayers.filter((p) => p.category === "misi").length },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. SACRED SANCTUARY HERO WITH CANDLELIGHT PHOTOGRAPHY
            Atmospheric hands folded on scripture with deep vignette
            ============================================================ */}
        <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/hero/prayer_hero.jpg"
              alt="Mezbah Doa dan Syafaat ESM"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Multi-stop Deep Garnet Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-[#120204]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <Flame className="size-3.5 text-amber-300" />
              <span>Mezbah Doa & Dinding Syafaat Nusantara</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Bersatu Hati Menopang{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Pekerjaan Misi & Generasi Murid
              </span>
            </h1>

            <p className="font-serif italic text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto font-normal leading-relaxed">
              &ldquo;Janganlah hendaknya kamu kuatir tentang apapun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.&rdquo; — Filipi 4:6
            </p>

            {/* Intercessors Live Pulse Counter Banner */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/30 text-amber-200">
                <span className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2.5 bg-amber-400" />
                </span>
                <span>{totalPrayedCount}+ Komitmen Doa Naik Bulan Ini</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-stone-300">
                <MapPin className="size-3.5 text-red-400" />
                <span>Fokus: Banten, Ternate, dan Kampus Perintis</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. NATURAL WRAPPED CATEGORY FILTER (NO UGLY SCROLLBAR)
            ============================================================ */}
        <section className="py-10 border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-20 z-20 shadow-xs">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Saring Pokok Doa Berdasarkan Ladang & Jenjang:
              </p>
              <span className="text-xs text-stone-500 font-medium">
                Menampilkan {filteredPrayers.length} pokok doa aktif
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-[#2D060B] text-white shadow-warm-xs ring-1 ring-primary/40 border border-transparent"
                        : "bg-white text-stone-700 hover:text-stone-950 border border-stone-200/90 hover:border-stone-300 hover:bg-stone-50 shadow-2xs"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-3.5 transition-colors",
                        isActive ? "text-amber-300" : "text-stone-400 group-hover:text-primary"
                      )}
                    />
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-stone-600 group-hover:bg-stone-200"
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            3. INTERACTIVE PRAYER WALL CARDS
            With live "Saya Ikut Mendoakan" counter & heart feedback
            ============================================================ */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPrayers.map((item) => {
                const hasPrayed = prayedMap[item.id];
                return (
                  <Card
                    key={item.id}
                    className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-warm-xs hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Top Status Accent Bar */}
                    <div
                      className={cn(
                        "h-1.5 w-full -mx-7 -mt-7 mb-5",
                        item.urgent
                          ? "bg-gradient-to-r from-red-600 via-amber-500 to-red-600 animate-pulse"
                          : "bg-stone-200"
                      )}
                    />

                    <div className="space-y-4">
                      {/* Badge & Region */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500">
                          <MapPin className="size-3.5 text-primary" />
                          <span>{item.field}</span>
                        </div>
                        {item.urgent && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider border border-red-300">
                            <span className="size-1.5 rounded-full bg-red-600 animate-ping" />
                            Mendesak
                          </span>
                        )}
                      </div>

                      {/* Title & Narrative */}
                      <div className="space-y-2">
                        <h3 className="font-sans text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Action & Intercession Counter */}
                    <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handlePray(item.id)}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs",
                          hasPrayed
                            ? "bg-emerald-600 text-white scale-105"
                            : "bg-[#2D060B] text-white hover:bg-[#450A12] active:scale-95"
                        )}
                      >
                        <Heart
                          className={cn(
                            "size-3.5 transition-colors",
                            hasPrayed ? "fill-white text-white" : "text-amber-300"
                          )}
                        />
                        <span>{hasPrayed ? "Telah Didoakan ✓" : "Saya Mendoakan"}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500 font-semibold">
                          {item.prayedCount} pendoa
                        </span>
                        <button
                          type="button"
                          onClick={() => handleShare(item)}
                          title="Salin Pokok Doa"
                          className="size-8 rounded-full border border-stone-200 hover:border-stone-300 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <Check className="size-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. BESPOKE PRAYER SUBMISSION CARD (Inspired by GMH Creation)
            Warm, elevated submission portal for alumni & friends of mission
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90 relative">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE4] p-8 sm:p-12 border border-stone-300/80 shadow-warm-xs space-y-6">
              <div className="text-center space-y-2">
                <div className="size-12 rounded-2xl bg-[#2D060B] text-amber-300 mx-auto flex items-center justify-center shadow-warm-xs mb-3">
                  <Send className="size-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Persekutuan Tubuh Kristus
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                  Titipkan Pokok Doa Pribadi atau Komunitas Anda
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Apakah Anda, keluarga, atau persekutuan Anda sedang bergumul? Tim pendoa staf ESM akan mendoakan permohonan Anda dalam mezbah doa mingguan kami.
                </p>
              </div>

              {submittedMessage ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2 animate-in fade-in duration-300">
                  <CheckCircle2 className="size-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-sm">Pokok Doa Berhasil Diterima</h4>
                  <p className="text-xs text-emerald-700">
                    Terima kasih telah berbagi beban. Tim pendoa ESM akan mendoakan permohonan Anda dengan setia di hadapan Tuhan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                        Nama Lengkap (Boleh Inisial)
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Daniel / Anonim"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                        Wilayah / Kota Anda
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="Banten">Banten (Serang / Cilegon)</option>
                        <option value="Ternate">Maluku Utara (Ternate / Halmahera)</option>
                        <option value="Jabodetabek">Jabodetabek</option>
                        <option value="Lainnya">Kota Lainnya di Indonesia</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      Isi Pokok Doa
                    </label>
                    <textarea
                      rows={4}
                      value={formData.prayerRequest}
                      onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
                      placeholder="Ceritakan pokok pergumulan yang ingin kami doakan bersama..."
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="privateCheck"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                      className="size-4 rounded border-stone-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="privateCheck" className="text-xs text-stone-600">
                      Doakan secara privat (hanya staf pendoa internal, tidak dipublikasikan di dinding doa)
                    </label>
                  </div>

                  <div className="pt-2 text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="rounded-full px-8 font-bold shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white"
                    >
                      <Send className="size-4 mr-2" />
                      <span>Kirimkan Pokok Doa ke Tim Mezbah</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
