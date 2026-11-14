import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getMemoryArticleBySlug, deleteMemoryArticle } from "@/lib/articlesFallback";

// GET /api/articles/[slug]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (article) {
      return NextResponse.json({ success: true, data: article });
    }

    const fallback = getMemoryArticleBySlug(slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }

    return NextResponse.json(
      { success: false, error: "Artikel tidak ditemukan" },
      { status: 404 }
    );
  } catch (error) {
    const fallback = getMemoryArticleBySlug(slug);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback });
    }
    return NextResponse.json(
      { success: false, error: "Artikel tidak ditemukan" },
      { status: 404 }
    );
  }
}

// DELETE /api/articles/[slug]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await prisma.article.delete({
      where: { slug },
    });
    deleteMemoryArticle(slug);

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dihapus",
    });
  } catch (error) {
    deleteMemoryArticle(slug);
    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dihapus dari memory",
    });
  }
}
