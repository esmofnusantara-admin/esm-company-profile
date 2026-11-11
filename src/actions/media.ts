"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { MediaType } from "@prisma/client";

export interface MediaItemInput {
  title: string;
  titleEn?: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  category?: string;
  description?: string;
  sortOrder?: number;
}

export async function getMediaItems(category?: string) {
  try {
    return await prisma.mediaItem.findMany({
      where: category && category !== "ALL" ? { category } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Gagal mengambil media items:", error);
    return [];
  }
}

export async function createMediaItem(input: MediaItemInput) {
  try {
    if (!input.title || !input.url) {
      return { success: false, error: "Judul dan URL media (foto/video) wajib diisi." };
    }

    const item = await prisma.mediaItem.create({
      data: {
        title: input.title,
        titleEn: input.titleEn || null,
        type: input.type || MediaType.IMAGE,
        url: input.url,
        thumbnail: input.thumbnail || null,
        category: input.category || "GENERAL",
        description: input.description || null,
        sortOrder: input.sortOrder ?? 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/galeri");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal membuat media item:", error);
    return { success: false, error: "Gagal menyimpan item galeri." };
  }
}

export async function updateMediaItem(id: string, input: Partial<MediaItemInput>) {
  try {
    const item = await prisma.mediaItem.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.titleEn !== undefined && { titleEn: input.titleEn }),
        ...(input.type !== undefined && { type: input.type }),
        ...(input.url !== undefined && { url: input.url }),
        ...(input.thumbnail !== undefined && { thumbnail: input.thumbnail }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/galeri");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal memperbarui media item:", error);
    return { success: false, error: "Gagal memperbarui item galeri." };
  }
}

export async function deleteMediaItem(id: string) {
  try {
    await prisma.mediaItem.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus media item:", error);
    return { success: false, error: "Gagal menghapus media." };
  }
}
