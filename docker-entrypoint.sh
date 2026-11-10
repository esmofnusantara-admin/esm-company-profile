#!/bin/sh
set -e

echo "🚀 [ESM Production] Memulai inisialisasi container Next.js..."

# Jalankan migrasi Prisma dan seed jika DATABASE_URL tersedia
if [ -n "$DATABASE_URL" ]; then
  echo "📦 [Prisma] Menyelaraskan skema database PostgreSQL..."
  npx prisma db push --skip-generate || true

  echo "🌱 [Prisma] Memastikan data awal seeded (Akun Admin, Konfigurasi Situs, & Contoh Konten)..."
  npx tsx prisma/seed.ts || true
fi

echo "✨ [ESM Server] Menjalankan Next.js standalone server pada port ${PORT:-3000}..."
exec "$@"
