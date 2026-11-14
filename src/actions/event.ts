"use server";

import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

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

// 1. Tambah Event Baru
export async function createEvent(input: EventInput) {
  try {
    if (!input.title || !input.startDate) {
      return { success: false, error: "Judul dan tanggal acara wajib diisi." };
    }

    const baseSlug = generateSlug(input.title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const memoryList = getMemoryEvents();
    const newEvent = {
      id: "evt-" + Date.now(),
      title: input.title,
      slug: uniqueSlug,
      description: input.description || "",
      community: input.community || "ALL",
      location: input.location || null,
      startDate: new Date(input.startDate),
      endDate: input.endDate ? new Date(input.endDate) : null,
      coverImage: input.coverImage || null,
      status: input.status,
      createdAt: new Date(),
    };

    memoryList.push(newEvent);

    if (!isDbKnownOffline()) {
      try {
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
        newEvent.id = event.id;
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true, id: newEvent.id };
  } catch (error) {
    console.error("Gagal membuat event:", error);
    return { success: false, error: "Gagal menyimpan agenda acara." };
  }
}

// 2. Hapus Event
export async function deleteEvent(id: string) {
  try {
    const memoryList = getMemoryEvents();
    const idx = memoryList.findIndex((e) => e.id === id);
    if (idx !== -1) {
      memoryList.splice(idx, 1);
    }

    if (!isDbKnownOffline()) {
      try {
        await prisma.event.delete({
          where: { id },
        });
        markDbOnline();
      } catch (dbError) {
        markDbOffline();
      }
    }

    revalidatePath("/mobilisasi");
    revalidatePath("/admin/event");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus event:", error);
    return { success: false, error: "Gagal menghapus agenda." };
  }
}
