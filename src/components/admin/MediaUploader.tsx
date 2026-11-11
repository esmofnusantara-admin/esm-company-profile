"use client";

import { useState, useRef } from "react";
import { UploadCloud, Link as LinkIcon, X, Loader2, Image as ImageIcon, Video as VideoIcon, FileText } from "lucide-react";
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
    setInputUrl("");
  };

  const isVideo =
    value?.endsWith(".mp4") ||
    value?.endsWith(".webm") ||
    value?.includes("youtube.com") ||
    value?.includes("youtu.be");

  const isPdf = value?.endsWith(".pdf");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
              mode === "upload" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
              mode === "url" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Link / URL
          </button>
        </div>
      </div>

      {/* Preview Area */}
      {value ? (
        <div className="relative rounded-xl border border-border bg-card p-3 overflow-hidden group">
          <div className="flex items-center gap-4">
            {isVideo ? (
              <div className="size-20 rounded-lg bg-black/90 flex items-center justify-center shrink-0 overflow-hidden relative">
                {value.includes("youtube") || value.includes("youtu.be") ? (
                  <span className="text-[10px] text-red-400 font-bold">YouTube Video</span>
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
              <div className="size-20 rounded-lg bg-muted relative overflow-hidden shrink-0 border border-border">
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{value}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {isVideo ? "Video siap ditayangkan" : isPdf ? "Dokumen PDF terpasang" : "Gambar terpasang"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="inline-flex items-center gap-1 text-[11px] text-destructive hover:underline font-semibold"
                >
                  <X className="size-3" /> Hapus Media
                </button>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-primary hover:underline font-semibold"
                >
                  Lihat File ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div>
          {mode === "upload" ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border hover:border-primary/50 bg-card hover:bg-muted/30 rounded-xl p-5 text-center cursor-pointer transition-colors"
            >
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
              <div className="flex flex-col items-center justify-center gap-1.5">
                {isUploading ? (
                  <>
                    <Loader2 className="size-7 animate-spin text-primary" />
                    <span className="text-xs font-bold text-foreground">Mengunggah media...</span>
                  </>
                ) : (
                  <>
                    <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <UploadCloud className="size-5" />
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      Klik untuk upload file {accept === "video" ? "video" : accept === "pdf" ? "PDF" : "gambar/video"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Maksimal ukuran 50MB (JPG, PNG, WEBP, MP4, PDF)
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="url"
                  placeholder="https://... (URL gambar, video direct mp4, atau YouTube)"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                type="button"
                onClick={handleSetUrl}
                className="px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-xs"
              >
                Gunakan
              </button>
            </div>
          )}
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
