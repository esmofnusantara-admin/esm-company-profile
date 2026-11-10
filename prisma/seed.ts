import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai proses seeding database ESM...");

  // 1. Akun Admin Default
  const hashedPassword = await bcrypt.hash("Admin@ESM2025!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@esm.or.id" },
    update: {},
    create: {
      email: "admin@esm.or.id",
      name: "Admin Utama ESM",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Admin terdaftar: ${admin.email}`);

  // 2. Site Configuration (Narahubung & Rekening Bank)
  const configs = [
    {
      key: "bank_info",
      value: JSON.stringify({
        bankName: "BCA (Bank Central Asia)",
        accountNumber: "1234567890",
        accountName: "Yayasan ESM Indonesia",
      }),
    },
    { key: "whatsapp_contact", value: "+6281296106611" },
    { key: "email_contact", value: "halo@esm.or.id" },
    { key: "address_banten", value: "Serang, Banten (Tanah Jawara)" },
    { key: "address_ternate", value: "Ternate, Maluku Utara (Kota Rempah)" },
  ];

  for (const c of configs) {
    await prisma.siteConfig.upsert({
      where: { key: c.key },
      update: { value: c.value },
      create: c,
    });
  }
  console.log("✅ Site config tersimpan");

  // 3. Sample Articles
  const sampleArticles = [
    {
      title: "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
      slug: "mengapa-pemuridan-harus-hidup-di-tengah-misi",
      excerpt:
        "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas internal.",
      content:
        "<p>Kami meyakini pemuridan dan misi bukan dua jalan terpisah. Keduanya bergandengan tangan: murid Kristus hidup di tengah dunia, membawa kabar baik, kebenaran, dan keadilan Allah ke dalamnya.</p>",
      category: "REFLEKSI" as const,
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
      slug: "melihat-api-perintisan-kembali-menyala-di-kota-rempah",
      excerpt:
        "Catatan perjalanan tim pelayan ESM saat menyusuri persekutuan mahasiswa di Maluku Utara.",
      content:
        "<p>Ternate memiliki sejarah spiritual dan sosial yang kaya. Melalui persekutuan mahasiswa kepulauan, kami melihat kerinduan generasi muda untuk berakar pada firman Tuhan.</p>",
      category: "BERITA" as const,
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
  ];

  for (const art of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {},
      create: art,
    });
  }
  console.log("✅ Artikel contoh terdaftar");

  // 4. Sample Events
  const sampleEvents = [
    {
      title: "Annual Movement Prayer 2026",
      slug: "annual-movement-prayer-2026",
      description: "Doa syafaat serentak seluruh staf, siswa, mahasiswa, dan alumni.",
      community: "ALL" as const,
      location: "Zoom Online Meeting",
      startDate: new Date("2026-08-23T19:00:00Z"),
      status: "PUBLISHED" as const,
    },
    {
      title: "Hari Mitra & Sahabat ESM",
      slug: "hari-mitra-dan-sahabat-esm",
      description: "Temu keakraban tahunan dan warta pertanggungjawaban pelayanan.",
      community: "ALL" as const,
      location: "Serang, Banten",
      startDate: new Date("2026-09-06T10:00:00Z"),
      status: "PUBLISHED" as const,
    },
  ];

  for (const evt of sampleEvents) {
    await prisma.event.upsert({
      where: { slug: evt.slug },
      update: {},
      create: evt,
    });
  }
  console.log("✅ Agenda acara terdaftar");

  // 5. Sample FAQs
  const sampleFaqs = [
    {
      question: "Apakah ESM berada di bawah satu sinode gereja tertentu?",
      answer:
        "Tidak. ESM adalah lembaga perpanjangan tangan gereja (parachurch) yang bersifat interdenominasi. Kami bermitra dengan berbagai gereja lokal untuk melayani generasi muda.",
      page: "GENERAL" as const,
      sortOrder: 1,
    },
    {
      question: "Bagaimana cara menjadi Mitra Finansial ESM?",
      answer:
        "Anda dapat memilih komitmen donasi bulanan atau insidental melalui form di menu Kemitraan dan mentransfer ke rekening resmi Yayasan ESM Indonesia.",
      page: "KEMITRAAN" as const,
      sortOrder: 2,
    },
  ];

  for (const f of sampleFaqs) {
    await prisma.fAQ.create({
      data: f,
    });
  }
  console.log("✅ FAQ contoh terdaftar");

  console.log("🎉 Seeding database ESM selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
