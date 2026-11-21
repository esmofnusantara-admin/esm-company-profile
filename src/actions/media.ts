"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { MediaType } from "@prisma/client";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

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

const initialMediaItems = [
  {
    id: "med-1",
    title: "Pelayanan Siswa SMP & SMA di Serang",
    titleEn: "High School Ministry in Serang",
    type: MediaType.IMAGE,
    url: "/images/hero-1.jpg",
    thumbnail: "/images/hero-1.jpg",
    category: "SISWA",
    description: "Kegiatan persekutuan dan pembinaan siswa sekolah di Banten.",
    sortOrder: 1,
  },
  {
    id: "med-2",
    title: "Asrama Mahasiswa Binaan di Kota Rempah Ternate",
    titleEn: "Student Residential Discipleship Center in Ternate",
    type: MediaType.IMAGE,
    url: "/images/hero-2.jpg",
    thumbnail: "/images/hero-2.jpg",
    category: "MAHASISWA",
    description: "Komunitas doa dan pemuridan mahasiswa di Maluku Utara.",
    sortOrder: 2,
  },
];

function getMemoryMedia(): any[] {
  if (!(globalThis as any).__esmMedia) {
    (globalThis as any).__esmMedia = [...initialMediaItems];
  }
  return (globalThis as any).__esmMedia;
}

export async function getMediaItems(category?: string) {
  if (isDbKnownOffline()) {
    let items = getMemoryMedia();
    if (category && category !== "ALL") items = items.filter((m) => m.category === category);
    return items;
  }

  try {
    const items = await prisma.mediaItem.findMany({
      where: category && category !== "ALL" ? { category } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    markDbOnline();
    if (items && items.length > 0) {
      return items;
    }
    let fallback = getMemoryMedia();
    if (category && category !== "ALL") fallback = fallback.filter((m) => m.category === category);
    return fallback;
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil galeri dari fallback memori.");
    let items = getMemoryMedia();
    if (category && category !== "ALL") items = items.filter((m) => m.category === category);
    return items;
  }
}

import { requireAdminSession } from "@/lib/adminSession";

export async function createMediaItem(input: MediaItemInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/");
    revalidatePath("/agenda");
    revalidatePath("/admin/galeri");
    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal membuat media item:", error);
    return { success: false, error: "Gagal menyimpan item galeri ke database." };
  }
}

export async function updateMediaItem(id: string, input: Partial<MediaItemInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/");
    revalidatePath("/agenda");
    revalidatePath("/admin/galeri");
    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal memperbarui media item:", error);
    return { success: false, error: "Gagal memperbarui item galeri di database." };
  }
}

export async function deleteMediaItem(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.mediaItem.delete({ where: { id } });
    markDbOnline();

    revalidatePath("/");
    revalidatePath("/agenda");
    revalidatePath("/admin/galeri");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus media item:", error);
    return { success: false, error: "Gagal menghapus media dari database." };
  }
}
