#!/bin/bash
set -e

# ===================================================================
# AUTOMATED PRODUCTION DEPLOYMENT SCRIPT (UBUNTU / VPS)
# ===================================================================

echo "🚀 [Deploy] Memulai proses deployment produksi ESM..."

# 1. Pastikan direktori uploads persisten ada
mkdir -p persistent_uploads
chmod 777 persistent_uploads

# 2. Build dan start seluruh container produksi (Postgres, Next.js, Nginx)
echo "📦 [Docker] Membangun image dan menyalakan container..."
docker compose build --no-cache
docker compose up -d

# 3. Verifikasi status container
echo "📊 [Docker] Status container saat ini:"
docker compose ps

echo "✅ [Deploy] Deployment selesai! Layanan berjalan di:"
echo "   - Web App (Nginx): http://localhost:8080 (atau domain utama jika port 80 dipetakan)"
echo "   - Direct Next.js:  http://localhost:3000"
echo "   - PostgreSQL:      localhost:5433"
