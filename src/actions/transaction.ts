"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface TransactionInput {
  type: "PEMASUKAN" | "PENGELUARAN";
  amount: number;
  description: string;
  category?: string;
  date?: Date | string;
  notes?: string;
}

// 1. Catat Transaksi Baru
export async function createTransaction(input: TransactionInput) {
  try {
    if (!input.amount || input.amount <= 0 || !input.description) {
      return { success: false, error: "Nominal dan deskripsi transaksi wajib diisi." };
    }

    const transaction = await prisma.financialTransaction.create({
      data: {
        type: input.type,
        amount: input.amount,
        description: input.description,
        category: input.category || "Operasional",
        date: input.date ? new Date(input.date) : new Date(),
        notes: input.notes || null,
        recordedBy: "admin",
      },
    });

    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");

    return { success: true, id: transaction.id };
  } catch (error) {
    console.error("Gagal mencatat transaksi:", error);
    return { success: false, error: "Gagal menyimpan transaksi keuangan." };
  }
}
