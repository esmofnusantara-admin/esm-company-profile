"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

export interface TestimonyInput {
  name: string;
  role?: string;
  quote: string;
  quoteEn?: string;
  photo?: string;
  sortOrder?: number;
  isActive?: boolean;
}

const initialTestimonies = [
  {
    id: "tst-1",
    name: "Jonathan Pratama",
    role: "Alumni Mahasiswa Untirta Serang",
    quote:
      "Di kelompok pemuridan ESM, saya tidak hanya belajar Alkitab secara teoritis, tetapi diajarkan bagaimana membagikan iman dan memuridkan adik-adik tingkat di kampus.",
    quoteEn:
      "In the ESM discipleship group, I didn't just study theology theoretically, but learned how to share my faith and disciple younger students on campus.",
    photo: "/images/avatar-1.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "tst-2",
    name: "Ruth H. Tomasoa",
    role: "Mahasiswi di Ternate, Maluku Utara",
    quote:
      "Asrama binaan ESM di Ternate menjadi rumah kedua bagi saya. Di sini kami belajar berdoa bersama dan dipersiapkan menjadi saksi Kristus di tengah masyarakat.",
    quoteEn:
      "The ESM residential hub in Ternate became my second home. Here we learn to pray together and are prepared to be witnesses of Christ in society.",
    photo: "/images/avatar-2.jpg",
    sortOrder: 2,
    isActive: true,
  },
];

function getMemoryTestimonies(): any[] {
  if (!(globalThis as any).__esmTestimonies) {
    (globalThis as any).__esmTestimonies = [...initialTestimonies];
  }
  return (globalThis as any).__esmTestimonies;
}

export async function getTestimonies() {
  if (isDbKnownOffline()) {
    return getMemoryTestimonies();
  }

  try {
    const items = await prisma.testimony.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    markDbOnline();
    if (items && items.length > 0) {
      (globalThis as any).__esmTestimonies = [...items];
      return items;
    }
    return getMemoryTestimonies();
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil testimoni dari fallback memori.");
    return getMemoryTestimonies();
  }
}

export async function createTestimony(input: TestimonyInput) {
  try {
    if (!input.name || !input.quote) {
      return { success: false, error: "Nama dan kutipan testimoni wajib diisi." };
    }

    const memoryList = getMemoryTestimonies();
    const newItem = {
      id: "tst-" + Date.now(),
      name: input.name,
      role: input.role || null,
      quote: input.quote,
      quoteEn: input.quoteEn || null,
      photo: input.photo || null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryList.push(newItem);

    if (!isDbKnownOffline()) {
      try {
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
        newItem.id = item.id;
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true, id: newItem.id };
  } catch (error) {
    console.error("Gagal menambah testimoni:", error);
    return { success: false, error: "Gagal menyimpan testimoni." };
  }
}

export async function updateTestimony(id: string, input: Partial<TestimonyInput>) {
  try {
    const memoryList = getMemoryTestimonies();
    const idx = memoryList.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryList[idx] = { ...memoryList[idx], ...input, updatedAt: new Date() };
    }

    if (!isDbKnownOffline()) {
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
        markDbOnline();
        return { success: true, id: item.id };
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true, id };
  } catch (error) {
    console.error("Gagal memperbarui testimoni:", error);
    return { success: false, error: "Gagal memperbarui data testimoni." };
  }
}

export async function deleteTestimony(id: string) {
  try {
    const memoryList = getMemoryTestimonies();
    const idx = memoryList.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryList.splice(idx, 1);
    }

    if (!isDbKnownOffline()) {
      try {
        await prisma.testimony.delete({ where: { id } });
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus testimoni:", error);
    return { success: false, error: "Gagal menghapus data testimoni." };
  }
}
