"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Share2, Heart, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleData {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt: string;
  excerptEn?: string | null;
  content: string;
  contentEn?: string | null;
  category: string;
  createdAt: string;
  publishedAt?: string | null;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t, locale } = useLanguage();

  const [article, setArticle] = React.useState<ArticleData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setArticle(json.data);
        }
      } catch (err) {
        console.error("Gagal memuat artikel:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center bg-canvas">
          <div className="text-xs text-muted-foreground animate-pulse">
            {locale === "en" ? "Loading article..." : "Memuat artikel..."}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-canvas text-center space-y-4">
          <h1 className="text-2xl font-extrabold text-foreground">
            {locale === "en" ? "Article Not Found" : "Artikel Tidak Ditemukan"}
          </h1>
          <p className="text-xs text-muted-foreground max-w-md">
            {locale === "en"
              ? "The reflection or dispatch you are looking for may have been moved or removed."
              : "Tulisan atau catatan misi yang Anda cari mungkin telah dipindahkan atau belum diterbitkan."}
          </p>
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/artikel">
              <ArrowLeft className="size-3.5 mr-1" />
              <span>{locale === "en" ? "Back to Articles" : "Kembali ke Warta & Artikel"}</span>
            </Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const displayTitle = locale === "en" && article.titleEn ? article.titleEn : article.title;
  const displayContent = locale === "en" && article.contentEn ? article.contentEn : article.content;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-canvas py-12 md:py-20">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back button */}
          <div>
            <Button asChild variant="ghost" size="sm" className="px-0 text-xs text-muted-foreground hover:text-primary">
              <Link href="/artikel" className="flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" />
                <span>{locale === "en" ? "Back to All Articles" : "Kembali ke Daftar Tulisan"}</span>
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="space-y-4 border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primarySoft">{article.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3 text-primary" />
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
              <span className="text-xs text-muted-foreground">&bull;</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="size-3" />
                5 min read
              </span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18]">
              {displayTitle}
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed font-serif italic">
              {locale === "en" && article.excerptEn ? article.excerptEn : article.excerpt}
            </p>
          </header>

          {/* Article Body Content */}
          <div className="text-foreground/90 text-sm sm:text-base leading-relaxed space-y-5 font-sans">
            {displayContent.split("\n\n").map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Article Footer & Actions */}
          <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="rounded-xl text-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 mr-1 text-emerald-600" />
                  <span className="text-emerald-600">{locale === "en" ? "Link Copied!" : "Tautan Disalin!"}</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5 mr-1" />
                  <span>{locale === "en" ? "Share Article" : "Bagikan Tulisan"}</span>
                </>
              )}
            </Button>

            <Button asChild size="sm" className="rounded-xl text-xs font-bold shadow-warm-sm">
              <Link href="/kemitraan">
                <Heart className="size-3.5 mr-1 text-accent" />
                <span>{locale === "en" ? "Partner with ESM" : "Dukung Misi ESM"}</span>
              </Link>
            </Button>
          </footer>
        </article>
      </main>

      <Footer />
    </>
  );
}
