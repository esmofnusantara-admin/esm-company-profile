"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ArtikelPage() {
  const { t, locale } = useLanguage();
  const a = t.articlesPage;

  const articles = [
    {
      id: "1",
      title:
        locale === "en"
          ? "Why Must Discipleship Live in the Midst of Mission?"
          : "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
      excerpt:
        locale === "en"
          ? "A deep reflection on the journey of Christ's disciples that must not halt in the comfort zone of closed fellowship, but engage real-world realities."
          : "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas tertutup, melainkan harus hadir di tengah realitas dunia.",
      category: locale === "en" ? "Reflection" : "Refleksi",
      readTime: locale === "en" ? "5 min read" : "5 min baca",
      date: locale === "en" ? "August 14, 2026" : "14 Agustus 2026",
      badgeVariant: "primarySoft" as const,
    },
    {
      id: "2",
      title:
        locale === "en"
          ? "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands"
          : "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
      excerpt:
        locale === "en"
          ? "Field dispatches of the ESM mission team traversing campuses in Ternate, forging local church partnerships, and raising island student cells."
          : "Catatan lapangan tim misi ESM menyusuri kampus-kampus di Ternate, merajut kemitraan bersama hamba Tuhan setempat, dan membangkitkan KTB mahasiswa kepulauan.",
      category: locale === "en" ? "Mission Field" : "Kabar Ladang",
      readTime: locale === "en" ? "7 min read" : "7 min baca",
      date: locale === "en" ? "August 02, 2026" : "02 Agustus 2026",
      badgeVariant: "amber" as const,
    },
    {
      id: "3",
      title:
        locale === "en"
          ? "When School Becomes Our Primary Mission Field"
          : "Ketika Sekolah Menjadi Ladang Misi Pertama Kita",
      excerpt:
        locale === "en"
          ? "How high school students learn to overcome peer pressure, uphold academic honesty during exams, and radiate the compassion of Christ."
          : "Bagaimana siswa SMP dan SMA belajar mengatasi rasa takut dicap aneh, berdiri teguh dalam integritas kejujuran saat ujian, dan memancarkan kasih Kristus.",
      category: locale === "en" ? "Student Testimony" : "Kesaksian Siswa",
      readTime: locale === "en" ? "4 min read" : "4 min baca",
      date: locale === "en" ? "July 25, 2026" : "25 Juli 2026",
      badgeVariant: "primarySoft" as const,
    },
  ];

  const bulletins = [
    {
      id: "b1",
      edition: locale === "en" ? "Issue 03 / Quarter III - 2026" : "Edisi 03 / Kuartal III - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: Unlocking the Gates of North Maluku"
          : "Warta Pelayanan: Membuka Gerbang Misi Maluku Utara",
      pages: locale === "en" ? "16 Pages PDF" : "16 Halaman PDF",
    },
    {
      id: "b2",
      edition: locale === "en" ? "Issue 02 / Quarter II - 2026" : "Edisi 02 / Kuartal II - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: Student Faith Resilience in Banten"
          : "Warta Pelayanan: Ketahanan Iman Siswa Banten di Era Digital",
      pages: locale === "en" ? "14 Pages PDF" : "14 Halaman PDF",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge variant="amber" className="text-xs">{a.badge}</Badge>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight">
              {a.title}
            </h1>
            <p className="max-w-2xl mx-auto text-base text-white/80 leading-relaxed font-serif italic">
              &ldquo;{a.quote}&rdquo;
            </p>
          </div>
        </section>

        {/* Artikel Grid */}
        <section className="py-20 bg-canvas">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">{a.articlesTitle}</h2>
                  <p className="text-xs text-muted-foreground">{a.articlesSubtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((item) => (
                  <Card key={item.id} className="p-6 hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={item.badgeVariant}>{item.category}</Badge>
                        <span className="text-xs text-muted-foreground">{item.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-snug hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline">
                        {t.common.readMore}
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Buletin Warta Download (PDF) */}
            <div className="space-y-6 pt-6 border-t border-border">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {locale === "en" ? "Periodical Archives" : "Arsip Warta"}
                </span>
                <h3 className="text-2xl font-extrabold text-foreground">{a.bulletinTitle}</h3>
                <p className="text-xs text-muted-foreground">
                  {a.bulletinSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bulletins.map((b) => (
                  <Card key={b.id} className="p-5 flex items-center justify-between gap-4 bg-card hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                        <FileText className="size-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{b.edition}</span>
                        <h4 className="text-sm font-bold text-foreground">{b.title}</h4>
                        <span className="text-[11px] text-muted-foreground">{b.pages}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="rounded-xl text-xs shrink-0">
                      <Download className="size-3.5 mr-1 text-primary" />
                      <span>{a.downloadBtn}</span>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
