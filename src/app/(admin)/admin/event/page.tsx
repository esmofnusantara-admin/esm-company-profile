"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Trash2, MapPin, Video, CheckCircle2 } from "lucide-react";
import { createEvent, deleteEvent } from "@/actions/event";

export default function AdminEventPage() {
  const [title, setTitle] = React.useState("");
  const [community, setCommunity] = React.useState<"ALL" | "EXPLORE" | "ENCOUNTER" | "CONNECT">("ALL");
  const [location, setLocation] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const events = [
    {
      id: "1",
      title: "Annual Movement Prayer 2026",
      community: "Semua Komunitas",
      date: "23 Agustus 2026",
      location: "Zoom Online",
      status: "PUBLISHED",
    },
    {
      id: "2",
      title: "Hari Mitra & Sahabat ESM",
      community: "Alumni & Donatur",
      date: "06 September 2026",
      location: "Serang, Banten",
      status: "PUBLISHED",
    },
    {
      id: "3",
      title: "Explore Camp Siswa",
      community: "Explore (Siswa SMA)",
      date: "18 September 2026",
      location: "Pusat Pelatihan, Banten",
      status: "PUBLISHED",
    },
  ];

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
      alert("Agenda acara berhasil ditambahkan!");
      setTitle("");
      setLocation("");
      setStartDate("");
      setDescription("");
    } else {
      alert(res.error || "Gagal menambahkan acara.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Manajemen Agenda & Event
        </h1>
        <p className="text-xs text-muted-foreground">
          Kelola kalender kegiatan pemuridan, retret, doa akbar, dan ekspedisi misi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Acara */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Tambah Agenda Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Nama Acara</label>
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
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none"
                >
                  <option value="ALL">Semua Komunitas (Lintas Wilayah)</option>
                  <option value="EXPLORE">Explore Community (Siswa SMA)</option>
                  <option value="ENCOUNTER">Encounter Community (Mahasiswa)</option>
                  <option value="CONNECT">Connect Community (Alumni)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-foreground block mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="font-bold text-foreground block mb-1">Lokasi / Media</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Zoom / Serang / Ternate"
                    required
                    className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Rincian acara..."
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-xl font-bold py-2.5"
              >
                <Plus className="size-3.5 mr-1" />
                <span>{loading ? "Menyimpan..." : "Terbitkan Agenda"}</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Tabel Daftar Acara */}
        <div className="lg:col-span-7">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Daftar Acara Terjadwal</h3>
            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-canvas hover:border-primary/40 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-foreground block">{evt.title}</span>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>{evt.community}</span>
                      <span>&bull;</span>
                      <span>{evt.date}</span>
                      <span>&bull;</span>
                      <span>{evt.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primarySoft" className="text-[10px]">
                      Aktif
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-8 text-rose-600">
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
