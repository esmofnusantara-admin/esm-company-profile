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

import { requireAdminSession } from "@/lib/adminSession";

// 1. Catat Transaksi Baru
export async function createTransaction(input: TransactionInput) {
  try {
    const session = await requireAdminSession(["SUPER_ADMIN", "FINANCE_ADMIN"]);

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
        recordedBy: session.name || session.email || session.id,
      },
    });

    revalidatePath("/admin/keuangan");
    revalidatePath("/admin");

    return { success: true, id: transaction.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    console.error("Gagal mencatat transaksi:", error);
    return { success: false, error: "Gagal menyimpan transaksi keuangan." };
  }
}
