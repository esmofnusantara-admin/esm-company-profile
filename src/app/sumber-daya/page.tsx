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
  BookOpen,
  Download,
  FileText,
  Compass,
  GraduationCap,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  BookMarked,
  ShieldCheck,
  Users,
  Layers,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Clock,
  HardDrive,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

interface ResourceItem {
  id: string;
  category: "siswa" | "kampus" | "alumni" | "mentor" | "umum";
  title: string;
  subtitle: string;
  targetAudience: string;
  format: string;
  pages: string;
  fileSize: string;
  sessions: string;
  description: string;
  downloadUrl: string;
  coverImage: string;
  badge?: string;
  featured?: boolean;
}

const initialResources: ResourceItem[] = [
  {
    id: "res-2",
    category: "kampus",
    title: "Murid yang Kritis & Berakar",
    subtitle: "Dasar-Dasar Doktrin dan Worldview Kristen di Era Disrupsi",
    targetAudience: "Mahasiswa Kampus (Encounter)",
    format: "PDF Modul KTB",
    pages: "52 Halaman",
    fileSize: "3.4 MB",
    sessions: "8 Sesi Diskusi",
    description:
      "Panduan kelompok kecil pemuridan kampus untuk membentengi iman mahasiswa dari relativisme moral, skeptisisme intelektual, dan filsafat sekuler di lingkungan perguruan tinggi.",
    downloadUrl: "/documents/modul-murid-kritis.pdf",
    coverImage: "/uploads/books/murid_kritis.jpg",
    badge: "Bahan Wajib KTB",
    featured: true,
  },
  {
    id: "res-1",
    category: "siswa",
    title: "Menemukan Jati Diri di Dalam Kristus",
    subtitle: "Seri Pendalaman Alkitab Siswa SMP & SMA",
    targetAudience: "Siswa SMA (Explore)",
    format: "PDF E-Book",
    pages: "36 Halaman",
    fileSize: "2.1 MB",
    sessions: "6 Sesi Pemuridan",
    description:
      "Modul 6 minggu membimbing siswa menghadapi krisis identitas remaja, tekanan teman sebaya, media sosial, dan keberanian hidup kudus bagi Kristus di sekolah.",
    downloadUrl: "/documents/modul-jati-diri.pdf",
    coverImage: "/uploads/books/jati_diri.jpg",
    badge: "Paling Populer",
  },
  {
    id: "res-3",
    category: "mentor",
    title: "Buku Saku Pemimpin KTB",
    subtitle: "Seni Mendampingi dan Melipatgandakan Generasi Murid",
    targetAudience: "Pemimpin KTB & Staf Pembina",
    format: "PDF Panduan Pelayanan",
    pages: "44 Halaman",
    fileSize: "2.8 MB",
    sessions: "10 Bab Praktis",
    description:
      "Kiat praktis bagaimana memimpin diskusi firman yang hidup, membangun relasi hati-ke-hati tanpa manipulasi, menangani pergumulan anggota, dan mendidik murid agar siap memuridkan kembali.",
    downloadUrl: "/documents/panduan-pemimpin-ktb.pdf",
    coverImage: "/uploads/books/pemimpin_ktb.jpg",
    badge: "Pedoman Mentor",
  },
  {
    id: "res-4",
    category: "alumni",
    title: "Iman di Ruang Rapat",
    subtitle: "Panduan Integritas, Etika, dan Misi di Dunia Kerja",
    targetAudience: "Alumni & Kaum Profesional (Connect)",
    format: "PDF Seri Refleksi",
    pages: "40 Halaman",
    fileSize: "2.5 MB",
    sessions: "5 Seri Diskusi",
    description:
      "Menjawab dilema etika bisnis, godaan kompromi integritas, kejenuhan karier, dan bagaimana menghidupi profesi harian sebagai mimbar misi Allah di tengah dunia kerja sekuler.",
    downloadUrl: "/documents/modul-murid-kritis.pdf",
    coverImage: "/uploads/books/iman_rapat.jpg",
  },
  {
    id: "res-5",
    category: "umum",
    title: "Panduan Saat Teduh 30 Hari",
    subtitle: "Berjalan Bersama Sang Gembala Menembus Badai Hidup",
    targetAudience: "Semua Kalangan Murid",
    format: "PDF Jurnal Renungan",
    pages: "32 Halaman",
    fileSize: "1.9 MB",
    sessions: "30 Hari Refleksi",
    description:
      "Jurnal perenungan pribadi harian dari Kitab Mazmur dan Injil untuk menumbuhkan keintiman doa, kedisiplinan membaca firman, dan ketenangan jiwa di awal hari.",
    downloadUrl: "/documents/mission-of-faith-esm.pdf",
    coverImage: "/uploads/books/saat_teduh.jpg",
  },
  {
    id: "res-6",
    category: "kampus",
    title: "Panggilan Misi Nusantara",
    subtitle: "Profil Lapangan & Tantangan Generasi Muda Banten & Ternate",
    targetAudience: "Mahasiswa & Calon Staf Misi",
    format: "PDF Buletin Misi",
    pages: "28 Halaman",
    fileSize: "4.2 MB",
    sessions: "Studi Lapangan",
    description:
      "Kajian sosiologis, pemetaan kampus, dan gambaran nyata dinamika pelayanan perintisan generasi muda di Tanah Jawara Banten serta Kepulauan Maluku Utara.",
    downloadUrl: "/documents/warta-misi-q3-2026.pdf",
    coverImage: "/uploads/books/misi_nusantara.jpg",
  },
  {
    id: "res-7",
    category: "siswa",
    title: "Fondasi Hidup Baru dalam Kristus",
    subtitle: "7 Pelajaran Awal untuk Murid yang Baru Percaya",
    targetAudience: "Siswa & Mahasiswa Baru (Explore & Encounter)",
    format: "PDF Modul Dasar",
    pages: "30 Halaman",
    fileSize: "1.8 MB",
    sessions: "7 Sesi Dasar",
    description:
      "Kurikulum esensial mencakup kepastian keselamatan, arti pengampunan dosa, kuasa doa, membaca firman, hidup berkemenangan, serta persekutuan jemaat mula-mula.",
    downloadUrl: "/documents/modul-jati-diri.pdf",
    coverImage: "/uploads/books/jati_diri.jpg",
    badge: "Dasar Pertumbuhan",
  },
  {
    id: "res-8",
    category: "siswa",
    title: "Garam & Terang di Era Digital",
    subtitle: "Menavigasi Algoritma, FOMO, dan Kebenaran Alkitabiah",
    targetAudience: "Siswa SMA & Mahasiswa Muda",
    format: "PDF E-Guide",
    pages: "38 Halaman",
    fileSize: "2.3 MB",
    sessions: "4 Seri Tematik",
    description:
      "Studi praktis tentang menjaga kekudusan mata di media sosial, mengatasi kecemasan perbandingan digital, dan menjadikan konten online sebagai sarana kesaksian iman.",
    downloadUrl: "/documents/modul-murid-kritis.pdf",
    coverImage: "/uploads/books/murid_kritis.jpg",
  },
  {
    id: "res-9",
    category: "alumni",
    title: "Penatalayanan Finansial Alkitabiah",
    subtitle: "Prinsip Mengelola Gaji, Investasi, dan Memberi Bagi Kerajaan Allah",
    targetAudience: "Alumni Muda & Kaum Profesional (Connect)",
    format: "PDF Panduan Keuangan",
    pages: "46 Halaman",
    fileSize: "2.7 MB",
    sessions: "6 Seri Keuangan",
    description:
      "Pedoman praktis bebas dari jeratan konsumerisme dan utang, membangun dana darurat, menata prioritas perpuluhan, serta berinvestasi dengan integritas moral kristiani.",
    downloadUrl: "/documents/panduan-pemimpin-ktb.pdf",
    coverImage: "/uploads/books/iman_rapat.jpg",
    badge: "Praktis & Terapan",
  },
];

export default function ResourcesPage() {
  const { locale } = useLanguage();
  const { toast } = useToast();
  const [resources] = React.useState<ResourceItem[]>(initialResources);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [downloadedIds, setDownloadedIds] = React.useState<Record<string, boolean>>({});
  
  // View mode switcher: "grid" (max 2 rows + pagination) vs "list" (dense table view)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Pagination for grid view: 6 items per page = exactly 2 rows of 3 columns
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const gridPageSize = 6;
  const listPageSize = 10;

  // Reset page when category or search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, viewMode]);

  const handleDownload = (id: string, title: string, url?: string) => {
    setDownloadedIds((prev) => ({ ...prev, [id]: true }));
    const targetUrl = url && url !== "#" ? url : "/documents/panduan-pemimpin-ktb.pdf";
    const a = document.createElement("a");
    a.href = targetUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({
      title: "Mengunduh Modul",
      description: `Modul "${title}" berhasil diunduh. Kiranya bahan ini memberkati pemuridan Anda.`,
      type: "success",
    });
  };

  const filteredResources = React.useMemo(() => {
    return resources.filter((res) => {
      const matchesCategory = activeCategory === "all" || res.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [resources, activeCategory, searchQuery]);

  // Pagination calculations
  const pageSize = viewMode === "grid" ? gridPageSize : listPageSize;
  const totalPages = Math.ceil(filteredResources.length / pageSize) || 1;
  const paginatedResources = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredResources.slice(start, start + pageSize);
  }, [filteredResources, currentPage, pageSize]);

  const featuredResource = resources.find((r) => r.featured) || resources[0];

  const categories = [
    { id: "all", label: "Semua Bahan", icon: Sparkles, count: resources.length },
    { id: "siswa", label: "Siswa SMA (Explore)", icon: Compass, count: resources.filter((r) => r.category === "siswa").length },
    { id: "kampus", label: "Mahasiswa (Encounter)", icon: GraduationCap, count: resources.filter((r) => r.category === "kampus").length },
    { id: "alumni", label: "Alumni & Profesi (Connect)", icon: Briefcase, count: resources.filter((r) => r.category === "alumni").length },
    { id: "mentor", label: "Pemimpin KTB", icon: BookOpen, count: resources.filter((r) => r.category === "mentor").length },
    { id: "umum", label: "Saat Teduh & Renungan", icon: FileText, count: resources.filter((r) => r.category === "umum").length },
  ];

  const scrollToCatalog = () => {
    const catalogElement = document.getElementById("katalog-bahan");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. BESPOKE PHOTO HERO (Inspired by Our Daily Bread & GraceLife)
            Atmospheric Bible study photograph with deep garnet vignette overlay
            ============================================================ */}
        <section className="relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/hero/resource_hero.jpg"
              alt="Perpustakaan Bahan Pemuridan ESM"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Cinematic Multi-stop Dark Garnet Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-[#120204]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <BookMarked className="size-3.5 text-amber-300" />
              <span>Bahan Ajar • Bahan PA & Panduan Pembuat Murid</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Bahan Ajar Firman untuk{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Melatih & Memperlengkapi Murid
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Koleksi bahan PA siswa & mahasiswa, panduan praktis pembuat murid bagi pembina KTB, modul pembinaan karakter, dan jurnal saat teduh yang dapat diunduh gratis untuk melipatgandakan generasi murid Kristus.
            </p>

            {/* Trust Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-300">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-emerald-400" />
                100% Akses Gratis & Bebas Pakai
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <FileText className="size-4 text-amber-400" />
                Format PDF Siap Cetak
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="size-4 text-blue-400" />
                Teologi Injili & Berakar Alkitabiah
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. FEATURED PUBLICATION SPOTLIGHT (Flagship KTB Module with Book Cover)
            ============================================================ */}
        {featuredResource && searchQuery === "" && activeCategory === "all" && (
          <section className="relative -mt-10 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-warm-lg overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Publication Cover (Realistic 3D Book Mockup) */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-stone-300 group transition-transform hover:scale-105 duration-300">
                    <Image
                      src={featuredResource.coverImage}
                      alt={featuredResource.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-amber-400 text-stone-900 font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                      Unggulan
                    </div>
                  </div>
                </div>

                {/* Content Synopsis & Action */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-3 py-1 text-xs">
                      ⭐ Bahan Utama Bulan Ini
                    </Badge>
                    <Badge variant="outline" className="border-stone-300 text-stone-600 text-xs">
                      Kurikulum Wajib KTB Mahasiswa
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                      {featuredResource.title}
                    </h2>
                    <p className="text-sm font-semibold text-primary">
                      {featuredResource.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal pt-1">
                      {featuredResource.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                      <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">✓</span>
                      <span>8 Sesi Diskusi Kelompok Terarah</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                      <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">✓</span>
                      <span>Dilengkapi Lembar Panduan Mentor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                      <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">✓</span>
                      <span>Studi Kasus Relativisme Moral & Sains</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                      <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">✓</span>
                      <span>Ayat Hafalan & Pertanyaan Aplikatif</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Button
                      onClick={() => handleDownload(featuredResource.id, featuredResource.title)}
                      size="lg"
                      className="rounded-full px-7 font-bold shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white"
                    >
                      <Download className="size-4 mr-2" />
                      <span>{downloadedIds[featuredResource.id] ? "Unduh Ulang (PDF)" : "Unduh Modul Lengkap (Gratis)"}</span>
                    </Button>
                    <span className="text-xs text-stone-500 font-medium">
                      Ukuran berkas: {featuredResource.fileSize} • {featuredResource.pages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            3. ENTRY POINT FILTER & VIEW CONTROLS TOOLBAR
            Unified, sleek filter hub that prevents visual clutter
            ============================================================ */}
        <section id="katalog-bahan" className="pt-12 sm:pt-16 pb-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-5">
            {/* Header with Title and Mode Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-primary mb-1">
                  <SlidersHorizontal className="size-3.5" />
                  <span>Katalog Perpustakaan Pemuridan</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Pilih Modul Berdasarkan Sasaran
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  Filter materi sesuai jenjang usia, kelompok pembinaan, atau cari langsung topik yang Anda butuhkan
                </p>
              </div>

              {/* View Switcher: Grid vs List / Table */}
              <div className="flex items-center gap-2 self-start md:self-auto bg-white p-1 rounded-2xl border border-stone-200/90 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    viewMode === "grid"
                      ? "bg-[#2D060B] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  )}
                  title="Tampilan Kartu (Maksimal 2 baris)"
                >
                  <LayoutGrid className="size-3.5" />
                  <span>Kartu (Grid)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    viewMode === "list"
                      ? "bg-[#2D060B] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  )}
                  title="Tampilan List / Tabel (Lebih ringkas & banyak bahan)"
                >
                  <List className="size-3.5" />
                  <span>List / Tabel</span>
                </button>
              </div>
            </div>

            {/* Filter Bar: Entry Point Dropdown / Category Pills + Search */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-warm-xs space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Input */}
                <div className="md:col-span-7 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul modul, kata kunci, topik, atau jenjang..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-stone-50 border border-stone-200/90 text-xs sm:text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* Entry Point Category Selector Dropdown */}
                <div className="md:col-span-5 flex items-center gap-2">
                  <div className="relative w-full">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-stone-50 border border-stone-200/90 text-xs sm:text-sm font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all"
                    >
                      <option value="all">Semua Kategori Sasaran ({resources.length})</option>
                      <option value="siswa">Siswa SMP & SMA (Explore) ({resources.filter(r => r.category === "siswa").length})</option>
                      <option value="kampus">Mahasiswa Perguruan Tinggi (Encounter) ({resources.filter(r => r.category === "kampus").length})</option>
                      <option value="alumni">Alumni & Profesional (Connect) ({resources.filter(r => r.category === "alumni").length})</option>
                      <option value="mentor">Pemimpin KTB & Mentor ({resources.filter(r => r.category === "mentor").length})</option>
                      <option value="umum">Saat Teduh & Renungan ({resources.filter(r => r.category === "umum").length})</option>
                    </select>
                    <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
                  </div>

                  {(activeCategory !== "all" || searchQuery !== "") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setActiveCategory("all");
                        setSearchQuery("");
                      }}
                      className="text-xs text-stone-500 hover:text-red-700 shrink-0 px-2.5"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Category Chips for Instant 1-Click Access */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1">
                  Akses Cepat:
                </span>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                        isActive
                          ? "bg-[#2D060B] text-white shadow-2xs"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900"
                      )}
                    >
                      <Icon className={cn("size-3", isActive ? "text-amber-300" : "text-stone-400")} />
                      <span>{cat.label}</span>
                      <span className={cn("text-[10px] px-1 rounded-full", isActive ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600")}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Status Bar */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>
                Menampilkan <strong>{paginatedResources.length}</strong> dari <strong>{filteredResources.length}</strong> modul
                {activeCategory !== "all" && ` (Kategori: ${categories.find(c => c.id === activeCategory)?.label})`}
                {searchQuery && ` untuk "${searchQuery}"`}
              </span>
              <span className="font-medium text-stone-400">
                {viewMode === "grid" ? "Tampilan Kartu (Max 2 Baris / Halaman)" : "Tampilan List Tabel"}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. RESOURCE CATALOG SECTION:
               Option A: Grid View (Max 2 rows / 6 cards + Pagination)
               Option B: List / Table View (Cover, Title, Ringkasan, Specs, Download)
            ============================================================ */}
        <section className="py-6 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            {filteredResources.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
                <BookOpen className="size-10 text-stone-300 mx-auto" />
                <h3 className="text-lg font-bold text-stone-800">Tidak ada modul yang cocok</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Cobalah kata kunci lain atau pilih &quot;Semua Bahan&quot; untuk menampilkan seluruh materi pembinaan.
                </p>
                <Button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  variant="outline"
                  className="rounded-full text-xs font-bold"
                >
                  Tampilkan Semua Bahan
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              /* ============================================================
                 VIEW MODE 1: GRID VIEW (Max 2 Rows = 6 Cards per page)
                 Each card features an authentic book cover image mockup
                 ============================================================ */
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {paginatedResources.map((res) => (
                    <Card
                      key={res.id}
                      className="rounded-3xl border border-stone-200/90 bg-white overflow-hidden shadow-warm-xs hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Book Cover Image Area */}
                        <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden border-b border-stone-100 flex items-center justify-center p-4">
                          {/* Ambient background blur */}
                          <div
                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-30 scale-125"
                            style={{ backgroundImage: `url(${res.coverImage})` }}
                          />
                          {/* Centered Realistic 3D Book Mockup */}
                          <div className="relative h-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-stone-300/80 group-hover:scale-105 transition-transform duration-300">
                            <Image
                              src={res.coverImage}
                              alt={res.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-primary/20 shadow-xs">
                              {res.targetAudience.split("(")[0].trim()}
                            </span>
                            {res.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs">
                                {res.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="space-y-1">
                            <h3 className="font-sans text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
                              {res.title}
                            </h3>
                            <p className="text-xs font-semibold text-stone-500 line-clamp-1">
                              {res.subtitle}
                            </p>
                          </div>

                          {/* Ringkasan / Synopsis */}
                          <p className="text-xs text-stone-600 leading-relaxed font-normal line-clamp-2">
                            {res.description}
                          </p>

                          {/* Publication Specs */}
                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Layers className="size-3.5 text-primary" />
                              {res.sessions}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FileText className="size-3.5 text-stone-400" />
                              {res.pages}
                            </span>
                            <span>•</span>
                            <span>{res.fileSize}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Download Action */}
                      <div className="p-5 sm:p-6 pt-0 mt-auto flex items-center justify-between border-t border-stone-100">
                        <Button
                          onClick={() => handleDownload(res.id, res.title)}
                          className="rounded-full px-5 text-xs font-bold shadow-xs hover:scale-105 transition-all bg-[#2D060B] hover:bg-[#450A12] text-white"
                        >
                          <Download className="size-3.5 mr-1.5" />
                          <span>{downloadedIds[res.id] ? "Unduh Lagi" : "Unduh Modul"}</span>
                        </Button>
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="size-3.5 text-emerald-600" />
                          Gratis
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination Controls (Max 2 rows limit satisfied) */}
                {totalPages > 1 && (
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80">
                    <p className="text-xs text-stone-500">
                      Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong> (Maksimal 2 baris kartu per halaman)
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(p - 1, 1));
                          scrollToCatalog();
                        }}
                        className="rounded-xl text-xs font-bold disabled:opacity-40"
                      >
                        <ChevronLeft className="size-3.5 mr-1" />
                        <span>Sebelumnya</span>
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => {
                              setCurrentPage(page);
                              scrollToCatalog();
                            }}
                            className={cn(
                              "size-8 rounded-xl text-xs font-bold transition-all cursor-pointer",
                              currentPage === page
                                ? "bg-[#2D060B] text-white shadow-xs"
                                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                            )}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(p + 1, totalPages));
                          scrollToCatalog();
                        }}
                        className="rounded-xl text-xs font-bold disabled:opacity-40"
                      >
                        <span>Selanjutnya</span>
                        <ChevronRight className="size-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ============================================================
                 VIEW MODE 2: LIST / TABLE VIEW (Clean Tabular Layout)
                 Features book cover thumbnail, title, ringkasan, specs, & download
                 Allows more materials to be viewed and scanned at once
                 ============================================================ */
              <div className="space-y-4">
                <div className="bg-white rounded-3xl border border-stone-200/90 shadow-warm-xs overflow-hidden">
                  {/* Table Header (Desktop) */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3.5 bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    <div className="col-span-4">Modul & Sampul Buku</div>
                    <div className="col-span-5">Sasaran & Ringkasan Materi</div>
                    <div className="col-span-3 text-right">Spesifikasi & Unduh</div>
                  </div>

                  {/* List / Table Rows */}
                  <div className="divide-y divide-stone-100">
                    {paginatedResources.map((res) => (
                      <div
                        key={res.id}
                        className="p-5 sm:p-6 hover:bg-stone-50/80 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center group"
                      >
                        {/* Column 1: Book Image Thumbnail + Title */}
                        <div className="md:col-span-4 flex items-start gap-4">
                          {/* Realistic Book Cover Thumbnail */}
                          <div className="relative w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden shadow-md border border-stone-300 shrink-0 group-hover:scale-105 transition-transform">
                            <Image
                              src={res.coverImage}
                              alt={res.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                {res.targetAudience.split("(")[0].trim()}
                              </span>
                              {res.badge && (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded-md border border-amber-300">
                                  {res.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="font-sans text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                              {res.title}
                            </h4>
                            <p className="text-xs text-stone-500 font-medium line-clamp-1">
                              {res.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Column 2: Ringkasan / Synopsis */}
                        <div className="md:col-span-5 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block md:hidden">
                            Ringkasan Modul:
                          </span>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                            {res.description}
                          </p>
                        </div>

                        {/* Column 3: Specs & Download Button */}
                        <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                            <span>{res.sessions}</span>
                            <span>•</span>
                            <span>{res.pages}</span>
                            <span>•</span>
                            <span>{res.fileSize}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => handleDownload(res.id, res.title)}
                              size="sm"
                              className="rounded-full px-4 text-xs font-bold shadow-2xs hover:scale-105 transition-all bg-[#2D060B] hover:bg-[#450A12] text-white shrink-0"
                            >
                              <Download className="size-3 mr-1.5" />
                              <span>{downloadedIds[res.id] ? "Unduh Ulang" : "Unduh PDF"}</span>
                            </Button>
                            <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">
                              Gratis
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* List View Pagination if > 10 */}
                {totalPages > 1 && (
                  <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
                    <span>
                      Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(p - 1, 1));
                          scrollToCatalog();
                        }}
                        className="rounded-xl text-xs font-bold disabled:opacity-40"
                      >
                        Sebelumnya
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(p + 1, totalPages));
                          scrollToCatalog();
                        }}
                        className="rounded-xl text-xs font-bold disabled:opacity-40"
                      >
                        Selanjutnya
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            4.5 ZONA KHUSUS: PANDUAN PEMBINA & PEMIMPIN KTB (#mentor)
            Distinct header separating mentor/leader guides from participant sheets
            ============================================================ */}
        <section id="mentor" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7F2] via-amber-50/40 to-white border-t border-stone-200/90 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/70 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="size-3.5 text-amber-800" />
                  <span>Zona Khusus Pembina & Pemimpin KTB</span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Pedoman Khusus Pembuat Murid (Leader&apos;s Edition)
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Berbeda dari modul peserta biasa, panduan mentor memuat kunci penggalian induktif, lembar fasilitasi kelompok, panduan konseling teman sebaya, serta kiat mengatasi kebuntuan dalam kelompok kecil.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300/80 text-amber-950 text-xs max-w-sm">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <span>💡 Catatan Pembina:</span>
                </p>
                <p className="text-[11px] leading-relaxed">
                  Gunakan buku panduan ini sebagai pegangan pribadi saat mendampingi adik-adik PA di sekolah dan kampus.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-warm-xs hover:shadow-warm-md hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="size-11 rounded-2xl bg-[#2D060B] text-amber-300 flex items-center justify-center font-bold">
                    <BookOpen className="size-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                    Panduan Utama Mentor
                  </span>
                  <h3 className="font-sans text-base font-bold text-foreground">
                    Buku Saku Pemimpin KTB: Seni Melipatgandakan Murid
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    10 bab panduan langkah demi langkah memandu kelompok pemuridan, membangun keintiman persekutuan, dan melatih murid menjadi pembimbing generasi berikutnya.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">PDF • 44 Halaman</span>
                  <Button
                    size="sm"
                    onClick={() => handleDownload("mentor-guide-1", "Buku Saku Pemimpin KTB", "/documents/panduan-pemimpin-ktb.pdf")}
                    className="rounded-full px-4 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white"
                  >
                    <Download className="size-3 mr-1.5" />
                    <span>Unduh PDF</span>
                  </Button>
                </div>
              </Card>

              <Card className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-warm-xs hover:shadow-warm-md hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="size-11 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                    <Users className="size-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                    Klinik Pendampingan
                  </span>
                  <h3 className="font-sans text-base font-bold text-foreground">
                    Panduan Konseling Teman Sebaya bagi Pembina
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Prinsip mendengarkan secara empatik, batasan etika pastoral, kerahasiaan konseling, dan cara merujuk kasus berat ke konselor profesional.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">PDF • 32 Halaman</span>
                  <Button
                    size="sm"
                    onClick={() => handleDownload("mentor-guide-2", "Panduan Konseling Teman Sebaya", "/documents/panduan-pemimpin-ktb.pdf")}
                    className="rounded-full px-4 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white"
                  >
                    <Download className="size-3 mr-1.5" />
                    <span>Unduh PDF</span>
                  </Button>
                </div>
              </Card>

              <Card className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-warm-xs hover:shadow-warm-md hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="size-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                    <Layers className="size-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                    Metode Induktif
                  </span>
                  <h3 className="font-sans text-base font-bold text-foreground">
                    Pedoman Observasi, Interpretasi, & Aplikasi (OIA)
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Lembar kerja dan pertanyaan penuntun untuk menolong mentor menyusun bahan PA sendiri dari kitab-kitab Perjanjian Lama dan Perjanjian Baru.
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">PDF • 38 Halaman</span>
                  <Button
                    size="sm"
                    onClick={() => handleDownload("mentor-guide-3", "Pedoman OIA Induktif", "/documents/modul-murid-kritis.pdf")}
                    className="rounded-full px-4 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white"
                  >
                    <Download className="size-3 mr-1.5" />
                    <span>Unduh PDF</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. BESPOKE COLLABORATION PORTAL CARD (Custom Curriculum)
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90 relative">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE4] p-8 sm:p-12 border border-stone-300/80 shadow-warm-xs text-center space-y-6">
              <div className="size-14 rounded-2xl bg-[#2D060B] text-amber-300 mx-auto flex items-center justify-center shadow-warm-xs">
                <BookOpen className="size-7" />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Kolaborasi Penulisan & Kurikulum Khusus
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Rindukan Bahan Pendalaman Khusus untuk Komunitas Anda?
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Tim literatur dan pembinaan ESM terbuka menerima masukan kurikulum firman, pertanyaan doktrinal siswa, atau bekerja sama menyusun materi pembinaan khusus bagi persekutuan sekolah, kampus, dan gereja lokal Anda.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white">
                  <Link href="/kemitraan" className="flex items-center gap-2">
                    <span>Hubungi Tim Kurikulum ESM</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7 font-bold border-stone-300 text-stone-700 hover:bg-stone-100">
                  <Link href="/gabung">Gabung Kelompok KTB</Link>
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
