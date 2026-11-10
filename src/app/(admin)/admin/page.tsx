import Link from "next/link";
import { prisma } from "@/lib/db";
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
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Ambil metrik riil langsung dari database PostgreSQL
  let partnerCount = 0;
  let totalDonations = 0;
  let articleCount = 0;
  let eventCount = 0;
  let recentDonations: any[] = [];

  try {
    const [pCount, donSum, aCount, eCount, recDon] = await Promise.all([
      prisma.donationRecord.count(),
      prisma.donationRecord.aggregate({
        _sum: { amount: true },
        where: { status: "CONFIRMED" },
      }),
      prisma.article.count(),
      prisma.event.count(),
      prisma.donationRecord.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    partnerCount = pCount;
    totalDonations = Number(donSum._sum.amount || 0);
    articleCount = aCount;
    eventCount = eCount;
    recentDonations = recDon;
  } catch (err) {
    console.error("Dashboard query error:", err);
  }

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const stats = [
    {
      title: "Total Mitra Terdata",
      value: `${partnerCount} Mitra`,
      desc: "Komitmen dari website publik",
      icon: Users2,
      trend: "+Terhubung",
      variant: "primary" as const,
    },
    {
      title: "Donasi Terkonfirmasi",
      value: formatRupiah(totalDonations),
      desc: "Tercatat di kas masuk",
      icon: Wallet,
      trend: "Realtime",
      variant: "amber" as const,
    },
    {
      title: "Artikel & Warta Aktif",
      value: `${articleCount} Tulisan`,
      desc: "Bilingual ID & EN",
      icon: FileText,
      trend: "Terbit",
      variant: "primary" as const,
    },
    {
      title: "Agenda Misi 2026",
      value: `${eventCount} Agenda`,
      desc: "Banten & Ternate",
      icon: Calendar,
      trend: "Mendatang",
      variant: "amber" as const,
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
            Pantau perkembangan mitra, donasi, konten buletin, dan jadwal pelayanan secara langsung dari PostgreSQL.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl text-xs shadow-warm-sm">
            <Link href="/admin/artikel">
              <Plus className="size-3.5 mr-1" />
              <span>Tulis Artikel Baru</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
            <Link href="/" target="_blank">
              <ArrowUpRight className="size-3.5 mr-1" />
              <span>Lihat Web Publik</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="p-5 space-y-3 shadow-warm-sm border-border">
              <div className="flex items-center justify-between">
                <div
                  className={`size-10 rounded-xl flex items-center justify-center ${
                    s.variant === "primary"
                      ? "bg-primary-50 text-primary"
                      : "bg-accent-50 text-accent"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <Badge
                  variant={s.variant === "primary" ? "primarySoft" : "amber"}
                  className="text-[10px]"
                >
                  {s.trend}
                </Badge>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-foreground tracking-tight">
                  {s.value}
                </h3>
                <p className="text-xs font-semibold text-foreground/80 mt-0.5">
                  {s.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Split Content: Recent Donations & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Partner Commitments */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Komitmen Mitra Donasi Terbaru
            </h2>
            <Button asChild variant="link" size="sm" className="px-0 text-xs text-primary font-bold">
              <Link href="/admin/mitra" className="flex items-center gap-1">
                <span>Kelola Semua Mitra</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          <Card className="p-0 overflow-hidden shadow-warm-sm border-border">
            <div className="overflow-x-auto">
              {recentDonations.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  Belum ada donasi masuk dari website publik. Masukkan donasi uji coba di halaman /kemitraan!
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-canvas border-b border-border text-muted-foreground">
                    <tr>
                      <th className="p-3.5 font-bold">Donatur</th>
                      <th className="p-3.5 font-bold">Tipe</th>
                      <th className="p-3.5 font-bold">Nominal</th>
                      <th className="p-3.5 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-canvas-subtle transition-colors">
                        <td className="p-3.5 font-semibold text-foreground">
                          {d.donorName}
                          {d.donorEmail && (
                            <span className="block text-[10px] text-muted-foreground font-normal">
                              {d.donorEmail}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-muted-foreground">
                          {d.type === "MITRA_BULANAN" ? "Bulanan (Rutin)" : "Sekali Beri"}
                        </td>
                        <td className="p-3.5 font-bold text-foreground">
                          {formatRupiah(Number(d.amount))}
                        </td>
                        <td className="p-3.5">
                          {d.status === "CONFIRMED" ? (
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
              )}
            </div>
          </Card>
        </div>

        {/* Right: Ministry Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-foreground">Aksi Pengelolaan</h2>

          <Card className="p-5 space-y-3.5 border-border shadow-warm-sm">
            <Link
              href="/admin/artikel"
              className="flex items-start gap-3 p-3 rounded-xl border border-border bg-canvas hover:border-primary/40 transition-colors group"
            >
              <div className="size-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <FileText className="size-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">
                  Kelola Warta & Artikel
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  Input bilingual ID/EN dengan fitur auto-translate.
                </span>
              </div>
            </Link>

            <Link
              href="/admin/event"
              className="flex items-start gap-3 p-3 rounded-xl border border-border bg-canvas hover:border-accent/40 transition-colors group"
            >
              <div className="size-9 rounded-lg bg-accent-50 text-accent flex items-center justify-center shrink-0">
                <Calendar className="size-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">
                  Agenda Misi 2026
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  Kelola jadwal doa, kemah siswa, dan temu mitra.
                </span>
              </div>
            </Link>

            <Link
              href="/admin/keuangan"
              className="flex items-start gap-3 p-3 rounded-xl border border-border bg-canvas hover:border-primary/40 transition-colors group"
            >
              <div className="size-9 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0">
                <Wallet className="size-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">
                  Buku Kas & Transparansi
                </span>
                <span className="text-[11px] text-muted-foreground block">
                  Pencatatan kas operasional dan laporan audit dana misi.
                </span>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
