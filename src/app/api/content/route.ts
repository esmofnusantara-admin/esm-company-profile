import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { defaultLegalOrg } from "@/lib/legalOrgConfig";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

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
    badge: "Gerakan Pemuridan & Misi Nusantara",
    badgeEn: "Discipleship & Mission Movement of the Archipelago",
    title: "Menjangkau Jiwa, Memuridkan Bangsa",
    titleEn: "Reaching Souls, Discipling Nations",
    subtitle:
      "Melahirkan generasi murid Kristus yang berakar kuat dalam kebenaran Firman dan berbuah lebat di ladang misi Banten, Ternate, dan seluruh penjuru Indonesia.",
    subtitleEn:
      "Raising a generation of disciples rooted in Biblical truth and bearing fruitful witness across mission fields in Banten, Ternate, and throughout Indonesia.",
    ctaPrimaryText: "Pelajari Lebih Lanjut",
    ctaPrimaryTextEn: "Learn More",
    ctaPrimaryLink: "/tentang-kami",
    ctaSecondaryText: "Bergabung Bersama Kami",
    ctaSecondaryTextEn: "Join Us",
    ctaSecondaryLink: "/gabung",
  },
  home_hero_card: {
    title: "Perintisan Ladang Banten & Ternate",
    titleEn: "Pioneering in Banten & Ternate",
    desc: "Membina mahasiswa dan siswa di Serang, Cilegon, Rangkasbitung, serta mendirikan pos asrama mahasiswa perantau di Kota Rempah Ternate.",
    descEn:
      "Nurturing students across Banten, and pioneering student residential fellowship hubs in Ternate.",
  },
  home_values: {
    items: [
      {
        title: "Christ-Centered",
        desc: "Semua pengajaran dan pergerakan berpusat pada pribadi dan karya Yesus Kristus.",
      },
      {
        title: "Gospel-Driven",
        desc: "Digerakkan oleh kabar baik anugerah keselamatan untuk menjangkau setiap jiwa.",
      },
      {
        title: "Discipleship-Focused",
        desc: "Pemuridan relasional yang intensional, menghasilkan reproduksi murid sejati.",
      },
      {
        title: "Community-Living",
        desc: "Hidup saling melayani dalam tubuh Kristus yang saling menguatkan.",
      },
    ],
  },
  home_stats: {
    students: "350+",
    cities: "2 Wilayah Fokus (Banten & Ternate)",
    discipleshipGroups: "45+",
    volunteers: "80+",
  },
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

      if (!isDbKnownOffline()) {
        try {
          const [cfg, tst, fq] = await Promise.all([
            prisma.siteConfig
              .findMany({
                where: {
                  key: {
                    in: [
                      "home_hero",
                      "home_hero_card",
                      "home_values",
                      "home_stats",
                      "site_settings",
                    ],
                  },
                },
              })
              .catch(() => []),
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
          hero: configMap["home_hero"] || DEFAULT_CONFIGS["home_hero"],
          heroCard: configMap["home_hero_card"] || DEFAULT_CONFIGS["home_hero_card"],
          values: configMap["home_values"] || DEFAULT_CONFIGS["home_values"],
          stats: configMap["home_stats"] || DEFAULT_CONFIGS["home_stats"],
          settings: configMap["site_settings"] || DEFAULT_CONFIGS["site_settings"],
          testimonies: testimonies.length > 0 ? testimonies : fallbackTestimonies,
          faqs,
        },
      });
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
