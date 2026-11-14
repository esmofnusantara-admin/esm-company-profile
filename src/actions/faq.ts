"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FAQPage } from "@prisma/client";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

export interface FAQInput {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  page?: FAQPage;
  sortOrder?: number;
  isActive?: boolean;
}

const initialFAQs = [
  {
    id: "faq-1",
    question: "Apa itu Gerakan ESM (Evangelical Student Movement)?",
    questionEn: "What is ESM (Evangelical Student Movement)?",
    answer:
      "ESM adalah gerakan pemuridan dan misi Kristen yang berfokus melahirkan murid Kristus yang berakar kuat dalam Firman Tuhan dan bergerak aktif di ladang misi perintisan, khususnya di Banten dan Ternate.",
    answerEn:
      "ESM is a Christian discipleship and mission movement focused on raising disciples rooted in God's Word and actively serving in pioneering mission fields, particularly in Banten and Ternate.",
    page: FAQPage.GENERAL,
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "faq-2",
    question: "Bagaimana cara bermitra atau mendukung pelayanan ESM?",
    questionEn: "How can I partner with or support ESM ministry?",
    answer:
      "Anda dapat bermitra melalui doa rutin, dukungan dana operasional/beasiswa asrama mahasiswa, atau menjadi sukarelawan mentor pemuridan di Banten dan Maluku Utara.",
    answerEn:
      "You can partner through prayer, financial support for student residences and ministry operations, or volunteering as discipleship mentors in Banten and North Maluku.",
    page: FAQPage.KEMITRAAN,
    sortOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "faq-3",
    question: "Di mana saja fokus ladang pelayanan ESM saat ini?",
    questionEn: "Where are the primary mission fields of ESM currently located?",
    answer:
      "Pelayanan perintisan kami berfokus di Banten (Serang, Cilegon, Rangkasbitung) dan Maluku Utara (Kota Ternate & Halmahera) dengan kelompok pemuridan siswa dan persekutuan mahasiswa.",
    answerEn:
      "Our pioneering ministry focuses on Banten (Serang, Cilegon, Rangkasbitung) and North Maluku (Ternate & Halmahera) through student discipleship groups and university fellowships.",
    page: FAQPage.GENERAL,
    sortOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function getMemoryFAQs(): any[] {
  if (!(globalThis as any).__esmFAQs) {
    (globalThis as any).__esmFAQs = [...initialFAQs];
  }
  return (globalThis as any).__esmFAQs;
}

export async function getFAQs(page?: FAQPage) {
  if (isDbKnownOffline()) {
    let items = getMemoryFAQs();
    if (page) items = items.filter((f) => f.page === page);
    return items;
  }

  try {
    const items = await prisma.fAQ.findMany({
      where: page ? { page } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    markDbOnline();
    if (items && items.length > 0) {
      return items;
    }
    let fallback = getMemoryFAQs();
    if (page) fallback = fallback.filter((f) => f.page === page);
    return fallback;
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil FAQ dari fallback memori.");
    let items = getMemoryFAQs();
    if (page) items = items.filter((f) => f.page === page);
    return items;
  }
}

export async function createFAQ(input: FAQInput) {
  try {
    if (!input.question || !input.answer) {
      return { success: false, error: "Pertanyaan dan jawaban wajib diisi." };
    }

    const memoryList = getMemoryFAQs();
    const newItem = {
      id: "faq-" + Date.now(),
      question: input.question,
      questionEn: input.questionEn || null,
      answer: input.answer,
      answerEn: input.answerEn || null,
      page: input.page || FAQPage.GENERAL,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryList.push(newItem);

    if (!isDbKnownOffline()) {
      try {
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
        newItem.id = item.id;
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true, id: newItem.id };
  } catch (error) {
    console.error("Gagal menambah FAQ:", error);
    return { success: false, error: "Gagal menyimpan FAQ." };
  }
}

export async function updateFAQ(id: string, input: Partial<FAQInput>) {
  try {
    const memoryList = getMemoryFAQs();
    const idx = memoryList.findIndex((f) => f.id === id);
    if (idx !== -1) {
      memoryList[idx] = { ...memoryList[idx], ...input, updatedAt: new Date() };
    }

    if (!isDbKnownOffline()) {
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
        markDbOnline();
        return { success: true, id: item.id };
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true, id };
  } catch (error) {
    console.error("Gagal memperbarui FAQ:", error);
    return { success: false, error: "Gagal memperbarui FAQ." };
  }
}

export async function deleteFAQ(id: string) {
  try {
    const memoryList = getMemoryFAQs();
    const idx = memoryList.findIndex((f) => f.id === id);
    if (idx !== -1) {
      memoryList.splice(idx, 1);
    }

    if (!isDbKnownOffline()) {
      try {
        await prisma.fAQ.delete({ where: { id } });
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/faq");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus FAQ:", error);
    return { success: false, error: "Gagal menghapus FAQ." };
  }
}
