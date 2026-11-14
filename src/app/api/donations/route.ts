import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getMemoryDonations, saveMemoryDonation } from "@/lib/donationsFallback";

// GET /api/donations?status=CONFIRMED
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const where: any = {};
    if (status && status !== "ALL") where.status = status;

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
    console.warn("Prisma offline or timeout, returning memory donations:", error);
    const fallbackData = getMemoryDonations(status);
    return NextResponse.json({
      success: true,
      total: fallbackData.length,
      data: fallbackData,
      isFallback: true,
    });
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

    try {
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

      return NextResponse.json({
        success: true,
        data: donation,
      });
    } catch (dbErr) {
      console.warn("DB offline, saving donation to memory fallback:", dbErr);
      const memDonation = saveMemoryDonation({
        donorName,
        donorEmail: donorEmail || null,
        donorPhone: donorPhone || null,
        amount: parsedAmount,
        type: type || "SEKALI_BERI",
        message: message || null,
        status: "PENDING",
      });

      return NextResponse.json({
        success: true,
        data: memDonation,
        isFallback: true,
      });
    }
  } catch (error) {
    console.error("API Donations POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses donasi." },
      { status: 500 }
    );
  }
}
