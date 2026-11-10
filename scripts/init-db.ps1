# ===================================================================
# SCRIPT INISIALISASI DATABASE ESM DI DOCKER (WINDOWS POWERSHELL)
# ===================================================================
Write-Host "🚀 Menyalakan container PostgreSQL (esm_postgres)..." -ForegroundColor Cyan
docker compose up -d postgres

Write-Host "⏳ Menunggu database PostgreSQL siap menerima koneksi..." -ForegroundColor Yellow
$retries = 15
while ($retries -gt 0) {
    $status = docker inspect --format="{{.State.Health.Status}}" esm_postgres 2>$null
    if ($status -eq "healthy") {
        Write-Host "✅ PostgreSQL telah aktif dan sehat!" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 2
    $retries--
}

Write-Host "📦 Menyelaraskan skema Prisma ke database..." -ForegroundColor Cyan
npm run db:push

Write-Host "🌱 Melakukan seeding data awal (Admin, Konfigurasi, & Artikel)..." -ForegroundColor Cyan
npm run seed

Write-Host "✨ Database ESM berhasil disiapkan dan terisi data penuh!" -ForegroundColor Green
Write-Host "Informasi Akses Database:"
Write-Host "  - Host: localhost"
Write-Host "  - Port: 5433"
Write-Host "  - Database: esm_db"
Write-Host "  - User: esm_user"
Write-Host "  - Password: esm_password"
Write-Host "Akun Admin Portal:"
Write-Host "  - Email: admin@esm.or.id"
Write-Host "  - Password: Admin@ESM2025!"
