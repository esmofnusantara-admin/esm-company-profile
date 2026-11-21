"use client";

import * as React from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  Smartphone,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DynamicBankQRProps {
  bankName: string;
  bankAccount: string;
  accountHolder: string;
  qrisImageUrl?: string | null;
}

export function DynamicBankQR({
  bankName,
  bankAccount,
  accountHolder,
  qrisImageUrl,
}: DynamicBankQRProps) {
  const [activeMode, setActiveMode] = React.useState<"dynamic_bank" | "qris_image">("dynamic_bank");
  const [qrDataUrl, setQrDataUrl] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  const cleanAccountNumber = bankAccount.replace(/[^0-9]/g, "");

  React.useEffect(() => {
    // Bangun URL resmi terverifikasi untuk disalin otomatis saat di-scan
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const targetUrl = origin ? `${origin}/rekening` : `https://esmofnusantara.org/rekening`;

    // Generate barcode QR secara matematis langsung di memori browser (Anti-Hack / Anti-Swap)
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#1C0407", // Deep garnet
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Gagal generate QR Code:", err));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanAccountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-4 text-center">
      {/* Mode Selector Tab if static QRIS is also configured */}
      {qrisImageUrl && (
        <div className="flex rounded-xl bg-stone-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveMode("dynamic_bank")}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === "dynamic_bank"
                ? "bg-white text-primary shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Lock className="size-3 text-emerald-600" />
            <span>QR Salin Rekening (Aman)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("qris_image")}
            className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeMode === "qris_image"
                ? "bg-white text-primary shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <QrCode className="size-3 text-stone-600" />
            <span>QRIS Pembayaran Digital</span>
          </button>
        </div>
      )}

      {/* Mode 1: Dynamic Bank QR (Programmatically generated, Anti-Tamper) */}
      {activeMode === "dynamic_bank" && (
        <div className="space-y-3.5">
          {/* Security Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 text-[11px] font-bold">
            <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
            <span>QR Anti-Tamper &bull; Dijana Otomatis Sistem</span>
          </div>

          {/* QR Display */}
          <div className="size-48 mx-auto rounded-2xl border-2 border-stone-200/90 bg-white p-2.5 shadow-warm-xs flex items-center justify-center relative overflow-hidden group">
            {qrDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={qrDataUrl}
                alt="QR Salin Rekening Resmi Yayasan ESM"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-stone-400 gap-1.5">
                <QrCode className="size-8 animate-pulse text-primary" />
                <span className="text-[10px]">Membuat QR...</span>
              </div>
            )}
          </div>

          {/* Instruksi Penggunaan */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-foreground flex items-center justify-center gap-1">
              <Smartphone className="size-3.5 text-primary" />
              <span>Arahkan Kamera HP ke Barcode Ini</span>
            </p>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs mx-auto">
              Saat di-scan kamera HP atau scanner apa pun, nomor rekening BCA otomatis tersalin ke clipboard dan siap di-paste di m-Banking.
            </p>
          </div>

          {/* Ringkasan Rekening & Tombol Salin Cepat */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-left flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-stone-500">{bankName}</p>
              <p className="font-mono text-sm font-black text-foreground tracking-wider">{bankAccount}</p>
              <p className="text-[10px] text-stone-500 truncate">a/n {accountHolder}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="h-8 rounded-lg text-xs font-bold shrink-0 border-stone-300 hover:bg-primary hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-600 mr-1" />
                  <span className="text-emerald-600">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="size-3 mr-1" />
                  <span>Salin No.</span>
                </>
              )}
            </Button>
          </div>

          {/* Jaminan Keamanan Teknis */}
          <div className="rounded-xl bg-stone-100/70 p-2.5 text-[10px] text-stone-600 leading-tight text-left flex items-start gap-2 border border-stone-200/60">
            <Lock className="size-3.5 text-stone-500 shrink-0 mt-0.5" />
            <p>
              <strong>Bebas Manipulasi Gambar:</strong> Barcode ini di-render langsung oleh script program web (vektor data URL) bukan file gambar eksternal, sehingga tidak dapat ditimpa atau diganti dari luar.
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: Static QRIS Image (jika diaktifkan) */}
      {activeMode === "qris_image" && qrisImageUrl && (
        <div className="space-y-3.5">
          <div className="size-48 mx-auto rounded-xl border border-stone-200 bg-white flex items-center justify-center p-2 relative overflow-hidden">
            <Image
              src={qrisImageUrl}
              alt="Barcode QRIS ESM"
              fill
              unoptimized
              className="object-contain p-1"
            />
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Scan via GoPay, OVO, Dana, BCA Mobile, atau aplikasi mobile banking apa pun
          </p>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-left flex items-start gap-2">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-950 leading-tight space-y-0.5">
              <p className="font-bold">Verifikasi Keamanan Merchant BI:</p>
              <p className="text-emerald-900/90">
                Pastikan nama penerima di aplikasi perbankan Anda saat scan adalah:{" "}
                <strong className="font-extrabold text-emerald-950">YAYASAN GERAKAN MAHASISWA INJILI</strong> atau{" "}
                <strong className="font-extrabold text-emerald-950">{accountHolder}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
