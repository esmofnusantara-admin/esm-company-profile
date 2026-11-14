"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  ArrowRight,
  RefreshCw,
  Flame,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Send,
  CheckCircle2,
  Search,
  X,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt: string;
  excerptEn?: string | null;
  category: string;
  createdAt: string;
  author?: string;
  readTime?: string;
  featured?: boolean;
}

export default function ArtikelPage() {
  const { t, locale } = useLanguage();
  const a = t.articlesPage;

  const [articles, setArticles] = React.useState<ArticleItem[]>([]);
  const [dbBulletins, setDbBulletins] = React.useState<any[]>([]);
  const [galleryItems, setGalleryItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

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
              title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
              titleEn: "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands",
              slug: "melihat-api-perintisan-kembali-menyala-di-kota-rempah",
              excerpt:
                "Catatan lapangan tim misi ESM saat menyusuri kampus-kampus di Ternate dan kepulauan Halmahera, merajut kemitraan bersama hamba Tuhan setempat untuk mendirikan asrama binaan.",
              excerptEn:
                "Field dispatches of the ESM mission team traversing campuses in Ternate, forging local partnerships to establish student discipleship residences.",
              category: "KABAR_LADANG",
              createdAt: "2026-08-02",
              author: "Tim Misi Ternate",
              readTime: "6 Menit Baca",
              featured: true,
            },
            {
              id: "2",
              title: "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
              titleEn: "Why Must Discipleship Live in the Midst of Mission?",
              slug: "mengapa-pemuridan-harus-hidup-di-tengah-misi",
              excerpt:
                "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman kelompok internal, melainkan berani diutus ke tempat-tempat yang belum terjangkau.",
              excerptEn:
                "A deep reflection on the journey of Christ's disciples that must not halt in the comfort zone of closed fellowship, but courageously advance into unreached frontiers.",
              category: "REFLEKSI",
              createdAt: "2026-08-14",
              author: "Staf Pembinaan",
              readTime: "4 Menit Baca",
            },
            {
              id: "3",
              title: "Ketika Sekolah Menjadi Ladang Misi Pertama Kita",
              titleEn: "When School Becomes Our Primary Mission Field",
              slug: "ketika-sekolah-menjadi-ladang-misi-pertama-kita",
              excerpt:
                "Bagaimana siswa SMP dan SMA di Banten belajar mengatasi rasa takut dicap aneh, berani berdoa bersama di jam istirahat, dan memancarkan kasih Kristus di kelas.",
              excerptEn:
                "How secondary students in Banten learn to overcome peer pressure, pray together during school breaks, and radiate the compassion of Christ in the classroom.",
              category: "KESAKSIAN",
              createdAt: "2026-07-25",
              author: "Pengurus Explore",
              readTime: "5 Menit Baca",
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
      fileUrl: "/documents/warta-misi-q3-2026.pdf",
      pages: locale === "en" ? "16 Pages PDF" : "16 Halaman PDF",
      fileSize: "3.2 MB",
    },
    {
      id: "b2",
      edition: locale === "en" ? "Issue 02 / Quarter II - 2026" : "Edisi 02 / Kuartal II - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: Student Faith Resilience in Banten"
          : "Warta Pelayanan: Ketahanan Iman Siswa Banten di Era Digital",
      fileUrl: "/documents/warta-misi-q2-2026.pdf",
      pages: locale === "en" ? "14 Pages PDF" : "14 Halaman PDF",
      fileSize: "2.8 MB",
    },
    {
      id: "b3",
      edition: locale === "en" ? "Issue 01 / Quarter I - 2026" : "Edisi 01 / Kuartal I - 2026",
      title:
        locale === "en"
          ? "Ministry Periodical: The Call of the 3C Strategy"
          : "Warta Pelayanan: Panggilan Kerangka Strategi 3C",
      fileUrl: "/documents/warta-misi-q1-2026.pdf",
      pages: locale === "en" ? "12 Pages PDF" : "12 Halaman PDF",
      fileSize: "2.4 MB",
    },
  ];

  // Restrict to max 3 latest editions (latest quarter)
  const displayBulletins = (dbBulletins.length > 0 ? dbBulletins : fallbackBulletins).slice(0, 3);

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      (art.titleEn && art.titleEn.toLowerCase().includes(q)) ||
      (art.author && art.author.toLowerCase().includes(q))
    );
  });

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  const categories = [
    { id: "all", label: "Semua Tulisan", count: articles.length },
    { id: "KABAR_LADANG", label: "Kabar Ladang Misi", count: articles.filter((a) => a.category === "KABAR_LADANG").length },
    { id: "REFLEKSI", label: "Refleksi Pemuridan", count: articles.filter((a) => a.category === "REFLEKSI").length },
    { id: "KESAKSIAN", label: "Kesaksian Murid", count: articles.filter((a) => a.category === "KESAKSIAN").length },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. PHOTO-DRIVEN JOURNAL HERO (Mission Team Dispatch)
            Features real mission photograph overlooking Ternate's turquoise bay
            ============================================================ */}
        <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/hero/artikel_hero.jpg"
              alt="Kabar Ladang dan Catatan Misi ESM"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Multi-stop Deep Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-[#120204]/75" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Warta Misi Pelayanan • Kabar Lapangan & Buletin</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Kisah Nyata dari Ladang Misi &{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Denyut Pemuridan Nusantara
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Membaca jejak anugerah Allah di Banten dan Maluku Utara: catatan perjalanan tim perintis, refleksi teologis yang relevan, dan kesaksian hidup generasi muda yang diubahkan Kristus.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-amber-400" />
                Laporan Lapangan Terkini
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-red-400" />
                Buletin Berkala Siap Unduh
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="size-3.5 text-emerald-400" />
                Refleksi Pembuat Murid
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. FEATURED HEADLINE STORY SPOTLIGHT
            Large editorial lead story banner
            ============================================================ */}
        {featuredArticle && activeCategory === "all" && (
          <section className="relative -mt-10 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-10 shadow-warm-lg overflow-hidden">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-3 py-1 text-xs">
                    🔥 Catatan Lapangan Pilihan
                  </Badge>
                  <span className="text-xs text-stone-500 font-medium">
                    Oleh: {featuredArticle.author || "Tim Misi"} • {featuredArticle.readTime || "5 Menit Baca"}
                  </span>
                </div>

                <div className="space-y-2">
                  <Link href={`/artikel/${featuredArticle.slug}`} className="block group">
                    <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors cursor-pointer">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal max-w-4xl">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                  <Link
                    href={`/artikel/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline"
                  >
                    <span>Baca Laporan Lengkap</span>
                    <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-stone-400 font-medium">
                    Dipublikasikan: {featuredArticle.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            3. CATEGORY TABS & SEARCH BAR
            ============================================================ */}
        <section className="py-10 border-b border-stone-200/80 bg-white/60 backdrop-blur-xs">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Jelajahi Berita & Tulisan Misi
                </h3>
                <p className="text-xs text-stone-500">
                  Temukan laporan lapangan, refleksi pemuridan, dan kesaksian anak muda.
                </p>
              </div>

              {/* Search Bar Input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, topik, penulis..."
                  className="w-full pl-9 pr-9 py-2.5 rounded-full border border-stone-200 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-primary shadow-2xs transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    title="Hapus pencarian"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                        isActive
                          ? "bg-[#2D060B] text-white shadow-warm-xs ring-1 ring-primary/40 border border-transparent"
                          : "bg-white text-stone-700 hover:text-stone-950 border border-stone-200/90 hover:border-stone-300 hover:bg-stone-50 shadow-2xs"
                      )}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={cn(
                          "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-stone-100 text-stone-600 group-hover:bg-stone-200"
                        )}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(activeCategory !== "all" || searchQuery.trim() !== "") && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="rounded-full text-xs font-semibold text-primary hover:bg-red-50 hover:text-primary cursor-pointer"
                >
                  <RefreshCw className="size-3 mr-1.5" />
                  <span>Lihat Semua ({articles.length})</span>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. ARTICLE LISTINGS GRID
            ============================================================ */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center p-16">
                <RefreshCw className="size-8 animate-spin text-primary" />
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <BookOpen className="size-10 text-stone-300 mx-auto" />
                <h4 className="font-bold text-stone-800">Belum ada tulisan di kategori ini</h4>
                <p className="text-xs text-stone-500">Pilih kategori lain untuk melihat artikel dan kabar lainnya.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((item) => {
                  const displayTitle =
                    locale === "en" && item.titleEn ? item.titleEn : item.title;
                  const displayExcerpt =
                    locale === "en" && item.excerptEn ? item.excerptEn : item.excerpt;

                  return (
                    <Card
                      key={item.id}
                      className="rounded-3xl border border-stone-200/90 bg-white p-6 shadow-warm-xs hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-primary font-bold text-[10px] uppercase tracking-wider border border-primary/20">
                            {item.category.replace(/_/g, " ")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-stone-400" />
                            {item.readTime || "5 min"}
                          </span>
                        </div>

                        <Link href={`/artikel/${item.slug}`} className="block">
                          <h3 className="font-sans text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer">
                            {displayTitle}
                          </h3>
                        </Link>

                        <p className="text-xs text-stone-600 leading-relaxed font-normal line-clamp-3">
                          {displayExcerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-[11px] text-stone-400">
                          {item.createdAt}
                        </span>
                        <Link
                          href={`/artikel/${item.slug}`}
                          className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline"
                        >
                          <span>Baca Tulisan</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            5. BULETIN BERKALA ARCHIVE (PDF Digital Publications)
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Arsip Dokumen Pelayanan
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground">
                  Buletin & Warta Misi Berkala
                </h2>
              </div>
              <p className="text-xs text-stone-500 max-w-xs">
                Unduh dan cetak warta pelayanan untuk dibagikan di kelompok doa dan gereja lokal Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayBulletins.map((b) => (
                <Card
                  key={b.id}
                  className="rounded-3xl border border-stone-200/90 bg-[#FAF7F2] p-6 space-y-4 hover:border-primary/40 transition-colors shadow-warm-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="size-11 rounded-2xl bg-[#2D060B] text-amber-300 flex items-center justify-center font-bold shadow-2xs">
                      <FileText className="size-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      {b.edition}
                    </span>
                    <h3 className="font-bold text-base text-foreground leading-snug">
                      {b.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">{b.pages || b.fileSize || "PDF E-Book"}</span>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full px-4 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white"
                    >
                      <a href={b.fileUrl} download>
                        <Download className="size-3.5 mr-1.5" />
                        <span>Unduh PDF</span>
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Note & WhatsApp CTA for Older Editions / Physical Copies */}
            <div className="rounded-2xl border border-dashed border-stone-300 bg-[#FAF7F2] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>Memerlukan Edisi Terdahulu atau Versi Cetak?</span>
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed max-w-xl">
                  Untuk distribusi buletin cetak bagi gereja lokal, persekutuan doa, atau arsip lengkap kuartal sebelumnya, silakan hubungi tim sekretariat ESM melalui WhatsApp resmi kami.
                </p>
              </div>
              <MaskedWhatsAppLink
                phone="6281296106611"
                text="Halo Sekretariat ESM, saya ingin meminta arsip warta misi atau edisi cetak"
                variant="button"
                className="rounded-full border border-primary/30 text-primary hover:bg-primary-50 font-bold shrink-0 text-xs px-5 py-2.5 bg-white shadow-xs"
                label="Hubungi Sekretariat"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
