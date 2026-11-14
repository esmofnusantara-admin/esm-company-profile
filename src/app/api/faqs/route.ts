import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

const fallbackFaqs = [
  {
    id: "faq-1",
    question: "Apa itu Gerakan ESM (Evangelical Student Movement)?",
    questionEn: "What is ESM (Evangelical Student Movement)?",
    answer:
      "ESM adalah gerakan pemuridan dan misi Kristen yang berfokus melahirkan murid Kristus yang berakar kuat dalam Firman Tuhan dan bergerak aktif di ladang misi perintisan, khususnya di Banten dan Ternate.",
    answerEn:
      "ESM is a Christian discipleship and mission movement focused on raising disciples rooted in God's Word and actively serving in pioneering mission fields, particularly in Banten and Ternate.",
    page: "GENERAL",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "Bagaimana cara bermitra atau mendukung pelayanan ESM?",
    questionEn: "How can I partner with or support ESM ministry?",
    answer:
      "Anda dapat bermitra melalui doa rutin, dukungan dana operasional/beasiswa asrama mahasiswa, atau menjadi sukarelawan mentor pemuridan di Banten dan Maluku Utara.",
    answerEn:
      "You can partner through prayer, financial support for student residences and ministry operations, or volunteering as discipleship mentors in Banten and North Maluku.",
    page: "KEMITRAAN",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "Di mana saja fokus ladang pelayanan ESM saat ini?",
    questionEn: "Where are the primary mission fields of ESM currently located?",
    answer:
      "Pelayanan perintisan kami berfokus di Banten (Serang, Cilegon, Rangkasbitung) dan Maluku Utara (Kota Ternate & Halmahera) dengan kelompok pemuridan siswa dan persekutuan mahasiswa.",
    answerEn:
      "Our pioneering ministry focuses on Banten (Serang, Cilegon, Rangkasbitung) and North Maluku (Ternate & Halmahera) through student discipleship groups and university fellowships.",
    page: "GENERAL",
    sortOrder: 2,
    isActive: true,
  },
];

// GET /api/faqs?page=GENERAL
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") as any;

  if (isDbKnownOffline()) {
    let result = fallbackFaqs;
    if (page) result = result.filter((f) => f.page === page);
    return NextResponse.json({
      success: true,
      total: result.length,
      data: result,
      isFallback: true,
    });
  }

  try {
    const where: any = { isActive: true };
    if (page) where.page = page;

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    markDbOnline();
    return NextResponse.json({
      success: true,
      total: faqs.length,
      data: faqs,
    });
  } catch (error) {
    markDbOffline();
    console.warn("Prisma offline in /api/faqs, returning fallback FAQs");
    let result = fallbackFaqs;
    if (page) result = result.filter((f) => f.page === page);
    return NextResponse.json({
      success: true,
      total: result.length,
      data: result,
      isFallback: true,
    });
  }
}
