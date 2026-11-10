"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, TrendingDown, Plus, Download } from "lucide-react";
import { createTransaction } from "@/actions/transaction";

export default function AdminKeuanganPage() {
  const [type, setType] = React.useState<"PEMASUKAN" | "PENGELUARAN">("PEMASUKAN");
  const [nominal, setNominal] = React.useState("");
  const [category, setCategory] = React.useState("Operasional");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const transactions = [
    {
      id: "1",
      date: "10 Agustus 2026",
      type: "PEMASUKAN",
      category: "Donasi Mitra",
      desc: "Donasi Mitra Bulanan - Budi Santoso",
      amount: "Rp 500.000",
    },
    {
      id: "2",
      date: "09 Agustus 2026",
      type: "PEMASUKAN",
      category: "Donasi Insidental",
      desc: "Dukungan Misi Ternate - Dewi Lestari",
      amount: "Rp 1.000.000",
    },
    {
      id: "3",
      date: "05 Agustus 2026",
      type: "PENGELUARAN",
      category: "Operasional",
      desc: "Sewa ruang pertemuan pembinaan siswa Banten",
      amount: "Rp 750.000",
    },
    {
      id: "4",
      date: "02 Agustus 2026",
      type: "PENGELUARAN",
      category: "Publikasi",
      desc: "Cetak buletin warta kuartal II",
      amount: "Rp 400.000",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createTransaction({
      type,
      amount: parseFloat(nominal.replace(/\D/g, "")),
      category,
      description,
    });
    setLoading(false);
    if (res.success) {
      alert("Transaksi keuangan berhasil dicatat!");
      setDescription("");
      setNominal("");
    } else {
      alert(res.error || "Gagal mencatat transaksi.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Kas & Laporan Keuangan
          </h1>
          <p className="text-xs text-muted-foreground">
            Rekap kas pemasukan, pengeluaran operasional, dan transparansi dana misi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-xl text-xs">
            <Download className="size-3.5 mr-1" />
            <span>Unduh Laporan Keuangan (PDF)</span>
          </Button>
        </div>
      </div>

      {/* KPI Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-6 space-y-2 border-emerald-500/30 bg-emerald-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Total Pemasukan (Bulan Ini)
            </span>
            <div className="size-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-foreground block">Rp 14.850.000</span>
          <span className="text-[11px] text-muted-foreground block">Dari 48 donatur dan mitra</span>
        </Card>

        <Card className="p-6 space-y-2 border-rose-500/30 bg-rose-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Total Pengeluaran (Bulan Ini)
            </span>
            <div className="size-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <TrendingDown className="size-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-foreground block">Rp 5.250.000</span>
          <span className="text-[11px] text-muted-foreground block">Operasional & kegiatan pelayanan</span>
        </Card>

        <Card className="p-6 space-y-2 border-primary/30 bg-primary-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Saldo Kas Bersih
            </span>
            <div className="size-8 rounded-lg bg-primary-100 text-primary flex items-center justify-center font-bold">
              <Wallet className="size-4" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-foreground block">Rp 9.600.000</span>
          <span className="text-[11px] text-muted-foreground block">Kas aktif yang siap digunakan</span>
        </Card>
      </div>

      {/* Form Catat Transaksi & Log Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Catat Transaksi Kas Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Tipe Transaksi</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setType("PEMASUKAN")}
                    className={`py-2 rounded-xl border font-bold transition-all ${
                      type === "PEMASUKAN"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    Pemasukan (Kas Masuk)
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("PENGELUARAN")}
                    className={`py-2 rounded-xl border font-bold transition-all ${
                      type === "PENGELUARAN"
                        ? "border-rose-600 bg-rose-50 text-rose-700"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    Pengeluaran (Biaya)
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Nominal (Rp)</label>
                <input
                  type="number"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Contoh: 500000"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none"
                >
                  <option value="Donasi Mitra">Donasi Mitra</option>
                  <option value="Operasional Lapangan">Operasional Lapangan</option>
                  <option value="Subsidi Pelatihan Siswa">Subsidi Pelatihan Siswa</option>
                  <option value="Perintisan Kampus">Perintisan Kampus</option>
                  <option value="Publikasi & Buletin">Publikasi & Buletin</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Keterangan Transaksi</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi peruntukan dana..."
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-xl font-bold py-2.5"
              >
                <Plus className="size-3.5 mr-1" />
                <span>{loading ? "Menyimpan..." : "Simpan ke Buku Kas"}</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Log Table */}
        <div className="lg:col-span-7">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Log Riwayat Kas Terakhir</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2.5 font-bold">Tanggal</th>
                    <th className="py-2.5 font-bold">Tipe</th>
                    <th className="py-2.5 font-bold">Deskripsi</th>
                    <th className="py-2.5 font-bold text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-canvas-subtle transition-colors">
                      <td className="py-3 text-muted-foreground">{t.date}</td>
                      <td className="py-3">
                        {t.type === "PEMASUKAN" ? (
                          <Badge variant="primarySoft" className="text-[10px] text-emerald-700 bg-emerald-50">
                            Masuk
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-[10px]">
                            Keluar
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 text-foreground font-medium">{t.desc}</td>
                      <td
                        className={`py-3 font-bold text-right ${
                          t.type === "PEMASUKAN" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {t.type === "PEMASUKAN" ? `+ ${t.amount}` : `- ${t.amount}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
