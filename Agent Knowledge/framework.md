### Core & Frontend

* **Framework Utama:** **Next.js (App Router)** dengan **TypeScript**. Menangani seluruh aspek: halaman publik (SEO maksimal dengan SSR/SSG), Admin Portal CMS, dan *backend logic* (menggunakan *Server Actions*).
* **Styling & UI:** **Tailwind CSS** + **Shadcn UI**. Mempercepat pembuatan tabel, *modal*, dan *form* dinamis di halaman admin tanpa mendesain komponen dari nol.
* **Form & Validasi:** **React Hook Form** + **Zod**. Wajib untuk menangani *input form* dinamis dan integrasi pengiriman data secara *type-safe* ke PostgreSQL.

### Backend & Database

* **Database:** **PostgreSQL**. Fleksibel menggunakan kolom tipe `JSONB` untuk menyimpan konfigurasi warna, logo, dan konten dinamis dari *page builder*.
* **ORM:** **Prisma ORM** atau **Drizzle ORM**. Prisma sangat disarankan untuk sistem CMS karena skemanya mudah dibaca dan migrasinya cepat.
* **Authentication:** **NextAuth.js (Auth.js)**. Untuk mengamankan rute folder `/(admin)` dan membatasi akses edit/update data hanya kepada admin organisasi.

### Storage & Infrastructure

* **File Storage:** **Node.js Local File System (`fs`)**. File foto, video, dan dokumen disimpan langsung di folder lokal `/public/uploads`.
* **Deployment:** **VPS (Virtual Private Server)**. Kamu bisa menggunakan layanan seperti DigitalOcean, Linode, atau *provider* lokal. **Hindari Vercel/Netlify** karena mereka bersifat *serverless* dan akan menghapus file *upload* lokalmu.
* **Containerization:** **Docker + Docker Compose**. Digunakan untuk membungkus aplikasi Next.js dan PostgreSQL di VPS. Wajib menggunakan *Docker Volumes* untuk mengamankan folder `/public/uploads` dan `/var/lib/postgresql/data` agar data tidak hilang saat *restart* server.