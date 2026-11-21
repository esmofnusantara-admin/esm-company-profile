export interface CommunitySlide {
  src: string;
  alt?: string;
  badge?: string;
  title?: string;
  caption?: string;
}

export interface CommunityDetail {
  slug: string; // "explore" | "encounter" | "connect"
  name: string;
  titleId: string;
  titleEn: string;
  taglineId: string;
  taglineEn: string;
  descId: string;
  descEn: string;
  mediaUrl: string; // Foto Utama / Hero Banner
  heroTitle?: string;
  heroCaption?: string;
  galleryImages?: string[]; // Foto-foto galeri tambahan untuk carousel
  slides?: CommunitySlide[]; // Slide kustom
}

export const defaultCommunities: CommunityDetail[] = [
  {
    slug: "explore",
    name: "Explore Community",
    titleId: "Pembinaan Siswa Sekolah Menengah (SMA/SMK)",
    titleEn: "High School Discipleship (Explore)",
    taglineId: "Menemukan Identitas Diri di Dalam Kristus",
    taglineEn: "Discovering Identity in Christ",
    descId: "Membekali remaja dan siswa SMA dengan kebenaran Alkitab di tengah pergumulan masa muda, pengaruh pergaulan, dan persiapan menuju gerbang perkuliahan.",
    descEn: "Equipping teenagers and high school students with biblical truth amid youth challenges, peer pressure, and university transition.",
    mediaUrl: "/uploads/pelayanan/explore_hero.jpg",
    heroTitle: "Kehangatan Komunitas Explore",
    heroCaption: "Belajar Alkitab bukan membosankan saat kita mendiskusikannya bersama teman-teman yang tulus dan kakak pembina yang setia mendengar.",
    galleryImages: [],
  },
  {
    slug: "encounter",
    name: "Encounter Community",
    titleId: "Gerakan Mahasiswa di Kampus Perguruan Tinggi",
    titleEn: "Campus Student Movement (Encounter)",
    taglineId: "Berjumpa dengan Kristus, Memuridkan Kampus",
    taglineEn: "Encountering Christ, Discipling the Campus",
    descId: "Membimbing mahasiswa menjadi apologis iman yang tangguh, aktif dalam kelompok pemuridan intensif, dan berintegritas dalam akademik.",
    descEn: "Mentoring university students into steadfast faith apologists, active discipleship groups, and high academic integrity.",
    mediaUrl: "/uploads/pelayanan/encounter_1.jpg",
    heroTitle: "KTB Kampus • Banten & Ternate",
    heroCaption: "Membentengi iman mahasiswa dari relativisme moral dan skeptisisme melalui dialog Alkitabiah yang kritis dan terbuka.",
    galleryImages: ["/uploads/pelayanan/encounter_2.jpg"],
  },
  {
    slug: "connect",
    name: "Connect Community",
    titleId: "Jaringan Alumni & Profesional Kerja",
    titleEn: "Alumni & Marketplace Network (Connect)",
    taglineId: "Membawa Terang Kristus ke Dunia Profesional",
    taglineEn: "Bringing Christ's Light into the Professional Realm",
    descId: "Wadah alumni untuk tetap terhubung, saling menopang dalam doa dan panggilan dunia kerja, serta menjadi mentor bagi adik-adik mahasiswa.",
    descEn: "Platform for graduates to stay connected, support one another in workplace callings, and mentor upcoming university students.",
    mediaUrl: "/uploads/pelayanan/connect_1.jpg",
    heroTitle: "Marketplace Forum • Faith & Work",
    heroCaption: "Menghidupi Iman di Meja Konferensi & Ruang Rapat: wadah bagi kaum profesional Kristen berdiskusi terbuka tentang etika bisnis dan nilai Kerajaan Allah.",
    galleryImages: ["/uploads/pelayanan/connect_2.jpg"],
  },
];
