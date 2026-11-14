"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const navigationItems = [
    {
      title: locale === "en" ? "Home" : "Beranda",
      href: "/",
    },
    {
      title: locale === "en" ? "About" : "Tentang",
      href: "/tentang-kami",
      children: [
        {
          title: locale === "en" ? "Story & Vision" : "Kisah & Visi Misi",
          description: locale === "en" ? "Heart and calling of ESM" : "Hati, sejarah, dan panggilan awal gerakan",
          href: "/tentang-kami#sejarah",
        },
        {
          title: locale === "en" ? "Mission of Faith" : "Dasar Iman (Mission of Faith)",
          description: locale === "en" ? "Communion, Community, Commission" : "Pernyataan iman & 4 pilar credo teologis",
          href: "/tentang-kami#dasar-iman",
        },
        {
          title: locale === "en" ? "Banten & Ternate" : "Ladang: Banten & Ternate",
          description: locale === "en" ? "Regional mission profiles" : "Profil perintisan di Tanah Jawara & Kota Rempah",
          href: "/tentang-kami#wilayah",
        },
        {
          title: locale === "en" ? "Partners & Legal Identity" : "Mitra Gerakan & Legalitas",
          description: locale === "en" ? "Affiliation with MMB Foundation & Governance" : "Naungan Yayasan MMB & struktur organisasi",
          href: "/tentang-kami#mitra-legalitas",
        },
      ],
    },
    {
      title: locale === "en" ? "Ministries" : "Pelayanan",
      href: "/pelayanan",
      children: [
        {
          title: "Explore (Siswa SMA)",
          description: locale === "en" ? "High school discipleship" : "Mendampingi masa pencarian identitas di sekolah",
          href: "/pelayanan/explore",
        },
        {
          title: "Encounter (Mahasiswa)",
          description: locale === "en" ? "Campus discipleship" : "Membangun murid berakar & kritis di kampus",
          href: "/pelayanan/encounter",
        },
        {
          title: "Connect (Alumni)",
          description: locale === "en" ? "Marketplace ministry" : "Menjadi saksi Kristus di dunia profesional",
          href: "/pelayanan/connect",
        },
      ],
    },
    {
      title: locale === "en" ? "News & Prayer" : "Kabar dan Doa",
      href: "/kabar-doa",
      children: [
        {
          title: locale === "en" ? "Daily Devotional" : "Renungan",
          description:
            locale === "en"
              ? "Daily quiet time & golden verse of the day"
              : "Renungan, saat teduh harian & ayat emas hari ini",
          href: "/renungan",
        },
        {
          title: locale === "en" ? "Prayer Wall" : "Pokok Doa Bersama",
          description:
            locale === "en"
              ? "Community prayer wall & monthly requests"
              : "Mezbah doa bulanan & pokok doa bersama ladang misi",
          href: "/doa",
        },
        {
          title: locale === "en" ? "Mission Ministry News" : "Warta Misi Pelayanan",
          description:
            locale === "en"
              ? "Field updates from Banten & Ternate, and bulletins"
              : "Kabar ladang pelayanan Banten, Ternate & buletin warta misi",
          href: "/artikel",
        },
        {
          title: locale === "en" ? "Teaching Materials" : "Bahan Ajar",
          description:
            locale === "en"
              ? "Bible study guides & disciple maker handbooks"
              : "Bahan PA & panduan pembuat murid bagi pembina KTB",
          href: "/sumber-daya",
        },
      ],
    },
    {
      title: locale === "en" ? "Agenda" : "Agenda",
      href: "/agenda",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-canvas/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 flex-nowrap">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-warm-xs ring-1 ring-border/50 transition-transform group-hover:scale-105">
            <Image
              src="/logo-esm.png"
              alt="Logo ESM Indonesia"
              width={36}
              height={36}
              className="h-8 w-8 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
              ESM
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase leading-tight mt-0.5 hidden sm:block">
              Evangelical Student Movement
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Strictly 1 Row, Compact & Clean) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 text-[13px] xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "text-primary bg-primary-50/70"
                    : "text-foreground/80 hover:text-primary hover:bg-canvas-subtle"
                )}
              >
                <span>{item.title}</span>
                {item.children && (
                  <ChevronDown className="size-3 opacity-60 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {/* Mega / Dropdown Menu */}
              {item.children && activeDropdown === item.title && (
                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-border/80 bg-card p-2.5 shadow-warm-lg">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block rounded-xl p-2.5 transition-colors hover:bg-canvas-subtle group/item"
                      >
                        <p className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors">
                          {sub.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {sub.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Utility & Action CTA (Single Row, No Wrap) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {/* Interactive Language Switcher (ID | EN) */}
          <div className="flex items-center rounded-full border border-border/70 bg-card p-0.5 text-xs font-medium shadow-warm-xs">
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all text-[11px] font-bold",
                locale === "id"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "px-2 py-0.5 rounded-full transition-all text-[11px] font-bold",
                locale === "en"
                  ? "bg-primary text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>

          {/* Primary Action Button */}
          <Button asChild size="sm" className="rounded-full shadow-warm-xs text-xs font-bold px-4 py-1.5 h-8">
            <Link href="/kemitraan">
              <span>{t.nav.partnerCta}</span>
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Language Switcher */}
          <div className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-medium mr-1">
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-bold",
                locale === "id" ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-bold",
                locale === "en" ? "bg-primary text-white" : "text-muted-foreground"
              )}
            >
              EN
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card p-4 md:hidden animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <div key={item.title} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-bold text-foreground hover:bg-canvas-subtle"
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="ml-4 flex flex-col space-y-1 border-l border-border pl-3 my-1">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="py-1 text-xs text-muted-foreground hover:text-primary"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Button asChild className="w-full justify-center rounded-xl">
                <Link href="/kemitraan" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.partnerCta}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-center rounded-xl text-xs"
              >
                <Link href="/doa" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="size-3.5 text-primary mr-1" />
                  {t.nav.prayerRequest}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
