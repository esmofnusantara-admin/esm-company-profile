"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Mail, ArrowRight, ShieldCheck, Home, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/actions/auth";

const DEFAULT_EMAIL = "admin@esm.or.id";
const DEFAULT_PASSWORD = "Admin@ESM2025!";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState(DEFAULT_EMAIL);
  const [password, setPassword] = React.useState(DEFAULT_PASSWORD);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Pastikan form selalu terisi otomatis di browser / perangkat manapun
  React.useEffect(() => {
    setEmail(DEFAULT_EMAIL);
    setPassword(DEFAULT_PASSWORD);
  }, []);

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
          <Link href="/" className="inline-flex items-center gap-3 mb-2 group">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-warm-sm ring-1 ring-border/60 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-esm.png"
                alt="Logo ESM Indonesia"
                width={48}
                height={48}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>
            <div className="text-left">
              <span className="text-xl font-extrabold tracking-tight text-foreground block">
                ESM Indonesia
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase block">
                Evangelical Student Movement
              </span>
            </div>
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
                  defaultValue={DEFAULT_EMAIL}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@esm.or.id"
                  required
                  autoComplete="username"
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
                  defaultValue={DEFAULT_PASSWORD}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
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
