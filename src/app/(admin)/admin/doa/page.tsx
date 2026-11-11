"use client";

import { useState, useEffect } from "react";
import {
  getPrayerRequests,
  createPrayerRequest,
  updatePrayerRequest,
  deletePrayerRequest,
  PrayerRequestInput,
} from "@/actions/prayer";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { HeartHandshake, Plus, Trash2, Edit2, Loader2, CheckCircle2, CheckCircle } from "lucide-react";

export default function AdminDoaCMS() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [form, setForm] = useState<PrayerRequestInput>({
    month: "November 2026",
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    category: "MISI",
    isAnswered: false,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getPrayerRequests();
      setItems(data);
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
    if (!form.title || !form.description) {
      alert("Judul dan penjelasan pokok doa wajib diisi.");
      return;
    }

    try {
      if (editingItem) {
        await updatePrayerRequest(editingItem.id, form);
      } else {
        await createPrayerRequest(form);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setForm({
        month: "November 2026",
        title: "",
        titleEn: "",
        description: "",
        descriptionEn: "",
        category: "MISI",
        isAnswered: false,
      });
      await loadData();
    } catch (err) {
      alert("Gagal menyimpan pokok doa.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pokok doa ini?")) return;
    try {
      await deletePrayerRequest(id);
      await loadData();
    } catch (err) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <HeartHandshake className="size-3.5" />
            <span>KEMITRAAN & DOA</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Pokok Doa Bulanan (Prayer Requests)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar permohonan doa bulanan yang dibagikan kepada seluruh mitra doa dan donatur misi.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setForm({
              month: "November 2026",
              title: "",
              titleEn: "",
              description: "",
              descriptionEn: "",
              category: "MISI",
              isAnswered: false,
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="size-4" />
          <span>Tambah Pokok Doa</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-xs text-muted-foreground">Belum ada pokok doa. Klik tombol Tambah Pokok Doa.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {item.month}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {item.category}
                    </span>
                    {item.isAnswered && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="size-3" /> Terjawab
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground mt-2">{item.title}</h3>
                  {item.titleEn && (
                    <p className="text-xs text-primary font-medium italic mt-0.5">{item.titleEn}</p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setForm({
                        month: item.month,
                        title: item.title,
                        titleEn: item.titleEn || "",
                        description: item.description,
                        descriptionEn: item.descriptionEn || "",
                        category: item.category,
                        isAnswered: item.isAnswered,
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

              <div className="text-xs text-muted-foreground space-y-1.5 pt-2 border-t border-border/50">
                <p>{item.description}</p>
                {item.descriptionEn && (
                  <p className="italic text-foreground/80 pl-3 border-l-2 border-primary/30">
                    {item.descriptionEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM POKOK DOA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {editingItem ? "Sunting Pokok Doa" : "Tambah Pokok Doa Baru"}
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
                  <label className="text-xs font-bold text-foreground block mb-1">Periode Bulan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: November 2026"
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  >
                    <option value="MISI">Misi & Perintisan</option>
                    <option value="PELAYANAN">Pelayanan Siswa & Kampus</option>
                    <option value="GENERASI">Generasi Muda & Keluarga</option>
                    <option value="KEBUTUHAN">Kebutuhan Operasional & Dana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Judul Pokok Doa (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembinaan 15 Kelompok Pemuridan Baru di Banten"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Prayer Title (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.title}
                    onTranslated={(txt) => setForm({ ...form, titleEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Example: Discipleship of 15 New Small Groups in Banten"
                  value={form.titleEn || ""}
                  onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Uraian Doa (ID)</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Penjelasan pokok permohonan doa secara spesifik..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Prayer Description (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.description}
                    onTranslated={(txt) => setForm({ ...form, descriptionEn: txt })}
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Prayer description in English..."
                  value={form.descriptionEn || ""}
                  onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isAnswered}
                    onChange={(e) => setForm({ ...form, isAnswered: e.target.checked })}
                    className="rounded border-border text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Tandai sebagai Doa yang Sudah Terjawab (Kesaksian)</span>
                </label>
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
                  Simpan Pokok Doa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
