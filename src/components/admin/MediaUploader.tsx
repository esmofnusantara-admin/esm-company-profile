"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  Link as LinkIcon,
  X,
  Loader2,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: "image" | "video" | "all" | "pdf";
  helperText?: string;
}

export function MediaUploader({
  label,
  value,
  onChange,
  folder = "misc",
  accept = "image",
  helperText,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
        setImageError(false);
      } else {
        alert(data.error || "Gagal mengunggah file.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan teknis saat mengunggah.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetUrl = () => {
    if (!inputUrl.trim()) return;
    onChange(inputUrl.trim());
    setImageError(false);
    setInputUrl("");
  };

  const isVideo =
    accept === "video" ||
    value?.endsWith(".mp4") ||
    value?.endsWith(".webm") ||
    value?.endsWith(".mov") ||
    value?.includes("youtube.com") ||
    value?.includes("youtu.be");

  const isPdf = accept === "pdf" || value?.endsWith(".pdf");

  return (
    <div className="space-y-2">
      {/* Hidden File Input (Used for both initial upload and replacement) */}
      <input
        ref={fileInputRef}
        type="file"
        accept={
          accept === "image"
            ? "image/*"
            : accept === "video"
            ? "video/*"
            : accept === "pdf"
            ? "application/pdf"
            : "image/*,video/*,application/pdf"
        }
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
              mode === "upload"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
              mode === "url"
                ? "bg-card text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Link / URL
          </button>
        </div>
      </div>

      {/* Mode URL Active: Show URL Input Directly */}
      {mode === "url" && (
        <div className="flex items-center gap-2 p-3 bg-card rounded-xl border border-border">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="url"
              placeholder={value ? `Ganti URL saat ini: ${value}` : "https://... (URL gambar, YouTube, atau MP4)"}
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="button"
            onClick={handleSetUrl}
            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-xs"
          >
            Terapkan URL
          </button>
        </div>
      )}

      {/* When Media is Present */}
      {value ? (
        <div className="relative rounded-xl border border-border bg-card p-3 overflow-hidden shadow-xs">
          <div className="flex items-center gap-4">
            {/* Visual Thumbnail */}
            {isVideo ? (
              <div className="size-20 rounded-lg bg-black/90 flex items-center justify-center shrink-0 overflow-hidden relative border border-border">
                {value.includes("youtube") || value.includes("youtu.be") ? (
                  <span className="text-[10px] text-red-400 font-bold px-1 text-center">YouTube</span>
                ) : (
                  <video src={value} className="w-full h-full object-cover" />
                )}
                <VideoIcon className="size-6 text-white/80 absolute" />
              </div>
            ) : isPdf ? (
              <div className="size-20 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center shrink-0 text-amber-700">
                <FileText className="size-8" />
                <span className="text-[9px] font-bold mt-1">PDF DOC</span>
              </div>
            ) : (
              <div className="size-20 rounded-lg bg-muted relative overflow-hidden shrink-0 border border-border flex items-center justify-center">
                {!imageError ? (
                  <Image
                    src={value}
                    alt="Preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground p-1 text-center">
                    <ImageIcon className="size-6 mb-1 text-amber-600" />
                    <span className="text-[8px] font-semibold text-amber-700">File Belum Ada</span>
                  </div>
                )}
              </div>
            )}

            {/* Information & Action Buttons */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                  {isVideo ? "Video Aktif" : isPdf ? "Dokumen PDF" : "Foto Terpasang"}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">{value}</span>
              </div>

              {imageError && (
                <p className="text-[11px] text-amber-700 font-medium">
                  ⚠️ Gambar saat ini tidak ditemukan di server. Silakan klik tombol <b>Ganti Foto</b> di bawah untuk mengunggah foto baru.
                </p>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="size-3.5" />
                      <span>Ganti Foto / Upload Baru</span>
                    </>
                  )}
                </button>

                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted/40 transition-colors"
                >
                  <span>Buka File</span>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setImageError(false);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-destructive/20 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X className="size-3" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : mode === "upload" ? (
        /* Empty State (Upload Mode) */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border hover:border-primary/50 bg-card hover:bg-muted/30 rounded-xl p-6 text-center cursor-pointer transition-all group"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="size-8 animate-spin text-primary" />
                <span className="text-xs font-bold text-foreground">Mengunggah media ke server...</span>
              </>
            ) : (
              <>
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    Klik untuk memilih foto / file dari laptop
                  </span>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">
                    Format: JPG, PNG, WEBP, MP4 (Maksimal 50MB)
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

      {helperText && (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
