import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, source = "id", target = "en" } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Teks wajib diisi" }, { status: 400 });
    }

    // Call translation endpoint (Google Translate GTX API)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      throw new Error(`Translation API error: ${res.statusText}`);
    }

    const data = await res.json();
    // Format response: [[["Translated text", "Source text", null, null, 1]], null, "id"]
    const translatedText = data[0]?.map((item: any) => item[0]).join("") || text;

    return NextResponse.json({
      success: true,
      originalText: text,
      translatedText,
      source,
      target,
    });
  } catch (error) {
    console.error("Auto-translate error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal melakukan auto-translate.",
      },
      { status: 500 }
    );
  }
}
