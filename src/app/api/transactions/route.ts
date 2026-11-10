import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/transactions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // PEMASUKAN or PENGELUARAN

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
    console.error("API Transactions GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil log keuangan" },
      { status: 500 }
    );
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
