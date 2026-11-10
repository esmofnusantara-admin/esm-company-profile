"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Trash2, MapPin, Video, CheckCircle2, RefreshCw } from "lucide-react";
import { createEvent, deleteEvent } from "@/actions/event";

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
  const [title, setTitle] = React.useState("");
  const [community, setCommunity] = React.useState<"ALL" | "EXPLORE" | "ENCOUNTER" | "CONNECT">("ALL");
  const [location, setLocation] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [events, setEvents] = React.useState<EventItem[]>([]);
  const [fetching, setFetching] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setTitle("");
      setLocation("");
      setStartDate("");
      setDescription("");
      fetchEvents();
    } else {
      alert(res.error || "Gagal menambahkan acara.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus agenda acara ini?")) return;
    setDeletingId(id);
    const res = await deleteEvent(id);
    if (res.success) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } else {
      alert(res.error || "Gagal menghapus acara.");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Manajemen Agenda & Event
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola kalender kegiatan pemuridan, retret, doa akbar, dan ekspedisi misi. Terhubung ke website publik.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchEvents}
          disabled={fetching}
          className="rounded-xl text-xs"
        >
          <RefreshCw className={`size-3.5 mr-1 ${fetching ? "animate-spin" : ""}`} />
          <span>Segarkan</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Acara */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Tambah Agenda Baru</h3>
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
              >
                {loading ? (
                  <span>Menyimpan ke Database...</span>
                ) : (
                  <>
                    <Plus className="size-3.5 mr-1" />
                    <span>Publikasikan ke Website</span>
                  </>
                )}
              </Button>
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
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-canvas hover:border-primary/40 transition-colors"
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <Badge variant="primarySoft" className="text-[10px]">
                          {ev.community}
                        </Badge>
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          {formatDate(ev.startDate)}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-foreground">{ev.title}</h4>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="size-3 text-primary" />
                        <span>{ev.location || "Lokasi menyusul"}</span>
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={deletingId === ev.id}
                      onClick={() => handleDelete(ev.id)}
                      className="size-8 p-0 text-muted-foreground hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
