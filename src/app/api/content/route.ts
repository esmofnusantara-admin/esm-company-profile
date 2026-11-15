import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { defaultLegalOrg } from "@/lib/legalOrgConfig";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// In-memory defaults for all site configurations
const DEFAULT_CONFIGS: Record<string, any> = {
  site_theme: {
    presetId: "crimson",
    primaryColor: "#BA2421",
    accentColor: "#D4A346",
  },
  site_settings: {
    siteName: "ESM Nusantara",
    tagline: "Wadah Pergerakan Murid Kristus di Nusantara",
    phone: "+62 812-9610-6611",
    email: "halo@esm.or.id",
    address: "Serang, Banten & Ternate, Maluku Utara",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com/esm_nusantara",
    youtube: "https://youtube.com/@esmnusantara",
  },
  about_legal_org: defaultLegalOrg,
  home_hero: {
    kickerId: "GERAKAN PEMURIDAN MISIONAL BAGI GENERASI MUDA",
    kickerEn: "MISSIONAL DISCIPLESHIP MOVEMENT FOR THE NEXT GENERATION",
    headlineId: "Bagi Kemuliaan Kristus dan Masa Depan Nusantara",
    headlineEn: "For Christ's Glory and the Future of Nusantara",
    subheadlineId:
      "Melatih siswa, mahasiswa, dan alumni untuk berakar dalam firman Tuhan, bertumbuh dalam komunitas murid, dan diutus ke tengah dunia kerja serta ladang misi.",
    subheadlineEn:
      "Training high school, university students, and alumni to be rooted in God's word, grow in disciple community, and be sent into the marketplace and mission fields.",
    primaryCtaTextId: "Mulai Bergabung",
    primaryCtaTextEn: "Get Involved",
    primaryCtaUrl: "/pelayanan",
    secondaryCtaTextId: "Dukung Pelayanan",
    secondaryCtaTextEn: "Support Ministry",
    secondaryCtaUrl: "/kemitraan",
  },
  home_why_esm: {
    kickerId: "MENGAPA ESM HADIR?",
    kickerEn: "WHY ESM EXISTS?",
    headlineId: "Sebagai jembatan atas jurang antara pemuridan dan misi yang terdikotomi.",
    headlineEn: "Bridging the chasm between dichotomized discipleship and mission.",
    descriptionId:
      "Kami meyakini pemuridan dan misi bukan dua jalan terpisah. Keduanya bergandengan tangan: murid Kristus hidup di tengah dunia, menghadirkan kebenaran, kabar baik, dan keadilan Allah ke dalamnya.",
    descriptionEn:
      "We believe discipleship and mission are not two separate paths. They walk hand in hand: disciples of Christ live in the world, bringing God's truth, good news, and justice into it.",
    historyLinkTextId: "Pelajari Sejarah & Panggilan Awal",
    historyLinkTextEn: "Learn Our History & Calling",
    historyLinkUrl: "/tentang-kami",

    // Video Profile Card
    videoBadgeId: "VIDEO COMPANY PROFILE ESM",
    videoBadgeEn: "ESM COMPANY PROFILE VIDEO",
    videoTitleId: "Mengenal Hati & Api Gerakan Pemuridan",
    videoTitleEn: "Knowing the Heart & Fire of the Discipleship Movement",
    videoSubtitleId:
      "Dinamika pembinaan siswa sekolah, mahasiswa kampus, dan perintisan misi di Banten serta Maluku Utara.",
    videoSubtitleEn:
      "Dynamics of nurturing high school and university students, and mission pioneering in Banten and North Maluku.",
    videoDuration: "03:45 • Profil ESM",
    videoThumbnail: "/uploads/hero/kemitraan_hero.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    footerTextId: "Dipelajari & disaksikan oleh ratusan siswa, pembina, serta sahabat misi di Nusantara",
    footerTextEn: "Learned & witnessed by hundreds of students, mentors, and mission partners across Nusantara",
    footerCtaTextId: "Tonton Video",
    footerCtaTextEn: "Watch Video",
  },
  home_communities: {
    kickerId: "MATA RANTAI PEMURIDAN",
    kickerEn: "DISCIPLESHIP CHAIN",
    titleId: "Tiga Komunitas, Satu Kegerakan",
    titleEn: "Three Communities, One Movement",
    subtitleId: "Menemani perjalanan iman dari bangku sekolah, ruang kuliah kampus, hingga dunia kerja dan keluarga.",
    subtitleEn: "Accompanying the journey of faith from school benches, university halls, to marketplace and family.",
    explore: {
      stageId: "Tahap 01 • Siswa Sekolah",
      stageEn: "Stage 01 • High School Students",
      titleId: "Explore",
      titleEn: "Explore",
      descId: "Menemani remaja SMP & SMA mengenal Kristus secara personal, membangun ketahanan iman terhadap arus zaman, dan menjadi saksi di lingkungan sekolah.",
      descEn: "Walking alongside junior & senior high students discovering Christ personally, building faith resilience, and witnessing in school.",
      linkTextId: "Pelajari Program Explore",
      linkTextEn: "Explore the Program",
      linkUrl: "/pelayanan/explore",
    },
    encounter: {
      stageId: "Tahap 02 • Mahasiswa Kampus",
      stageEn: "Stage 02 • University Students",
      titleId: "Encounter",
      titleEn: "Encounter",
      descId: "Membangun komunitas persekutuan mahasiswa yang kritis, berakar pada teologi Alkitab, serta aktif menggarami iklim intelektual di Banten dan Ternate.",
      descEn: "Building robust, discerning campus fellowship communities rooted in biblical theology and salting the intellectual climate in Banten and Ternate.",
      linkTextId: "Pelajari Program Encounter",
      linkTextEn: "Explore the Program",
      linkUrl: "/pelayanan/encounter",
    },
    connect: {
      stageId: "Tahap 03 • Alumni & Profesi",
      stageEn: "Stage 03 • Alumni & Marketplace",
      titleId: "Connect",
      titleEn: "Connect",
      descId: "Wadah bagi kaum profesional dan alumni untuk saling meneguhkan integritas iman, mentoring adik-adik, serta mengutus dampak Kerajaan Allah di marketplace.",
      descEn: "A space for young professionals and alumni to sharpen faith integrity, mentor junior students, and advance God's Kingdom in the marketplace.",
      linkTextId: "Pelajari Program Connect",
      linkTextEn: "Explore the Program",
      linkUrl: "/pelayanan/connect",
    },
  },
  home_cta: {
    badgeId: "Kemitraan & Perjalanan Misi",
    badgeEn: "Partnership & Mission Journey",
    titleId: "Setiap Murid yang Bertumbuh Dimulai dari Keberanian Melangkah.",
    titleEn: "Every Growing Disciple Begins with the Courage to Step Forward.",
    descId: "Baik sebagai siswa, mahasiswa, mentor alumni, maupun mitra donatur, setiap dukungan Anda menghidupkan api pelayanan di Tanah Jawara (Banten) dan Kota Rempah (Ternate).",
    descEn: "Whether as a student, university undergrad, alumni mentor, or donor partner, every support of yours rekindles the flame of ministry in Banten and Ternate.",
    primaryCtaTextId: "Dukung Misi (Kemitraan Donasi)",
    primaryCtaTextEn: "Support the Mission (Donations)",
    primaryCtaUrl: "/kemitraan",
    secondaryCtaTextId: "Gabung Kelompok Pemuridan",
    secondaryCtaTextEn: "Join Discipleship Group",
    secondaryCtaUrl: "/gabung",
  },
  home_stats: [
    { number: "15+", labelId: "Tahun Pelayanan", labelEn: "Years of Ministry" },
    { number: "2", labelId: "Fokus Wilayah (Banten & Ternate)", labelEn: "Key Regions (Banten & Ternate)" },
    { number: "500+", labelId: "Murid & Alumni Dibina", labelEn: "Students & Alumni Discipled" },
    { number: "100+", labelId: "Keluarga & Mitra Misi", labelEn: "Mission Partners & Families" },
  ],
  about_history: {
    titleId: "Jejak Langkah & Sejarah ESM",
    titleEn: "History & Footsteps of ESM",
    storyId:
      "Gerakan ESM berawal dari kerinduan melihat generasi muda di ladang-ladang yang minim pembinaan rohani mengalami kasih Kristus. Dimulai di Banten pada tahun 2018 dan berlanjut ke Maluku Utara (Ternate) pada tahun 2021, ESM terus bergerak memuridkan siswa, mahasiswa, dan kaum profesional muda.",
    storyEn:
      "The ESM movement was born from the heartfelt longing to see young people in pioneering fields experience Christ's love. Starting in Banten in 2018 and expanding to North Maluku (Ternate) in 2021, ESM continues discipling high school students, university undergraduates, and young professionals.",
  },
  about_vision_mission: {
    visionId:
      "Melahirkan generasi murid Kristus yang berakar kuat dalam kebenaran Firman, memiliki karakter Kristus, dan diutus menjadi pelaku misi di kampus, tempat kerja, serta pelosok Nusantara.",
    visionEn:
      "To raise a generation of Christ's disciples rooted deeply in Biblical truth, reflecting Christ's character, and sent forth as mission practitioners across campuses, workplaces, and the archipelago.",
  },
  about_regions: {
    bantenTitleId: "Banten (Serang, Cilegon, Rangkasbitung)",
    bantenTitleEn: "Banten (Serang, Cilegon, Rangkasbitung)",
    bantenDescId:
      "Fokus pembinaan siswa SMP-SMA dan persekutuan mahasiswa di wilayah jawara, merawat perintisan kelompok PA dan mentoring.",
    bantenDescEn:
      "Focusing on youth and university fellowships in Banten, nurturing bible study circles and Christian student mentoring.",
    ternateTitleId: "Ternate & Maluku Utara",
    ternateTitleEn: "Ternate & North Maluku",
    ternateDescId:
      "Perintisan asrama mahasiswa perantau di Kota Rempah dan pembinaan pemuda gereja-gereja lokal.",
    ternateDescEn:
      "Pioneering residential student hubs in Ternate and equipping youth in local churches.",
  },
  pelayanan_3c: {
    explore: {
      title: "1. Calling (Panggilan)",
      titleEn: "1. Calling",
      desc: "Membangkitkan kesadaran rohani setiap orang percaya akan panggilan agung menjadi murid dan pelaku misi.",
      descEn:
        "Awakening spiritual awareness in every believer towards the high calling of discipleship and mission.",
    },
    encounter: {
      title: "2. Character (Karakter)",
      titleEn: "2. Character",
      desc: "Proses pemuridan berkesinambungan yang menempa hati, integritas, dan keserupaan dengan Kristus.",
      descEn:
        "A continuous discipleship journey shaping godly heart, integrity, and Christlikeness.",
    },
    connect: {
      title: "3. Commission (Pengutusan)",
      titleEn: "3. Commission",
      desc: "Mengutus murid-murid yang terlatih ke ladang misi, kampus, dunia kerja, dan pelosok Nusantara.",
      descEn:
        "Sending trained disciples to mission fields, campuses, marketplaces, and across Nusantara.",
    },
  },
  pelayanan_communities: {
    items: [
      {
        name: "Pelayanan Siswa (High School)",
        desc: "Kelompok tumbuh bersama bagi siswa SMP & SMA dalam menghadapi pergaulan zaman.",
      },
      {
        name: "Pelayanan Mahasiswa (University)",
        desc: "Persekutuan kampus & asrama binaan mahasiswa di Banten dan Ternate.",
      },
      {
        name: "Pelayanan Alumni & Profesional (Marketplace)",
        desc: "Wadah para sarjana dan pekerja untuk menjadi saksi Kristus di dunia kerja.",
      },
    ],
  },
  bank_config: {
    bankName: "BCA (Bank Central Asia)",
    accountNumber: "869-123-4567",
    accountHolder: "Yayasan Murid Muda Bermisi",
    qrisImageUrl: "/images/qris-esm.png",
  },
};

const fallbackTestimonies = [
  {
    id: "tst-1",
    name: "Jonathan Pratama",
    role: "Alumni Mahasiswa Untirta Serang",
    roleEn: "Untirta Serang Campus Graduate",
    content:
      "Di kelompok pemuridan ESM, saya tidak hanya belajar Alkitab secara teoritis, tetapi diajarkan bagaimana membagikan iman dan memuridkan adik-adik tingkat di kampus.",
    contentEn:
      "In the ESM discipleship group, I didn't just study theology theoretically, but learned how to share my faith and disciple younger students on campus.",
    avatar: "/images/avatar-1.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "tst-2",
    name: "Ruth H. Tomasoa",
    role: "Mahasiswi di Ternate, Maluku Utara",
    roleEn: "University Student in Ternate, North Maluku",
    content:
      "Asrama binaan ESM di Ternate menjadi rumah kedua bagi saya. Di sini kami belajar berdoa bersama dan dipersiapkan menjadi saksi Kristus di tengah masyarakat.",
    contentEn:
      "The ESM residential hub in Ternate became my second home. Here we learn to pray together and are prepared to be witnesses of Christ in society.",
    avatar: "/images/avatar-2.jpg",
    sortOrder: 2,
    isActive: true,
  },
];

const fallbackBulletins = [
  {
    id: "blt-1",
    title: "Warta Misi ESM Edisi 28 — Menyemai Benih di Tanah Jawara",
    titleEn: "ESM Mission News 28th Edition — Sowing Seeds in the Land of Champions",
    description: "Kabar perintisan kelompok pemuridan siswa dan persekutuan mahasiswa di Banten.",
    fileUrl: "/docs/warta-misi-nov-2026.pdf",
    edition: "Edisi November 2026",
    status: "PUBLISHED",
    publishedAt: new Date("2026-11-01T08:00:00Z"),
    createdAt: new Date("2026-11-01T08:00:00Z"),
  },
  {
    id: "blt-2",
    title: "Warta Misi ESM Edisi 27 — Api Misi di Kota Rempah Ternate",
    titleEn: "ESM Mission News 27th Edition — Mission Fire in the Spice City of Ternate",
    description:
      "Catatan pelayanan asrama mahasiswa dan dinamika penginjilan di Halmahera & Ternate.",
    fileUrl: "/docs/warta-misi-okt-2026.pdf",
    edition: "Edisi Oktober 2026",
    status: "PUBLISHED",
    publishedAt: new Date("2026-10-01T08:00:00Z"),
    createdAt: new Date("2026-10-01T08:00:00Z"),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const section = searchParams.get("section");

    const memCache = (globalThis as any).__esmConfigCache as Map<string, string> | undefined;

    // 1. Jika mencari key spesifik
    if (key) {
      if (!isDbKnownOffline()) {
        try {
          const config = await prisma.siteConfig.findUnique({
            where: { key },
          });
          if (config?.value) {
            markDbOnline();
            return NextResponse.json({
              success: true,
              data: JSON.parse(config.value),
            });
          }
        } catch (dbErr) {
          markDbOffline();
        }
      }

      // Check in-memory global cache
      if (memCache && memCache.has(key)) {
        try {
          return NextResponse.json({
            success: true,
            data: JSON.parse(memCache.get(key)!),
          });
        } catch {
          return NextResponse.json({
            success: true,
            data: memCache.get(key),
          });
        }
      }

      // Check default fallback config
      if (key in DEFAULT_CONFIGS) {
        return NextResponse.json({
          success: true,
          data: DEFAULT_CONFIGS[key],
          isDefault: true,
        });
      }

      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    // 2. Jika mencari berdasarkan section 'home'
    if (section === "home") {
      let configs: any[] = [];
      let testimonies: any[] = [];
      let faqs: any[] = [];

      try {
        const [cfg, tst, fq] = await Promise.all([
          prisma.siteConfig
            .findMany({
              where: {
                key: {
                  in: [
                    "home_hero",
                    "home_stats",
                    "home_why_esm",
                    "home_communities",
                    "home_cta",
                    "site_settings",
                  ],
                },
              },
            })
            .catch((err) => {
              console.warn("[api/content] siteConfig query error:", err);
              return [];
            }),
          prisma.testimony
            .findMany({
              where: { isActive: true },
              orderBy: { sortOrder: "asc" },
            })
            .catch(() => []),
          prisma.fAQ
            .findMany({
              where: { page: "GENERAL", isActive: true },
              orderBy: { sortOrder: "asc" },
            })
            .catch(() => []),
        ]);
        configs = cfg;
        testimonies = tst;
        faqs = fq;
        if (cfg.length > 0) markDbOnline();
      } catch (err) {
        console.warn("[api/content] section=home database error:", err);
      }

      const configMap: Record<string, any> = { ...DEFAULT_CONFIGS };
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      // Fallback ke in-memory cache HANYA jika key tidak ditemukan di database
      if (memCache) {
        for (const [k, v] of memCache.entries()) {
          if (!configs.find((c) => c.key === k)) {
            try {
              configMap[k] = JSON.parse(v);
            } catch {
              configMap[k] = v;
            }
          }
        }
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            hero: configMap["home_hero"] || DEFAULT_CONFIGS["home_hero"],
            stats: configMap["home_stats"] || DEFAULT_CONFIGS["home_stats"],
            whyEsm: configMap["home_why_esm"] || DEFAULT_CONFIGS["home_why_esm"],
            communities: configMap["home_communities"] || DEFAULT_CONFIGS["home_communities"],
            ctaCard: configMap["home_cta"] || DEFAULT_CONFIGS["home_cta"],
            settings: configMap["site_settings"] || DEFAULT_CONFIGS["site_settings"],
            testimonies: testimonies.length > 0 ? testimonies : fallbackTestimonies,
            faqs,
          },
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );
    }

    // 3. Section 'about'
    if (section === "about") {
      let configs: any[] = [];
      let team: any[] = [];

      if (!isDbKnownOffline()) {
        try {
          const [cfg, tm] = await Promise.all([
            prisma.siteConfig
              .findMany({
                where: {
                  key: {
                    in: [
                      "about_history",
                      "about_vision_mission",
                      "about_regions",
                      "about_legal_org",
                      "site_settings",
                    ],
                  },
                },
              })
              .catch(() => []),
            prisma.teamMember
              .findMany({
                where: { isActive: true },
                orderBy: { sortOrder: "asc" },
              })
              .catch(() => []),
          ]);
          configs = cfg;
          team = tm;
          markDbOnline();
        } catch (err) {
          markDbOffline();
        }
      }

      const configMap: Record<string, any> = { ...DEFAULT_CONFIGS };
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      if (memCache) {
        for (const [k, v] of memCache.entries()) {
          try {
            configMap[k] = JSON.parse(v);
          } catch {
            configMap[k] = v;
          }
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          history: configMap["about_history"] || DEFAULT_CONFIGS["about_history"],
          visionMission:
            configMap["about_vision_mission"] || DEFAULT_CONFIGS["about_vision_mission"],
          regions: configMap["about_regions"] || DEFAULT_CONFIGS["about_regions"],
          legalOrg: configMap["about_legal_org"] || defaultLegalOrg,
          settings: configMap["site_settings"] || DEFAULT_CONFIGS["site_settings"],
          team,
        },
      });
    }

    // 4. Section 'pelayanan'
    if (section === "pelayanan") {
      let configs: any[] = [];
      if (!isDbKnownOffline()) {
        try {
          configs = await prisma.siteConfig
            .findMany({
              where: {
                key: { in: ["pelayanan_3c", "pelayanan_communities", "site_settings"] },
              },
            })
            .catch(() => []);
          markDbOnline();
        } catch {
          markDbOffline();
        }
      }

      const configMap: Record<string, any> = { ...DEFAULT_CONFIGS };
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      if (memCache) {
        for (const [k, v] of memCache.entries()) {
          try {
            configMap[k] = JSON.parse(v);
          } catch {
            configMap[k] = v;
          }
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          framework3C: configMap["pelayanan_3c"] || DEFAULT_CONFIGS["pelayanan_3c"],
          communities:
            configMap["pelayanan_communities"] || DEFAULT_CONFIGS["pelayanan_communities"],
          settings: configMap["site_settings"] || DEFAULT_CONFIGS["site_settings"],
        },
      });
    }

    // 5. Section 'media'
    if (section === "media") {
      let bulletins: any[] = [];
      let mediaItems: any[] = [];

      if (!isDbKnownOffline()) {
        try {
          const [blt, mda] = await Promise.all([
            prisma.bulletin
              .findMany({
                orderBy: { createdAt: "desc" },
              })
              .catch(() => []),
            prisma.mediaItem
              .findMany({
                orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
              })
              .catch(() => []),
          ]);
          bulletins = blt;
          mediaItems = mda;
          markDbOnline();
        } catch {
          markDbOffline();
        }
      }

      const activeBulletins =
        bulletins.length > 0
          ? bulletins
          : (globalThis as any).__esmBulletins || fallbackBulletins;

      return NextResponse.json({
        success: true,
        data: {
          bulletins: activeBulletins,
          mediaItems,
        },
      });
    }

    // 6. Section 'kemitraan'
    if (section === "kemitraan") {
      let configs: any[] = [];
      let prayers: any[] = [];
      let faqs: any[] = [];

      if (!isDbKnownOffline()) {
        try {
          const [cfg, pry, fq] = await Promise.all([
            prisma.siteConfig
              .findMany({
                where: {
                  key: { in: ["bank_config", "site_settings"] },
                },
              })
              .catch(() => []),
            prisma.prayerRequest
              .findMany({
                orderBy: { createdAt: "desc" },
                take: 10,
              })
              .catch(() => []),
            prisma.fAQ
              .findMany({
                where: { page: "KEMITRAAN", isActive: true },
                orderBy: { sortOrder: "asc" },
              })
              .catch(() => []),
          ]);
          configs = cfg;
          prayers = pry;
          faqs = fq;
          markDbOnline();
        } catch {
          markDbOffline();
        }
      }

      const configMap: Record<string, any> = { ...DEFAULT_CONFIGS };
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      if (memCache) {
        for (const [k, v] of memCache.entries()) {
          try {
            configMap[k] = JSON.parse(v);
          } catch {
            configMap[k] = v;
          }
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          bank: configMap["bank_config"] || DEFAULT_CONFIGS["bank_config"],
          settings: configMap["site_settings"] || DEFAULT_CONFIGS["site_settings"],
          prayers,
          faqs,
        },
      });
    }

    // 7. Default: Return all configs merged with defaults
    const result: Record<string, any> = { ...DEFAULT_CONFIGS };
    if (!isDbKnownOffline()) {
      try {
        const allConfigs = await prisma.siteConfig.findMany().catch(() => []);
        for (const c of allConfigs) {
          try {
            result[c.key] = JSON.parse(c.value);
          } catch {
            result[c.key] = c.value;
          }
        }
        markDbOnline();
      } catch {
        markDbOffline();
      }
    }

    if (memCache) {
      for (const [k, v] of memCache.entries()) {
        try {
          result[k] = JSON.parse(v);
        } catch {
          result[k] = v;
        }
      }
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.warn("Fallback returned in /api/content:", error);
    return NextResponse.json({
      success: true,
      data: DEFAULT_CONFIGS,
      isFallback: true,
    });
  }
}
