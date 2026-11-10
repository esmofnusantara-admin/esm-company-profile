import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users2,
  Wallet,
  Calendar,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Mitra Aktif",
      value: "48 Mitra",
      desc: "+4 mitra baru bulan ini",
      icon: Users2,
      trend: "+8.3%",
      variant: "primary" as const,
    },
    {
      title: "Donasi Masuk (Bulan Ini)",
      value: "Rp 14.850.000",
      desc: "Target bulanan: Rp 20.000.000",
      icon: Wallet,
      trend: "+12.5%",
      variant: "amber" as const,
    },
    {
      title: "Artikel & Warta Aktif",
      value: "12 Tulisan",
      desc: "2 draf menunggu review",
      icon: FileText,
      trend: "Terupdate",
      variant: "primary" as const,
    },
    {
      title: "Agenda Misi 2026",
      value: "4 Acara",
      desc: "2 online, 2 offline (Banten & Ternate)",
      icon: Calendar,
      trend: "Mendatang",
      variant: "amber" as const,
    },
  ];

  const recentDonations = [
    {
      id: "1",
      name: "Budi Santoso",
      type: "MITRA_BULANAN",
      amount: "Rp 500.000",
      date: "10 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "2",
      name: "Dewi Lestari",
      type: "SEKALI_BERI",
      amount: "Rp 1.000.000",
      date: "09 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "3",
      name: "Gereja Kristen Jawara Serang",
      type: "MITRA_BULANAN",
      amount: "Rp 2.500.000",
      date: "08 Agustus 2026",
      status: "CONFIRMED",
    },
    {
      id: "4",
      name: "Alumni Angkatan 2022",
      type: "SEKALI_BERI",
      amount: "Rp 250.000",
      date: "07 Agustus 2026",
      status: "PENDING",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Ringkasan Kegerakan (Overview)
          </h1>
          <p className="text-xs text-muted-foreground">
            Pantau perkembangan mitra, donasi, konten buletin, dan jadwal pelayanan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl text-xs shadow-warm-sm">
            <Link href="/admin/keuangan">
              <Plus className="size-3.5 mr-1" />
              <span>Catat Kas Masuk/Keluar</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
            <Link href="/admin/artikel">
              <Plus className="size-3.5 mr-1" />
              <span>Tulis Artikel Baru</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} className="p-5 space-y-3 hover:border-primary/40 transition-colors shadow-warm-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">{s.title}</span>
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${
                    s.variant === "primary" ? "bg-primary-50 text-primary" : "bg-accent-50 text-accent"
                  }`}
                >
                  <Icon className="size-4" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-foreground block">{s.value}</span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">{s.desc}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Table & Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Mitra Donations */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-foreground">Dukungan Mitra Terbaru</h3>
                <p className="text-xs text-muted-foreground">Log komitmen donasi dan transfer masuk</p>
              </div>
              <Button asChild variant="link" size="sm" className="text-xs text-primary font-bold">
                <Link href="/admin/mitra" className="flex items-center gap-1">
                  <span>Lihat Semua Mitra</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2.5 font-bold">Nama Donatur</th>
                    <th className="py-2.5 font-bold">Tipe Mitra</th>
                    <th className="py-2.5 font-bold">Nominal</th>
                    <th className="py-2.5 font-bold">Tanggal</th>
                    <th className="py-2.5 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentDonations.map((item) => (
                    <tr key={item.id} className="hover:bg-canvas-subtle transition-colors">
                      <td className="py-3 font-semibold text-foreground">{item.name}</td>
                      <td className="py-3 text-muted-foreground">
                        {item.type === "MITRA_BULANAN" ? "Bulanan (Rutin)" : "Sekali Beri"}
                      </td>
                      <td className="py-3 font-bold text-foreground">{item.amount}</td>
                      <td className="py-3 text-muted-foreground">{item.date}</td>
                      <td className="py-3 text-right">
                        {item.status === "CONFIRMED" ? (
                          <Badge variant="primarySoft" className="text-[10px]">
                            Terkonfirmasi
                          </Badge>
                        ) : (
                          <Badge variant="amber" className="text-[10px]">
                            Menunggu
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Shortcut Menu Cards */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-6 space-y-4 bg-canvas-subtle border-border shadow-warm-sm">
            <h4 className="font-bold text-sm text-foreground">Akses Cepat Pengelolaan</h4>
            <div className="space-y-2.5">
              <Link
                href="/admin/keuangan"
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Wallet className="size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                      Log Kas & Laporan
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Pemasukan & pengeluaran operasional
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/admin/event"
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-accent-50 text-accent flex items-center justify-center font-bold">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                      Manajemen Event Misi
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Jadwal retreat, camp, dan doa akbar
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/admin/artikel"
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center font-bold">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                      CMS Artikel & Buletin
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Unggah PDF warta dan tulisan rohani
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
