import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

// GET /api/events?community=EXPLORE
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const community = searchParams.get("community");
    const status = searchParams.get("status") || "PUBLISHED";

    const where: any = {};
    if (status) where.status = status;
    if (community && community !== "ALL") where.community = community;

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json({
      success: true,
      total: events.length,
      data: events,
    });
  } catch (error) {
    console.error("API Events GET error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data event" },
      { status: 500 }
    );
  }
}

// POST /api/events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, community, location, startDate, endDate, coverImage, status } =
      body;

    if (!title || !startDate) {
      return NextResponse.json(
        { success: false, error: "Judul dan tanggal event wajib diisi" },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description: description || "",
        community: community || "ALL",
        location: location || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        coverImage: coverImage || null,
        status: status || "PUBLISHED",
      },
    });

    return NextResponse.json(
      { success: true, message: "Event berhasil dibuat", data: event },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Events POST error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat event baru" },
      { status: 500 }
    );
  }
}
