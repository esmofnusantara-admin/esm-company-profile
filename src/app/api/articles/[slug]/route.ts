import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/articles/[slug]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("API Article Detail error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil detail artikel" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await prisma.article.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: "Artikel berhasil dihapus",
    });
  } catch (error) {
    console.error("API Article Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
