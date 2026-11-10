"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  ShieldCheck,
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
      title: t.nav.about,
      href: "/tentang-kami",
      children: [
        {
          title: t.nav.aboutDropdown.intro,
          description: t.nav.aboutDropdown.introDesc,
          href: "/tentang-kami#sejarah",
        },
        {
          title: t.nav.aboutDropdown.vision,
          description: t.nav.aboutDropdown.visionDesc,
          href: "/tentang-kami#visi-misi",
        },
        {
          title: t.nav.aboutDropdown.faith,
          description: t.nav.aboutDropdown.faithDesc,
          href: "/tentang-kami#dasar-iman",
        },
        {
          title: t.nav.aboutDropdown.regions,
          description: t.nav.aboutDropdown.regionsDesc,
          href: "/tentang-kami#wilayah",
        },
      ],
    },
    {
      title: t.nav.ministry,
      href: "/pelayanan",
      children: [
        {
          title: t.nav.ministryDropdown.strategy,
          description: t.nav.ministryDropdown.strategyDesc,
          href: "/pelayanan",
        },
        {
          title: t.nav.ministryDropdown.explore,
          description: t.nav.ministryDropdown.exploreDesc,
          href: "/pelayanan/explore",
        },
        {
          title: t.nav.ministryDropdown.encounter,
          description: t.nav.ministryDropdown.encounterDesc,
          href: "/pelayanan/encounter",
        },
        {
          title: t.nav.ministryDropdown.connect,
          description: t.nav.ministryDropdown.connectDesc,
          href: "/pelayanan/connect",
        },
      ],
    },
    {
      title: t.nav.mobilization,
      href: "/mobilisasi",
    },
    {
      title: t.nav.media,
      href: "/artikel",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-canvas/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-warm-sm transition-transform group-hover:scale-105">
            <span className="font-serif text-xl font-bold tracking-wider">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
              ESM
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              Evangelical Student Movement
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
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
                  "flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "text-primary bg-primary-50/80"
                    : "text-foreground/80 hover:text-primary hover:bg-canvas-subtle"
                )}
              >
                {item.title}
                {item.children && (
                  <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                )}
              </Link>

              {/* Mega / Dropdown Menu */}
              {item.children && activeDropdown === item.title && (
                <div className="absolute left-0 top-full pt-2 w-72 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="rounded-2xl border border-border bg-card p-3 shadow-warm-lg">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className="block rounded-xl p-2.5 transition-colors hover:bg-canvas-subtle group/item"
                      >
                        <p className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                          {sub.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
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

        {/* Desktop Utility & Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick link Minta Doa */}
          <Link
            href="/kemitraan#doa"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1"
          >
            <Heart className="size-3.5 text-primary" />
            <span>{t.nav.prayerRequest}</span>
          </Link>

          {/* Interactive Language Switcher (ID | EN) */}
          <div className="flex items-center rounded-full border border-border/80 bg-card p-0.5 text-xs font-medium shadow-warm-sm">
            <button
              type="button"
              onClick={() => setLocale("id")}
              className={cn(
                "px-2.5 py-1 rounded-full transition-all text-xs font-bold",
                locale === "id"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "px-2.5 py-1 rounded-full transition-all text-xs font-bold",
                locale === "en"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>

          {/* Primary Action Button */}
          <Button asChild size="default" className="rounded-full shadow-warm-sm">
            <Link href="/kemitraan">
              <span>{t.nav.partnerCta}</span>
            </Link>
          </Button>

          {/* Superadmin Portal Shortcut */}
          <Link
            href="/admin"
            className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-primary transition-colors px-2.5 py-1.5 rounded-full border border-border/80 bg-card hover:bg-canvas shadow-warm-sm"
            title="Portal Superadmin ESM"
          >
            <ShieldCheck className="size-3.5 text-primary" />
            <span>Admin</span>
          </Link>
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
                <Link href="/kemitraan#doa" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="size-3.5 text-primary mr-1" />
                  {t.nav.prayerRequest}
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-center rounded-xl text-xs text-muted-foreground"
              >
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <ShieldCheck className="size-3.5 text-primary mr-1" />
                  <span>Portal Superadmin</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
