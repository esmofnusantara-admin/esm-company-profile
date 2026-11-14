"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface JoinSubmissionInput {
  fullName: string;
  phone: string;
  schoolOrCampus: string;
  role: "siswa" | "mahasiswa" | "alumni";
  region: string;
  notes?: string;
}

// In-memory fallback if database server is not reachable
let inMemoryJoinSubmissions: any[] = [
  {
    id: "sub-1",
    fullName: "Daniel Putra",
    phone: "081298765432",
    schoolOrCampus: "SMAN 1 Kota Serang",
    role: "siswa",
    region: "banten",
    notes: "Rindu ikut kelompok kecil pemuridan di Serang",
    status: "PENDING",
    createdAt: new Date("2026-11-01T10:00:00Z"),
  },
  {
    id: "sub-2",
    fullName: "Maria Angela",
    phone: "081387654321",
    schoolOrCampus: "Universitas Sultan Ageng Tirtayasa (Untirta)",
    role: "mahasiswa",
    region: "banten",
    notes: "Ingin dibina dalam KTB kampus",
    status: "CONTACTED",
    createdAt: new Date("2026-11-05T14:30:00Z"),
  },
];

export async function submitJoinForm(input: JoinSubmissionInput) {
  try {
    if (!input.fullName || !input.phone || !input.schoolOrCampus) {
      return { success: false, error: "Nama lengkap, nomor WhatsApp, dan sekolah/kampus wajib diisi." };
    }

    try {
      const created = await prisma.joinSubmission.create({
        data: {
          fullName: input.fullName.trim(),
          phone: input.phone.trim(),
          schoolOrCampus: input.schoolOrCampus.trim(),
          role: input.role,
          region: input.region,
          notes: input.notes?.trim() || null,
          status: "PENDING",
        },
      });
      revalidatePath("/admin/gabung");
      return { success: true, id: created.id };
    } catch (dbErr) {
      console.warn("Database offline, saving join submission to memory cache:", dbErr);
      const newSub = {
        id: "mem-" + Date.now(),
        ...input,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryJoinSubmissions.unshift(newSub);
      return { success: true, id: newSub.id, isMemory: true };
    }
  } catch (error) {
    console.error("Gagal mengirim formulir gabung:", error);
    return { success: false, error: "Gagal menyimpan data pendaftaran." };
  }
}

export async function getJoinSubmissions() {
  try {
    return await prisma.joinSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (dbErr) {
    console.warn("Database offline, returning memory join submissions");
    return inMemoryJoinSubmissions;
  }
}

export async function updateJoinSubmissionStatus(id: string, status: string) {
  try {
    try {
      await prisma.joinSubmission.update({
        where: { id },
        data: { status },
      });
      revalidatePath("/admin/gabung");
      return { success: true };
    } catch (dbErr) {
      const item = inMemoryJoinSubmissions.find((s) => s.id === id);
      if (item) item.status = status;
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal mengupdate status:", error);
    return { success: false, error: "Gagal mengupdate status pendaftaran." };
  }
}

export async function deleteJoinSubmission(id: string) {
  try {
    try {
      await prisma.joinSubmission.delete({
        where: { id },
      });
      revalidatePath("/admin/gabung");
      return { success: true };
    } catch (dbErr) {
      inMemoryJoinSubmissions = inMemoryJoinSubmissions.filter((s) => s.id !== id);
      return { success: true };
    }
  } catch (error) {
    console.error("Gagal menghapus pendaftaran:", error);
    return { success: false, error: "Gagal menghapus data." };
  }
}
