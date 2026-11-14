"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Camera,
  CheckCircle2,
  CalendarDays,
  Compass,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Search,
  Filter,
  Share2,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  MessageCircle,
  HelpCircle,
  Flame,
  Maximize2,
  Quote,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { submitEventRegistration } from "@/actions/eventRegistration";
import { useToast } from "@/context/ToastContext";
import { MaskedWhatsAppLink } from "@/components/common/MaskedWhatsAppLink";

interface AgendaEvent {
  id: string;
  title: string;
  subtitle: string;
  community: "EXPLORE" | "ENCOUNTER" | "CONNECT" | "DOA" | "ALL";
  communityLabel: string;
  startDate: string;
  endDate?: string;
  displayDate: string;
  displayTime: string;
  dayNumber: string;
  monthAbbr: string;
  year: string;
  location: string;
  locationType: "onsite" | "online" | "hybrid";
  coverImage: string;
  speakers: string;
  quotaStatus: string;
  remainingSlots?: number;
  description: string;
  rundown: string[];
  featured?: boolean;
}

interface ActivityPhoto {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  attendees: string;
  image: string;
  highlight: string;
  quote: string;
  quoteAuthor: string;
}

const upcomingAgendas: AgendaEvent[] = [
  {
    id: "agenda-camp-siswa-2026",
    title: "Explore Youth Leadership Camp 2026",
    subtitle: "Kemah Rohani & Pembinaan Karakter Siswa SMP & SMA se-Banten",
    community: "EXPLORE",
    communityLabel: "Siswa SMA (Explore)",
    startDate: "2026-09-18T08:00:00.000Z",
    endDate: "2026-09-20T15:00:00.000Z",
    displayDate: "18 – 20 September 2026",
    displayTime: "Jumat 08:00 WIB s/d Minggu 15:00 WIB",
    dayNumber: "18",
    monthAbbr: "SEP",
    year: "2026",
    location: "Pusat Pelatihan Pemuda Bukit Pinus, Serang, Banten",
    locationType: "onsite",
    coverImage: "/uploads/agenda/kegiatan_siswa_camp.jpg",
    speakers: "Tim Staf Pembina Siswa ESM & Pembicara Tamu Pemuda",
    quotaStatus: "Pendaftaran Dibuka",
    remainingSlots: 24,
    description:
      "Tiga hari dua malam yang dirancang membimbing siswa menghadapi krisis identitas remaja, membangun disiplin doa dan saat teduh harian, serta melatih mereka menjadi teladan firman dan saksi Kristus yang berani di sekolah sekuler.",
    rundown: [
      "Sesi 1: Menemukan Jati Diri di Hadapan Sang Pencipta",
      "Sesi 2: Menavigasi Tekanan Sebaya & Algoritma Digital",
      "Sesi 3: Api Unggun Komitmen Hidup Kudus & Syafaat Sekolah",
      "Workshop: Seni Memimpin Diskusi Pendalaman Alkitab (PA) Siswa",
    ],
    featured: true,
  },
  {
    id: "agenda-annual-prayer-2026",
    title: "Annual Movement Prayer & Worship Night 2026",
    subtitle: "Malam Doa Serentak & Syafaat Gerakan Pemuridan Banten – Ternate",
    community: "DOA",
    communityLabel: "Doa & Mitra Gerakan",
    startDate: "2026-08-23T19:00:00.000Z",
    endDate: "2026-08-23T22:00:00.000Z",
    displayDate: "23 Agustus 2026",
    displayTime: "Pukul 19:00 – 21:30 WIB",
    dayNumber: "23",
    monthAbbr: "AGU",
    year: "2026",
    location: "Hybrid (Sanctuary ESM Serang & Zoom Meeting Global)",
    locationType: "hybrid",
    coverImage: "/uploads/agenda/kegiatan_malam_doa.jpg",
    speakers: "Seluruh Tim Pelayan, Pendoa Syafaat & Misionaris Lapangan",
    quotaStatus: "Akses Terbuka & Gratis",
    description:
      "Pertemuan doa tahunan serentak yang menyatukan para staf, pembina sekolah, mahasiswa kampus, alumni profesional, dan sahabat pendoa dari berbagai kota untuk berseru bagi kebangunan rohani generasi muda Nusantara.",
    rundown: [
      "Pujian Mazmur & Pengagungan Allah yang Berdaulat",
      "Warta Medan Misi Terkini: Tantangan Banten & Maluku Utara",
      "Sesi Doa Terfokus: Generasi Remaja, Kampus, & Integritas Kerja",
      "Doa Pengutusan Staf dan Relawan Perintis Lapangan",
    ],
  },
  {
    id: "agenda-mitra-sahabat-2026",
    title: "Hari Mitra & Sahabat Pelayanan ESM 2026",
    subtitle: "Temu Keakraban Tahunan, Akuntabilitas Pelayanan & Jamuan Kasih",
    community: "ALL",
    communityLabel: "Sahabat & Donatur",
    startDate: "2026-09-06T10:00:00.000Z",
    endDate: "2026-09-06T14:30:00.000Z",
    displayDate: "06 September 2026",
    displayTime: "Pukul 10:00 – 14:00 WIB",
    dayNumber: "06",
    monthAbbr: "SEP",
    year: "2026",
    location: "Grand Ballroom Hotel Horison Ultima, Serang, Banten",
    locationType: "onsite",
    coverImage: "/uploads/agenda/agenda_hero.jpg",
    speakers: "Badan Pengurus Yayasan & Perwakilan Siswa/Mahasiswa Binaan",
    quotaStatus: "Konfirmasi Kehadiran",
    remainingSlots: 40,
    description:
      "Ajang silaturahmi penuh syukur bersama para pendoa, donatur tetap, gereja mitra, dan dewan penasihat untuk memaparkan laporan pertanggungjawaban program, kesaksian buah pemuridan siswa, serta rencana pembukaan pos pelayanan baru.",
    rundown: [
      "Ibadah Pembuka & Refleksi Firman oleh Penasihat Rohani",
      "Pemaparan Laporan Stewardship Keuangan & Capaian Misi 2025/2026",
      "Pemberian Penghargaan bagi Mitra Pelayanan Setia",
      "Makan Siang Bersama & Sesi Jejaring Kasih",
    ],
  },
  {
    id: "agenda-encounter-campus-2026",
    title: "Encounter Campus Leadership Forum 2026",
    subtitle: "Konsolidasi Pemimpin KTB & Kebangkitan Mahasiswa Berakar",
    community: "ENCOUNTER",
    communityLabel: "Mahasiswa (Encounter)",
    startDate: "2026-10-10T09:00:00.000Z",
    endDate: "2026-10-11T17:00:00.000Z",
    displayDate: "10 – 11 Oktober 2026",
    displayTime: "Sabtu & Minggu Pukul 09:00 – 17:00 WIB",
    dayNumber: "10",
    monthAbbr: "OKT",
    year: "2026",
    location: "Auditorium Kampus Untirta, Serang, Banten",
    locationType: "onsite",
    coverImage: "/uploads/agenda/kegiatan_kampus_worship.jpg",
    speakers: "Staf Pembina Mahasiswa ESM & Alumni Senior Kampus",
    quotaStatus: "Pendaftaran Dibuka",
    remainingSlots: 35,
    description:
      "Mempersiapkan para pemimpin kelompok kecil mahasiswa agar memiliki ketajaman doktrinal, keterampilan konseling teman sebaya, dan visi multiplikasi murid di fakultas masing-masing.",
    rundown: [
      "Kuliah Umum: Teologi Pemuridan di Tengah Sekularisme Kampus",
      "Klinik KTB: Menghidupkan Diskusi Firman yang Mengubahkan Karakter",
      "Studi Lapangan: Pemetaan Asrama Mahasiswa & Rencana Aksi Semester Baru",
    ],
  },
  {
    id: "agenda-connect-alumni-2026",
    title: "Connect Marketplace Roundtable",
    subtitle: "Etika Bisnis, Integritas Profesi & Misi di Tempat Kerja",
    community: "CONNECT",
    communityLabel: "Alumni & Profesi (Connect)",
    startDate: "2026-11-07T14:00:00.000Z",
    endDate: "2026-11-07T17:30:00.000Z",
    displayDate: "07 November 2026",
    displayTime: "Sabtu Pukul 14:00 – 17:30 WIB",
    dayNumber: "07",
    monthAbbr: "NOV",
    year: "2026",
    location: "The Breeze BSD City, Tangerang & Live Streaming",
    locationType: "hybrid",
    coverImage: "/uploads/agenda/kegiatan_alumni_forum.jpg",
    speakers: "Praktisi Manajemen Korporat, Dokter, & Entrepreneur Alumni",
    quotaStatus: "Terbatas 50 Kursi",
    remainingSlots: 15,
    description:
      "Meja bundar eksklusif bagi alumni dan kaum profesional Kristen untuk saling menguatkan integritas, menangani pergumulan kompromi etika kerja, dan menjadi duta Kristus di ruang rapat.",
    rundown: [
      "Keynote: Memandang Pekerjaan Sekuler sebagai Mimbar Pelayanan Allah",
      "Panel Discussion: Menghadapi Dilema Etika dan Tekanan Target Finansial",
      "Mentoring Circle: Sesi Diskusi Meja Bundar Berdasarkan Industri Profesi",
    ],
  },
];

const pastActivityPhotos: ActivityPhoto[] = [
  {
    id: "photo-1",
    title: "Explore Leadership Camp Siswa SMA",
    category: "Pelayanan Siswa (Explore)",
    location: "Villa Bukit Pinus, Serang, Banten",
    date: "12 – 14 Juli 2026",
    attendees: "85 Siswa & 16 Pembina",
    image: "/uploads/agenda/kegiatan_siswa_camp.jpg",
    highlight:
      "Tiga hari intensif perenungan firman di alam terbuka, lingkaran kelompok KTB siswa, dan api unggun penyerahan hidup kudus di hadapan Tuhan.",
    quote:
      "Saya dulu malu mengakui iman saya di kelas. Melalui Explore Camp ini, saya dibimbing belajar PA mandiri dan sekarang berani memulai kelompok doa di SMA.",
    quoteAuthor: "Samuel (Siswa Kelas XI SMA Negeri di Serang)",
  },
  {
    id: "photo-2",
    title: "Encounter Campus Revival Night",
    category: "Pelayanan Mahasiswa (Encounter)",
    location: "Auditorium Pertemuan Mahasiswa Banten",
    date: "25 Mei 2026",
    attendees: "140 Mahasiswa Perguruan Tinggi",
    image: "/uploads/agenda/kegiatan_kampus_worship.jpg",
    highlight:
      "Malam doa dan penyembahan yang menyatukan mahasiswa dari berbagai universitas negeri dan swasta se-Banten untuk berkomitmen memuridkan kampus.",
    quote:
      "Di tengah kampus sekuler yang serba individualis, menemukan komunitas murid Kristus yang saling mendoakan setiap minggu adalah anugerah terbesar masa kuliah saya.",
    quoteAuthor: "Gresia (Mahasiswi Fakultas Hukum)",
  },
  {
    id: "photo-3",
    title: "Retret Alam Pemimpin KTB & Pembina",
    category: "Pelatihan Pembuat Murid",
    location: "Perkemahan Curug Banten",
    date: "19 – 21 April 2026",
    attendees: "32 Mentor & Calon Pemimpin",
    image: "/uploads/agenda/kegiatan_kampus_retreat.jpg",
    highlight:
      "Pembekalan metode induktif Kitab Titus, konseling pastoral dasar bagi teman sebaya yang terluka, dan simulasi memandu kelompok kecil firman.",
    quote:
      "Memimpin KTB bukan sekadar mengajar materi teologi, melainkan mengalirkan hidup dan mendampingi seorang adik asuh bertumbuh serupa Kristus.",
    quoteAuthor: "Rian (Pemimpin KTB Mahasiswa Tingkat Akhir)",
  },
  {
    id: "photo-4",
    title: "Connect Alumni Marketplace Forum",
    category: "Alumni & Profesi (Connect)",
    location: "Ruang Seminar BSD City, Tangerang",
    date: "08 Maret 2026",
    attendees: "65 Profesional & Wirausahawan",
    image: "/uploads/agenda/kegiatan_alumni_forum.jpg",
    highlight:
      "Diskusi panel bertema integritas kerja dan penatalayanan finansial keluarga Kristen, dirangkaikan dengan program mentoring bagi lulusan baru.",
    quote:
      "Forum ini menyegarkan kembali panggilan saya bahwa kantor dan pabrik tempat saya bekerja setiap hari adalah ladang misi utama yang Tuhan percayakan.",
    quoteAuthor: "Budi, S.T. (Alumni Teknik & Manajer Proyek)",
  },
  {
    id: "photo-5",
    title: "Malam Doa Serentak Banten & Ternate",
    category: "Syafaat Gerakan",
    location: "Hybrid (Sanctuary & Zoom Global)",
    date: "16 Februari 2026",
    attendees: "210 Pendoa Syafaat se-Indonesia",
    image: "/uploads/agenda/kegiatan_malam_doa.jpg",
    highlight:
      "Penyatuan hati selama 3 jam dalam doa syafaat mendalam bagi keselamatan generasi muda di Tanah Jawara Banten dan pulau-pulau Maluku Utara.",
    quote:
      "Mendengar pergumulan nyata para staf yang merintis di pelosok membuat kami di kota terbeban untuk terus menopang mereka dalam doa yang tak putus.",
    quoteAuthor: "Ibu Maria (Mitra Pendoa Syafaat Jakarta)",
  },
  {
    id: "photo-6",
    title: "Aksi Pengabdian & Misi Siswa Ternate",
    category: "Misi Lapangan Maluku Utara",
    location: "Kepulauan Maluku Utara",
    date: "10 – 17 Januari 2026",
    attendees: "Tim Relawan & Pelajar Binaan",
    image: "/uploads/agenda/kegiatan_misi_lapangan.jpg",
    highlight:
      "Pelatihan literasi, pembagian modul renungan, dan pembinaan karakter anak-anak serta remaja pesisir di pos rintisan Ternate dan Tidore.",
    quote:
      "Anak-anak di pulau terluar memiliki kehausan yang luar biasa akan firman Tuhan. Kehadiran modul pembinaan ESM sangat menolong guru-guru di sini.",
    quoteAuthor: "Marten (Koordinator Pelayanan Lapangan Ternate)",
  },
];

export function AgendaView() {
  const { locale } = useLanguage();
  const [activeFilter, setActiveFilter] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Modal RSVP state
  const { toast } = useToast();
  const [selectedEventForRsvp, setSelectedEventForRsvp] = React.useState<AgendaEvent | null>(null);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = React.useState(false);
  const [rsvpForm, setRsvpForm] = React.useState({
    fullName: "",
    phoneWhatsApp: "",
    communityRole: "Siswa",
    city: "",
    notes: "",
  });
  const [rsvpSuccess, setRsvpSuccess] = React.useState(false);

  // Lightbox photo preview
  const [lightboxPhoto, setLightboxPhoto] = React.useState<ActivityPhoto | null>(null);

  // Live Countdown to Explore Camp (Sept 18, 2026)
  const targetCampDate = React.useMemo(() => new Date("2026-09-18T08:00:00Z").getTime(), []);
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetCampDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetCampDate]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEventForRsvp(null);
        setLightboxPhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredAgendas = React.useMemo(() => {
    return upcomingAgendas.filter((event) => {
      const matchesFilter =
        activeFilter === "ALL" || event.community === activeFilter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const featuredAgenda = upcomingAgendas.find((ev) => ev.featured) || upcomingAgendas[0];

  const handleOpenRsvp = (event: AgendaEvent) => {
    setSelectedEventForRsvp(event);
    setRsvpSuccess(false);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.fullName || !rsvpForm.phoneWhatsApp) {
      toast({
        title: "Data Belum Lengkap",
        description: "Mohon lengkapi nama lengkap dan nomor WhatsApp Anda.",
        type: "error",
      });
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      const res = await submitEventRegistration({
        eventId: selectedEventForRsvp?.id,
        eventTitle: selectedEventForRsvp?.title || "Kegiatan ESM",
        fullName: rsvpForm.fullName,
        phone: rsvpForm.phoneWhatsApp,
        communityRole: rsvpForm.communityRole,
        city: rsvpForm.city,
        notes: rsvpForm.notes,
      });

      if (res.success) {
        setRsvpSuccess(true);
        toast({
          title: "Pendaftaran Berhasil!",
          description: "Data registrasi Anda telah tersimpan. Panitia akan segera menghubungi Anda.",
          type: "success",
        });
      } else {
        toast({
          title: "Gagal Mendaftar",
          description: res.error || "Terjadi kendala saat menyimpan pendaftaran.",
          type: "error",
        });
      }
    } catch (err) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungi server. Silakan hubungi via WhatsApp panitia.",
        type: "error",
      });
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  const handleWhatsAppDirect = (event: AgendaEvent) => {
    const phone = "6281296106611";
    const text = encodeURIComponent(
      `Shalom Panitia ESM Indonesia! Saya ingin mendaftar untuk kegiatan: "${event.title}" (${event.displayDate}). Mohon informasi pendaftaran lebih lanjut. Terima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-[#FAF7F2]">
        {/* ============================================================
            1. BESPOKE PHOTO HERO (Living Fellowship Atmosphere)
            Rich photography with deep garnet vignette + Live Marquee Countdown
            ============================================================ */}
        <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/agenda/agenda_hero.jpg"
              alt="Suasana Temu Gerakan & Pemuridan ESM"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Cinematic Garnet Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140305] via-[#24060A]/85 to-[#120204]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#140305]/60 to-[#140305]/95" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-200 shadow-sm">
              <CalendarDays className="size-3.5 text-amber-300" />
              <span>Kalender Gerakan & Temu Pemuridan 2026</span>
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
              Bertemu, Bertumbuh & Berkolaborasi dalam{" "}
              <span className="font-serif italic font-normal text-amber-200">
                Satu Gerakan Pemuridan
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
              Jadwal kemah kepemimpinan siswa, temu mahasiswa kampus, forum profesional alumni, dan malam doa serentak bagi generasi muda Nusantara.
            </p>

            {/* Next Marquee Event Live Ticking Countdown Box */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 p-4 sm:p-5 shadow-2xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-300">
                    <Flame className="size-3.5 text-amber-400 animate-pulse" />
                    Agenda Terdekat Berikutnya:
                  </span>
                  <span className="text-stone-300 font-semibold">
                    18 – 20 September 2026
                  </span>
                </div>

                <div className="text-left">
                  <h3 className="font-sans text-base sm:text-lg font-black text-white">
                    Explore Youth Leadership Camp 2026
                  </h3>
                  <p className="text-xs text-stone-300">
                    Kemah Rohani & Pembinaan Karakter Siswa SMP & SMA se-Banten • Serang
                  </p>
                </div>

                {/* Countdown Numbers Grid */}
                <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                  <div className="rounded-xl bg-black/40 border border-white/10 p-2">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                      {timeLeft.days}
                    </span>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
                      Hari
                    </span>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/10 p-2">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
                      Jam
                    </span>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/10 p-2">
                    <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
                      Menit
                    </span>
                  </div>
                  <div className="rounded-xl bg-black/40 border border-white/10 p-2">
                    <span className="block text-xl sm:text-2xl font-black text-amber-300 font-mono">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[10px] font-bold text-stone-300 uppercase tracking-wider">
                      Detik
                    </span>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-amber-200/90 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    Tersisa 24 Kuota Peserta Siswa
                  </span>
                  <Button
                    onClick={() => handleOpenRsvp(featuredAgenda)}
                    size="sm"
                    className="rounded-full px-5 text-xs font-bold shadow-warm-xs bg-amber-400 hover:bg-amber-300 text-stone-950 font-sans"
                  >
                    Daftar Sekarang
                    <ArrowRight className="size-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            2. SECTION QUICK JUMP BAR
            Direct smooth scroll to Upcoming Events, Photo Gallery, or Roadmap
            ============================================================ */}
        <section className="sticky top-16 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-stone-200/90 py-3">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-stone-200/90 shadow-2xs">
                <button
                  type="button"
                  onClick={() => scrollToSection("agenda-mendatang")}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#2D060B] text-white shadow-xs cursor-pointer"
                >
                  <Calendar className="size-4 text-amber-300" />
                  <span>Agenda Mendatang</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                    {upcomingAgendas.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("foto-kegiatan")}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all cursor-pointer"
                >
                  <Camera className="size-4 text-amber-500" />
                  <span>Dokumentasi & Foto Kegiatan</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
                    {pastActivityPhotos.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("roadmap-tahunan")}
                  className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all cursor-pointer"
                >
                  <CalendarDays className="size-4 text-stone-400" />
                  <span>Roadmap 2026</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-3 text-xs text-stone-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Pendaftaran Online Terbuka</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. UPCOMING AGENDAS SECTION (Jadwal & Agenda Terdekat)
            Rich cards with authentic event photography, calendar dates, & RSVP
            ============================================================ */}
        <section id="agenda-mendatang" className="py-12 sm:py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header with Title and Subtitle */}
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Jadwal & Pendaftaran Terdekat
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Agenda Pembinaan & Temu Rohani Mendatang
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Pilih kegiatan sesuai jenjang pelayanan Anda dan daftarkan diri sebelum kuota peserta terpenuhi.
              </p>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-warm-xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: "ALL", label: "Semua Agenda" },
                    { id: "EXPLORE", label: "Siswa SMA (Explore)" },
                    { id: "ENCOUNTER", label: "Mahasiswa (Encounter)" },
                    { id: "CONNECT", label: "Alumni & Profesi" },
                    { id: "DOA", label: "Doa & Syafaat" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setActiveFilter(btn.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                        activeFilter === btn.id
                          ? "bg-[#2D060B] text-white shadow-xs"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-600"
                      )}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Search box */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari acara, topik, atau lokasi..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Event Cards Grid */}
            <div className="space-y-6">
              {filteredAgendas.map((event) => (
                <Card
                  key={event.id}
                  className="rounded-3xl border border-stone-200/90 bg-white overflow-hidden shadow-warm-xs hover:shadow-warm-md hover:border-primary/40 transition-all group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left: Event Photo Banner */}
                    <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] overflow-hidden bg-stone-100">
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black/40" />

                      {/* Floating Date Badge (Top-Left) */}
                      <div className="absolute top-4 left-4 rounded-2xl bg-[#2D060B]/95 text-white p-2.5 sm:p-3 text-center shadow-lg border border-white/20 min-w-[64px]">
                        <span className="block text-xs font-black uppercase tracking-wider text-amber-300">
                          {event.monthAbbr}
                        </span>
                        <span className="block text-2xl sm:text-3xl font-black leading-none my-0.5">
                          {event.dayNumber}
                        </span>
                        <span className="block text-[10px] font-bold text-stone-300">
                          {event.year}
                        </span>
                      </div>

                      {/* Community Badge (Top-Right) */}
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                          {event.communityLabel}
                        </span>
                      </div>

                      {/* Location Pill Overlay (Bottom Mobile) */}
                      <div className="absolute bottom-3 left-4 right-4 lg:hidden text-xs text-white/90 font-medium flex items-center gap-1.5 drop-shadow">
                        <MapPin className="size-3.5 text-amber-300 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Right: Event Information & Registration */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        {/* Status and Time badges */}
                        <div className="flex flex-wrap items-center gap-2.5 text-xs">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            {event.quotaStatus}
                          </span>
                          {event.remainingSlots && (
                            <span className="text-amber-800 bg-amber-100 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-amber-300">
                              Sisa {event.remainingSlots} Kuota
                            </span>
                          )}
                          <span className="text-stone-400">•</span>
                          <span className="text-stone-600 font-medium flex items-center gap-1">
                            <Clock className="size-3.5 text-stone-400" />
                            {event.displayTime}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-1">
                          <h3 className="font-sans text-xl sm:text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-primary">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                          {event.description}
                        </p>

                        {/* Speakers & Venue Details */}
                        <div className="pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-stone-800">Tempat / Lokasi:</span>
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="size-4 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-stone-800">Pembicara / Pembimbing:</span>
                              <span>{event.speakers}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleOpenRsvp(event)}
                            size="sm"
                            className="rounded-full px-5 text-xs font-bold shadow-xs hover:scale-105 transition-all bg-[#2D060B] hover:bg-[#450A12] text-white"
                          >
                            <span>Daftar / Reservasi Kursi</span>
                            <ArrowRight className="size-3.5 ml-1.5" />
                          </Button>
                          <Button
                            onClick={() => handleWhatsAppDirect(event)}
                            variant="outline"
                            size="sm"
                            className="rounded-full px-3.5 text-xs font-bold border-stone-300 text-stone-700 hover:bg-stone-50"
                            title="Tanya Panitia via WhatsApp"
                          >
                            <MessageCircle className="size-3.5 mr-1 text-emerald-600" />
                            <span>Tanya WA</span>
                          </Button>
                        </div>

                        <span className="text-[11px] text-stone-400 font-medium">
                          {event.locationType === "online" ? "Via Zoom Online" : event.locationType === "hybrid" ? "Tersedia Onsite & Online" : "Pertemuan Tatap Muka"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            4. DOKUMENTASI & FOTO KEGIATAN ("Foto Kegiatan yang Sudah Ada")
            Visual proof, real participant quotes, and authentic atmosphere
            ============================================================ */}
        <section id="foto-kegiatan" className="py-16 sm:py-20 bg-stone-100/70 border-t border-stone-200/90 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-primary">
                  <Camera className="size-3.5" />
                  <span>Kilas Balik & Bukti Pelayanan</span>
                </div>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Dokumentasi Foto Kegiatan yang Telah Terlaksana
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-normal">
                  Inilah potret nyata kehidupan persekutuan murid Kristus: mulai dari kemah kepemimpinan siswa di alam terbuka, malam doa mahasiswa, hingga forum etika kerja para alumni.
                </p>
              </div>

              <span className="text-xs font-bold text-stone-500 bg-white px-3 py-1.5 rounded-full border border-stone-200 shrink-0">
                Menampilkan 6 Kegiatan Pilihan
              </span>
            </div>

            {/* Photo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {pastActivityPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className="rounded-3xl border border-stone-200/90 bg-white overflow-hidden shadow-warm-xs hover:shadow-warm-md hover:border-primary/40 transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => setLightboxPhoto(photo)}
                >
                  <div>
                    {/* Photo Thumbnail with Zoom and Lightbox Trigger */}
                    <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                      {/* Category and Attendee Overlay */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                          {photo.category}
                        </span>
                        <span className="text-[10px] font-bold text-amber-300 bg-[#2D060B]/90 px-2.5 py-1 rounded-full border border-amber-300/30">
                          {photo.attendees}
                        </span>
                      </div>

                      {/* Magnify icon hint */}
                      <div className="absolute bottom-3 right-3 size-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <Maximize2 className="size-4" />
                      </div>

                      {/* Location and Date (Bottom Overlay) */}
                      <div className="absolute bottom-3 left-3 right-12 text-xs text-white/90 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3 text-amber-300 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="space-y-1">
                        <span className="text-[11px] text-stone-400 font-semibold block">
                          {photo.date}
                        </span>
                        <h3 className="font-sans text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {photo.title}
                        </h3>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {photo.highlight}
                      </p>

                      {/* Testimonial Quote */}
                      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5 relative">
                        <Quote className="size-4 text-stone-300 absolute right-3 top-3" />
                        <p className="text-xs italic text-stone-700 leading-relaxed font-serif pr-4">
                          &ldquo;{photo.quote}&rdquo;
                        </p>
                        <span className="block text-[10px] font-bold text-primary">
                          — {photo.quoteAuthor}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Movement Impact Counter Banner */}
            <div className="rounded-3xl bg-[#2D060B] text-white p-8 sm:p-12 shadow-warm-lg">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Dampak Nyata Sepanjang 2024 – 2026
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-black text-white">
                  Buah Kasih & Ketekunan Pelayanan Bersama
                </h3>
                <p className="text-xs sm:text-sm text-stone-300">
                  Setiap angka mencerminkan jiwa yang dilayani, didoakan, dan dibina dalam kelompok pemuridan
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-1">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                    1,250+
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    Peserta Siswa & Mahasiswa Terlatih
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                    48+
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    Kemah, Retret & Temu Rohani
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                    6
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    Wilayah Banten & Maluku Utara
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-3xl sm:text-4xl font-black text-amber-300 font-mono">
                    100%
                  </span>
                  <span className="text-xs text-stone-300 font-medium">
                    Dukungan Doa & Kerelawanan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. ROADMAP KALENDER TAHUNAN 2026
            Month-by-month rhythm of the movement
            ============================================================ */}
        <section id="roadmap-tahunan" className="py-16 sm:py-20 scroll-mt-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Irama Pelayanan Sepanjang Tahun
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                Roadmap Kegiatan Tahunan 2026
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                Rangkaian jadwal berkala kelompok KTB mingguan, pembinaan kuartalan, dan perhelatan tahunan ESM Indonesia.
              </p>
            </div>

            {/* Timeline Container */}
            <div className="space-y-4">
              {[
                {
                  quarter: "Kuartal 1 (Januari – Maret 2026)",
                  events: [
                    { month: "Januari", title: "Ekspedisi Misi Pelajar Ternate", desc: "Bakti sosial pendidikan dan perintisan KTB sekolah Maluku Utara." },
                    { month: "Februari", title: "Malam Doa Serentak Nusantara", desc: "Syafaat bersama ratusan mitra pendoa via hybrid." },
                    { month: "Maret", title: "Connect Marketplace Ethics Forum", desc: "Temu profesional muda alumni di Jabodetabek." },
                  ],
                },
                {
                  quarter: "Kuartal 2 (April – Juni 2026)",
                  events: [
                    { month: "April", title: "Retret Alam Pemimpin KTB", desc: "Pelatihan induktif Kitab Titus bagi mentor mahasiswa." },
                    { month: "Mei", title: "Encounter Campus Revival Night", desc: "Ibadah dedikasi dan kebangunan rohani mahasiswa kampus." },
                    { month: "Juni", title: "Penyusunan Kurikulum Firman", desc: "Konsolidasi tim literatur modul PA tahun ajaran baru." },
                  ],
                },
                {
                  quarter: "Kuartal 3 (Juli – September 2026)",
                  events: [
                    { month: "Juli", title: "Penyambutan Mahasiswa Baru (PMB)", desc: "Menjangkau angkatan baru di kampus-kampus Banten." },
                    { month: "Agustus", title: "Annual Movement Prayer 2026", desc: "Doa syafaat serentak seluruh staf, siswa, alumni, dan mitra." },
                    { month: "September", title: "Explore Youth Leadership Camp 2026", desc: "Kemah kepemimpinan siswa SMP & SMA se-Banten." },
                  ],
                },
                {
                  quarter: "Kuartal 4 (Oktober – Desember 2026)",
                  events: [
                    { month: "Oktober", title: "Encounter Campus Leadership Forum", desc: "Evaluasi multiplikasi kelompok kecil kampus." },
                    { month: "November", title: "Marketplace Integrity Roundtable", desc: "Sesi mentoring karier kristiani lulusan baru." },
                    { month: "Desember", title: "Syukur Natal & Pengutusan Misi Akhir Tahun", desc: "Ibadah syukur penutupan tahun pelayanan." },
                  ],
                },
              ].map((q, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-warm-xs space-y-4">
                  <h3 className="font-sans text-base font-bold text-primary flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-primary" />
                    {q.quarter}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {q.events.map((ev, evIdx) => (
                      <div key={evIdx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md inline-block">
                          {ev.month}
                        </span>
                        <h4 className="font-sans text-sm font-bold text-stone-900 leading-snug">
                          {ev.title}
                        </h4>
                        <p className="text-xs text-stone-600 font-normal leading-relaxed">
                          {ev.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            6. HOST AN EVENT / PARTNERSHIP INVITATION
            Invite ESM trainers to schools, campuses, and churches
            ============================================================ */}
        <section className="py-16 sm:py-20 bg-white border-t border-stone-200/90 relative">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE4] p-8 sm:p-12 border border-stone-300/80 shadow-warm-xs text-center space-y-6">
              <div className="size-14 rounded-2xl bg-[#2D060B] text-amber-300 mx-auto flex items-center justify-center shadow-warm-xs">
                <HeartHandshake className="size-7" />
              </div>

              <div className="space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Kemitraan & Pelayanan di Kota Anda
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Rindukan Mengadakan Kemah Siswa atau Retret di Sekolah/Gereja Anda?
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Tim pembina dan staf ESM siap hadir melayani sebagai fasilitator kemah pemuda, pembicara seminar firman, atau mendampingi gereja lokal Anda merintis kelompok pemuridan siswa dan mahasiswa.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-warm-xs bg-[#2D060B] hover:bg-[#450A12] text-white">
                  <Link href="/kemitraan" className="flex items-center gap-2">
                    <span>Undang Tim Pembina ESM</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <MaskedWhatsAppLink
                  phone="6281296106611"
                  text="Shalom ESM Indonesia, kami dari persekutuan sekolah/kampus/gereja ingin berkonsultasi mengenai kerja sama penyelenggaraan kegiatan pembinaan."
                  variant="button"
                  className="rounded-full px-7 py-3 font-bold border border-stone-300 text-stone-700 bg-white hover:bg-stone-50 shadow-xs text-sm"
                  label="Konsultasi Cepat WA"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================
          7. INTERACTIVE RSVP REGISTRATION MODAL
          ============================================================ */}
      {selectedEventForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEventForRsvp(null)}
              className="absolute top-5 right-5 size-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors"
            >
              <X className="size-4" />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="size-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans text-xl font-bold text-stone-900">
                    Pendaftaran Berhasil Diterima!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto">
                    Terima kasih, <strong>{rsvpForm.fullName}</strong>. Tim panitia ESM akan menghubungi nomor WhatsApp Anda untuk konfirmasi teknis kegiatan.
                  </p>
                </div>
                <div className="pt-3">
                  <Button
                    onClick={() => setSelectedEventForRsvp(null)}
                    className="rounded-full px-7 font-bold bg-[#2D060B] text-white"
                  >
                    Tutup Jendela
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1 pr-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                    Formulir Reservasi / Pendaftaran
                  </span>
                  <h3 className="font-sans text-xl font-black text-foreground pt-1">
                    {selectedEventForRsvp.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {selectedEventForRsvp.displayDate} • {selectedEventForRsvp.location}
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpForm.fullName}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, fullName: e.target.value })}
                      placeholder="Contoh: Samuel Pratama"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpForm.phoneWhatsApp}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, phoneWhatsApp: e.target.value })}
                      placeholder="Contoh: 0812-3456-7890"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Jenjang Pelayanan
                      </label>
                      <select
                        value={rsvpForm.communityRole}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, communityRole: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="Siswa">Siswa SMP / SMA</option>
                        <option value="Mahasiswa">Mahasiswa Perguruan Tinggi</option>
                        <option value="Alumni">Alumni / Profesional</option>
                        <option value="Guru/Mentor">Guru / Pembina Rohani</option>
                        <option value="Umum">Sahabat / Mitra Umum</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Asal Sekolah / Kampus / Kota
                      </label>
                      <input
                        type="text"
                        value={rsvpForm.city}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, city: e.target.value })}
                        placeholder="Contoh: SMA 1 Serang / Untirta"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      rows={2}
                      value={rsvpForm.notes}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, notes: e.target.value })}
                      placeholder="Pertanyaan khusus atau kebutuhan akomodasi..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button
                      type="submit"
                      disabled={isSubmittingRsvp}
                      className="w-full rounded-full py-2.5 text-xs font-bold bg-[#2D060B] hover:bg-[#450A12] text-white shadow-warm-xs cursor-pointer"
                    >
                      {isSubmittingRsvp ? (
                        <>
                          <Loader2 className="size-3.5 mr-2 animate-spin" />
                          <span>Menyimpan Pendaftaran...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-3.5 mr-2" />
                          <span>Kirim Formulir Pendaftaran</span>
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleWhatsAppDirect(selectedEventForRsvp)}
                      className="w-full rounded-full py-2.5 text-xs font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                    >
                      <MessageCircle className="size-4 mr-2 text-emerald-600" />
                      <span>Daftar Langsung via WhatsApp Panitia</span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          8. PHOTO LIGHTBOX PREVIEW MODAL
          ============================================================ */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 size-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-stone-900">
              <Image
                src={lightboxPhoto.image}
                alt={lightboxPhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-[#1A0305] border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold uppercase tracking-wider text-amber-300">
                  {lightboxPhoto.category}
                </span>
                <span className="text-stone-400">
                  {lightboxPhoto.date} • {lightboxPhoto.location} • {lightboxPhoto.attendees}
                </span>
              </div>
              <h3 className="font-sans text-xl font-bold text-white">
                {lightboxPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                {lightboxPhoto.highlight}
              </p>
              <p className="text-xs italic text-amber-200/90 pt-1">
                &ldquo;{lightboxPhoto.quote}&rdquo; — {lightboxPhoto.quoteAuthor}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
