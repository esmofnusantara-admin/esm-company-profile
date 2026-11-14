import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSlug } from "@/lib/utils";

const fallbackEvents = [
  {
    id: "evt-1",
    title: "Youth Mission Camp: Berakar & Berbuah di Tanah Jawara",
    titleEn: "Youth Mission Camp: Rooted & Fruitful in Banten",
    slug: "youth-mission-camp-banten-2026",
    description: "Retret pembinaan siswa SMA se-Banten untuk memperdalam dasar iman dan kepemimpinan Kristen.",
    descriptionEn: "High school student discipleship retreat across Banten.",
    community: "EXPLORE",
    location: "Wisma Retret Samadi, Serang — Banten",
    locationEn: "Samadi Retreat House, Serang — Banten",
    startDate: new Date("2026-12-15T08:00:00Z"),
    endDate: new Date("2026-12-17T15:00:00Z"),
    coverImage: "/uploads/agenda/camp.jpg",
    status: "PUBLISHED",
    createdAt: new Date("2026-11-01T10:00:00Z"),
  },
  {
    id: "evt-2",
    title: "Malam Doa & Fellowship Kampus Khairun Ternate",
    titleEn: "Campus Prayer Night & Fellowship at Khairun University",
    slug: "malam-doa-kampus-ternate-2026",
    description: "Malam puji-pujian dan doa bersama untuk kebangunan rohani mahasiswa di Kota Rempah.",
    descriptionEn: "Worship and intercession night for campus revival.",
    community: "ENCOUNTER",
    location: "Asrama Mahasiswa ESM, Ternate — Maluku Utara",
    locationEn: "ESM Student House, Ternate — North Maluku",
    startDate: new Date("2026-11-28T19:00:00Z"),
    endDate: new Date("2026-11-28T22:00:00Z"),
    coverImage: "/uploads/agenda/fellowship.jpg",
    status: "PUBLISHED",
    createdAt: new Date("2026-11-05T10:00:00Z"),
  },
];

// GET /api/events?community=EXPLORE
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const community = searchParams.get("community");
  const status = searchParams.get("status") || "PUBLISHED";

  try {
    const where: any = {};
    if (status !== "ALL") where.status = status;
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
    console.warn("Prisma offline or timeout in /api/events, using fallbackEvents:", error);
    let filtered = fallbackEvents;
    if (status !== "ALL") filtered = filtered.filter((e) => e.status === status);
    if (community && community !== "ALL") filtered = filtered.filter((e) => e.community === community);

    return NextResponse.json({
      success: true,
      total: filtered.length,
      data: filtered,
      isFallback: true,
    });
  }
}

// POST /api/events (Bilingual ID & EN)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      titleEn,
      description,
      descriptionEn,
      community,
      location,
      locationEn,
      startDate,
      endDate,
      coverImage,
      status,
    } = body;

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
        titleEn: titleEn || null,
        slug,
        description: description || "",
        descriptionEn: descriptionEn || null,
        community: community || "ALL",
        location: location || null,
        locationEn: locationEn || null,
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
