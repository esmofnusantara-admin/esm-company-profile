"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  UserCheck,
  Network,
  Building2,
  Heart,
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
    label: "BERANDA",
    items: [
      {
        title: "Kelola Beranda",
        href: "/admin/konten/beranda",
        icon: Home,
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
    label: "TENTANG KAMI",
    items: [
      {
        title: "Profil & Visi Misi",
        href: "/admin/konten/tentang-kami?tab=profil",
        icon: BookOpen,
      },
      {
        title: "Tim Pelayan & Staf",
        href: "/admin/konten/tentang-kami?tab=tim",
        icon: UserCheck,
      },
      {
        title: "Bagan Struktur Gerakan",
        href: "/admin/konten/tentang-kami?tab=pengurus",
        icon: Network,
      },
      {
        title: "Pengurus Yayasan & Legalitas",
        href: "/admin/konten/tentang-kami?tab=yayasan",
        icon: Building2,
      },
      {
        title: "Informasi Mitra Misi",
        href: "/admin/konten/tentang-kami?tab=mitra",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "PELAYANAN (3C)",
    items: [
      {
        title: "Explore, Encounter & Connect",
        href: "/admin/konten/pelayanan",
        icon: Compass,
      },
    ],
  },
  {
    label: "KABAR & DOA",
    items: [
      {
        title: "Artikel & Warta Misi",
        href: "/admin/artikel",
        icon: FileText,
      },
      {
        title: "Pokok Doa Bulanan",
        href: "/admin/doa",
        icon: HeartHandshake,
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
    label: "AGENDA & KOMUNITAS",
    items: [
      {
        title: "Event & Mobilisasi",
        href: "/admin/event",
        icon: Calendar,
      },
      {
        title: "Pendaftar Komunitas",
        href: "/admin/gabung",
        icon: Users2,
      },
    ],
  },
  {
    label: "KEMITRAAN & KEUANGAN",
    items: [
      {
        title: "Rekening Bank & QRIS",
        href: "/admin/rekening",
        icon: CreditCard,
      },
      {
        title: "Mitra & Komitmen Donasi",
        href: "/admin/mitra",
        icon: Heart,
      },
      {
        title: "Kas & Arus Kas",
        href: "/admin/keuangan",
        icon: Wallet,
      },
    ],
  },
  {
    label: "PENGATURAN",
    items: [
      {
        title: "Kontak & Tema Web",
        href: "/admin/pengaturan",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin/login");
    router.refresh();
  };

  const isItemActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    const [basePath, queryString] = href.split("?");
    if (queryString) {
      const itemTab = new URLSearchParams(queryString).get("tab");
      const currentTab = searchParams?.get("tab") || "profil";
      return pathname === basePath && currentTab === itemTab;
    }
    if (pathname === "/admin/konten/tentang-kami") {
      return false;
    }
    return pathname === href || (pathname.startsWith(href + "/") && !href.includes("?"));
  };

  return (
    <aside className="sticky top-0 h-screen w-64 border-r border-border bg-card flex flex-col justify-between shrink-0 z-30">
      <div className="flex-1 overflow-y-auto p-5 space-y-6 min-h-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 rounded-xl bg-white p-1 flex items-center justify-center shadow-warm-sm ring-1 ring-border/60">
            <Image
              src="/logo-esm.png"
              alt="Logo ESM Indonesia"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
            />
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
                const isActive = isItemActive(item.href);
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
      <div className="p-4 border-t border-border bg-card shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="size-3.5" />
          <span>Keluar Portal</span>
        </button>
      </div>
    </aside>
  );
}
