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
  BarChart3,
  Video,
  Layers,
  Heart,
  Eye,
  Play,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

// ==========================================
// INTERFACES UNTUK HOMEPAGE CMS
// ==========================================

export interface HeroData {
  kickerId: string;
  kickerEn: string;
  headlineId: string;
  headlineEn: string;
  subheadlineId: string;
  subheadlineEn: string;
  primaryCtaTextId: string;
  primaryCtaTextEn: string;
  primaryCtaUrl: string;
  secondaryCtaTextId: string;
  secondaryCtaTextEn: string;
  secondaryCtaUrl: string;
}

export interface StatItem {
  number: string;
  labelId: string;
  labelEn: string;
}

export interface WhyEsmData {
  kickerId: string;
  kickerEn: string;
  headlineId: string;
  headlineEn: string;
  descriptionId: string;
  descriptionEn: string;
  historyLinkTextId: string;
  historyLinkTextEn: string;
  historyLinkUrl: string;

  // Video Company Profile
  videoBadgeId: string;
  videoBadgeEn: string;
  videoTitleId: string;
  videoTitleEn: string;
  videoSubtitleId: string;
  videoSubtitleEn: string;
  videoDuration: string;
  videoThumbnail: string;
  videoUrl: string;
  footerTextId: string;
  footerTextEn: string;
  footerCtaTextId: string;
  footerCtaTextEn: string;
}

export interface CommunityItem {
  stageId: string;
  stageEn: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  linkTextId: string;
  linkTextEn: string;
  linkUrl: string;
}

export interface CommunitiesData {
  kickerId: string;
  kickerEn: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  explore: CommunityItem;
  encounter: CommunityItem;
  connect: CommunityItem;
}

export interface CtaCardData {
  badgeId: string;
  badgeEn: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  primaryCtaTextId: string;
  primaryCtaTextEn: string;
  primaryCtaUrl: string;
  secondaryCtaTextId: string;
  secondaryCtaTextEn: string;
  secondaryCtaUrl: string;
}

// ==========================================
// DEFAULT VALUES (SYNCHRONIZED WITH PUBLIC)
// ==========================================

const defaultHero: HeroData = {
  kickerId: "GERAKAN PEMURIDAN MISIONAL BAGI GENERASI MUDA",
  kickerEn: "MISSIONAL DISCIPLESHIP MOVEMENT FOR THE NEXT GENERATION",
  headlineId: "Bagi Kemuliaan Kristus dan Masa Depan Nusantara",
  headlineEn: "For Christ's Glory and the Future of Nusantara",
  subheadlineId:
    "Melatih siswa, mahasiswa, dan alumni untuk berakar dalam firman Tuhan, bertumbuh dalam komunitas murid, dan diutus ke tengah dunia kerja serta ladang misi.",
  subheadlineEn:
    "Training high school, university students, and alumni to be rooted in God's word, grow in disciple community, and be sent into the marketplace and mission fields.",
  primaryCtaTextId: "Mulai Bergabung",
  primaryCtaTextEn: "Get Involved",
  primaryCtaUrl: "/pelayanan",
  secondaryCtaTextId: "Dukung Pelayanan",
  secondaryCtaTextEn: "Support Ministry",
  secondaryCtaUrl: "/kemitraan",
};

const defaultStats: StatItem[] = [
  { number: "15+", labelId: "Tahun Pelayanan", labelEn: "Years of Ministry" },
  { number: "2", labelId: "Fokus Wilayah (Banten & Ternate)", labelEn: "Key Regions (Banten & Ternate)" },
  { number: "500+", labelId: "Murid & Alumni Dibina", labelEn: "Students & Alumni Discipled" },
  { number: "100+", labelId: "Keluarga & Mitra Misi", labelEn: "Mission Partners & Families" },
];

const defaultWhyEsm: WhyEsmData = {
  kickerId: "MENGAPA ESM HADIR?",
  kickerEn: "WHY ESM EXISTS?",
  headlineId: "Sebagai jembatan atas jurang antara pemuridan dan misi yang terdikotomi.",
  headlineEn: "Bridging the chasm between dichotomized discipleship and mission.",
  descriptionId:
    "Kami meyakini pemuridan dan misi bukan dua jalan terpisah. Keduanya bergandengan tangan: murid Kristus hidup di tengah dunia, menghadirkan kebenaran, kabar baik, dan keadilan Allah ke dalamnya.",
  descriptionEn:
    "We believe discipleship and mission are not two separate paths. They walk hand in hand: disciples of Christ live in the world, bringing God's truth, good news, and justice into it.",
  historyLinkTextId: "Pelajari Sejarah & Panggilan Awal",
  historyLinkTextEn: "Learn Our History & Calling",
  historyLinkUrl: "/tentang-kami",
  videoBadgeId: "VIDEO COMPANY PROFILE ESM",
  videoBadgeEn: "ESM COMPANY PROFILE VIDEO",
  videoTitleId: "Mengenal Hati & Api Gerakan Pemuridan",
  videoTitleEn: "Knowing the Heart & Fire of the Discipleship Movement",
  videoSubtitleId:
    "Dinamika pembinaan siswa sekolah, mahasiswa kampus, dan perintisan misi di Banten serta Maluku Utara.",
  videoSubtitleEn:
    "Dynamics of nurturing high school and university students, and mission pioneering in Banten and North Maluku.",
  videoDuration: "03:45 • Profil ESM",
  videoThumbnail: "/uploads/hero/kemitraan_hero.jpg",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  footerTextId: "Dipelajari & disaksikan oleh ratusan siswa, pembina, serta sahabat misi di Nusantara",
  footerTextEn: "Learned & witnessed by hundreds of students, mentors, and mission partners across Nusantara",
  footerCtaTextId: "Tonton Video",
  footerCtaTextEn: "Watch Video",
};

const defaultCommunities: CommunitiesData = {
  kickerId: "MATA RANTAI PEMURIDAN",
  kickerEn: "DISCIPLESHIP CHAIN",
  titleId: "Tiga Komunitas, Satu Kegerakan",
  titleEn: "Three Communities, One Movement",
  subtitleId:
    "Menemani perjalanan iman dari bangku sekolah, ruang kuliah kampus, hingga dunia kerja dan keluarga.",
  subtitleEn:
    "Accompanying the journey of faith from school benches, university halls, to marketplace and family.",
  explore: {
    stageId: "Tahap 01 • Siswa Sekolah",
    stageEn: "Stage 01 • High School Students",
    titleId: "Explore",
    titleEn: "Explore",
    descId:
      "Menemani remaja SMP & SMA mengenal Kristus secara personal, membangun ketahanan iman terhadap arus zaman, dan menjadi saksi di lingkungan sekolah.",
    descEn:
      "Walking alongside junior & senior high students discovering Christ personally, building faith resilience, and witnessing in school.",
    linkTextId: "Pelajari Program Explore",
    linkTextEn: "Explore the Program",
    linkUrl: "/pelayanan/explore",
  },
  encounter: {
    stageId: "Tahap 02 • Mahasiswa Kampus",
    stageEn: "Stage 02 • University Students",
    titleId: "Encounter",
    titleEn: "Encounter",
    descId:
      "Membangun komunitas persekutuan mahasiswa yang kritis, berakar pada teologi Alkitab, serta aktif menggarami iklim intelektual di Banten dan Ternate.",
    descEn:
      "Building robust, discerning campus fellowship communities rooted in biblical theology and salting the intellectual climate in Banten and Ternate.",
    linkTextId: "Pelajari Program Encounter",
    linkTextEn: "Explore the Program",
    linkUrl: "/pelayanan/encounter",
  },
  connect: {
    stageId: "Tahap 03 • Alumni & Profesi",
    stageEn: "Stage 03 • Alumni & Marketplace",
    titleId: "Connect",
    titleEn: "Connect",
    descId:
      "Wadah bagi kaum profesional dan alumni untuk saling meneguhkan integritas iman, mentoring adik-adik, serta mengutus dampak Kerajaan Allah di marketplace.",
    descEn:
      "A space for young professionals and alumni to sharpen faith integrity, mentor junior students, and advance God's Kingdom in the marketplace.",
    linkTextId: "Pelajari Program Connect",
    linkTextEn: "Explore the Program",
    linkUrl: "/pelayanan/connect",
  },
};

const defaultCtaCard: CtaCardData = {
  badgeId: "Kemitraan & Perjalanan Misi",
  badgeEn: "Partnership & Mission Journey",
  titleId: "Setiap Murid yang Bertumbuh Dimulai dari Keberanian Melangkah.",
  titleEn: "Every Growing Disciple Begins with the Courage to Step Forward.",
  descId:
    "Baik sebagai siswa, mahasiswa, mentor alumni, maupun mitra donatur, setiap dukungan Anda menghidupkan api pelayanan di Tanah Jawara (Banten) dan Kota Rempah (Ternate).",
  descEn:
    "Whether as a student, university undergrad, alumni mentor, or donor partner, every support of yours rekindles the flame of ministry in Banten and Ternate.",
  primaryCtaTextId: "Dukung Misi (Kemitraan Donasi)",
  primaryCtaTextEn: "Support the Mission (Donations)",
  primaryCtaUrl: "/kemitraan",
  secondaryCtaTextId: "Gabung Kelompok Pemuridan",
  secondaryCtaTextEn: "Join Discipleship Group",
  secondaryCtaUrl: "/gabung",
};

export default function AdminBerandaCMS() {
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "whyEsm" | "communities" | "cta">("whyEsm");

  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [stats, setStats] = useState<StatItem[]>(defaultStats);
  const [whyEsm, setWhyEsm] = useState<WhyEsmData>(defaultWhyEsm);
  const [communities, setCommunities] = useState<CommunitiesData>(defaultCommunities);
  const [ctaCard, setCtaCard] = useState<CtaCardData>(defaultCtaCard);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [savedHero, savedStats, savedWhyEsm, savedCommunities, savedCta] = await Promise.all([
          getSiteConfig<HeroData>("home_hero", defaultHero),
          getSiteConfig<StatItem[]>("home_stats", defaultStats),
          getSiteConfig<WhyEsmData>("home_why_esm", defaultWhyEsm),
          getSiteConfig<CommunitiesData>("home_communities", defaultCommunities),
          getSiteConfig<CtaCardData>("home_cta", defaultCtaCard),
        ]);
        if (savedHero) setHero(savedHero);
        if (savedStats) setStats(savedStats);
        if (savedWhyEsm) setWhyEsm(savedWhyEsm);
        if (savedCommunities) setCommunities(savedCommunities);
        if (savedCta) setCtaCard(savedCta);
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
        saveSiteConfig("home_stats", stats),
        saveSiteConfig("home_why_esm", whyEsm),
        saveSiteConfig("home_communities", communities),
        saveSiteConfig("home_cta", ctaCard),
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan perubahan ke database.");
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
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Home className="size-3.5" />
            <span>KONTEN WEBSITE PUBLIK</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Halaman Beranda (Homepage)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sesuaikan teks hero, 4 statistik dampak, narasi & video profil gerakan, serta 3 komunitas pelayanan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted/30 transition-all shadow-xs"
          >
            <Eye className="size-3.5 text-muted-foreground" />
            <span>Pratinjau Web</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
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
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in-50">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Semua perubahan konten beranda berhasil disimpan ke database dan langsung aktif di website publik!</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("whyEsm")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "whyEsm"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Video className="size-3.5" />
          <span>3. Mengapa ESM Hadir & Video</span>
          <span className="text-[10px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded-full font-black">
            Aktif
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "hero"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Home className="size-3.5" />
          <span>1. Hero Utama</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("stats")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "stats"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <BarChart3 className="size-3.5" />
          <span>2. Angka Dampak (4 Metrik)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("communities")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "communities"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Layers className="size-3.5" />
          <span>4. Tiga Komunitas (3C)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cta")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "cta"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Heart className="size-3.5" />
          <span>5. Ajakan Kemitraan</span>
        </button>
      </div>

      {/* ========================================================
          TAB 3: MENGAPA ESM HADIR? & VIDEO PROFIL GERAKAN
          ======================================================== */}
      {activeTab === "whyEsm" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-3">
            <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Bagian ini mengontrol Section 3 di Beranda:</p>
              <p className="text-stone-600 mt-0.5">
                Kolom kiri menampilkan teks narasi visi & panggilan, sedangkan kolom kanan menampilkan kartu pemutar Video Company Profile ESM.
              </p>
            </div>
          </div>

          {/* Kolom Kiri: Narasi Panggilan */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5 shadow-warm-sm">
            <div className="border-b border-border pb-3">
              <h2 className="text-sm font-bold text-foreground">A. Narasi Visi (Kolom Kiri)</h2>
              <p className="text-xs text-muted-foreground">Label kecil, judul utama berani, dan paragraf penjelas gerakan.</p>
            </div>

            {/* Kicker Badge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Badge Kicker (ID)</label>
                <input
                  type="text"
                  value={whyEsm.kickerId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, kickerId: e.target.value })}
                  placeholder="MENGAPA ESM HADIR?"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Badge Kicker (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.kickerId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, kickerEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={whyEsm.kickerEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, kickerEn: e.target.value })}
                  placeholder="WHY ESM EXISTS?"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Headline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">
                  Headline Utama (ID) <span className="text-stone-400 font-normal">(Kata &ldquo;pemuridan&rdquo; dan &ldquo;misi&rdquo; otomatis di-highlight)</span>
                </label>
                <textarea
                  rows={2}
                  value={whyEsm.headlineId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, headlineId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Headline Utama (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.headlineId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, headlineEn: txt })}
                  />
                </div>
                <textarea
                  rows={2}
                  value={whyEsm.headlineEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, headlineEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Narasi (ID)</label>
                <textarea
                  rows={3}
                  value={whyEsm.descriptionId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, descriptionId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Deskripsi Narasi (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.descriptionId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, descriptionEn: txt })}
                  />
                </div>
                <textarea
                  rows={3}
                  value={whyEsm.descriptionEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* History Link Button */}
            <div className="pt-2 border-t border-border/60 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Teks Tautan Sejarah (ID)</label>
                <input
                  type="text"
                  value={whyEsm.historyLinkTextId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, historyLinkTextId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Teks Tautan (EN)</label>
                <input
                  type="text"
                  value={whyEsm.historyLinkTextEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, historyLinkTextEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Tujuan URL</label>
                <input
                  type="text"
                  value={whyEsm.historyLinkUrl}
                  onChange={(e) => setWhyEsm({ ...whyEsm, historyLinkUrl: e.target.value })}
                  placeholder="/tentang-kami"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Video Company Profile Card */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-5 shadow-warm-sm">
            <div className="border-b border-border pb-3">
              <h2 className="text-sm font-bold text-foreground">B. Kartu Video Profil Gerakan (Kolom Kanan)</h2>
              <p className="text-xs text-muted-foreground">
                Thumbnail video, judul, durasi, tautan YouTube/MP4, dan teks footer bar.
              </p>
            </div>

            {/* Video Link & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-foreground block mb-1">
                  URL Video YouTube / Video Publik
                </label>
                <input
                  type="text"
                  value={whyEsm.videoUrl}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Bisa menggunakan format link YouTube standar (watch?v=...), youtu.be, atau embed.
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Badge Durasi Video</label>
                <input
                  type="text"
                  value={whyEsm.videoDuration}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoDuration: e.target.value })}
                  placeholder="03:45 • Profil ESM"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <MediaUploader
              label="Thumbnail Sampul Video"
              value={whyEsm.videoThumbnail}
              onChange={(url) => setWhyEsm({ ...whyEsm, videoThumbnail: url })}
              folder="hero"
              accept="image"
              helperText="Format disarankan: Foto 16:9 lanskap (1920x1080px). Digunakan sebagai latar pemutar video."
            />

            {/* Badge & Title Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Badge Video (ID)</label>
                <input
                  type="text"
                  value={whyEsm.videoBadgeId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoBadgeId: e.target.value })}
                  placeholder="VIDEO COMPANY PROFILE ESM"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Badge Video (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.videoBadgeId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, videoBadgeEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={whyEsm.videoBadgeEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoBadgeEn: e.target.value })}
                  placeholder="ESM COMPANY PROFILE VIDEO"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Video (ID)</label>
                <input
                  type="text"
                  value={whyEsm.videoTitleId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoTitleId: e.target.value })}
                  placeholder="Mengenal Hati & Api Gerakan Pemuridan"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-semibold"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Judul Video (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.videoTitleId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, videoTitleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={whyEsm.videoTitleEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoTitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-semibold"
                />
              </div>
            </div>

            {/* Subtitle Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Keterangan Singkat Video (ID)</label>
                <textarea
                  rows={2}
                  value={whyEsm.videoSubtitleId}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoSubtitleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Keterangan Singkat Video (EN)</label>
                  <AutoTranslateButton
                    sourceText={whyEsm.videoSubtitleId}
                    onTranslated={(txt) => setWhyEsm({ ...whyEsm, videoSubtitleEn: txt })}
                  />
                </div>
                <textarea
                  rows={2}
                  value={whyEsm.videoSubtitleEn}
                  onChange={(e) => setWhyEsm({ ...whyEsm, videoSubtitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            {/* Footer Bar Under Video */}
            <div className="pt-2 border-t border-border/60 space-y-4">
              <label className="text-xs font-bold text-foreground block">
                Bar Informasi di Bawah Video Card
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">Teks Footer (ID)</label>
                  <input
                    type="text"
                    value={whyEsm.footerTextId}
                    onChange={(e) => setWhyEsm({ ...whyEsm, footerTextId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-muted-foreground">Teks Footer (EN)</label>
                    <AutoTranslateButton
                      sourceText={whyEsm.footerTextId}
                      onTranslated={(txt) => setWhyEsm({ ...whyEsm, footerTextEn: txt })}
                    />
                  </div>
                  <input
                    type="text"
                    value={whyEsm.footerTextEn}
                    onChange={(e) => setWhyEsm({ ...whyEsm, footerTextEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">Teks Tombol Tonton (ID)</label>
                  <input
                    type="text"
                    value={whyEsm.footerCtaTextId}
                    onChange={(e) => setWhyEsm({ ...whyEsm, footerCtaTextId: e.target.value })}
                    placeholder="Tonton Video"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground block mb-1">Teks Tombol Tonton (EN)</label>
                  <input
                    type="text"
                    value={whyEsm.footerCtaTextEn}
                    onChange={(e) => setWhyEsm({ ...whyEsm, footerCtaTextEn: e.target.value })}
                    placeholder="Watch Video"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 1: HERO UTAMA (HEADER & SLOGAN)
          ======================================================== */}
      {activeTab === "hero" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground">1. Hero Section (Header & Slogan Utama)</h2>
            <p className="text-xs text-muted-foreground">
              Teks pembuka beranda berlatar gradien Crimson Ruby di bagian paling atas.
            </p>
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
      )}

      {/* ========================================================
          TAB 2: STATISTIK ANGKA DAMPAK (4 METRIK)
          ======================================================== */}
      {activeTab === "stats" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground">2. Statistik Dampak Pelayanan</h2>
            <p className="text-xs text-muted-foreground">
              4 angka statistik utama yang ditampilkan tepat di bawah Hero beranda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((st, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-muted-foreground">Metrik {idx + 1}</span>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Angka / Metrik (contoh: 15+, 500+)</label>
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
                    <label className="text-xs font-bold text-foreground">Label Penjelasan (EN)</label>
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
      )}

      {/* ========================================================
          TAB 4: TIGA KOMUNITAS (MATA RANTAI PEMURIDAN)
          ======================================================== */}
      {activeTab === "communities" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground">4. Tiga Komunitas Pelayanan (Mata Rantai Pemuridan)</h2>
            <p className="text-xs text-muted-foreground">
              Bagian 3 komunitas: Explore (Siswa), Encounter (Mahasiswa), dan Connect (Alumni).
            </p>
          </div>

          {/* Section Header */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/80 space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Judul Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Kicker (ID)</label>
                <input
                  type="text"
                  value={communities.kickerId}
                  onChange={(e) => setCommunities({ ...communities, kickerId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Kicker (EN)</label>
                <input
                  type="text"
                  value={communities.kickerEn}
                  onChange={(e) => setCommunities({ ...communities, kickerEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Utama (ID)</label>
                <input
                  type="text"
                  value={communities.titleId}
                  onChange={(e) => setCommunities({ ...communities, titleId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Utama (EN)</label>
                <input
                  type="text"
                  value={communities.titleEn}
                  onChange={(e) => setCommunities({ ...communities, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-bold"
                />
              </div>
            </div>
          </div>

          {/* 3 Komunitas Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Explore */}
            <div className="p-4 rounded-2xl border border-border bg-muted/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Komunitas 1 (Explore)
                </span>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Stage Pill (ID)</label>
                  <input
                    type="text"
                    value={communities.explore.stageId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        explore: { ...communities.explore, stageId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Deskripsi Singkat (ID)</label>
                  <textarea
                    rows={3}
                    value={communities.explore.descId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        explore: { ...communities.explore, descId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Teks Tautan (ID)</label>
                  <input
                    type="text"
                    value={communities.explore.linkTextId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        explore: { ...communities.explore, linkTextId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Encounter */}
            <div className="p-4 rounded-2xl border border-border bg-muted/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  Komunitas 2 (Encounter)
                </span>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Stage Pill (ID)</label>
                  <input
                    type="text"
                    value={communities.encounter.stageId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        encounter: { ...communities.encounter, stageId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Deskripsi Singkat (ID)</label>
                  <textarea
                    rows={3}
                    value={communities.encounter.descId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        encounter: { ...communities.encounter, descId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Teks Tautan (ID)</label>
                  <input
                    type="text"
                    value={communities.encounter.linkTextId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        encounter: { ...communities.encounter, linkTextId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="p-4 rounded-2xl border border-border bg-muted/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Komunitas 3 (Connect)
                </span>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Stage Pill (ID)</label>
                  <input
                    type="text"
                    value={communities.connect.stageId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        connect: { ...communities.connect, stageId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Deskripsi Singkat (ID)</label>
                  <textarea
                    rows={3}
                    value={communities.connect.descId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        connect: { ...communities.connect, descId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-foreground block mb-1">Teks Tautan (ID)</label>
                  <input
                    type="text"
                    value={communities.connect.linkTextId}
                    onChange={(e) =>
                      setCommunities({
                        ...communities,
                        connect: { ...communities.connect, linkTextId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: KARTU AJAKAN KEMITRAAN & MISI
          ======================================================== */}
      {activeTab === "cta" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h2 className="text-base font-bold text-foreground">5. Kartu Ajakan Kemitraan & Misi</h2>
            <p className="text-xs text-muted-foreground">
              Kartu warna Garnet gelap di atas bagian Tanya Jawab (FAQ) yang mengajak pengunjung bergabung atau mendukung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Badge Atas (ID)</label>
              <input
                type="text"
                value={ctaCard.badgeId}
                onChange={(e) => setCtaCard({ ...ctaCard, badgeId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Badge Atas (EN)</label>
                <AutoTranslateButton
                  sourceText={ctaCard.badgeId}
                  onTranslated={(txt) => setCtaCard({ ...ctaCard, badgeEn: txt })}
                />
              </div>
              <input
                type="text"
                value={ctaCard.badgeEn}
                onChange={(e) => setCtaCard({ ...ctaCard, badgeEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Judul Ajakan (ID)</label>
              <textarea
                rows={2}
                value={ctaCard.titleId}
                onChange={(e) => setCtaCard({ ...ctaCard, titleId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-bold"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Judul Ajakan (EN)</label>
                <AutoTranslateButton
                  sourceText={ctaCard.titleId}
                  onTranslated={(txt) => setCtaCard({ ...ctaCard, titleEn: txt })}
                />
              </div>
              <textarea
                rows={2}
                value={ctaCard.titleEn}
                onChange={(e) => setCtaCard({ ...ctaCard, titleEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Ajakan (ID)</label>
              <textarea
                rows={3}
                value={ctaCard.descId}
                onChange={(e) => setCtaCard({ ...ctaCard, descId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Deskripsi Ajakan (EN)</label>
                <AutoTranslateButton
                  sourceText={ctaCard.descId}
                  onTranslated={(txt) => setCtaCard({ ...ctaCard, descEn: txt })}
                />
              </div>
              <textarea
                rows={3}
                value={ctaCard.descEn}
                onChange={(e) => setCtaCard({ ...ctaCard, descEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/60">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Tombol Donasi / Kemitraan</label>
              <input
                type="text"
                placeholder="Teks ID"
                value={ctaCard.primaryCtaTextId}
                onChange={(e) => setCtaCard({ ...ctaCard, primaryCtaTextId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
              <input
                type="text"
                placeholder="Tautan URL"
                value={ctaCard.primaryCtaUrl}
                onChange={(e) => setCtaCard({ ...ctaCard, primaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">Tombol Gabung Komunitas</label>
              <input
                type="text"
                placeholder="Teks ID"
                value={ctaCard.secondaryCtaTextId}
                onChange={(e) => setCtaCard({ ...ctaCard, secondaryCtaTextId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
              <input
                type="text"
                placeholder="Tautan URL"
                value={ctaCard.secondaryCtaUrl}
                onChange={(e) => setCtaCard({ ...ctaCard, secondaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
