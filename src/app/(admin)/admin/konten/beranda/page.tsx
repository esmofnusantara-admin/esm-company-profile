"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  Save,
  CheckCircle2,
  Loader2,
  Sparkles,
  Home,
  Layers,
  BarChart3,
  Images,
  Film,
  Plus,
  Trash2,
  Flame,
  LayoutGrid,
} from "lucide-react";
import {
  HeroCardConfig,
  HeroCardSlide,
  HeroCardPillarItem,
  defaultHeroCardConfig,
} from "@/components/home/HeroVisualCard";

interface HeroData {
  kickerId: string;
  kickerEn: string;
  headlineId: string;
  headlineEn: string;
  subheadlineId: string;
  subheadlineEn: string;
  mediaType: "IMAGE" | "VIDEO";
  mediaUrl: string;
  primaryCtaTextId: string;
  primaryCtaTextEn: string;
  primaryCtaUrl: string;
  secondaryCtaTextId: string;
  secondaryCtaTextEn: string;
  secondaryCtaUrl: string;
}

interface ValueCard {
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  descId: string;
  descEn: string;
  imageUrl: string;
}

interface StatItem {
  number: string;
  labelId: string;
  labelEn: string;
}

const defaultHero: HeroData = {
  kickerId: "GERAKAN PEMURIDAN MISIONAL BAGI GENERASI MUDA",
  kickerEn: "MISSIONAL DISCIPLESHIP MOVEMENT FOR THE NEXT GENERATION",
  headlineId: "Bagi Kemuliaan Kristus dan Masa Depan Nusantara",
  headlineEn: "For Christ's Glory and the Future of Nusantara",
  subheadlineId:
    "Melatih siswa, mahasiswa, dan alumni untuk berakar dalam firman Tuhan, bertumbuh dalam komunitas murid, dan diutus ke tengah dunia kerja serta ladang misi.",
  subheadlineEn:
    "Training high school, university students, and alumni to be rooted in God's word, grow in disciple community, and be sent into the marketplace and mission fields.",
  mediaType: "IMAGE",
  mediaUrl: "",
  primaryCtaTextId: "Mulai Bergabung",
  primaryCtaTextEn: "Get Involved",
  primaryCtaUrl: "/pelayanan",
  secondaryCtaTextId: "Dukung Pelayanan",
  secondaryCtaTextEn: "Support Ministry",
  secondaryCtaUrl: "/kemitraan",
};

const defaultValues: ValueCard[] = [
  {
    titleId: "Alkitabiah & Berpusat pada Kristus",
    titleEn: "Biblical & Christ-Centered",
    subtitleId: "Dasar Pengajaran Kokoh",
    subtitleEn: "Firm Foundational Teaching",
    descId:
      "Setiap kurikulum pembinaan, pemuridan pribadi, dan persekutuan berlandaskan kebenaran firman Allah yang ortodoks dan otoritatif.",
    descEn:
      "Every training curriculum, personal discipleship, and fellowship is rooted in orthodox, authoritative Scripture.",
    imageUrl: "",
  },
  {
    titleId: "Misional & Berdampak Luas",
    titleEn: "Missional & Broad Impact",
    subtitleId: "Bukan Menara Gading",
    subtitleEn: "Not an Ivory Tower",
    descId:
      "Mendorong generasi muda menjadi garam dan terang di sekolah, kampus, keluarga, hingga integritas dunia kerja profesional.",
    descEn:
      "Empowering young people to be salt and light in schools, campuses, families, and high-integrity professional fields.",
    imageUrl: "",
  },
  {
    titleId: "Komunitas Pemuridan Seumur Hidup",
    titleEn: "Lifelong Discipleship Community",
    subtitleId: "Relasi Erat Berakar",
    subtitleEn: "Deeply Rooted Relationships",
    descId:
      "Mendampingi perjalanan iman generasi dari bangku SMA (Explore), kampus (Encounter), hingga dunia kerja (Connect).",
    descEn:
      "Walking alongside their faith journey from high school (Explore), campus (Encounter), to workplace (Connect).",
    imageUrl: "",
  },
];

const defaultStats: StatItem[] = [
  { number: "15+", labelId: "Tahun Pelayanan", labelEn: "Years of Ministry" },
  { number: "2", labelId: "Fokus Wilayah (Banten & Ternate)", labelEn: "Key Regions (Banten & Ternate)" },
  { number: "500+", labelId: "Murid & Alumni Dibina", labelEn: "Students & Alumni Discipled" },
  { number: "100+", labelId: "Keluarga & Mitra Misi", labelEn: "Mission Partners & Families" },
];

export default function AdminBerandaCMS() {
  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [heroCard, setHeroCard] = useState<HeroCardConfig>(defaultHeroCardConfig);
  const [values, setValues] = useState<ValueCard[]>(defaultValues);
  const [stats, setStats] = useState<StatItem[]>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeCardSubTab, setActiveCardSubTab] = useState<"mode" | "pillars" | "slider" | "video" | "image">("mode");

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [savedHero, savedHeroCard, savedValues, savedStats] = await Promise.all([
          getSiteConfig<HeroData>("home_hero", defaultHero),
          getSiteConfig<HeroCardConfig>("home_hero_card", defaultHeroCardConfig),
          getSiteConfig<ValueCard[]>("home_values", defaultValues),
          getSiteConfig<StatItem[]>("home_stats", defaultStats),
        ]);
        if (savedHero) setHero(savedHero);
        if (savedHeroCard) setHeroCard(savedHeroCard);
        if (savedValues) setValues(savedValues);
        if (savedStats) setStats(savedStats);
      } catch (err) {
        console.error("Gagal memuat konfigurasi beranda:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      await Promise.all([
        saveSiteConfig("home_hero", hero),
        saveSiteConfig("home_hero_card", heroCard),
        saveSiteConfig("home_values", values),
        saveSiteConfig("home_stats", stats),
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper Tambah Slide
  const handleAddSlide = () => {
    const newSlide: HeroCardSlide = {
      id: `slide-${Date.now()}`,
      imageUrl: "",
      titleId: "Judul Slide Foto Baru",
      titleEn: "New Slide Photo Title",
      captionId: "Deskripsi singkat foto kegiatan pemuridan.",
      captionEn: "Brief description of the ministry activity photo.",
    };
    setHeroCard({
      ...heroCard,
      slides: [...(heroCard.slides || []), newSlide],
    });
  };

  const handleRemoveSlide = (index: number) => {
    const updated = [...(heroCard.slides || [])];
    updated.splice(index, 1);
    setHeroCard({ ...heroCard, slides: updated });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Home className="size-3.5" />
            <span>KONTEN HALAMAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Halaman Beranda (Homepage)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sunting teks hero, kartu visual (pilar 3C, swipe foto, video), nilai pokok, dan statistik dampak.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : savedSuccess ? (
            <>
              <CheckCircle2 className="size-4 text-emerald-300" />
              <span>Tersimpan!</span>
            </>
          ) : (
            <>
              <Save className="size-4" />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Semua perubahan halaman beranda berhasil disimpan dan langsung aktif di website publik!</span>
        </div>
      )}

      {/* ========================================================
          SECTION 1: HERO UTAMA (TEKS & LATAR)
          ======================================================== */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">1. Hero Section (Header & Slogan Utama)</h2>
            <p className="text-xs text-muted-foreground">Bagian teks besar di sebelah kiri dan latar belakang hero.</p>
          </div>
        </div>

        {/* Media Foto / Video Latar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-xl border border-border/60">
          <div>
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">
              Tipe Media Latar Belakang Hero (Opsional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="mediaType"
                  value="IMAGE"
                  checked={hero.mediaType === "IMAGE"}
                  onChange={() => setHero({ ...hero, mediaType: "IMAGE" })}
                  className="text-primary focus:ring-primary"
                />
                <span>Foto / Gambar</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="radio"
                  name="mediaType"
                  value="VIDEO"
                  checked={hero.mediaType === "VIDEO"}
                  onChange={() => setHero({ ...hero, mediaType: "VIDEO" })}
                  className="text-primary focus:ring-primary"
                />
                <span>Video (MP4 / WebM)</span>
              </label>
            </div>
          </div>

          <MediaUploader
            label={hero.mediaType === "VIDEO" ? "Upload / Link Video Latar" : "Upload / Link Foto Latar"}
            value={hero.mediaUrl}
            onChange={(url) => setHero({ ...hero, mediaUrl: url })}
            folder="hero"
            accept={hero.mediaType === "VIDEO" ? "video" : "image"}
            helperText="Format disarankan: 1920x1080px (diberi opacity lembut di latar)."
          />
        </div>

        {/* Kicker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">Kicker / Label Kecil (ID)</label>
            <input
              type="text"
              value={hero.kickerId}
              onChange={(e) => setHero({ ...hero, kickerId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Kicker (EN)</label>
              <AutoTranslateButton
                sourceText={hero.kickerId}
                onTranslated={(txt) => setHero({ ...hero, kickerEn: txt })}
              />
            </div>
            <input
              type="text"
              value={hero.kickerEn}
              onChange={(e) => setHero({ ...hero, kickerEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">Headline Utama (ID)</label>
            <textarea
              rows={2}
              value={hero.headlineId}
              onChange={(e) => setHero({ ...hero, headlineId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Headline (EN)</label>
              <AutoTranslateButton
                sourceText={hero.headlineId}
                onTranslated={(txt) => setHero({ ...hero, headlineEn: txt })}
              />
            </div>
            <textarea
              rows={2}
              value={hero.headlineEn}
              onChange={(e) => setHero({ ...hero, headlineEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Subheadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">Subheadline Penjelas (ID)</label>
            <textarea
              rows={3}
              value={hero.subheadlineId}
              onChange={(e) => setHero({ ...hero, subheadlineId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Subheadline (EN)</label>
              <AutoTranslateButton
                sourceText={hero.subheadlineId}
                onTranslated={(txt) => setHero({ ...hero, subheadlineEn: txt })}
              />
            </div>
            <textarea
              rows={3}
              value={hero.subheadlineEn}
              onChange={(e) => setHero({ ...hero, subheadlineEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Tombol Aksi Utama (Primary CTA)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Teks ID"
                value={hero.primaryCtaTextId}
                onChange={(e) => setHero({ ...hero, primaryCtaTextId: e.target.value })}
                className="px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
              <input
                type="text"
                placeholder="Teks EN"
                value={hero.primaryCtaTextEn}
                onChange={(e) => setHero({ ...hero, primaryCtaTextEn: e.target.value })}
                className="px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <input
              type="text"
              placeholder="Tautan URL (contoh: /pelayanan)"
              value={hero.primaryCtaUrl}
              onChange={(e) => setHero({ ...hero, primaryCtaUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground block">Tombol Aksi Kedua (Secondary CTA)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Teks ID"
                value={hero.secondaryCtaTextId}
                onChange={(e) => setHero({ ...hero, secondaryCtaTextId: e.target.value })}
                className="px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
              <input
                type="text"
                placeholder="Teks EN"
                value={hero.secondaryCtaTextEn}
                onChange={(e) => setHero({ ...hero, secondaryCtaTextEn: e.target.value })}
                className="px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <input
              type="text"
              placeholder="Tautan URL (contoh: /kemitraan)"
              value={hero.secondaryCtaUrl}
              onChange={(e) => setHero({ ...hero, secondaryCtaUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 2: KARTU VISUAL HERO (TEKS 3C, SWIPE FOTO, & VIDEO)
          ======================================================== */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <LayoutGrid className="size-3.5" />
              <span>KARTU HIGHLIGHT HERO KANAN</span>
            </div>
            <h2 className="text-base font-bold text-foreground">
              2. Kartu Visual Hero (Pilar Teks, Swipe Foto, & Video)
            </h2>
            <p className="text-xs text-muted-foreground">
              Atur konten kartu di sisi kanan hero: teks pilar 3C, galeri swipe multi-foto, atau pemutar video.
            </p>
          </div>
        </div>

        {/* Subtabs Navigasi Pengaturan Kartu */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border">
          <button
            type="button"
            onClick={() => setActiveCardSubTab("mode")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCardSubTab === "mode" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pilih Mode Tampilan
          </button>
          <button
            type="button"
            onClick={() => setActiveCardSubTab("pillars")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCardSubTab === "pillars" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📋 Teks Pilar 3C
          </button>
          <button
            type="button"
            onClick={() => setActiveCardSubTab("slider")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCardSubTab === "slider" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🖼️ Swipe Foto ({heroCard.slides?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveCardSubTab("video")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCardSubTab === "video" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🎬 Video
          </button>
          <button
            type="button"
            onClick={() => setActiveCardSubTab("image")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCardSubTab === "image" ? "bg-primary text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📷 Foto Tunggal
          </button>
        </div>

        {/* SUBTAB 1: PILIH MODE TAMPILAN */}
        {activeCardSubTab === "mode" && (
          <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/10">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Mode Tampilan Kartu di Website Publik:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  id: "TABS",
                  title: "🔄 Tab Interaktif (Lengkap)",
                  desc: "Pengunjung dapat berpindah bebas antara Tab Pilar 3C, Swipe Foto, dan Video.",
                },
                {
                  id: "PILLARS",
                  title: "📋 Hanya Pilar Teks 3C",
                  desc: "Menampilkan kartu teks 3 pilar pemuridan (Explore, Encounter, Connect).",
                },
                {
                  id: "SLIDER",
                  title: "🖼️ Hanya Swipe Galeri",
                  desc: "Menampilkan carousel foto kegiatan yang bisa digeser (swipe).",
                },
                {
                  id: "VIDEO",
                  title: "🎬 Hanya Video",
                  desc: "Menampilkan pemutar video profil/gerakan langsung di hero.",
                },
                {
                  id: "IMAGE",
                  title: "📷 Hanya Foto Tunggal",
                  desc: "Menampilkan 1 foto dokumentasi utama dengan caption.",
                },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    heroCard.displayMode === m.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input
                      type="radio"
                      name="displayMode"
                      value={m.id}
                      checked={heroCard.displayMode === m.id}
                      onChange={() => setHeroCard({ ...heroCard, displayMode: m.id as any })}
                      className="mt-0.5 text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">{m.title}</span>
                      <span className="text-[11px] text-muted-foreground block mt-0.5 leading-snug">
                        {m.desc}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 2: KONTEN PILAR TEKS 3C */}
        {activeCardSubTab === "pillars" && (
          <div className="space-y-5 p-4 rounded-xl border border-border bg-muted/10">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Pengaturan Kartu Pilar Teks
            </h3>

            {/* Judul & Subjudul Kartu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Kartu (ID)</label>
                <input
                  type="text"
                  value={heroCard.titleId}
                  onChange={(e) => setHeroCard({ ...heroCard, titleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Judul Kartu (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.titleId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, titleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={heroCard.titleEn}
                  onChange={(e) => setHeroCard({ ...heroCard, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Subjudul Kartu (ID)</label>
                <input
                  type="text"
                  value={heroCard.subtitleId}
                  onChange={(e) => setHeroCard({ ...heroCard, subtitleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Subjudul (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.subtitleId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, subtitleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={heroCard.subtitleEn}
                  onChange={(e) => setHeroCard({ ...heroCard, subtitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Badge Status (ID)</label>
                <input
                  type="text"
                  value={heroCard.badgeTextId}
                  onChange={(e) => setHeroCard({ ...heroCard, badgeTextId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Badge Status (EN)</label>
                <input
                  type="text"
                  value={heroCard.badgeTextEn}
                  onChange={(e) => setHeroCard({ ...heroCard, badgeTextEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            {/* Daftar 3 Pilar */}
            <div className="space-y-4 pt-3 border-t border-border">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Item Pilar Pemuridan:
              </label>

              {heroCard.pillars?.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary">Pilar {idx + 1}</span>
                    <select
                      value={p.icon}
                      onChange={(e) => {
                        const updated = [...heroCard.pillars];
                        updated[idx].icon = e.target.value as any;
                        setHeroCard({ ...heroCard, pillars: updated });
                      }}
                      className="px-2 py-1 text-xs rounded-lg border border-border bg-background"
                    >
                      <option value="compass">Ikon Kompas (Explore)</option>
                      <option value="graduation">Ikon Toga (Encounter)</option>
                      <option value="briefcase">Ikon Koper (Connect)</option>
                      <option value="flame">Ikon Api</option>
                      <option value="heart">Ikon Kasih</option>
                      <option value="users">Ikon Komunitas</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-foreground block mb-1">Judul Pilar (ID)</label>
                      <input
                        type="text"
                        value={p.titleId}
                        onChange={(e) => {
                          const updated = [...heroCard.pillars];
                          updated[idx].titleId = e.target.value;
                          setHeroCard({ ...heroCard, pillars: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-foreground">Judul Pilar (EN)</label>
                        <AutoTranslateButton
                          sourceText={p.titleId}
                          onTranslated={(txt) => {
                            const updated = [...heroCard.pillars];
                            updated[idx].titleEn = txt;
                            setHeroCard({ ...heroCard, pillars: updated });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={p.titleEn}
                        onChange={(e) => {
                          const updated = [...heroCard.pillars];
                          updated[idx].titleEn = e.target.value;
                          setHeroCard({ ...heroCard, pillars: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-foreground block mb-1">Deskripsi Pilar (ID)</label>
                      <textarea
                        rows={2}
                        value={p.descId}
                        onChange={(e) => {
                          const updated = [...heroCard.pillars];
                          updated[idx].descId = e.target.value;
                          setHeroCard({ ...heroCard, pillars: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-foreground">Deskripsi Pilar (EN)</label>
                        <AutoTranslateButton
                          sourceText={p.descId}
                          onTranslated={(txt) => {
                            const updated = [...heroCard.pillars];
                            updated[idx].descEn = txt;
                            setHeroCard({ ...heroCard, pillars: updated });
                          }}
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={p.descEn}
                        onChange={(e) => {
                          const updated = [...heroCard.pillars];
                          updated[idx].descEn = e.target.value;
                          setHeroCard({ ...heroCard, pillars: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-border">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Teks Footer CTA (ID)</label>
                <input
                  type="text"
                  value={heroCard.ctaTextId}
                  onChange={(e) => setHeroCard({ ...heroCard, ctaTextId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Teks Footer CTA (EN)</label>
                <input
                  type="text"
                  value={heroCard.ctaTextEn}
                  onChange={(e) => setHeroCard({ ...heroCard, ctaTextEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: SWIPE FOTO CAROUSEL */}
        {activeCardSubTab === "slider" && (
          <div className="space-y-5 p-4 rounded-xl border border-border bg-muted/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Daftar Slide Foto Swipe
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Foto-foto ini dapat di-swipe ke kiri & kanan oleh pengunjung website.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroCard.autoSlide}
                    onChange={(e) => setHeroCard({ ...heroCard, autoSlide: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span>Auto-Slide Otomatis</span>
                </label>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-muted-foreground">Interval:</span>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={heroCard.slideIntervalSeconds || 5}
                    onChange={(e) =>
                      setHeroCard({ ...heroCard, slideIntervalSeconds: Number(e.target.value) || 5 })
                    }
                    className="w-14 px-2 py-1 text-xs rounded-lg border border-border bg-background text-center font-bold"
                  />
                  <span className="text-muted-foreground">detik</span>
                </div>
              </div>
            </div>

            {/* List of Slides */}
            <div className="space-y-4">
              {heroCard.slides?.map((slide, idx) => (
                <div key={slide.id || idx} className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-xs font-bold text-primary">Slide Foto #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSlide(idx)}
                      className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="size-3.5" />
                      <span>Hapus Slide</span>
                    </button>
                  </div>

                  <MediaUploader
                    label="Unggah / Link Foto Slide"
                    value={slide.imageUrl}
                    onChange={(url) => {
                      const updated = [...heroCard.slides];
                      updated[idx].imageUrl = url;
                      setHeroCard({ ...heroCard, slides: updated });
                    }}
                    folder="hero-slides"
                    accept="image"
                    helperText="Disarankan rasio landscape 16:9 atau 4:3."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-foreground block mb-1">Judul Foto (ID)</label>
                      <input
                        type="text"
                        value={slide.titleId || ""}
                        onChange={(e) => {
                          const updated = [...heroCard.slides];
                          updated[idx].titleId = e.target.value;
                          setHeroCard({ ...heroCard, slides: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-foreground">Judul Foto (EN)</label>
                        <AutoTranslateButton
                          sourceText={slide.titleId || ""}
                          onTranslated={(txt) => {
                            const updated = [...heroCard.slides];
                            updated[idx].titleEn = txt;
                            setHeroCard({ ...heroCard, slides: updated });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={slide.titleEn || ""}
                        onChange={(e) => {
                          const updated = [...heroCard.slides];
                          updated[idx].titleEn = e.target.value;
                          setHeroCard({ ...heroCard, slides: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-foreground block mb-1">Caption / Keterangan (ID)</label>
                      <input
                        type="text"
                        value={slide.captionId || ""}
                        onChange={(e) => {
                          const updated = [...heroCard.slides];
                          updated[idx].captionId = e.target.value;
                          setHeroCard({ ...heroCard, slides: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-foreground">Caption (EN)</label>
                        <AutoTranslateButton
                          sourceText={slide.captionId || ""}
                          onTranslated={(txt) => {
                            const updated = [...heroCard.slides];
                            updated[idx].captionEn = txt;
                            setHeroCard({ ...heroCard, slides: updated });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        value={slide.captionEn || ""}
                        onChange={(e) => {
                          const updated = [...heroCard.slides];
                          updated[idx].captionEn = e.target.value;
                          setHeroCard({ ...heroCard, slides: updated });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddSlide}
              className="w-full py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-xs font-bold text-primary flex items-center justify-center gap-1.5 transition-colors bg-card hover:bg-muted/30"
            >
              <Plus className="size-4" />
              <span>Tambah Slide Foto Baru</span>
            </button>
          </div>
        )}

        {/* SUBTAB 4: KONTEN VIDEO */}
        {activeCardSubTab === "video" && (
          <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/10">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Pengaturan Pemutar Video Hero
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaUploader
                label="Unggah File Video (MP4) atau Tempel URL YouTube"
                value={heroCard.videoUrl}
                onChange={(url) => setHeroCard({ ...heroCard, videoUrl: url })}
                folder="hero-video"
                accept="video"
                helperText="Mendukung URL YouTube (https://www.youtube.com/watch?v=...) atau direct video MP4."
              />

              <MediaUploader
                label="Upload Poster / Thumbnail Video"
                value={heroCard.videoThumbnail}
                onChange={(url) => setHeroCard({ ...heroCard, videoThumbnail: url })}
                folder="hero-video"
                accept="image"
                helperText="Gambar yang ditampilkan sebelum video diputar."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Video (ID)</label>
                <input
                  type="text"
                  value={heroCard.videoTitleId}
                  onChange={(e) => setHeroCard({ ...heroCard, videoTitleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Judul Video (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.videoTitleId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, videoTitleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={heroCard.videoTitleEn}
                  onChange={(e) => setHeroCard({ ...heroCard, videoTitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Keterangan Video (ID)</label>
                <textarea
                  rows={2}
                  value={heroCard.videoCaptionId}
                  onChange={(e) => setHeroCard({ ...heroCard, videoCaptionId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Keterangan Video (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.videoCaptionId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, videoCaptionEn: txt })}
                  />
                </div>
                <textarea
                  rows={2}
                  value={heroCard.videoCaptionEn}
                  onChange={(e) => setHeroCard({ ...heroCard, videoCaptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: KONTEN FOTO TUNGGAL */}
        {activeCardSubTab === "image" && (
          <div className="space-y-4 p-4 rounded-xl border border-border bg-muted/10">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Pengaturan Foto Tunggal
            </h3>

            <MediaUploader
              label="Unggah / Link Foto Tunggal"
              value={heroCard.singleImageUrl}
              onChange={(url) => setHeroCard({ ...heroCard, singleImageUrl: url })}
              folder="hero-single"
              accept="image"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Foto (ID)</label>
                <input
                  type="text"
                  value={heroCard.singleImageTitleId}
                  onChange={(e) => setHeroCard({ ...heroCard, singleImageTitleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Judul Foto (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.singleImageTitleId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, singleImageTitleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={heroCard.singleImageTitleEn}
                  onChange={(e) => setHeroCard({ ...heroCard, singleImageTitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Caption / Keterangan (ID)</label>
                <textarea
                  rows={2}
                  value={heroCard.singleImageCaptionId}
                  onChange={(e) => setHeroCard({ ...heroCard, singleImageCaptionId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Caption (EN)</label>
                  <AutoTranslateButton
                    sourceText={heroCard.singleImageCaptionId}
                    onTranslated={(txt) => setHeroCard({ ...heroCard, singleImageCaptionEn: txt })}
                  />
                </div>
                <textarea
                  rows={2}
                  value={heroCard.singleImageCaptionEn}
                  onChange={(e) => setHeroCard({ ...heroCard, singleImageCaptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          SECTION 3: NILAI POKOK
          ======================================================== */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Layers className="size-3.5" />
            <span>3 PILAR UTAMA</span>
          </div>
          <h2 className="text-base font-bold text-foreground">3. Tiga Nilai Pokok (Core Values)</h2>
          <p className="text-xs text-muted-foreground">3 kartu pondasi pelayanan di bawah hero beranda.</p>
        </div>

        <div className="space-y-6">
          {values.map((val, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
              <div className="flex items-center justify-between font-bold text-xs text-foreground">
                <span>Kartu {idx + 1}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Judul (ID)</label>
                  <input
                    type="text"
                    value={val.titleId}
                    onChange={(e) => {
                      const updated = [...values];
                      updated[idx].titleId = e.target.value;
                      setValues(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-foreground">Judul (EN)</label>
                    <AutoTranslateButton
                      sourceText={val.titleId}
                      onTranslated={(txt) => {
                        const updated = [...values];
                        updated[idx].titleEn = txt;
                        setValues(updated);
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={val.titleEn}
                    onChange={(e) => {
                      const updated = [...values];
                      updated[idx].titleEn = e.target.value;
                      setValues(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Deskripsi (ID)</label>
                  <textarea
                    rows={2}
                    value={val.descId}
                    onChange={(e) => {
                      const updated = [...values];
                      updated[idx].descId = e.target.value;
                      setValues(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                    <AutoTranslateButton
                      sourceText={val.descId}
                      onTranslated={(txt) => {
                        const updated = [...values];
                        updated[idx].descEn = txt;
                        setValues(updated);
                      }}
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={val.descEn}
                    onChange={(e) => {
                      const updated = [...values];
                      updated[idx].descEn = e.target.value;
                      setValues(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <MediaUploader
                label="Foto / Ikon Ilustrasi (Opsional)"
                value={val.imageUrl}
                onChange={(url) => {
                  const updated = [...values];
                  updated[idx].imageUrl = url;
                  setValues(updated);
                }}
                folder="values"
                accept="image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          SECTION 4: STATISTIK DAMPAK
          ======================================================== */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <BarChart3 className="size-3.5" />
            <span>ANGKA DAMPAK</span>
          </div>
          <h2 className="text-base font-bold text-foreground">4. Statistik Dampak Pelayanan</h2>
          <p className="text-xs text-muted-foreground">4 angka statistik utama yang merefleksikan karya pelayanan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((st, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Angka / Metrik</label>
                <input
                  type="text"
                  value={st.number}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx].number = e.target.value;
                    setStats(updated);
                  }}
                  className="w-full px-3 py-2 text-xs font-bold text-primary rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Label Penjelasan (ID)</label>
                <input
                  type="text"
                  value={st.labelId}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx].labelId = e.target.value;
                    setStats(updated);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Label (EN)</label>
                  <AutoTranslateButton
                    sourceText={st.labelId}
                    onTranslated={(txt) => {
                      const updated = [...stats];
                      updated[idx].labelEn = txt;
                      setStats(updated);
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={st.labelEn}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[idx].labelEn = e.target.value;
                    setStats(updated);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
