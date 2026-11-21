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
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  Check,
  MessageSquareQuote,
  User,
} from "lucide-react";
import Image from "next/image";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ, FAQInput } from "@/actions/faq";
import { FAQPage } from "@prisma/client";
import {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} from "@/actions/testimony";
import { type TestimonyInput } from "@/lib/testimonyData";

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
  primaryCtaTextId: "Pelajari Gerakan Kami",
  primaryCtaTextEn: "Discover Our Movement",
  primaryCtaUrl: "/tentang-kami",
  secondaryCtaTextId: "",
  secondaryCtaTextEn: "",
  secondaryCtaUrl: "",
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
  videoThumbnail: "",
  videoUrl: "",
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
  const [activeTab, setActiveTab] = useState<
    "hero" | "stats" | "whyEsm" | "communities" | "cta" | "faq" | "testimoni"
  >("hero");

  const [hero, setHero] = useState<HeroData>(defaultHero);
  const [stats, setStats] = useState<StatItem[]>(defaultStats);
  const [whyEsm, setWhyEsm] = useState<WhyEsmData>(defaultWhyEsm);
  const [communities, setCommunities] = useState<CommunitiesData>(defaultCommunities);
  const [ctaCard, setCtaCard] = useState<CtaCardData>(defaultCtaCard);

  // FAQ state for Beranda
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any | null>(null);
  const [isFaqSaving, setIsFaqSaving] = useState(false);
  const [faqForm, setFaqForm] = useState<FAQInput>({
    question: "",
    questionEn: "",
    answer: "",
    answerEn: "",
    sortOrder: 1,
    isActive: true,
    page: FAQPage.GENERAL,
  });

  // Testimony state for Beranda (Section 7)
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [isTestimonyModalOpen, setIsTestimonyModalOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<any | null>(null);
  const [isTestimonySaving, setIsTestimonySaving] = useState(false);
  const [testimonyForm, setTestimonyForm] = useState<TestimonyInput>({
    name: "",
    role: "",
    quote: "",
    quoteEn: "",
    photo: "",
    sortOrder: 1,
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const loadFaqs = async () => {
    try {
      const items = await getFAQs(FAQPage.GENERAL);
      setFaqs(items || []);
    } catch (e) {
      console.error("Gagal memuat FAQ beranda:", e);
    }
  };

  const loadTestimoniesData = async () => {
    try {
      const items = await getTestimonies();
      setTestimonies(items || []);
    } catch (e) {
      console.error("Gagal memuat testimoni beranda:", e);
    }
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [
          savedHero,
          savedStats,
          savedWhyEsm,
          savedCommunities,
          savedCta,
          loadedFaqs,
          loadedTst,
        ] = await Promise.all([
          getSiteConfig<HeroData>("home_hero", defaultHero),
          getSiteConfig<StatItem[]>("home_stats", defaultStats),
          getSiteConfig<WhyEsmData>("home_why_esm", defaultWhyEsm),
          getSiteConfig<CommunitiesData>("home_communities", defaultCommunities),
          getSiteConfig<CtaCardData>("home_cta", defaultCtaCard),
          getFAQs(FAQPage.GENERAL),
          getTestimonies(),
        ]);
        if (savedHero) setHero(savedHero);
        if (savedStats) setStats(savedStats);
        if (savedWhyEsm) setWhyEsm(savedWhyEsm);
        if (savedCommunities) setCommunities(savedCommunities);
        if (savedCta) setCtaCard(savedCta);
        if (loadedFaqs) setFaqs(loadedFaqs);
        if (loadedTst) setTestimonies(loadedTst);
      } catch (err) {
        console.error("Gagal memuat konfigurasi beranda:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      alert("Pertanyaan dan jawaban FAQ wajib diisi.");
      return;
    }

    const targetOrder = Number(faqForm.sortOrder) || 1;
    const duplicate = faqs.find(
      (f) => (editingFaq ? f.id !== editingFaq.id : true) && (f.sortOrder || 0) === targetOrder
    );
    if (duplicate) {
      alert(
        `Nomor urut #${targetOrder} sudah digunakan oleh pertanyaan: "${duplicate.question}". Nomor urutan harus unik dan tidak boleh sama.`
      );
      return;
    }

    setIsFaqSaving(true);
    try {
      if (editingFaq) {
        await updateFAQ(editingFaq.id, { ...faqForm, sortOrder: targetOrder });
      } else {
        await createFAQ({ ...faqForm, sortOrder: targetOrder, page: FAQPage.GENERAL });
      }
      setIsFaqModalOpen(false);
      setEditingFaq(null);
      const nextMax = faqs.reduce((max, f) => Math.max(max, f.sortOrder || 0), targetOrder);
      setFaqForm({
        question: "",
        questionEn: "",
        answer: "",
        answerEn: "",
        sortOrder: nextMax + 1,
        isActive: true,
        page: FAQPage.GENERAL,
      });
      await loadFaqs();
    } catch {
      alert("Gagal menyimpan pertanyaan FAQ.");
    } finally {
      setIsFaqSaving(false);
    }
  };

  const handleFaqDelete = async (id: string) => {
    if (!confirm("Hapus pertanyaan FAQ ini dari Beranda?")) return;
    try {
      await deleteFAQ(id);
      await loadFaqs();
    } catch {
      alert("Gagal menghapus FAQ.");
    }
  };

  const handleTestimonySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonyForm.name || !testimonyForm.quote) {
      alert("Nama dan kutipan testimoni wajib diisi.");
      return;
    }

    const targetOrder = Number(testimonyForm.sortOrder) || 1;
    const duplicate = testimonies.find(
      (t) => (editingTestimony ? t.id !== editingTestimony.id : true) && (t.sortOrder || 0) === targetOrder
    );
    if (duplicate) {
      alert(
        `Nomor urut slider #${targetOrder} sudah digunakan oleh narasumber: "${duplicate.name}". Nomor urutan harus unik dan tidak boleh sama.`
      );
      return;
    }

    setIsTestimonySaving(true);
    try {
      let res;
      if (editingTestimony) {
        res = await updateTestimony(editingTestimony.id, { ...testimonyForm, sortOrder: targetOrder });
      } else {
        res = await createTestimony({ ...testimonyForm, sortOrder: targetOrder });
      }
      if (res && !res.success) {
        alert(res.error || "Gagal menyimpan testimoni.");
        return;
      }
      setIsTestimonyModalOpen(false);
      setEditingTestimony(null);
      const nextMax = testimonies.reduce((max, t) => Math.max(max, t.sortOrder || 0), targetOrder);
      setTestimonyForm({
        name: "",
        role: "",
        quote: "",
        quoteEn: "",
        photo: "",
        sortOrder: nextMax + 1,
        isActive: true,
      });
      await loadTestimoniesData();
    } catch {
      alert("Gagal menyimpan testimoni.");
    } finally {
      setIsTestimonySaving(false);
    }
  };

  const handleTestimonyDelete = async (id: string) => {
    if (!confirm("Hapus testimoni ini dari Beranda?")) return;
    try {
      const res = await deleteTestimony(id);
      if (res && !res.success) {
        alert(res.error || "Gagal menghapus testimoni.");
        return;
      }
      await loadTestimoniesData();
    } catch {
      alert("Gagal menghapus testimoni.");
    }
  };

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
          onClick={() => setActiveTab("hero")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
          onClick={() => setActiveTab("whyEsm")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "whyEsm"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <Video className="size-3.5" />
          <span>3. Mengapa ESM Hadir & Video</span>
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

        <button
          type="button"
          onClick={() => setActiveTab("faq")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "faq"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <HelpCircle className="size-3.5" />
          <span>6. Tanya Jawab (FAQ)</span>
          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
            {faqs.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("testimoni")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "testimoni"
              ? "bg-primary text-white shadow-xs"
              : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
          }`}
        >
          <MessageSquareQuote className="size-3.5" />
          <span>7. Testimoni Murid</span>
          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
            {testimonies.length}
          </span>
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

            {/* 1. File Video Utama (Bisa Upload MP4/WebM atau Tempel Link YouTube) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                    1. File / Sumber Video Utama
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Anda dapat <b>Upload file video (MP4/WebM)</b> langsung dari laptop, atau klik tab <b>Link / URL</b> untuk menempel tautan video YouTube.
                  </p>
                </div>
              </div>

              <MediaUploader
                label="Sumber Video Profil (Upload MP4 / Link YouTube)"
                value={whyEsm.videoUrl}
                onChange={(url) => setWhyEsm({ ...whyEsm, videoUrl: url })}
                folder="videos"
                accept="video"
                helperText="Dukungan: File video lokal MP4/WebM/MOV (maks 50MB) atau link YouTube standar (https://www.youtube.com/watch?v=... atau youtu.be/...)."
              />

              {/* YouTube Thumbnail Extractor (Muncul jika URL adalah YouTube) */}
              {whyEsm.videoUrl &&
                (whyEsm.videoUrl.includes("youtube.com") || whyEsm.videoUrl.includes("youtu.be")) && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-2 text-xs text-amber-900 font-semibold">
                      <Sparkles className="size-4 text-amber-600 shrink-0" />
                      <span>Tautan YouTube terdeteksi. Pasang foto sampul video dari YouTube secara otomatis?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const match = whyEsm.videoUrl.match(
                          /(?:youtube\.com\/(?:watch\?v=|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                        );
                        if (match && match[1]) {
                          setWhyEsm({
                            ...whyEsm,
                            videoThumbnail: `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`,
                          });
                          alert("Thumbnail berhasil diambil dari video YouTube!");
                        } else {
                          alert("Link YouTube tidak valid.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-all shadow-xs cursor-pointer shrink-0"
                    >
                      Gunakan Thumbnail YouTube
                    </button>
                  </div>
                )}
            </div>

            {/* 2. Foto Sampul / Thumbnail Video */}
            <div className="space-y-3 pt-4 border-t border-border/60">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <div>
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                    2. Foto Sampul / Thumbnail Kartu Video
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Gambar latar yang tampil di kartu sebelum pengunjung menekan tombol putar video.
                  </p>
                </div>
              </div>

              <MediaUploader
                label="Foto Sampul Thumbnail (16:9 Lanskap)"
                value={whyEsm.videoThumbnail}
                onChange={(url) => setWhyEsm({ ...whyEsm, videoThumbnail: url })}
                folder="hero"
                accept="image"
                helperText="Format disarankan: Foto 16:9 lanskap (1920x1080px). Anda bisa mengunggah foto baru dari laptop atau menempel link gambar."
              />
            </div>

            {/* 3. Durasi Video */}
            <div className="pt-3 border-t border-border/60">
              <label className="text-xs font-bold text-foreground block mb-1">Badge Durasi Video</label>
              <input
                type="text"
                value={whyEsm.videoDuration}
                onChange={(e) => setWhyEsm({ ...whyEsm, videoDuration: e.target.value })}
                placeholder="03:45 • Profil ESM"
                className="w-full max-w-sm px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>

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

          {/* Single CTA Button Editor */}
          <div className="pt-2 border-t border-border/60 space-y-3">
            <div>
              <label className="text-xs font-bold text-foreground block">
                Tombol Aksi Hero (Tombol Utama Tunggal)
              </label>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Tombol tunggal yang tampil di tengah Hero beranda. Anda dapat mengubah teks dan halaman tujuannya kapan saja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Teks Tombol (ID)</label>
                <input
                  type="text"
                  placeholder="Contoh: Pelajari Gerakan Kami"
                  value={hero.primaryCtaTextId}
                  onChange={(e) => setHero({ ...hero, primaryCtaTextId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">Teks Tombol (EN)</label>
                  <AutoTranslateButton
                    sourceText={hero.primaryCtaTextId}
                    onTranslated={(txt) => setHero({ ...hero, primaryCtaTextEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Contoh: Discover Our Movement"
                  value={hero.primaryCtaTextEn}
                  onChange={(e) => setHero({ ...hero, primaryCtaTextEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Tautan Halaman Tujuan (URL)</label>
              <input
                type="text"
                placeholder="Contoh: /tentang-kami atau /pelayanan"
                value={hero.primaryCtaUrl}
                onChange={(e) => setHero({ ...hero, primaryCtaUrl: e.target.value })}
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

      {/* ========================================================
          TAB 6: TANYA JAWAB (FAQ BERANDA)
          ======================================================== */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Pertanyaan yang Sering Diajukan di Beranda (Section 5):</p>
                <p className="text-stone-600 mt-0.5">
                  Daftar FAQ ini muncul pada kolom kanan Section 5 di Beranda publik (berdampingan dengan kartu Ajakan Kemitraan). Semua perubahan di sini otomatis tersinkronisasi dengan database PostgreSQL dan langsung live di halaman depan.
                </p>
              </div>
            </div>
            <a
              href="/admin/konten/faq"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 text-amber-900 font-bold text-xs shrink-0 hover:bg-amber-100 transition-colors"
            >
              <span>Kelola Semua Kategori FAQ</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">Daftar Pertanyaan FAQ Beranda ({faqs.length})</h3>
              <p className="text-xs text-muted-foreground">Urutan pertanyaan akan ditampilkan sesuai nomor urut di website publik.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const maxOrder = faqs.reduce((max, f) => Math.max(max, f.sortOrder || 0), 0);
                setEditingFaq(null);
                setFaqForm({
                  question: "",
                  questionEn: "",
                  answer: "",
                  answerEn: "",
                  sortOrder: maxOrder + 1,
                  isActive: true,
                  page: FAQPage.GENERAL,
                });
                setIsFaqModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Tambah FAQ Beranda</span>
            </button>
          </div>

          {faqs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
              <HelpCircle className="size-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Belum ada pertanyaan FAQ untuk Beranda.</p>
              <p className="text-[11px] text-muted-foreground mt-1">Klik tombol &ldquo;Tambah FAQ Beranda&rdquo; untuk menambahkan pertanyaan baru.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...faqs].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((faq, idx) => (
                <div
                  key={faq.id || idx}
                  className="p-5 rounded-2xl border border-border bg-card shadow-xs space-y-3 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          Urutan #{faq.sortOrder ?? idx + 1}
                        </span>
                        {faq.isActive === false && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                            Nonaktif
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-foreground">{faq.question}</h4>
                      {faq.questionEn && (
                        <p className="text-xs text-primary font-medium italic">{faq.questionEn}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFaq(faq);
                          setFaqForm({
                            question: faq.question || "",
                            questionEn: faq.questionEn || "",
                            answer: faq.answer || "",
                            answerEn: faq.answerEn || "",
                            sortOrder: faq.sortOrder ?? idx + 1,
                            isActive: faq.isActive ?? true,
                            page: faq.page || FAQPage.GENERAL,
                          });
                          setIsFaqModalOpen(true);
                        }}
                        className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        title="Sunting FAQ"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFaqDelete(faq.id)}
                        className="p-2 rounded-lg border border-border text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus FAQ"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-2 border-t border-border/50 space-y-1.5 leading-relaxed">
                    <p>{faq.answer}</p>
                    {faq.answerEn && (
                      <p className="italic text-foreground/80 pl-3 border-l-2 border-primary/30">
                        {faq.answerEn}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 7: TESTIMONI MURID (SECTION 7 BERANDA)
          ======================================================== */}
      {activeTab === "testimoni" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Testimoni & Refleksi Murid (Section 7 di Beranda):</p>
                <p className="text-stone-600 mt-0.5">
                  Testimoni yang diaktifkan di sini otomatis tersinkronisasi langsung ke database PostgreSQL dan ditampilkan pada slider Section 7 di Beranda publik lengkap dengan foto, nama, status, dan kutipan (ID & EN).
                </p>
              </div>
            </div>
            <a
              href="/admin/konten/testimoni"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 text-amber-900 font-bold text-xs shrink-0 hover:bg-amber-100 transition-colors"
            >
              <span>Buka Menu Testimoni Lengkap</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">Daftar Testimoni Beranda ({testimonies.length})</h3>
              <p className="text-xs text-muted-foreground">Testimoni aktif akan dapat digeser (slider) oleh pengunjung website.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const maxOrder = testimonies.reduce((max, t) => Math.max(max, t.sortOrder || 0), 0);
                setEditingTestimony(null);
                setTestimonyForm({
                  name: "",
                  role: "",
                  quote: "",
                  quoteEn: "",
                  photo: "",
                  sortOrder: maxOrder + 1,
                  isActive: true,
                });
                setIsTestimonyModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Tambah Testimoni Baru</span>
            </button>
          </div>

          {testimonies.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
              <MessageSquareQuote className="size-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-xs text-muted-foreground font-medium">Belum ada data testimoni di database.</p>
              <p className="text-[11px] text-muted-foreground mt-1">Klik tombol &ldquo;Tambah Testimoni Baru&rdquo; untuk membuat testimoni pertama.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...testimonies].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-full bg-muted border border-border relative overflow-hidden shrink-0">
                        {item.photo ? (
                          <Image src={item.photo} alt={item.name} fill unoptimized className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs text-primary">
                            {item.name ? item.name.charAt(0) : "M"}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Urutan #{item.sortOrder ?? 1}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-foreground truncate">{item.name}</h4>
                        <p className="text-[11px] text-primary truncate">{item.role || "Alumni / Mahasiswa"}</p>
                      </div>
                    </div>

                    <p className="text-xs text-foreground italic border-l-2 border-primary/40 pl-3 py-1">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    {item.quoteEn && (
                      <p className="text-[11px] text-muted-foreground italic border-l-2 border-border pl-3 py-0.5">
                        &ldquo;{item.quoteEn}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isActive ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.isActive ? "Tayang Aktif di Beranda" : "Draft / Non-aktif"}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTestimony(item);
                          setTestimonyForm({
                            name: item.name,
                            role: item.role || "",
                            quote: item.quote,
                            quoteEn: item.quoteEn || "",
                            photo: item.photo || "",
                            sortOrder: item.sortOrder ?? 1,
                            isActive: item.isActive,
                          });
                          setIsTestimonyModalOpen(true);
                        }}
                        className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg cursor-pointer"
                        title="Sunting testimoni"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTestimonyDelete(item.id)}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                        title="Hapus testimoni"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          MODAL TAMBAH / SUNTING FAQ BERANDA
          ======================================================== */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8 animate-in fade-in-50">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="size-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">
                  {editingFaq ? "Sunting Pertanyaan FAQ Beranda" : "Tambah Pertanyaan FAQ Beranda"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFaqModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleFaqSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Nomor Urut Tampil</label>
                  <input
                    type="number"
                    value={faqForm.sortOrder}
                    onChange={(e) => setFaqForm({ ...faqForm, sortOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Status Publikasi</label>
                  <select
                    value={faqForm.isActive ? "true" : "false"}
                    onChange={(e) => setFaqForm({ ...faqForm, isActive: e.target.value === "true" })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  >
                    <option value="true">Aktif (Tampil di Web)</option>
                    <option value="false">Nonaktif (Draf)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Pertanyaan (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Apakah ESM adalah gereja lokal atau yayasan misi?"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Question (EN)</label>
                  <AutoTranslateButton
                    sourceText={faqForm.question}
                    onTranslated={(txt) => setFaqForm({ ...faqForm, questionEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Is ESM a church denomination or an independent mission?"
                  value={faqForm.questionEn || ""}
                  onChange={(e) => setFaqForm({ ...faqForm, questionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Jawaban (ID)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan jawaban yang ramah, jelas, dan informatif..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Answer (EN)</label>
                  <AutoTranslateButton
                    sourceText={faqForm.answer}
                    onTranslated={(txt) => setFaqForm({ ...faqForm, answerEn: txt })}
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Write an informative English answer..."
                  value={faqForm.answerEn || ""}
                  onChange={(e) => setFaqForm({ ...faqForm, answerEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isFaqSaving}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  {isFaqSaving && <Loader2 className="size-3.5 animate-spin" />}
                  <span>Simpan FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL TAMBAH / SUNTING TESTIMONI BERANDA
          ======================================================== */}
      {isTestimonyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8 animate-in fade-in-50">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="size-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">
                  {editingTestimony ? "Sunting Testimoni Beranda" : "Tambah Testimoni Beranda"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTestimonyModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleTestimonySubmit} className="space-y-4">
              <MediaUploader
                label="Foto Narasumber / Siswa / Alumni"
                value={testimonyForm.photo || ""}
                onChange={(url) => setTestimonyForm({ ...testimonyForm, photo: url })}
                folder="testimonies"
                accept="image"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jonathan Pratama"
                    value={testimonyForm.name}
                    onChange={(e) => setTestimonyForm({ ...testimonyForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Status / Asal Komunitas</label>
                  <input
                    type="text"
                    placeholder="Contoh: Alumni Mahasiswa Untirta"
                    value={testimonyForm.role || ""}
                    onChange={(e) => setTestimonyForm({ ...testimonyForm, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Kutipan Testimoni (ID)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tuliskan pengalaman refleksi murid di ESM..."
                  value={testimonyForm.quote}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, quote: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Testimony Quote (EN)</label>
                  <AutoTranslateButton
                    sourceText={testimonyForm.quote}
                    onTranslated={(txt) => setTestimonyForm({ ...testimonyForm, quoteEn: txt })}
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Translate quote into English..."
                  value={testimonyForm.quoteEn || ""}
                  onChange={(e) => setTestimonyForm({ ...testimonyForm, quoteEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Urutan Slider</label>
                  <input
                    type="number"
                    value={testimonyForm.sortOrder}
                    onChange={(e) =>
                      setTestimonyForm({
                        ...testimonyForm,
                        sortOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div className="pt-5">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testimonyForm.isActive}
                      onChange={(e) =>
                        setTestimonyForm({ ...testimonyForm, isActive: e.target.checked })
                      }
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span>Tayangkan di Beranda</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsTestimonyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isTestimonySaving}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-warm-xs"
                >
                  {isTestimonySaving && <Loader2 className="size-3.5 animate-spin" />}
                  <span>Simpan Testimoni</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
