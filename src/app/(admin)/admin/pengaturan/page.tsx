"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { Settings, Save, CheckCircle2, Loader2, Phone, Mail, MapPin, Share2 } from "lucide-react";

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
  const [config, setConfig] = useState<SiteSettingsConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const saved = await getSiteConfig<SiteSettingsConfig>("site_settings", defaultConfig);
        if (saved) setConfig(saved);
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
      await saveSiteConfig("site_settings", config);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan pengaturan situs.");
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
            <span>PENGATURAN UMUM</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Pengaturan Narahubung, Alamat & Footer
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kontak resmi, alamat wilayah pelayanan, serta tautan media sosial di footer website.
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
              <span>Simpan Pengaturan</span>
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Pengaturan narahubung dan footer berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
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
