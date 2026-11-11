"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface TestimonyInput {
  name: string;
  role?: string;
  quote: string;
  quoteEn?: string;
  photo?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export async function getTestimonies() {
  try {
    return await prisma.testimony.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Gagal mengambil data testimoni:", error);
    return [];
  }
}

export async function createTestimony(input: TestimonyInput) {
  try {
    if (!input.name || !input.quote) {
      return { success: false, error: "Nama dan kutipan testimoni wajib diisi." };
    }

    const item = await prisma.testimony.create({
      data: {
        name: input.name,
        role: input.role || null,
        quote: input.quote,
        quoteEn: input.quoteEn || null,
        photo: input.photo || null,
        sortOrder: input.sortOrder ?? 0,
        isActive: input.isActive ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal menambah testimoni:", error);
    return { success: false, error: "Gagal menyimpan testimoni." };
  }
}

export async function updateTestimony(id: string, input: Partial<TestimonyInput>) {
  try {
    const item = await prisma.testimony.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.role !== undefined && { role: input.role }),
        ...(input.quote !== undefined && { quote: input.quote }),
        ...(input.quoteEn !== undefined && { quoteEn: input.quoteEn }),
        ...(input.photo !== undefined && { photo: input.photo }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal memperbarui testimoni:", error);
    return { success: false, error: "Gagal memperbarui data testimoni." };
  }
}

export async function deleteTestimony(id: string) {
  try {
    await prisma.testimony.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus testimoni:", error);
    return { success: false, error: "Gagal menghapus data testimoni." };
  }
}
