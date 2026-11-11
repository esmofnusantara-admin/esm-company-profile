"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FAQPage } from "@prisma/client";

export interface FAQInput {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  page?: FAQPage;
  sortOrder?: number;
  isActive?: boolean;
}

export async function getFAQs(page?: FAQPage) {
  try {
    return await prisma.fAQ.findMany({
      where: page ? { page } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Gagal mengambil FAQ:", error);
    return [];
  }
}

export async function createFAQ(input: FAQInput) {
  try {
    if (!input.question || !input.answer) {
      return { success: false, error: "Pertanyaan dan jawaban wajib diisi." };
    }

    const item = await prisma.fAQ.create({
      data: {
        question: input.question,
        questionEn: input.questionEn || null,
        answer: input.answer,
        answerEn: input.answerEn || null,
        page: input.page || FAQPage.GENERAL,
        sortOrder: input.sortOrder ?? 0,
        isActive: input.isActive ?? true,
      },
    });

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal menambah FAQ:", error);
    return { success: false, error: "Gagal menyimpan FAQ." };
  }
}

export async function updateFAQ(id: string, input: Partial<FAQInput>) {
  try {
    const item = await prisma.fAQ.update({
      where: { id },
      data: {
        ...(input.question !== undefined && { question: input.question }),
        ...(input.questionEn !== undefined && { questionEn: input.questionEn }),
        ...(input.answer !== undefined && { answer: input.answer }),
        ...(input.answerEn !== undefined && { answerEn: input.answerEn }),
        ...(input.page !== undefined && { page: input.page }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true, id: item.id };
  } catch (error) {
    console.error("Gagal memperbarui FAQ:", error);
    return { success: false, error: "Gagal memperbarui FAQ." };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus FAQ:", error);
    return { success: false, error: "Gagal menghapus FAQ." };
  }
}
