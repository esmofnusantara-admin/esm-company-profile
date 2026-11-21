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

import { requireAdminSession } from "@/lib/adminSession";

// 1. Buat Artikel Baru (Bilingual ID & EN)
export async function createArticle(input: ArticleInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal membuat artikel:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan artikel." };
  }
}

// 2. Perbarui Artikel (Bilingual ID & EN)
export async function updateArticle(id: string, input: Partial<ArticleInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    const data: any = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.titleEn !== undefined) data.titleEn = input.titleEn || null;
    if (input.content !== undefined) data.content = input.content;
    if (input.contentEn !== undefined) data.contentEn = input.contentEn || null;
    if (input.category !== undefined) data.category = input.category;
    if (input.coverImage !== undefined) data.coverImage = input.coverImage || null;
    if (input.excerpt !== undefined) data.excerpt = input.excerpt;
    if (input.excerptEn !== undefined) data.excerptEn = input.excerptEn || null;
    if (input.status !== undefined) {
      data.status = input.status;
      if (input.status === "PUBLISHED" && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data,
    });

    revalidatePath("/artikel");
    revalidatePath(`/artikel/${article.slug}`);
    revalidatePath("/admin/artikel");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, id: article.id, slug: article.slug };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal memperbarui artikel:", error);
    return { success: false, error: "Terjadi kesalahan saat memperbarui artikel." };
  }
}

// 3. Toggle Status Artikel (PUBLISHED <-> DRAFT)
export async function toggleArticleStatus(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    const newStatus = existing.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const article = await prisma.article.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt: newStatus === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
      },
    });

    revalidatePath("/artikel");
    revalidatePath(`/artikel/${article.slug}`);
    revalidatePath("/admin/artikel");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, status: article.status };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal mengubah status artikel:", error);
    return { success: false, error: "Gagal mengubah status artikel." };
  }
}

// 4. Hapus Artikel
export async function deleteArticle(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.article.delete({
      where: { id },
    });

    revalidatePath("/artikel");
    revalidatePath("/admin/artikel");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal menghapus artikel:", error);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

// 3. Tambah Buletin Warta (PDF)
export async function createBulletin(title: string, fileUrl: string, edition?: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal membuat buletin:", error);
    return { success: false, error: "Gagal menyimpan buletin." };
  }
}
