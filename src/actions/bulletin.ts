"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PublishStatus } from "@prisma/client";

export interface BulletinInput {
  title: string;
  titleEn?: string;
  edition?: string;
  description?: string;
  fileUrl: string;
  status?: PublishStatus;
}

export async function getBulletins() {
  try {
    return await prisma.bulletin.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil buletin:", error);
    return [];
  }
}

export async function createBulletin(input: BulletinInput) {
  try {
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

    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal membuat buletin:", error);
    return { success: false, error: "Gagal menyimpan buletin." };
  }
}

export async function deleteBulletin(id: string) {
  try {
    await prisma.bulletin.delete({ where: { id } });
    revalidatePath("/artikel");
    revalidatePath("/admin/buletin");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus buletin:", error);
    return { success: false, error: "Gagal menghapus buletin." };
  }
}
