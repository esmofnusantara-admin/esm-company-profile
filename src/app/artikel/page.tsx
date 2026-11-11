"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/common/PageHero";
import { FileText, Download, ArrowRight, RefreshCw, Flame, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt: string;
  excerptEn?: string | null;
  category: string;
  publishedAt?: string | null;
  createdAt: string;
}

export default function ArtikelPage() {
  const { t, locale } = useLanguage();
  const a = t.articlesPage;

  const [articles, setArticles] = React.useState<ArticleItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/articles?status=PUBLISHED");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setArticles(json.data);
        } else {
          // Default fallbacks
          setArticles([
            {
              id: "1",
              title: "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
              titleEn: "Why Must Discipleship Live in the Midst of Mission?",
              slug: "mengapa-pemuridan-harus-hidup-di-tengah-misi",
              excerpt:
                "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas tertutup.",
              excerptEn:
                "A deep reflection on the journey of Christ's disciples that must not halt in the comfort zone of closed fellowship.",
              category: "REFLEKSI",
              createdAt: "2026-08-14",
            },
            {
              id: "2",
              title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
              titleEn: "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands",
              slug: "melihat-api-perintisan-kembali-menyala-di-kota-rempah",
              excerpt:
                "Catatan lapangan tim misi ESM menyusuri kampus-kampus di Ternate, merajut kemitraan bersama hamba Tuhan setempat.",
              excerptEn:
                "Field dispatches of the ESM mission team traversing campuses in Ternate, forging local church partnerships.",
              category: "KABAR_LADANG",
              createdAt: "2026-08-02",
            },
            {
              id: "3",
              title: "Ketika Sekolah Menjadi Ladang Misi Pertama Kita",
              titleEn: "When School Becomes Our Primary Mission Field",
              slug: "ketika-sekolah-menjadi-ladang-misi-pertama-kita",
              excerpt:
                "Bagaimana siswa SMP dan SMA belajar mengatasi rasa takut dicap aneh dan memancarkan kasih Kristus.",
              excerptEn:
                "How secondary students learn to overcome peer pressure and radiate the compassion of Christ.",
              category: "KESAKSIAN",
              createdAt: "2026-07-25",
            },
          ]);
        }
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

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
    {
      id: "b3",
      edition: locale === "en" ? "Issue 01 / Quarter I - 2026" : "Edisi 01 / Kuartal I - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: The Call of the 3C Strategy"
          : "Warta Pelayanan: Panggilan Kerangka Strategi 3C",
      pages: locale === "en" ? "12 Pages PDF" : "12 Halaman PDF",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <PageHero
          badge={a.badge}
          title={a.title}
          quote={a.quote}
        />

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

              {loading ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  {locale === "en" ? "Loading articles from database..." : "Memuat artikel dari database..."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articles.map((item) => {
                    const displayTitle =
                      locale === "en" && item.titleEn ? item.titleEn : item.title;
                    const displayExcerpt =
                      locale === "en" && item.excerptEn ? item.excerptEn : item.excerpt;

                    return (
                      <Card key={item.id} className="p-6 hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={item.category === "KABAR_LADANG" ? "amber" : "primarySoft"}>
                              {item.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">5 min read</span>
                          </div>
                          <Link href={`/artikel/${item.slug}`} className="block">
                            <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer">
                              {displayTitle}
                            </h3>
                          </Link>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {displayExcerpt}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                          <Link
                            href={`/artikel/${item.slug}`}
                            className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            <span>{t.common.readMore}</span>
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Buletin Berkala */}
            <div className="space-y-8 pt-8 border-t border-border">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{a.bulletinTitle}</h2>
                <p className="text-xs text-muted-foreground">{a.bulletinSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bulletins.map((b) => (
                  <Card key={b.id} className="p-6 space-y-4 hover:border-accent/60 transition-colors shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                        <FileText className="size-5" />
                      </div>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">
                        {b.edition}
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{b.pages}</p>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="w-full rounded-xl text-xs">
                        <Download className="size-3.5 mr-1 text-primary" />
                        <span>{t.common.download} PDF</span>
                      </Button>
                    </div>
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
