# Panduan Analisis, Perbaikan UI/UX & Standar Company Profile Pelayanan (ESM)
**Dokumen Referensi Utama untuk Refactoring Desain & Development**  
*Versi: 1.0 — November 2026*

---

## 📌 Latar Belakang & Tujuan Dokumen

Desain awal dari tim desain pemula (yang tersimpan di folder `full_ui/`) sudah memberikan gambaran struktur kasar. Namun, terdapat banyak kelemahan mendasar dalam hal:
1. **Palet Warna:** Terlalu pekat/gelap (*muddy blood red/blackish maroon*), menciptakan kesan suram, berat, dan intimidatif, bukan kehangatan gerakan pemuda Kristen yang penuh harapan.
2. **Posisi & Spacing (Padding/Margin):** Kerapatan yang tidak konsisten, blok kosong (*dead whitespace*) yang canggung, dan kontras layout yang terlalu ekstrem (dari hitam-merah pekat langsung loncat ke putih polos).
3. **Tipografi & Bentuk Huruf:** Terlalu kaku, memakai sans-serif ultra-bold bernuansa industri/korporat yang dingin, minim keanggunan editorial dan kehangatan relasional.
4. **Struktur Navigasi & Menu:** Kurang fungsional, tidak mencerminkan kebutuhan navigasi organisasi nirlaba/gerakan modern.
5. **Fitur Khas Pelayanan (Ministry Standards):** Kurangnya elemen-elemen fundamental yang biasa ada di profil lembaga misi/pelayanan Kristen (seperti *Statement of Faith*, pokok doa, metrik transparansi dampak, ragam pintu keterlibatan, kemitraan gereja lokal, dan pembina rohani).

Dokumen ini menjadi **pedoman wajib** bagi developer dan desainer agar proses *coding* tidak sekadar menjiplak mentah-mentah UI Figma, melainkan meningkatkan kualitasnya menjadi setara website pelayanan/misi kelas dunia (seperti *YWAM, Cru, Navigators, InterVarsity, atau OMF*).

---

## 🎨 1. Reformulasi Warna: Menghilangkan Merah Pekat Menuju "Warm Dignified Crimson"

### 1.1 Masalah Warna pada Desain Awal
- **Merah yang dipakai (`#2B070B` / `#35080E` / `#3D0A11`):** Terlalu pekat (*blackish maroon / dried blood*). Warna ini membuat website tampak suram, berat, dan berjarak dengan anak muda (*Siswa/Mahasiswa*).
- **Warna Aksen Kuning/Mustard:** Tampak kusam (*muddy*) saat disandingkan dengan merah pekat, menyerupai tanda bahaya jalan raya daripada kehangatan emas Kerajaan Allah.
- **Background Stark White (`#FFFFFF` murni):** Kontras yang terlalu tajam saat bersanding dengan blok merah pekat menghasilkan efek *visual shock*.

### 1.2 Palet Warna Baru: Hangat, Berwibawa, Tidak Menusuk & Tidak Pekat

Palet baru menggunakan **Terracotta Crimson / Warm Garnet** yang memiliki saturasi matang, hangat, bermartabat, berpadu dengan latar belakang **Warm Alabaster / Cream** dan aksen **Warm Golden Amber**.

```
[ Primary Crimson ]    [ Crimson Hover ]     [ Light Crimson Tint ]    [ Warm Amber Gold ]    [ Warm Cream Canvas ]
    #8B2635               #A83244                   #FDF2F4                 #D4A346               #FAF7F2
```

#### Detail Kode Warna (Tailwind & CSS Tokens):

| Token Nama | Hex Code | HSL | Peran Penggunaan |
|------------|----------|-----|------------------|
| **`primary-50`** | `#FDF2F4` | 349°, 64%, 97% | Background badge, highlight teks halus, alert box |
| **`primary-100`**| `#F9E2E5` | 350°, 58%, 93% | Hover state kartu sekunder, border kartu terpilih |
| **`primary-500`**| `#B8384C` | 351°, 53%, 47% | Aksen merah interaktif, icon highlight |
| **`primary-600`** (Main Brand) | **`#8B2635`** | 351°, 58%, 35% | **Warna utama ESM:** Tombol CTA primer, heading kunci, navbar active |
| **`primary-700`**| `#721F2B` | 351°, 57%, 29% | Hover button primer, footer border accent |
| **`primary-900`** (Deep Elegant) | `#3A1217` | 352°, 52%, 15% | Teks judul di atas background terang (bukan background utama) |
| **`accent-amber`**| **`#D4A346`** | 39°, 62%, 55% | Aksen mahkota/emas: quote mark, bintang/highlight |
| **`accent-soft`** | `#F7EEDB` | 41°, 64%, 91% | Background tag kategori khusus (e.g., "Kabar Ladang") |
| **`canvas-warm`** | **`#FAF7F2`** | 38°, 33%, 97% | **Background default website** (menggantikan stark white dingin) |
| **`surface-card`**| `#FFFFFF` | 0°, 0%, 100% | Background kartu konten, dikelilingi border warm stone |
| **`border-subtle`**| `#EBE5DD` | 36°, 20%, 89% | Garis pembatas halus yang natural |
| **`text-heading`**| `#1E1617` | 350°, 15%, 10% | Warna teks judul (hitam hangat espresso, tidak pekat mati) |
| **`text-body`**   | `#4A4042` | 348°, 7%, 27% | Warna paragraf artikel & penjelasan (sangat ramah mata) |
| **`text-muted`**  | `#7A7072` | 347°, 4%, 46% | Teks tanggal, meta info, breadcrumbs |

#### Aturan Penerapan Background Gelap (Hero & CTA Bawah):
- **JANGAN** gunakan flat `#2B070B` pekat di seluruh section.
- **GUNAKAN** kombinasi **Deep Rose Charcoal** dengan *gradient mesh* halus atau overlay foto bertekstur:
  ```css
  background: linear-gradient(145deg, #241416 0%, #3D1C22 50%, #2A1316 100%);
  ```
- Ini memberikan kedalaman sinematik yang anggun (*dignified depth*), tanpa rasa sempit atau menakutkan.

---

## 📐 2. Posisi, Padding & Spacing (Perbaikan Tata Letak)

### 2.1 Masalah Tata Letak Saat Ini
1. **Hero Section (04_Homepage.png):**
   - Di sebelah kanan terdapat kotak putih kosong masif tanpa koneksi naratif dengan teks di kiri.
   - Di bawah tombol CTA terdapat sebaris teks lokasi (*Serang, Banten, Ternate...*) yang terapung canggung.
2. **Transisi Section:**
   - Perpindahan dari hero gelap ke teks "Sebagai jembatan..." terlalu tiba-tiba. Ticker pita kata-kata kecil di tengahnya (*PEMURIDAN • MISI...*) tampak seperti tempelan banner usang.
3. **Penyelarasan Kolom (Artikel & Kalender):**
   - Kolom kiri berisi 3 kartu artikel pendek, sementara kolom kanan memuat kalender bulanan raksasa berwarna merah gelap pekat. Ketinggiannya tidak imbang dan menciptakan ketimpangan visual (*visual imbalance*).
4. **FAQ Section:**
   - Accordion membentang lebar 1200px dari ujung ke ujung. Saat dibuka, teks jawaban hanya berupa 1-2 baris pendek yang menyisakan ruang kosong putih lebar di sebelah kanan.
5. **Testimoni & Kemitraan:**
   - Testimoni dikurung dalam kartu merah raksasa yang 70% areanya berupa ruang kosong tak berpenghuni.

### 2.2 Panduan Grid & Spacing Standar

#### Skala Padding & Margin Vertikal (Vertical Rhythm):
- **Hero Section:** `pt-28 pb-20 md:pt-36 md:pb-28` (memberi ruang lega untuk judul & media).
- **Standard Content Section:** `py-16 md:py-24` (konsisten di seluruh halaman).
- **Compact Section (e.g. FAQ / Partner logos):** `py-12 md:py-16`.
- **Card Internal Padding:**
  - Kartu Artikel/Event: `p-6` (24px).
  - Kartu Highlight/Feature: `p-8 md:p-10`.
  - Input form: `py-3 px-4`.

#### Skala Lebar Kontainer (Container Max-Widths):
- **Full Navigation & Footer:** `max-w-7xl` (1280px) dengan `px-4 sm:px-6 lg:px-8`.
- **Content Utama (Grid Artikel, Program 3C):** `max-w-6xl` (1152px).
- **Prose / Teks Panjang (Sejarah, Visi Misi, Detail Artikel):** Batasi maksimal `max-w-3xl` (768px) atau `max-w-prose` (65-75 karakter per baris) agar mata pembaca tidak lelah melompat dari kiri ke kanan layar.
- **FAQ Accordion:** Jangan full width! Pusatkan di kontainer `max-w-3xl mx-auto`.

---

## 🔤 3. Tipografi & Bentuk Huruf (Editorial Warmth & Clarity)

### 3.1 Masalah Tipografi Saat Ini
- Font heading menggunakan sans-serif ultra-bold/black dengan *letter-spacing* sangat rapat (*cramped tracking*), terasa seperti poster pameran teknologi atau startup fintech, bukan gerakan pemuridan yang berbasis Firman dan relasi kasih.
- Hirarki ukuran font melompat-lompat tanpa aturan ritme yang terukur.

### 3.2 Rekomendasi Font Pairing untuk Website Pelayanan

Gunakan kombinasi yang menggabungkan **ketegasan modern anak muda** dengan **keanggunan klasik spiritual**:

#### Kombinasi Pilihan:
1. **Primary Heading & UI Font: `Plus Jakarta Sans`**
   - Karakter: Font modern geometris karya desainer Indonesia yang ramah, bersih, modern, dan sangat terbaca di mobile maupun desktop.
   - Bobot: `SemiBold (600)` untuk subhead, `Bold (700)` untuk headline utama.
2. **Accent / Scripture & Editorial Quote Font: `Fraunces` atau `Lora` (Google Fonts)**
   - Karakter: Serif yang hangat, organik, dan berwibawa.
   - Digunakan khusus untuk:
     - Ayat Alkitab rujukan (*Scripture tags*).
     - Kutipan testimoni murid/mahasiswa.
     - Subjudul narasi sejarah ("Lahir dari sebuah kegelisahan...").
3. **Body Text Font: `Plus Jakarta Sans` atau `Inter`**
   - Bobot: `Regular (400)` untuk isi paragraf dengan `leading-relaxed` (line-height 1.65–1.75).
   - `Medium (500)` untuk label tombol, navigasi, dan metadata.

#### Skala Tipografi Baku (Tailwind CSS):

```tsx
// Heading 1 (Hero)
className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"

// Subheading Hero (Serif Accent)
className="font-serif italic text-xl sm:text-2xl text-amber-200/90 font-normal"

// Section Title (H2)
className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-snug"

// Section Kicker / Overline
className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2"

// Body Text
className="font-sans text-base sm:text-lg text-neutral-600 leading-relaxed"

// Testimonial Quote (Serif)
className="font-serif italic text-xl sm:text-2xl text-neutral-800 leading-relaxed font-normal"
```

---

## 🧭 4. Posisi Menu & Struktur Navigasi (Berdasarkan Praktik YWAM & Organisasi Misi)

Catatan dari desainer awal (`01_NOTE.png`): *"Kalo navbarnya keramean tiru webnya WYAM"*.

### 4.1 Analisis Navbar Saat Ini
- Tombol pencarian (search icon) mengambang tanpa fungsi jelas.
- Tombol "Kemitraan" berwarna merah kusam yang menyatu dengan background atau tampak seperti tag biasa.
- Dropdown "Pelayanan" hanya berupa panah kecil tanpa konteks jelas apa isinya.
- Tidak ada akses cepat ke hal-hal krusial pelayanan (seperti bahasa, pokok doa, atau kontak darurat).

### 4.2 Struktur Navigasi Rekomendasi (Clean, Purposeful & Balanced)

```
[ LOGO ESM ]          [ Tentang Kami ▾ ]   [ Pelayanan & Komunitas ▾ ]   [ Agenda ]   [ Media & Buletin ]       [ ID|EN ]  [ Minta Doa ]  [ TOMBOL KEMITRAAN ]
(Kiri)                                        (Tengah: 4 Menu Inti)                                                (Kanan: Utility & Primary CTA)
```

#### Rincian Menu & Dropdown:

1. **Brandmark (Kiri):**
   - Logo Grafis ESM + Teks "ESM" (bold) + Subteks "Evangelical Student Movement" (kecil).
   - Klik menuju Beranda (`/`).
2. **Navigasi Inti (Tengah):**
   - **Tentang Kami ▾:**
     - Mengenal ESM (Sejarah & Kegelisahan Awal)
     - Visi, Misi & Metrik Dampak
     - **Dasar Iman & Nilai Gerakan (*Statement of Faith*)** *(Wajib ditambahkan!)*
     - Dewan Pembina & Staf Pemimpin
     - Wilayah Pelayanan (Banten & Ternate)
   - **Pelayanan & Komunitas ▾ (Berdasarkan Tahap Hidup):**
     - Kerangka Strategi 3C (Communion, Community, Commission)
     - **Explore Community** *(Siswa SMA / Remaja)*
     - **Encounter Community** *(Mahasiswa Kampus)*
     - **Connect Community** *(Alumni & Profesional Marketplace)*
   - **Agenda & Mobilisasi:**
     - Kalender Gerakan, Training Pemuridan, Retreat Tahunan
   - **Media & Buletin:**
     - Artikel & Renungan, Buletin Warta Bulanan (PDF), Khotbah/Audio
3. **Utility & Action Hub (Kanan):**
   - **Language Toggle:** `ID | EN` (minimalis, tombol pill halus).
   - **Quick Link: "Minta Doa"** (Teks link dengan icon hati/doa halus).
   - **Primary Action Button: "Bermitra" / "Dukung Misi"**
     - Diberi warna `#8B2635` yang menonjol, rounded-full atau rounded-xl, teks putih, shadow hangat.

#### Navigasi Mobile (Sheet/Drawer):
- Menggunakan hamburger icon di kanan atas.
- Membuka drawer samping dengan accordion halus untuk dropdown.
- Bagian bawah drawer memiliki 2 tombol tetap:
  1. Tombol WhatsApp Hotline / Pendampingan Siswa-Mahasiswa.
  2. Tombol Donasi & Kemitraan.

---

## 🕊️ 5. Fitur Khas Company Profile Pelayanan yang Hilang & Wajib Ada

Sebuah organisasi pelayanan Kristen (khususnya *parachurch student movement*) memiliki standar kredibilitas dan ekosistem rohani yang berbeda dari perusahaan komersial. Berikut fitur-fitur yang **harus ditambahkan** ke dalam website:

### 5.1 Pengakuan Iman / Statement of Faith ("Dasar Teologis")
* **Mengapa Wajib?** Gereja lokal, orang tua murid, kepala sekolah, dan calon donatur tidak akan mempercayakan anak muda atau dananya jika mereka tidak tahu posisi teologis organisasi (apakah injili, ortodoks, atau menyimpang).
* **Solusi Implementasi:**
  - Halaman ringkas di `/tentang-kami#dasar-iman` atau tab terpisah.
  - Memuat 6–8 butir keyakinan pokok: Alkitab sebagai Firman Allah yang berotoritas, Tritunggal, Karya Keselamatan Kristus, Karya Roh Kudus dalam pengudusan, Mandat Agung (Matius 28:19-20), dan Kebangkitan Tubuh.

### 5.2 Prayer Hub / Pokok Doa Gerakan ("Gerakan Dimulai dari Lutut")
* **Mengapa Wajib?** Pelayanan tidak digerakkan oleh uang semata, tetapi oleh doa. Banyak mitra rindu mendukung lewat doa syafaat tetapi tidak tahu apa yang perlu didoakan.
* **Solusi Implementasi:**
  1. **Unduh Lembar Doa Bulanan (PDF):** Kalender doa 30 hari untuk siswa di Banten, perintisan di Ternate, dan alumni di dunia kerja.
  2. **Formulir "Kirim Pokok Doa / Minta Didoakan":** Fitur bagi siswa/mahasiswa yang sedang bergumul (akademik, keluarga, spiritual) agar bisa didoakan secara anonim oleh tim konselor/pendoa ESM.

### 5.3 Laporan Transparansi Dampak & Angka Nyata (Impact Report)
* **Masalah Desain Awal:** Desain awal hanya berisi kata-kata puitis (*"Mengusik kenyamanan...", "Jembatan atas jurang..."*), tanpa data nyata yang menunjukkan buah pelayanan.
* **Solusi Implementasi:**
  - Tambahkan blok **"Buah Pelayanan Sepanjang 2024–2026"**:
    - `15+` Kampus & Sekolah di Banten & Ternate
    - `350+` Siswa & Mahasiswa Terbina dalam Kelompok Kecil (KTB)
    - `40+` Pemimpin Muda Diutus ke Dunia Kerja
    - `100%` Laporan Keuangan Terbuka untuk Mitra Donatur

### 5.4 Empat Pintu Keterlibatan ("4 Ways to Get Involved")
* **Masalah Desain Awal:** Di menu kemitraan seolah-olah keterlibatan hanya soal transfer uang.
* **Solusi Implementasi:** Bagi keterlibatan ke dalam 4 pilar yang sejajar:
  1. **Bergabung Sebagai Murid:** Ikut kelompok pemuridan di kampus/sekolahmu.
  2. **Menjadi Mentor / Kakak Pembina:** Alumni yang rindu mendampingi adik-adik siswa/mahasiswa.
  3. **Menjadi Sahabat Pendoa:** Berlangganan pokok doa rutin.
  4. **Menjadi Mitra Misi (Finansial):** Mendukung biaya operasional staf lapangan dan subsidi kamp pelatihan.

### 5.5 Kemitraan Khusus Gereja Lokal & Sekolah ("Parachurch Bridge")
* ESM hadir bukan untuk menggantikan gereja, melainkan menjadi perpanjangan tangan gereja menjangkau kampus.
* Perlu section/form khusus: **"Undang ESM Melayani di Gereja / Sekolah Anda"** (misal untuk retreat pemuda, pelatihan KTB guru agama, atau seminar panggilan hidup).

### 5.6 Dewan Pembina & Penasihat (Advisory Board)
* Struktur organisasi di `05_Tentang_Kami.png` tampak seperti bagan korporat yang kaku dengan placeholder lingkaran foto kosong.
* Ubah menjadi tampilan elegan berwibawa:
  - **Dewan Penasihat & Gembala:** Menampilkan tokoh rohani senior / pendeta yang menjadi bapa rohani gerakan.
  - **Tim Pelaksana Lapangan:** Koordinator wilayah yang ramah dan approachable.

---

## 🛠️ 6. Panduan Perbaikan Halaman per Halaman (Page-by-Page Redesign)

### 6.1 Homepage (`/`)
1. **Hero Section:**
   - **Background:** Ganti merah pekat pekat dengan gradien hangat `#241416` → `#3D1C22` dengan tekstur grain halus.
   - **Visual Kanan:** Ganti kotak putih kosong dengan **Kolase Foto Organik** (foto wajah nyata siswa tertawa dalam kelompok PA, mahasiswa bersujud dalam doa, dan aksi sosial di Banten/Ternate) dengan *soft rounded corners* (16px) dan *ambient glow*.
   - **Kicker:** "Gerakan Pemuridan Siswa, Mahasiswa, & Alumni" (Gold text).
   - **CTA Buttons:**
     - Tombol 1: `bg-primary-600 hover:bg-primary-700 text-white` → "Temukan Komunitasmu".
     - Tombol 2: `border border-white/30 hover:bg-white/10 text-white` → "Kenali Visi ESM".
2. **Section "Mengapa ESM Hadir?":**
   - Hapus pita hitam/merah kecil pemisah.
   - Terapkan layout 2 kolom seimbang:
     - Kiri: Narasi kegelisahan pemuridan & misi (dengan typography editorial yang anggun).
     - Kanan: 3 Kartu Berbobot (Mengusik Kenyamanan, Pemuridan sebagai Pusat, Misi untuk Bangsa) menggunakan background putih bersih dengan border halus `#EBE5DD` dan icon amber.
3. **Section Artikel & Kalender Agenda:**
   - Ubah dari ketimpangan tinggi menjadi **Bento Grid yang Harmonis**:
     - Kolom Kiri (2/3 lebar): 2 Artikel Unggulan (dengan foto dokumentasi asli, tag kategori amber, estimasi baca).
     - Kolom Kanan (1/3 lebar): Mini-Calendar Agenda ESM dengan desain kartu putih bersih, bukan kotak merah pekat yang mengintimidasi.
4. **FAQ Accordion:**
   - Batasi lebar menjadi `max-w-3xl mx-auto`.
   - Gunakan border bawah halus tanpa kotak border tebal bertumpuk.

---

### 6.2 Halaman Tentang Kami (`/tentang-kami`)
1. **Narasi Sejarah:**
   - Dibuat seperti cerita perjalanan rohani (*timeline journey*), bukan sekadar blok teks tebal.
   - Sertakan foto asli perintisan pertama di Banten dan Ternate.
2. **Hapus / Pindahkan Bagian "Identitas Logo":**
   - Bagian yang menjelaskan arti warna merah, emas, dan bentuk logo di desain awal terlihat seperti isi dokumen internal panduan merek (*brand guidelines*), bukan konsumsi publik.
   - **Rekomendasi:** Ganti bagian ini dengan **"Pilar Nilai Hidup Murid (Core Values)"** atau **"Pengakuan Iman Ringkas"**.
3. **Peta Wilayah Pelayanan (Banten & Ternate):**
   - Peta radar hitam di desain awal tampak seperti radar militer/gaming.
   - **Rekomendasi:** Gunakan visualisasi peta Nusantara yang hangat (*warm cartography style*), dengan pin interaktif di Banten (Serang, Tangerang, Balaraja, Cilegon) dan Maluku Utara (Ternate), lengkap dengan info kampus yang sudah dijangkau saat pin diklik atau di-hover.

---

### 6.3 Halaman Pelayanan & 3 Komunitas (`/pelayanan/*`)
1. **Explore Community (Siswa SMA):**
   - Tone: Energik, hangat, menyemangati, relevan dengan dunia remaja sekolah (krisis identitas, pergaulan, masa depan).
   - Card program difokuskan pada: Pembinaan Karakter, Kamp Siswa, Kelompok Belajar Alkitab Kreatif.
   - Akses kontak langsung via WhatsApp Kakak Pembina.
2. **Encounter Community (Mahasiswa Kampus):**
   - Tone: Kritis, transformasional, intelektual berdasar Firman, relevan dengan dunia kampus & pergerakan mahasiswa.
   - Menampilkan dinamika 2 wilayah (Banten & Ternate).
3. **Connect Community (Alumni & Profesional):**
   - Tone: Kolaboratif, berdampak, berwawasan marketplace (bagaimana iman berbuah di kantor, bisnis, rumah tangga, dan ruang publik).
   - Menampilkan 3 pilar: Integritas Profesi, Pelayanan Kota, Pendampingan Generasi Muda.

---

### 6.4 Halaman Kemitraan & Kontak (`/kemitraan`)
1. **Formulir Donasi:**
   - Desain awal form donasi terlalu kaku seperti formulir perbankan lama.
   - **Perbaikan:**
     - Tampilkan pilihan nominal cepat dalam bentuk pill buttons: `[Rp 50.000]`, `[Rp 100.000]`, `[Rp 250.000]`, `[Rp 500.000]`, `[Nominal Lainnya]`.
     - Tampilkan transparansi peruntukan: Donatur bisa memilih apakah dananya dialokasikan untuk:
       - *Operasional Umum Gerakan*
       - *Subsidi Pelatihan & Kamp Siswa Kurang Mampu*
       - *Perintisan Kampus Baru (Ternate / Banten)*
     - Rekening Bank & QRIS diberi tombol `Salin No. Rekening` yang memicu toast notifikasi interaktif.
2. **Contact Hub & Lokasi:**
   - Sertakan peta interaktif Google Maps asli (bukan gambar statis titik-titik radar gelap).

---

## 💻 7. Konfigurasi Desain Siap Pakai (Tailwind Tokens)

Agar tim developer dapat langsung menerapkan pedoman ini di kode, berikut konfigurasi `tailwind.config.ts` yang sudah disesuaikan:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ESM Redefined Brand Palette (Warm Dignified Crimson)
        primary: {
          50:  "#FDF2F4",
          100: "#F9E2E5",
          200: "#F4C4CB",
          300: "#EBA0AB",
          400: "#DE7283",
          500: "#B8384C",
          600: "#8B2635", // BRAND CORE (Tidak terlalu pekat, berwibawa)
          700: "#721F2B",
          800: "#5A1822",
          900: "#3A1217",
          950: "#240A0E",
        },
        // Warm Kingdom Gold (Aksen Kemuliaan & Terang)
        accent: {
          50:  "#FAF6ED",
          100: "#F5EEDB",
          200: "#EBDDB7",
          300: "#DFC88E",
          400: "#D4A346", // GOLD CORE
          500: "#B8862D",
          600: "#916720",
          700: "#6E4C17",
        },
        // Warm Alabaster Canvas (Pengganti Stark White)
        canvas: {
          DEFAULT: "#FAF7F2",
          subtle:  "#F3EFEA",
          muted:   "#EBE5DD",
        },
        // Deep Rose Charcoal (Untuk Hero/CTA gelap yang bernafas)
        darkmesh: {
          start: "#241416",
          mid:   "#3D1C22",
          end:   "#1E1012",
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(36, 20, 22, 0.05), 0 1px 2px -1px rgba(36, 20, 22, 0.05)',
        'warm-md': '0 4px 16px -2px rgba(139, 38, 53, 0.08), 0 2px 6px -2px rgba(36, 20, 22, 0.04)',
        'warm-lg': '0 12px 32px -4px rgba(139, 38, 53, 0.12), 0 4px 12px -2px rgba(36, 20, 22, 0.05)',
      },
      borderRadius: {
        'card': '1rem', // 16px untuk kehangatan modern
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
```

---

## 📋 8. Checklist Verifikasi Sebelum Mulai Coding

Sebelum developer menulis kode komponen per komponen, pastikan hal-hal berikut dipatuhi:

- [ ] **Warna:** Tidak ada penggunaan background `#000000` pekat atau `#2B070B` pekat tanpa gradien hangat `#241416` → `#3D1C22`.
- [ ] **Background:** Background utama halaman terang menggunakan `#FAF7F2` (*Warm Alabaster*), bukan `#FFFFFF` dingin.
- [ ] **Tipografi:** Heading menggunakan `Plus Jakarta Sans`, kutipan rohani/testimoni menggunakan aksen font serif hangat (`Fraunces` atau `Lora`).
- [ ] **Kontainer Teks:** Tidak ada teks artikel atau paragraf yang membentang lebih lebar dari `max-w-3xl` (768px).
- [ ] **FAQ:** FAQ terpusat di tengah layar, bukan meregang memenuhi 1200px.
- [ ] **Fitur Pelayanan:** Memastikan menu memiliki akses ke **Statement of Faith / Dasar Iman**, **Pokok Doa**, dan **Kemitraan Terbuka (Doa, Relawan, Finansial)**.
- [ ] **Identitas Logo:** Tidak menampilkan halaman "arti logo" yang kaku; ganti dengan nilai-nilai hidup murid atau laporan buah pelayanan nyata.

---

*Dokumen ini dirancang untuk melengkapi `PRD.md` dan `IMPLEMENTATION_PLAN.md` agar hasil akhir website ESM memiliki standar estetika, kredibilitas rohani, dan kenyamanan pengguna tingkat tinggi.*
