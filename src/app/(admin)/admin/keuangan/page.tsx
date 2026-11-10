"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, TrendingDown, Plus, Download, RefreshCw } from "lucide-react";
import { createTransaction } from "@/actions/transaction";

interface TransactionItem {
  id: string;
  type: "PEMASUKAN" | "PENGELUARAN";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function AdminKeuanganPage() {
  const [type, setType] = React.useState<"PEMASUKAN" | "PENGELUARAN">("PEMASUKAN");
  const [nominal, setNominal] = React.useState("");
  const [category, setCategory] = React.useState("Operasional");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [transactions, setTransactions] = React.useState<TransactionItem[]>([]);
  const [summary, setSummary] = React.useState({
    totalPemasukan: 0,
    totalPengeluaran: 0,
    saldoBersih: 0,
  });
  const [fetching, setFetching] = React.useState(true);

  const fetchTransactions = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/transactions");
      const json = await res.json();
      if (json.success) {
        if (Array.isArray(json.data)) setTransactions(json.data);
        if (json.summary) setSummary(json.summary);
      }
    } catch (err) {
      console.error("Gagal mengambil data transaksi:", err);
    } finally {
      setFetching(false);
    }
  };

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const amountNum = parseFloat(nominal.replace(/\D/g, ""));
    const res = await createTransaction({
      type,
      amount: amountNum,
      category,
      description,
    });
    setLoading(false);
    if (res.success) {
      setDescription("");
      setNominal("");
      fetchTransactions();
    } else {
      alert(res.error || "Gagal mencatat transaksi.");
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
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
            Kas & Laporan Keuangan
          </h1>
          <p className="text-xs text-muted-foreground">
            Rekap kas pemasukan donasi, pengeluaran operasional, dan transparansi dana misi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTransactions}
            disabled={fetching}
            className="rounded-xl text-xs"
          >
            <RefreshCw className={`size-3.5 mr-1 ${fetching ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </Button>
        </div>
      </div>

      {/* KPI Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-6 space-y-2 border-emerald-500/30 bg-emerald-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Total Pemasukan (Kas Masuk)
            </span>
            <div className="size-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground">
            {formatRupiah(summary.totalPemasukan)}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Dari komitmen donasi dan kemitraan terverifikasi
          </p>
        </Card>

        <Card className="p-6 space-y-2 border-rose-500/30 bg-rose-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Total Pengeluaran (Operasional)
            </span>
            <div className="size-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <TrendingDown className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-foreground">
            {formatRupiah(summary.totalPengeluaran)}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Logistik pembinaan siswa & staf lapangan
          </p>
        </Card>

        <Card className="p-6 space-y-2 border-primary/30 bg-primary-50/20 shadow-warm-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Saldo Bersih Kas Gerakan
            </span>
            <div className="size-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center font-bold">
              <Wallet className="size-4" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-primary">
            {formatRupiah(summary.saldoBersih)}
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Kas berjalan yang dapat dialokasikan
          </p>
        </Card>
      </div>

      {/* Main Grid: Form Input & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah Transaksi */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Catat Transaksi Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="flex rounded-xl bg-card p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setType("PEMASUKAN")}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
                    type === "PEMASUKAN"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pemasukan (+)
                </button>
                <button
                  type="button"
                  onClick={() => setType("PENGELUARAN")}
                  className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
                    type === "PENGELUARAN"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pengeluaran (-)
                </button>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Nominal (Rp) *</label>
                <input
                  type="text"
                  required
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  placeholder="Contoh: 500000"
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none"
                >
                  <option value="Donasi Mitra">Donasi Mitra</option>
                  <option value="Operasional Lapangan">Operasional Lapangan</option>
                  <option value="Subsidi Kemah Siswa">Subsidi Kemah Siswa</option>
                  <option value="Publikasi & Buletin">Publikasi & Buletin</option>
                  <option value="Lain-lain">Lain-lain</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Uraian / Deskripsi *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan peruntukan kas atau nama donatur..."
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
              >
                {loading ? (
                  <span>Menyimpan ke Buku Kas...</span>
                ) : (
                  <>
                    <Plus className="size-3.5 mr-1" />
                    <span>Catat ke Buku Kas</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Tabel Riwayat Kas */}
        <div className="lg:col-span-7">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">
              Buku Kas Terkini ({transactions.length})
            </h3>

            {fetching ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Memuat riwayat kas...
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Belum ada transaksi di database kas.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2.5 font-bold">Tanggal</th>
                      <th className="py-2.5 font-bold">Kategori</th>
                      <th className="py-2.5 font-bold">Uraian</th>
                      <th className="py-2.5 font-bold text-right">Nominal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-canvas-subtle transition-colors">
                        <td className="py-2.5 text-muted-foreground">{formatDate(t.date)}</td>
                        <td className="py-2.5 font-medium">{t.category}</td>
                        <td className="py-2.5 text-muted-foreground max-w-xs truncate">
                          {t.description}
                        </td>
                        <td
                          className={`py-2.5 font-bold text-right ${
                            t.type === "PEMASUKAN" ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {t.type === "PEMASUKAN" ? "+" : "-"} {formatRupiah(t.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
