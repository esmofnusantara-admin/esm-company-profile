"use server";

import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

export interface EventInput {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  community?: "EXPLORE" | "ENCOUNTER" | "CONNECT" | "ALL";
  location?: string;
  locationEn?: string;
  startDate: Date | string;
  endDate?: Date | string;
  coverImage?: string;
  status: "DRAFT" | "PUBLISHED";
}

const initialEvents = [
  {
    id: "evt-1",
    title: "Retreat Akbar Pemuda & Mahasiswa Banten",
    slug: "retreat-akbar-pemuda-dan-mahasiswa-banten",
    description: "Pertemuan akbar pembinaan rohani dan peneguhan panggilan hidup bagi mahasiswa di Serang & Cilegon.",
    community: "EXPLORE",
    location: "Anyer, Banten",
    startDate: new Date("2026-11-20T09:00:00Z"),
    endDate: new Date("2026-11-22T15:00:00Z"),
    coverImage: "/images/hero-1.jpg",
    status: "PUBLISHED",
  },
  {
    id: "evt-2",
    title: "Workshop Misi Lapangan Ternate 2026",
    slug: "workshop-misi-lapangan-ternate-2026",
    description: "Pelatihan pembina persekutuan dan strategi perintisan kelompok pemuridan di Maluku Utara.",
    community: "ENCOUNTER",
    location: "Asrama Binaan ESM, Ternate",
    startDate: new Date("2026-12-05T10:00:00Z"),
    endDate: new Date("2026-12-07T17:00:00Z"),
    coverImage: "/images/hero-2.jpg",
    status: "PUBLISHED",
  },
];

function getMemoryEvents(): any[] {
  if (!(globalThis as any).__esmEvents) {
    (globalThis as any).__esmEvents = [...initialEvents];
  }
  return (globalThis as any).__esmEvents;
}

export async function getEvents(community?: string) {
  if (isDbKnownOffline()) {
    let items = getMemoryEvents();
    if (community && community !== "ALL") items = items.filter((e) => e.community === community);
    return items;
  }

  try {
    const items = await prisma.event.findMany({
      where: community && community !== "ALL" ? { community: community as any } : undefined,
      orderBy: { startDate: "asc" },
    });
    markDbOnline();
    if (items && items.length > 0) return items;
    let fallback = getMemoryEvents();
    if (community && community !== "ALL") fallback = fallback.filter((e) => e.community === community);
    return fallback;
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil agenda dari fallback memori.");
    let items = getMemoryEvents();
    if (community && community !== "ALL") items = items.filter((e) => e.community === community);
    return items;
  }
}

import { requireAdminSession } from "@/lib/adminSession";

// 1. Tambah Event Baru
export async function createEvent(input: EventInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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
        community: (input.community as any) || "ALL",
        location: input.location || null,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
        coverImage: input.coverImage || null,
        status: input.status as any,
      },
    });

    markDbOnline();
    revalidatePath("/agenda");
    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true, id: event.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal membuat event:", error);
    return { success: false, error: "Gagal menyimpan agenda acara ke database." };
  }
}

// 2. Perbarui Event (Edit)
export async function updateEvent(id: string, input: Partial<EventInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    if (!input.title || !input.startDate) {
      return { success: false, error: "Judul dan tanggal acara wajib diisi." };
    }

    if (isDbKnownOffline()) {
      const list = getMemoryEvents();
      const idx = list.findIndex((e) => e.id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...input,
          startDate: new Date(input.startDate),
          endDate: input.endDate ? new Date(input.endDate) : list[idx].endDate,
        };
      }
      return { success: true, id };
    }

    const data: any = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.titleEn !== undefined) data.titleEn = input.titleEn || null;
    if (input.description !== undefined) data.description = input.description || "";
    if (input.descriptionEn !== undefined) data.descriptionEn = input.descriptionEn || null;
    if (input.community !== undefined) data.community = input.community || "ALL";
    if (input.location !== undefined) data.location = input.location || null;
    if (input.locationEn !== undefined) data.locationEn = input.locationEn || null;
    if (input.startDate !== undefined) data.startDate = new Date(input.startDate);
    if (input.endDate !== undefined) data.endDate = input.endDate ? new Date(input.endDate) : null;
    if (input.coverImage !== undefined) data.coverImage = input.coverImage || null;
    if (input.status !== undefined) data.status = input.status;

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    markDbOnline();
    revalidatePath("/agenda");
    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true, id: event.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal mengupdate event:", error);
    return { success: false, error: "Gagal memperbarui agenda acara di database." };
  }
}

// 3. Hapus Event
export async function deleteEvent(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.event.delete({
      where: { id },
    });

    markDbOnline();
    revalidatePath("/agenda");
    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus event:", error);
    return { success: false, error: "Gagal menghapus agenda dari database." };
  }
}
