"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { saveMemoryDonation, updateMemoryDonationStatus } from "@/lib/donationsFallback";
import { requireAdminSession } from "@/lib/adminSession";

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

    try {
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
    } catch (dbErr) {
      console.warn("DB offline, saving donation to memory fallback:", dbErr);
      const memDonation = saveMemoryDonation({
        donorName: input.donorName,
        donorEmail: input.donorEmail || null,
        donorPhone: input.donorPhone || null,
        amount: input.amount,
        type: input.type,
        message: input.message || null,
        status: "PENDING",
      });

      revalidatePath("/admin/mitra");
      revalidatePath("/admin");

      return { success: true, id: memDonation.id, isMemory: true };
    }
  } catch (error) {
    console.error("Gagal submit donasi:", error);
    return { success: false, error: "Terjadi kesalahan sistem saat memproses donasi." };
  }
}

// 2. Konfirmasi Donasi dari Admin Panel (/admin/mitra)
export async function confirmDonation(id: string) {
  try {
    const session = await requireAdminSession(["SUPER_ADMIN", "FINANCE_ADMIN"]);
    try {
      await prisma.$transaction(async (tx) => {
        const current = await tx.donationRecord.findUnique({ where: { id } });
        if (!current) throw new Error("DONATION_NOT_FOUND");
        if (current.status === "CONFIRMED") return;

        const donation = await tx.donationRecord.update({
          where: { id },
          data: {
            status: "CONFIRMED",
            confirmedAt: new Date(),
            confirmedBy: session.id,
          },
        });

        await tx.financialTransaction.create({
          data: {
            type: "PEMASUKAN",
            amount: donation.amount,
            description: `Donasi Mitra: ${donation.donorName || "Hamba Allah"} (${
              donation.type === "MITRA_BULANAN" ? "Bulanan" : "Sekali Beri"
            })`,
            category: "Donasi Mitra",
            recordedBy: session.id,
          },
        });
      });
    } catch (dbErr) {
      console.error("Gagal mengonfirmasi donasi di database:", dbErr);
      return { success: false, error: "Konfirmasi gagal disimpan ke database." };
    }

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
    await requireAdminSession(["SUPER_ADMIN", "FINANCE_ADMIN"]);
    try {
      await prisma.donationRecord.update({
        where: { id },
        data: {
          status: "CANCELLED",
        },
      });
    } catch (dbErr) {
      console.warn("DB offline, cancelling in memory fallback:", dbErr);
      updateMemoryDonationStatus(id, "CANCELLED");
    }

    revalidatePath("/admin/mitra");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Gagal membatalkan donasi:", error);
    return { success: false, error: "Gagal membatalkan donasi." };
  }
}
