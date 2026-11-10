import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "misc"; // articles, events, bulletins, misc

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar (maksimal 10MB)" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Gunakan JPG, PNG, WEBP, SVG, atau PDF." },
        { status: 400 }
      );
    }

    // Buat nama file unik
    const ext = file.name.split(".").pop();
    const cleanName = file.name
      .split(".")[0]
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const filename = `${cleanName}-${Date.now()}.${ext}`;
    const targetDir = path.join(UPLOAD_DIR, folder);
    const targetFilePath = path.join(targetDir, filename);

    // Buat folder jika belum ada
    await mkdir(targetDir, { recursive: true });

    // Simpan file ke sistem penyimpanan lokal
    const bytes = await file.arrayBuffer();
    await writeFile(targetFilePath, Buffer.from(bytes));

    const publicUrl = `/uploads/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Gagal mengunggah file:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal saat menyimpan file." },
      { status: 500 }
    );
  }
}
