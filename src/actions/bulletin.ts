"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PublishStatus } from "@prisma/client";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";
import {
  getMemoryBulletins,
  saveMemoryBulletin,
  deleteMemoryBulletin,
} from "@/lib/bulletinsFallback";

export interface BulletinInput {
  title: string;
  titleEn?: string;
  edition?: string;
  description?: string;
  fileUrl: string;
  status?: PublishStatus;
}

export async function getBulletins() {
  if (isDbKnownOffline()) {
    return getMemoryBulletins();
  }

  try {
    const items = await prisma.bulletin.findMany({
      orderBy: { createdAt: "desc" },
    });
    markDbOnline();
    if (items && items.length > 0) {
      for (const it of items) {
        saveMemoryBulletin(it);
      }
      return items;
    }
    return getMemoryBulletins();
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil buletin dari fallback memori.");
    return getMemoryBulletins();
  }
}

export async function createBulletin(input: BulletinInput) {
  try {
    if (!input.title || !input.fileUrl) {
      return { success: false, error: "Judul dan file buletin PDF wajib diunggah." };
    }

    const newItem = {
      id: "blt-" + Date.now(),
      title: input.title,
      titleEn: input.titleEn || null,
      edition: input.edition || "Edisi Terbaru",
      description: input.description || null,
      fileUrl: input.fileUrl,
      status: input.status || PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveMemoryBulletin(newItem);

    if (!isDbKnownOffline()) {
      try {
        const item = await prisma.bulletin.create({
          data: {
            title: input.title,
            titleEn: input.titleEn || null,
            edition: input.edition || null,
            description: input.description || null,
            fileUrl: input.fileUrl,
            status: input.status || PublishStatus.PUBLISHED,
            publishedAt: new Date(),
          },
        });
        newItem.id = item.id;
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
        console.warn("[WARN] PostgreSQL offline, buletin tersimpan di in-memory cache.");
      }
    }

    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true, id: newItem.id };
  } catch (error) {
    console.error("Gagal membuat buletin:", error);
    return { success: false, error: "Gagal menyimpan buletin." };
  }
}

export async function deleteBulletin(id: string) {
  try {
    deleteMemoryBulletin(id);

    if (!isDbKnownOffline()) {
      try {
        await prisma.bulletin.delete({ where: { id } });
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus buletin:", error);
    return { success: false, error: "Gagal menghapus buletin." };
  }
}
