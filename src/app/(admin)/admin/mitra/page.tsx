"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users2, Check, X, Search, Filter, Download } from "lucide-react";

export default function AdminMitraPage() {
  const [filterType, setFilterType] = React.useState("ALL");

  const partners = [
    {
      id: "1",
      name: "Budi Santoso",
      email: "budi.s@example.com",
      phone: "081234567890",
      type: "MITRA_BULANAN",
      amount: "Rp 500.000",
      date: "10 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "2",
      name: "Dewi Lestari",
      email: "dewi.l@example.com",
      phone: "081398765432",
      type: "SEKALI_BERI",
      amount: "Rp 1.000.000",
      date: "09 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "3",
      name: "Gereja Kristen Jawara Serang",
      email: "sekretariat@gkj-serang.org",
      phone: "081122334455",
      type: "MITRA_BULANAN",
      amount: "Rp 2.500.000",
      date: "08 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "4",
      name: "Alumni Angkatan 2022",
      email: "alumni22@example.com",
      phone: "085611223344",
      type: "SEKALI_BERI",
      amount: "Rp 250.000",
      date: "07 Agustus 2026",
      status: "PENDING",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Data Mitra & Komitmen Donasi
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola data donatur, verifikasi bukti transfer, dan konfirmasi status kemitraan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl text-xs">
            <Download className="size-3.5 mr-1" />
            <span>Ekspor CSV</span>
          </Button>
        </div>
      </div>

      <Card className="p-6 space-y-4 shadow-warm-sm">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-canvas px-3 py-1.5 text-xs text-muted-foreground w-full sm:w-72">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama atau email donatur..."
              className="bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Filter Tipe:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none"
            >
              <option value="ALL">Semua Mitra</option>
              <option value="BULANAN">Mitra Bulanan</option>
              <option value="SEKALI">Sekali Beri</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-2.5 font-bold">Nama Donatur</th>
                <th className="py-2.5 font-bold">Kontak</th>
                <th className="py-2.5 font-bold">Tipe Donasi</th>
                <th className="py-2.5 font-bold">Nominal</th>
                <th className="py-2.5 font-bold">Tanggal</th>
                <th className="py-2.5 font-bold">Status</th>
                <th className="py-2.5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-canvas-subtle transition-colors">
                  <td className="py-3 font-semibold text-foreground">{p.name}</td>
                  <td className="py-3 text-muted-foreground">
                    <p>{p.email}</p>
                    <p className="text-[10px]">{p.phone}</p>
                  </td>
                  <td className="py-3 text-muted-foreground">
                    {p.type === "MITRA_BULANAN" ? "Bulanan (Rutin)" : "Sekali Beri"}
                  </td>
                  <td className="py-3 font-bold text-foreground">{p.amount}</td>
                  <td className="py-3 text-muted-foreground">{p.date}</td>
                  <td className="py-3">
                    {p.status === "CONFIRMED" ? (
                      <Badge variant="primarySoft" className="text-[10px]">
                        Terkonfirmasi
                      </Badge>
                    ) : (
                      <Badge variant="amber" className="text-[10px]">
                        Menunggu Verifikasi
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    {p.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" className="h-7 px-2 text-[10px] rounded-lg">
                          <Check className="size-3 mr-1" />
                          <span>Konfirmasi</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-[10px] text-rose-600 rounded-lg">
                          <X className="size-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
