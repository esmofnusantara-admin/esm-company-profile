"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface DonationInput {
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  amount: number;
  type: "SEKALI_BERI" | "MITRA_BULANAN";
  message?: string;
}

// 1. Submit Donasi dari Halaman Publik (/kemitraan)
export async function submitDonation(input: DonationInput) {
  try {
    if (!input.donorName || !input.amount || input.amount < 10000) {
      return { success: false, error: "Nama dan nominal donasi minimal Rp 10.000 wajib diisi." };
    }

    const donation = await prisma.donationRecord.create({
      data: {
        donorName: input.donorName,
        donorEmail: input.donorEmail || null,
        donorPhone: input.donorPhone || null,
        amount: input.amount,
        type: input.type,
        message: input.message || null,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/mitra");
    revalidatePath("/admin");

    return { success: true, id: donation.id };
  } catch (error) {
    console.error("Gagal submit donasi:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat memproses donasi." };
  }
}

// 2. Konfirmasi Donasi dari Admin Panel (/admin/mitra)
export async function confirmDonation(id: string) {
  try {
    const donation = await prisma.donationRecord.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
      },
    });

    // Otomatis catat sebagai Kas Pemasukan
    await prisma.financialTransaction.create({
      data: {
        type: "PEMASUKAN",
        amount: donation.amount,
        description: `Donasi Mitra: ${donation.donorName || "Hamba Allah"} (${
          donation.type === "MITRA_BULANAN" ? "Bulanan" : "Sekali Beri"
        })`,
        category: "Donasi Mitra",
        recordedBy: "admin",
      },
    });

    revalidatePath("/admin/mitra");
    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Gagal konfirmasi donasi:", error);
    return { success: false, error: "Gagal mengonfirmasi donasi." };
  }
}

// 3. Batalkan Donasi dari Admin Panel
export async function cancelDonation(id: string) {
  try {
    await prisma.donationRecord.update({
      where: { id },
      data: {
        status: "CANCELLED",
      },
    });

    revalidatePath("/admin/mitra");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Gagal membatalkan donasi:", error);
    return { success: false, error: "Gagal membatalkan donasi." };
  }
}
