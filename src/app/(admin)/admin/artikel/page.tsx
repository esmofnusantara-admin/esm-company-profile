"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Languages,
  FileUp,
  RefreshCw,
  Edit2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  X,
  Save,
} from "lucide-react";
import {
  createArticle,
  updateArticle,
  toggleArticleStatus,
  createBulletin,
  deleteArticle,
} from "@/actions/article";
import { MediaUploader } from "@/components/admin/MediaUploader";

interface ArticleItem {
  id: string;
  title: string;
  titleEn?: string | null;
  slug?: string;
  category: string;
  publishedAt?: string | null;
  createdAt: string;
  status: string;
  content?: string | null;
  contentEn?: string | null;
  coverImage?: string | null;
  excerpt?: string | null;
  excerptEn?: string | null;
}

export default function AdminArtikelPage() {
  const [activeTab, setActiveTab] = React.useState<"ARTIKEL" | "BULETIN">("ARTIKEL");
  const [langTab, setLangTab] = React.useState<"ID" | "EN">("ID");

  // Form Artikel State (Bilingual)
  const [editingArticle, setEditingArticle] = React.useState<ArticleItem | null>(null);
  const [title, setTitle] = React.useState("");
  const [titleEn, setTitleEn] = React.useState("");
  const [category, setCategory] = React.useState<any>("REFLEKSI");
  const [coverImage, setCoverImage] = React.useState("");
  const [status, setStatus] = React.useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
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
  const [togglingId, setTogglingId] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  const formRef = React.useRef<HTMLDivElement>(null);

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

  const handleEdit = (art: ArticleItem) => {
    setEditingArticle(art);
    setTitle(art.title);
    setTitleEn(art.titleEn || "");
    setCategory(art.category || "REFLEKSI");
    setCoverImage(art.coverImage || "");
    setStatus((art.status as "PUBLISHED" | "DRAFT") || "PUBLISHED");
    setContent(art.content || "");
    setContentEn(art.contentEn || "");
    setLangTab("ID");

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setEditingArticle(null);
    setTitle("");
    setTitleEn("");
    setCategory("REFLEKSI");
    setCoverImage("");
    setStatus("PUBLISHED");
    setContent("");
    setContentEn("");
    setLangTab("ID");
  };

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

  const handleSubmitArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      titleEn,
      category,
      content,
      contentEn,
      coverImage: coverImage || undefined,
      excerpt: content.slice(0, 160),
      excerptEn: contentEn ? contentEn.slice(0, 160) : undefined,
      status,
    };

    let res;
    if (editingArticle) {
      res = await updateArticle(editingArticle.id, payload);
    } else {
      res = await createArticle(payload);
    }

    setLoading(false);

    if (res.success) {
      alert(
        editingArticle
          ? "Artikel berhasil diperbarui!"
          : "Artikel dwibahasa (ID & EN) berhasil diterbitkan ke PostgreSQL dan website publik!"
      );
      handleCancelEdit();
      fetchArticles();
    } else {
      alert(res.error || "Gagal menyimpan artikel.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    setTogglingId(id);
    const res = await toggleArticleStatus(id);
    if (res.success && res.status) {
      const updatedStatus = res.status;
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: updatedStatus } : a))
      );
      if (editingArticle && editingArticle.id === id) {
        setStatus(updatedStatus as "PUBLISHED" | "DRAFT");
      }
    } else {
      alert(res.error || "Gagal mengubah status artikel.");
    }
    setTogglingId(null);
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    setDeletingId(id);
    const res = await deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      if (editingArticle && editingArticle.id === id) {
        handleCancelEdit();
      }
    } else {
      alert(res.error || "Gagal menghapus artikel.");
    }
    setDeletingId(null);
  };

  const handleCreateBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinFileUrl) {
      alert("Silakan unggah berkas PDF buletin terlebih dahulu!");
      return;
    }

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

  const filteredArticles = articles.filter((art) => {
    if (statusFilter === "ALL") return true;
    return art.status === statusFilter;
  });

  const publishedCount = articles.filter((a) => a.status === "PUBLISHED").length;
  const draftCount = articles.filter((a) => a.status === "DRAFT").length;

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
          {/* Form Input / Edit Artikel (Bilingual ID / EN) */}
          <div ref={formRef} className="lg:col-span-7">
            <Card
              className={`p-6 space-y-5 shadow-warm-sm transition-all ${
                editingArticle ? "border-amber-500/50 ring-2 ring-amber-500/20" : ""
              }`}
            >
              {/* Editing Mode Banner */}
              {editingArticle && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <Edit2 className="size-4 text-amber-600 shrink-0" />
                    <span>
                      Sedang Mengedit: <b>{editingArticle.title}</b>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-200/60 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <X className="size-3" />
                    <span>Batal Edit</span>
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <Languages className="size-4 text-primary" />
                  <span className="text-xs font-bold text-foreground">
                    {editingArticle
                      ? "Sunting Artikel Dwibahasa (ID & EN)"
                      : "Editor Dwibahasa (Dual-Language CMS)"}
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

              <form onSubmit={handleSubmitArticle} className="space-y-4 text-xs">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                        <label className="font-bold text-foreground block mb-1">Status Publikasi</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as "PUBLISHED" | "DRAFT")}
                          className="w-full rounded-xl border border-border bg-canvas px-3.5 py-2 text-foreground focus:outline-none font-semibold"
                        >
                          <option value="PUBLISHED">🟢 Terbitkan Langsung (Aktif)</option>
                          <option value="DRAFT">⚪ Simpan sebagai Draf (Non-aktif)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <MediaUploader
                        label="Foto Sampul Artikel (Cover Image)"
                        value={coverImage}
                        onChange={setCoverImage}
                        folder="articles"
                        accept="image"
                        helperText="Foto utama yang tampil di kartu artikel dan header bacaan (JPG, PNG, WebP)"
                      />
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

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 justify-center rounded-xl font-bold py-2.5 shadow-warm-sm"
                  >
                    {editingArticle ? (
                      <>
                        <Save className="size-3.5 mr-1" />
                        <span>{loading ? "Menyimpan Perubahan..." : "Simpan Pembaruan Artikel"}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="size-3.5 mr-1" />
                        <span>{loading ? "Menyimpan ke Database..." : "Terbitkan Artikel (2 Bahasa)"}</span>
                      </>
                    )}
                  </Button>

                  {editingArticle && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="rounded-xl font-bold text-xs"
                    >
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* List Artikel */}
          <div className="lg:col-span-5">
            <Card className="p-6 space-y-4 shadow-warm-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    Daftar Artikel ({articles.length})
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {publishedCount} aktif &bull; {draftCount} draf
                  </p>
                </div>

                {/* Filter Status */}
                <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-[10px]">
                  <button
                    type="button"
                    onClick={() => setStatusFilter("ALL")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      statusFilter === "ALL"
                        ? "bg-card text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("PUBLISHED")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      statusFilter === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-800 font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Aktif
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter("DRAFT")}
                    className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                      statusFilter === "DRAFT"
                        ? "bg-amber-500/10 text-amber-800 font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Draf
                  </button>
                </div>
              </div>

              {fetching ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Memuat data artikel dari PostgreSQL...
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  Tidak ada artikel yang cocok dengan filter.
                </div>
              ) : (
                <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
                  {filteredArticles.map((art) => (
                    <div
                      key={art.id}
                      className={`p-3.5 rounded-xl border bg-canvas transition-all space-y-2.5 ${
                        editingArticle?.id === art.id
                          ? "border-amber-500 bg-amber-500/5 shadow-xs"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <span className="text-xs font-bold text-foreground block leading-snug">
                            {art.title}
                          </span>
                          {art.titleEn && (
                            <span className="text-[11px] text-muted-foreground italic block truncate">
                              EN: {art.titleEn}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons: Edit & Delete */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(art)}
                            title="Sunting artikel"
                            className="size-7 text-primary hover:bg-primary/10 rounded-lg"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={deletingId === art.id}
                            onClick={() => handleDeleteArticle(art.id)}
                            title="Hapus artikel secara permanen"
                            className="size-7 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Status Badges & Quick Toggle */}
                      <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground pt-1.5 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="primarySoft" className="text-[9px]">
                            {art.category}
                          </Badge>
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[9px] border ${
                              art.status === "PUBLISHED"
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                            }`}
                          >
                            {art.status === "PUBLISHED" ? "● Aktif (Tayang)" : "○ Non-aktif (Draf)"}
                          </span>
                        </div>

                        {/* Quick Toggle Status Button */}
                        <button
                          type="button"
                          disabled={togglingId === art.id}
                          onClick={() => handleToggleStatus(art.id)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                            art.status === "PUBLISHED"
                              ? "bg-background text-muted-foreground border-border hover:bg-amber-500/10 hover:text-amber-700 hover:border-amber-500/30"
                              : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                          }`}
                          title={
                            art.status === "PUBLISHED"
                              ? "Klik untuk ubah menjadi Draf (Non-aktif)"
                              : "Klik untuk Terbitkan artikel (Aktif)"
                          }
                        >
                          {togglingId === art.id ? (
                            <RefreshCw className="size-2.5 animate-spin" />
                          ) : art.status === "PUBLISHED" ? (
                            <>
                              <EyeOff className="size-2.5" />
                              <span>Nonaktifkan</span>
                            </>
                          ) : (
                            <>
                              <Eye className="size-2.5" />
                              <span>Aktifkan</span>
                            </>
                          )}
                        </button>
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
                <MediaUploader
                  label="Berkas Buletin (PDF) *"
                  value={bulletinFileUrl}
                  onChange={setBulletinFileUrl}
                  folder="bulletins"
                  accept="pdf"
                  helperText="Pilih atau unggah berkas dokumen PDF buletin pelayanan (Maksimal 50MB)"
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
