"use client";

import { useState, useEffect } from "react";
import {
  getMediaItems,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
  MediaItemInput,
} from "@/actions/media";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  Layers,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { MediaType } from "@prisma/client";

const CATEGORIES = [
  { key: "ALL", label: "Semua Kategori" },
  { key: "BERANDA", label: "Sorotan Beranda" },
  { key: "BANTEN", label: "Wilayah Banten" },
  { key: "TERNATE", label: "Wilayah Maluku Utara (Ternate)" },
  { key: "CAMP", label: "Camp & Retreat Mahasiswa" },
  { key: "EXPLORE", label: "Explore (SMA)" },
  { key: "ENCOUNTER", label: "Encounter (Kampus)" },
  { key: "CONNECT", label: "Connect (Alumni)" },
  { key: "LAINNYA", label: "Lainnya" },
];

export default function AdminGaleriCMS() {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [form, setForm] = useState<MediaItemInput>({
    title: "",
    titleEn: "",
    type: MediaType.IMAGE,
    url: "",
    thumbnail: "",
    category: "BERANDA",
    description: "",
  });

  const loadData = async (cat?: string) => {
    setIsLoading(true);
    try {
      const data = await getMediaItems(cat || activeCategory);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) {
      alert("Judul dan file/URL media wajib diisi.");
      return;
    }

    try {
      if (editingItem) {
        await updateMediaItem(editingItem.id, form);
      } else {
        await createMediaItem(form);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setForm({
        title: "",
        titleEn: "",
        type: MediaType.IMAGE,
        url: "",
        thumbnail: "",
        category: "BERANDA",
        description: "",
      });
      await loadData();
    } catch (err) {
      alert("Gagal menyimpan item galeri.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus item galeri foto/video ini?")) return;
    try {
      await deleteMediaItem(id);
      await loadData();
    } catch (err) {
      alert("Gagal menghapus media.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <ImageIcon className="size-3.5" />
            <span>MEDIA & PUBLIKASI</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Galeri Foto & Video Pelayanan
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dokumentasi visual foto dan rekaman video kegiatan retreat, persekutuan, dan ladang misi.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setForm({
              title: "",
              titleEn: "",
              type: MediaType.IMAGE,
              url: "",
              thumbnail: "",
              category: "BERANDA",
              description: "",
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="size-4" />
          <span>Upload Media Baru</span>
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-xs text-muted-foreground">Belum ada foto atau video di kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card overflow-hidden shadow-warm-xs flex flex-col justify-between"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                {item.type === MediaType.VIDEO ? (
                  item.url.includes("youtube") || item.url.includes("youtu.be") ? (
                    <div className="w-full h-full bg-black/90 flex flex-col items-center justify-center text-white/80 p-4">
                      <VideoIcon className="size-8 text-red-500 mb-1" />
                      <span className="text-[11px] font-bold">YouTube Video</span>
                    </div>
                  ) : (
                    <video src={item.url} controls className="w-full h-full object-cover" />
                  )
                ) : (
                  <Image src={item.url} alt={item.title} fill className="object-cover" />
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                  {item.type}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary text-white">
                  {item.category}
                </span>
              </div>

              {/* Information */}
              <div className="p-4 space-y-2">
                <h3 className="text-xs font-bold text-foreground line-clamp-1">{item.title}</h3>
                {item.titleEn && (
                  <p className="text-[11px] text-muted-foreground italic line-clamp-1">{item.titleEn}</p>
                )}
                {item.description && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{item.description}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                  >
                    Buka <ExternalLink className="size-3" />
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setForm({
                          title: item.title,
                          titleEn: item.titleEn || "",
                          type: item.type,
                          url: item.url,
                          thumbnail: item.thumbnail || "",
                          category: item.category,
                          description: item.description || "",
                        });
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM GALERI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {editingItem ? "Sunting Media Galeri" : "Upload Foto / Video Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Tipe Media</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as MediaType })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  >
                    <option value={MediaType.IMAGE}>Foto / Gambar</option>
                    <option value={MediaType.VIDEO}>Video (MP4 / YouTube)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Kategori Halaman</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  >
                    {CATEGORIES.filter((c) => c.key !== "ALL").map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <MediaUploader
                label={form.type === MediaType.VIDEO ? "File / Link Video" : "File / Link Foto"}
                value={form.url}
                onChange={(url) => setForm({ ...form, url })}
                folder="galeri"
                accept={form.type === MediaType.VIDEO ? "video" : "image"}
                helperText="Mendukung upload file MP4/JPG/PNG atau input tautan YouTube."
              />

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Media (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Persekutuan Doa Awal Tahun di Ternate"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Title (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.title}
                    onTranslated={(txt) => setForm({ ...form, titleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Example: New Year Prayer Gathering in Ternate"
                  value={form.titleEn || ""}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Keterangan / Deskripsi (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Catatan singkat mengenai foto/video ini..."
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  Simpan Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
