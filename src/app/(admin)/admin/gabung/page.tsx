"use client";

import * as React from "react";
import {
  Users,
  Search,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Trash2,
  RefreshCw,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  Compass,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getJoinSubmissions,
  updateJoinSubmissionStatus,
  deleteJoinSubmission,
} from "@/actions/join";
import { useToast } from "@/context/ToastContext";

export default function AdminGabungPage() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJoinSubmissions();
      setSubmissions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id: string, status: string) => {
    const res = await updateJoinSubmissionStatus(id, status);
    if (res.success) {
      toast({
        title: "Status Diperbarui",
        description: `Status pendaftar diubah menjadi ${status}.`,
        type: "success",
      });
      loadData();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal mengubah status",
        type: "error",
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus data pendaftaran dari ${name}?`)) return;
    const res = await deleteJoinSubmission(id);
    if (res.success) {
      toast({
        title: "Data Dihapus",
        description: `Pendaftaran ${name} berhasil dihapus.`,
        type: "success",
      });
      loadData();
    } else {
      toast({
        title: "Gagal",
        description: res.error || "Gagal menghapus",
        type: "error",
      });
    }
  };

  const filtered = submissions.filter((s) => {
    const matchesRole = roleFilter === "all" || s.role === roleFilter;
    if (!matchesRole) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.phone?.toLowerCase().includes(q) ||
      s.schoolOrCampus?.toLowerCase().includes(q) ||
      s.region?.toLowerCase().includes(q) ||
      s.notes?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <Users className="size-3.5" />
            <span>Pendaftaran Komunitas</span>
          </div>
          <h1 className="text-2xl font-black text-foreground">
            Pendaftar Komunitas Pemuridan (/gabung)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar calon murid siswa, mahasiswa, dan alumni yang siap dihubungi untuk kelompok kecil KTB.
          </p>
        </div>

        <Button
          onClick={loadData}
          variant="outline"
          size="sm"
          className="rounded-full text-xs font-bold border-border"
        >
          <RefreshCw className="size-3.5 mr-1.5" />
          <span>Muat Ulang</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 rounded-2xl border-border bg-card shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, nomor HP, sekolah..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-border bg-canvas focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            {["all", "siswa", "mahasiswa", "alumni"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  roleFilter === r
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-canvas text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {r === "all" ? "Semua Jenjang" : r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table Content */}
      <Card className="rounded-2xl border-border bg-card shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            <RefreshCw className="size-6 animate-spin mx-auto text-primary mb-2" />
            <span>Memuat data pendaftar...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Users className="size-8 text-muted-foreground/40 mx-auto" />
            <p className="text-sm font-bold text-foreground">Belum ada data pendaftar</p>
            <p className="text-xs text-muted-foreground">
              Formulir di halaman /gabung akan memunculkan data di sini saat ada yang mendaftar.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 px-4">Nama & Jenjang</th>
                  <th className="py-3 px-4">Kontak WhatsApp</th>
                  <th className="py-3 px-4">Asal Lembaga / Kampus</th>
                  <th className="py-3 px-4">Wilayah & Catatan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => {
                  const cleanPhone = item.phone?.replace(/[^0-9]/g, "");
                  const waNumber = cleanPhone?.startsWith("0")
                    ? "62" + cleanPhone.slice(1)
                    : cleanPhone;

                  return (
                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3.5 px-4 space-y-1">
                        <div className="font-bold text-foreground text-sm">
                          {item.fullName}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant="outline"
                            className="text-[10px] uppercase font-bold px-2 py-0.5 border-primary/30 text-primary"
                          >
                            {item.role}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="font-mono text-xs font-semibold block text-foreground">
                            {item.phone}
                          </span>
                          <a
                            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                              `Halo ${item.fullName}, shalom! Kami dari tim pembina ESM Indonesia menyapa sehubungan pendaftaran Anda di komunitas pemuridan.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                          >
                            <MessageCircle className="size-3" />
                            <span>Sapa via WhatsApp</span>
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-1.5 text-muted-foreground">
                          <Building2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="font-medium text-foreground">
                            {item.schoolOrCampus}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs space-y-1">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                          <MapPin className="size-3 text-red-500" />
                          <span className="capitalize">{item.region}</span>
                        </div>
                        {item.notes && (
                          <p className="text-[11px] text-muted-foreground italic line-clamp-2">
                            &ldquo;{item.notes}&rdquo;
                          </p>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={item.status || "PENDING"}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                            item.status === "JOINED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : item.status === "CONTACTED"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          <option value="PENDING">Pending (Belum Disapa)</option>
                          <option value="CONTACTED">Sudah Dihubungi</option>
                          <option value="JOINED">Sudah Bergabung KTB</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.fullName)}
                          title="Hapus data"
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
    </div>
  );
}
