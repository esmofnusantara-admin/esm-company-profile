"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface UserPrayerInput {
  name: string;
  email?: string;
  region: string;
  prayerRequest: string;
  isPrivate?: boolean;
}

let inMemoryUserPrayers: any[] = [
  {
    id: "u-prayer-1",
    name: "Samuel H.",
    email: "samuel@example.com",
    region: "Banten",
    prayerRequest:
      "Mohon dukungan doa bagi adik-adik siswa persekutuan di Serang yang sedang mempersiapkan ujian akhir dan regenerasi pengurus KTB.",
    isPrivate: false,
    status: "APPROVED",
    createdAt: new Date("2026-11-04T08:00:00Z"),
  },
  {
    id: "u-prayer-2",
    name: "Hamba Tuhan (Anonim)",
    email: null,
    region: "Ternate",
    prayerRequest:
      "Pergumulan kesehatan keluarga di Ternate dan perlindungan rohani dalam pelayanan anak-anak pulau.",
    isPrivate: true,
    status: "PENDING",
    createdAt: new Date("2026-11-09T16:15:00Z"),
  },
  {
    id: "u-prayer-3",
    name: "Debora Siregar",
    email: "debora@example.com",
    region: "Jabodetabek",
    prayerRequest:
      "Berdoa untuk panggilan misi setelah lulus kuliah tahun ini, agar Tuhan beri kejelasan ladang pelayanan.",
    isPrivate: false,
    status: "PENDING",
    createdAt: new Date("2026-11-12T19:30:00Z"),
  },
];

export async function submitUserPrayer(input: UserPrayerInput) {
  try {
    if (!input.prayerRequest) {
      return { success: false, error: "Isi pokok doa wajib diisi." };
    }

    try {
      const created = await prisma.userPrayer.create({
        data: {
          name: input.name?.trim() || "Anonim",
          email: input.email?.trim() || null,
          region: input.region || "Banten",
          prayerRequest: input.prayerRequest.trim(),
          isPrivate: input.isPrivate ?? false,
          status: "PENDING",
        },
      });
      revalidatePath("/admin/doa");
      revalidatePath("/doa");
      return { success: true, id: created.id };
    } catch (dbErr) {
      console.warn("Database offline, saving user prayer to memory cache:", dbErr);
      const newPrayer = {
        id: "mem-prayer-" + Date.now(),
        name: input.name?.trim() || "Anonim",
        email: input.email?.trim() || null,
        region: input.region || "Banten",
        prayerRequest: input.prayerRequest.trim(),
        isPrivate: input.isPrivate ?? false,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryUserPrayers.unshift(newPrayer);
      return { success: true, id: newPrayer.id, isMemory: true };
    }
  } catch (error) {
    console.error("Gagal mengirim pokok doa:", error);
    return { success: false, error: "Gagal menyimpan pokok doa." };
  }
}

import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

export async function getUserPrayers() {
  if (isDbKnownOffline()) {
    return inMemoryUserPrayers;
  }
  try {
    const items = await prisma.userPrayer.findMany({
      orderBy: { createdAt: "desc" },
    });
    markDbOnline();
    return items;
  } catch (dbErr) {
    markDbOffline();
    console.warn("Database offline, returning memory user prayers");
    return inMemoryUserPrayers;
  }
}

export async function getApprovedPublicPrayers() {
  if (isDbKnownOffline()) {
    return inMemoryUserPrayers.filter((p) => p.status === "APPROVED" && !p.isPrivate);
  }
  try {
    const items = await prisma.userPrayer.findMany({
      where: {
        status: "APPROVED",
        isPrivate: false,
      },
      orderBy: { createdAt: "desc" },
    });
    markDbOnline();
    return items;
  } catch (dbErr) {
    markDbOffline();
    return inMemoryUserPrayers.filter((p) => p.status === "APPROVED" && !p.isPrivate);
  }
}

export async function updateUserPrayerStatus(id: string, status: "PENDING" | "APPROVED" | "REJECTED") {
  try {
    try {
      await prisma.userPrayer.update({
        where: { id },
        data: { status },
      });
      revalidatePath("/admin/doa");
      revalidatePath("/doa");
      return { success: true };
    } catch (dbErr) {
      const item = inMemoryUserPrayers.find((p) => p.id === id);
      if (item) item.status = status;
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal mengubah status doa:", error);
    return { success: false, error: "Gagal memperbarui status doa." };
  }
}

export async function deleteUserPrayer(id: string) {
  try {
    try {
      await prisma.userPrayer.delete({
        where: { id },
      });
      revalidatePath("/admin/doa");
      revalidatePath("/doa");
      return { success: true };
    } catch (dbErr) {
      inMemoryUserPrayers = inMemoryUserPrayers.filter((p) => p.id !== id);
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal menghapus doa:", error);
    return { success: false, error: "Gagal menghapus data permohonan doa." };
  }
}
