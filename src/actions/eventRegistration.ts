"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface EventRegistrationInput {
  eventId?: string;
  eventTitle: string;
  fullName: string;
  phone: string;
  communityRole: string;
  city?: string;
  notes?: string;
}

let inMemoryEventRegistrations: any[] = [
  {
    id: "reg-1",
    eventTitle: "Explore Youth Leadership Camp 2026",
    fullName: "Yohanes Silaban",
    phone: "081234567891",
    communityRole: "Siswa SMA",
    city: "Serang",
    notes: "Sudah diizinkan orang tua",
    status: "CONFIRMED",
    createdAt: new Date("2026-11-02T09:00:00Z"),
  },
  {
    id: "reg-2",
    eventTitle: "Explore Youth Leadership Camp 2026",
    fullName: "Ruth Pasaribu",
    phone: "081987654321",
    communityRole: "Siswa SMA",
    city: "Cilegon",
    notes: "Ingin ikut pembinaan kepemimpinan",
    status: "PENDING",
    createdAt: new Date("2026-11-08T11:20:00Z"),
  },
];

export async function submitEventRegistration(input: EventRegistrationInput) {
  try {
    if (!input.fullName || !input.phone || !input.eventTitle) {
      return { success: false, error: "Nama lengkap dan nomor WhatsApp wajib diisi." };
    }

    try {
      const reg = await prisma.eventRegistration.create({
        data: {
          eventId: input.eventId || null,
          eventTitle: input.eventTitle,
          fullName: input.fullName.trim(),
          phone: input.phone.trim(),
          communityRole: input.communityRole || "Siswa",
          city: input.city?.trim() || null,
          notes: input.notes?.trim() || null,
          status: "PENDING",
        },
      });
      revalidatePath("/admin/event");
      return { success: true, id: reg.id };
    } catch (dbErr) {
      console.warn("Database offline, saving event registration to memory cache:", dbErr);
      const newReg = {
        id: "mem-reg-" + Date.now(),
        ...input,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryEventRegistrations.unshift(newReg);
      return { success: true, id: newReg.id, isMemory: true };
    }
  } catch (error) {
    console.error("Gagal mendaftar acara:", error);
    return { success: false, error: "Gagal menyimpan pendaftaran acara." };
  }
}

export async function getEventRegistrations() {
  try {
    return await prisma.eventRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (dbErr) {
    console.warn("Database offline, returning memory event registrations");
    return inMemoryEventRegistrations;
  }
}

export async function updateEventRegistrationStatus(id: string, status: string) {
  try {
    try {
      await prisma.eventRegistration.update({
        where: { id },
        data: { status },
      });
      revalidatePath("/admin/event");
      return { success: true };
    } catch (dbErr) {
      const item = inMemoryEventRegistrations.find((r) => r.id === id);
      if (item) item.status = status;
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal update status:", error);
    return { success: false, error: "Gagal mengupdate status pendaftar." };
  }
}

export async function deleteEventRegistration(id: string) {
  try {
    try {
      await prisma.eventRegistration.delete({
        where: { id },
      });
      revalidatePath("/admin/event");
      return { success: true };
    } catch (dbErr) {
      inMemoryEventRegistrations = inMemoryEventRegistrations.filter((r) => r.id !== id);
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal menghapus registrasi:", error);
    return { success: false, error: "Gagal menghapus data pendaftar." };
  }
}
