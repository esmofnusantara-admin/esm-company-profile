import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const fallbackTransactions = [
  {
    id: "tx-1",
    type: "PEMASUKAN",
    amount: 5000000,
    category: "Donasi Mitra Bulanan",
    description: "Dukungan rutin mitra alumni untuk operasional pos pelayanan Banten",
    date: new Date("2026-11-01T10:00:00Z"),
    recordedBy: "admin",
    createdAt: new Date("2026-11-01T10:00:00Z"),
  },
  {
    id: "tx-2",
    type: "PENGELUARAN",
    amount: 1500000,
    category: "Operasional Lapangan",
    description: "Pengadaan bahan modul PA dan transport tim pembina kampus Ternate",
    date: new Date("2026-11-05T14:00:00Z"),
    recordedBy: "admin",
    createdAt: new Date("2026-11-05T14:00:00Z"),
  },
];

// GET /api/transactions
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // PEMASUKAN or PENGELUARAN

  try {
    const where: any = {};
    if (type) where.type = type;

    const transactions = await prisma.financialTransaction.findMany({
      where,
      orderBy: { date: "desc" },
    });

    // Hitung total saldo
    const totalPemasukan = transactions
      .filter((t) => t.type === "PEMASUKAN")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalPengeluaran = transactions
      .filter((t) => t.type === "PENGELUARAN")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const saldoBersih = totalPemasukan - totalPengeluaran;

    return NextResponse.json({
      success: true,
      summary: {
        totalPemasukan,
        totalPengeluaran,
        saldoBersih,
      },
      data: transactions,
    });
  } catch (error) {
    console.warn("Prisma offline or timeout in /api/transactions, using fallbackTransactions:", error);
    let txs = fallbackTransactions;
    if (type) txs = txs.filter((t) => t.type === type);

    const totalPemasukan = txs
      .filter((t) => t.type === "PEMASUKAN")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const totalPengeluaran = txs
      .filter((t) => t.type === "PENGELUARAN")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    return NextResponse.json({
      success: true,
      summary: {
        totalPemasukan,
        totalPengeluaran,
        saldoBersih: totalPemasukan - totalPengeluaran,
      },
      data: txs,
      isFallback: true,
    });
  }
}

// POST /api/transactions (Catat kas masuk/keluar)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, amount, description, category, date, notes } = body;

    const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    if (!type || !parsedAmount || !description) {
      return NextResponse.json(
        { success: false, error: "Tipe, nominal, dan deskripsi transaksi wajib diisi" },
        { status: 400 }
      );
    }

    const transaction = await prisma.financialTransaction.create({
      data: {
        type,
        amount: parsedAmount,
        description,
        category: category || "Operasional",
        date: date ? new Date(date) : new Date(),
        notes: notes || null,
        recordedBy: "admin",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transaksi keuangan berhasil dicatat",
        data: transaction,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Transactions POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mencatat transaksi" },
      { status: 500 }
    );
  }
}
