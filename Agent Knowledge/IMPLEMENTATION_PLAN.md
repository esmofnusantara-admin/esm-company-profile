# Implementation Plan
# ESM Company Profile Website

**Versi:** 1.0  
**Tech Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Shadcn UI + PostgreSQL + Prisma + NextAuth.js  
**Deployment:** VPS + Docker + Docker Compose + Nginx + Certbot

---

## 1. Project Directory Structure

```
esm-company-profile/
├── .env.local                        # Environment variables (dev)
├── .env.production                   # Environment variables (prod)
├── .gitignore
├── docker-compose.yml                # Docker orchestration
├── docker-compose.prod.yml           # Production Docker config
├── Dockerfile                        # Next.js container
├── nginx/
│   ├── nginx.conf                    # Nginx reverse proxy config
│   └── ssl/                          # SSL certs (managed by Certbot)
├── next.config.ts                    # Next.js config (output: standalone)
├── tailwind.config.ts                # Tailwind config + design tokens
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Auto-generated migrations
│   └── seed.ts                       # Seed data for development
├── messages/                         # i18n translation files (next-intl)
│   ├── id.json                       # Bahasa Indonesia
│   └── en.json                       # English
├── public/
│   ├── uploads/                      # User-uploaded media (Docker volume)
│   │   ├── articles/                 # Article cover images
│   │   ├── events/                   # Event cover images
│   │   ├── team/                     # Team member photos
│   │   ├── testimonials/             # Testimonial photos
│   │   ├── bulletins/                # PDF buletin files
│   │   └── misc/                     # Other uploads (QRIS, logo, dsb.)
│   ├── images/                       # Static images (committed ke git)
│   │   ├── logo/                     # ESM logos (SVG, PNG)
│   │   ├── illustrations/            # Static illustrations (404 sheep, dsb.)
│   │   └── regions/                  # Peta wilayah, foto wilayah
│   ├── fonts/                        # Custom fonts (jika self-hosted)
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json                 # PWA manifest (optional)
└── src/
    ├── app/                          # Next.js App Router
    │   ├── layout.tsx                # Root layout (HTML, fonts, providers)
    │   ├── not-found.tsx             # Custom 404 page
    │   ├── sitemap.ts                # Auto-generated sitemap.xml
    │   ├── robots.ts                 # robots.txt generation
    │   │
    │   ├── [locale]/                 # i18n locale routing (next-intl)
    │   │   ├── layout.tsx            # Locale layout (NextIntlClientProvider)
    │   │   ├── page.tsx              # Homepage (/)
    │   │   │
    │   │   ├── tentang-kami/
    │   │   │   └── page.tsx          # /tentang-kami
    │   │   │
    │   │   ├── pelayanan/
    │   │   │   ├── page.tsx          # /pelayanan (Strategi overview)
    │   │   │   ├── explore/
    │   │   │   │   └── page.tsx      # /pelayanan/explore
    │   │   │   ├── encounter/
    │   │   │   │   └── page.tsx      # /pelayanan/encounter
    │   │   │   └── connect/
    │   │   │       └── page.tsx      # /pelayanan/connect
    │   │   │
    │   │   ├── mobilisasi/
    │   │   │   └── page.tsx          # /mobilisasi
    │   │   │
    │   │   ├── artikel/
    │   │   │   ├── page.tsx          # /artikel (listing)
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx      # /artikel/[slug] (detail)
    │   │   │
    │   │   └── kemitraan/
    │   │       └── page.tsx          # /kemitraan
    │   │
    │   ├── (admin)/                  # Admin route group (protected)
    │   │   ├── layout.tsx            # Admin layout (sidebar, header)
    │   │   ├── admin/
    │   │   │   ├── login/
    │   │   │   │   └── page.tsx      # /admin/login
    │   │   │   ├── page.tsx          # /admin (dashboard overview)
    │   │   │   ├── mitra/
    │   │   │   │   └── page.tsx      # /admin/mitra
    │   │   │   ├── keuangan/
    │   │   │   │   └── page.tsx      # /admin/keuangan
    │   │   │   ├── event/
    │   │   │   │   ├── page.tsx      # /admin/event (list)
    │   │   │   │   ├── new/
    │   │   │   │   │   └── page.tsx  # /admin/event/new
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx  # /admin/event/[id] (edit)
    │   │   │   └── artikel/
    │   │   │       ├── page.tsx      # /admin/artikel (list)
    │   │   │       ├── new/
    │   │   │       │   └── page.tsx  # /admin/artikel/new
    │   │   │       └── [id]/
    │   │   │           └── page.tsx  # /admin/artikel/[id] (edit)
    │   │
    │   └── api/
    │       ├── auth/
    │       │   └── [...nextauth]/
    │       │       └── route.ts      # NextAuth.js handler
    │       └── upload/
    │           └── route.ts          # File upload endpoint
    │
    ├── components/                   # Shared UI components
    │   ├── layout/
    │   │   ├── Navbar.tsx            # Sticky top navbar
    │   │   ├── NavbarMobile.tsx      # Mobile hamburger menu
    │   │   ├── Footer.tsx            # Site footer
    │   │   └── AdminSidebar.tsx      # Admin sidebar navigation
    │   │
    │   ├── ui/                       # Shadcn UI components (auto-generated)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── select.tsx
    │   │   ├── textarea.tsx
    │   │   ├── tabs.tsx
    │   │   ├── accordion.tsx
    │   │   ├── badge.tsx
    │   │   ├── table.tsx
    │   │   ├── toast.tsx
    │   │   └── ...                   # Lainnya sesuai kebutuhan
    │   │
    │   ├── common/                   # Shared non-layout components
    │   │   ├── SectionHeading.tsx    # Reusable section title + subtitle
    │   │   ├── ImageCard.tsx         # Reusable image + content card
    │   │   ├── TestimonialCarousel.tsx # Auto-rotating testimonials
    │   │   ├── FAQAccordion.tsx      # FAQ accordion component
    │   │   ├── LanguageSwitcher.tsx  # ID/EN toggle
    │   │   ├── DarkModeToggle.tsx    # Light/dark mode toggle
    │   │   ├── WhatsAppCTA.tsx       # WhatsApp contact button
    │   │   ├── PageHero.tsx          # Reusable page hero banner
    │   │   └── LoadingSpinner.tsx    # Loading state
    │   │
    │   ├── home/                     # Homepage-specific components
    │   │   ├── HeroSection.tsx
    │   │   ├── WhyEsmSection.tsx
    │   │   ├── ArticleCalendarSection.tsx
    │   │   ├── TestimonialSection.tsx
    │   │   └── KemitraanCTASection.tsx
    │   │
    │   ├── tentang/                  # Tentang Kami components
    │   │   ├── HistorySection.tsx
    │   │   ├── ValuesSection.tsx
    │   │   ├── OrgChartSection.tsx
    │   │   ├── LogoIdentitySection.tsx
    │   │   └── RegionMapSection.tsx
    │   │
    │   ├── pelayanan/                # Pelayanan page components
    │   │   ├── FrameworkDiagram.tsx
    │   │   ├── Strategy3CSection.tsx
    │   │   ├── LadangCTACards.tsx
    │   │   ├── CommunityHero.tsx     # Shared hero for Explore/Encounter/Connect
    │   │   ├── ProgramAgendaTabs.tsx # Shared tabs component
    │   │   └── TeamGrid.tsx          # Shared team member grid
    │   │
    │   ├── mobilisasi/               # Mobilisasi page components
    │   │   ├── MasterCalendar.tsx
    │   │   ├── UpcomingEventsList.tsx
    │   │   └── CollaborationSection.tsx
    │   │
    │   ├── artikel/                  # Artikel page components
    │   │   ├── ArticleCategoryTabs.tsx
    │   │   ├── FeaturedArticleCard.tsx
    │   │   ├── ArticleGrid.tsx
    │   │   ├── ArticleCard.tsx
    │   │   ├── BuletinDownloadCard.tsx
    │   │   └── NewsletterCTA.tsx
    │   │
    │   ├── kemitraan/                # Kemitraan page components
    │   │   ├── MitraTypeCards.tsx
    │   │   ├── DonationForm.tsx
    │   │   ├── BankInfoSection.tsx
    │   │   ├── QRISSection.tsx
    │   │   ├── ContactHub.tsx
    │   │   └── MapsEmbed.tsx
    │   │
    │   └── admin/                    # Admin-specific components
    │       ├── StatCard.tsx          # KPI metric card
    │       ├── DataTable.tsx         # Reusable data table
    │       ├── TransactionForm.tsx   # Form record keuangan
    │       ├── EventForm.tsx         # Form tambah/edit event
    │       ├── ArticleEditor.tsx     # Tiptap rich text editor
    │       ├── FileUploader.tsx      # Drag-n-drop file upload
    │       └── ImageUploader.tsx     # Image upload with preview
    │
    ├── lib/                          # Utility libraries & helpers
    │   ├── auth.ts                   # NextAuth.js config
    │   ├── db.ts                     # Prisma client singleton
    │   ├── upload.ts                 # File upload utilities
    │   ├── utils.ts                  # General utility functions (cn, formatDate, dsb.)
    │   ├── validations/              # Zod schemas
    │   │   ├── auth.ts               # Login form schema
    │   │   ├── article.ts            # Article form schema
    │   │   ├── event.ts              # Event form schema
    │   │   ├── donation.ts           # Donation form schema
    │   │   └── transaction.ts        # Transaction form schema
    │   └── constants/
    │       ├── navigation.ts         # Nav links config
    │       ├── communities.ts        # Explore/Encounter/Connect static data
    │       └── site.ts               # Site-wide constants (name, tagline, dsb.)
    │
    ├── actions/                      # Next.js Server Actions
    │   ├── auth.ts                   # Login/logout actions
    │   ├── article.ts                # CRUD artikel
    │   ├── event.ts                  # CRUD event
    │   ├── donation.ts               # Create donation record
    │   ├── transaction.ts            # CRUD transaksi keuangan
    │   ├── upload.ts                 # File upload action
    │   └── testimonial.ts            # CRUD testimonial
    │
    ├── hooks/                        # Custom React hooks
    │   ├── useTheme.ts               # Dark mode hook
    │   └── useLocale.ts              # Active locale hook
    │
    ├── middleware.ts                 # NextAuth middleware (protects /admin/*)
    │
    └── types/                        # TypeScript type definitions
        ├── index.ts                  # Re-exports
        ├── article.ts
        ├── event.ts
        ├── donation.ts
        └── auth.ts
```

---

## 2. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// =====================
// AUTH
// =====================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // bcrypt hashed
  name          String
  role          UserRole  @default(CONTENT_ADMIN)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("users")
}

enum UserRole {
  SUPER_ADMIN
  CONTENT_ADMIN
  FINANCE_ADMIN
}

// =====================
// CONTENT
// =====================

model Article {
  id          String          @id @default(cuid())
  title       String
  slug        String          @unique
  excerpt     String          @db.Text
  content     String          @db.Text     // HTML dari Tiptap
  coverImage  String?         // path: /uploads/articles/filename.jpg
  category    ArticleCategory
  status      PublishStatus   @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([slug])
  @@index([status, publishedAt])
  @@map("articles")
}

enum ArticleCategory {
  DEVOTIONAL       // Renungan
  BERITA           // Berita & Informasi
  KESAKSIAN        // Kesaksian
  REFLEKSI         // Refleksi & Opini
  MISI             // Misi & Pelayanan
  LAINNYA
}

model Bulletin {
  id          String        @id @default(cuid())
  title       String
  description String?       @db.Text
  fileUrl     String        // path: /uploads/bulletins/filename.pdf
  edition     String?       // e.g. "Edisi 01/2025"
  status      PublishStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@map("bulletins")
}

model Event {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  description String        @db.Text
  coverImage  String?       // path: /uploads/events/filename.jpg
  community   Community?    // null = all communities
  location    String?
  locationUrl String?       // Google Maps URL
  startDate   DateTime
  endDate     DateTime?
  status      PublishStatus @default(DRAFT)
  isCollaboration Boolean   @default(false)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([startDate])
  @@index([community])
  @@map("events")
}

enum Community {
  EXPLORE
  ENCOUNTER
  CONNECT
  ALL
}

model TeamMember {
  id          String     @id @default(cuid())
  name        String
  role        String     // "Koordinator", "Tim Worship", dsb.
  community   Community
  photo       String?    // path: /uploads/team/filename.jpg
  bio         String?
  whatsapp    String?    // phone number for WA link
  sortOrder   Int        @default(0)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("team_members")
}

model Testimony {
  id          String     @id @default(cuid())
  name        String
  role        String?    // "Mahasiswa UPH", "Alumni 2019", dsb.
  community   Community?
  quote       String     @db.Text
  photo       String?    // path: /uploads/testimonials/filename.jpg
  sortOrder   Int        @default(0)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("testimonies")
}

model FAQ {
  id          String     @id @default(cuid())
  question    String
  answer      String     @db.Text
  page        FAQPage    @default(GENERAL)
  sortOrder   Int        @default(0)
  isActive    Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("faqs")
}

enum FAQPage {
  GENERAL       // Homepage
  KEMITRAAN     // Kemitraan page
}

// =====================
// KEMITRAAN & KEUANGAN
// =====================

model DonationRecord {
  id              String       @id @default(cuid())
  donorName       String?
  donorEmail      String?
  donorPhone      String?
  amount          Decimal      @db.Decimal(15, 2)
  type            DonationType
  message         String?      @db.Text
  status          DonationStatus @default(PENDING)
  transferProof   String?      // path: /uploads/misc/proof_*.jpg (optional)
  confirmedAt     DateTime?
  confirmedBy     String?      // admin user id
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([status])
  @@index([createdAt])
  @@map("donation_records")
}

enum DonationType {
  SEKALI_BERI
  MITRA_BULANAN
}

enum DonationStatus {
  PENDING      // Belum dikonfirmasi
  CONFIRMED    // Sudah dikonfirmasi admin
  CANCELLED    // Dibatalkan
}

model FinancialTransaction {
  id          String              @id @default(cuid())
  type        TransactionType
  amount      Decimal             @db.Decimal(15, 2)
  description String
  category    String?             // "Donasi", "Operasional", "Event", dsb.
  date        DateTime            @default(now())
  recordedBy  String              // admin user id
  notes       String?             @db.Text
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt

  @@index([type, date])
  @@map("financial_transactions")
}

enum TransactionType {
  PEMASUKAN
  PENGELUARAN
}

// =====================
// SITE CONFIG (Key-Value)
// =====================

model SiteConfig {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String   @db.Text  // JSON string untuk nilai kompleks
  updatedAt DateTime @updatedAt

  @@map("site_config")
}

// Contoh keys di SiteConfig:
// "bank_info"      → JSON: { bankName, accountNumber, accountName }
// "qris_image"     → String: "/uploads/misc/qris.png"
// "whatsapp_explore"   → String: "+6281234567890"
// "whatsapp_encounter" → String: "+6281234567891"
// "whatsapp_connect"   → String: "+6281234567892"
// "maps_embed_url" → String: "https://www.google.com/maps/embed?..."
// "address"        → String: "Jl. ..."
// "email_contact"  → String: "esm@example.com"
// "social_instagram"   → JSON: { explore: "@esm_explore", encounter: "@esm_encounter", connect: "@esm_connect" }

// =====================
// ENUM SHARED
// =====================

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

---

## 3. Komponen Architecture Detail

### 3.1 Navbar (`src/components/layout/Navbar.tsx`)

```typescript
// Props & State
interface NavbarProps {
  locale: string
}

// Features:
// - Logo kiri (SVG ESM)
// - Navigation links tengah: Beranda, Tentang Kami, Pelayanan (dropdown), Mobilisasi, Artikel, Kemitraan
// - Kanan: Search icon, Language switcher, Dark mode toggle, Button "Kemitraan"
// - Sticky: `position: sticky; top: 0; z-index: 50`
// - Background: backdrop-blur pada scroll
// - Active link: underline indicator (border-bottom-2 primary color)
// - Pelayanan dropdown: Strategi, Explore, Encounter, Connect
// - Mobile: hamburger menu → slide-in sheet (Shadcn Sheet component)
```

### 3.2 Footer (`src/components/layout/Footer.tsx`)

```typescript
// 4 columns:
// Col 1: ESM Logo + tagline + social media icons
// Col 2: Quick Links (Beranda, Tentang Kami, Pelayanan, Mobilisasi, Artikel)
// Col 3: Ladang Pelayanan (Explore, Encounter, Connect, Kemitraan)
// Col 4: Kontak (email, WA, alamat) + data dari SiteConfig

// Bottom bar: Copyright + "Built with ♥ for God's Kingdom"
```

### 3.3 HeroSection (`src/components/home/HeroSection.tsx`)

```typescript
interface HeroSectionProps {
  headline: string        // "Murid Muda Bermisi"
  subheadline: string     // Tagline
  ctaText: string         // "Bergabung Sekarang"
  ctaHref: string         // "/pelayanan"
  backgroundImage: string // path ke gambar hero
}

// Layout: Full-width, min-height: 100vh
// Background: dark overlay di atas image
// Text: center aligned, white text
// CTA: primary button + secondary outline button
// Animasi: fade-in on mount (framer-motion atau CSS animation)
```

### 3.4 TestimonialCarousel (`src/components/common/TestimonialCarousel.tsx`)

```typescript
interface Testimony {
  id: string
  name: string
  role: string
  quote: string
  photo?: string
  community?: string
}

// Auto-rotate setiap 5 detik
// Manual navigation: prev/next buttons + dot indicators
// Layout: single card view (mobile), 2-3 cards (desktop)
// Source: data di-fetch dari DB via Server Component
```

### 3.5 DonationForm (`src/components/kemitraan/DonationForm.tsx`)

```typescript
// Form fields:
// - Tipe donasi: Radio (Sekali Beri | Mitra Bulanan)
// - Nominal: preset buttons (50K, 100K, 250K, 500K) + input custom
// - Nama lengkap (required)
// - Email (required)
// - Nomor HP (optional)
// - Pesan (optional, textarea)
// - Checkbox: setuju syarat & ketentuan

// Validation: React Hook Form + Zod
// Submit: Server Action → simpan ke DonationRecord (status: PENDING)
// Post-submit: tampilkan info rekening + konfirmasi manual
// No payment gateway (transfer manual)
```

### 3.6 ArticleEditor (`src/components/admin/ArticleEditor.tsx`)

```typescript
// Tiptap rich text editor dengan extensions:
// - Bold, Italic, Underline, Strike
// - Heading (H1, H2, H3)
// - BulletList, OrderedList
// - Blockquote
// - Link (insert + edit)
// - Image (upload via /api/upload)
// - Table
// - Youtube embed
// - Code block
// - Character count
// Output: HTML string → simpan ke Article.content
// Preview: iframe atau prose rendered div
```

---

## 4. Server Actions Detail

### 4.1 `src/actions/article.ts`

```typescript
"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { articleSchema } from "@/lib/validations/article"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateSlug } from "@/lib/utils"

// CREATE
export async function createArticle(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data = articleSchema.parse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    coverImage: formData.get("coverImage"),
    status: formData.get("status"),
  })

  const slug = await generateSlug(data.title)

  const article = await prisma.article.create({
    data: {
      ...data,
      slug,
      publishedAt: data.status === "PUBLISHED" ? new Date() : null,
    },
  })

  revalidatePath("/artikel")
  revalidatePath("/admin/artikel")
  return { success: true, id: article.id }
}

// UPDATE, DELETE, GET — serupa dengan validasi & revalidatePath
```

### 4.2 `src/actions/donation.ts`

```typescript
"use server"

import { prisma } from "@/lib/db"
import { donationSchema } from "@/lib/validations/donation"

export async function submitDonation(formData: FormData) {
  const data = donationSchema.parse({
    donorName: formData.get("donorName"),
    donorEmail: formData.get("donorEmail"),
    donorPhone: formData.get("donorPhone"),
    amount: formData.get("amount"),
    type: formData.get("type"),
    message: formData.get("message"),
  })

  const donation = await prisma.donationRecord.create({
    data: {
      ...data,
      amount: parseFloat(data.amount),
      status: "PENDING",
    },
  })

  // No email notification in MVP (P2 feature)
  return { success: true, id: donation.id }
}
```

---

## 5. Authentication Flow

### 5.1 Setup NextAuth.js (`src/lib/auth.ts`)

```typescript
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 jam
  },
  secret: process.env.NEXTAUTH_SECRET,
}
```

### 5.2 Middleware (`src/middleware.ts`)

```typescript
export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/admin/:path*",        // Proteksi semua route /admin/*
    "/((?!admin/login).*)", // Kecuali halaman login
  ],
}
```

---

## 6. Internasionalisasi (next-intl)

### 6.1 Struktur Translation

```json
// messages/id.json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang Kami",
    "ministry": "Pelayanan",
    "mobilization": "Mobilisasi",
    "article": "Artikel",
    "partnership": "Kemitraan"
  },
  "home": {
    "hero": {
      "headline": "Murid Muda Bermisi",
      "subheadline": "...",
      "cta_primary": "Bergabung Sekarang",
      "cta_secondary": "Pelajari Lebih Lanjut"
    },
    "why_esm": {
      "title": "Mengapa ESM?",
      "...": "..."
    }
  },
  "...": "..."
}
```

```json
// messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "ministry": "Ministry",
    "mobilization": "Mobilization",
    "article": "Articles",
    "partnership": "Partnership"
  },
  "home": {
    "hero": {
      "headline": "Young Disciples on Mission",
      "...": "..."
    }
  }
}
```

### 6.2 Locale Routing Config

```typescript
// next.config.ts
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  output: "standalone",
  images: {
    // Tambahkan domain jika ada external images
  },
}

export default withNextIntl(nextConfig)
```

---

## 7. Dark Mode Implementation

### 7.1 Strategy
- Menggunakan `class` strategy dari Tailwind (`darkMode: 'class'`)
- `ThemeProvider` dari `next-themes` wrap seluruh aplikasi di root layout
- Toggle disimpan di localStorage dan cookie (untuk SSR hydration-safe)

### 7.2 Setup

```typescript
// tailwind.config.ts
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ESM Brand Colors
        primary: {
          DEFAULT: "#3D0A11", // Dark maroon
          light: "#6B1420",
          dark: "#1A0407",
        },
        accent: {
          DEFAULT: "#C9A227", // Gold/amber
          light: "#E8C44A",
          dark: "#A07E15",
        },
        surface: {
          DEFAULT: "#FFFDFC", // Off-white
          dark: "#1A1A1A",   // Dark surface
        },
      },
    },
  },
}
```

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="esm-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 8. File Upload Strategy

### 8.1 Upload Endpoint (`src/app/api/upload/route.ts`)

```typescript
import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"]

export async function POST(request: NextRequest) {
  // Auth check: hanya admin yang bisa upload
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File
  const folder = formData.get("folder") as string || "misc" // articles, events, team, dsb.

  // Validation
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "File too large" }, { status: 400 })
  if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 })

  // Generate unique filename
  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadPath = path.join(UPLOAD_DIR, folder, filename)

  // Create folder if not exists
  await mkdir(path.join(UPLOAD_DIR, folder), { recursive: true })

  // Write file
  const bytes = await file.arrayBuffer()
  await writeFile(uploadPath, Buffer.from(bytes))

  const url = `/uploads/${folder}/${filename}`
  return NextResponse.json({ url })
}
```

### 8.2 Docker Volume Configuration

```yaml
# docker-compose.yml
services:
  nextjs:
    volumes:
      - persistent_uploads:/app/public/uploads  # Persist media files

volumes:
  persistent_uploads:
    driver: local
```

---

## 9. SEO Strategy

### 9.1 generateMetadata per Page

```typescript
// src/app/[locale]/artikel/[slug]/page.tsx
import { Metadata } from "next"
import { prisma } from "@/lib/db"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  })

  if (!article) return { title: "Artikel Tidak Ditemukan" }

  return {
    title: `${article.title} | ESM`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  }
}
```

### 9.2 Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  })

  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  })

  const staticPages = [
    "/", "/tentang-kami", "/pelayanan", "/pelayanan/explore",
    "/pelayanan/encounter", "/pelayanan/connect",
    "/mobilisasi", "/artikel", "/kemitraan",
  ]

  return [
    ...staticPages.map((url) => ({
      url: `https://esm.or.id${url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: url === "/" ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `https://esm.or.id/artikel/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
```

---

## 10. Docker & Deployment Config

### 10.1 `Dockerfile`

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

# Runner (production)
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### 10.2 `docker-compose.yml`

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    container_name: esm_postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - persistent_db:/var/lib/postgresql/data
    networks:
      - esm_network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  nextjs:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: esm_nextjs
    environment:
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    volumes:
      - persistent_uploads:/app/public/uploads
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - esm_network
    restart: unless-stopped

networks:
  esm_network:
    driver: bridge

volumes:
  persistent_db:
  persistent_uploads:
```

### 10.3 `nginx/nginx.conf`

```nginx
server {
    listen 80;
    server_name esm.or.id www.esm.or.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name esm.or.id www.esm.or.id;

    ssl_certificate /etc/letsencrypt/live/esm.or.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/esm.or.id/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 10M;  # Allow file uploads up to 10MB

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /uploads/ {
        alias /var/www/esm/public/uploads/;
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

---

## 11. Environment Variables

```bash
# .env.local (development) / .env.production (production)

# Database
DATABASE_URL="postgresql://esm_user:password@localhost:5432/esm_db"
POSTGRES_USER="esm_user"
POSTGRES_PASSWORD="strong_password_here"
POSTGRES_DB="esm_db"

# NextAuth
NEXTAUTH_URL="https://esm.or.id"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# App
NEXT_PUBLIC_APP_URL="https://esm.or.id"
NEXT_PUBLIC_DEFAULT_LOCALE="id"
```

---

## 12. Prisma Seed Data

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash("Admin@ESM2025!", 10)
  await prisma.user.upsert({
    where: { email: "admin@esm.or.id" },
    update: {},
    create: {
      email: "admin@esm.or.id",
      password: hashedPassword,
      name: "ESM Admin",
      role: "SUPER_ADMIN",
    },
  })

  // Create default site config
  const configs = [
    { key: "bank_info", value: JSON.stringify({ bankName: "BCA", accountNumber: "1234567890", accountName: "ESM Indonesia" }) },
    { key: "whatsapp_explore", value: "+6281234567890" },
    { key: "whatsapp_encounter", value: "+6281234567891" },
    { key: "whatsapp_connect", value: "+6281234567892" },
    { key: "email_contact", value: "esm@example.com" },
    { key: "address", value: "Tangerang, Banten" },
  ]

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    })
  }

  // Create sample FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "Apa itu ESM?", answer: "ESM (Evangelical Student Movement) adalah...", page: "GENERAL", sortOrder: 1 },
      { question: "Bagaimana cara bergabung dengan ESM?", answer: "...", page: "GENERAL", sortOrder: 2 },
      { question: "Bagaimana cara menjadi mitra ESM?", answer: "...", page: "KEMITRAAN", sortOrder: 1 },
    ],
    skipDuplicates: true,
  })

  console.log("Seed completed successfully!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## 13. Package Dependencies

```json
// package.json (key dependencies)
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",

    // Database
    "@prisma/client": "^5.0.0",

    // Auth
    "next-auth": "^4.24.0",
    "bcryptjs": "^2.4.3",

    // Forms & Validation
    "react-hook-form": "^7.0.0",
    "zod": "^3.0.0",
    "@hookform/resolvers": "^3.0.0",

    // UI
    "@radix-ui/react-*": "latest",   // Shadcn UI deps
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "lucide-react": "^0.400.0",

    // Editor
    "@tiptap/react": "^2.0.0",
    "@tiptap/starter-kit": "^2.0.0",
    "@tiptap/extension-image": "^2.0.0",
    "@tiptap/extension-link": "^2.0.0",
    "@tiptap/extension-youtube": "^2.0.0",

    // i18n
    "next-intl": "^3.0.0",

    // Theme
    "next-themes": "^0.3.0",

    // Carousel
    "embla-carousel-react": "^8.0.0",

    // Date
    "date-fns": "^3.0.0",

    // Utils
    "slugify": "^1.6.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/bcryptjs": "^2.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

*Dokumen ini adalah panduan implementasi lengkap. Ikuti secara berurutan sesuai PHASE_PLAN.md.*
