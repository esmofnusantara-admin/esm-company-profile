"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FAQPage } from "@prisma/client";
import { markDbOffline, markDbOnline } from "@/lib/dbStatus";

import { initialFAQs, type FAQInput } from "@/lib/faqData";

export type { FAQInput };

function getMemoryFAQs(): any[] {
  if (!(globalThis as any).__esmFAQs) {
    (globalThis as any).__esmFAQs = [...initialFAQs];
  }
  return (globalThis as any).__esmFAQs;
}

export async function getFAQs(page?: FAQPage) {
  try {
    const items = await prisma.fAQ.findMany({
      where: page ? { page } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    markDbOnline();

    if (items && items.length > 0) {
      return items;
    }

    // Auto-seed initial FAQs to database if table is empty
    if (!page) {
      try {
        const count = await prisma.fAQ.count();
        if (count === 0) {
          for (const f of initialFAQs) {
            await prisma.fAQ.create({
              data: {
                question: f.question,
                questionEn: f.questionEn,
                answer: f.answer,
                answerEn: f.answerEn,
                page: f.page,
                sortOrder: f.sortOrder,
                isActive: f.isActive,
              },
            });
          }
          const seeded = await prisma.fAQ.findMany({
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          });
          return seeded;
        }
      } catch (seedErr) {
        console.warn("[actions/faq] Auto-seed error:", seedErr);
      }
    }

    let fallback = getMemoryFAQs();
    if (page) fallback = fallback.filter((f) => f.page === page);
    return fallback;
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil FAQ dari fallback memori:", error);
    let items = getMemoryFAQs();
    if (page) items = items.filter((f) => f.page === page);
    return items;
  }
}

import { requireAdminSession } from "@/lib/adminSession";

export async function createFAQ(input: FAQInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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
    markDbOnline();

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/pelayanan");
    revalidatePath("/admin/konten/faq");
    revalidatePath("/admin/konten/beranda");
    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menambah FAQ:", error);
    return { success: false, error: "Gagal menyimpan FAQ ke database." };
  }
}

export async function updateFAQ(id: string, input: Partial<FAQInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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
    markDbOnline();

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/pelayanan");
    revalidatePath("/admin/konten/faq");
    revalidatePath("/admin/konten/beranda");
    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal memperbarui FAQ:", error);
    return { success: false, error: "Gagal memperbarui FAQ di database." };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.fAQ.delete({ where: { id } });
    markDbOnline();

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/pelayanan");
    revalidatePath("/admin/konten/faq");
    revalidatePath("/admin/konten/beranda");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus FAQ:", error);
    return { success: false, error: "Gagal menghapus FAQ dari database." };
  }
}
