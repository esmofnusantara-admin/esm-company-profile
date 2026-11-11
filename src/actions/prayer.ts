"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface PrayerRequestInput {
  month: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  category?: string;
  isAnswered?: boolean;
  sortOrder?: number;
}

export async function getPrayerRequests(month?: string) {
  try {
    return await prisma.prayerRequest.findMany({
      where: month ? { month } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("Gagal mengambil pokok doa:", error);
    return [];
  }
}

export async function createPrayerRequest(input: PrayerRequestInput) {
  try {
    if (!input.title || !input.description || !input.month) {
      return { success: false, error: "Bulan, judul, dan penjelasan pokok doa wajib diisi." };
    }

    const item = await prisma.prayerRequest.create({
      data: {
        month: input.month,
        title: input.title,
        titleEn: input.titleEn || null,
        description: input.description,
        descriptionEn: input.descriptionEn || null,
        category: input.category || "MISI",
        isAnswered: input.isAnswered ?? false,
        sortOrder: input.sortOrder ?? 0,
      },
    });

    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal menambah pokok doa:", error);
    return { success: false, error: "Gagal menyimpan pokok doa." };
  }
}

export async function updatePrayerRequest(id: string, input: Partial<PrayerRequestInput>) {
  try {
    const item = await prisma.prayerRequest.update({
      where: { id },
      data: {
        ...(input.month !== undefined && { month: input.month }),
        ...(input.title !== undefined && { title: input.title }),
        ...(input.titleEn !== undefined && { titleEn: input.titleEn }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.descriptionEn !== undefined && { descriptionEn: input.descriptionEn }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.isAnswered !== undefined && { isAnswered: input.isAnswered }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      },
    });

    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal memperbarui pokok doa:", error);
    return { success: false, error: "Gagal memperbarui pokok doa." };
  }
}

export async function deletePrayerRequest(id: string) {
  try {
    await prisma.prayerRequest.delete({ where: { id } });
    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus pokok doa:", error);
    return { success: false, error: "Gagal menghapus pokok doa." };
  }
}
