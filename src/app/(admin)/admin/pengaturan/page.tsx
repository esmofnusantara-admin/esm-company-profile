"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  Settings,
  Save,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Share2,
  Palette,
  Sparkles,
  Check,
  Building2,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useThemeCustomizer, PRESET_PALETTES } from "@/context/ThemeCustomizerContext";
import { useToast } from "@/context/ToastContext";
import { AboutLegalOrg, defaultLegalOrg } from "@/lib/legalOrgConfig";

interface SiteSettingsConfig {
  phone: string;
  email: string;
  addressBanten: string;
  addressTernate: string;
  instagram: string;
  youtube: string;
  facebook: string;
  taglineId: string;
  taglineEn: string;
}

const defaultConfig: SiteSettingsConfig = {
  phone: "+62 812-9610-6611",
  email: "halo@esm.or.id",
  addressBanten: "Serang, Tangerang, Balaraja, Cilegon — Banten",
  addressTernate: "Kota Rempah (Ternate) — Maluku Utara",
  instagram: "https://instagram.com/esmofnusantara",
  youtube: "https://youtube.com/@esmofnusantara",
  facebook: "https://facebook.com/esmofnusantara",
  taglineId: "Mewujudkan generasi muda berakar dalam Kristus bagi bumi Nusantara.",
  taglineEn: "Raising a next generation rooted in Christ for the transformation of Nusantara.",
};

export default function AdminPengaturanCMS() {
  const { toast } = useToast();
  const { themePreset, customHex, setThemePreset, setCustomHex } = useThemeCustomizer();
  const [config, setConfig] = useState<SiteSettingsConfig>(defaultConfig);
  const [legalOrg, setLegalOrg] = useState<AboutLegalOrg>(defaultLegalOrg);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [savedSettings, savedLegal] = await Promise.all([
          getSiteConfig<SiteSettingsConfig>("site_settings", defaultConfig),
          getSiteConfig<AboutLegalOrg>("about_legal_org", defaultLegalOrg),
        ]);
        if (savedSettings) setConfig(savedSettings);
        if (savedLegal) setLegalOrg(savedLegal);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      await Promise.all([
        saveSiteConfig("site_settings", config),
        saveSiteConfig("about_legal_org", legalOrg),
        saveSiteConfig("site_theme", { themePreset, customHex }),
      ]);
      setSavedSuccess(true);
      toast({
        title: "Pengaturan Tersimpan",
        description: "Pengaturan narahubung, legalitas yayasan, dan tema website berhasil diperbarui.",
        type: "success",
      });
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      toast({
        title: "Gagal Menyimpan",
        description: "Terjadi kesalahan saat menyimpan pengaturan.",
        type: "error",
      });
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
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Settings className="size-3.5" />
            <span>PENGATURAN UMUM & TEMA</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Pengaturan Narahubung & Kustomisasi Warna Web
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sesuaikan palet warna tema tampilan web, kontak resmi, alamat wilayah, dan footer.
          </p>
        </div>

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
              <span>Simpan Pengaturan</span>
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Pengaturan narahubung dan tema website berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ============================================================
            KUSTOMISASI WARNA TEMA WEBSITE (Live Dynamic Palette)
            ============================================================ */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">
                Kustomisasi Warna Tema Halaman Web
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-primary flex items-center gap-1">
              <Sparkles className="size-3" />
              Live Preview
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Pilih nuansa warna utama yang diterapkan ke seluruh tombol, badge, aksen hero, dan elemen visual website secara dinamis.
          </p>

          {/* Preset Palettes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
            {PRESET_PALETTES.map((preset) => {
              const isSelected = themePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setThemePreset(preset.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                    isSelected
                      ? "border-primary bg-primary-50/50 ring-2 ring-primary/30 shadow-xs"
                      : "border-border bg-canvas hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{ backgroundColor: preset.primary }}
                      className="size-5 rounded-full border border-white/50 shadow-xs flex items-center justify-center"
                    >
                      {isSelected && <Check className="size-3 text-white" />}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {preset.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono block">
                    {preset.primary}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Hex Color Option */}
          <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-foreground block">
                Atau Tentukan Kode Warna Hex Kustom:
              </span>
              <span className="text-[11px] text-muted-foreground">
                Format warna hex (misal #BA2421)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customHex}
                onChange={(e) => {
                  setCustomHex(e.target.value);
                  setThemePreset("custom");
                }}
                className="size-8 rounded-lg cursor-pointer border border-border p-0.5 bg-canvas"
              />
              <input
                type="text"
                value={customHex}
                onChange={(e) => {
                  setCustomHex(e.target.value);
                  setThemePreset("custom");
                }}
                placeholder="#BA2421"
                className="w-28 px-3 py-1.5 text-xs font-mono font-bold rounded-xl border border-border bg-background focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        {/* Kontak Resmi */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Kontak Resmi & Narahubung</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                required
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Email Resmi</label>
              <input
                type="email"
                required
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
        </div>

        {/* Legalitas & Kontak Yayasan MMB (Murid Muda Bermisi) */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-amber-800" />
              <h2 className="text-sm font-bold text-foreground">
                Legalitas & Kontak Yayasan MMB (Murid Muda Bermisi)
              </h2>
            </div>
            <Link
              href="/admin/konten/tentang-kami#legal-org"
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Bagan Organisasi Lengkap</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Data badan hukum naungan resmi gerakan ESM Indonesia. Informasi SK AHU, nama Ketua Yayasan, dan nomor kontak Sekretaris Yayasan ini tampil pada kartu legalitas dan bagan organisasi publik.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Alamat Wilayah */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Alamat Wilayah Pelayanan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Alamat Wilayah Banten</label>
              <textarea
                rows={2}
                value={config.addressBanten}
                onChange={(e) => setConfig({ ...config, addressBanten: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Alamat Wilayah Maluku Utara</label>
              <textarea
                rows={2}
                value={config.addressTernate}
                onChange={(e) => setConfig({ ...config, addressTernate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
        </div>

        {/* Media Sosial */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3 flex items-center gap-2">
            <Share2 className="size-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Tautan Media Sosial</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Instagram URL</label>
              <input
                type="url"
                value={config.instagram}
                onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">YouTube URL</label>
              <input
                type="url"
                value={config.youtube}
                onChange={(e) => setConfig({ ...config, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Facebook URL</label>
              <input
                type="url"
                value={config.facebook}
                onChange={(e) => setConfig({ ...config, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
        </div>

        {/* Tagline Footer */}
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4 shadow-warm-sm">
          <div className="border-b border-border pb-3">
            <h2 className="text-sm font-bold text-foreground">Tagline Footer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">Tagline Singkat (ID)</label>
              <input
                type="text"
                value={config.taglineId}
                onChange={(e) => setConfig({ ...config, taglineId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-foreground">Tagline (EN)</label>
                <AutoTranslateButton
                  sourceText={config.taglineId}
                  onTranslated={(txt) => setConfig({ ...config, taglineEn: txt })}
                />
              </div>
              <input
                type="text"
                value={config.taglineEn}
                onChange={(e) => setConfig({ ...config, taglineEn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
