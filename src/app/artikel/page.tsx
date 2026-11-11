"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/common/PageHero";
import { FileText, Download, ArrowRight, RefreshCw, Flame, MapPin, Video, ImageIcon, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt: string;
  excerptEn?: string | null;
  category: string;
  createdAt: string;
}

export default function ArtikelPage() {
  const { t, locale } = useLanguage();
  const a = t.articlesPage;

  const [articles, setArticles] = React.useState<ArticleItem[]>([]);
  const [dbBulletins, setDbBulletins] = React.useState<any[]>([]);
  const [galleryItems, setGalleryItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [artRes, mediaRes] = await Promise.all([
          fetch("/api/articles?status=PUBLISHED").then((r) => r.json()).catch(() => ({})),
          fetch("/api/content?section=media").then((r) => r.json()).catch(() => ({})),
        ]);

        if (artRes.success && Array.isArray(artRes.data) && artRes.data.length > 0) {
          setArticles(artRes.data);
        } else {
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

        if (mediaRes.success && mediaRes.data) {
          if (Array.isArray(mediaRes.data.bulletins) && mediaRes.data.bulletins.length > 0) {
            setDbBulletins(mediaRes.data.bulletins);
          }
          if (Array.isArray(mediaRes.data.mediaItems) && mediaRes.data.mediaItems.length > 0) {
            setGalleryItems(mediaRes.data.mediaItems);
          }
        }
      } catch (err) {
        console.error("Error fetching articles & media:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const fallbackBulletins = [
    {
      id: "b1",
      edition: locale === "en" ? "Issue 03 / Quarter III - 2026" : "Edisi 03 / Kuartal III - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: Unlocking the Gates of North Maluku"
          : "Warta Pelayanan: Membuka Gerbang Misi Maluku Utara",
      fileUrl: "#",
      pages: locale === "en" ? "16 Pages PDF" : "16 Halaman PDF",
    },
    {
      id: "b2",
      edition: locale === "en" ? "Issue 02 / Quarter II - 2026" : "Edisi 02 / Kuartal II - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: Student Faith Resilience in Banten"
          : "Warta Pelayanan: Ketahanan Iman Siswa Banten di Era Digital",
      fileUrl: "#",
      pages: locale === "en" ? "14 Pages PDF" : "14 Halaman PDF",
    },
    {
      id: "b3",
      edition: locale === "en" ? "Issue 01 / Quarter I - 2026" : "Edisi 01 / Kuartal I - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: The Call of the 3C Strategy"
          : "Warta Pelayanan: Panggilan Kerangka Strategi 3C",
      fileUrl: "#",
      pages: locale === "en" ? "12 Pages PDF" : "12 Halaman PDF",
    },
  ];

  const displayBulletins = dbBulletins.length > 0 ? dbBulletins : fallbackBulletins;

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
                <div className="flex items-center justify-center p-12">
                  <RefreshCw className="size-6 animate-spin text-primary" />
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
                {displayBulletins.map((b) => (
                  <Card key={b.id} className="p-6 space-y-4 hover:border-accent/60 transition-colors shadow-warm-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="size-10 rounded-xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                        <FileText className="size-5" />
                      </div>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">
                        {b.edition || "Edisi Khusus"}
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug">
                        {locale === "en" && b.titleEn ? b.titleEn : b.title}
                      </h3>
                      {b.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{b.description}</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button asChild variant="outline" size="sm" className="w-full rounded-xl text-xs">
                        <a href={b.fileUrl} target="_blank" rel="noreferrer" download>
                          <Download className="size-3.5 mr-1 text-primary" />
                          <span>{t.common.download} PDF</span>
                        </a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Galeri Dokumentasi Foto & Video (Dynamic from Database) */}
            {galleryItems.length > 0 && (
              <div className="space-y-8 pt-8 border-t border-border">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">
                    {locale === "en" ? "Ministry Media & Gallery" : "Galeri Foto & Video Pelayanan"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {locale === "en"
                      ? "Visual documentation of student gatherings, missions, and community retreats."
                      : "Dokumentasi visual persekutuan siswa, mahasiswa, dan perintisan misi di Banten & Ternate."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryItems.map((item) => {
                    const title = locale === "en" && item.titleEn ? item.titleEn : item.title;
                    const isVideo = item.type === "VIDEO";

                    return (
                      <Card key={item.id} className="overflow-hidden border-border hover:border-primary/40 transition-colors shadow-warm-sm flex flex-col justify-between">
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          {isVideo ? (
                            item.url.includes("youtube") || item.url.includes("youtu.be") ? (
                              <div className="w-full h-full bg-black/90 flex flex-col items-center justify-center text-white/80 p-4">
                                <Video className="size-8 text-red-500 mb-1" />
                                <span className="text-[11px] font-bold">YouTube Video</span>
                              </div>
                            ) : (
                              <video src={item.url} controls className="w-full h-full object-cover" />
                            )
                          ) : (
                            <Image src={item.url} alt={title} fill className="object-cover" />
                          )}
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4 space-y-1">
                          <h4 className="text-sm font-bold text-foreground line-clamp-1">{title}</h4>
                          {item.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                          )}
                          <div className="pt-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                            >
                              <span>{locale === "en" ? "View Media" : "Lihat Media"}</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
