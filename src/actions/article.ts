"use server";

import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface ArticleInput {
  title: string;
  titleEn?: string;
  excerpt?: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  category: "DEVOTIONAL" | "BERITA" | "KESAKSIAN" | "REFLEKSI" | "MISI" | "LAINNYA";
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
}

// 1. Buat Artikel Baru (Bilingual ID & EN)
export async function createArticle(input: ArticleInput) {
  try {
    if (!input.title || !input.content) {
      return { success: false, error: "Judul dan isi artikel wajib diisi." };
    }

    const baseSlug = generateSlug(input.title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const article = await prisma.article.create({
      data: {
        title: input.title,
        titleEn: input.titleEn || null,
        slug: uniqueSlug,
        excerpt: input.excerpt || input.content.slice(0, 160),
        excerptEn: input.excerptEn || (input.contentEn ? input.contentEn.slice(0, 160) : null),
        content: input.content,
        contentEn: input.contentEn || null,
        category: input.category,
        coverImage: input.coverImage || null,
        status: input.status,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidatePath("/artikel");
    revalidatePath("/admin/artikel");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, id: article.id, slug: article.slug };
  } catch (error) {
    console.error("Gagal membuat artikel:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan artikel." };
  }
}

// 2. Hapus Artikel
export async function deleteArticle(id: string) {
  try {
    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/artikel");
    revalidatePath("/admin/artikel");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus artikel:", error);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

// 3. Tambah Buletin Warta (PDF)
export async function createBulletin(title: string, fileUrl: string, edition?: string) {
  try {
    if (!title || !fileUrl) {
      return { success: false, error: "Judul dan file buletin wajib diunggah." };
    }

    const bulletin = await prisma.bulletin.create({
      data: {
        title,
        fileUrl,
        edition: edition || "Edisi Terbaru",
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    revalidatePath("/artikel");
    revalidatePath("/admin/artikel");

    return { success: true, id: bulletin.id };
  } catch (error) {
    console.error("Gagal membuat buletin:", error);
    return { success: false, error: "Gagal menyimpan buletin." };
  }
}
