"use client";

import { useState, useEffect } from "react";
import {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} from "@/actions/testimony";
import { type TestimonyInput } from "@/lib/testimonyData";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle2,
  User,
} from "lucide-react";
import Image from "next/image";

export default function AdminTestimoniCMS() {
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<TestimonyInput>({
    name: "",
    role: "",
    quote: "",
    quoteEn: "",
    photo: "",
    sortOrder: 1,
    isActive: true,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const items = await getTestimonies();
      setTestimonies(items || []);
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
    if (!form.name || !form.quote) {
      alert("Nama dan kutipan testimoni wajib diisi.");
      return;
    }

    const targetOrder = Number(form.sortOrder) || 1;
    const duplicate = testimonies.find(
      (t) => (editingItem ? t.id !== editingItem.id : true) && (t.sortOrder || 0) === targetOrder
    );
    if (duplicate) {
      alert(
        `Nomor urut slider #${targetOrder} sudah digunakan oleh narasumber: "${duplicate.name}". Nomor urutan harus unik dan tidak boleh kembar.`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      let res;
      if (editingItem) {
        res = await updateTestimony(editingItem.id, { ...form, sortOrder: targetOrder });
      } else {
        res = await createTestimony({ ...form, sortOrder: targetOrder });
      }

      if (res && !res.success) {
        alert(res.error || "Gagal menyimpan testimoni.");
        return;
      }

      setIsModalOpen(false);
      setEditingItem(null);
      const nextMax = testimonies.reduce((max, t) => Math.max(max, t.sortOrder || 0), targetOrder);
      setForm({
        name: "",
        role: "",
        quote: "",
        quoteEn: "",
        photo: "",
        sortOrder: nextMax + 1,
        isActive: true,
      });
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan testimoni.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      const res = await deleteTestimony(id);
      if (res && !res.success) {
        alert(res.error || "Gagal menghapus testimoni.");
        return;
      }
      await loadData();
    } catch (err) {
      alert("Gagal menghapus testimoni.");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <MessageSquareQuote className="size-3.5" />
            <span>KONTEN HALAMAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Testimoni & Kesaksian Hidup
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Testimoni siswa, mahasiswa, alumni, dan pembina yang ditampilkan di halaman beranda.
          </p>
        </div>

        <button
          onClick={() => {
            const maxOrder = testimonies.reduce((max, t) => Math.max(max, t.sortOrder || 0), 0);
            setEditingItem(null);
            setForm({
              name: "",
              role: "",
              quote: "",
              quoteEn: "",
              photo: "",
              sortOrder: maxOrder + 1,
              isActive: true,
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Tambah Testimoni</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : testimonies.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-xs text-muted-foreground">Belum ada testimoni. Klik Tambah Testimoni untuk membuat yang pertama.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...testimonies].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)).map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-muted border border-border relative overflow-hidden shrink-0">
                    {item.photo ? (
                      <Image src={item.photo} alt={item.name} fill unoptimized className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-primary">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        Urutan #{item.sortOrder ?? 1}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-foreground truncate mt-1">{item.name}</h3>
                    <p className="text-[11px] text-primary truncate">{item.role || "Alumni / Mahasiswa"}</p>
                  </div>
                </div>

                <p className="text-xs text-foreground italic border-l-2 border-primary/40 pl-3 py-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {item.quoteEn && (
                  <p className="text-[11px] text-muted-foreground italic border-l-2 border-border pl-3 py-0.5">
                    &ldquo;{item.quoteEn}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.isActive ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.isActive ? "Tayang Aktif" : "Draft / Non-aktif"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setForm({
                        name: item.name,
                        role: item.role || "",
                        quote: item.quote,
                        quoteEn: item.quoteEn || "",
                        photo: item.photo || "",
                        sortOrder: item.sortOrder ?? 1,
                        isActive: item.isActive,
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg cursor-pointer"
                  >
                    <Edit2 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM TESTIMONI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {editingItem ? "Sunting Testimoni" : "Tambah Testimoni Baru"}
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
              <MediaUploader
                label="Foto Narasumber"
                value={form.photo || ""}
                onChange={(url) => setForm({ ...form, photo: url })}
                folder="testimonies"
                accept="image"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarah Natasha"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Keterangan / Status</label>
                  <input
                    type="text"
                    placeholder="Contoh: Alumni Untirta / Encounter"
                    value={form.role || ""}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Kutipan Testimoni (ID)</label>
                <textarea
                  rows={3}
                  required
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Testimony Quote (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.quote}
                    onTranslated={(txt) => setForm({ ...form, quoteEn: txt })}
                  />
                </div>
                <textarea
                  rows={3}
                  value={form.quoteEn || ""}
                  onChange={(e) => setForm({ ...form, quoteEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Urutan Slider <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={form.sortOrder}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sortOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Harus unik (tidak boleh sama dengan testimoni lain).
                  </p>
                </div>
                <div className="pt-4">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span>Tampilkan di Beranda</span>
                  </label>
                </div>
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
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 disabled:opacity-50 cursor-pointer shadow-warm-xs"
                >
                  {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                  <span>{isSubmitting ? "Menyimpan..." : "Simpan Testimoni"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
