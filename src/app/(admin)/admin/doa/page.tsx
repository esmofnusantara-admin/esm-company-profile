"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getPrayerRequests,
  createPrayerRequest,
  updatePrayerRequest,
  deletePrayerRequest,
  PrayerRequestInput,
} from "@/actions/prayer";
import {
  getUserPrayers,
  updateUserPrayerStatus,
  deleteUserPrayer,
} from "@/actions/userPrayer";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import {
  HeartHandshake,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle2,
  CheckCircle,
  Inbox,
  Shield,
  Eye,
  Check,
  X,
  RefreshCw,
  MapPin,
  Lock,
  Globe,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function AdminDoaCMS() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"cms" | "inbox">("cms");

  // Official CMS Prayers
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

  // User Inbound Prayers
  const [userPrayers, setUserPrayers] = useState<any[]>([]);
  const [loadingUserPrayers, setLoadingUserPrayers] = useState(false);

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

  const loadUserPrayers = useCallback(async () => {
    setLoadingUserPrayers(true);
    try {
      const data = await getUserPrayers();
      setUserPrayers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUserPrayers(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    loadUserPrayers();
  }, [loadUserPrayers]);

  const handleUserPrayerStatus = async (id: string, status: "APPROVED" | "REJECTED" | "PENDING") => {
    const res = await updateUserPrayerStatus(id, status);
    if (res.success) {
      toast({
        title: "Status Doa Diperbarui",
        description: `Status diubah menjadi ${status}.`,
        type: "success",
      });
      loadUserPrayers();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal mengubah status doa",
        type: "error",
      });
    }
  };

  const handleDeleteUserPrayer = async (id: string) => {
    if (!confirm("Hapus permohonan doa pengunjung ini?")) return;
    const res = await deleteUserPrayer(id);
    if (res.success) {
      toast({
        title: "Doa Dihapus",
        description: "Permohonan doa berhasil dihapus.",
        type: "success",
      });
      loadUserPrayers();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal menghapus doa",
        type: "error",
      });
    }
  };

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

  const pendingPrayersCount = userPrayers.filter((p) => p.status === "PENDING").length;

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
            Manajemen Pokok Doa & Mezbah Syafaat
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola pokok doa bulanan resmi serta tinjau permohonan doa yang masuk dari jemaat dan pengunjung.
          </p>
        </div>

        {activeTab === "cms" && (
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Plus className="size-4" />
            <span>Tambah Pokok Doa CMS</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("cms")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "cms"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <HeartHandshake className="size-4" />
          <span>Pokok Doa Bulanan Resmi (CMS)</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-muted font-bold">
            {items.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "inbox"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Inbox className="size-4" />
          <span>Inbox Doa Jemaat / Pengunjung</span>
          {pendingPrayersCount > 0 ? (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-bold animate-pulse">
              {pendingPrayersCount} Baru
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-muted font-bold">
              {userPrayers.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: CMS Prayers */}
      {activeTab === "cms" && (
        <>
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
        </>
      )}

      {/* TAB 2: Inbound User Prayers */}
      {activeTab === "inbox" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Daftar permohonan doa yang dikirimkan oleh jemaat dan pengunjung melalui formulir di halaman <strong>/doa</strong>.
            </p>
            <button
              onClick={loadUserPrayers}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <RefreshCw className="size-3" />
              <span>Segarkan Inbox</span>
            </button>
          </div>

          {loadingUserPrayers ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          ) : userPrayers.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
              <Inbox className="size-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Belum ada permohonan doa pengunjung.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="py-3 px-4">Pengirim & Wilayah</th>
                      <th className="py-3 px-4">Pokok Doa</th>
                      <th className="py-3 px-4">Sifat & Tanggal</th>
                      <th className="py-3 px-4">Status & Persetujuan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {userPrayers.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                        <td className="py-3.5 px-4 space-y-1">
                          <span className="font-bold text-foreground block">
                            {p.name || "Anonim"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="size-3 text-red-500" />
                            <span>{p.region || "Banten"}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-md">
                          <p className="text-xs text-foreground leading-relaxed">
                            {p.prayerRequest}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 space-y-1 whitespace-nowrap">
                          {p.isPrivate ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                              <Lock className="size-2.5 text-stone-500" />
                              Privat (Hanya Staf)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <Globe className="size-2.5 text-blue-500" />
                              Publik (Dinding Doa)
                            </span>
                          )}
                          <span className="block text-[10px] text-muted-foreground">
                            {new Date(p.createdAt).toLocaleDateString("id-ID")}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={p.status}
                            onChange={(e) => handleUserPrayerStatus(p.id, e.target.value as any)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                              p.status === "APPROVED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : p.status === "REJECTED"
                                ? "bg-red-50 text-red-800 border-red-300"
                                : "bg-amber-50 text-amber-800 border-amber-300"
                            }`}
                          >
                            <option value="PENDING">Pending (Tinjau)</option>
                            <option value="APPROVED">Setujui (Approved)</option>
                            <option value="REJECTED">Tolak (Rejected)</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUserPrayer(p.id)}
                            title="Hapus"
                            className="size-8 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 inline-flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
