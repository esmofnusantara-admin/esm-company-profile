"use client";

import { useState, useEffect } from "react";
import { getBulletins, createBulletin, deleteBulletin, BulletinInput } from "@/actions/bulletin";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { FileText, Plus, Trash2, Loader2, Download, ExternalLink } from "lucide-react";

export default function AdminBuletinCMS() {
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<BulletinInput>({
    title: "",
    titleEn: "",
    edition: "",
    description: "",
    fileUrl: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const items = await getBulletins();
      setBulletins(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.fileUrl) {
      alert("Judul dan file PDF buletin wajib diisi.");
      return;
    }

    try {
      await createBulletin(form);
      setIsModalOpen(false);
      setForm({ title: "", titleEn: "", edition: "", description: "", fileUrl: "" });
      await loadData();
    } catch (err) {
      alert("Gagal menyimpan buletin.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus file buletin warta ini?")) return;
    try {
      await deleteBulletin(id);
      await loadData();
    } catch (err) {
      alert("Gagal menghapus buletin.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <FileText className="size-3.5" />
            <span>MEDIA & PUBLIKASI</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Warta & Buletin Doa Bulanan (PDF)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publikasi warta pelayanan berkala yang dapat diunduh oleh jemaat dan mitra misi.
          </p>
        </div>

        <button
          onClick={() => {
            setForm({ title: "", titleEn: "", edition: "", description: "", fileUrl: "" });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="size-4" />
          <span>Upload Buletin PDF</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : bulletins.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-xs text-muted-foreground">Belum ada buletin terunggah.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bulletins.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {b.edition || "Edisi Khusus"}
                    </span>
                    <h3 className="text-xs font-bold text-foreground truncate mt-1">{b.title}</h3>
                  </div>
                </div>

                {b.description && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{b.description}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <a
                  href={b.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold"
                >
                  <Download className="size-3" /> Unduh Dokumen
                </a>

                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM BULETIN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">Upload Warta Buletin Baru</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <MediaUploader
                label="File Dokumen PDF"
                value={form.fileUrl}
                onChange={(url) => setForm({ ...form, fileUrl: url })}
                folder="bulletins"
                accept="pdf"
                helperText="Upload file PDF buletin resmi (maksimal 50MB)."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Edisi / Terbitan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Edisi Nov 2026"
                    value={form.edition || ""}
                    onChange={(e) => setForm({ ...form, edition: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Judul Buletin (ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Warta Transformasi Banten"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Keterangan / Ringkasan Isi</label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan pokok bahasan dalam edisi ini..."
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
                  Upload Buletin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
