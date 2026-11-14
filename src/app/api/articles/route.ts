import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { getMemoryArticles, saveMemoryArticle, FallbackArticle } from "@/lib/articlesFallback";

// GET /api/articles?category=DEVOTIONAL&status=PUBLISHED
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status") || "PUBLISHED";
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const where: any = {};
    if (status !== "ALL") where.status = status;
    if (category) where.category = category;

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        excerpt: true,
        excerptEn: true,
        content: true,
        contentEn: true,
        category: true,
        coverImage: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    // Sync to memory
    for (const art of articles) {
      saveMemoryArticle(art as unknown as FallbackArticle);
    }

    return NextResponse.json({
      success: true,
      total: articles.length,
      data: articles,
    });
  } catch (error) {
    console.warn("[WARN] PostgreSQL offline saat mengambil artikel, menggunakan fallback memory:", error);
    const fallbackData = getMemoryArticles(status, category || undefined).slice(0, limit);
    return NextResponse.json({
      success: true,
      total: fallbackData.length,
      data: fallbackData,
      isFallback: true,
    });
  }
}

// POST /api/articles (Bilingual ID & EN)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      titleEn,
      excerpt,
      excerptEn,
      content,
      contentEn,
      category,
      coverImage,
      status,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Judul dan konten artikel wajib diisi" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    try {
      const article = await prisma.article.create({
        data: {
          title,
          titleEn: titleEn || null,
          slug,
          excerpt: excerpt || content.slice(0, 160),
          excerptEn: excerptEn || null,
          content,
          contentEn: contentEn || null,
          category: category || "REFLEKSI",
          coverImage: coverImage || null,
          status: status || "PUBLISHED",
          publishedAt: status === "PUBLISHED" ? new Date() : null,
        },
      });

      saveMemoryArticle(article as unknown as FallbackArticle);

      return NextResponse.json(
        { success: true, message: "Artikel berhasil dibuat", data: article },
        { status: 201 }
      );
    } catch (dbError) {
      console.warn("[WARN] PostgreSQL offline, artikel disimpan di in-memory store.");
      const fallbackArticle: FallbackArticle = {
        id: `art-${Date.now()}`,
        title,
        titleEn: titleEn || null,
        slug,
        excerpt: excerpt || content.slice(0, 160),
        excerptEn: excerptEn || null,
        content,
        contentEn: contentEn || null,
        category: category || "REFLEKSI",
        coverImage: coverImage || null,
        status: status || "PUBLISHED",
        publishedAt: status === "PUBLISHED" ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
      };
      saveMemoryArticle(fallbackArticle);

      return NextResponse.json(
        {
          success: true,
          message: "Artikel berhasil dibuat (tersimpan di memory)",
          data: fallbackArticle,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("API Articles POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat artikel baru" },
      { status: 500 }
    );
  }
}
