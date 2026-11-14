import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getMemoryBulletins } from "@/lib/bulletinsFallback";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

// GET /api/bulletins
export async function GET() {
  if (isDbKnownOffline()) {
    const memBulletins = getMemoryBulletins().filter((b) => b.status === "PUBLISHED");
    return NextResponse.json({
      success: true,
      total: memBulletins.length,
      data: memBulletins,
      isFallback: true,
    });
  }

  try {
    const bulletins = await prisma.bulletin.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    markDbOnline();
    return NextResponse.json({
      success: true,
      total: bulletins.length,
      data: bulletins,
    });
  } catch (error) {
    markDbOffline();
    console.warn("Prisma offline in /api/bulletins, using fallback memory bulletins");
    const memBulletins = getMemoryBulletins().filter((b) => b.status === "PUBLISHED");
    return NextResponse.json({
      success: true,
      total: memBulletins.length,
      data: memBulletins,
      isFallback: true,
    });
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

    const memoryList = getMemoryBulletins();
    const newItem = {
      id: "blt-" + Date.now(),
      title,
      description: description || null,
      fileUrl,
      edition: edition || "Edisi Terbaru",
      status: "PUBLISHED",
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryList.unshift(newItem);

    if (!isDbKnownOffline()) {
      try {
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
        newItem.id = bulletin.id;
        markDbOnline();
      } catch (dbErr) {
        markDbOffline();
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Buletin berhasil diterbitkan",
        data: newItem,
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
