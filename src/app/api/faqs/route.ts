import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/faqs?page=GENERAL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") as any;

    const where: any = { isActive: true };
    if (page) where.page = page;

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      total: faqs.length,
      data: faqs,
    });
  } catch (error) {
    console.error("API FAQs GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data FAQ" },
      { status: 500 }
    );
  }
}
