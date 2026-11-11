"use client";

import { useState, useEffect } from "react";
import {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
  TestimonyInput,
} from "@/actions/testimony";
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
  const [form, setForm] = useState<TestimonyInput>({
    name: "",
    role: "",
    quote: "",
    quoteEn: "",
    photo: "",
    isActive: true,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const items = await getTestimonies();
      setTestimonies(items);
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

    try {
      if (editingItem) {
        await updateTestimony(editingItem.id, form);
      } else {
        await createTestimony(form);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setForm({ name: "", role: "", quote: "", quoteEn: "", photo: "", isActive: true });
      await loadData();
    } catch (err) {
      alert("Gagal menyimpan testimoni.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      await deleteTestimony(id);
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
            setEditingItem(null);
            setForm({ name: "", role: "", quote: "", quoteEn: "", photo: "", isActive: true });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all"
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
          {testimonies.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-muted border border-border relative overflow-hidden shrink-0">
                    {item.photo ? (
                      <Image src={item.photo} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-primary">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-foreground truncate">{item.name}</h3>
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
                        isActive: item.isActive,
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
                  >
                    <Edit2 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg"
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

              <div className="flex items-center gap-2">
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
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
