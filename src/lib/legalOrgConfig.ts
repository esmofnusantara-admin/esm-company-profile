/**
 * Konfigurasi Legalitas Yayasan MMB & Bagan Organisasi Gerakan ESM
 * Mendukung kustomisasi fleksibel via Admin CMS dan Multibahasa (ID/EN)
 */

export interface AboutLegalOrg {
  // 1. Data Badan Hukum Yayasan MMB
  foundationName: string; // "Yayasan Murid Muda Bermisi"
  foundationAbbr: string; // "Yayasan MMB"
  skAhu: string; // "AHU-0013520.AH.01.04.Tahun 2024"
  foundationHead: string; // Nama Ketua Yayasan, e.g. "Markus P., M.Div."
  secretaryName: string; // Nama Sekretaris Yayasan, e.g. "Hana Kristianti, S.E."
  secretaryPhone: string; // Nomor Kontak Sekretaris Yayasan, e.g. "+62 812-9610-6611"

  // 2. Pernyataan Hukum (Bilingual)
  legalStatementBadgeId: string;
  legalStatementBadgeEn: string;
  legalStatementTitleId: string;
  legalStatementTitleEn: string;
  legalStatementDescId: string;
  legalStatementDescEn: string;

  // 3 Butir Penjelasan (Bilingual)
  point1TitleId: string;
  point1TitleEn: string;
  point1DescId: string;
  point1DescEn: string;

  point2TitleId: string;
  point2TitleEn: string;
  point2DescId: string;
  point2DescEn: string;

  point3TitleId: string;
  point3TitleEn: string;
  point3DescId: string;
  point3DescEn: string;

  // Komitmen Integritas (Bilingual)
  integrityTitleId: string;
  integrityTitleEn: string;
  integrityDescId: string;
  integrityDescEn: string;

  // 3. Bagan Organisasi Gerakan (Bilingual)
  chartBadgeId: string;
  chartBadgeEn: string;
  chartTitleId: string;
  chartTitleEn: string;
  chartSubtitleId: string;
  chartSubtitleEn: string;

  // Tingkat 1 - Naungan Hukum
  tier1BadgeId: string;
  tier1BadgeEn: string;
  tier1SubId: string;
  tier1SubEn: string;

  // Tingkat 2 - Sekretaris Jendral (Koordinator Nasional Gerakan ESM)
  tier2BadgeId: string;
  tier2BadgeEn: string;
  tier2LeaderName: string;
  tier2RoleSubId: string;
  tier2RoleSubEn: string;

  // Tingkat 3 - Ladang Pelayanan Lapangan: Banten - Ternate (+ Connect)
  tier3BantenTitle: string;
  tier3BantenDescId: string;
  tier3BantenDescEn: string;

  tier3TernateTitle: string;
  tier3TernateDescId: string;
  tier3TernateDescEn: string;

  tier3ConnectTitle: string;
  tier3ConnectDescId: string;
  tier3ConnectDescEn: string;
}

export const defaultLegalOrg: AboutLegalOrg = {
  foundationName: "Yayasan Murid Muda Bermisi",
  foundationAbbr: "Yayasan MMB",
  skAhu: "AHU-0013520.AH.01.04.Tahun 2024",
  foundationHead: "Markus P., M.Div.",
  secretaryName: "Hana Kristianti, S.E.",
  secretaryPhone: "+62 812-9610-6611",

  legalStatementBadgeId: "Pernyataan Hukum (Legal Statement)",
  legalStatementBadgeEn: "Legal Statement & Compliance",
  legalStatementTitleId: "Badan Hukum Yayasan MMB (Murid Muda Bermisi)",
  legalStatementTitleEn: "Legal Entity of Yayasan MMB (Murid Muda Bermisi)",
  legalStatementDescId:
    "Gerakan Evangelical Student Movement (ESM) Indonesia bernaung dan bermitra secara institusional di bawah payung hukum resmi Yayasan Murid Muda Bermisi (Yayasan MMB).",
  legalStatementDescEn:
    "The Evangelical Student Movement (ESM) Indonesia operates and partners institutionally under the official legal umbrella of Yayasan Murid Muda Bermisi (Yayasan MMB).",

  point1TitleId: "Independensi Parachurch",
  point1TitleEn: "Parachurch Autonomy",
  point1DescId:
    "ESM menjalankan panggilan pemuridan siswa dan mahasiswa secara interdenominasi dengan otonomi pelayanan penuh.",
  point1DescEn:
    "ESM carries out youth and student discipleship interdenominationally with full ministerial autonomy.",

  point2TitleId: "Payung Legalitas & Perizinan",
  point2TitleEn: "Legal Umbrella & Licensing",
  point2DescId:
    "Seluruh akta notaris pendirian, SK AHU Kemenkumham, pelaporan kenegaraan, dan perizinan kemitraan dinaungi oleh Yayasan MMB.",
  point2DescEn:
    "All deeds of establishment, AHU legal decree from the Ministry of Law and Human Rights, statutory reporting, and partnership permits are sheltered under Yayasan MMB.",

  point3TitleId: "Akuntabilitas Tata Kelola",
  point3TitleEn: "Governance Accountability",
  point3DescId:
    "Laporan operasional berkala dan kepatuhan finansial dipertanggungjawabkan kepada Dewan Pengawas Yayasan.",
  point3DescEn:
    "Regular operational reports and financial compliance are accounted directly to the Foundation Board of Supervisors.",

  integrityTitleId: "Komitmen Integritas:",
  integrityTitleEn: "Integrity Commitment:",
  integrityDescId:
    "Setiap donasi misi dan kemitraan dikelola secara tertib demi memuliakan nama Tuhan dan melayani generasi muda tanpa cela.",
  integrityDescEn:
    "Every mission donation and partnership is stewarded with utmost discipline to honor the Lord and serve the next generation blamelessly.",

  chartBadgeId: "Struktur Tata Kelola",
  chartBadgeEn: "Governance Structure",
  chartTitleId: "Bagan Organisasi Gerakan",
  chartTitleEn: "Movement Organizational Chart",
  chartSubtitleId:
    "Alur pertanggungjawaban kepemimpinan rohani, koordinasi gerakan, dan eksekusi pelayanan lapangan:",
  chartSubtitleEn:
    "Accountability flow of spiritual leadership, movement coordination, and field ministry execution:",

  tier1BadgeId: "Tingkat 1 • Naungan Hukum",
  tier1BadgeEn: "Level 1 • Legal Umbrella",
  tier1SubId: "Dewan Pembina, Penasihat Hukum & Pengawas Yayasan",
  tier1SubEn: "Board of Trustees, Legal Advisors & Foundation Supervisors",

  tier2BadgeId: "Tingkat 2 • Sekretaris Jendral (Koordinator Nasional Gerakan ESM)",
  tier2BadgeEn: "Level 2 • Secretary General (National Coordinator of ESM Movement)",
  tier2LeaderName: "Pdt. Daniel S. Th., M.Min.",
  tier2RoleSubId: "Sekretaris Jenderal / Koordinator Nasional Gerakan ESM & Dewan Pembina Rohani",
  tier2RoleSubEn: "Secretary General / National Coordinator of ESM Movement & Spiritual Oversight",

  tier3BantenTitle: "Banten",
  tier3BantenDescId: "Pelayanan Siswa & Kampus Mahasiswa (Explore & Encounter Serang, Cilegon, Tangerang)",
  tier3BantenDescEn: "High School & Campus Ministry (Explore & Encounter Serang, Cilegon, Tangerang)",

  tier3TernateTitle: "Ternate",
  tier3TernateDescId: "Perintisan Pelayanan Siswa & Kampus Mahasiswa Maluku Utara (Kota Rempah)",
  tier3TernateDescEn: "Pioneering Student & Campus Ministry across North Maluku (Spice Islands)",

  tier3ConnectTitle: "Connect & Mezbah Doa",
  tier3ConnectDescId: "Alumni Profesi, Media & Syafaat Misi Nusantara",
  tier3ConnectDescEn: "Marketplace Alumni, Mission Media & National Intercession",
};
