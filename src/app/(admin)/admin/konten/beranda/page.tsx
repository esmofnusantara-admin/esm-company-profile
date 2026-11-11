"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { Save, CheckCircle2, Loader2, Sparkles, Home, Layers, BarChart3, HelpCircle } from "lucide-react";

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
  subheadlineId: "Melatih siswa, mahasiswa, dan alumni untuk berakar dalam firman Tuhan, bertumbuh dalam komunitas murid, dan diutus ke tengah dunia kerja serta ladang misi.",
  subheadlineEn: "Training high school, university students, and alumni to be rooted in God's word, grow in disciple community, and be sent into the marketplace and mission fields.",
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
    descId: "Setiap kurikulum pembinaan, pemuridan pribadi, dan persekutuan berlandaskan kebenaran firman Allah yang ortodoks dan otoritatif.",
    descEn: "Every training curriculum, personal discipleship, and fellowship is rooted in orthodox, authoritative Scripture.",
    imageUrl: "",
  },
  {
    titleId: "Misional & Berdampak Luas",
    titleEn: "Missional & Broad Impact",
    subtitleId: "Bukan Menara Gading",
    subtitleEn: "Not an Ivory Tower",
    descId: "Mendorong generasi muda menjadi garam dan terang di sekolah, kampus, keluarga, hingga integritas dunia kerja profesional.",
    descEn: "Empowering young people to be salt and light in schools, campuses, families, and high-integrity professional fields.",
    imageUrl: "",
  },
  {
    titleId: "Komunitas Pemuridan Seumur Hidup",
    titleEn: "Lifelong Discipleship Community",
    subtitleId: "Relasi Erat Berakar",
    subtitleEn: "Deeply Rooted Relationships",
    descId: "Mendampingi perjalanan iman generasi dari bangku SMA (Explore), kampus (Encounter), hingga dunia kerja (Connect).",
    descEn: "Walking alongside their faith journey from high school (Explore), campus (Encounter), to workplace (Connect).",
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
  const [values, setValues] = useState<ValueCard[]>(defaultValues);
  const [stats, setStats] = useState<StatItem[]>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [savedHero, savedValues, savedStats] = await Promise.all([
          getSiteConfig<HeroData>("home_hero", defaultHero),
          getSiteConfig<ValueCard[]>("home_values", defaultValues),
          getSiteConfig<StatItem[]>("home_stats", defaultStats),
        ]);
        if (savedHero) setHero(savedHero);
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
            Sunting teks hero, media foto/video latar, nilai pokok, dan statistik dampak dalam 2 bahasa (ID & EN).
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

      {/* SECTION 1: HERO */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">1. Hero Section (Header Utama)</h2>
            <p className="text-xs text-muted-foreground">Bagian pertama yang dilihat pengunjung saat membuka website.</p>
          </div>
        </div>

        {/* Media Foto / Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/20 p-4 rounded-xl border border-border/60">
          <div>
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">
              Tipe Media Latar / Hero
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
                <span>Video (MP4 / YouTube)</span>
              </label>
            </div>
          </div>

          <MediaUploader
            label={hero.mediaType === "VIDEO" ? "Upload / Link Video Hero" : "Upload / Link Foto Hero"}
            value={hero.mediaUrl}
            onChange={(url) => setHero({ ...hero, mediaUrl: url })}
            folder="hero"
            accept={hero.mediaType === "VIDEO" ? "video" : "image"}
            helperText="Format yang disarankan: 1920x1080px atau video landscape."
          />
        </div>

        {/* Kicker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Kicker / Label Kecil (ID)</label>
            </div>
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Headline Utama (ID)</label>
            </div>
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-foreground">Subheadline Penjelas (ID)</label>
            </div>
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

      {/* SECTION 2: NILAI POKOK */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Layers className="size-3.5" />
            <span>3 PILAR UTAMA</span>
          </div>
          <h2 className="text-base font-bold text-foreground">2. Tiga Nilai Pokok (Core Values)</h2>
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

      {/* SECTION 3: STATISTIK DAMPAK */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <BarChart3 className="size-3.5" />
            <span>ANGKA DAMPAK</span>
          </div>
          <h2 className="text-base font-bold text-foreground">3. Statistik Dampak Pelayanan</h2>
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
