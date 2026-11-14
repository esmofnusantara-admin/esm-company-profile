import { NextRequest, NextResponse } from "next/server";

const COMMON_DICTIONARY: Record<string, string> = {
  "yayasan": "foundation",
  "murid muda bermisi": "mission-driven young disciples",
  "pemuridan": "discipleship",
  "pelayanan": "ministry",
  "mahasiswa": "university students",
  "siswa": "students",
  "naungan hukum": "legal umbrella",
  "dewan pembina": "board of trustees",
  "penasihat hukum": "legal advisors",
  "pengawas yayasan": "foundation supervisors",
  "sekretaris jenderal": "secretary general",
  "koordinator nasional": "national coordinator",
  "ketua yayasan": "foundation chairman",
  "sekretaris yayasan": "foundation secretary",
  "kemitraan": "partnership",
  "gerakan": "movement",
  "gereja": "church",
  "injil": "gospel",
  "alumni": "alumni",
  "perintisan": "pioneering",
  "ladang misi": "mission field",
  "pokok doa": "prayer requests",
  "komitmen integritas": "integrity commitment",
  "tingkat": "level",
};

function dictionaryFallback(idText: string): string {
  let result = idText;
  for (const [idWord, enWord] of Object.entries(COMMON_DICTIONARY)) {
    const regex = new RegExp(`\\b${idWord}\\b`, "gi");
    result = result.replace(regex, enWord);
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text = body.text;
    const source = body.from || body.source || "id";
    const target = body.to || body.target || "en";

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Teks wajib diisi" }, { status: 400 });
    }

    let translatedText = "";

    // 1. Coba Google Translate GTX API
    try {
      const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(
        text
      )}`;

      const res = await fetch(gtxUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok) {
        const data = await res.json();
        translatedText = data[0]?.map((item: any) => item[0]).join("") || "";
      }
    } catch (e) {
      console.warn("Google GTX translation failed, trying MyMemory...");
    }

    // 2. Fallback ke MyMemory API
    if (!translatedText) {
      try {
        const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=${source}|${target}`;
        const res = await fetch(myMemoryUrl, {
          signal: AbortSignal.timeout(3500),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.responseData?.translatedText) {
            translatedText = data.responseData.translatedText;
          }
        }
      } catch (e) {
        console.warn("MyMemory translation failed, falling back to dictionary...");
      }
    }

    // 3. Fallback ke kamus / dictionary
    if (!translatedText || translatedText.trim() === text.trim()) {
      translatedText = dictionaryFallback(text);
    }

    return NextResponse.json({
      success: true,
      translated: translatedText,
      translatedText,
      originalText: text,
      source,
      target,
    });
  } catch (error) {
    console.error("Auto-translate error:", error);
    return NextResponse.json({
      success: true,
      translated: dictionaryFallback(""),
      translatedText: "",
    });
  }
}
