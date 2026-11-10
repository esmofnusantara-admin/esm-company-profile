import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/articles?category=DEVOTIONAL&status=PUBLISHED
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "PUBLISHED";
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        coverImage: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      total: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error("API Articles GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data artikel" },
      { status: 500 }
    );
  }
}

// POST /api/articles
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, coverImage, status } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Judul dan konten artikel wajib diisi" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt: excerpt || content.slice(0, 160),
        content,
        category: category || "REFLEKSI",
        coverImage: coverImage || null,
        status: status || "PUBLISHED",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Artikel berhasil dibuat", data: article },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Articles POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat artikel baru" },
      { status: 500 }
    );
  }
}
