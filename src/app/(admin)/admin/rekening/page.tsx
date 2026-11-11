"use client";

import { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig } from "@/actions/siteConfig";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { CreditCard, Save, CheckCircle2, Loader2, QrCode } from "lucide-react";

interface BankAccountConfig {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  branch: string;
  qrisUrl: string;
  waConfirmNumber: string;
}

const defaultConfig: BankAccountConfig = {
  bankName: "Bank Central Asia (BCA)",
  accountNumber: "8420-991-888",
  accountHolder: "Yayasan Evangelical Student Movement",
  branch: "KCU Serang",
  qrisUrl: "",
  waConfirmNumber: "6281296106611",
};

export default function AdminRekeningCMS() {
  const [config, setConfig] = useState<BankAccountConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const saved = await getSiteConfig<BankAccountConfig>("bank_config", defaultConfig);
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
      await saveSiteConfig("bank_config", config);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert("Gagal menyimpan data rekening.");
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
            <CreditCard className="size-3.5" />
            <span>KEMITRAAN & KEUANGAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Rekening Bank & QRIS Donasi
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Informasi nomor rekening resmi dan gambar QRIS untuk donasi kemitraan misi.
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
              <span>Simpan Rekening</span>
            </>
          )}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Informasi rekening dan QRIS berhasil diperbarui!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-card rounded-2xl border border-border p-6 shadow-warm-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Nama Bank</label>
            <input
              type="text"
              required
              value={config.bankName}
              onChange={(e) => setConfig({ ...config, bankName: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Nomor Rekening</label>
            <input
              type="text"
              required
              value={config.accountNumber}
              onChange={(e) => setConfig({ ...config, accountNumber: e.target.value })}
              className="w-full px-3 py-2 text-xs font-bold text-primary rounded-xl border border-border bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Nama Pemilik Rekening (Atas Nama)</label>
            <input
              type="text"
              required
              value={config.accountHolder}
              onChange={(e) => setConfig({ ...config, accountHolder: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-foreground block mb-1">Cabang Bank</label>
            <input
              type="text"
              value={config.branch}
              onChange={(e) => setConfig({ ...config, branch: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <MediaUploader
            label="Upload Gambar Barcode QRIS Resmi"
            value={config.qrisUrl}
            onChange={(url) => setConfig({ ...config, qrisUrl: url })}
            folder="qris"
            accept="image"
            helperText="Upload gambar QRIS resmi dari bank/e-wallet untuk pembayaran digital langsung."
          />
        </div>

        <div className="border-t border-border pt-4">
          <label className="text-xs font-bold text-foreground block mb-1">
            Nomor WhatsApp Hotline Konfirmasi Donasi
          </label>
          <input
            type="text"
            value={config.waConfirmNumber}
            onChange={(e) => setConfig({ ...config, waConfirmNumber: e.target.value })}
            placeholder="6281296106611 (format internasional tanpa +)"
            className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            Nomor yang akan dihubungi donatur ketika mengklik tombol konfirmasi via WhatsApp.
          </p>
        </div>
      </form>
    </div>
  );
}
