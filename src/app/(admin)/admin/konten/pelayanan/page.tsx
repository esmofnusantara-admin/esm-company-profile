"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  Save,
  CheckCircle2,
  Loader2,
  Compass,
  Layers,
  GraduationCap,
  Briefcase,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  HelpCircle,
} from "lucide-react";
import { defaultCommunities, CommunityDetail } from "@/lib/communityConfig";

interface Framework3CItem {
  name: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  descId: string;
  descEn: string;
  verse: string;
  mediaUrl: string;
}

const default3C: Framework3CItem[] = [
  {
    name: "Communion",
    titleId: "Persekutuan Intim dengan Allah",
    titleEn: "Intimate Communion with God",
    subtitleId: "Berakar dalam Firman & Doa",
    subtitleEn: "Rooted in Word & Prayer",
    descId: "Fondasi dari segala gerak pelayanan adalah persekutuan pribadi murid dengan Kristus melalui firman-Nya, doa yang tekun, dan penyembahan yang berpusat pada salib.",
    descEn: "The foundation of all ministry movement is personal communion with Christ through His word, steadfast prayer, and cross-centered worship.",
    verse: "Yohanes 15:5",
    mediaUrl: "",
  },
  {
    name: "Community",
    titleId: "Komunitas Pemuridan Otentik",
    titleEn: "Authentic Discipleship Community",
    subtitleId: "Saling Menguatkan & Membangun",
    subtitleEn: "Mutual Encouragement & Growth",
    descId: "Murid Kristus bertumbuh dalam kelompok kecil (KTB/Care Group) yang saling mengasah, transparan, dan mempraktikkan kasih persaudaraan yang nyata.",
    descEn: "Disciples grow within small life-on-life groups that sharpen one another, walk in transparency, and embody authentic brotherly love.",
    verse: "Kisah Para Rasul 2:42",
    mediaUrl: "",
  },
  {
    name: "Commission",
    titleId: "Pengutusan Misional ke Dunia",
    titleEn: "Missional Commission to the World",
    subtitleId: "Menjadi Garam & Terang Bangsa",
    subtitleEn: "Salt & Light for the Nation",
    descId: "Setiap murid diutus untuk membagikan kabar baik, menghadirkan damai Kristus, dan hidup berintegritas di sekolah, kampus, keluarga, serta ranah profesi kerja.",
    descEn: "Every disciple is sent to proclaim the gospel, reflect Christ's peace, and live with integrity in schools, campuses, families, and professional careers.",
    verse: "Matius 28:19-20",
    mediaUrl: "",
  },
];

const TABS = [
  { id: "3c", label: "Kerangka 3C", icon: Layers, desc: "Communion, Community, Commission" },
  { id: "explore", label: "Explore (Siswa SMA)", icon: Compass, desc: "Pembinaan Siswa Sekolah (Explore)" },
  { id: "encounter", label: "Encounter (Kuliah)", icon: GraduationCap, desc: "Gerakan Mahasiswa Kampus (Encounter)" },
  { id: "connect", label: "Connect (Alumni)", icon: Briefcase, desc: "Jaringan Alumni & Marketplace (Connect)" },
];

function AdminPelayananContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabParam && ["3c", "explore", "encounter", "connect"].includes(tabParam)
      ? tabParam
      : "3c"
  );

  const [framework, setFramework] = useState<Framework3CItem[]>(default3C);
  const [communities, setCommunities] = useState<CommunityDetail[]>(defaultCommunities);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (tabParam && ["3c", "explore", "encounter", "connect"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tabId);
      window.history.replaceState({}, "", url.toString());
    }
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [saved3C, savedComm] = await Promise.all([
          getSiteConfig<Framework3CItem[]>("pelayanan_3c", default3C),
          getSiteConfig<CommunityDetail[]>("pelayanan_communities", defaultCommunities),
        ]);
        if (saved3C) setFramework(saved3C);
        if (Array.isArray(savedComm)) {
          // Merge with defaultCommunities to guarantee slug completeness
          const merged = defaultCommunities.map((def) => {
            const found = savedComm.find((c) => c.slug === def.slug);
            return found ? { ...def, ...found } : def;
          });
          setCommunities(merged);
        }
      } catch (err) {
        console.error("Gagal memuat konfigurasi pelayanan:", err);
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
        saveSiteConfig("pelayanan_3c", framework),
        saveSiteConfig("pelayanan_communities", communities),
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan data Pelayanan.");
    } finally {
      setIsSaving(false);
    }
  };

  const getCommunity = (slug: string) => {
    const idx = communities.findIndex((c) => c.slug === slug);
    return {
      comm: idx >= 0 ? communities[idx] : defaultCommunities.find((c) => c.slug === slug)!,
      idx,
    };
  };

  const updateCommunity = (idx: number, patch: Partial<CommunityDetail>) => {
    if (idx < 0) return;
    const updated = [...communities];
    updated[idx] = { ...updated[idx], ...patch };
    setCommunities(updated);
  };

  const addGalleryImage = (idx: number, url: string) => {
    if (!url || idx < 0) return;
    const current = communities[idx].galleryImages || [];
    if (!current.includes(url)) {
      updateCommunity(idx, { galleryImages: [...current, url] });
    }
  };

  const removeGalleryImage = (idx: number, imgUrl: string) => {
    if (idx < 0) return;
    const current = communities[idx].galleryImages || [];
    updateCommunity(idx, {
      galleryImages: current.filter((img) => img !== imgUrl),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Compass className="size-3.5" />
            <span>PELAYANAN (3C) & KOMUNITAS BINAAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Halaman Pelayanan & Komunitas
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Atur gambar, kurikulum, dan deskripsi Kerangka 3C serta 3 komunitas binaan (Explore, Encounter, Connect).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={
              activeTab === "explore"
                ? "/pelayanan/explore"
                : activeTab === "encounter"
                ? "/pelayanan/encounter"
                : activeTab === "connect"
                ? "/pelayanan/connect"
                : "/pelayanan"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-muted/30 transition-all shadow-xs"
          >
            <Eye className="size-3.5 text-muted-foreground" />
            <span>Pratinjau Web</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
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
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Semua foto dan konfigurasi pelayanan berhasil disimpan & langsung aktif dinamis di web!</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-muted/40 p-1.5 rounded-2xl border border-border">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                isActive
                  ? "bg-card text-primary shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              <Icon className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <div className="truncate">
                <span className="block leading-tight">{tab.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: KERANGKA 3C PELAYANAN
          ======================================================== */}
      {activeTab === "3c" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <Layers className="size-3.5" />
                <span>KERANGKA PEMURIDAN</span>
              </div>
              <h2 className="text-base font-bold text-foreground">Kerangka Strategi 3C Pelayanan</h2>
              <p className="text-xs text-muted-foreground">Communion (Ke Atas), Community (Ke Dalam), Commission (Ke Luar).</p>
            </div>
            <a
              href="/pelayanan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span>Lihat Halaman /pelayanan</span>
              <ExternalLink className="size-3" />
            </a>
          </div>

          <div className="space-y-6">
            {framework.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-primary">
                    {idx + 1}. Pilar {item.name}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground bg-card px-2 py-0.5 rounded border border-border">
                    Ayat: {item.verse}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Judul Pilar (ID)</label>
                    <input
                      type="text"
                      value={item.titleId}
                      onChange={(e) => {
                        const updated = [...framework];
                        updated[idx].titleId = e.target.value;
                        setFramework(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-foreground">Judul Pilar (EN)</label>
                      <AutoTranslateButton
                        sourceText={item.titleId}
                        onTranslated={(txt) => {
                          const updated = [...framework];
                          updated[idx].titleEn = txt;
                          setFramework(updated);
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      value={item.titleEn}
                      onChange={(e) => {
                        const updated = [...framework];
                        updated[idx].titleEn = e.target.value;
                        setFramework(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Pilar (ID)</label>
                    <textarea
                      rows={3}
                      value={item.descId}
                      onChange={(e) => {
                        const updated = [...framework];
                        updated[idx].descId = e.target.value;
                        setFramework(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                      <AutoTranslateButton
                        sourceText={item.descId}
                        onTranslated={(txt) => {
                          const updated = [...framework];
                          updated[idx].descEn = txt;
                          setFramework(updated);
                        }}
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={item.descEn}
                      onChange={(e) => {
                        const updated = [...framework];
                        updated[idx].descEn = e.target.value;
                        setFramework(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Landasan Alkitab / Ayat</label>
                    <input
                      type="text"
                      value={item.verse}
                      onChange={(e) => {
                        const updated = [...framework];
                        updated[idx].verse = e.target.value;
                        setFramework(updated);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <MediaUploader
                    label="Foto / Video Ilustrasi"
                    value={item.mediaUrl}
                    onChange={(url) => {
                      const updated = [...framework];
                      updated[idx].mediaUrl = url;
                      setFramework(updated);
                    }}
                    folder="3c"
                    accept="all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TABS 2, 3, 4: KOMUNITAS BINAAN (EXPLORE, ENCOUNTER, CONNECT)
          ======================================================== */}
      {["explore", "encounter", "connect"].includes(activeTab) && (() => {
        const { comm, idx } = getCommunity(activeTab);
        const isExplore = activeTab === "explore";
        const isEncounter = activeTab === "encounter";
        const isConnect = activeTab === "connect";

        const previewPath = isExplore
          ? "/pelayanan/explore"
          : isEncounter
          ? "/pelayanan/encounter"
          : "/pelayanan/connect";

        const titleHeader = isExplore
          ? "Explore Community (Pembinaan Siswa SMP & SMA)"
          : isEncounter
          ? "Encounter Community (Pergerakan Mahasiswa Kampus)"
          : "Connect Community (Alumni & Profesional Marketplace)";

        const imageDesc = isExplore
          ? "Foto utama ini ditampilkan di banner showcase besar halaman /pelayanan/explore dan kartu ringkasan di web."
          : isEncounter
          ? "Foto utama ini ditampilkan di slide pertama carousel swipeable halaman /pelayanan/encounter dan kartu komunitas di web."
          : "Foto utama ini ditampilkan di slide pertama carousel showcase halaman /pelayanan/connect dan kartu komunitas di web.";

        return (
          <div className="space-y-6">
            {/* Community Header & Action */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-warm-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                    {isExplore ? (
                      <Compass className="size-3.5" />
                    ) : isEncounter ? (
                      <GraduationCap className="size-3.5" />
                    ) : (
                      <Briefcase className="size-3.5" />
                    )}
                    <span>{comm.name}</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground">{titleHeader}</h2>
                  <p className="text-xs text-muted-foreground">Kelola foto dokumentasi dinamis, kutipan hero, dan materi persekutuan.</p>
                </div>

                <a
                  href={previewPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-muted/40 text-xs font-bold text-primary hover:bg-muted transition-colors w-fit"
                >
                  <Eye className="size-3.5" />
                  <span>Lihat {comm.name} di Web</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              {/* 1. DYNAMIC MEDIA: FOTO UTAMA / HERO BANNER */}
              <div className="p-4 rounded-xl border border-primary/20 bg-primary-50/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-4 text-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                      1. Foto Dokumentasi Utama (Hero Banner)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {comm.mediaUrl ? "Foto Aktif (Dinamis)" : "Default Gambar Terpasang"}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{imageDesc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <MediaUploader
                    label="Unggah / Ganti Foto Utama"
                    value={comm.mediaUrl || ""}
                    onChange={(url) => updateCommunity(idx, { mediaUrl: url })}
                    folder="pelayanan"
                    accept="image"
                    helperText="Rekomendasi rasio 16:9 atau foto landscape resolusi tinggi (maks. 5MB)."
                  />

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Keterangan Foto / Kicker (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder={
                          isExplore
                            ? "Kehangatan Komunitas Explore"
                            : isEncounter
                            ? "KTB Kampus • Banten & Ternate"
                            : "Marketplace Forum • Faith & Work"
                        }
                        value={comm.heroTitle || ""}
                        onChange={(e) => updateCommunity(idx, { heroTitle: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-foreground block mb-1">
                        Kutipan Inspiratif di Bawah Foto (Caption)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Belajar Alkitab bukan membosankan saat kita mendiskusikannya bersama teman-teman yang tulus..."
                        value={comm.heroCaption || ""}
                        onChange={(e) => updateCommunity(idx, { heroCaption: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. DYNAMIC MEDIA: GALERI FOTO TAMBAHAN (SLIDER / CAROUSEL) */}
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-stone-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                      2. Galeri Foto / Slide Tambahan (Carousel)
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-card border border-border text-muted-foreground">
                    {(comm.galleryImages || []).length} Foto Tambahan
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Foto-foto tambahan ini otomatis menjadi slide berikutnya dalam <strong>carousel swipeable</strong> interaktif pada halaman web.
                </p>

                {/* Upload Button for Gallery */}
                <div className="flex items-center gap-3">
                  <MediaUploader
                    label="Tambah Foto ke Galeri / Slider"
                    value=""
                    onChange={(url) => {
                      if (url) addGalleryImage(idx, url);
                    }}
                    folder="pelayanan"
                    accept="image"
                    helperText="Foto akan langsung ditambahkan ke deretan slide galeri di bawah."
                  />
                </div>

                {/* Gallery List */}
                {Array.isArray(comm.galleryImages) && comm.galleryImages.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                    {comm.galleryImages.map((imgUrl, imgIdx) => (
                      <div key={imgIdx} className="relative group rounded-xl overflow-hidden border border-border bg-card shadow-xs aspect-[16/10]">
                        <Image
                          src={imgUrl}
                          alt={`Slide ${imgIdx + 2}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                          <span className="text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                            Slide #{imgIdx + 2}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx, imgUrl)}
                            className="size-7 rounded-lg bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-xs"
                            title="Hapus foto ini dari galeri"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-background/50 border border-dashed border-border text-center text-xs text-muted-foreground">
                    Belum ada foto galeri tambahan. Jika belum ditambahkan, website menggunakan foto dokumentasi default kurasi ESM.
                  </div>
                )}
              </div>

              {/* 3. TEKS FOKUS, TAGLINE, DAN DESKRIPSI */}
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground border-b border-border/60 pb-2">
                  3. Judul, Tagline, & Deskripsi Pelayanan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Judul / Fokus (ID)</label>
                    <input
                      type="text"
                      value={comm.titleId || ""}
                      onChange={(e) => updateCommunity(idx, { titleId: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-foreground">Judul / Fokus (EN)</label>
                      <AutoTranslateButton
                        sourceText={comm.titleId}
                        onTranslated={(txt) => updateCommunity(idx, { titleEn: txt })}
                      />
                    </div>
                    <input
                      type="text"
                      value={comm.titleEn || ""}
                      onChange={(e) => updateCommunity(idx, { titleEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Tagline Komunitas (ID)</label>
                    <input
                      type="text"
                      value={comm.taglineId || ""}
                      onChange={(e) => updateCommunity(idx, { taglineId: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-foreground">Tagline Komunitas (EN)</label>
                      <AutoTranslateButton
                        sourceText={comm.taglineId}
                        onTranslated={(txt) => updateCommunity(idx, { taglineEn: txt })}
                      />
                    </div>
                    <input
                      type="text"
                      value={comm.taglineEn || ""}
                      onChange={(e) => updateCommunity(idx, { taglineEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Lengkap (ID)</label>
                    <textarea
                      rows={3}
                      value={comm.descId || ""}
                      onChange={(e) => updateCommunity(idx, { descId: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                      <AutoTranslateButton
                        sourceText={comm.descId}
                        onTranslated={(txt) => updateCommunity(idx, { descEn: txt })}
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={comm.descEn || ""}
                      onChange={(e) => updateCommunity(idx, { descEn: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default function AdminPelayananCMS() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12 min-h-[400px]">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      }
    >
      <AdminPelayananContent />
    </Suspense>
  );
}
