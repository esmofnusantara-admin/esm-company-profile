"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { markDbOffline, markDbOnline } from "@/lib/dbStatus";
import { initialTestimonies, type TestimonyInput } from "@/lib/testimonyData";

export type { TestimonyInput };

function getMemoryTestimonies(): any[] {
  if (!(globalThis as any).__esmTestimonies) {
    (globalThis as any).__esmTestimonies = [...initialTestimonies];
  }
  return (globalThis as any).__esmTestimonies;
}

export async function getTestimonies() {
  try {
    const items = await prisma.testimony.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    markDbOnline();

    if (items && items.length > 0) {
      (globalThis as any).__esmTestimonies = [...items];
      return items;
    }

    // Auto-seed initial testimonies if table is completely empty
    try {
      const count = await prisma.testimony.count();
      if (count === 0) {
        for (const t of initialTestimonies) {
          await prisma.testimony.create({
            data: {
              name: t.name,
              role: t.role,
              quote: t.quote,
              quoteEn: t.quoteEn,
              photo: t.photo,
              sortOrder: t.sortOrder,
              isActive: t.isActive,
            },
          });
        }
        const seeded = await prisma.testimony.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        });
        (globalThis as any).__esmTestimonies = [...seeded];
        return seeded;
      }
    } catch (seedErr) {
      console.warn("[actions/testimony] Auto-seed error:", seedErr);
    }

    return getMemoryTestimonies();
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil testimoni dari fallback memori:", error);
    return getMemoryTestimonies();
  }
}

export async function createTestimony(input: TestimonyInput) {
  try {
    if (!input.name || !input.quote) {
      return { success: false, error: "Nama dan kutipan testimoni wajib diisi." };
    }

    const memoryList = getMemoryTestimonies();
    const newItem = {
      id: "tst-" + Date.now(),
      name: input.name,
      role: input.role || null,
      quote: input.quote,
      quoteEn: input.quoteEn || null,
      photo: input.photo || null,
      sortOrder: input.sortOrder ?? 0,
      isActive: input.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    memoryList.push(newItem);

    try {
      const item = await prisma.testimony.create({
        data: {
          name: input.name,
          role: input.role || null,
          quote: input.quote,
          quoteEn: input.quoteEn || null,
          photo: input.photo || null,
          sortOrder: input.sortOrder ?? 0,
          isActive: input.isActive ?? true,
        },
      });
      newItem.id = item.id;
      markDbOnline();
    } catch (dbError) {
      console.error("[actions/testimony] create error in db:", dbError);
      markDbOffline();
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    revalidatePath("/admin/konten/beranda");
    return { success: true, id: newItem.id };
  } catch (error) {
    console.error("Gagal menambah testimoni:", error);
    return { success: false, error: "Gagal menyimpan testimoni." };
  }
}

export async function updateTestimony(id: string, input: Partial<TestimonyInput>) {
  try {
    const memoryList = getMemoryTestimonies();
    const idx = memoryList.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryList[idx] = { ...memoryList[idx], ...input, updatedAt: new Date() };
    }

    try {
      const item = await prisma.testimony.update({
        where: { id },
        data: {
          ...(input.name !== undefined && { name: input.name }),
          ...(input.role !== undefined && { role: input.role }),
          ...(input.quote !== undefined && { quote: input.quote }),
          ...(input.quoteEn !== undefined && { quoteEn: input.quoteEn }),
          ...(input.photo !== undefined && { photo: input.photo }),
          ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
          ...(input.isActive !== undefined && { isActive: input.isActive }),
        },
      });
      markDbOnline();
      revalidatePath("/");
      revalidatePath("/admin/konten/testimoni");
      revalidatePath("/admin/konten/beranda");
      return { success: true, id: item.id };
    } catch (dbError) {
      console.error("[actions/testimony] update error in db:", dbError);
      markDbOffline();
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    revalidatePath("/admin/konten/beranda");
    return { success: true, id };
  } catch (error) {
    console.error("Gagal memperbarui testimoni:", error);
    return { success: false, error: "Gagal memperbarui data testimoni." };
  }
}

export async function deleteTestimony(id: string) {
  try {
    const memoryList = getMemoryTestimonies();
    const idx = memoryList.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryList.splice(idx, 1);
    }

    try {
      await prisma.testimony.delete({ where: { id } });
      markDbOnline();
    } catch (dbError) {
      console.error("[actions/testimony] delete error in db:", dbError);
      markDbOffline();
    }

    revalidatePath("/");
    revalidatePath("/admin/konten/testimoni");
    revalidatePath("/admin/konten/beranda");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus testimoni:", error);
    return { success: false, error: "Gagal menghapus data testimoni." };
  }
}
