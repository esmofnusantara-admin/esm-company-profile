"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Sparkles, Languages, FileUp } from "lucide-react";
import { createArticle, createBulletin } from "@/actions/article";

export default function AdminArtikelPage() {
  const [activeTab, setActiveTab] = React.useState<"ARTIKEL" | "BULETIN">("ARTIKEL");
  const [langTab, setLangTab] = React.useState<"ID" | "EN">("ID");

  // Form Artikel State (Bilingual)
  const [title, setTitle] = React.useState("");
  const [titleEn, setTitleEn] = React.useState("");
  const [category, setCategory] = React.useState<any>("REFLEKSI");
  const [content, setContent] = React.useState("");
  const [contentEn, setContentEn] = React.useState("");
  const [translating, setTranslating] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Form Buletin State
  const [bulletinTitle, setBulletinTitle] = React.useState("");
  const [bulletinEdition, setBulletinEdition] = React.useState("");
  const [bulletinFileUrl, setBulletinFileUrl] = React.useState("");

  const articles = [
    {
      id: "1",
      title: "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
      titleEn: "Why Must Discipleship Live in the Midst of Mission?",
      category: "REFLEKSI",
      date: "14 Agustus 2026",
      status: "PUBLISHED",
    },
    {
      id: "2",
      title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
      titleEn: "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands",
      category: "BERITA",
      date: "02 Agustus 2026",
      status: "PUBLISHED",
    },
  ];

  // Fitur Auto-Translate menggunakan Endpoint /api/translate
  const handleAutoTranslate = async () => {
    if (!title && !content) {
      alert("Silakan isi judul dan konten dalam Bahasa Indonesia terlebih dahulu!");
      return;
    }

    setTranslating(true);
    try {
      // 1. Translate Title
      let translatedTitle = titleEn;
      if (title) {
        const resTitle = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: title, source: "id", target: "en" }),
        });
        const dataTitle = await resTitle.json();
        if (dataTitle.success) {
          translatedTitle = dataTitle.translatedText;
          setTitleEn(translatedTitle);
        }
      }

      // 2. Translate Content
      let translatedContent = contentEn;
      if (content) {
        const resContent = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: content, source: "id", target: "en" }),
        });
        const dataContent = await resContent.json();
        if (dataContent.success) {
          translatedContent = dataContent.translatedText;
          setContentEn(translatedContent);
        }
      }

      setLangTab("EN");
      alert("✨ Auto-translate berhasil! Anda dialihkan ke tab English untuk meninjau dan memperbaiki hasil terjemahan.");
    } catch (err) {
      console.error(err);
      alert("Gagal melakukan auto-translate. Silakan coba lagi.");
    } finally {
      setTranslating(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createArticle({
      title,
      category,
      content,
      excerpt: content.slice(0, 150),
      status: "PUBLISHED",
    });
    setLoading(false);
    if (res.success) {
      alert("Artikel dwibahasa (ID & EN) berhasil diterbitkan!");
      setTitle("");
      setTitleEn("");
      setContent("");
      setContentEn("");
    } else {
      alert(res.error || "Gagal menerbitkan artikel.");
    }
  };

  const handleCreateBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createBulletin(bulletinTitle, bulletinFileUrl, bulletinEdition);
    setLoading(false);
    if (res.success) {
      alert("Buletin PDF berhasil ditambahkan!");
      setBulletinTitle("");
      setBulletinEdition("");
      setBulletinFileUrl("");
    } else {
      alert(res.error || "Gagal menyimpan buletin.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Manajemen Konten Media & Warta
          </h1>
          <p className="text-xs text-muted-foreground">
            Tulis renungan, publikasi kesaksian dalam dua bahasa (ID & EN), serta kelola arsip buletin PDF.
          </p>
        </div>
        <div className="flex rounded-xl bg-card p-1 border border-border">
          <button
            onClick={() => setActiveTab("ARTIKEL")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "ARTIKEL"
                ? "bg-primary text-white shadow-warm-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Artikel & Renungan
          </button>
          <button
            onClick={() => setActiveTab("BULETIN")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === "BULETIN"
                ? "bg-primary text-white shadow-warm-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Buletin Warta (PDF)
          </button>
        </div>
      </div>

      {activeTab === "ARTIKEL" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Tulis Artikel */}
          <div className="lg:col-span-7">
            <Card className="p-6 space-y-4 shadow-warm-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-foreground">Editor Artikel Dwibahasa</h3>
                  <Badge variant="primarySoft" className="text-[10px]">Dual-Version (ID & EN)</Badge>
                </div>

                {/* Sub-tab Bahasa ID vs EN & Auto-Translate Button */}
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg border border-border bg-canvas p-0.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setLangTab("ID")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        langTab === "ID" ? "bg-primary text-white" : "text-muted-foreground"
                      }`}
                    >
                      🇮🇩 Indonesia
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangTab("EN")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        langTab === "EN" ? "bg-primary text-white" : "text-muted-foreground"
                      }`}
                    >
                      🇬🇧 English
                    </button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAutoTranslate}
                    disabled={translating}
                    className="h-8 rounded-lg text-xs font-bold text-accent-700 border-accent/40 bg-accent-50/50 hover:bg-accent-100"
                  >
                    <Sparkles className="size-3.5 mr-1 text-accent" />
                    <span>{translating ? "Menerjemahkan..." : "Auto-Translate"}</span>
                  </Button>
                </div>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-foreground block mb-1">Kategori Tulisan</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none"
                  >
                    <option value="REFLEKSI">Refleksi Pemuridan</option>
                    <option value="BERITA">Kabar Ladang Misi</option>
                    <option value="KESAKSIAN">Kesaksian Murid</option>
                    <option value="DEVOTIONAL">Renungan Alkitab</option>
                  </select>
                </div>

                {/* Tab Konten Indonesia */}
                {langTab === "ID" && (
                  <div className="space-y-3 p-3.5 rounded-xl bg-canvas border border-border">
                    <div className="flex items-center justify-between text-[11px] font-bold text-primary">
                      <span>🇮🇩 Naskah Bahasa Indonesia (Utama)</span>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">Judul Artikel (ID)</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Mengapa Pemuridan Harus Hidup di Tengah Misi?"
                        required
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">Isi Konten (ID)</label>
                      <textarea
                        rows={7}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tuliskan naskah dalam Bahasa Indonesia..."
                        required
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Tab Konten English (Hasil Auto-Translate yang Bisa Diedit Manual) */}
                {langTab === "EN" && (
                  <div className="space-y-3 p-3.5 rounded-xl bg-canvas border border-accent/40">
                    <div className="flex items-center justify-between text-[11px] font-bold text-accent-700">
                      <span>🇬🇧 English Version (Dapat diperiksa & diperbaiki)</span>
                      <span className="text-[10px] text-muted-foreground font-normal">
                        *Klik tombol Auto-Translate untuk mengisi otomatis dari naskah ID
                      </span>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">Article Title (EN)</label>
                      <input
                        type="text"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        placeholder="Example: Why Must Discipleship Live in the Midst of Mission?"
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">Article Content (EN)</label>
                      <textarea
                        rows={7}
                        value={contentEn}
                        onChange={(e) => setContentEn(e.target.value)}
                        placeholder="English version of the article content (can be edited manually)..."
                        className="w-full rounded-xl border border-border bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono text-xs"
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
                >
                  <Plus className="size-3.5 mr-1" />
                  <span>{loading ? "Menyimpan..." : "Terbitkan Artikel (2 Bahasa)"}</span>
                </Button>
              </form>
            </Card>
          </div>

          {/* List Artikel */}
          <div className="lg:col-span-5">
            <Card className="p-6 space-y-4 shadow-warm-sm">
              <h3 className="font-bold text-sm text-foreground">Daftar Artikel Aktif</h3>
              <div className="space-y-3">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-3.5 rounded-xl border border-border bg-canvas hover:border-primary/40 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-foreground block leading-snug">
                          {art.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground italic block">
                          EN: {art.titleEn}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="size-7 text-rose-600 shrink-0">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 border-t border-border">
                      <Badge variant="primarySoft" className="text-[9px]">
                        {art.category}
                      </Badge>
                      <span>&bull;</span>
                      <span>{art.date}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-600 font-bold">Dual-Lang Ready</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Form Upload Buletin PDF */
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 space-y-4 shadow-warm-sm">
            <h3 className="font-bold text-sm text-foreground">Unggah Buletin Warta (PDF)</h3>
            <form onSubmit={handleCreateBulletin} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Judul Buletin</label>
                <input
                  type="text"
                  value={bulletinTitle}
                  onChange={(e) => setBulletinTitle(e.target.value)}
                  placeholder="Contoh: Warta Pelayanan: Membuka Gerbang Misi"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Edisi / Periode</label>
                <input
                  type="text"
                  value={bulletinEdition}
                  onChange={(e) => setBulletinEdition(e.target.value)}
                  placeholder="Contoh: Edisi 03 / Kuartal III - 2026"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">URL File PDF</label>
                <input
                  type="text"
                  value={bulletinFileUrl}
                  onChange={(e) => setBulletinFileUrl(e.target.value)}
                  placeholder="Contoh: /uploads/bulletins/warta-edisi-03.pdf"
                  required
                  className="w-full rounded-xl border border-border bg-canvas px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full justify-center rounded-xl font-bold py-2.5"
              >
                <FileUp className="size-3.5 mr-1" />
                <span>{loading ? "Menyimpan..." : "Publikasikan Buletin"}</span>
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
