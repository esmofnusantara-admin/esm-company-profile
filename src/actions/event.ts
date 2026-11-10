"use server";

import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export interface EventInput {
  title: string;
  description: string;
  community?: "EXPLORE" | "ENCOUNTER" | "CONNECT" | "ALL";
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
}

// 1. Tambah Event Baru
export async function createEvent(input: EventInput) {
  try {
    if (!input.title || !input.startDate) {
      return { success: false, error: "Judul dan tanggal acara wajib diisi." };
    }

    const baseSlug = generateSlug(input.title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const event = await prisma.event.create({
      data: {
        title: input.title,
        slug: uniqueSlug,
        description: input.description || "",
        community: input.community || "ALL",
        location: input.location || null,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
        coverImage: input.coverImage || null,
        status: input.status,
      },
    });

    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true, id: event.id };
  } catch (error) {
    console.error("Gagal membuat event:", error);
    return { success: false, error: "Gagal menyimpan agenda acara." };
  }
}

// 2. Hapus Event
export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id },
    });

    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus event:", error);
    return { success: false, error: "Gagal menghapus agenda." };
  }
}
