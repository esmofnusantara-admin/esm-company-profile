"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Mail, ArrowRight, ShieldCheck, Home, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@esm.or.id");
  const [password, setPassword] = React.useState("Admin@ESM2025!");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await loginAdmin(formData);
    setLoading(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setErrorMsg(res.error || "Gagal masuk ke sistem.");
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-2 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-warm-sm group-hover:scale-105 transition-transform">
              <span className="font-serif text-xl font-bold">E</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              ESM Indonesia
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="primarySoft" className="text-[10px]">
              Internal System
            </Badge>
            <Badge variant="amber" className="text-[10px]">
              Admin Only
            </Badge>
          </div>
          <h1 className="font-sans text-2xl font-extrabold text-foreground tracking-tight">
            Masuk ke Portal Internal
          </h1>
          <p className="text-xs text-muted-foreground">
            Kelola konten artikel, agenda misi, dan laporan keuangan donasi.
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="p-6 sm:p-8 border-border bg-card shadow-warm-md space-y-6">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Alamat Email Admin
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@esm.or.id"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 pl-9 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Mail className="size-4 text-muted-foreground absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 pl-9 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Lock className="size-4 text-muted-foreground absolute left-3 top-3" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full justify-center rounded-xl font-bold text-xs py-2.5 shadow-warm-sm"
            >
              {loading ? (
                <span>Memverifikasi kredensial...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="size-3.5 ml-1" />
                </>
              )}
            </Button>
          </form>

          <div className="border-t border-border pt-4 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Database Sync Active • End-to-End Encrypted</span>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
            >
              <Home className="size-3.5" />
              <span>Kembali ke Website Publik</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
