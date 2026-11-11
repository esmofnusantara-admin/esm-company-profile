import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const section = searchParams.get("section");

    // Jika mencari key spesifik
    if (key) {
      const config = await prisma.siteConfig.findUnique({
        where: { key },
      });
      return NextResponse.json({
        success: true,
        data: config ? JSON.parse(config.value) : null,
      });
    }

    // Jika mencari berdasarkan section
    if (section === "home") {
      const [configs, testimonies, faqs] = await Promise.all([
        prisma.siteConfig.findMany({
          where: {
            key: { in: ["home_hero", "home_values", "home_stats", "site_settings"] },
          },
        }),
        prisma.testimony.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        }),
        prisma.fAQ.findMany({
          where: { page: "GENERAL", isActive: true },
          orderBy: { sortOrder: "asc" },
        }),
      ]);

      const configMap: Record<string, any> = {};
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          hero: configMap["home_hero"] || null,
          values: configMap["home_values"] || null,
          stats: configMap["home_stats"] || null,
          settings: configMap["site_settings"] || null,
          testimonies,
          faqs,
        },
      });
    }

    if (section === "about") {
      const [configs, team] = await Promise.all([
        prisma.siteConfig.findMany({
          where: {
            key: { in: ["about_history", "about_vision_mission", "about_regions", "site_settings"] },
          },
        }),
        prisma.teamMember.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        }),
      ]);

      const configMap: Record<string, any> = {};
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          history: configMap["about_history"] || null,
          visionMission: configMap["about_vision_mission"] || null,
          regions: configMap["about_regions"] || null,
          settings: configMap["site_settings"] || null,
          team,
        },
      });
    }

    if (section === "pelayanan") {
      const configs = await prisma.siteConfig.findMany({
        where: {
          key: { in: ["pelayanan_3c", "pelayanan_communities", "site_settings"] },
        },
      });

      const configMap: Record<string, any> = {};
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          framework3C: configMap["pelayanan_3c"] || null,
          communities: configMap["pelayanan_communities"] || null,
          settings: configMap["site_settings"] || null,
        },
      });
    }

    if (section === "media") {
      const [bulletins, mediaItems] = await Promise.all([
        prisma.bulletin.findMany({
          orderBy: { createdAt: "desc" },
        }),
        prisma.mediaItem.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        }),
      ]);

      return NextResponse.json({
        success: true,
        data: {
          bulletins,
          mediaItems,
        },
      });
    }

    if (section === "kemitraan") {
      const [configs, prayers, faqs] = await Promise.all([
        prisma.siteConfig.findMany({
          where: {
            key: { in: ["bank_config", "site_settings"] },
          },
        }),
        prisma.prayerRequest.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
        prisma.fAQ.findMany({
          where: { page: "KEMITRAAN", isActive: true },
          orderBy: { sortOrder: "asc" },
        }),
      ]);

      const configMap: Record<string, any> = {};
      for (const c of configs) {
        try {
          configMap[c.key] = JSON.parse(c.value);
        } catch {
          configMap[c.key] = c.value;
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          bank: configMap["bank_config"] || null,
          settings: configMap["site_settings"] || null,
          prayers,
          faqs,
        },
      });
    }

    // Default: return all configs
    const allConfigs = await prisma.siteConfig.findMany();
    const result: Record<string, any> = {};
    for (const c of allConfigs) {
      try {
        result[c.key] = JSON.parse(c.value);
      } catch {
        result[c.key] = c.value;
      }
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Gagal mengambil data content:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data konten." },
      { status: 500 }
    );
  }
}
