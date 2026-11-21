export type PageStatus = "ACTIVE" | "COMING_SOON";

export interface PageStatusItem {
  path: string;
  title: string;
  titleEn?: string;
  category: "Pelayanan" | "Kabar & Doa" | "Tentang & Lainnya";
  status: PageStatus;
  customMessage?: string;
  customMessageEn?: string;
}

export const DEFAULT_PAGE_STATUSES: PageStatusItem[] = [
  {
    path: "/sumber-daya",
    title: "Bahan Ajar & Panduan KTB",
    titleEn: "Teaching Materials & Guides",
    category: "Kabar & Doa",
    status: "COMING_SOON",
    customMessage: "Modul penuntun saat teduh dan bahan ajar pembuat murid sedang dipersiapkan oleh tim pelayanan kami.",
    customMessageEn: "Discipleship modules and study guides are currently being curated by our ministry team.",
  },
  {
    path: "/pelayanan/explore",
    title: "Explore (Siswa SMP-SMA)",
    titleEn: "Explore (High School Discipleship)",
    category: "Pelayanan",
    status: "ACTIVE",
  },
  {
    path: "/pelayanan/encounter",
    title: "Encounter (Mahasiswa Kampus)",
    titleEn: "Encounter (University Discipleship)",
    category: "Pelayanan",
    status: "ACTIVE",
  },
  {
    path: "/pelayanan/connect",
    title: "Connect (Alumni & Profesional)",
    titleEn: "Connect (Marketplace & Alumni)",
    category: "Pelayanan",
    status: "ACTIVE",
  },
  {
    path: "/renungan",
    title: "Renungan & Saat Teduh",
    titleEn: "Devotional & Quiet Time",
    category: "Kabar & Doa",
    status: "ACTIVE",
  },
  {
    path: "/doa",
    title: "Pokok Doa & Mezbah Syafaat",
    titleEn: "Prayer Wall",
    category: "Kabar & Doa",
    status: "ACTIVE",
  },
  {
    path: "/artikel",
    title: "Warta Misi & Kabar Ladang",
    titleEn: "Mission News & Field Updates",
    category: "Kabar & Doa",
    status: "ACTIVE",
  },
  {
    path: "/agenda",
    title: "Agenda & Kalender Kegiatan",
    titleEn: "Events & Ministry Calendar",
    category: "Tentang & Lainnya",
    status: "ACTIVE",
  },
  {
    path: "/kemitraan",
    title: "Kemitraan & Persembahan Misi",
    titleEn: "Partnership & Mission Giving",
    category: "Tentang & Lainnya",
    status: "ACTIVE",
  },
];
