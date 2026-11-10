import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/donations?status=CONFIRMED
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) where.status = status;

    const donations = await prisma.donationRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      total: donations.length,
      data: donations,
    });
  } catch (error) {
    console.error("API Donations GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data donasi" },
      { status: 500 }
    );
  }
}

// POST /api/donations (Submit donasi dari form publik)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, donorEmail, donorPhone, amount, type, message } = body;

    const parsedAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    if (!donorName || !parsedAmount || parsedAmount < 10000) {
      return NextResponse.json(
        { success: false, error: "Nama dan nominal donasi minimal Rp 10.000 wajib diisi" },
        { status: 400 }
      );
    }

    const donation = await prisma.donationRecord.create({
      data: {
        donorName,
        donorEmail: donorEmail || null,
        donorPhone: donorPhone || null,
        amount: parsedAmount,
        type: type || "SEKALI_BERI",
        message: message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Komitmen donasi berhasil dicatat",
        data: donation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Donations POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan donasi" },
      { status: 500 }
    );
  }
}
