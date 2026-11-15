import { FAQPage } from "@prisma/client";

export interface FAQInput {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  page?: FAQPage;
  sortOrder?: number;
  isActive?: boolean;
}

export const initialFAQs = [
  {
    id: "faq-1",
    question: "Apakah ESM adalah gereja lokal atau yayasan misi?",
    questionEn: "Is ESM a church denomination or an independent mission?",
    answer:
      "ESM adalah gerakan pemuridan antargereja (parachurch movement) yang berfokus mendampingi siswa sekolah, mahasiswa kampus, dan kaum profesional untuk berakar kuat dalam firman Tuhan dan aktif bermisi.",
    answerEn:
      "ESM is an interdenominational Christian student movement (parachurch) dedicated to discipling pupils, university students, and professionals to be rooted in God's Word and live on mission.",
    page: FAQPage.GENERAL,
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "Bagaimana cara bergabung dalam kelompok pemuridan di Banten atau Ternate?",
    questionEn: "How can I join a discipleship group in Banten or Ternate?",
    answer:
      "Anda dapat mengisi formulir minat di halaman Gabung Komunitas. Koordinator pelayan kami di Serang, Pandeglang, Lebak, atau Ternate akan segera menyapa dan menghubungkan Anda dengan kelompok terdekat.",
    answerEn:
      "You can fill out the form on our Get Involved page. Our local ministry coordinators in Serang, Pandeglang, Lebak, or Ternate will personally connect with you.",
    page: FAQPage.GENERAL,
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "Bagaimana bentuk kemitraan doa dan transparansi donasi misi?",
    questionEn: "How is mission partnership and financial giving managed?",
    answer:
      "Seluruh donasi kemitraan digunakan untuk pembinaan siswa/mahasiswa di lapangan, pengadaan modul Alkitab gratis, dan sarana pos misi dengan laporan pertanggungjawaban berkala.",
    answerEn:
      "All partnership donations directly support student retreats, free Bible study modules, and mission outpost operations, backed by regular stewardship reports.",
    page: FAQPage.KEMITRAAN,
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "faq-4",
    question: "Apakah siswa atau mahasiswa di luar Banten dan Ternate bisa ikut?",
    questionEn: "Can students outside Banten and Ternate take part in mentorship?",
    answer:
      "Tentu! Selain persekutuan tatap muka di Banten dan Ternate, kami memfasilitasi kelompok mentoring online bagi alumni serta materi pembinaan digital yang dapat diunduh bebas.",
    answerEn:
      "Yes! In addition to on-site gatherings in Banten and Ternate, we host online alumni mentoring cohorts and provide downloadable study resources accessible nationwide.",
    page: FAQPage.GENERAL,
    sortOrder: 4,
    isActive: true,
  },
];
