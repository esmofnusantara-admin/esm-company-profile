"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { Save, CheckCircle2, Loader2, Compass, Layers, Users, Sparkles } from "lucide-react";

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

interface CommunityDetail {
  slug: string;
  name: string;
  titleId: string;
  titleEn: string;
  taglineId: string;
  taglineEn: string;
  descId: string;
  descEn: string;
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

const defaultCommunities: CommunityDetail[] = [
  {
    slug: "explore",
    name: "Explore Community",
    titleId: "Pembinaan Siswa Sekolah Menengah (SMA/SMK)",
    titleEn: "High School Discipleship (Explore)",
    taglineId: "Menemukan Identitas Diri di Dalam Kristus",
    taglineEn: "Discovering Identity in Christ",
    descId: "Membekali remaja dan siswa SMA dengan kebenaran Alkitab di tengah pergumulan masa muda, pengaruh pergaulan, dan persiapan menuju gerbang perkuliahan.",
    descEn: "Equipping teenagers and high school students with biblical truth amid youth challenges, peer pressure, and university transition.",
    mediaUrl: "",
  },
  {
    slug: "encounter",
    name: "Encounter Community",
    titleId: "Gerakan Mahasiswa di Kampus Perguruan Tinggi",
    titleEn: "Campus Student Movement (Encounter)",
    taglineId: "Berjumpa dengan Kristus, Memuridkan Kampus",
    taglineEn: "Encountering Christ, Discipling the Campus",
    descId: "Membimbing mahasiswa menjadi apologis iman yang tangguh, aktif dalam kelompok pemuridan intensif, dan berintegritas dalam akademik.",
    descEn: "Mentoring university students into steadfast faith apologists, active discipleship groups, and high academic integrity.",
    mediaUrl: "",
  },
  {
    slug: "connect",
    name: "Connect Community",
    titleId: "Jaringan Alumni & Profesional Kerja",
    titleEn: "Alumni & Marketplace Network (Connect)",
    taglineId: "Membawa Terang Kristus ke Dunia Profesional",
    taglineEn: "Bringing Christ's Light into the Professional Realm",
    descId: "Wadah alumni untuk tetap terhubung, saling menopang dalam doa dan panggilan dunia kerja, serta menjadi mentor bagi adik-adik mahasiswa.",
    descEn: "Platform for graduates to stay connected, support one another in workplace callings, and mentor upcoming university students.",
    mediaUrl: "",
  },
];

export default function AdminPelayananCMS() {
  const [framework, setFramework] = useState<Framework3CItem[]>(default3C);
  const [communities, setCommunities] = useState<CommunityDetail[]>(defaultCommunities);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [saved3C, savedComm] = await Promise.all([
          getSiteConfig<Framework3CItem[]>("pelayanan_3c", default3C),
          getSiteConfig<CommunityDetail[]>("pelayanan_communities", defaultCommunities),
        ]);
        if (saved3C) setFramework(saved3C);
        if (savedComm) setCommunities(savedComm);
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
            <Compass className="size-3.5" />
            <span>KONTEN HALAMAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Halaman Pelayanan & Komunitas
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Atur Kerangka Strategi 3C (Communion, Community, Commission) serta 3 komunitas binaan (Explore, Encounter, Connect).
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
          <span>Semua pengaturan Pelayanan berhasil disimpan dan langsung aktif di website publik!</span>
        </div>
      )}

      {/* 1. KERANGKA STRATEGI 3C */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Layers className="size-3.5" />
            <span>KERANGKA PEMURIDAN</span>
          </div>
          <h2 className="text-base font-bold text-foreground">1. Kerangka Strategi 3C Pelayanan</h2>
          <p className="text-xs text-muted-foreground">Communion (Ke Atas), Community (Ke Dalam), Commission (Ke Luar).</p>
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

      {/* 2. TIGA KOMUNITAS PELAYANAN */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Users className="size-3.5" />
            <span>KOMUNITAS BINAAN</span>
          </div>
          <h2 className="text-base font-bold text-foreground">2. Tiga Sayap Komunitas Pelayanan</h2>
          <p className="text-xs text-muted-foreground">Explore (SMA), Encounter (Kampus Mahasiswa), dan Connect (Alumni).</p>
        </div>

        <div className="space-y-6">
          {communities.map((comm, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
                {idx + 1}. {comm.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Judul / Fokus (ID)</label>
                  <input
                    type="text"
                    value={comm.titleId}
                    onChange={(e) => {
                      const updated = [...communities];
                      updated[idx].titleId = e.target.value;
                      setCommunities(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-foreground">Judul / Fokus (EN)</label>
                    <AutoTranslateButton
                      sourceText={comm.titleId}
                      onTranslated={(txt) => {
                        const updated = [...communities];
                        updated[idx].titleEn = txt;
                        setCommunities(updated);
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={comm.titleEn}
                    onChange={(e) => {
                      const updated = [...communities];
                      updated[idx].titleEn = e.target.value;
                      setCommunities(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Komunitas (ID)</label>
                  <textarea
                    rows={3}
                    value={comm.descId}
                    onChange={(e) => {
                      const updated = [...communities];
                      updated[idx].descId = e.target.value;
                      setCommunities(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                    <AutoTranslateButton
                      sourceText={comm.descId}
                      onTranslated={(txt) => {
                        const updated = [...communities];
                        updated[idx].descEn = txt;
                        setCommunities(updated);
                      }}
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={comm.descEn}
                    onChange={(e) => {
                      const updated = [...communities];
                      updated[idx].descEn = e.target.value;
                      setCommunities(updated);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <MediaUploader
                label={`Media Dokumentasi ${comm.name}`}
                value={comm.mediaUrl}
                onChange={(url) => {
                  const updated = [...communities];
                  updated[idx].mediaUrl = url;
                  setCommunities(updated);
                }}
                folder="communities"
                accept="all"
                helperText="Upload foto kegiatan atau video persekutuan siswa/mahasiswa/alumni."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
