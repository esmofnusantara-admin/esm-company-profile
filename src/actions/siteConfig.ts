"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

// Global fallback cache if PostgreSQL is offline
const memoryConfigCache = ((globalThis as any).__esmConfigCache =
  (globalThis as any).__esmConfigCache || new Map<string, string>());

/**
 * Mengambil konfigurasi situs berdasarkan key
 */
export async function getSiteConfig<T = any>(key: string, defaultValue: T): Promise<T> {
  if (isDbKnownOffline()) {
    const memVal = memoryConfigCache.get(key);
    if (memVal) {
      try {
        return JSON.parse(memVal) as T;
      } catch {}
    }
    return defaultValue;
  }

  try {
    const config = await prisma.siteConfig.findUnique({
      where: { key },
    });
    markDbOnline();
    if (config?.value) {
      memoryConfigCache.set(key, config.value);
      return JSON.parse(config.value) as T;
    }
    const memVal = memoryConfigCache.get(key);
    if (memVal) {
      return JSON.parse(memVal) as T;
    }
    return defaultValue;
  } catch (error) {
    markDbOffline();
    const memVal = memoryConfigCache.get(key);
    if (memVal) {
      try {
        return JSON.parse(memVal) as T;
      } catch {}
    }
    return defaultValue;
  }
}

/**
 * Mengambil banyak konfigurasi situs sekaligus
 */
export async function getMultiSiteConfig(keys: string[]): Promise<Record<string, any>> {
  const result: Record<string, any> = {};

  if (isDbKnownOffline()) {
    for (const k of keys) {
      if (memoryConfigCache.has(k)) {
        try {
          result[k] = JSON.parse(memoryConfigCache.get(k)!);
        } catch {}
      }
    }
    return result;
  }

  try {
    const configs = await prisma.siteConfig.findMany({
      where: { key: { in: keys } },
    });
    markDbOnline();
    for (const c of configs) {
      memoryConfigCache.set(c.key, c.value);
      try {
        result[c.key] = JSON.parse(c.value);
      } catch {
        result[c.key] = c.value;
      }
    }
    for (const k of keys) {
      if (!(k in result) && memoryConfigCache.has(k)) {
        try {
          result[k] = JSON.parse(memoryConfigCache.get(k)!);
        } catch {}
      }
    }
    return result;
  } catch (error) {
    markDbOffline();
    for (const k of keys) {
      if (memoryConfigCache.has(k)) {
        try {
          result[k] = JSON.parse(memoryConfigCache.get(k)!);
        } catch {}
      }
    }
    return result;
  }
}

/**
 * Menyimpan / memperbarui konfigurasi situs
 */
export async function saveSiteConfig(key: string, data: any) {
  const value = JSON.stringify(data);
  memoryConfigCache.set(key, value);

  if (!isDbKnownOffline()) {
    try {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
      markDbOnline();
    } catch (error) {
      markDbOffline();
      console.warn(`[WARN] PostgreSQL offline, konfigurasi disimpan di in-memory cache [${key}].`);
    }
  }

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
}
