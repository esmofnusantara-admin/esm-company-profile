#!/bin/bash
set -e

echo "🚀 Menyalakan container PostgreSQL (esm_postgres)..."
docker compose up -d postgres

echo "⏳ Menunggu database PostgreSQL siap..."
until [ "`docker inspect -f {{.State.Health.Status}} esm_postgres 2>/dev/null`"=="healthy" ]; do
    sleep 2
done

echo "📦 Menyelaraskan skema Prisma ke database..."
npm run db:push

echo "🌱 Melakukan seeding data awal (Admin, Konfigurasi, & Artikel)..."
npm run seed

echo "✨ Database ESM berhasil disiapkan dan terisi data penuh!"
