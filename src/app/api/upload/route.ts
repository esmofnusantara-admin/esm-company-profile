import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 50 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", ["jpg", "jpeg"]],
  ["image/png", ["png"]],
  ["image/webp", ["webp"]],
  ["image/gif", ["gif"]],
  ["application/pdf", ["pdf"]],
  ["video/mp4", ["mp4"]],
  ["video/webm", ["webm"]],
  ["video/quicktime", ["mov"]],
]);
const ALLOWED_FOLDERS = new Set([
  "articles",
  "events",
  "bulletins",
  "gallery",
  "team",
  "home",
  "about",
  "misc",
]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const requestedFolder = (formData.get("folder") as string) || "misc";
    const folder = ALLOWED_FOLDERS.has(requestedFolder) ? requestedFolder : "misc";

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar (maksimal 50MB)" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const allowedExtensions = ALLOWED_TYPES.get(file.type);
    if (!allowedExtensions || !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { error: "Format file tidak didukung atau ekstensi tidak sesuai dengan isinya." },
        { status: 400 }
      );
    }

    // Buat nama file unik
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
