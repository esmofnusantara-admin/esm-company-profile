"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

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

const initialPrayers = [
  {
    id: "pry-1",
    month: "November 2026",
    title: "Perintisan Kelompok Pemuridan Siswa di Banten",
    titleEn: "Student Discipleship Pioneering in Banten",
    description: "Doakan pembina dan siswa SMP-SMA di Serang dan Cilegon agar terus rindu mendalami Firman Tuhan.",
    descriptionEn: "Pray for mentors and students in Serang and Cilegon to grow in spiritual hunger for God's Word.",
    category: "PELAYANAN",
    isAnswered: false,
    sortOrder: 1,
    createdAt: new Date(),
  },
  {
    id: "pry-2",
    month: "November 2026",
    title: "Kebutuhan Operasional Asrama Mahasiswa di Ternate",
    titleEn: "Operational Support for Ternate Student Center",
    description: "Doakan kecukupan biaya sewa dan kebutuhan pangan adik-adik asrama binaan di Kota Rempah.",
    descriptionEn: "Pray for provision of rent and living necessities for students residing in the Ternate discipleship center.",
    category: "MISI",
    isAnswered: false,
    sortOrder: 2,
    createdAt: new Date(),
  },
];

function getMemoryPrayers(): any[] {
  if (!(globalThis as any).__esmPrayers) {
    (globalThis as any).__esmPrayers = [...initialPrayers];
  }
  return (globalThis as any).__esmPrayers;
}

export async function getPrayerRequests(month?: string) {
  if (isDbKnownOffline()) {
    let items = getMemoryPrayers();
    if (month) items = items.filter((p) => p.month === month);
    return items;
  }

  try {
    const items = await prisma.prayerRequest.findMany({
      where: month ? { month } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    markDbOnline();
    if (items && items.length > 0) return items;
    let fallback = getMemoryPrayers();
    if (month) fallback = fallback.filter((p) => p.month === month);
    return fallback;
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil pokok doa dari fallback memori.");
    let items = getMemoryPrayers();
    if (month) items = items.filter((p) => p.month === month);
    return items;
  }
}

import { requireAdminSession } from "@/lib/adminSession";

export async function createPrayerRequest(input: PrayerRequestInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/doa");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    revalidatePath("/");

    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menambah pokok doa:", error);
    return { success: false, error: "Gagal menyimpan pokok doa ke database." };
  }
}

export async function updatePrayerRequest(id: string, input: Partial<PrayerRequestInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/doa");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    revalidatePath("/");

    return { success: true, id: item.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal memperbarui pokok doa:", error);
    return { success: false, error: "Gagal memperbarui pokok doa di database." };
  }
}

export async function deletePrayerRequest(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.prayerRequest.delete({ where: { id } });

    markDbOnline();
    revalidatePath("/doa");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/doa");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus pokok doa:", error);
    return { success: false, error: "Gagal menghapus pokok doa dari database." };
  }
}
