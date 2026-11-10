"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Sparkles, Languages, FileUp, RefreshCw } from "lucide-react";
import { createArticle, createBulletin, deleteArticle } from "@/actions/article";

interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string | null;
  category: string;
  publishedAt?: string | null;
  createdAt: string;
  status: string;
}

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

  // Live Articles State
  const [articles, setArticles] = React.useState<ArticleItem[]>([]);
  const [fetching, setFetching] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const fetchArticles = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/articles?status=ALL");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setArticles(json.data);
      }
    } catch (err) {
      console.error("Gagal mengambil artikel:", err);
    } finally {
      setFetching(false);
    }
  };

  React.useEffect(() => {
    fetchArticles();
  }, []);

  // Fitur Auto-Translate menggunakan Endpoint /api/translate
  const handleAutoTranslate = async () => {
    if (!title && !content) {
      alert("Silakan isi judul dan konten dalam Bahasa Indonesia terlebih dahulu!");
      return;
    }

    setTranslating(true);
    try {
      // 1. Translate Title
      if (title) {
        const resTitle = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: title, source: "id", target: "en" }),
        });
        const dataTitle = await resTitle.json();
        if (dataTitle.success) {
          setTitleEn(dataTitle.translatedText);
        }
      }

      // 2. Translate Content
      if (content) {
        const resContent = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: content, source: "id", target: "en" }),
        });
        const dataContent = await resContent.json();
        if (dataContent.success) {
          setContentEn(dataContent.translatedText);
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
      titleEn,
      category,
      content,
      contentEn,
      excerpt: content.slice(0, 150),
      excerptEn: contentEn ? contentEn.slice(0, 150) : undefined,
      status: "PUBLISHED",
    });
    setLoading(false);
    if (res.success) {
      alert("Artikel dwibahasa (ID & EN) berhasil diterbitkan ke PostgreSQL dan website publik!");
      setTitle("");
      setTitleEn("");
      setContent("");
      setContentEn("");
      fetchArticles();
    } else {
      alert(res.error || "Gagal menerbitkan artikel.");
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    setDeletingId(id);
    const res = await deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert(res.error || "Gagal menghapus artikel.");
    }
    setDeletingId(null);
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
            Tulis refleksi pemuridan, warta lapangan, dan terbitkan buletin berkala secara terhubung ke web publik.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchArticles}
            disabled={fetching}
            className="rounded-xl text-xs"
          >
            <RefreshCw className={`size-3.5 mr-1 ${fetching ? "animate-spin" : ""}`} />
            <span>Segarkan</span>
          </Button>
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex border-b border-border gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("ARTIKEL")}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === "ARTIKEL"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Artikel & Refleksi
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("BULETIN")}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === "BULETIN"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Kelola Buletin PDF
        </button>
      </div>

      {activeTab === "ARTIKEL" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Input Artikel (Bilingual ID / EN) */}
          <div className="lg:col-span-7">
            <Card className="p-6 space-y-5 shadow-warm-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Languages className="size-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">
                    Editor Dwibahasa (Dual-Language CMS)
                  </span>
                </div>

                {/* Tombol Auto-Translate Magic */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAutoTranslate}
                  disabled={translating || !title}
                  className="rounded-xl text-xs border-accent/40 bg-accent-50/20 text-accent-foreground hover:bg-accent-50 hover:text-accent font-bold"
                >
                  <Sparkles className={`size-3.5 mr-1 text-accent ${translating ? "animate-spin" : ""}`} />
                  <span>{translating ? "Menerjemahkan..." : "Auto-Translate ke EN"}</span>
                </Button>
              </div>

              {/* Language Switch Tabs (ID / EN) */}
              <div className="flex rounded-xl bg-card p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setLangTab("ID")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    langTab === "ID"
                      ? "bg-primary text-white shadow-warm-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇮🇩 Versi Indonesia (Utama)
                </button>
                <button
                  type="button"
                  onClick={() => setLangTab("EN")}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    langTab === "EN"
                      ? "bg-primary text-white shadow-warm-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇬🇧 English Version (Dapat Diedit)
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                {langTab === "ID" ? (
                  <>
                    <div>
                      <label className="font-bold text-foreground block mb-1">
                        Judul Artikel (Bahasa Indonesia) *
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Mengapa Pemuridan Harus Hidup di Tengah Misi?"
                        required
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">Kategori Konten</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-foreground focus:outline-none"
                      >
                        <option value="REFLEKSI">Refleksi Pemuridan</option>
                        <option value="BERITA">Kabar Ladang (Banten & Ternate)</option>
                        <option value="KESAKSIAN">Kesaksian Siswa & Mahasiswa</option>
                        <option value="DEVOTIONAL">Renungan Harian</option>
                        <option value="MISI">Ekspedisi Misi</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">
                        Konten Tulisan (Bahasa Indonesia) *
                      </label>
                      <textarea
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tuliskan naskah artikel lengkap di sini..."
                        required
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-accent-50/20 border border-accent/20 text-[11px] text-muted-foreground">
                      💡 Tip: Anda dapat mengetik naskah Inggris secara manual, atau klik tombol{" "}
                      <strong>&quot;Auto-Translate ke EN&quot;</strong> di atas untuk menerjemahkan otomatis dari naskah Indonesia, kemudian perbaiki di form ini.
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">
                        Article Title (English Version)
                      </label>
                      <input
                        type="text"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        placeholder="Example: Why Must Discipleship Live in the Midst of Mission?"
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-foreground block mb-1">
                        Article Content (English Version)
                      </label>
                      <textarea
                        rows={8}
                        value={contentEn}
                        onChange={(e) => setContentEn(e.target.value)}
                        placeholder="Type or review the translated English content here..."
                        className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
                      />
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
                >
                  <Plus className="size-3.5 mr-1" />
                  <span>{loading ? "Menyimpan ke Database..." : "Terbitkan Artikel (2 Bahasa)"}</span>
                </Button>
              </form>
            </Card>
          </div>

          {/* List Artikel */}
          <div className="lg:col-span-5">
            <Card className="p-6 space-y-4 shadow-warm-sm">
              <h3 className="font-bold text-sm text-foreground">
                Daftar Artikel Aktif ({articles.length})
              </h3>
              {fetching ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Memuat data artikel dari PostgreSQL...
                </div>
              ) : articles.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Belum ada artikel tersimpan.
                </div>
              ) : (
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
                          {art.titleEn && (
                            <span className="text-[11px] text-muted-foreground italic block">
                              EN: {art.titleEn}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={deletingId === art.id}
                          onClick={() => handleDeleteArticle(art.id)}
                          className="size-7 text-rose-600 shrink-0 hover:bg-rose-50"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1 border-t border-border">
                        <Badge variant="primarySoft" className="text-[9px]">
                          {art.category}
                        </Badge>
                        <span>&bull;</span>
                        <span className="text-emerald-600 font-bold">
                          {art.titleEn ? "Dual-Lang Ready" : "ID Only"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                <label className="font-bold text-foreground block mb-1">Judul Buletin *</label>
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
                <label className="font-bold text-foreground block mb-1">Edisi / Periode *</label>
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
                <label className="font-bold text-foreground block mb-1">URL File PDF *</label>
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
                className="w-full justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
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
