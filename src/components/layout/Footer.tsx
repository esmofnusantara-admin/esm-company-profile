"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-border/80 bg-card text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column (Deskripsi panjang & kutipan sudah di-takeout sesuai permintaan) */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-warm-sm">
                <span className="font-serif text-lg font-bold">E</span>
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
              {t.footer.tagline}
            </p>
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
                  <strong>Banten:</strong> Serang, Tangerang, Balaraja, Cilegon
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-accent mt-0.5" />
                <span>
                  <strong>Maluku Utara:</strong> Kota Rempah (Ternate)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 shrink-0 text-primary" />
                <span>+62 812-9610-6611</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-3.5 shrink-0 text-primary" />
                <span>halo@esm.or.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row gap-3">
          <p>© {new Date().getFullYear()} Evangelical Student Movement (ESM). {t.footer.copyrightNote}</p>
          <div className="flex items-center gap-4">
            <Link href="/tentang-kami#dasar-iman" className="hover:underline">
              {t.footer.statementOfFaith}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
