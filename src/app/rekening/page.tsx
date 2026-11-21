"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  ArrowRight,
  MessageCircle,
  Lock,
} from "lucide-react";

export default function RekeningResmiPage() {
  const [copied, setCopied] = React.useState(false);
  const [autoCopied, setAutoCopied] = React.useState(false);

  // Data Rekening Resmi
  const bankName = "Bank Central Asia (BCA)";
  const accountNumberFormatted = "8420-991-888";
  const accountNumberRaw = "8420991888";
  const accountHolder = "Yayasan Evangelical Student Movement";
  const branch = "KCU Serang";
  const waNumber = "6281296106611";

  // Otomatis salin ke clipboard saat halaman dibuka (dari scan QR kamera HP)
  React.useEffect(() => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(accountNumberRaw)
        .then(() => {
          setCopied(true);
          setAutoCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch(() => {
          // Clipboard browser permission
        });
    }
  }, []);

  const handleManualCopy = () => {
    navigator.clipboard.writeText(accountNumberRaw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Header Security Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-900 text-xs font-bold shadow-xs">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>Verifikasi Keamanan Rekening Resmi ESM</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              Rekening Donasi & Kemitraan Misi
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Halaman ini terbuka dari pemindaian Barcode Resmi Anti-Tamper. Nomor rekening telah terverifikasi langsung oleh sistem yayasan.
            </p>
          </div>

          {/* Auto-Copied Banner */}
          {autoCopied && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-warm-md flex items-start gap-3 animate-in fade-in-50 slide-in-from-top-3 duration-500">
              <CheckCircle2 className="size-5 shrink-0 text-white mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-black text-sm">Nomor Rekening Berhasil Disalin!</p>
                <p className="text-white/90 mt-0.5">
                  Nomor <b>{accountNumberRaw}</b> sudah ada di clipboard HP Anda. Silakan buka aplikasi m-Banking Anda lalu <b>Paste / Tempel</b>.
                </p>
              </div>
            </div>
          )}

          {/* Main Account Details Card */}
          <div className="rounded-3xl border-2 border-stone-200/90 bg-white p-6 sm:p-8 shadow-warm-lg space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Building2 className="size-4" />
                <span>Bank Penerima</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {bankName}
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-stone-500 uppercase tracking-widest font-bold">
                Nomor Rekening Resmi
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-black text-foreground tracking-wider select-all">
                {accountNumberFormatted}
              </div>
              <p className="text-xs text-stone-600 pt-1">
                Atas Nama: <strong className="text-stone-900 font-extrabold">{accountHolder}</strong>
              </p>
              <p className="text-[11px] text-stone-400">Kantor Cabang: {branch}</p>
            </div>

            {/* Big Action Copy Button */}
            <Button
              type="button"
              onClick={handleManualCopy}
              size="lg"
              className={`w-full rounded-2xl py-6 text-sm font-bold shadow-warm-md transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-primary hover:bg-primary/90 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="size-4 mr-2" />
                  <span>Nomor Rekening Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  <span>Salin Nomor Rekening BCA</span>
                </>
              )}
            </Button>

            {/* Technical Anti-Tamper Assurance */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                <Lock className="size-3.5 text-emerald-600" />
                <span>Jaminan Anti-Intersepsi & Pemalsuan</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Tautan dan barcode ini diterbitkan secara otomatis dan dienkripsi oleh server resmi ESM. Rekening atas nama yayasan dilindungi perizinan resmi Kemenkumham.
              </p>
            </div>
          </div>

          {/* Quick External Actions */}
          <div className="space-y-3 pt-2">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-2xl py-6 text-xs sm:text-sm font-bold border-stone-300 hover:bg-white text-stone-800"
            >
              <Link href="/kemitraan#konfirmasi">
                <span>Lanjut ke Formulir Konfirmasi Donasi</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full rounded-2xl py-5 text-xs text-stone-600 hover:text-primary hover:bg-stone-200/50"
            >
              <a
                href={`https://wa.me/${waNumber}?text=Halo%20Bendahara%20ESM,%20saya%20telah%20mentransfer%20donasi%20misi.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 mr-1.5 text-emerald-600" />
                <span>Konfirmasi via WhatsApp Bendahara ({waNumber})</span>
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
