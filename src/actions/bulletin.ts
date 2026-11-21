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

import { requireAdminSession } from "@/lib/adminSession";

export async function createBulletin(input: BulletinInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    if (!input.title || !input.fileUrl) {
      return { success: false, error: "Judul dan file buletin PDF wajib diunggah." };
    }

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

    markDbOnline();
    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal membuat buletin:", error);
    return { success: false, error: "Gagal menyimpan buletin ke database." };
  }
}

export async function deleteBulletin(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.bulletin.delete({ where: { id } });
    markDbOnline();

    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus buletin:", error);
    return { success: false, error: "Gagal menghapus buletin dari database." };
  }
}
