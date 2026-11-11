"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Mengambil konfigurasi situs berdasarkan key
 */
export async function getSiteConfig<T = any>(key: string, defaultValue: T): Promise<T> {
  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key },
    });
    if (!config || !config.value) return defaultValue;
    return JSON.parse(config.value) as T;
  } catch (error) {
    console.error(`Gagal mengambil site config [${key}]:`, error);
    return defaultValue;
  }
}

/**
 * Mengambil banyak konfigurasi situs sekaligus
 */
export async function getMultiSiteConfig(keys: string[]): Promise<Record<string, any>> {
  try {
    const configs = await prisma.siteConfig.findMany({
      where: { key: { in: keys } },
    });
    const result: Record<string, any> = {};
    for (const c of configs) {
      try {
        result[c.key] = JSON.parse(c.value);
      } catch {
        result[c.key] = c.value;
      }
    }
    return result;
  } catch (error) {
    console.error("Gagal mengambil multi site config:", error);
    return {};
  }
}

/**
 * Menyimpan / memperbarui konfigurasi situs
 */
export async function saveSiteConfig(key: string, data: any) {
  try {
    const value = JSON.stringify(data);
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    // Revalidate paths affected
    revalidatePath("/");
    revalidatePath("/tentang-kami");
    revalidatePath("/pelayanan");
    revalidatePath("/pelayanan/3c");
    revalidatePath("/pelayanan/explore");
    revalidatePath("/pelayanan/encounter");
    revalidatePath("/pelayanan/connect");
    revalidatePath("/kemitraan");
    revalidatePath("/admin/konten/beranda");
    revalidatePath("/admin/konten/tentang-kami");
    revalidatePath("/admin/konten/pelayanan");
    revalidatePath("/admin/pengaturan");

    return { success: true };
  } catch (error) {
    console.error(`Gagal menyimpan site config [${key}]:`, error);
    return { success: false, error: "Gagal menyimpan konfigurasi situs." };
  }
}
