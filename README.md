# ESM Indonesia — Company Profile & Ministry Management Platform

Aplikasi web portal resmi dan platform manajemen pelayanan **Evangelical Student Movement (ESM) Indonesia**. Dibangun dengan arsitektur modern berbasis Next.js 15 Standalone, Prisma ORM, PostgreSQL, Docker Compose, dan Reverse Proxy Nginx untuk keandalan produksi di VPS.

---

## 🏛️ Arsitektur & Topologi Produksi

```
[ Visitor / Admin ]
        │
        ▼
[ Cloudflare DNS & SSL ]
        │
        ▼
[ VPS Host (Ubuntu 22.04 / 24.04 LTS) ]
        │
        ▼
[ Docker Network: esm_network ]
  ├── 1. Nginx Reverse Proxy (esm_nginx : Port 80 / 443 / 8080)
  │      └── Static Assets Cache (_next/static, persistent uploads)
  ├── 2. Next.js 15 App (esm_nextjs : Port 3000)
  │      └── Standalone Node.js runtime + Self-migrating entrypoint
  └── 3. PostgreSQL Database (esm_postgres : Port 5433 / 5432)
         └── Persistent Data Volume (esm_pgdata)
```

---

## 🔐 Kredensial Akses Admin Portal

* **URL Portal Admin**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (atau `https://esm.or.id/admin/login` di server produksi)
* **Email**: `admin@esm.or.id`
* **Password**: `Admin@ESM2025!`
* **Peran (Role)**: `SUPER_ADMIN`

---

## 🚀 Panduan Menjalankan di Komputer Lokal

### 1. Menyalakan Database Docker
Database PostgreSQL telah dikonfigurasi di Docker container `esm_postgres` dan dipetakan ke port `5433` di komputer lokal:

```bash
# Nyalakan container PostgreSQL
docker compose up -d postgres

# Atau jalankan script inisialisasi otomatis:
# Di Windows PowerShell:
.\scripts\init-db.ps1

# Di Linux / Mac / Git Bash:
./scripts/init-db.sh
```

### 2. Migrasi & Seeding Database
```bash
# Sinkronisasi skema database Prisma
npm run db:push

# Isi data awal (Admin, Site Config, Artikel Contoh, Jadwal, FAQ)
npm run seed

# (Opsional) Membuka Prisma Studio GUI untuk melihat data
npm run db:studio
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🚢 Panduan Deployment Produksi ke Server VPS (Ubuntu)

### 1. Spesifikasi Server Minimal
* **OS**: Ubuntu 22.04 LTS / 24.04 LTS
* **CPU**: 2 vCPU
* **RAM**: Minimal 2 GB (Disarankan 4 GB)
* **Storage**: 40–50 GB NVMe SSD
* **Docker & Docker Compose**: Sudah terpasang

### 2. Langkah Rilis di VPS
```bash
# 1. Clone repositori ke server
git clone <URL_REPO> esm-deployment
cd esm-deployment

# 2. Salin environment
cp .env.example .env
# Sesuaikan NEXTAUTH_SECRET dan NEXTAUTH_URL dengan domain produksi Anda

# 3. Jalankan script deployment otomatis
chmod +x scripts/*.sh
./scripts/deploy.sh
```

Container Next.js di dalam Docker dilengkapi dengan `docker-entrypoint.sh` yang secara otomatis melakukan:
1. Sinkronisasi skema tabel database (`prisma db push`).
2. Seeding otomatis akun admin super dan konten awal jika belum ada.
3. Menjalankan server standalone Next.js.

---

## 💾 Backup & Pemeliharaan Database

Untuk mencadangkan database secara berkala:
```bash
./scripts/backup-db.sh
```
File cadangan berekstensi `.sql.gz` akan disimpan di folder `./backups/` dengan retensi otomatis selama 14 hari.

Untuk memulihkan database dari file backup:
```bash
gunzip -c ./backups/esm_db_backup_YYYYMMDD_HHMMSS.sql.gz | docker exec -i esm_postgres psql -U esm_user -d esm_db
```

---

## 📂 Struktur File Infrastruktur

```
├── Dockerfile              # Multi-stage production build (Next.js standalone)
├── docker-compose.yml      # Orkestrasi Postgres, Next.js, & Nginx
├── docker-entrypoint.sh    # Script inisialisasi database & startup container
├── nginx/
│   ├── nginx.conf          # Konfigurasi reverse proxy HTTP & caching
│   └── nginx-ssl.conf      # Konfigurasi HTTPS dengan sertifikat SSL
├── scripts/
│   ├── init-db.ps1         # Script inisialisasi cepat di Windows
│   ├── init-db.sh          # Script inisialisasi cepat di Linux/Bash
│   ├── deploy.sh           # Script rilis produksi VPS otomatis
│   └── backup-db.sh        # Script otomatisasi backup database berkala
└── prisma/
    ├── schema.prisma       # Skema database 10 model (bilingual ID & EN)
    └── seed.ts             # Data inisial admin & konten default
```
