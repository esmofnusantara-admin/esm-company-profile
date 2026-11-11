"use client";

import { useState, useEffect } from "react";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ, FAQInput } from "@/actions/faq";
import { AutoTranslateButton } from "@/components/admin/AutoTranslateButton";
import { HelpCircle, Plus, Trash2, Edit2, Loader2, CheckCircle2 } from "lucide-react";
import { FAQPage } from "@prisma/client";

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [form, setForm] = useState<FAQInput>({
    question: "",
    questionEn: "",
    answer: "",
    answerEn: "",
    page: FAQPage.GENERAL,
    isActive: true,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const items = await getFAQs();
      setFaqs(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      alert("Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    try {
      if (editingItem) {
        await updateFAQ(editingItem.id, form);
      } else {
        await createFAQ(form);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setForm({
        question: "",
        questionEn: "",
        answer: "",
        answerEn: "",
        page: FAQPage.GENERAL,
        isActive: true,
      });
      await loadData();
    } catch (err) {
      alert("Gagal menyimpan FAQ.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pertanyaan FAQ ini?")) return;
    try {
      await deleteFAQ(id);
      await loadData();
    } catch (err) {
      alert("Gagal menghapus FAQ.");
    }
  };

  const filteredFaqs =
    activeTab === "ALL" ? faqs : faqs.filter((f) => f.page === activeTab);

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <HelpCircle className="size-3.5" />
            <span>KONTEN HALAMAN</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Kelola Tanya Jawab (FAQ)
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar pertanyaan yang sering diajukan seputar pergerakan ESM dan kemitraan misi.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setForm({
              question: "",
              questionEn: "",
              answer: "",
              answerEn: "",
              page: FAQPage.GENERAL,
              isActive: true,
            });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-warm-sm hover:bg-primary/90 transition-all"
        >
          <Plus className="size-4" />
          <span>Tambah Pertanyaan FAQ</span>
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 border-b border-border pb-2">
        {[
          { key: "ALL", label: "Semua Kategori" },
          { key: FAQPage.GENERAL, label: "Umum & Beranda" },
          { key: FAQPage.KEMITRAAN, label: "Kemitraan & Donasi" },
          { key: FAQPage.PELAYANAN, label: "Pelayanan & Komunitas" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
          <p className="text-xs text-muted-foreground">Belum ada FAQ di kategori ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="p-5 rounded-2xl border border-border bg-card shadow-warm-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {faq.page}
                  </span>
                  <h3 className="text-sm font-bold text-foreground mt-1.5">{faq.question}</h3>
                  {faq.questionEn && (
                    <p className="text-xs text-primary font-medium italic mt-0.5">{faq.questionEn}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditingItem(faq);
                      setForm({
                        question: faq.question,
                        questionEn: faq.questionEn || "",
                        answer: faq.answer,
                        answerEn: faq.answerEn || "",
                        page: faq.page,
                        isActive: faq.isActive,
                      });
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
                  >
                    <Edit2 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-border/50">
                <p>{faq.answer}</p>
                {faq.answerEn && (
                  <p className="italic text-foreground/80 pl-3 border-l-2 border-primary/30">
                    {faq.answerEn}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM FAQ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4 shadow-warm-lg my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-bold text-sm text-foreground">
                {editingItem ? "Sunting Pertanyaan FAQ" : "Tambah Pertanyaan FAQ Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Halaman Target FAQ</label>
                <select
                  value={form.page}
                  onChange={(e) => setForm({ ...form, page: e.target.value as FAQPage })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                >
                  <option value={FAQPage.GENERAL}>Umum & Beranda</option>
                  <option value={FAQPage.KEMITRAAN}>Kemitraan & Donasi</option>
                  <option value={FAQPage.PELAYANAN}>Pelayanan & Komunitas</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Pertanyaan (ID)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bagaimana cara menjadi mitra doa atau donatur tetap?"
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Question (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.question}
                    onTranslated={(txt) => setForm({ ...form, questionEn: txt })}
                  />
                </div>
                <input
                  type="text"
                  placeholder="How can I become a regular prayer or financial partner?"
                  value={form.questionEn || ""}
                  onChange={(e) => setForm({ ...form, questionEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1">Jawaban (ID)</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan jawaban yang ramah, jelas, dan informatif..."
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Answer (EN)</label>
                  <AutoTranslateButton
                    sourceText={form.answer}
                    onTranslated={(txt) => setForm({ ...form, answerEn: txt })}
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Write an informative English answer..."
                  value={form.answerEn || ""}
                  onChange={(e) => setForm({ ...form, answerEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  Simpan FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
