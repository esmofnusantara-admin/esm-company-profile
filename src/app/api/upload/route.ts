import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 100 * 1024 * 1024; // 100MB max
const ALLOWED_TYPES = new Map([
  ["image/jpeg", ["jpg", "jpeg"]],
  ["image/jpg", ["jpg", "jpeg"]],
  ["image/png", ["png"]],
  ["image/webp", ["webp"]],
  ["image/gif", ["gif"]],
  ["image/svg+xml", ["svg"]],
  ["application/pdf", ["pdf"]],
  ["video/mp4", ["mp4", "m4v"]],
  ["video/webm", ["webm"]],
  ["video/quicktime", ["mov"]],
  ["video/x-m4v", ["m4v", "mp4"]],
  ["video/m4v", ["m4v", "mp4"]],
  ["video/ogg", ["ogg", "ogv"]],
]);

const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "svg",
  "pdf",
  "mp4",
  "webm",
  "mov",
  "m4v",
  "ogg",
]);

const ALLOWED_FOLDERS = new Set([
  "articles",
  "events",
  "bulletins",
  "gallery",
  "team",
  "home",
  "about",
  "testimonies",
  "videos",
  "qris",
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
        { error: "Ukuran file terlalu besar (maksimal 100MB)" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `Ekstensi file (.${ext}) tidak didukung. Format yang diizinkan: gambar (JPG, PNG, WebP, GIF), video (MP4, WebM, MOV), atau dokumen PDF.` },
        { status: 400 }
      );
    }

    // Periksa kesesuaian tipe MIME jika browser menyediakannya (kecuali jika generic stream)
    const allowedExtensionsForType = ALLOWED_TYPES.get(file.type);
    if (
      allowedExtensionsForType &&
      !allowedExtensionsForType.includes(ext) &&
      file.type !== "application/octet-stream" &&
      file.type !== ""
    ) {
      return NextResponse.json(
        { error: "Format file tidak sesuai dengan ekstensinya." },
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
