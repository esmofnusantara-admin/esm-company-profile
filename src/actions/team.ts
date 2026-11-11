"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Community } from "@prisma/client";

export interface TeamMemberInput {
  name: string;
  role: string;
  roleEn?: string;
  community?: Community;
  photo?: string;
  bio?: string;
  bioEn?: string;
  whatsapp?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.error("Gagal mengambil data tim:", error);
    return [];
  }
}

export async function createTeamMember(input: TeamMemberInput) {
  try {
    if (!input.name || !input.role) {
      return { success: false, error: "Nama dan jabatan wajib diisi." };
    }

    const member = await prisma.teamMember.create({
      data: {
        name: input.name,
        role: input.role,
        roleEn: input.roleEn || null,
        community: input.community || Community.ALL,
        photo: input.photo || null,
        bio: input.bio || null,
        bioEn: input.bioEn || null,
        whatsapp: input.whatsapp || null,
        sortOrder: input.sortOrder ?? 0,
        isActive: input.isActive ?? true,
      },
    });

    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true, id: member.id };
  } catch (error) {
    console.error("Gagal menambah anggota tim:", error);
    return { success: false, error: "Gagal menyimpan data pengurus." };
  }
}

export async function updateTeamMember(id: string, input: Partial<TeamMemberInput>) {
  try {
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        ...(input.name !== undefined && { name: input.name }),
        ...(input.role !== undefined && { role: input.role }),
        ...(input.roleEn !== undefined && { roleEn: input.roleEn }),
        ...(input.community !== undefined && { community: input.community }),
        ...(input.photo !== undefined && { photo: input.photo }),
        ...(input.bio !== undefined && { bio: input.bio }),
        ...(input.bioEn !== undefined && { bioEn: input.bioEn }),
        ...(input.whatsapp !== undefined && { whatsapp: input.whatsapp }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
      },
    });

    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true, id: member.id };
  } catch (error) {
    console.error("Gagal memperbarui anggota tim:", error);
    return { success: false, error: "Gagal memperbarui data pengurus." };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus anggota tim:", error);
    return { success: false, error: "Gagal menghapus anggota." };
  }
}
