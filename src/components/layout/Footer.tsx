"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t, locale } = useLanguage();
  const [settings, setSettings] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/content?key=site_settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setSettings(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const phone = settings?.phone || "+62 812-9610-6611";
  const email = settings?.email || "halo@esm.or.id";
  const addressBanten = settings?.addressBanten || "Serang, Tangerang, Balaraja, Cilegon — Banten";
  const addressTernate = settings?.addressTernate || "Kota Rempah (Ternate) — Maluku Utara";
  const tagline = settings
    ? locale === "en"
      ? settings.taglineEn || settings.taglineId
      : settings.taglineId
    : t.footer.tagline;

  return (
    <footer className="w-full border-t border-border/80 bg-card text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-warm-sm ring-1 ring-border/60">
                <Image
                  src="/logo-esm.png"
                  alt="Logo ESM Indonesia"
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-foreground">
                  ESM Indonesia
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Evangelical Student Movement
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {tagline}
            </p>

            {/* Social Icons if configured */}
            {(settings?.instagram || settings?.youtube || settings?.facebook) && (
              <div className="flex items-center gap-3 pt-2">
                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-muted hover:text-primary transition-colors"
                  >
                    <Instagram className="size-4" />
                  </a>
                )}
                {settings?.youtube && (
                  <a
                    href={settings.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-muted hover:text-primary transition-colors"
                  >
                    <Youtube className="size-4" />
                  </a>
                )}
                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-muted hover:text-primary transition-colors"
                  >
                    <Facebook className="size-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Ladang Pelayanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              {t.footer.fieldsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/pelayanan/explore" className="hover:text-primary transition-colors flex items-center gap-1">
                  Explore <span className="text-[11px] text-muted-foreground/70">{t.footer.exploreSub}</span>
                </Link>
              </li>
              <li>
                <Link href="/pelayanan/encounter" className="hover:text-primary transition-colors flex items-center gap-1">
                  Encounter <span className="text-[11px] text-muted-foreground/70">{t.footer.encounterSub}</span>
                </Link>
              </li>
              <li>
                <Link href="/pelayanan/connect" className="hover:text-primary transition-colors flex items-center gap-1">
                  Connect <span className="text-[11px] text-muted-foreground/70">{t.footer.connectSub}</span>
                </Link>
              </li>
              <li>
                <Link href="/pelayanan" className="hover:text-primary transition-colors">
                  {t.footer.framework3C}
                </Link>
              </li>
            </ul>
          </div>

          {/* Misi & Kemitraan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              {t.footer.missionTitle}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/tentang-kami#dasar-iman" className="hover:text-primary transition-colors">
                  {t.footer.statementOfFaith}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#sejarah" className="hover:text-primary transition-colors">
                  {t.footer.historyLink}
                </Link>
              </li>
              <li>
                <Link href="/kemitraan#doa" className="hover:text-primary transition-colors">
                  {t.footer.prayerItems}
                </Link>
              </li>
              <li>
                <Link href="/kemitraan" className="hover:text-primary transition-colors font-semibold text-primary">
                  {t.footer.supportFinancial}
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="hover:text-primary transition-colors">
                  {t.footer.bulletinArticles}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubungi Kami & Wilayah */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                <span>
                  <strong>Banten:</strong> {addressBanten}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-accent mt-0.5" />
                <span>
                  <strong>Maluku Utara:</strong> {addressTernate}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-primary" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-primary" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright Only */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Evangelical Student Movement (ESM). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/tentang-kami#dasar-iman" className="hover:text-foreground transition-colors">
              {locale === "en" ? "Statement of Faith" : "Dasar Iman"}
            </Link>
            <Link href="/kemitraan" className="hover:text-foreground transition-colors">
              {locale === "en" ? "Mission Partnership" : "Kemitraan Misi"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
