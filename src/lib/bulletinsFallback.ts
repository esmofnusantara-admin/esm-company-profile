import { PublishStatus } from "@prisma/client";

export interface FallbackBulletin {
  id: string;
  title: string;
  titleEn?: string | null;
  edition?: string | null;
  description?: string | null;
  fileUrl: string;
  status?: PublishStatus | string;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
}

export const initialBulletins: FallbackBulletin[] = [
  {
    id: "blt-1",
    title: "Warta Misi ESM Edisi 28 — Menyemai Benih di Tanah Jawara",
    titleEn: "ESM Mission News 28th Edition — Sowing Seeds in the Land of Champions",
    edition: "Edisi November 2026",
    description: "Kabar perintisan kelompok pemuridan siswa dan persekutuan mahasiswa di Banten.",
    fileUrl: "/docs/warta-misi-nov-2026.pdf",
    status: PublishStatus.PUBLISHED,
    publishedAt: new Date("2026-11-01T08:00:00Z"),
    createdAt: new Date("2026-11-01T08:00:00Z"),
    updatedAt: new Date("2026-11-01T08:00:00Z"),
  },
  {
    id: "blt-2",
    title: "Warta Misi ESM Edisi 27 — Api Misi di Kota Rempah Ternate",
    titleEn: "ESM Mission News 27th Edition — Mission Fire in the Spice City of Ternate",
    edition: "Edisi Oktober 2026",
    description: "Catatan pelayanan asrama mahasiswa dan dinamika penginjilan di Halmahera & Ternate.",
    fileUrl: "/docs/warta-misi-okt-2026.pdf",
    status: PublishStatus.PUBLISHED,
    publishedAt: new Date("2026-10-01T08:00:00Z"),
    createdAt: new Date("2026-10-01T08:00:00Z"),
    updatedAt: new Date("2026-10-01T08:00:00Z"),
  },
];

export function getMemoryBulletins(): FallbackBulletin[] {
  if (!(globalThis as any).__esmBulletins) {
    (globalThis as any).__esmBulletins = [...initialBulletins];
  }
  return (globalThis as any).__esmBulletins;
}

export function saveMemoryBulletin(bulletin: FallbackBulletin): FallbackBulletin {
  const list = getMemoryBulletins();
  const idx = list.findIndex((b) => b.id === bulletin.id);
  if (idx !== -1) {
    list[idx] = { ...list[idx], ...bulletin };
  } else {
    list.unshift(bulletin);
  }
  return bulletin;
}

export function deleteMemoryBulletin(id: string): void {
  const list = getMemoryBulletins();
  const idx = list.findIndex((b) => b.id === id);
  if (idx !== -1) {
    list.splice(idx, 1);
  }
}
