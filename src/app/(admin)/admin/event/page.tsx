"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  MapPin,
  Video,
  CheckCircle2,
  RefreshCw,
  Users2,
  MessageCircle,
  Clock,
  Check,
  Building2,
} from "lucide-react";
import { createEvent, updateEvent, deleteEvent } from "@/actions/event";
import {
  getEventRegistrations,
  updateEventRegistrationStatus,
  deleteEventRegistration,
} from "@/actions/eventRegistration";
import { useToast } from "@/context/ToastContext";

interface EventItem {
  id: string;
  title: string;
  community: "ALL" | "EXPLORE" | "ENCOUNTER" | "CONNECT";
  location?: string | null;
  startDate: string;
  description?: string | null;
  status: string;
}

export default function AdminEventPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"events" | "rsvp">("events");

  // Event CMS state
  const [editingEventId, setEditingEventId] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [community, setCommunity] = React.useState<"ALL" | "EXPLORE" | "ENCOUNTER" | "CONNECT">("ALL");
  const [location, setLocation] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [fetching, setFetching] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const formatForDateInput = (dateStr: string) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "";
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  const handleEdit = (ev: EventItem) => {
    setEditingEventId(ev.id);
    setTitle(ev.title || "");
    setCommunity(ev.community || "ALL");
    setLocation(ev.location || "");
    setStartDate(formatForDateInput(ev.startDate));
    setDescription(ev.description || "");
    // Scroll smoothly to form
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setTitle("");
    setCommunity("ALL");
    setLocation("");
    setStartDate("");
    setDescription("");
  };

  // RSVP Attendees state
  const [registrations, setRegistrations] = React.useState<any[]>([]);
  const [fetchingRsvp, setFetchingRsvp] = React.useState(false);

  const fetchEvents = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/events?status=ALL");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEvents(json.data);
      }
    } catch (err) {
      console.error("Gagal mengambil event:", err);
    } finally {
      setFetching(false);
    }
  };

  const fetchRsvp = React.useCallback(async () => {
    setFetchingRsvp(true);
    try {
      const data = await getEventRegistrations();
      setRegistrations(data || []);
    } catch (err) {
      console.error("Gagal mengambil data registrasi:", err);
    } finally {
      setFetchingRsvp(false);
    }
  }, []);

  React.useEffect(() => {
    fetchEvents();
    fetchRsvp();
  }, [fetchRsvp]);

  const handleRsvpStatusChange = async (id: string, status: string) => {
    const res = await updateEventRegistrationStatus(id, status);
    if (res.success) {
      toast({
        title: "Status Diperbarui",
        description: `Status pendaftaran diubah menjadi ${status}.`,
        type: "success",
      });
      fetchRsvp();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal mengubah status pendaftar.",
        type: "error",
      });
    }
  };

  const handleRsvpDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus data pendaftaran acara dari ${name}?`)) return;
    const res = await deleteEventRegistration(id);
    if (res.success) {
      toast({
        title: "Data Dihapus",
        description: `Pendaftaran ${name} berhasil dihapus.`,
        type: "success",
      });
      fetchRsvp();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal menghapus pendaftaran.",
        type: "error",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingEventId) {
      const res = await updateEvent(editingEventId, {
        title,
        community,
        location,
        startDate,
        description,
        status: "PUBLISHED",
      });
      setLoading(false);
      if (res.success) {
        handleCancelEdit();
        fetchEvents();
        toast({
          title: "Agenda Diperbarui",
          description: "Perubahan agenda acara berhasil disimpan.",
          type: "success",
        });
      } else {
        toast({
          title: "Gagal Memperbarui",
          description: res.error || "Gagal memperbarui acara.",
          type: "error",
        });
      }
    } else {
      const res = await createEvent({
        title,
        community,
        location,
        startDate,
        description,
        status: "PUBLISHED",
      });
      setLoading(false);
      if (res.success) {
        handleCancelEdit();
        fetchEvents();
        toast({
          title: "Acara Diterbitkan",
          description: "Agenda acara baru berhasil ditambahkan.",
          type: "success",
        });
      } else {
        toast({
          title: "Gagal Menyimpan",
          description: res.error || "Gagal menambahkan acara.",
          type: "error",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus agenda acara ini?")) return;
    setDeletingId(id);
    const res = await deleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      toast({
        title: "Acara Dihapus",
        description: "Agenda berhasil dihapus.",
        type: "success",
      });
    } else {
      toast({
        title: "Gagal Menghapus",
        description: res.error || "Gagal menghapus acara.",
        type: "error",
      });
    }
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Manajemen Agenda & Pendaftar Acara
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola kalender kegiatan pemuridan serta tinjau data peserta yang mendaftar melalui formulir RSVP.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            fetchEvents();
            fetchRsvp();
          }}
          disabled={fetching || fetchingRsvp}
          className="rounded-xl text-xs"
        >
          <RefreshCw className={`size-3.5 mr-1 ${fetching || fetchingRsvp ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "events"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="size-4" />
          <span>Daftar Acara Publik ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("rsvp")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "rsvp"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users2 className="size-4" />
          <span>Pendaftar Acara / RSVP</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-primary text-white font-bold">
            {registrations.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Events CMS */}
      {activeTab === "events" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Tambah / Edit Acara */}
          <div className="lg:col-span-5">
            <Card className={`p-6 space-y-4 shadow-warm-sm transition-all ${
              editingEventId ? "border-amber-400/80 bg-amber-50/10 ring-2 ring-amber-400/20" : ""
            }`}>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    {editingEventId ? (
                      <>
                        <Edit2 className="size-4 text-amber-600" />
                        <span>Edit Agenda Acara</span>
                      </>
                    ) : (
                      <>
                        <Plus className="size-4 text-primary" />
                        <span>Tambah Agenda Baru</span>
                      </>
                    )}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {editingEventId
                      ? "Ubah rincian agenda acara di bawah lalu simpan perubahan."
                      : "Publikasikan agenda persekutuan atau kegiatan pemuridan baru."}
                  </p>
                </div>
                {editingEventId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="text-xs text-muted-foreground hover:text-foreground h-7 px-2.5 rounded-lg border border-border"
                  >
                    <X className="size-3 mr-1" />
                    <span>Batal</span>
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-foreground block mb-1">Nama Acara *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Explore Camp 2026"
                    required
                    className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Target Komunitas</label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value as any)}
                    className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none"
                  >
                    <option value="ALL">Semua Komunitas (Lintas Gerakan)</option>
                    <option value="EXPLORE">Explore (Siswa SMA)</option>
                    <option value="ENCOUNTER">Encounter (Mahasiswa)</option>
                    <option value="CONNECT">Connect (Alumni & Profesional)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-foreground block mb-1">Tanggal Mulai *</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-foreground block mb-1">Lokasi Pelaksanaan</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Zoom / Serang / Ternate"
                      className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-foreground block mb-1">Keterangan / Deskripsi</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Rincian informasi acara, tema, dan sasaran..."
                    className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 justify-center rounded-xl font-bold py-2.5 shadow-warm-sm transition-all ${
                      editingEventId
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {loading ? (
                      <span>Menyimpan ke Database...</span>
                    ) : editingEventId ? (
                      <>
                        <Save className="size-3.5 mr-1" />
                        <span>Simpan Perubahan Agenda</span>
                      </>
                    ) : (
                      <>
                        <Plus className="size-3.5 mr-1" />
                        <span>Publikasikan ke Website</span>
                      </>
                    )}
                  </Button>
                  {editingEventId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="rounded-xl text-xs font-semibold py-2.5 px-4"
                    >
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* List Acara Terdaftar */}
          <div className="lg:col-span-7">
            <Card className="p-6 space-y-4 shadow-warm-sm">
              <h3 className="font-bold text-sm text-foreground">
                Daftar Agenda Terpublikasi ({events.length})
              </h3>

              {fetching ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Memuat data agenda...
                </div>
              ) : events.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Belum ada agenda acara di database.
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        editingEventId === ev.id
                          ? "border-amber-500/80 bg-amber-500/5 ring-2 ring-amber-500/20 shadow-xs"
                          : "border-border bg-canvas hover:border-primary/40"
                      }`}
                    >
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2">
                          <Badge variant="primarySoft" className="text-[10px]">
                            {ev.community}
                          </Badge>
                          <span className="text-[11px] font-semibold text-muted-foreground">
                            {formatDate(ev.startDate)}
                          </span>
                          {editingEventId === ev.id && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                              Sedang Diedit
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-xs text-foreground">{ev.title}</h4>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="size-3 text-primary" />
                          <span>{ev.location || "Lokasi menyusul"}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(ev)}
                          title="Edit Agenda Acara"
                          className={`size-8 p-0 rounded-lg transition-colors cursor-pointer ${
                            editingEventId === ev.id
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "text-muted-foreground hover:text-amber-600 hover:bg-amber-50"
                          }`}
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === ev.id}
                          onClick={() => handleDelete(ev.id)}
                          title="Hapus Agenda"
                          className="size-8 p-0 text-muted-foreground hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: RSVP Attendees */}
      {activeTab === "rsvp" && (
        <Card className="rounded-2xl border-border bg-card shadow-2xs overflow-hidden">
          {fetchingRsvp ? (
            <div className="p-12 text-center text-xs text-muted-foreground">
              <RefreshCw className="size-6 animate-spin mx-auto text-primary mb-2" />
              <span>Memuat data pendaftar acara...</span>
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Users2 className="size-8 text-muted-foreground/40 mx-auto" />
              <p className="text-sm font-bold text-foreground">Belum ada peserta yang mendaftar</p>
              <p className="text-xs text-muted-foreground">
                Peserta yang klik &quot;Daftar Sekarang&quot; pada agenda akan tercatat di tabel ini.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-muted/40 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 px-4">Nama Peserta & Acara</th>
                    <th className="py-3 px-4">Kontak WhatsApp</th>
                    <th className="py-3 px-4">Jenjang & Asal Kota</th>
                    <th className="py-3 px-4">Catatan</th>
                    <th className="py-3 px-4">Status Konfirmasi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {registrations.map((r) => {
                    const cleanPhone = r.phone?.replace(/[^0-9]/g, "");
                    const waNumber = cleanPhone?.startsWith("0")
                      ? "62" + cleanPhone.slice(1)
                      : cleanPhone;

                    return (
                      <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                        <td className="py-3.5 px-4 space-y-1">
                          <span className="font-bold text-foreground text-sm block">
                            {r.fullName}
                          </span>
                          <span className="text-[11px] font-semibold text-primary block">
                            📌 {r.eventTitle}
                          </span>
                          <span className="text-[10px] text-muted-foreground block">
                            Terdaftar: {new Date(r.createdAt).toLocaleDateString("id-ID")}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 space-y-1">
                          <span className="font-mono text-xs font-semibold block text-foreground">
                            {r.phone}
                          </span>
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                              `Halo ${r.fullName}, shalom! Kami dari panitia ESM Indonesia ingin mengonfirmasi pendaftaran Anda untuk kegiatan: "${r.eventTitle}".`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                          >
                            <MessageCircle className="size-3" />
                            <span>Hubungi Panitia WA</span>
                          </a>
                        </td>

                        <td className="py-3.5 px-4 space-y-1">
                          <Badge variant="outline" className="text-[10px] font-bold border-border">
                            {r.communityRole}
                          </Badge>
                          {r.city && (
                            <span className="block text-[11px] text-muted-foreground">
                              {r.city}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                            {r.notes ? `"${r.notes}"` : "-"}
                          </p>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={r.status}
                            onChange={(e) => handleRsvpStatusChange(r.id, e.target.value)}
                            className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                              r.status === "CONFIRMED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : r.status === "CANCELLED"
                                ? "bg-red-50 text-red-800 border-red-300"
                                : "bg-amber-50 text-amber-800 border-amber-300"
                            }`}
                          >
                            <option value="PENDING">Pending (Belum Konfirmasi)</option>
                            <option value="CONFIRMED">Terkonfirmasi (Hadir)</option>
                            <option value="CANCELLED">Dibatalkan</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleRsvpDelete(r.id, r.fullName)}
                            title="Hapus pendaftaran"
                            className="size-8 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 inline-flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
