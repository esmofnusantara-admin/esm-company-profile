"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Community } from "@prisma/client";
import { isDbKnownOffline, markDbOffline, markDbOnline } from "@/lib/dbStatus";

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

const initialTeamMembers = [
  {
    id: "tm-1",
    name: "Pdt. Samuel Hendrawan",
    role: "Ketua Dewan Pembina",
    roleEn: "Chairman of the Advisory Board",
    community: Community.ALL,
    photo: "/images/team-1.jpg",
    bio: "Melayani gerakan misi dan pemuridan generasi muda di Nusantara lebih dari 20 tahun.",
    bioEn: "Serving youth discipleship and mission movements across Indonesia for over 20 years.",
    whatsapp: "+62 812-9610-6611",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "tm-2",
    name: "Yohanes Setiawan, S.Pd.",
    role: "Koordinator Nasional Gerakan ESM",
    roleEn: "National Coordinator of ESM Movement",
    community: Community.ALL,
    photo: "/images/team-2.jpg",
    bio: "Memimpin perintisan pelayanan siswa dan mahasiswa di Banten dan Ternate.",
    bioEn: "Leading pioneering student and campus ministry across Banten and Ternate.",
    whatsapp: "+62 813-8820-1922",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "tm-3",
    name: "Debora Anggraini, S.Kom.",
    role: "Koordinator Pelayanan Siswa & Remaja",
    roleEn: "High School Ministry Coordinator",
    community: Community.EXPLORE,
    photo: "/images/team-3.jpg",
    bio: "Mendampingi kelompok pemuridan siswa SMP & SMA di Banten.",
    bioEn: "Mentoring student discipleship circles in Banten.",
    whatsapp: "+62 811-9234-5501",
    sortOrder: 3,
    isActive: true,
  },
];

function getMemoryTeam(): any[] {
  if (!(globalThis as any).__esmTeam) {
    (globalThis as any).__esmTeam = [...initialTeamMembers];
  }
  return (globalThis as any).__esmTeam;
}

export async function getTeamMembers() {
  if (isDbKnownOffline()) {
    return getMemoryTeam();
  }

  try {
    const items = await prisma.teamMember.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    markDbOnline();
    if (items && items.length > 0) {
      (globalThis as any).__esmTeam = [...items];
      return items;
    }
    return getMemoryTeam();
  } catch (error) {
    markDbOffline();
    console.warn("[WARN] PostgreSQL offline, mengambil data pengurus dari fallback memori.");
    return getMemoryTeam();
  }
}

import { requireAdminSession } from "@/lib/adminSession";

export async function createTeamMember(input: TeamMemberInput) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true, id: member.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menambah anggota tim:", error);
    return { success: false, error: "Gagal menyimpan data pengurus ke database." };
  }
}

export async function updateTeamMember(id: string, input: Partial<TeamMemberInput>) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

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

    markDbOnline();
    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true, id: member.id };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal memperbarui anggota tim:", error);
    return { success: false, error: "Gagal memperbarui data pengurus di database." };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await requireAdminSession(["SUPER_ADMIN", "CONTENT_ADMIN"]);

    await prisma.teamMember.delete({ where: { id } });
    markDbOnline();

    revalidatePath("/tentang-kami");
    revalidatePath("/admin/konten/tentang-kami");
    return { success: true };
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return { success: false, error: "Sesi tidak valid atau hak akses tidak mencukupi." };
    }
    markDbOffline();
    console.error("Gagal menghapus anggota tim:", error);
    return { success: false, error: "Gagal menghapus anggota dari database." };
  }
}
