/**
 * Fallback In-Memory Articles Store
 * Menjamin API /api/articles dan /api/articles/[slug] selalu bekerja 100%
 * meskipun koneksi database PostgreSQL sedang offline atau lambat.
 */

export interface FallbackArticle {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt: string;
  excerptEn?: string | null;
  content: string;
  contentEn?: string | null;
  category: string;
  coverImage?: string | null;
  status: string;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
}

export const initialArticles: FallbackArticle[] = [
  {
    id: "art-1",
    title: "Melihat Api Perintisan Kembali Menyala di Kota Rempah",
    titleEn: "Seeing the Fire of Student Pioneering Rekindled in the Spice Islands",
    slug: "melihat-api-perintisan-kembali-menyala-di-kota-rempah",
    excerpt:
      "Catatan lapangan tim misi ESM saat menyusuri kampus-kampus di Ternate dan kepulauan Halmahera, merajut kemitraan bersama hamba Tuhan setempat untuk mendirikan asrama binaan.",
    excerptEn:
      "Field dispatches of the ESM mission team traversing campuses in Ternate, forging local partnerships to establish student discipleship residences.",
    content:
      "Perjalanan misi ke Maluku Utara membukakan mata hati kami bahwa api Injil yang pernah berkobar di kepulauan rempah ini tidak pernah padam. Di tengah tantangan geografis antar pulau, kerinduan mahasiswa perantau akan persekutuan yang mendalam begitu nyata. Bersama para hamba Tuhan lokal dan jejaring alumni, ESM berkomitmen merintis pembinaan intensif dan asrama mahasiswa di Ternate.",
    contentEn:
      "Our mission journey across North Maluku opened our eyes to how the flame of the Gospel in these historic Spice Islands has never died. Amid inter-island geographical challenges, the longing of student migrants for deep fellowship is palpable. Together with local churches and alumni networks, ESM commits to pioneering intensive discipleship and student residences in Ternate.",
    category: "KABAR_LADANG",
    coverImage: "/uploads/articles/ternate_mission.jpg",
    status: "PUBLISHED",
    publishedAt: "2026-08-02T10:00:00.000Z",
    createdAt: "2026-08-02T10:00:00.000Z",
  },
  {
    id: "art-2",
    title: "Mengapa Pemuridan Harus Hidup di Tengah Misi?",
    titleEn: "Why Must Discipleship Live in the Midst of Mission?",
    slug: "mengapa-pemuridan-harus-hidup-di-tengah-misi",
    excerpt:
      "Refleksi mendalam tentang perjalanan murid Kristus yang tidak boleh berhenti pada zona nyaman kelompok internal, melainkan berani diutus ke tempat-tempat yang belum terjangkau.",
    excerptEn:
      "A deep reflection on the journey of Christ's disciples that must not halt in the comfort zone of closed fellowship, but courageously advance into unreached frontiers.",
    content:
      "Pemuridan sejati bukanlah ruang inkubasi yang memisahkan orang percaya dari dunia, melainkan proses pembentukan karakter ilahi agar siap diutus menjadi garam dan terang. Ketika pemuridan dilepaskan dari denyut nadi misi, ia akan mandul dan kehilangan tujuannya. Inilah kerinduan ESM di tanah jawara Banten dan pulau-pulau Nusantara.",
    contentEn:
      "Authentic discipleship is not an incubator that isolates believers from society, but a crucible shaping godly character to be sent as salt and light. When discipleship is detached from the heartbeat of mission, it becomes barren and loses its purpose. This is ESM's vision across Banten and the archipelago.",
    category: "REFLEKSI",
    coverImage: "/uploads/articles/pemuridan_misi.jpg",
    status: "PUBLISHED",
    publishedAt: "2026-08-14T10:00:00.000Z",
    createdAt: "2026-08-14T10:00:00.000Z",
  },
  {
    id: "art-3",
    title: "Ketika Sekolah Menjadi Ladang Misi Pertama Kita",
    titleEn: "When School Becomes Our Primary Mission Field",
    slug: "ketika-sekolah-menjadi-ladang-misi-pertama-kita",
    excerpt:
      "Bagaimana siswa SMP dan SMA di Banten belajar mengatasi rasa takut dicap aneh, berani berdoa bersama di jam istirahat, dan memancarkan kasih Kristus di kelas.",
    excerptEn:
      "How secondary students in Banten learn to overcome peer pressure, pray together during school breaks, and radiate the compassion of Christ in the classroom.",
    content:
      "Bagi adik-adik siswa di sekolah negeri di Serang dan Cilegon, menjadi murid Kristus menuntut keberanian integritas setiap hari. Pelayanan Explore hadir mendampingi mereka menemukan jati diri, tidak malu akan Injil, dan menjadi teladan dalam ketekunan belajar serta kepedulian bagi sesama teman.",
    contentEn:
      "For youth attending state high schools across Serang and Cilegon, living as Christ's disciples demands daily courageous integrity. Explore Ministry stands beside them to discover their identity, remain unashamed of the Gospel, and lead by example in academic excellence and compassion.",
    category: "KESAKSIAN",
    coverImage: "/uploads/articles/explore_student.jpg",
    status: "PUBLISHED",
    publishedAt: "2026-07-25T10:00:00.000Z",
    createdAt: "2026-07-25T10:00:00.000Z",
  },
];

const globalMemoryArticles: FallbackArticle[] =
  ((globalThis as any).__esmArticlesMemory as FallbackArticle[]) ||
  [...initialArticles];

(globalThis as any).__esmArticlesMemory = globalMemoryArticles;

export function getMemoryArticles(status?: string, category?: string): FallbackArticle[] {
  let list = [...globalMemoryArticles];
  if (status && status !== "ALL") {
    list = list.filter((a: FallbackArticle) => a.status === status);
  }
  if (category) {
    list = list.filter((a: FallbackArticle) => a.category === category);
  }
  return list;
}

export function getMemoryArticleBySlug(slug: string): FallbackArticle | null {
  return globalMemoryArticles.find((a: FallbackArticle) => a.slug === slug) || null;
}

export function saveMemoryArticle(article: FallbackArticle): FallbackArticle {
  const existingIdx = globalMemoryArticles.findIndex((a: FallbackArticle) => a.id === article.id || a.slug === article.slug);
  if (existingIdx >= 0) {
    globalMemoryArticles[existingIdx] = { ...globalMemoryArticles[existingIdx], ...article };
    return globalMemoryArticles[existingIdx];
  } else {
    globalMemoryArticles.unshift(article);
    return article;
  }
}

export function deleteMemoryArticle(slugOrId: string): boolean {
  const idx = globalMemoryArticles.findIndex((a: FallbackArticle) => a.id === slugOrId || a.slug === slugOrId);
  if (idx >= 0) {
    globalMemoryArticles.splice(idx, 1);
    return true;
  }
  return false;
}
