import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { markDbOffline, markDbOnline } from "@/lib/dbStatus";
import { initialFAQs } from "@/lib/faqData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/faqs?page=GENERAL
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") as any;

  try {
    const where: any = { isActive: true };
    if (page) where.page = page;

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    markDbOnline();

    if (faqs.length > 0) {
      return NextResponse.json(
        {
          success: true,
          total: faqs.length,
          data: faqs,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    let result = initialFAQs;
    if (page) result = result.filter((f) => f.page === page);

    return NextResponse.json(
      {
        success: true,
        total: result.length,
        data: result,
        isFallback: true,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    markDbOffline();
    console.warn("Prisma error in /api/faqs, returning fallback FAQs:", error);
    let result = initialFAQs;
    if (page) result = result.filter((f) => f.page === page);

    return NextResponse.json(
      {
        success: true,
        total: result.length,
        data: result,
        isFallback: true,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
