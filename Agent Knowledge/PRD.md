# Product Requirements Document (PRD)
# ESM Company Profile Website

**Versi:** 1.0  
**Tanggal:** November 2025  
**Author:** AI Planning Agent  
**Status:** Draft — Menunggu Review

---

## 1. Executive Summary

ESM (Evangelical Student Movement) membutuhkan website company profile modern yang berfungsi sebagai:
1. **Wajah digital** organisasi yang menjangkau siswa, mahasiswa, alumni, gereja, dan mitra
2. **Platform informasi** untuk program, agenda, artikel, dan buletin
3. **Kanal kemitraan** (doa, dukungan finansial, partisipasi aktif)
4. **CMS internal** bagi admin ESM untuk mengelola konten, keuangan donasi, dan agenda

Website ini dibangun menggunakan **Next.js App Router + TypeScript**, dengan desain mengikuti Figma prototype yang telah disepakati, mendukung **bilingual (ID/EN)** dan **dark mode**.

---

## 2. Latar Belakang & Konteks

### 2.1 Tentang ESM
ESM adalah gerakan murid Injili yang beroperasi melalui tiga komunitas (Ladang Pelayanan):
- **Explore** — Komunitas untuk siswa SMA
- **Encounter** — Komunitas untuk mahasiswa (wilayah Banten & Ternate)
- **Connect** — Komunitas untuk alumni dan profesional muda

### 2.2 Framework Pelayanan
Strategi inti ESM: **Hadir → Memuridkan → Mengutus**
- **Communion** — Persekutuan rohani
- **Community** — Komunitas yang saling mendukung
- **Commission** — Pengutusan ke ladang misi

### 2.3 Masalah yang Diselesaikan
- Tidak ada platform terpusat untuk informasi ESM
- Mitra/donatur tidak punya akses mudah untuk memberikan dukungan
- Konten artikel dan buletin tersebar, tidak terorganisir
- Admin memerlukan CMS sederhana untuk update konten tanpa coding

---

## 3. Target Pengguna

### 3.1 Pengunjung Publik

| Segmen | Deskripsi | Kebutuhan Utama |
|--------|-----------|-----------------|
| **Siswa SMA** | Target komunitas Explore | Info program, jadwal, cara bergabung |
| **Mahasiswa** | Target komunitas Encounter | Info komunitas, agenda, Tim Encounter |
| **Alumni/Profesional** | Target komunitas Connect | Marketplace impact, mentoring, fellowship |
| **Gereja & Mitra** | Institusi/individu yang ingin bermitra | Info kemitraan, form donasi, transparansi |
| **Pengunjung Umum** | Penasaran tentang ESM | Tentang kami, artikel, testimoni |

### 3.2 Pengguna Admin (Internal)

| Role | Akses | Tanggung Jawab |
|------|-------|----------------|
| **Super Admin** | Full access | Semua fitur CMS + keuangan |
| **Content Admin** | Artikel + Event | Update artikel, buletin, agenda |
| **Finance Admin** | Donasi + Keuangan | Record transaksi, monitor kas |

---

## 4. Fitur & Prioritas

### Priority Framework
- **P0** — Must Have (MVP, tidak bisa launch tanpa ini)
- **P1** — Should Have (penting untuk pengalaman lengkap)
- **P2** — Nice to Have (enhancement ke depan)

---

### 4.1 Public Website Pages

#### P0 — Homepage (`/`)
- [ ] Hero section: "Murid Muda Bermisi" dengan CTA utama
- [ ] Section "Mengapa ESM?" dengan 3-4 value proposition cards
- [ ] Section Artikel terbaru + Kalender agenda mendatang
- [ ] FAQ accordion (pertanyaan umum)
- [ ] Testimonial carousel (auto-rotating + manual)
- [ ] CTA Kemitraan banner sebelum footer
- [ ] Footer 4-kolom (Logo + links + ladang pelayanan + kontak)

#### P0 — Tentang Kami (`/tentang-kami`)
- [ ] Hero dengan narasi sejarah berdirinya ESM
- [ ] Section nilai-nilai organisasi (cards)
- [ ] Diagram struktur organisasi (visual/interaktif)
- [ ] Logo identity dan penggunaannya
- [ ] Peta wilayah pelayanan (Banten & Ternate)

#### P0 — Pelayanan & Strategi (`/pelayanan`)
- [ ] Framework Hadir→Memuridkan→Mengutus (visual diagram)
- [ ] Strategi 3C (Communion, Community, Commission)
- [ ] 3 CTA cards menuju Explore, Encounter, Connect

#### P0 — Explore Community / Siswa (`/pelayanan/explore`)
- [ ] Hero section komunitas Explore
- [ ] Tab: Program & Agenda
- [ ] Grid anggota Tim Explore (foto + nama + peran)
- [ ] Testimonial carousel dari siswa
- [ ] CTA WhatsApp contact

#### P0 — Encounter Community / Mahasiswa (`/pelayanan/encounter`)
- [ ] Hero section komunitas Encounter
- [ ] Section dua wilayah: Banten & Ternate (dengan foto)
- [ ] Grid program dengan foto dokumentasi
- [ ] Tim Encounter
- [ ] CTA WhatsApp

#### P0 — Connect Community / Alumni (`/pelayanan/connect`)
- [ ] Hero section komunitas Connect
- [ ] Marketplace Impact: 3 pilar (Ekonomi, Sosial, Rohani)
- [ ] Program & Agenda tab
- [ ] Tim Connect
- [ ] Testimonial alumni
- [ ] CTA Footer

#### P0 — Mobilisasi & Agenda (`/mobilisasi`)
- [ ] Master Calendar (Tahunan + 3 komunitas)
- [ ] List upcoming events dengan filter komunitas
- [ ] Section Kolaborasi/Mitra acara

#### P0 — Artikel & Buletin (`/artikel`)
- [ ] Tab filter kategori artikel
- [ ] Editor's Picks / Featured articles
- [ ] Grid artikel dengan card (cover, judul, ringkasan, tanggal, kategori)
- [ ] Upload/download buletin PDF
- [ ] Newsletter subscribe CTA

#### P0 — Kemitraan & Kontak (`/kemitraan`)
- [ ] 3 jenis mitra: Doa, Dukungan Finansial, Partisipasi Aktif
- [ ] Form donasi:
  - Pilih tipe: Sekali Beri / Mitra Bulanan
  - Input nominal
  - Nama, email, pesan (optional)
- [ ] Info rekening bank + QRIS image
- [ ] Contact Hub dengan embedded Google Maps
- [ ] FAQ accordion
- [ ] CTA footer

#### P0 — Error 404 (`/not-found`)
- [ ] Halaman custom 404: "Sedang Mencari Domba yang Hilang"
- [ ] Ilustrasi domba
- [ ] Tombol kembali ke beranda

---

### 4.2 Admin Portal

#### P0 — Admin Login (`/admin/login`)
- [ ] Form login (email + password)
- [ ] Branding "ESM Internal System"
- [ ] Label: "2-Step Access / CMS Ready / Admin Only"
- [ ] Session management (NextAuth.js, 24-jam)

#### P0 — Admin Dashboard Overview (`/admin`)
- [ ] Ringkasan statistik: total mitra, total donasi bulan ini, artikel aktif, event mendatang
- [ ] Recent activity feed
- [ ] Quick links ke masing-masing modul

#### P0 — Admin Mitra Overview (`/admin/mitra`)
- [ ] Table daftar mitra (nama, tipe, nominal, tanggal mulai, status)
- [ ] Filter & search
- [ ] Export CSV

#### P0 — Admin Donasi & Keuangan (`/admin/keuangan`)
- [ ] KPI cards: Kas Pemasukan, Pengeluaran, Saldo Bersih
- [ ] Form record transaksi baru (tipe, nominal, deskripsi, tanggal)
- [ ] Tabel log keuangan dengan filter periode
- [ ] Export laporan

#### P0 — Admin Event & Agenda (`/admin/event`)
- [ ] Form tambah/edit event (judul, komunitas, tanggal, lokasi, deskripsi, cover)
- [ ] Table daftar upcoming events
- [ ] Toggle publikasi (draft/published)

#### P0 — Admin Artikel & Buletin (`/admin/artikel`)
- [ ] Rich text editor untuk artikel (Tiptap/Lexical)
- [ ] Upload cover image
- [ ] Pilih kategori
- [ ] Upload PDF buletin
- [ ] Toggle draft/publish
- [ ] Preview artikel

---

### 4.3 P1 Features — Should Have

#### Dark Mode
- [ ] Toggle light/dark mode di navbar
- [ ] Persistent preference (localStorage + cookie untuk SSR)
- [ ] Semua komponen mendukung dark variant via Tailwind `dark:` classes

#### Bilingual (ID/EN)
- [ ] Language switcher di navbar (ID | EN)
- [ ] `next-intl` untuk routing berbasis locale (`/id/...` dan `/en/...`)
- [ ] Translation file untuk semua teks UI
- [ ] Konten CMS (artikel, dsb.) tetap satu bahasa (admin input)

#### Halaman Artikel Detail (`/artikel/[slug]`)
- [ ] Full artikel dengan rich text
- [ ] Social share buttons
- [ ] Related articles
- [ ] Breadcrumb navigation

#### Sitemap & robots.txt
- [ ] Auto-generated `sitemap.xml` via Next.js route handler
- [ ] `robots.txt` yang proper

#### Halaman Pencarian (`/cari`)
- [ ] Search bar global
- [ ] Hasil: artikel, event, tim

---

### 4.4 P2 Features — Nice to Have

| Fitur | Deskripsi |
|-------|-----------|
| Gallery Page | Grid foto kegiatan per komunitas |
| Social Media Feed | Instagram feed embed (Explore/Encounter/Connect) |
| Company Profile Video | Embed video di homepage hero (jika tersedia) |
| Organizational Chart Interactive | Interactive org chart dengan hover details |
| Event Registration | Form pendaftaran event langsung di website |
| Analytics Dashboard | Statistik pengunjung untuk admin |
| Email Notifikasi | Konfirmasi otomatis saat ada donasi masuk |

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **Core Web Vitals Target:**
  - LCP (Largest Contentful Paint) < 2.5 detik
  - FID/INP < 200ms
  - CLS < 0.1
- **Strategi:** SSG untuk halaman statis, ISR untuk artikel/event, Image optimization via `next/image`
- **Bundle size:** Code splitting per route, lazy loading untuk komponen besar

### 5.2 SEO
- Server-side rendering untuk semua halaman publik
- `generateMetadata()` per halaman (title, description, og:image, og:type)
- Structured data (JSON-LD) untuk artikel dan events
- Canonical URLs
- Auto-generated sitemap
- Open Graph tags untuk social sharing

### 5.3 Accessibility
- WCAG 2.1 Level AA compliance
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<article>`, dll.)
- Keyboard navigable
- Screen reader compatible (aria labels)
- Contrast ratio minimum 4.5:1

### 5.4 Security
- Admin portal dilindungi NextAuth.js middleware
- CSRF protection via NextAuth
- Input sanitization di semua form (Zod validation)
- Rate limiting pada form submission (kemitraan, donasi)
- Environment variables untuk semua secret keys
- PostgreSQL: parameterized queries via Prisma (SQL injection protection)
- File upload: type checking, size limit 5MB, stored di luar webroot atau di `/public/uploads` dengan akses terbatas

### 5.5 Responsiveness
- Mobile-first design
- Breakpoints: Mobile (< 640px), Tablet (640–1024px), Desktop (> 1024px)
- Semua halaman tested di min. 3 ukuran layar

### 5.6 Browser Support
- Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Tidak support:** IE11

### 5.7 Uptime & Reliability
- Target uptime: 99.5%
- VPS hosting dengan Docker + Nginx
- SSL via Certbot (Let's Encrypt, auto-renew)
- Backup database harian (cron job)

---

## 6. Content Requirements Per Halaman

### Homepage
| Konten | Tipe | Sumber |
|--------|------|--------|
| Hero headline | Static text | Tim ESM |
| Hero subheadline | Static text | Tim ESM |
| Hero background image | Image | Tim ESM |
| Why ESM points (3-4 items) | Static/CMS | Tim ESM |
| Testimonials | CMS (admin) | Tim ESM collect |
| FAQ items | CMS (admin) | Tim ESM |

### Artikel & Buletin
| Konten | Tipe | Sumber |
|--------|------|--------|
| Cover image artikel | Image upload | Admin |
| Judul artikel | Text | Admin |
| Body artikel | Rich text | Admin |
| Kategori | Select from list | Admin |
| Tanggal publish | Date | Admin |
| File buletin PDF | PDF upload | Admin |

### Kemitraan
| Konten | Tipe | Sumber |
|--------|------|--------|
| Info rekening bank | Static/CMS | Tim ESM |
| QRIS image | Image | Tim ESM |
| Nominal preset donasi | CMS config | Admin |
| Info kontak (WA, email, alamat) | CMS config | Admin |
| Maps embed URL | CMS config | Admin |

---

## 7. Arsitektur Teknis (High Level)

```
Cloudflare DNS
      ↓
VPS Ubuntu 22.04 (2 vCPU, 4GB RAM, 50GB SSD)
      ↓
Nginx (Reverse Proxy + SSL Termination via Certbot)
      ↓
Docker Compose Network
  ├── Next.js App Container (port 3000)
  │     ├── App Router (SSR/SSG/ISR)
  │     ├── NextAuth.js (Session Management)
  │     ├── Server Actions (CMS mutations)
  │     └── Prisma Client
  └── PostgreSQL Container (port 5432)
        └── Volume: persistent_db/

Volume: persistent_uploads/ → /public/uploads (media files)
```

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI
- **State/Forms:** React Hook Form + Zod
- **Database:** PostgreSQL 16 + Prisma ORM
- **Auth:** NextAuth.js v5 (Credentials provider)
- **Editor:** Tiptap (rich text untuk artikel)
- **Internasionalisasi:** next-intl
- **Deployment:** Docker + Docker Compose + Nginx + Certbot

---

## 8. Asumsi & Pertanyaan Terbuka

### Asumsi
1. ESM memiliki VPS atau dapat menyewa (spec: 2 vCPU, 4GB RAM, 40-50GB SSD)
2. Domain sudah dimiliki atau akan dibeli
3. Konten website (teks, foto, logo) akan disediakan oleh tim ESM
4. Admin portal hanya untuk internal ESM (tidak ada registrasi publik)
5. Pembayaran donasi manual (konfirmasi via transfer, bukan payment gateway otomatis)

### Pertanyaan Terbuka (dari frame PERTANYAAN)

| No | Pertanyaan | Dampak ke PRD |
|----|-----------|---------------|
| 1 | Kategori artikel apa saja? | Menentukan dropdown kategori di CMS |
| 2 | Artikel internal (slugged) atau eksternal (href)? | Menentukan arsitektur routing artikel |
| 3 | Tanggal launch artikel — real date atau scheduled? | Fitur scheduled publish di CMS |
| 4 | Apakah ada company profile video? | Komponen video hero di homepage |
| 5 | Tipe kemitraan (doa, finansial, partisipasi) — ada detail lebih? | Copy text di halaman kemitraan |
| 6 | Apakah perlu halaman gallery/event khusus? | Tambah halaman Gallery di P1/P2 |
| 7 | Kontak terpusat atau per komunitas? | Struktur halaman kontak |
| 8 | Struktur organisasi — tampil sebagai chart atau foto bersama? | Komponen org chart |
| 9 | Halaman Circle/intimates media sosial — perlu dibuat? | Tambah halaman baru atau embed IG |
| 10 | FAQ — isi kontennya apa saja? | Konten FAQ yang perlu disediakan |
| 11 | Konten promosi untuk masing-masing komunitas? | Copy/foto untuk Explore/Encounter/Connect |

---

## 9. Out of Scope (MVP)

- Payment gateway otomatis (Midtrans, Xendit, dll.) — donasi manual
- Forum atau komunitas online
- Live streaming integration
- Mobile app (iOS/Android)
- Multi-tenant admin (satu admin per komunitas dengan role berbeda — dikaji kemudian)
- E-commerce / toko merchandise
- Automatic email confirmation untuk donatur

---

## 10. Success Metrics

| Metrik | Target (3 bulan post-launch) |
|--------|------------------------------|
| Waktu load halaman | < 3 detik (mobile 3G) |
| Lighthouse Performance Score | ≥ 85 |
| Lighthouse SEO Score | ≥ 95 |
| Jumlah form kemitraan tersubmit | ≥ 10/bulan |
| Halaman diindeks Google | 100% halaman publik |
| Uptime | ≥ 99.5% |
| Zero security incidents | 0 data breach |

---

## 11. Timeline Overview

| Fase | Durasi Estimasi | Deliverable |
|------|----------------|-------------|
| Phase 0: Setup | 1–2 hari | Project scaffold, Docker, Prisma |
| Phase 1: Foundation | 2–3 hari | Design system, Navbar, Footer, 404 |
| Phase 2: Core Pages | 3–5 hari | Homepage, Tentang Kami |
| Phase 3: Pelayanan | 3–5 hari | Pelayanan, Explore, Encounter, Connect |
| Phase 4: Content Pages | 2–3 hari | Mobilisasi, Artikel |
| Phase 5: Kemitraan | 2–3 hari | Kemitraan + Kontak |
| Phase 6: Admin Portal | 5–7 hari | Login, Dashboard, semua modul CMS |
| Phase 7: Enhancement | 3–5 hari | Dark mode, i18n, SEO |
| Phase 8: Deployment | 2–3 hari | Docker, Nginx, SSL, CI/CD |
| **Total** | **~23–36 hari** | Website live |

---

*Dokumen ini akan diupdate setelah pertanyaan terbuka di Bagian 8 dijawab oleh tim ESM.*
