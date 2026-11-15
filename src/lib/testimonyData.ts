export interface TestimonyInput {
  name: string;
  role?: string;
  quote: string;
  quoteEn?: string;
  photo?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const initialTestimonies = [
  {
    id: "tst-1",
    name: "Jonathan Pratama",
    role: "Alumni Mahasiswa Untirta Serang",
    roleEn: "Untirta Serang Campus Graduate",
    quote:
      "Di kelompok pemuridan ESM, saya tidak hanya belajar Alkitab secara teoritis, tetapi diajarkan bagaimana membagikan iman dan memuridkan adik-adik tingkat di kampus.",
    quoteEn:
      "In the ESM discipleship group, I didn't just study theology theoretically, but learned how to share my faith and disciple younger students on campus.",
    photo: "/images/avatar-1.jpg",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "tst-2",
    name: "Ruth H. Tomasoa",
    role: "Mahasiswi di Ternate, Maluku Utara",
    roleEn: "University Student in Ternate, North Maluku",
    quote:
      "Asrama binaan ESM di Ternate menjadi rumah kedua bagi saya. Di sini kami belajar berdoa bersama dan dipersiapkan menjadi saksi Kristus di tengah masyarakat.",
    quoteEn:
      "The ESM residential hub in Ternate became my second home. Here we learn to pray together and are prepared to be witnesses of Christ in society.",
    photo: "/images/avatar-2.jpg",
    sortOrder: 2,
    isActive: true,
  },
];
