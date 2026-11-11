"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  BookOpen,
  Compass,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Newspaper,
  Image as ImageIcon,
  Calendar,
  Users2,
  Wallet,
  HeartHandshake,
  CreditCard,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/actions/auth";

interface NavGroup {
  label: string;
  items: {
    title: string;
    href: string;
    icon: any;
  }[];
}

const navGroups: NavGroup[] = [
  {
    label: "UTAMA",
    items: [
      {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "KONTEN HALAMAN",
    items: [
      {
        title: "Beranda",
        href: "/admin/konten/beranda",
        icon: Home,
      },
      {
        title: "Tentang Kami",
        href: "/admin/konten/tentang-kami",
        icon: BookOpen,
      },
      {
        title: "Pelayanan & 3C",
        href: "/admin/konten/pelayanan",
        icon: Compass,
      },
      {
        title: "Testimoni",
        href: "/admin/konten/testimoni",
        icon: MessageSquareQuote,
      },
      {
        title: "FAQ Tanya Jawab",
        href: "/admin/konten/faq",
        icon: HelpCircle,
      },
    ],
  },
  {
    label: "MEDIA & PUBLIKASI",
    items: [
      {
        title: "Artikel & Renungan",
        href: "/admin/artikel",
        icon: FileText,
      },
      {
        title: "Warta Buletin (PDF)",
        href: "/admin/buletin",
        icon: Newspaper,
      },
      {
        title: "Galeri Foto & Video",
        href: "/admin/galeri",
        icon: ImageIcon,
      },
    ],
  },
  {
    label: "AGENDA & EVENT",
    items: [
      {
        title: "Event & Mobilisasi",
        href: "/admin/event",
        icon: Calendar,
      },
    ],
  },
  {
    label: "KEMITRAAN & KEUANGAN",
    items: [
      {
        title: "Mitra & Donasi",
        href: "/admin/mitra",
        icon: Users2,
      },
      {
        title: "Kas & Arus Kas",
        href: "/admin/keuangan",
        icon: Wallet,
      },
      {
        title: "Pokok Doa Bulanan",
        href: "/admin/doa",
        icon: HeartHandshake,
      },
      {
        title: "Rekening Bank & QRIS",
        href: "/admin/rekening",
        icon: CreditCard,
      },
    ],
  },
  {
    label: "PENGATURAN",
    items: [
      {
        title: "Kontak & Footer",
        href: "/admin/pengaturan",
        icon: Settings,
      },
    ],
  },
];

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
      <div className="p-5 space-y-6 overflow-y-auto max-h-screen scrollbar-none">
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
              <span>Full CMS Active</span>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="space-y-5">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground/80 px-3 pb-1">
                {group.label}
              </p>
              {group.items.map((item) => {
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
                      "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-white shadow-warm-xs font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer User & Logout */}
      <div className="p-4 border-t border-border bg-muted/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <LogOut className="size-3.5" />
          <span>Keluar Portal</span>
        </button>
      </div>
    </aside>
  );
}
