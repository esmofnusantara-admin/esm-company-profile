"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users2, Check, X, Search, Filter, Download, RefreshCw } from "lucide-react";
import { confirmDonation, cancelDonation } from "@/actions/donation";

interface DonationRecord {
  id: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  amount: number;
  type: string;
  message: string | null;
  status: string;
  createdAt: string;
}

export default function AdminMitraPage() {
  const [filterType, setFilterType] = React.useState("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [donations, setDonations] = React.useState<DonationRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [processingId, setProcessingId] = React.useState<string | null>(null);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/donations");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setDonations(json.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data donasi:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDonations();
  }, []);

  const handleConfirm = async (id: string) => {
    setProcessingId(id);
    const res = await confirmDonation(id);
    if (res.success) {
      setDonations((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "CONFIRMED" } : d))
      );
    }
    setProcessingId(null);
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Yakin ingin membatalkan komitmen donasi ini?")) return;
    setProcessingId(id);
    const res = await cancelDonation(id);
    if (res.success) {
      setDonations((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "CANCELLED" } : d))
      );
    }
    setProcessingId(null);
  };

  const filteredDonations = donations.filter((d) => {
    const matchType =
      filterType === "ALL" ||
      (filterType === "BULANAN" && d.type === "MITRA_BULANAN") ||
      (filterType === "SEKALI" && d.type === "SEKALI_BERI");

    const query = searchQuery.toLowerCase();
    const matchQuery =
      !query ||
      d.donorName.toLowerCase().includes(query) ||
      (d.donorEmail && d.donorEmail.toLowerCase().includes(query)) ||
      (d.donorPhone && d.donorPhone.includes(query));

    return matchType && matchQuery;
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Data Mitra & Komitmen Donasi
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola data donatur dari website publik, verifikasi transfer, dan catat kas otomatis.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDonations}
            disabled={loading}
            className="rounded-xl text-xs"
          >
            <RefreshCw className={`size-3.5 mr-1 ${loading ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <option value="ALL">Semua Mitra ({donations.length})</option>
              <option value="BULANAN">Mitra Bulanan</option>
              <option value="SEKALI">Sekali Beri</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Memuat data mitra dari PostgreSQL...
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Belum ada data donasi yang sesuai dengan filter.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2.5 font-bold">Nama Donatur</th>
                  <th className="py-2.5 font-bold">Kontak</th>
                  <th className="py-2.5 font-bold">Tipe Donasi</th>
                  <th className="py-2.5 font-bold">Nominal</th>
                  <th className="py-2.5 font-bold">Pesan / Doa</th>
                  <th className="py-2.5 font-bold">Status</th>
                  <th className="py-2.5 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDonations.map((p) => (
                  <tr key={p.id} className="hover:bg-canvas-subtle transition-colors">
                    <td className="py-3 font-semibold text-foreground">{p.donorName}</td>
                    <td className="py-3 text-muted-foreground">
                      <p>{p.donorEmail || "-"}</p>
                      <p className="text-[10px]">{p.donorPhone || "-"}</p>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {p.type === "MITRA_BULANAN" ? (
                        <span className="font-semibold text-primary">Bulanan (Rutin)</span>
                      ) : (
                        "Sekali Beri"
                      )}
                    </td>
                    <td className="py-3 font-bold text-foreground">
                      {formatRupiah(p.amount)}
                    </td>
                    <td className="py-3 text-muted-foreground max-w-xs truncate">
                      {p.message || "-"}
                    </td>
                    <td className="py-3">
                      {p.status === "CONFIRMED" ? (
                        <Badge variant="primarySoft" className="text-[10px]">
                          Terkonfirmasi
                        </Badge>
                      ) : p.status === "CANCELLED" ? (
                        <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200 bg-rose-50">
                          Dibatalkan
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
                          <Button
                            size="sm"
                            disabled={processingId === p.id}
                            onClick={() => handleConfirm(p.id)}
                            className="h-7 px-2 text-[10px] rounded-lg"
                          >
                            <Check className="size-3 mr-1" />
                            <span>Konfirmasi</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={processingId === p.id}
                            onClick={() => handleCancel(p.id)}
                            className="h-7 px-2 text-[10px] text-rose-600 rounded-lg"
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">
                          {p.status === "CONFIRMED" ? "Tercatat di Kas" : "Dibatalkan"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
