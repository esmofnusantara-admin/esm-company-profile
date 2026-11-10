### 1. Topologi Server (Arsitektur Jaringan)

Alur permintaan ( *request* ) dari *user* sampai ke *database*:

**Visitor / Admin** ➔ **Cloudflare (DNS & SSL)** ➔ **VPS (Ubuntu)** ➔ **Nginx (Reverse Proxy)** ➔ **Docker Container (Next.js)** ➔ **Docker Container (PostgreSQL) & File System (Volumes)**

### 2. Spesifikasi Server (VPS)

Untuk menjalankan Next.js (terutama saat proses *build*) dan PostgreSQL di satu *server*, ini spesifikasi minimal yang direkomendasikan:

* **OS:** Ubuntu 22.04 LTS / 24.04 LTS
* **CPU:** 2 vCPU
* **RAM:** Minimal 2GB (Sangat disarankan 4GB agar proses `npm run build` tidak *crash* karena kehabisan memori).
* **Storage:** 40GB - 50GB NVMe SSD (Penting untuk ruang penyimpanan foto, video, dan dokumen `uploads`).

### 3. Konfigurasi Docker Compose (`docker-compose.yml`)

Ini adalah jantung infrastrukturmu. Docker akan memastikan Next.js dan PostgreSQL berjalan di lingkungan yang terisolasi.

```yaml
version: '3.8'

services:
  web:
    container_name: org_nextjs_app
    build: 
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://org_user:rahasia123@db:5432/org_db
      - NEXTAUTH_URL=https://nama-organisasi.com
      - NEXTAUTH_SECRET=generate_secret_key_disini
    volumes:
      # PENTING: Mengamankan folder upload agar tidak hilang saat container mati/update
      - ./persistent_uploads:/app/public/uploads
    depends_on:
      - db
    networks:
      - org_network

  db:
    container_name: org_postgres_db
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: org_user
      POSTGRES_PASSWORD: esm123
      POSTGRES_DB: org_db
    volumes:
      # PENTING: Mengamankan data base agar tidak reset
      - org_pgdata:/var/lib/postgresql/data
    networks:
      - org_network

volumes:
  org_pgdata: # Volume internal Docker untuk DB

networks:
  org_network:
    driver: bridge

```

> **Catatan Penting Next.js:** Di dalam `next.config.js`, kamu harus menambahkan `output: 'standalone'` agar Next.js di-*build* khusus untuk ukuran Docker yang sangat kecil dan efisien.

### 4. Reverse Proxy (Nginx) & SSL

Nginx bertugas menerima *traffic* dari internet (Port 80/443) dan meneruskannya ke Docker Next.js (Port 3000).

**File konfigurasi Nginx (`/etc/nginx/sites-available/org_web`):**

```nginx
server {
    server_name nama-organisasi.com www.nama-organisasi.com;

    # Batas maksimal file upload (contoh: 10MB untuk foto dan 250M untuk video)
    client_max_body_size 50M; 

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```

Untuk SSL (HTTPS), kamu cukup menjalankan **Certbot (Let's Encrypt)** di Ubuntu (`sudo certbot --nginx -d nama-organisasi.com`), dan Nginx akan otomatis dikonfigurasi menjadi HTTPS yang aman.

### 5. Strategi Manajemen Storage (Direktori)

Di dalam server Ubuntu-mu, struktur foldernya akan terlihat seperti ini:

```text
/home/user/org-deployment/
├── docker-compose.yml
├── .env                  # Simpan secret keys di sini, jangan di code
├── persistent_uploads/   # BERISI SEMUA FOTO & VIDEO (Termount ke Docker)
└── /app-code             # Source code yang di clone dari GitHub

```

Setiap kali kamu melakukan *update* kode (*git pull* dan *docker build* ulang), container lama akan dihapus dan diganti yang baru. Namun, karena folder `persistent_uploads/` berada di *host* Ubuntu (bukan di dalam container), **semua foto, video, dan dokumen tidak akan pernah hilang**.

### 6. Alur Deployment (CI/CD Sederhana)

Untuk mengelola rilis kode dari laptopmu (Windows/WSL) ke server VPS:

1. **Local Dev:** Kamu *coding* di laptop (VS Code), tes pakai *localhost*.
2. **Push:** Setelah selesai, *push* ke GitHub (misal: repositori di *organization account* `esm`).
3. **Deploy (Manual/Script):** Kamu masuk ke VPS via SSH, jalankan:
* `git pull origin main`
* `docker-compose up -d --build` (Ini akan men-*compile* Next.js dan langsung me-*restart* aplikasi tanpa mematikan *database*).


4. *(Opsional)*: Kamu bisa menggunakan **GitHub Actions** untuk menjalankan perintah SSH di langkah 3 secara otomatis setiap kali ada kode yang di-*merge* ke *branch* `main`.