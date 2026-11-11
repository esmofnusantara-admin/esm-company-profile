import { PrismaClient, Community, FAQPage, MediaType } from "@prisma/client";
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

  // 2. Site Configurations (Beranda, Bank, Narahubung)
  const configs = [
    {
      key: "home_hero",
      value: JSON.stringify({
        kickerId: "GERAKAN PEMURIDAN MISIONAL BAGI GENERASI MUDA",
        kickerEn: "MISSIONAL DISCIPLESHIP MOVEMENT FOR THE NEXT GENERATION",
        headlineId: "Bagi Kemuliaan Kristus dan Masa Depan Nusantara",
        headlineEn: "For Christ's Glory and the Future of Nusantara",
        subheadlineId:
          "Melatih siswa, mahasiswa, dan alumni untuk berakar dalam firman Tuhan, bertumbuh dalam komunitas murid, dan diutus ke tengah dunia kerja serta ladang misi.",
        subheadlineEn:
          "Training high school, university students, and alumni to be rooted in God's word, grow in disciple community, and be sent into the marketplace and mission fields.",
        mediaType: "IMAGE",
        mediaUrl: "",
        primaryCtaTextId: "Mulai Bergabung",
        primaryCtaTextEn: "Get Involved",
        primaryCtaUrl: "/pelayanan",
        secondaryCtaTextId: "Dukung Pelayanan",
        secondaryCtaTextEn: "Support Ministry",
        secondaryCtaUrl: "/kemitraan",
      }),
    },
    {
      key: "home_values",
      value: JSON.stringify([
        {
          titleId: "Alkitabiah & Berpusat pada Kristus",
          titleEn: "Biblical & Christ-Centered",
          subtitleId: "Dasar Pengajaran Kokoh",
          subtitleEn: "Firm Foundational Teaching",
          descId:
            "Setiap kurikulum pembinaan, pemuridan pribadi, dan persekutuan berlandaskan kebenaran firman Allah yang ortodoks dan otoritatif.",
          descEn:
            "Every training curriculum, personal discipleship, and fellowship is rooted in orthodox, authoritative Scripture.",
          imageUrl: "",
        },
        {
          titleId: "Misional & Berdampak Luas",
          titleEn: "Missional & Broad Impact",
          subtitleId: "Bukan Menara Gading",
          subtitleEn: "Not an Ivory Tower",
          descId:
            "Mendorong generasi muda menjadi garam dan terang di sekolah, kampus, keluarga, hingga integritas dunia kerja profesional.",
          descEn:
            "Empowering young people to be salt and light in schools, campuses, families, and high-integrity professional fields.",
          imageUrl: "",
        },
        {
          titleId: "Komunitas Pemuridan Seumur Hidup",
          titleEn: "Lifelong Discipleship Community",
          subtitleId: "Relasi Erat Berakar",
          subtitleEn: "Deeply Rooted Relationships",
          descId:
            "Mendampingi perjalanan iman generasi dari bangku SMA (Explore), kampus (Encounter), hingga dunia kerja (Connect).",
          descEn:
            "Walking alongside their faith journey from high school (Explore), campus (Encounter), to workplace (Connect).",
          imageUrl: "",
        },
      ]),
    },
    {
      key: "home_stats",
      value: JSON.stringify([
        { number: "15+", labelId: "Tahun Pelayanan", labelEn: "Years of Ministry" },
        { number: "2", labelId: "Fokus Wilayah (Banten & Ternate)", labelEn: "Key Regions (Banten & Ternate)" },
        { number: "500+", labelId: "Murid & Alumni Dibina", labelEn: "Students & Alumni Discipled" },
        { number: "100+", labelId: "Keluarga & Mitra Misi", labelEn: "Mission Partners & Families" },
      ]),
    },
    {
      key: "bank_config",
      value: JSON.stringify({
        bankName: "Bank Central Asia (BCA)",
        accountNumber: "8420-991-888",
        accountHolder: "Yayasan Evangelical Student Movement",
        branch: "KCU Serang",
        qrisUrl: "",
        waConfirmNumber: "6281296106611",
      }),
    },
    {
      key: "site_settings",
      value: JSON.stringify({
        phone: "+62 812-9610-6611",
        email: "halo@esm.or.id",
        addressBanten: "Serang, Tangerang, Balaraja, Cilegon — Banten",
        addressTernate: "Kota Rempah (Ternate) — Maluku Utara",
        instagram: "https://instagram.com/esmofnusantara",
        youtube: "https://youtube.com/@esmofnusantara",
        facebook: "https://facebook.com/esmofnusantara",
        taglineId: "Mewujudkan generasi muda berakar dalam Kristus bagi bumi Nusantara.",
        taglineEn: "Raising a next generation rooted in Christ for the transformation of Nusantara.",
      }),
    },
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
      titleEn: "Why Must Discipleship Live in the Midst of Mission?",
      slug: "mengapa-pemuridan-harus-hidup-di-tengah-misi",
      excerpt:
        "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman komunitas internal.",
      excerptEn:
        "A deep reflection on the journey of Christ's disciples that must not halt in the comfort zone of closed fellowship.",
      content:
        "<p>Kami meyakini pemuridan dan misi bukan dua jalan terpisah. Keduanya bergandengan tangan: murid Kristus hidup di tengah dunia, membawa kabar baik, kebenaran, dan keadilan Allah ke dalamnya.</p>",
      category: "REFLEKSI" as const,
      status: "PUBLISHED" as const,
      publishedAt: new Date(),
    },
    {
      title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
      titleEn: "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands",
      slug: "melihat-api-perintisan-kembali-menyala-di-kota-rempah",
      excerpt:
        "Catatan perjalanan tim pelayan ESM saat menyusuri persekutuan mahasiswa di Maluku Utara.",
      excerptEn:
        "Field dispatches of the ESM mission team traversing campuses in Ternate, forging local church partnerships.",
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
      titleEn: "Annual Movement Prayer 2026",
      slug: "annual-movement-prayer-2026",
      description: "Doa syafaat serentak seluruh staf, siswa, mahasiswa, dan alumni.",
      descriptionEn: "Simultaneous intercessory prayer across all staff, students, and alumni.",
      community: "ALL" as const,
      location: "Zoom Online Meeting",
      locationEn: "Zoom Online Meeting",
      startDate: new Date("2026-08-23T19:00:00Z"),
      status: "PUBLISHED" as const,
    },
    {
      title: "Hari Mitra & Sahabat ESM",
      titleEn: "ESM Partners & Friends Gathering",
      slug: "hari-mitra-dan-sahabat-esm",
      description: "Temu keakraban tahunan dan warta pertanggungjawaban pelayanan.",
      descriptionEn: "Annual fellowship and ministry accountability report.",
      community: "ALL" as const,
      location: "Serang, Banten",
      locationEn: "Serang, Banten",
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

  // 5. Sample Team Members
  const teamMembers = [
    {
      name: "Pdt. Daniel S. Th., M.Min.",
      role: "Koordinator Wilayah Banten",
      roleEn: "Banten Regional Coordinator",
      community: Community.ALL,
      bio: "Melayani pembinaan kelompok kecil dan perintisan pelayanan mahasiswa di Serang dan Tangerang sejak 2012.",
      bioEn: "Serving small group discipleship and campus ministry pioneering across Serang and Tangerang since 2012.",
      whatsapp: "6281296106611",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Grace Hutapea, S.Psi.",
      role: "Pembina Explore Community (Siswa)",
      roleEn: "Explore Community Mentor (High School)",
      community: Community.EXPLORE,
      bio: "Mendampingi konseling pribadi dan retret kepemimpinan siswa SMP & SMA di Banten.",
      bioEn: "Mentoring personal counseling and leadership camps for junior & senior high school students in Banten.",
      whatsapp: "6281296106611",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Markus Maluku, S.Kel.",
      role: "Perintis Pelayanan Ternate",
      roleEn: "Ternate Ministry Pioneer",
      community: Community.ENCOUNTER,
      bio: "Mengkoordinasi kelompok pemuridan mahasiswa kepulauan dan jejaring alumni di Maluku Utara.",
      bioEn: "Coordinating island student discipleship groups and alumni network in North Maluku.",
      whatsapp: "6281296106611",
      sortOrder: 3,
      isActive: true,
    },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.create({ data: member });
  }
  console.log("✅ Tim pengurus terdaftar");

  // 6. Sample Testimonies
  const testimonies = [
    {
      name: "Andreas Pratama",
      role: "Siswa SMA • Komunitas Explore Banten",
      quote:
        "Melalui kelompok pemuridan di ESM, aku belajar bahwa mengikut Yesus bukan cuma soal apa yang aku percaya di dalam gereja, tetapi bagaimana aku hadir di sekolah, menghargai sesama, dan berani bersaksi dengan hidup nyata.",
      quoteEn:
        "Through discipleship in ESM, I learned that following Jesus isn't just about Sunday church, but how I conduct myself at school, honor others, and boldly testify through real life.",
      isActive: true,
      sortOrder: 1,
    },
  ];

  for (const t of testimonies) {
    await prisma.testimony.create({ data: t });
  }
  console.log("✅ Testimoni terdaftar");

  // 7. Sample Monthly Prayer Requests
  const prayers = [
    {
      month: "November 2026",
      title: "Ketahanan Iman Siswa Sekolah Menengah di Banten",
      titleEn: "Faith Resilience of High School Students in Banten",
      description:
        "Doakan 15 kelompok kecil (KTB) siswa SMA di Banten agar tetap teguh dalam firman Tuhan menghadapi tekanan teman sebaya.",
      descriptionEn:
        "Pray for 15 small discipleship groups across Banten high schools to stand firm in Scripture amid peer pressure.",
      category: "PELAYANAN",
      isAnswered: false,
    },
    {
      month: "November 2026",
      title: "Perintisan Kelompok Mahasiswa Baru di Ternate",
      titleEn: "Pioneering New Student Discipleship in Ternate",
      description:
        "Doakan pembukaan kelompok pemuridan baru di kampus Universitas Khairun dan kemitraan bersama para gembala sidang gereja lokal.",
      descriptionEn:
        "Pray for the launch of new campus discipleship groups at Khairun University and unity with local pastoral leaders.",
      category: "MISI",
      isAnswered: false,
    },
    {
      month: "November 2026",
      title: "Kesaksian: Kemah Kepemimpinan Explore Berjalan Lancar",
      titleEn: "Testimony: Explore Leadership Camp Completed Successfully",
      description:
        "Puji Tuhan! Retret kepemimpinan siswa dihadiri oleh 85 siswa dengan 12 siswa baru berkomitmen dimuridkan.",
      descriptionEn:
        "Praise God! The student leadership retreat was attended by 85 youth with 12 students committing to regular discipleship.",
      category: "MISI",
      isAnswered: true,
    },
  ];

  for (const p of prayers) {
    await prisma.prayerRequest.create({ data: p });
  }
  console.log("✅ Pokok doa bulanan terdaftar");

  // 8. Sample FAQs
  const sampleFaqs = [
    {
      question: "Apakah ESM berada di bawah satu sinode gereja tertentu?",
      questionEn: "Is ESM under a specific church denomination or synod?",
      answer:
        "Tidak. ESM adalah lembaga perpanjangan tangan gereja (parachurch) yang bersifat interdenominasi. Kami bermitra dengan berbagai gereja lokal untuk melayani generasi muda.",
      answerEn:
        "No. ESM is an interdenominational parachurch movement. We partner alongside various local churches to disciple the next generation.",
      page: FAQPage.GENERAL,
      sortOrder: 1,
    },
    {
      question: "Bagaimana cara menjadi Mitra Finansial ESM?",
      questionEn: "How can I become a Financial Mission Partner of ESM?",
      answer:
        "Anda dapat memilih komitmen donasi bulanan atau insidental melalui form di menu Kemitraan dan mentransfer ke rekening resmi Yayasan ESM Indonesia.",
      answerEn:
        "You can choose a monthly or one-time giving commitment on the Partnership page and transfer directly to the official Foundation bank account.",
      page: FAQPage.KEMITRAAN,
      sortOrder: 2,
    },
  ];

  for (const f of sampleFaqs) {
    await prisma.fAQ.create({ data: f });
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
