import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/bulletins
export async function GET() {
  try {
    const bulletins = await prisma.bulletin.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      total: bulletins.length,
      data: bulletins,
    });
  } catch (error) {
    console.error("API Bulletins GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data buletin" },
      { status: 500 }
    );
  }
}

// POST /api/bulletins
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, fileUrl, edition } = body;

    if (!title || !fileUrl) {
      return NextResponse.json(
        { success: false, error: "Judul dan file URL buletin wajib diisi" },
        { status: 400 }
      );
    }

    const bulletin = await prisma.bulletin.create({
      data: {
        title,
        description: description || null,
        fileUrl,
        edition: edition || "Edisi Terbaru",
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Buletin berhasil diterbitkan",
        data: bulletin,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Bulletins POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menerbitkan buletin" },
      { status: 500 }
    );
  }
}
