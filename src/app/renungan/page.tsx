"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/common/PageHero";
import {
  BookOpen,
  Sparkles,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Flame,
  Heart,
  Download,
  Search,
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Quote,
  ArrowRight,
  BookMarked,
  Volume2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/context/ToastContext";

interface DailyVerse {
  day: string;
  date: string;
  reference: string;
  passage: string;
  passageEn?: string;
  theme: string;
  reflection: string;
  reflectionEn?: string;
  keyThought: string;
}

const GOLDEN_VERSES: DailyVerse[] = [
  {
    day: "Hari Ini",
    date: "14 November 2026",
    reference: "Yesaya 40:31",
    passage:
      "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.",
    passageEn:
      "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    theme: "Kekuatan Rohani",
    reflection:
      "Di tengah ritme perkuliahan yang padat, beban studi, dan dinamika pelayanan di perintisan Banten & Ternate, kekuatan manusiawi kita terbatas. Namun ketika kita berhenti sejenak dalam keheningan saat teduh dan menanti-nantikan TUHAN, Roh Kudus memperbaharui kekuatan batin kita dengan sayap anugerah yang mengatasi kelelahan jiwa.",
    reflectionEn:
      "Amid hectic campus schedules and the demands of mission pioneering, human energy easily depletes. Yet as we pause in quiet meditation before the LORD, His Spirit renews our inner stamina to soar above weary circumstances.",
    keyThought: "Kekuatan sejati lahir dari keintiman menanti-nantikan Tuhan dalam doa.",
  },
  {
    day: "Kemarin",
    date: "13 November 2026",
    reference: "Matius 28:19-20",
    passage:
      "Karena itu pergilah, jadikanlah semua bangsa murid-Ku dan baptislah mereka dalam nama Bapa dan Anak dan Roh Kudus, dan ajarlah mereka melakukan segala sesuatu yang telah Kuperintahkan kepadamu. Dan ketahuilah, Aku menyertai kamu senantiasa sampai kepada akhir zaman.",
    passageEn:
      "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.",
    theme: "Amanat Agung",
    reflection:
      "Amanat Agung bukanlah usulan opsional, melainkan denyut nadi keberadaan setiap pengikut Kristus. Pemuridan bukan sekadar transfer pengetahuan Alkitab, melainkan menuntun generasi muda menghidupi kebenaran dalam ketaatan penuh cinta.",
    reflectionEn:
      "The Great Commission is not an optional suggestion, but the heartbeat of every true disciple.",
    keyThought: "Setiap murid dipanggil untuk melahirkan murid baru di lingkungannya.",
  },
  {
    day: "Arsip Pekan Ini",
    date: "12 November 2026",
    reference: "Kolose 2:6-7",
    passage:
      "Kamu telah menerima Kristus Yesus, Tuhan kita. Karena itu hendaklah hidupmu tetap di dalam Dia. Hendaklah kamu berakar di dalam Dia dan dibangun di atas Dia, hendaklah kamu bertambah teguh dalam iman yang telah diajarkan kepadamu, dan hendaklah hatimu melimpah dengan syukur.",
    passageEn:
      "So then, just as you received Christ Jesus as Lord, continue to live your lives in him, rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.",
    theme: "Berakar Dalam Kristus",
    reflection:
      "Pohon yang tinggi membutuhkan akar yang jauh lebih dalam ke dalam tanah agar tahan terhadap terpaan badai. Demikian pula iman mahasiswa dan siswa di era gempuran sekularisme hanya kokoh jika berakar dalam Firman Tuhan.",
    reflectionEn:
      "A towering tree requires deep roots to withstand fierce storms. So our faith stands strong only when deeply anchored in Christ.",
    keyThought: "Kedalaman akar menentukan ketahanan iman di tengah badai zaman.",
  },
];

interface DevotionalArticle {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  scripture: string;
  author: string;
  readTime: string;
  excerpt: string;
  date: string;
  featured?: boolean;
}

const DEVOTIONAL_LIST: DevotionalArticle[] = [
  {
    id: "dev-1",
    title: "Mengapa Keheningan Pagi Menentukan Kemenangan Hari Ini?",
    titleEn: "Why Morning Silence Determines Today's Spiritual Victory",
    category: "SAAT_TEDUH",
    scripture: "Mazmur 5:4",
    author: "Tim Pembina Rohani ESM",
    readTime: "4 Menit Baca",
    excerpt:
      "Sebelum dunia membanjiri pikiran kita dengan notifikasi media sosial dan kecemasan tugas, luangkan 15 menit pertama untuk mendengar suara Bapa di surga.",
    date: "14 November 2026",
    featured: true,
  },
  {
    id: "dev-2",
    title: "Memuridkan di Tengah Kesibukan Kuliah & Tugas Akhir",
    titleEn: "Discipling Amidst Campus Pressure & Academic Deadlines",
    category: "PEMURIDAN",
    scripture: "2 Timotius 2:2",
    author: "Yohanes Setiawan (Koordinator ESM)",
    readTime: "5 Menit Baca",
    excerpt:
      "Sering kali kita beralasan menunggu waktu luang untuk mendampingi adik tingkat. Namun murid sejati dibentuk dalam dinamika hidup sehari-hari yang realistis.",
    date: "12 November 2026",
  },
  {
    id: "dev-3",
    title: "Mata yang Terarah Pada Ladang yang Menguning di Banten & Ternate",
    titleEn: "Eyes Focused on the Ripe Harvest Fields in Banten & Ternate",
    category: "MISI",
    scripture: "Yohanes 4:35",
    author: "Staf Misi Lapangan",
    readTime: "4 Menit Baca",
    excerpt:
      "Ketika Yesus memandang orang banyak, hati-Nya tergerak oleh belas kasihan. Apakah kita masih memiliki hati yang berdenyut bagi jiwa-jiwa yang belum terjangkau?",
    date: "10 November 2026",
  },
  {
    id: "dev-4",
    title: "Integritas Pelajar: Bersaksi Lewat Kejujuran di Ruang Ujian",
    titleEn: "Student Integrity: Bearing Witness Through Honesty in Exam Rooms",
    category: "KARAKTER",
    scripture: "Amsal 11:3",
    author: "Pembina Explore Siswa",
    readTime: "3 Menit Baca",
    excerpt:
      "Kekristenan bukan hanya lagu di hari Minggu, melainkan ujian integritas saat pensil menulis jawaban tanpa menyontek di hadapan Tuhan yang melihat segalanya.",
    date: "08 November 2026",
  },
  {
    id: "dev-5",
    title: "Menemukan Ketenteraman Batin di Tengah Kecemasan Masa Depan",
    titleEn: "Finding Inner Serenity Amidst Future Career Anxiety",
    category: "SAAT_TEDUH",
    scripture: "Filipi 4:6-7",
    author: "Staf Konseling Mahasiswa",
    readTime: "5 Menit Baca",
    excerpt:
      "Kecemasan adalah sinyal agar kita mengalihkan beban kepada Tuhan lewat doa dan ucapan syukur. Damai sejahtera Allah yang melampaui segala akal akan memelihara hatimu.",
    date: "05 November 2026",
  },
];

export default function RenunganPage() {
  const { locale } = useLanguage();
  const { success: showSuccessToast } = useToast();

  const [activeVerseIndex, setActiveVerseIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");

  // Interactive Quiet Time Timer State
  const [timerRunning, setTimerRunning] = React.useState(false);
  const [timerSeconds, setTimerSeconds] = React.useState(600); // 10 minutes
  const [activeStep, setActiveStep] = React.useState<number>(1);

  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      showSuccessToast("Saat Teduh Selesai!", "Kiranya damai Kristus menyertai langkahmu hari ini.");
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, showSuccessToast]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentVerse = GOLDEN_VERSES[activeVerseIndex];

  const handleCopyVerse = () => {
    const textToCopy = `"${currentVerse.passage}" — ${currentVerse.reference}\n\nRenungan ESM: ${currentVerse.reflection}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showSuccessToast("Ayat Emas Tersalin", "Ayat hari ini berhasil disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Ayat Emas Hari Ini (ESM Nusantara)*\n\n"${currentVerse.passage}"\n_${currentVerse.reference}_\n\n*Intisari:* ${currentVerse.keyThought}\n\nBaca renungan harian selengkapnya di:\nhttps://esm.or.id/renungan`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const filteredArticles = DEVOTIONAL_LIST.filter((item) => {
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scripture.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-canvas text-foreground flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1">
        {/* Page Hero */}
        <PageHero
          badge="Santapan Rohani & Keintiman dengan Kristus"
          title="Renungan & Saat Teduh Harian"
          quote="Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku. — Mazmur 119:105"
          description="Memulai setiap hari dengan keheningan di hadapan hadirat Allah. Temukan ayat emas hari ini, panduan saat teduh 4 langkah, dan santapan firman yang menyegarkan jiwa serta meneguhkan panggilan pemuridan."
        />

        {/* 1. SECTION AYAT EMAS HARI INI (GOLDEN VERSE OF THE DAY) */}
        <section className="py-12 sm:py-16 border-b border-border/60 bg-gradient-to-b from-card/60 to-canvas">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                    Ayat Emas Hari Ini
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Firman penuntun langkah untuk mengawali aktivitas hari ini
                  </p>
                </div>
              </div>

              {/* Day Selector */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                {GOLDEN_VERSES.map((v, idx) => (
                  <button
                    key={v.reference}
                    onClick={() => setActiveVerseIndex(idx)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                      activeVerseIndex === idx
                        ? "bg-primary text-primary-foreground shadow-warm-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    )}
                  >
                    {v.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Verse Highlight Card */}
            <Card className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-6 sm:p-10 shadow-warm-md">
              <div className="absolute -top-12 -right-12 size-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <Quote className="absolute top-6 right-6 size-16 text-primary/10 pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="outline" className="border-primary/30 text-primary font-bold text-xs px-3 py-1 bg-primary/5">
                    {currentVerse.theme} • {currentVerse.date}
                  </Badge>
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="size-3.5" />
                    {currentVerse.day}
                  </span>
                </div>

                {/* Main Scripture Text */}
                <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold font-serif leading-relaxed text-foreground tracking-tight">
                  &ldquo;{locale === "en" ? currentVerse.passageEn || currentVerse.passage : currentVerse.passage}&rdquo;
                </blockquote>

                {/* Reference Pill */}
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-primary rounded-full" />
                  <span className="text-base sm:text-lg font-black tracking-wide text-primary">
                    {currentVerse.reference}
                  </span>
                </div>

                {/* Reflection Note */}
                <div className="p-4 sm:p-5 rounded-2xl bg-muted/60 border border-border/80 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground block mb-1">
                    Renungan Singkat:
                  </span>
                  {locale === "en" ? currentVerse.reflectionEn || currentVerse.reflection : currentVerse.reflection}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground italic">
                    <BookMarked className="size-4 text-primary" />
                    <span>&ldquo;{currentVerse.keyThought}&rdquo;</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyVerse}
                      className="rounded-xl text-xs h-9 gap-1.5 border-border hover:bg-muted"
                    >
                      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                      <span>{copied ? "Tersalin!" : "Salin Ayat"}</span>
                    </Button>

                    <Button
                      size="sm"
                      onClick={handleShareWhatsApp}
                      className="rounded-xl text-xs h-9 gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-warm-xs"
                    >
                      <Share2 className="size-3.5" />
                      <span>Bagikan ke WA</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 2. SECTION PANDUAN 4 LANGKAH SAAT TEDUH (QUIET TIME GUIDE & TIMER) */}
        <section className="py-14 sm:py-20 border-b border-border/60 bg-canvas">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <Badge variant="outline" className="border-accent/40 text-accent font-bold text-xs px-3 py-1 mb-3 bg-accent/5">
                Disiplin Rohani Harian
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
                Panduan 4 Langkah Saat Teduh
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                Saat teduh bukan sekadar ritual membaca cepat, melainkan waktu kencan pribadi bersama Bapa surgawi untuk mendengar suara-Nya dan meluruskan kompas hidup.
              </p>
            </div>

            {/* 4 Interactive Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {[
                {
                  step: 1,
                  title: "1. Hening & Doa",
                  subtitle: "Menyiapkan Hati",
                  desc: "Matikan distraksi notifikasi gawai. Ambil waktu 2 menit dalam keheningan, berdoa memohon Roh Kudus membuka mata hati memahami Firman.",
                  scripture: "Mazmur 46:11",
                },
                {
                  step: 2,
                  title: "2. Membaca Teks",
                  subtitle: "Membaca Berulang",
                  desc: "Baca perikop Alkitab hari ini 2 sampai 3 kali secara perlahan. Garis bawahi ayat yang berkesan atau berbicara langsung pada situasi batinmu.",
                  scripture: "Mazmur 119:105",
                },
                {
                  step: 3,
                  title: "3. Merenungkan",
                  subtitle: "Analisis 5W1H",
                  desc: "Apa sifat Allah yang dinyatakan? Adakah dosa yang harus diakui? Adakah janji yang dapat dipegang? Bagaimana aplikasi konkrit hari ini?",
                  scripture: "Yosua 1:8",
                },
                {
                  step: 4,
                  title: "4. Komitmen & Doa",
                  subtitle: "Langkah Ketaatan",
                  desc: "Tuliskan 1 langkah ketaatan nyata. Tutup dengan doa syafaat bagi keluarga, studi di kampus, dan pokok doa ladang misi ESM.",
                  scripture: "Yakobus 1:22",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={cn(
                    "cursor-pointer p-6 rounded-2xl border transition-all relative flex flex-col justify-between",
                    activeStep === item.step
                      ? "border-primary bg-primary/5 shadow-warm-md ring-2 ring-primary/20"
                      : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "size-8 rounded-xl flex items-center justify-center text-xs font-black",
                        activeStep === item.step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {item.step}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground/80">
                        {item.scripture}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Quiet Time Timer Widget */}
            <Card className="rounded-3xl border border-border/80 bg-gradient-to-r from-muted/50 via-card to-muted/50 p-6 sm:p-8 max-w-2xl mx-auto shadow-warm-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Timer className="size-5 text-primary animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Fokus Saat Teduh 10 Menit
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-foreground">
                    Gunakan Pengingat Hening Ini
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Fokus 10 menit tanpa interupsi bersama Firman Allah
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-foreground px-4 py-2 rounded-2xl bg-muted border border-border">
                    {formatTimer(timerSeconds)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setTimerRunning(!timerRunning)}
                      className={cn(
                        "rounded-xl h-11 w-11 p-0 shadow-warm-xs",
                        timerRunning
                          ? "bg-warning hover:bg-warning/90 text-warning-foreground"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      )}
                    >
                      {timerRunning ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(600);
                      }}
                      className="rounded-xl h-11 w-11 p-0 border-border hover:bg-muted"
                      title="Reset 10 Menit"
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 3. SECTION DAFTAR RENUNGAN HARIAN (DEVOTIONAL FEED) */}
        <section className="py-14 sm:py-20 border-b border-border/60 bg-gradient-to-b from-canvas via-card/30 to-canvas">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <Badge variant="outline" className="border-primary/40 text-primary font-bold text-xs px-3 py-1 mb-3 bg-primary/5">
                  Arsip & Santapan Firman
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  Renungan Rohani Terbaru
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Kumpulan tulisan renungan dan refleksi pemuridan dari para pembina rohani ESM
                </p>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari tema / nas Alkitab..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl text-xs bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {[
                    { id: "ALL", label: "Semua" },
                    { id: "SAAT_TEDUH", label: "Saat Teduh" },
                    { id: "PEMURIDAN", label: "Pemuridan" },
                    { id: "MISI", label: "Misi" },
                    { id: "KARAKTER", label: "Karakter" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors",
                        selectedCategory === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Devotional Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-2xl border border-border/80 bg-card hover:border-primary/40 hover:shadow-warm-sm transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">
                        {item.category.replace("_", " ")}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {item.readTime}
                      </span>
                    </div>

                    <div className="pt-1">
                      <span className="text-xs font-bold text-primary block mb-1">
                        Nas: {item.scripture}
                      </span>
                      <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground mt-4">
                    <span>Oleh: {item.author}</span>
                    <Link
                      href={`/artikel?q=${encodeURIComponent(item.title)}`}
                      className="font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      <span>Baca</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="size-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">Tidak ada renungan yang cocok dengan pencarian.</p>
              </div>
            )}
          </div>
        </section>

        {/* 4. SECTION UNDUH JURNAL SAAT TEDUH & BUKU RENUNGAN */}
        <section className="py-14 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-12 shadow-warm-md flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center md:text-left">
                <Badge variant="outline" className="border-primary/40 text-primary font-bold text-xs px-3 py-1 bg-primary/5">
                  Unduhan Gratis Modul Saat Teduh
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  Jurnal Saat Teduh 30 Hari & Rencana Baca Alkitab
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Buku panduan cetak praktis berisi lembar refleksi harian, ruang catatan doa syafaat, serta jadwal pembacaan Alkitab terstruktur untuk siswa dan mahasiswa.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" />
                    Format PDF Siap Cetak
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" />
                    Lembar Jurnal 5W1H
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" />
                    Gratis Tanpa Syarat
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-center gap-3">
                <Link
                  href="/documents/modul-saat-teduh-esm.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-warm-md hover:bg-primary/90 transition-all active:scale-95"
                >
                  <Download className="size-4" />
                  <span>Unduh Jurnal (PDF)</span>
                </Link>

                <Link
                  href="/sumber-daya"
                  className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  <span>Lihat Semua Bahan Ajar & PA</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
