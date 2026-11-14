/**
 * donationsFallback.ts
 * In-memory fallback untuk data donasi mitra kemitraan misi
 * Menjamin API /api/donations dan form publik /kemitraan selalu bekerja 100%
 */

export interface FallbackDonation {
  id: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  amount: number;
  type: string;
  message: string | null;
  status: string;
  confirmedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const initialDonations: FallbackDonation[] = [
  {
    id: "don-1",
    donorName: "Alumni Angkatan 2020",
    donorEmail: "alumni2020@example.com",
    donorPhone: "081298765432",
    amount: 500000,
    type: "MITRA_BULANAN",
    message: "Untuk dukungan pembinaan kelompok siswa di Banten",
    status: "CONFIRMED",
    confirmedAt: new Date("2026-11-01T10:00:00Z"),
    createdAt: new Date("2026-11-01T09:30:00Z"),
    updatedAt: new Date("2026-11-01T10:00:00Z"),
  },
  {
    id: "don-2",
    donorName: "Sahabat Misi (Anonim)",
    donorEmail: null,
    donorPhone: "081387654321",
    amount: 300000,
    type: "SEKALI_BERI",
    message: "Dukungan operasional pos binaan mahasiswa di Kota Rempah Ternate",
    status: "PENDING",
    createdAt: new Date("2026-11-10T14:00:00Z"),
    updatedAt: new Date("2026-11-10T14:00:00Z"),
  },
];

let globalDonations: FallbackDonation[] =
  ((globalThis as any).__esmDonationsFallback as FallbackDonation[]) ||
  [...initialDonations];

(globalThis as any).__esmDonationsFallback = globalDonations;

export function getMemoryDonations(status?: string | null): FallbackDonation[] {
  if (status && status !== "ALL") {
    return globalDonations.filter((d) => d.status === status);
  }
  return [...globalDonations];
}

export function saveMemoryDonation(data: Omit<FallbackDonation, "id" | "createdAt" | "updatedAt">): FallbackDonation {
  const newDonation: FallbackDonation = {
    id: "mem-don-" + Date.now(),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  globalDonations.unshift(newDonation);
  return newDonation;
}

export function updateMemoryDonationStatus(id: string, status: string): boolean {
  const item = globalDonations.find((d) => d.id === id);
  if (item) {
    item.status = status;
    if (status === "CONFIRMED") {
      item.confirmedAt = new Date();
    }
    item.updatedAt = new Date();
    return true;
  }
  return false;
}
