"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  TeamMemberInput,
} from "@/actions/team";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  Save,
  CheckCircle2,
  Loader2,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  UserCheck,
  Compass,
  MapPin,
  ShieldAlert,
  Building2,
  Phone,
  ShieldCheck,
  Network,
} from "lucide-react";
import Image from "next/image";
import { Community } from "@prisma/client";
import { AboutLegalOrg, defaultLegalOrg } from "@/lib/legalOrgConfig";

interface AboutHistory {
  titleId: string;
  titleEn: string;
  storyId: string;
  storyEn: string;
  mediaUrl: string;
}

interface AboutVisionMission {
  visionId: string;
  visionEn: string;
  missionListId: string[];
  missionListEn: string[];
}

interface AboutRegions {
  bantenTitleId: string;
  bantenTitleEn: string;
  bantenDescId: string;
  bantenDescEn: string;
  bantenImageUrl: string;
  ternateTitleId: string;
  ternateTitleEn: string;
  ternateDescId: string;
  ternateDescEn: string;
  ternateImageUrl: string;
}

const defaultHistory: AboutHistory = {
  titleId: "Sejarah & Kegelisahan Awal Pelayanan",
  titleEn: "History & Founding Vision",
  storyId:
    "ESM lahir dari keprihatinan mendalam akan kekeringan rohani dan minimnya pemuridan yang berakar kuat bagi generasi muda di tanah Banten dan Kepulauan Maluku Utara. Di tengah pesatnya perubahan zaman, kami rindu melihat siswa dan mahasiswa tidak hanya sekadar mengaku Kristen, tetapi sungguh-sungguh menjadi murid Kristus yang hidup dalam integritas firman Allah dan diutus ke tengah masyarakat.",
  storyEn:
    "ESM was born from a deep burden regarding spiritual dryness and the scarcity of deeply-rooted discipleship for the next generation across Banten and North Maluku. Amid rapid societal shifts, our longing is to see high school and university students not merely hold Christian labels, but truly walk as disciples of Christ living with biblical integrity and sent into society.",
  mediaUrl: "",
};

const defaultVisionMission: AboutVisionMission = {
  visionId:
    "Terwujudnya generasi muda murid Kristus yang berakar dalam firman Tuhan, berbuah dalam karakter ilahi, dan diutus menjadi garam serta terang bagi pemulihan bangsa.",
  visionEn:
    "To see a young generation of Christ's disciples deeply rooted in God's word, bearing fruit in godly character, and sent as salt and light for the transformation of the nation.",
  missionListId: [
    "Menjangkau siswa dan mahasiswa melalui persekutuan dan pendekatan yang relevan.",
    "Memuridkan secara intensif dalam kelompok kecil yang berpusat pada Alkitab.",
    "Mengutus lulusan dan alumni ke dunia kerja, gereja lokal, dan ladang misi Nusantara.",
  ],
  missionListEn: [
    "Reaching students on campuses and schools through relevant evangelism and fellowship.",
    "Intensively discipling through small biblical life-on-life groups.",
    "Sending graduates and alumni into professional marketplace, local churches, and mission frontiers.",
  ],
};

const defaultRegions: AboutRegions = {
  bantenTitleId: "Wilayah Banten (Serang, Cilegon, Tangerang)",
  bantenTitleEn: "Banten Region (Serang, Cilegon, Tangerang)",
  bantenDescId:
    "Pusat pergerakan pembinaan siswa SMA dan mahasiswa kampus di tanah jawara, membangun persekutuan di tengah tantangan budaya yang majemuk.",
  bantenDescEn:
    "The heart of youth discipleship across schools and university campuses in Banten, building vibrant faith communities amid diverse cultural contexts.",
  bantenImageUrl: "",
  ternateTitleId: "Wilayah Maluku Utara (Kota Rempah Ternate)",
  ternateTitleEn: "North Maluku Region (Historic Spice Island of Ternate)",
  ternateDescId:
    "Pelayanan kepulauan yang menopang mahasiswa dan perintisan ladang misi timur Indonesia dengan ketekunan doa dan persekutuan persaudaraan.",
  ternateDescEn:
    "Island ministry supporting university students and pioneering mission frontiers in Eastern Indonesia through steadfast prayer and brotherly communion.",
  ternateImageUrl: "",
};

export default function AdminTentangKamiCMS() {
  const [history, setHistory] = useState<AboutHistory>(defaultHistory);
  const [visionMission, setVisionMission] = useState<AboutVisionMission>(defaultVisionMission);
  const [regions, setRegions] = useState<AboutRegions>(defaultRegions);
  const [legalOrg, setLegalOrg] = useState<AboutLegalOrg>(defaultLegalOrg);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Team Form Modal State
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [teamForm, setTeamForm] = useState<TeamMemberInput>({
    name: "",
    role: "",
    roleEn: "",
    community: Community.ALL,
    photo: "",
    bio: "",
    bioEn: "",
    whatsapp: "",
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [savedHist, savedVM, savedReg, savedLegal, members] = await Promise.all([
          getSiteConfig<AboutHistory>("about_history", defaultHistory),
          getSiteConfig<AboutVisionMission>("about_vision_mission", defaultVisionMission),
          getSiteConfig<AboutRegions>("about_regions", defaultRegions),
          getSiteConfig<AboutLegalOrg>("about_legal_org", defaultLegalOrg),
          getTeamMembers(),
        ]);
        if (savedHist) setHistory(savedHist);
        if (savedVM) setVisionMission(savedVM);
        if (savedReg) setRegions(savedReg);
        if (savedLegal) setLegalOrg(savedLegal);
        if (members) setTeamMembers(members);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSavePageConfig = async () => {
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      await Promise.all([
        saveSiteConfig("about_history", history),
        saveSiteConfig("about_vision_mission", visionMission),
        saveSiteConfig("about_regions", regions),
        saveSiteConfig("about_legal_org", legalOrg),
      ]);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan data Tentang Kami.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.role) {
      alert("Nama dan jabatan wajib diisi.");
      return;
    }

    try {
      if (editingMember) {
        await updateTeamMember(editingMember.id, teamForm);
      } else {
        await createTeamMember(teamForm);
      }
      setIsTeamModalOpen(false);
      setEditingMember(null);
      setTeamForm({
        name: "",
        role: "",
        roleEn: "",
        community: Community.ALL,
        photo: "",
        bio: "",
        bioEn: "",
        whatsapp: "",
        isActive: true,
      });
      const updated = await getTeamMembers();
      setTeamMembers(updated);
    } catch (err) {
      alert("Gagal menyimpan data pengurus.");
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Hapus pengurus/staf ini?")) return;
    try {
      await deleteTeamMember(id);
      const updated = await getTeamMembers();
      setTeamMembers(updated);
    } catch (err) {
      alert("Gagal menghapus pengurus.");
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
            <BookOpen className="size-3.5" />
            <span>KONTEN HALAMAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Halaman Tentang Kami
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Atur sejarah kegelisahan, visi & misi, wilayah pelayanan (Banten & Ternate), dan pengurus tim.
          </p>
        </div>

        <button
          onClick={handleSavePageConfig}
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
          <span>Perubahan halaman Tentang Kami berhasil disimpan dan langsung aktif di website publik!</span>
        </div>
      )}

      {/* 1. SEJARAH & KEGELISAHAN AWAL */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <h2 className="text-base font-bold text-foreground">1. Sejarah & Kegelisahan Awal Pelayanan</h2>
          <p className="text-xs text-muted-foreground">Narasi awal mula kerinduan ESM lahir di Banten dan Maluku Utara.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Judul Bagian (ID)</label>
            <input
              type="text"
              value={history.titleId}
              onChange={(e) => setHistory({ ...history, titleId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-foreground">Judul Bagian (EN)</label>
              <AutoTranslateButton
                sourceText={history.titleId}
                onTranslated={(txt) => setHistory({ ...history, titleEn: txt })}
              />
            </div>
            <input
              type="text"
              value={history.titleEn}
              onChange={(e) => setHistory({ ...history, titleEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Kisah / Cerita Narasi (ID)</label>
            <textarea
              rows={5}
              value={history.storyId}
              onChange={(e) => setHistory({ ...history, storyId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-foreground">Story Narrative (EN)</label>
              <AutoTranslateButton
                sourceText={history.storyId}
                onTranslated={(txt) => setHistory({ ...history, storyEn: txt })}
              />
            </div>
            <textarea
              rows={5}
              value={history.storyEn}
              onChange={(e) => setHistory({ ...history, storyEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
        </div>

        <MediaUploader
          label="Foto / Video Dokumentasi Awal"
          value={history.mediaUrl}
          onChange={(url) => setHistory({ ...history, mediaUrl: url })}
          folder="about"
          accept="all"
          helperText="Upload foto arsip sejarah pelayanan atau link video dokumentasi."
        />
      </div>

      {/* 2. VISI & MISI */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <h2 className="text-base font-bold text-foreground">2. Visi & Misi Pelayanan</h2>
          <p className="text-xs text-muted-foreground">Pondasi arah gerak pelayanan ESM di seluruh Indonesia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Pernyataan Visi (ID)</label>
            <textarea
              rows={3}
              value={visionMission.visionId}
              onChange={(e) => setVisionMission({ ...visionMission, visionId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-foreground">Vision Statement (EN)</label>
              <AutoTranslateButton
                sourceText={visionMission.visionId}
                onTranslated={(txt) => setVisionMission({ ...visionMission, visionEn: txt })}
              />
            </div>
            <textarea
              rows={3}
              value={visionMission.visionEn}
              onChange={(e) => setVisionMission({ ...visionMission, visionEn: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
        </div>

        {/* Mission Points */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground">Poin-poin Misi</label>
            <button
              type="button"
              onClick={() => {
                setVisionMission({
                  ...visionMission,
                  missionListId: [...visionMission.missionListId, ""],
                  missionListEn: [...visionMission.missionListEn, ""],
                });
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <Plus className="size-3.5" /> Tambah Poin Misi
            </button>
          </div>

          {visionMission.missionListId.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-muted/20 rounded-xl border border-border relative group">
              <div>
                <input
                  type="text"
                  placeholder={`Misi ${idx + 1} (ID)`}
                  value={item}
                  onChange={(e) => {
                    const updated = [...visionMission.missionListId];
                    updated[idx] = e.target.value;
                    setVisionMission({ ...visionMission, missionListId: updated });
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Misi ${idx + 1} (EN)`}
                  value={visionMission.missionListEn[idx] || ""}
                  onChange={(e) => {
                    const updated = [...visionMission.missionListEn];
                    updated[idx] = e.target.value;
                    setVisionMission({ ...visionMission, missionListEn: updated });
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
                <AutoTranslateButton
                  sourceText={item}
                  onTranslated={(txt) => {
                    const updated = [...visionMission.missionListEn];
                    updated[idx] = txt;
                    setVisionMission({ ...visionMission, missionListEn: updated });
                  }}
                />
                {visionMission.missionListId.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updatedId = visionMission.missionListId.filter((_, i) => i !== idx);
                      const updatedEn = visionMission.missionListEn.filter((_, i) => i !== idx);
                      setVisionMission({
                        ...visionMission,
                        missionListId: updatedId,
                        missionListEn: updatedEn,
                      });
                    }}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WILAYAH PELAYANAN (BANTEN & TERNATE) */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <MapPin className="size-3.5" />
            <span>FOKUS GEOGRAFIS</span>
          </div>
          <h2 className="text-base font-bold text-foreground">3. Wilayah Pelayanan (Banten & Maluku Utara)</h2>
          <p className="text-xs text-muted-foreground">Deskripsi dan media dokumentasi untuk kedua ladang pelayanan.</p>
        </div>

        {/* Banten */}
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
          <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">A. Wilayah Banten</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Judul / Tagline (ID)</label>
              <input
                type="text"
                value={regions.bantenTitleId}
                onChange={(e) => setRegions({ ...regions, bantenTitleId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Judul / Tagline (EN)</label>
                <AutoTranslateButton
                  sourceText={regions.bantenTitleId}
                  onTranslated={(txt) => setRegions({ ...regions, bantenTitleEn: txt })}
                />
              </div>
              <input
                type="text"
                value={regions.bantenTitleEn}
                onChange={(e) => setRegions({ ...regions, bantenTitleEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Wilayah Banten (ID)</label>
              <textarea
                rows={3}
                value={regions.bantenDescId}
                onChange={(e) => setRegions({ ...regions, bantenDescId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                <AutoTranslateButton
                  sourceText={regions.bantenDescId}
                  onTranslated={(txt) => setRegions({ ...regions, bantenDescEn: txt })}
                />
              </div>
              <textarea
                rows={3}
                value={regions.bantenDescEn}
                onChange={(e) => setRegions({ ...regions, bantenDescEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
          <MediaUploader
            label="Foto Wilayah Banten"
            value={regions.bantenImageUrl}
            onChange={(url) => setRegions({ ...regions, bantenImageUrl: url })}
            folder="regions"
            accept="image"
          />
        </div>

        {/* Ternate */}
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
          <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">B. Wilayah Maluku Utara (Ternate)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Judul / Tagline (ID)</label>
              <input
                type="text"
                value={regions.ternateTitleId}
                onChange={(e) => setRegions({ ...regions, ternateTitleId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Judul / Tagline (EN)</label>
                <AutoTranslateButton
                  sourceText={regions.ternateTitleId}
                  onTranslated={(txt) => setRegions({ ...regions, ternateTitleEn: txt })}
                />
              </div>
              <input
                type="text"
                value={regions.ternateTitleEn}
                onChange={(e) => setRegions({ ...regions, ternateTitleEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Wilayah Maluku Utara (ID)</label>
              <textarea
                rows={3}
                value={regions.ternateDescId}
                onChange={(e) => setRegions({ ...regions, ternateDescId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Deskripsi (EN)</label>
                <AutoTranslateButton
                  sourceText={regions.ternateDescId}
                  onTranslated={(txt) => setRegions({ ...regions, ternateDescEn: txt })}
                />
              </div>
              <textarea
                rows={3}
                value={regions.ternateDescEn}
                onChange={(e) => setRegions({ ...regions, ternateDescEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
          <MediaUploader
            label="Foto Wilayah Ternate / Maluku Utara"
            value={regions.ternateImageUrl}
            onChange={(url) => setRegions({ ...regions, ternateImageUrl: url })}
            folder="regions"
            accept="image"
          />
        </div>
      </div>

      {/* 4. BADAN HUKUM YAYASAN MMB & BAGAN ORGANISASI */}
      <div id="legal-org" className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
            <Building2 className="size-3.5" />
            <span>LEGALITAS & BAGAN ORGANISASI</span>
          </div>
          <h2 className="text-base font-bold text-foreground">
            4. Badan Hukum Yayasan MMB (Murid Muda Bermisi) & Bagan Organisasi
          </h2>
          <p className="text-xs text-muted-foreground">
            Atur SK AHU Kemenkumham, kontak Sekretaris Yayasan, Ketua Yayasan, serta struktur hierarki Tingkat 1 (Naungan Hukum), Tingkat 2 (Sekjen / Koordinator Nasional Gerakan ESM), dan Tingkat 3 (Banten - Ternate).
          </p>
        </div>

        {/* 4.1 Identitas Legalitas Yayasan MMB */}
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>A. Identitas & Legalitas Yayasan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nama Resmi Yayasan</label>
              <input
                type="text"
                value={legalOrg.foundationName}
                onChange={(e) => setLegalOrg({ ...legalOrg, foundationName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                placeholder="Yayasan Murid Muda Bermisi"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Singkatan Yayasan</label>
              <input
                type="text"
                value={legalOrg.foundationAbbr}
                onChange={(e) => setLegalOrg({ ...legalOrg, foundationAbbr: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                placeholder="Yayasan MMB"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nomor SK AHU Kemenkumham</label>
              <input
                type="text"
                value={legalOrg.skAhu}
                onChange={(e) => setLegalOrg({ ...legalOrg, skAhu: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background font-mono font-bold"
                placeholder="AHU-0013520.AH.01.04.Tahun 2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nama Ketua Yayasan</label>
              <input
                type="text"
                value={legalOrg.foundationHead}
                onChange={(e) => setLegalOrg({ ...legalOrg, foundationHead: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                placeholder="Markus P., M.Div."
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nama Sekretaris Yayasan</label>
              <input
                type="text"
                value={legalOrg.secretaryName}
                onChange={(e) => setLegalOrg({ ...legalOrg, secretaryName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                placeholder="Hana Kristianti, S.E."
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nomor Kontak Sekretaris Yayasan</label>
              <input
                type="text"
                value={legalOrg.secretaryPhone}
                onChange={(e) => setLegalOrg({ ...legalOrg, secretaryPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                placeholder="+62 812-9610-6611"
              />
            </div>
          </div>
        </div>

        {/* 4.2 Bagan Organisasi Gerakan (Tingkat 1, 2, 3) */}
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
            <Network className="size-4 text-primary" />
            <span>B. Bagan Organisasi Gerakan (Tingkat 1, 2 & 3)</span>
          </div>

          {/* Tingkat 1 */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Tingkat 1 — Naungan Hukum
              </span>
              <span className="text-[10px] text-stone-500">
                (Nama Yayasan, Ketua Yayasan, SK AHU, dan Kontak Sekretaris diambil otomatis)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Label Tingkat 1 (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier1BadgeId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier1BadgeId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Tingkat 1 • Naungan Hukum"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Label Tingkat 1 (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier1BadgeId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier1BadgeEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier1BadgeEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier1BadgeEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Level 1 • Legal Umbrella"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Subteks Pengawas / Pembina (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier1SubId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier1SubId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Dewan Pembina, Penasihat Hukum & Pengawas Yayasan"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Subteks Pengawas / Pembina (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier1SubId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier1SubEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier1SubEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier1SubEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Board of Trustees, Legal Advisors & Foundation Supervisors"
                />
              </div>
            </div>
          </div>

          {/* Tingkat 2 */}
          <div className="p-3.5 rounded-xl bg-stone-900 text-white space-y-3">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wide block">
              Tingkat 2 — Sekretaris Jenderal (Koordinator Nasional Gerakan ESM)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Label Tingkat 2 (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier2BadgeId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier2BadgeId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-700 bg-stone-800 text-white"
                  placeholder="Tingkat 2 • Sekretaris Jendral (Koordinator Nasional Gerakan ESM)"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-200">Label Tingkat 2 (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier2BadgeId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier2BadgeEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier2BadgeEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier2BadgeEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-700 bg-stone-800 text-white"
                  placeholder="Level 2 • Secretary General (National Coordinator of ESM Movement)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-white block mb-1">Nama Pimpinan / Sekjen</label>
                <input
                  type="text"
                  value={legalOrg.tier2LeaderName}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier2LeaderName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-700 bg-stone-800 text-white font-bold"
                  placeholder="Pdt. Daniel S. Th., M.Min."
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-200 block mb-1">Jabatan Subteks (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier2RoleSubId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier2RoleSubId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-700 bg-stone-800 text-white"
                  placeholder="Sekretaris Jenderal / Koordinator Nasional Gerakan ESM & Dewan Pembina Rohani"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-200">Jabatan Subteks (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier2RoleSubId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier2RoleSubEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier2RoleSubEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier2RoleSubEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-700 bg-stone-800 text-white"
                  placeholder="Secretary General / National Coordinator of ESM Movement & Spiritual Oversight"
                />
              </div>
            </div>
          </div>

          {/* Tingkat 3 - Ladang Pelayanan Lapangan: Banten - Ternate */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-3">
            <span className="text-xs font-bold text-foreground uppercase tracking-wide block">
              Tingkat 3 — Ladang Pelayanan Lapangan: Banten - Ternate
            </span>

            {/* Banten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Wilayah Banten (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier3BantenDescId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier3BantenDescId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Pelayanan Siswa & Kampus Mahasiswa (Explore & Encounter Serang, Cilegon, Tangerang)"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Deskripsi Wilayah Banten (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier3BantenDescId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier3BantenDescEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier3BantenDescEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier3BantenDescEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="High School & Campus Ministry (Explore & Encounter Serang, Cilegon, Tangerang)"
                />
              </div>
            </div>

            {/* Ternate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Wilayah Ternate (ID)</label>
                <input
                  type="text"
                  value={legalOrg.tier3TernateDescId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier3TernateDescId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Perintisan Pelayanan Siswa & Kampus Mahasiswa Maluku Utara (Kota Rempah)"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Deskripsi Wilayah Ternate (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.tier3TernateDescId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, tier3TernateDescEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.tier3TernateDescEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, tier3TernateDescEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  placeholder="Pioneering Student & Campus Ministry across North Maluku (Spice Islands)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4.3 Teks Pernyataan Hukum & 3 Butir Akuntabilitas */}
        <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
            <BookOpen className="size-4 text-amber-700" />
            <span>C. Narasi Pernyataan Hukum & 3 Butir Akuntabilitas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Deskripsi Pernyataan Hukum (ID)</label>
              <textarea
                rows={3}
                value={legalOrg.legalStatementDescId}
                onChange={(e) => setLegalOrg({ ...legalOrg, legalStatementDescId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Deskripsi Pernyataan Hukum (EN)</label>
                <AutoTranslateButton
                  sourceText={legalOrg.legalStatementDescId}
                  onTranslated={(txt) => setLegalOrg({ ...legalOrg, legalStatementDescEn: txt })}
                />
              </div>
              <textarea
                rows={3}
                value={legalOrg.legalStatementDescEn}
                onChange={(e) => setLegalOrg({ ...legalOrg, legalStatementDescEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>

          {/* 3 Butir */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Butir 1: Independensi Parachurch (ID)</label>
                <input
                  type="text"
                  value={legalOrg.point1DescId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point1DescId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Butir 1 (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.point1DescId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, point1DescEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.point1DescEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point1DescEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Butir 2: Payung Legalitas & SK AHU (ID)</label>
                <input
                  type="text"
                  value={legalOrg.point2DescId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point2DescId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Butir 2 (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.point2DescId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, point2DescEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.point2DescEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point2DescEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Butir 3: Akuntabilitas Tata Kelola (ID)</label>
                <input
                  type="text"
                  value={legalOrg.point3DescId}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point3DescId: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Butir 3 (EN)</label>
                  <AutoTranslateButton
                    sourceText={legalOrg.point3DescId}
                    onTranslated={(txt) => setLegalOrg({ ...legalOrg, point3DescEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  value={legalOrg.point3DescEn}
                  onChange={(e) => setLegalOrg({ ...legalOrg, point3DescEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. DEWAN PENGURUS & TIM PELAYANAN */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-6 shadow-warm-sm">
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <UserCheck className="size-3.5" />
              <span>TIM & PENGURUS</span>
            </div>
            <h2 className="text-base font-bold text-foreground">5. Struktur Dewan Pengurus & Staf Pelayanan</h2>
            <p className="text-xs text-muted-foreground">Kelola profil, foto pengurus, jabatan, dan bio anggota tim.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingMember(null);
              setTeamForm({
                name: "",
                role: "",
                roleEn: "",
                community: Community.ALL,
                photo: "",
                bio: "",
                bioEn: "",
                whatsapp: "",
                isActive: true,
              });
              setIsTeamModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-xs"
          >
            <Plus className="size-3.5" /> Tambah Anggota Tim
          </button>
        </div>

        {teamMembers.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-border rounded-xl">
            <p className="text-xs text-muted-foreground">Belum ada anggota tim terdaftar. Klik tombol Tambah Anggota Tim.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="size-14 rounded-full bg-muted border border-border relative overflow-hidden shrink-0">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-sm text-primary">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{member.name}</h4>
                    <p className="text-[11px] text-primary font-medium truncate">{member.role}</p>
                    {member.roleEn && (
                      <p className="text-[10px] text-muted-foreground italic truncate">{member.roleEn}</p>
                    )}
                  </div>
                </div>

                {member.bio && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{member.bio}</p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${member.isActive ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"}`}>
                    {member.isActive ? "Aktif" : "Non-aktif"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMember(member);
                        setTeamForm({
                          name: member.name,
                          role: member.role,
                          roleEn: member.roleEn || "",
                          community: member.community || Community.ALL,
                          photo: member.photo || "",
                          bio: member.bio || "",
                          bioEn: member.bioEn || "",
                          whatsapp: member.whatsapp || "",
                          isActive: member.isActive ?? true,
                        });
                        setIsTeamModalOpen(true);
                      }}
                      className="p-1 text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded"
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

      {/* MODAL FORM ANGGOTA TIM */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {editingMember ? "Sunting Data Pengurus" : "Tambah Anggota Tim Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsTeamModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <MediaUploader
                label="Foto Profil Anggota"
                value={teamForm.photo || ""}
                onChange={(url) => setTeamForm({ ...teamForm, photo: url })}
                folder="team"
                accept="image"
              />

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pdt. Yusuf Raja, M.Th."
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Jabatan / Role (ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Koordinator Wilayah"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-foreground">Role (EN)</label>
                    <AutoTranslateButton
                      sourceText={teamForm.role}
                      onTranslated={(txt) => setTeamForm({ ...teamForm, roleEn: txt })}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Regional Coordinator"
                    value={teamForm.roleEn || ""}
                    onChange={(e) => setTeamForm({ ...teamForm, roleEn: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Divisi / Komunitas</label>
                  <select
                    value={teamForm.community}
                    onChange={(e) => setTeamForm({ ...teamForm, community: e.target.value as Community })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  >
                    <option value={Community.ALL}>Seluruh Tim / Umum</option>
                    <option value={Community.EXPLORE}>Explore (SMA)</option>
                    <option value={Community.ENCOUNTER}>Encounter (Kampus)</option>
                    <option value={Community.CONNECT}>Connect (Alumni/Profesional)</option>
                    <option value={Community.LEADERSHIP}>Dewan Pembina / Pimpinan</option>
                    <option value={Community.STAFF}>Staf Pelayanan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">No. WhatsApp (Opsional)</label>
                  <input
                    type="text"
                    placeholder="628123456789"
                    value={teamForm.whatsapp || ""}
                    onChange={(e) => setTeamForm({ ...teamForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Bio Singkat (ID)</label>
                <textarea
                  rows={2}
                  value={teamForm.bio || ""}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={teamForm.isActive}
                    onChange={(e) => setTeamForm({ ...teamForm, isActive: e.target.checked })}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span>Tampilkan di Halaman Publik</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  Simpan Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
