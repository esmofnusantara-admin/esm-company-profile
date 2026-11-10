"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  Wallet,
  Calendar,
  FileText,
  LogOut,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Mitra & Donasi",
    href: "/admin/mitra",
    icon: Users2,
  },
  {
    title: "Kas & Keuangan",
    href: "/admin/keuangan",
    icon: Wallet,
  },
  {
    title: "Event & Agenda",
    href: "/admin/event",
    icon: Calendar,
  },
  {
    title: "Artikel & Buletin",
    href: "/admin/artikel",
    icon: FileText,
  },
];

import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/actions/auth";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col justify-between shrink-0 min-h-screen">
      <div className="p-6 space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center font-serif text-lg font-bold shadow-warm-sm">
            E
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-foreground tracking-tight">
              ESM Internal Portal
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
              <ShieldCheck className="size-3 text-emerald-600" />
              <span>Admin System</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname?.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors",
                  isActive
                    ? "bg-primary text-white shadow-warm-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-canvas"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Utility */}
      <div className="p-6 border-t border-border space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Website</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors w-full text-left"
        >
          <LogOut className="size-3.5" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </aside>
  );
}
