# Phase Plan — ESM Company Profile Website
# Rencana Pengerjaan Bertahap

**Total Estimasi:** 23–36 hari kerja  
**Methodology:** Sequential phases, setiap phase memiliki deliverable yang testable  
**Stack:** Next.js 15 + TypeScript + Tailwind CSS + Shadcn UI + PostgreSQL + Prisma + NextAuth.js

---

## Overview Phases

```
Phase 0: Setup & Infrastructure        (1–2 hari)
Phase 1: Foundation & Design System    (2–3 hari)
Phase 2: Core Public Pages             (3–5 hari)
Phase 3: Pelayanan Pages               (3–5 hari)
Phase 4: Content Pages                 (2–3 hari)
Phase 5: Kemitraan & Kontak            (2–3 hari)
Phase 6: Admin Portal (CMS)            (5–7 hari)
Phase 7: Enhancement (Dark Mode + i18n)(3–5 hari)
Phase 8: Deployment & Production       (2–3 hari)
```

---

## Phase 0: Setup & Infrastructure
**Estimasi:** 1–2 hari  
**Tujuan:** Scaffolding project, konfigurasi semua tools, siap mulai coding

### 0.1 Inisialisasi Project

```bash
# 1. Create Next.js project
pnpm create next-app@latest esm-company-profile \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# 2. Install core dependencies
pnpm add @prisma/client next-auth bcryptjs \
  react-hook-form zod @hookform/resolvers \
  next-themes next-intl \
  lucide-react clsx tailwind-merge class-variance-authority \
  @tiptap/react @tiptap/starter-kit @tiptap/extension-image \
  @tiptap/extension-link @tiptap/extension-youtube \
  embla-carousel-react date-fns slugify

# 3. Install dev dependencies
pnpm add -D prisma @types/bcryptjs

# 4. Init Prisma
pnpm prisma init

# 5. Init Shadcn UI
pnpm dlx shadcn@latest init
# Pilih: Default style, Slate base, CSS variables: yes
```

### 0.2 Konfigurasi Files

**Files yang dibuat/dimodifikasi:**

| File | Aksi | Konten |
|------|------|--------|
| `next.config.ts` | Modify | Tambah `output: 'standalone'`, next-intl plugin |
| `tailwind.config.ts` | Modify | ESM brand colors (primary maroon, gold accent), font config |
| `tsconfig.json` | Modify | Path aliases tambahan jika perlu |
| `.env.local` | Create | DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL |
| `.gitignore` | Modify | Tambah `.env*`, `public/uploads/*`, `!public/uploads/.gitkeep` |
| `src/lib/db.ts` | Create | Prisma client singleton |
| `src/lib/utils.ts` | Create | `cn()`, `formatDate()`, `generateSlug()`, `formatCurrency()` |
| `src/lib/constants/site.ts` | Create | Konstanta: nama site, tagline, URL, dsb. |
| `src/lib/constants/navigation.ts` | Create | Config link navbar |

### 0.3 Database Schema & Migrations

```bash
# 1. Tulis schema di prisma/schema.prisma (sesuai IMPLEMENTATION_PLAN.md)
# 2. Generate dan run migration
pnpm prisma migrate dev --name init

# 3. Generate Prisma client
pnpm prisma generate

# 4. Run seed
pnpm prisma db seed
```

### 0.4 Shadcn UI Components — Install Semua yang Dibutuhkan

```bash
pnpm dlx shadcn@latest add button card dialog input label select \
  textarea tabs accordion badge table toast sheet dropdown-menu \
  separator avatar skeleton form
```

### 0.5 Docker Setup (dev environment)

**Files yang dibuat:**

| File | Konten |
|------|--------|
| `docker-compose.yml` | PostgreSQL + Next.js services |
| `docker-compose.prod.yml` | Production overrides |
| `Dockerfile` | Multi-stage build (deps → builder → runner) |
| `nginx/nginx.conf` | Reverse proxy config |
| `public/uploads/.gitkeep` | Placeholder agar folder ter-commit |

### 0.6 Struktur Folder

```bash
# Buat semua folder yang diperlukan
mkdir -p src/components/{layout,ui,common,home,tentang,pelayanan,mobilisasi,artikel,kemitraan,admin}
mkdir -p src/{actions,hooks,types,lib/{validations,constants}}
mkdir -p messages
mkdir -p public/{images/{logo,illustrations,regions},uploads/{articles,events,team,testimonials,bulletins,misc}}
```

### ✅ Phase 0 Done When:
- [ ] `pnpm dev` berjalan tanpa error
- [ ] Database terhubung, migration berhasil
- [ ] Seed data berhasil dijalankan
- [ ] Halaman default Next.js bisa diakses di `localhost:3000`
- [ ] Shadcn UI components ter-install
- [ ] Docker Compose bisa `docker-compose up` dengan sukses

---

## Phase 1: Foundation & Design System
**Estimasi:** 2–3 hari  
**Tujuan:** Komponen layout global (Navbar, Footer), design system tokens, 404 page

### 1.1 Design System Tokens (`tailwind.config.ts`)

```typescript
// ESM Brand Colors
colors: {
  primary: {
    50:  "#FFF0F1",
    100: "#FFD6D9",
    200: "#FFB3B8",
    300: "#FF8089",
    400: "#FF4D5A",
    500: "#CC1A28",
    600: "#A31520",
    700: "#6B1420",  // main brand maroon-dark
    800: "#3D0A11",  // primary default
    900: "#1A0407",
  },
  accent: {
    300: "#F0D87A",
    400: "#E8C44A",
    500: "#C9A227",  // accent default (gold)
    600: "#A07E15",
    700: "#7A5F0E",
  },
  surface: {
    DEFAULT: "#FFFDFC",
    50: "#FFFFFF",
    100: "#FFFDFC",  // light background
    900: "#1A1A1A",  // dark surface
  }
}
```

### 1.2 Fonts Setup

```typescript
// src/app/layout.tsx
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",    // Display headings
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",       // Body text
})
```

### 1.3 Navbar (`src/components/layout/Navbar.tsx`)

**Fitur yang diimplementasikan:**
- Logo ESM kiri (image dari `/public/images/logo/`)
- Navigation links tengah dengan active state
- Dropdown "Pelayanan" (Strategi, Explore, Encounter, Connect)
- Kanan: `DarkModeToggle` (placeholder untuk Phase 7), `LanguageSwitcher` (placeholder untuk Phase 7), Button "Kemitraan"
- Sticky behavior dengan `useEffect` scroll listener → backdrop-blur
- Mobile: Sheet (drawer) dengan hamburger icon

**Komponen yang dibuat:**
- `src/components/layout/Navbar.tsx` — Desktop navbar
- `src/components/layout/NavbarMobile.tsx` — Mobile drawer
- `src/components/common/DarkModeToggle.tsx` — Toggle button (placeholder)
- `src/components/common/LanguageSwitcher.tsx` — ID/EN toggle (placeholder)

### 1.4 Footer (`src/components/layout/Footer.tsx`)

**Layout:** 4-column grid  
- Col 1: ESM Logo + tagline + social icons (IG, YouTube, dsb.)
- Col 2: Quick Links
- Col 3: Ladang Pelayanan
- Col 4: Kontak (email, WA, alamat) — data dari `SiteConfig` via Server Component
- Bottom bar: Copyright

### 1.5 Layouts

**Files yang dibuat:**

| File | Deskripsi |
|------|-----------|
| `src/app/[locale]/layout.tsx` | Public layout: `<Navbar>`, `{children}`, `<Footer>` |
| `src/app/(admin)/layout.tsx` | Admin layout: `<AdminSidebar>`, `{children}` |
| `src/components/layout/AdminSidebar.tsx` | Sidebar dengan nav links ke semua admin pages |

### 1.6 Custom 404 (`src/app/not-found.tsx`)

```tsx
// Design dari frame 15_Error_404_Page.png
// - Ilustrasi domba (SVG/PNG dari /public/images/illustrations/sheep.svg)
// - Headline: "Sedang Mencari Domba yang Hilang"
// - Subtext: "Halaman yang kamu cari tidak ditemukan"
// - Tombol: "Kembali ke Beranda"
// - Background: subtle pattern atau warna primer
```

### 1.7 Shared Common Components

| Komponen | File | Deskripsi |
|----------|------|-----------|
| `SectionHeading` | `src/components/common/SectionHeading.tsx` | Title + subtitle + optional divider line |
| `PageHero` | `src/components/common/PageHero.tsx` | Reusable dark hero banner untuk inner pages |
| `WhatsAppCTA` | `src/components/common/WhatsAppCTA.tsx` | Fixed WA button atau CTA section |
| `LoadingSpinner` | `src/components/common/LoadingSpinner.tsx` | Loading indicator |

### ✅ Phase 1 Done When:
- [ ] Navbar tampil dengan benar di desktop dan mobile
- [ ] Dropdown Pelayanan berfungsi
- [ ] Footer tampil dengan 4 kolom
- [ ] 404 page tampil ketika akses URL tidak valid
- [ ] Layout wraps children dengan benar
- [ ] Tailwind colors ESM berfungsi (class `text-primary-800`, `bg-accent-500`, dsb.)

---

## Phase 2: Core Public Pages — Homepage & Tentang Kami
**Estimasi:** 3–5 hari  
**Tujuan:** 2 halaman publik utama yang paling penting

### 2.1 Homepage (`src/app/[locale]/page.tsx`)

**Sections yang diimplementasikan (sesuai frame 04_Homepage.png):**

#### 2.1.1 HeroSection (`src/components/home/HeroSection.tsx`)
```
Layout: Full-height (100vh), dark background + gradient overlay
Content:
  - Headline: "Murid Muda Bermisi" (Playfair Display, bold, large)
  - Subheadline: tagline ESM
  - 2 CTA buttons: "Bergabung" (primary) + "Pelajari" (outline)
  - Background: hero image dengan dark overlay
  - Scroll indicator animation (optional)
Data: Static (hardcoded atau dari messages/id.json)
```

#### 2.1.2 WhyEsmSection (`src/components/home/WhyEsmSection.tsx`)
```
Layout: Light background, 2–4 value proposition cards
Cards: Icon + judul + deskripsi singkat
Data: Static content
```

#### 2.1.3 ArticleCalendarSection (`src/components/home/ArticleCalendarSection.tsx`)
```
Layout: 2-column split
Left: 3 artikel terbaru (fetch dari DB, status=PUBLISHED)
Right: Upcoming events/agenda (fetch dari DB, next 3 events)
Server Component: data fetching langsung di component
```

#### 2.1.4 FAQSection (`src/components/common/FAQAccordion.tsx`)
```
Data: Fetch dari DB (FAQ.page = GENERAL)
Component: Shadcn Accordion
Reusable: dipakai juga di halaman Kemitraan
```

#### 2.1.5 TestimonialSection (`src/components/home/TestimonialSection.tsx`)
```
Data: Fetch dari DB (Testimony.isActive = true)
Component: Embla Carousel
Auto-rotate: 5 detik
Dots + prev/next buttons
```

#### 2.1.6 KemitraanCTASection (`src/components/home/KemitraanCTASection.tsx`)
```
Layout: Full-width dark banner
Content: Headline + "Jadilah Mitra ESM" CTA button → /kemitraan
```

**Data Fetching Strategy:**
```typescript
// src/app/[locale]/page.tsx
// Server Component — semua data fetch di sini, pass ke Client Components

export default async function HomePage() {
  const [articles, events, testimonies, faqs] = await Promise.all([
    getPublishedArticles({ limit: 3 }),
    getUpcomingEvents({ limit: 3 }),
    getActiveTestimonies(),
    getFAQs({ page: "GENERAL" }),
  ])

  return (
    <>
      <HeroSection />
      <WhyEsmSection />
      <ArticleCalendarSection articles={articles} events={events} />
      <FAQAccordion items={faqs} />
      <TestimonialSection testimonies={testimonies} />
      <KemitraanCTASection />
    </>
  )
}
```

### 2.2 Tentang Kami (`src/app/[locale]/tentang-kami/page.tsx`)

**Sections (sesuai frame 05_Tentang_Kami.png):**

#### 2.2.1 HistorySection
```
Layout: Text-heavy, 2-column (text + image)
Content: Narasi sejarah "Lahir dari kegelisahan..."
Data: Static (hardcoded atau dari messages/)
```

#### 2.2.2 ValuesSection
```
Layout: Grid cards (3-4 columns)
Content: Nilai-nilai ESM (iman, komunitas, pengutusan, dsb.)
Data: Static
```

#### 2.2.3 OrgChartSection
```
Layout: Visual diagram struktur organisasi
Implementasi: Custom CSS flexbox tree ATAU static image
Data: Static (dari image atau hardcoded)
Note: Jika diagram interaktif dibutuhkan → P2 feature, Phase 2 pakai static image
```

#### 2.2.4 LogoIdentitySection
```
Layout: Brand guideline style
Content: Logo variations, penggunaan, warna brand
Data: Static images dari /public/images/logo/
```

#### 2.2.5 RegionMapSection
```
Layout: Peta Indonesia highlight Banten & Ternate
Implementasi: Static SVG Indonesia map ATAU embedded image
Data: Static
```

### ✅ Phase 2 Done When:
- [ ] Homepage tampil dengan semua 6 sections
- [ ] Data artikel, events, testimonial, FAQ ter-fetch dari DB
- [ ] Halaman Tentang Kami tampil dengan semua sections
- [ ] Responsive di mobile dan desktop
- [ ] Meta tags (title, description) sudah benar di kedua halaman

---

## Phase 3: Pelayanan Pages
**Estimasi:** 3–5 hari  
**Tujuan:** Halaman strategi utama + 3 halaman komunitas

### 3.1 Pelayanan/Strategi (`src/app/[locale]/pelayanan/page.tsx`)

**Sections (sesuai frame 06_Pelayanan_Strategi.png):**

#### 3.1.1 FrameworkDiagram
```
Layout: Visual diagram Hadir → Memuridkan → Mengutus
Implementasi: CSS/SVG custom diagram dengan 3 steps
Data: Static
```

#### 3.1.2 Strategy3CSection
```
3 cards: Communion, Community, Commission
Layout: Horizontal cards dengan icon dan deskripsi
Data: Static
```

#### 3.1.3 LadangCTACards
```
3 CTA cards besar: Explore, Encounter, Connect
Masing-masing: cover image + nama + deskripsi singkat + tombol "Lihat"
Link ke: /pelayanan/explore, /pelayanan/encounter, /pelayanan/connect
```

### 3.2 Shared Pelayanan Components

```typescript
// src/components/pelayanan/CommunityHero.tsx
interface CommunityHeroProps {
  title: string         // "Explore Community"
  subtitle: string      // "Komunitas untuk Siswa SMA"
  description: string
  coverImage: string
  accentColor: string   // warna accent per community (optional)
}

// src/components/pelayanan/ProgramAgendaTabs.tsx
// Tab: "Program" | "Agenda"
// Program: grid cards static
// Agenda: list events dari DB filter by community

// src/components/pelayanan/TeamGrid.tsx
// Fetch team members dari DB by community
// Grid 3-4 columns: foto + nama + role + WA link (optional)
```

### 3.3 Explore Community (`src/app/[locale]/pelayanan/explore/page.tsx`)

**Sections (sesuai frame 07_Explore_Community.png):**
1. `CommunityHero` — Hero dengan visual Explore
2. `ProgramAgendaTabs` — Tab Program & Agenda (data: events filter community=EXPLORE)
3. `TeamGrid` — Tim Explore (data: DB, community=EXPLORE)
4. `TestimonialSection` — Testimonial dari siswa (data: DB, community=EXPLORE)
5. `WhatsAppCTA` — CTA contact WA dengan nomor dari SiteConfig

### 3.4 Encounter Community (`src/app/[locale]/pelayanan/encounter/page.tsx`)

**Sections (sesuai frame 08_Encounter_Community.png):**
1. `CommunityHero` — Hero dengan visual Encounter
2. Regional Section — 2 wilayah: Banten + Ternate (cards dengan foto + deskripsi)
3. Program Grid — Foto dokumentasi kegiatan per wilayah
4. `TeamGrid` — Tim Encounter (data: DB, community=ENCOUNTER)
5. `WhatsAppCTA` — WA contact Encounter

**Regional Component:**
```typescript
// src/components/pelayanan/RegionalSection.tsx
// 2 cards: Banten region + Ternate region
// Masing-masing: foto, nama wilayah, deskripsi, jumlah anggota (optional)
// Data: Static (konten region tidak berubah sering)
```

### 3.5 Connect Community (`src/app/[locale]/pelayanan/connect/page.tsx`)

**Sections (sesuai frame 09_Connect_Community.png):**
1. `CommunityHero` — Hero komunitas alumni
2. MarketplaceImpact Section — 3 pilar (Ekonomi, Sosial, Rohani) sebagai cards
3. `ProgramAgendaTabs` — Program & Agenda Connect
4. `TeamGrid` — Tim Connect (data: DB, community=CONNECT)
5. Testimonial Alumni — Testimonials community=CONNECT
6. CTA Footer — Ajakan bergabung Connect

### ✅ Phase 3 Done When:
- [ ] Halaman /pelayanan tampil dengan diagram framework
- [ ] 3 community pages tampil masing-masing
- [ ] Team members ter-fetch dari DB sesuai community
- [ ] Events/agenda ter-filter sesuai community
- [ ] Responsive di semua ukuran layar

---

## Phase 4: Content Pages — Mobilisasi & Artikel
**Estimasi:** 2–3 hari  
**Tujuan:** Halaman kalender agenda dan halaman artikel/buletin

### 4.1 Mobilisasi & Agenda (`src/app/[locale]/mobilisasi/page.tsx`)

**Sections (sesuai frame 11_Mobilisasi_Agenda.png):**

#### 4.1.1 MasterCalendar
```typescript
// src/components/mobilisasi/MasterCalendar.tsx
// Tabs: "Tahunan" | "Explore" | "Encounter" | "Connect"
// Content per tab: list event cards dengan tanggal, judul, lokasi, community badge
// Data: fetch dari DB, group by community
```

#### 4.1.2 UpcomingEventsList
```typescript
// src/components/mobilisasi/UpcomingEventsList.tsx
// Daftar 5-10 upcoming events (startDate >= today)
// Filter: by community (dropdown)
// Card: tanggal besar + judul + lokasi + community badge + tombol detail (optional)
// Data: fetch dari DB, order by startDate ASC
```

#### 4.1.3 CollaborationSection
```
// Info kolaborasi/partnership event
// Static content atau dari SiteConfig
```

### 4.2 Artikel & Buletin (`src/app/[locale]/artikel/page.tsx`)

**Sections (sesuai frame 12_Artikel_Buletin.png):**

#### 4.2.1 ArticleCategoryTabs
```typescript
// Tab filter: "Semua" | "Devotional" | "Berita" | "Kesaksian" | "Refleksi" | "Misi"
// Client Component dengan URL search params untuk filter
// URL: /artikel?kategori=DEVOTIONAL
```

#### 4.2.2 FeaturedArticles (Editor's Picks)
```typescript
// 1-2 artikel featured (terbaru/paling penting)
// Card besar dengan cover image, judul, excerpt, tanggal
// Data: fetch 2 artikel terbaru published
```

#### 4.2.3 ArticleGrid
```typescript
// Grid 3 column (desktop), 2 (tablet), 1 (mobile)
// Article card: cover image + badge kategori + judul + excerpt + tanggal + "Baca selengkapnya"
// Pagination atau infinite scroll (pilih: pagination lebih simple untuk MVP)
// Data: fetch dari DB, filter by kategori (dari URL params)
```

#### 4.2.4 BuletinSection
```typescript
// List buletin PDF yang bisa didownload
// Card: judul buletin + edisi + tanggal + tombol Download PDF
// Data: fetch dari DB (Bulletin model)
```

#### 4.2.5 NewsletterCTA
```
// Banner: "Daftarkan email kamu untuk update terbaru"
// Form: email input + tombol daftar
// MVP: simpan email ke DB saja (tabel simple NewsletterSubscriber)
// Atau: bisa di-skip ke P2 jika belum ada email service
```

### 4.3 Artikel Detail (`src/app/[locale]/artikel/[slug]/page.tsx`)

```typescript
// generateStaticParams: pre-generate semua artikel slugs (ISR)
// generateMetadata: SEO per artikel (title, description, og:image)
// Content: render HTML dari article.content dengan Tailwind Typography (prose)
// Sidebar: related articles (sama kategori)
// Share: Social share buttons (Twitter, WhatsApp, copy link)
```

```bash
# Install Tailwind Typography untuk prose styling artikel
pnpm add @tailwindcss/typography
```

### ✅ Phase 4 Done When:
- [ ] Halaman mobilisasi dengan kalender dan upcoming events
- [ ] Filter event by community berfungsi
- [ ] Halaman artikel dengan grid dan filter kategori
- [ ] Artikel detail page dengan full content
- [ ] Buletin list dengan link download PDF
- [ ] generateMetadata berfungsi untuk artikel detail

---

## Phase 5: Kemitraan & Kontak
**Estimasi:** 2–3 hari  
**Tujuan:** Halaman partnership utama dengan form donasi dan contact hub

### 5.1 Kemitraan Page (`src/app/[locale]/kemitraan/page.tsx`)

**Sections (sesuai frame 10_Kemitraan_Contact_Us.png):**

#### 5.1.1 MitraTypeCards
```typescript
// 3 cards besar:
// 1. Mitra Doa — icon + deskripsi + CTA (WA untuk info doa)
// 2. Mitra Dukungan Finansial — icon + deskripsi + scroll ke form donasi
// 3. Mitra Partisipasi Aktif — icon + deskripsi + CTA (kontak langsung)
```

#### 5.1.2 DonationForm
```typescript
// src/components/kemitraan/DonationForm.tsx
// Client Component (React Hook Form)

// Fields:
// - Radio: "Sekali Beri" | "Mitra Bulanan"
// - Nominal: preset buttons [50K, 100K, 250K, 500K, 1JT] + input manual
// - Nama lengkap (required)
// - Email (required, type="email")
// - Nomor HP (optional)
// - Pesan (optional, maxlength 500)
// - Checkbox agree

// Validation (Zod schema):
// - amount: min 10000 (Rp 10.000)
// - name: min 3 chars
// - email: valid email format

// Submit: Server Action submitDonation()
// Success state: tampilkan info rekening bank + instruksi transfer
// Error state: tampilkan error message inline
```

#### 5.1.3 BankInfoSection
```typescript
// Data dari SiteConfig key="bank_info"
// Tampil: Nama Bank, Nomor Rekening, Atas Nama
// Copy button untuk nomor rekening
// QRIS image (jika ada)
```

#### 5.1.4 ContactHub
```typescript
// Grid kontak:
// - WhatsApp: nomor dari SiteConfig
// - Email: dari SiteConfig
// - Alamat: dari SiteConfig
// Google Maps embed: iframe dari SiteConfig key="maps_embed_url"
```

#### 5.1.5 FAQAccordion (di halaman Kemitraan)
```typescript
// Gunakan komponen yang sama dari Phase 2
// Data: FAQ.page = "KEMITRAAN"
```

### 5.2 Server Action — submitDonation

```typescript
// src/actions/donation.ts
"use server"

export async function submitDonation(prevState: any, formData: FormData) {
  try {
    const data = donationSchema.parse(Object.fromEntries(formData))
    
    const donation = await prisma.donationRecord.create({
      data: {
        donorName: data.name,
        donorEmail: data.email,
        donorPhone: data.phone,
        amount: data.amount,
        type: data.type,
        message: data.message,
        status: "PENDING",
      }
    })

    return { success: true, donationId: donation.id }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors }
    }
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." }
  }
}
```

### ✅ Phase 5 Done When:
- [ ] 3 mitra type cards tampil
- [ ] Form donasi berfungsi dengan validasi
- [ ] Data submit tersimpan ke DB sebagai DonationRecord
- [ ] Success state tampilkan info transfer
- [ ] Bank info dan QRIS tampil (dari SiteConfig)
- [ ] Google Maps embed berfungsi
- [ ] FAQ Kemitraan tampil

---

## Phase 6: Admin Portal (CMS)
**Estimasi:** 5–7 hari  
**Tujuan:** Seluruh sistem manajemen konten internal

### 6.1 Admin Auth Setup

```typescript
// src/lib/auth.ts — NextAuth config (sudah dari Phase 0)
// src/middleware.ts — Proteksi /admin/* routes

// Test:
// 1. Akses /admin/artikel → redirect ke /admin/login
// 2. Login dengan kredensial dari seed
// 3. Redirect ke /admin setelah login
// 4. Logout berfungsi
```

### 6.2 Admin Login Page (`src/app/(admin)/admin/login/page.tsx`)

```
Design (sesuai frame 13_Admin_Login.png):
- Centered card layout
- Logo ESM + "ESM Internal System"
- Form: Email + Password (dengan show/hide)
- Tombol: "Masuk"
- Label di bawah: "2-Step Access | CMS Ready | Admin Only"
- Error message inline jika login gagal
```

### 6.3 Admin Layout (`src/app/(admin)/layout.tsx`)

```typescript
// Sidebar dengan nav links:
// - Dashboard Overview (/admin)
// - Mitra (/admin/mitra)
// - Keuangan (/admin/keuangan)
// - Event & Agenda (/admin/event)
// - Artikel & Buletin (/admin/artikel)
// - [Logout button di bottom]

// Header: "ESM Admin" + nama user dari session + logout

// AdminSidebar: src/components/admin/AdminSidebar.tsx
// Responsive: collapsible sidebar on mobile
```

### 6.4 Admin Dashboard Overview (`src/app/(admin)/admin/page.tsx`)

**Sections (sesuai frame 18_Admin_Overview_Mitra.png):**

```typescript
// KPI Cards (StatCard component):
// - Total Mitra Aktif (count dari DonationRecord type=MITRA_BULANAN, status=CONFIRMED)
// - Total Donasi Bulan Ini (sum dari FinancialTransaction type=PEMASUKAN bulan ini)
// - Artikel Publish (count Article status=PUBLISHED)
// - Event Mendatang (count Event startDate >= today)

// Recent Activity: 10 transaksi/donasi terbaru
// Quick Links: ke masing-masing admin section
```

### 6.5 Admin Mitra (`src/app/(admin)/admin/mitra/page.tsx`)

```typescript
// Table daftar donasi/mitra:
// Columns: Nama, Email, Tipe (Sekali Beri/Bulanan), Nominal, Tanggal, Status
// Actions per row: Konfirmasi / Batalkan / Detail
// Filter: by status (PENDING/CONFIRMED/CANCELLED), by tipe
// Search: by nama/email
// Export CSV button

// Server Action: confirmDonation(id), cancelDonation(id)
// Revalidate setelah setiap action
```

### 6.6 Admin Keuangan (`src/app/(admin)/admin/keuangan/page.tsx`)

**Sections (sesuai frame 14_Admin_Donasi_Keuangan.png):**

```typescript
// KPI Cards:
// - Kas Pemasukan (sum PEMASUKAN bulan ini)
// - Pengeluaran (sum PENGELUARAN bulan ini)
// - Saldo Bersih (Pemasukan - Pengeluaran)

// Form Tambah Transaksi (TransactionForm):
// Fields: Tipe (PEMASUKAN/PENGELUARAN), Nominal, Kategori, Deskripsi, Tanggal
// Validation: Zod
// Submit: Server Action createTransaction()

// Log Keuangan Table:
// Columns: Tanggal, Tipe, Kategori, Deskripsi, Nominal
// Row color: hijau untuk PEMASUKAN, merah untuk PENGELUARAN
// Filter: by periode (bulan/tahun), by tipe
// Pagination

// Export: tombol export CSV/PDF laporan keuangan
```

### 6.7 Admin Event & Agenda (`src/app/(admin)/admin/event/page.tsx`)

**Sections (sesuai frame 16_Admin_Event_Agenda.png):**

```typescript
// Form Tambah Event (EventForm):
// Fields:
// - Judul event (required)
// - Komunitas (EXPLORE/ENCOUNTER/CONNECT/ALL)
// - Tanggal mulai + Tanggal selesai (DatePicker)
// - Lokasi (text)
// - Deskripsi (textarea)
// - Cover image (ImageUploader)
// - Status (DRAFT/PUBLISHED)
// - Is Collaboration (checkbox)

// Upcoming Events Table:
// Columns: Tanggal, Judul, Komunitas, Lokasi, Status, Actions
// Actions: Edit, Toggle Publish, Delete (dengan confirm dialog)
// Filter: by komunitas, by status

// Edit: /admin/event/[id] dengan form yang sama, pre-filled
```

### 6.8 Admin Artikel & Buletin (`src/app/(admin)/admin/artikel/page.tsx`)

**Sections (sesuai frame 17_Admin_Artikel_Buletin.png):**

```typescript
// Tab: "Artikel" | "Buletin"

// === ARTIKEL TAB ===
// List artikel dengan: judul, kategori, status, tanggal, actions
// Tombol "+ Artikel Baru" → /admin/artikel/new

// New/Edit Artikel page:
// - Judul (input)
// - Kategori (select)
// - Excerpt (textarea, max 200 chars)
// - Cover image (ImageUploader)
// - Content (ArticleEditor — Tiptap)
// - Status (DRAFT/PUBLISHED toggle)
// - Preview button
// - Save button

// === BULETIN TAB ===
// List buletin dengan: judul, edisi, status, tanggal, actions
// Tombol "+ Upload Buletin"
// Upload form:
// - Judul buletin
// - Edisi (e.g. "Edisi 01/2025")
// - Deskripsi (optional)
// - File PDF (FileUploader, max 10MB)
// - Status
```

### 6.9 Reusable Admin Components

| Komponen | File | Deskripsi |
|----------|------|-----------|
| `StatCard` | `src/components/admin/StatCard.tsx` | KPI metric card dengan icon, label, nilai, trend |
| `DataTable` | `src/components/admin/DataTable.tsx` | Generic table dengan sort, filter, pagination |
| `ArticleEditor` | `src/components/admin/ArticleEditor.tsx` | Tiptap rich text editor |
| `ImageUploader` | `src/components/admin/ImageUploader.tsx` | Drag-n-drop image upload dengan preview |
| `FileUploader` | `src/components/admin/FileUploader.tsx` | File upload (PDF) dengan progress bar |
| `ConfirmDialog` | `src/components/admin/ConfirmDialog.tsx` | Delete confirmation dialog |

### ✅ Phase 6 Done When:
- [ ] Login admin berfungsi dengan benar
- [ ] Semua admin routes ter-proteksi
- [ ] Dashboard overview tampil dengan data real
- [ ] Mitra management: view, konfirmasi, batalkan donasi
- [ ] Keuangan: tambah transaksi, tampil log, hitung saldo
- [ ] Event: tambah, edit, hapus, toggle publish
- [ ] Artikel: tambah dengan rich text editor, upload gambar, publish
- [ ] Buletin: upload PDF, manage daftar buletin
- [ ] File upload berfungsi dan tersimpan ke /public/uploads/

---

## Phase 7: Enhancement — Dark Mode & Bilingual
**Estimasi:** 3–5 hari  
**Tujuan:** Dark mode dan internasionalisasi ID/EN

### 7.1 Dark Mode Implementation

#### 7.1.1 Setup next-themes
```tsx
// src/app/layout.tsx — wrap dengan ThemeProvider
// DarkModeToggle.tsx — toggle yang sudah dibuat di Phase 1, sekarang diaktifkan
```

#### 7.1.2 Audit Semua Komponen
```
Setiap komponen harus punya dark variant:
- Background: bg-white dark:bg-gray-900
- Text: text-gray-900 dark:text-gray-100
- Border: border-gray-200 dark:border-gray-700
- Card: bg-white dark:bg-gray-800
- Primary button: (sudah menggunakan primary color, cek kontras di dark mode)
- Navbar: bg-white/90 dark:bg-gray-900/90 (dengan blur)
- Footer: bg-primary-800 (gelap, sama untuk dark dan light mode)
```

#### 7.1.3 Checklist Komponen untuk Dark Mode

| Komponen | Status |
|----------|--------|
| Navbar | [ ] |
| Footer | [ ] |
| HeroSection | [ ] |
| Cards (semua) | [ ] |
| Form inputs | [ ] |
| Accordion | [ ] |
| Table (admin) | [ ] |
| Dialog/Modal | [ ] |
| Toast notifications | [ ] |
| ArticleEditor | [ ] |

### 7.2 Bilingual (ID/EN) dengan next-intl

#### 7.2.1 Setup next-intl
```typescript
// src/i18n.ts — config file
// src/middleware.ts — tambah locale middleware
// src/app/[locale]/layout.tsx — wrap NextIntlClientProvider

// Routing:
// - /id/... → Bahasa Indonesia (default)
// - /en/... → English
// - / → redirect ke /id/ (default locale)
```

#### 7.2.2 Ekstrak Semua Teks UI

```json
// messages/id.json — Semua teks dalam Bahasa Indonesia
// messages/en.json — Semua teks dalam English

// Priority translations:
// 1. Navbar links
// 2. Hero headlines per halaman
// 3. CTA buttons
// 4. Form labels dan error messages
// 5. Footer links
// 6. Section titles
// 7. 404 page
```

#### 7.2.3 LanguageSwitcher Activation
```typescript
// src/components/common/LanguageSwitcher.tsx
// - Toggle button di Navbar
// - Mempertahankan current path saat ganti bahasa
// - Cookie untuk persistent preference
// - usePathname + useRouter untuk navigation
```

#### 7.2.4 Catatan: Konten CMS Tidak Diterjemahkan
```
Artikel, event, tim member → tetap dalam bahasa Indonesia
Hanya UI text yang diterjemahkan (labels, buttons, headings, dsb.)
```

### 7.3 SEO Final Optimization

```typescript
// 7.3.1 Sitemap dengan locale support
// - /id/... dan /en/... semua di sitemap
// - hreflang tags untuk alternate languages

// 7.3.2 JSON-LD Structured Data
// - WebSite schema di root layout
// - Article schema di /artikel/[slug]
// - Event schema di /mobilisasi (untuk tiap event)
// - Organization schema di /tentang-kami

// 7.3.3 Open Graph Images
// - Default OG image: /public/images/og-default.png (1200x630px)
// - Per-article OG: cover image artikel

// 7.3.4 robots.txt
// - Disallow: /admin/*
// - Sitemap: https://esm.or.id/sitemap.xml
```

### ✅ Phase 7 Done When:
- [ ] Dark mode toggle berfungsi dan persistent
- [ ] Semua komponen tampil baik di dark mode
- [ ] URL /id/ dan /en/ bekerja
- [ ] Language switcher berfungsi tanpa reload penuh
- [ ] Translation files lengkap untuk semua UI text
- [ ] Sitemap.xml dan robots.txt accessible
- [ ] JSON-LD structured data di halaman utama

---

## Phase 8: Deployment & Production
**Estimasi:** 2–3 hari  
**Tujuan:** Website live di VPS dengan SSL dan CI/CD

### 8.1 Pre-Deployment Checklist

```bash
# 1. Build test
pnpm run build
# → Pastikan 0 TypeScript errors
# → Pastikan 0 ESLint errors

# 2. Database migration production
DATABASE_URL="production_url" pnpm prisma migrate deploy

# 3. Environment variables lengkap
# □ DATABASE_URL
# □ NEXTAUTH_SECRET (openssl rand -base64 32)
# □ NEXTAUTH_URL (https://esm.or.id)
# □ NEXT_PUBLIC_APP_URL

# 4. Static assets ready
# □ Logo ESM (SVG + PNG)
# □ Favicon
# □ Default OG image
# □ Ilustrasi 404

# 5. Seed production data
DATABASE_URL="production_url" pnpm prisma db seed
```

### 8.2 VPS Setup

```bash
# Di VPS Ubuntu 22.04

# 1. Install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx certbot python3-certbot-nginx

# 2. Install Docker + Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# 3. Clone repository
git clone <repo_url> /var/www/esm
cd /var/www/esm

# 4. Create .env.production
cp .env.example .env.production
# Edit dengan nilai production

# 5. Build dan start containers
docker-compose -f docker-compose.prod.yml up -d --build

# 6. Run migrations di container
docker exec esm_nextjs pnpm prisma migrate deploy

# 7. Run seed (pertama kali saja)
docker exec esm_nextjs pnpm prisma db seed
```

### 8.3 Nginx & SSL Setup

```bash
# 1. Setup Nginx config
sudo cp nginx/nginx.conf /etc/nginx/sites-available/esm
sudo ln -s /etc/nginx/sites-available/esm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 2. Obtain SSL certificate
sudo certbot --nginx -d esm.or.id -d www.esm.or.id

# 3. Auto-renew SSL (Certbot sets this up automatically)
sudo systemctl status certbot.timer

# 4. Test HTTPS
curl -I https://esm.or.id
```

### 8.4 CI/CD Setup (Simple Git-based)

```bash
# Di VPS: setup deploy script
cat > /var/www/esm/deploy.sh << 'EOF'
#!/bin/bash
set -e

echo "=== ESM Deploy Script ==="
cd /var/www/esm

echo "Pulling latest code..."
git pull origin main

echo "Building and restarting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "Running migrations..."
docker exec esm_nextjs pnpm prisma migrate deploy

echo "=== Deploy complete! ==="
EOF

chmod +x /var/www/esm/deploy.sh

# Deploy dengan:
ssh user@vps "cd /var/www/esm && ./deploy.sh"
```

### 8.5 Database Backup

```bash
# Setup daily backup cron
cat > /etc/cron.daily/esm-backup << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/esm"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Dump database
docker exec esm_postgres pg_dump -U esm_user esm_db > $BACKUP_DIR/db_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete

echo "Backup completed: db_$DATE.sql"
EOF

chmod +x /etc/cron.daily/esm-backup
```

### 8.6 Monitoring

```bash
# 1. Check container status
docker-compose -f docker-compose.prod.yml ps

# 2. View logs
docker logs esm_nextjs --tail 50
docker logs esm_postgres --tail 20

# 3. Health check endpoint (tambahkan di Next.js)
# GET /api/health → { status: "ok", timestamp: "..." }
```

### 8.7 Post-Launch Checklist

- [ ] Website accessible di https://esm.or.id
- [ ] SSL/HTTPS berfungsi (green lock)
- [ ] www redirect ke non-www (atau sebaliknya)
- [ ] Semua halaman publik bisa diakses
- [ ] Admin login berfungsi di production
- [ ] Form donasi submit dan tersimpan di DB production
- [ ] File upload berfungsi dan persistent di Docker volume
- [ ] Google Search Console — submit sitemap
- [ ] Lighthouse score ≥ 85 (Performance, SEO, Accessibility)
- [ ] Test di mobile (Chrome DevTools + real device)

### ✅ Phase 8 Done When:
- [ ] Website live dan accessible via HTTPS
- [ ] Admin portal berfungsi di production
- [ ] SSL auto-renew aktif
- [ ] Backup database berjalan
- [ ] Deploy script berfungsi
- [ ] Semua checklist post-launch ✅

---

## Summary Timeline

| Phase | Nama | Estimasi | Dependensi |
|-------|------|----------|-----------|
| **Phase 0** | Setup & Infrastructure | 1–2 hari | — |
| **Phase 1** | Foundation & Design System | 2–3 hari | Phase 0 |
| **Phase 2** | Core Public Pages | 3–5 hari | Phase 1 |
| **Phase 3** | Pelayanan Pages | 3–5 hari | Phase 1 |
| **Phase 4** | Content Pages | 2–3 hari | Phase 1, Phase 3 partial |
| **Phase 5** | Kemitraan & Kontak | 2–3 hari | Phase 1 |
| **Phase 6** | Admin Portal (CMS) | 5–7 hari | Phase 0, Phase 1 |
| **Phase 7** | Dark Mode & i18n | 3–5 hari | Phase 2–5 done |
| **Phase 8** | Deployment | 2–3 hari | Phase 7 done |
| **TOTAL** | | **23–36 hari** | |

> **Catatan:** Phase 2, 3, 4, 5 bisa dikerjakan secara paralel setelah Phase 1 selesai.

---

## Potential Risks & Mitigation

| Risk | Probabilitas | Dampak | Mitigation |
|------|-------------|--------|-----------|
| Konten belum tersedia dari tim ESM | Tinggi | Tinggi | Gunakan placeholder content, buat CMS dulu |
| Pertanyaan open (frame 03) belum dijawab | Sedang | Sedang | Implementasi dengan asumsi, siap refactor |
| Tiptap editor complexity | Sedang | Rendah | Fallback ke markdown textarea jika perlu |
| Docker networking issues di VPS | Rendah | Tinggi | Test docker-compose locally dulu |
| SSL certificate renewal failure | Rendah | Tinggi | Setup monitoring + certbot.timer |
| File upload volume tidak persistent | Rendah | Tinggi | Test Docker volume mount sebelum launch |

---

*Phase Plan ini harus divalidasi dengan tim ESM, terutama terkait open questions di PRD sebelum implementasi Phase 2 ke atas.*
