"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Compass,
  GraduationCap,
  Briefcase,
  Heart,
  Users,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  Film,
  Layers,
  Images,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export interface HeroCardSlide {
  id: string;
  imageUrl: string;
  titleId?: string;
  titleEn?: string;
  captionId?: string;
  captionEn?: string;
}

export interface HeroCardPillarItem {
  icon: "flame" | "compass" | "graduation" | "briefcase" | "heart" | "users";
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  url?: string;
}

export interface HeroCardConfig {
  displayMode: "TABS" | "PILLARS" | "SLIDER" | "IMAGE" | "VIDEO";
  
  // 1. Pilar / Teks (3C)
  badgeTextId: string;
  badgeTextEn: string;
  titleId: string;
  titleEn: string;
  subtitleId: string;
  subtitleEn: string;
  pillars: HeroCardPillarItem[];
  ctaTextId: string;
  ctaTextEn: string;
  ctaUrl: string;

  // 2. Foto Tunggal
  singleImageUrl: string;
  singleImageTitleId: string;
  singleImageTitleEn: string;
  singleImageCaptionId: string;
  singleImageCaptionEn: string;

  // 3. Video
  videoUrl: string; // YouTube or direct MP4
  videoThumbnail: string;
  videoTitleId: string;
  videoTitleEn: string;
  videoCaptionId: string;
  videoCaptionEn: string;

  // 4. Swipe Slider (Multi-Gambar)
  slides: HeroCardSlide[];
  autoSlide: boolean;
  slideIntervalSeconds: number;
}

export const defaultHeroCardConfig: HeroCardConfig = {
  displayMode: "TABS",
  badgeTextId: "Aktif",
  badgeTextEn: "Active",
  titleId: "Kerangka Pelayanan 3C",
  titleEn: "3C Ministry Framework",
  subtitleId: "Communion • Community • Commission",
  subtitleEn: "Communion • Community • Commission",
  pillars: [
    {
      icon: "compass",
      titleId: "Explore Community (Siswa SMA)",
      titleEn: "Explore Community (High School)",
      descId: "Menemani siswa mengenal Kristus di masa pencarian identitas dan berani bersaksi di sekolah.",
      descEn: "Walking alongside students discovering identity in Christ and boldly testifying in school.",
      url: "/pelayanan/explore",
    },
    {
      icon: "graduation",
      titleId: "Encounter Community (Mahasiswa)",
      titleEn: "Encounter Community (University)",
      descId: "Membangun kelompok pemuridan kampus yang kritis, beriman teguh, dan siap diutus.",
      descEn: "Building robust, discerning campus discipleship groups ready to be sent into mission.",
      url: "/pelayanan/encounter",
    },
    {
      icon: "briefcase",
      titleId: "Connect Community (Alumni)",
      titleEn: "Connect Community (Marketplace)",
      descId: "Menghubungkan profesional dan alumni untuk integritas iman dan misi di marketplace.",
      descEn: "Connecting alumni and marketplace professionals for living out faith with integrity.",
      url: "/pelayanan/connect",
    },
  ],
  ctaTextId: "Bergabung atau Jadi Mitra Gerakan",
  ctaTextEn: "Join or Partner With Us",
  ctaUrl: "/pelayanan",

  singleImageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80",
  singleImageTitleId: "Dokumentasi Kampus & Pelayanan Misi",
  singleImageTitleEn: "Campus Ministry & Mission Documentation",
  singleImageCaptionId: "Membangun generasi muda yang berakar dalam firman Tuhan dan berintegritas.",
  singleImageCaptionEn: "Equipping the young generation rooted in God's word and living with integrity.",

  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  videoThumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80",
  videoTitleId: "Video Profil Gerakan ESM",
  videoTitleEn: "ESM Movement Profile Video",
  videoCaptionId: "Kilas perjalanan pelayanan pemuridan di Banten & Ternate.",
  videoCaptionEn: "Snapshots of the discipleship journey across Banten & Ternate.",

  slides: [
    {
      id: "slide-1",
      imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1000&q=80",
      titleId: "Explore Camp Siswa Banten",
      titleEn: "Banten High School Explore Camp",
      captionId: "Retret pembinaan kepemimpinan siswa SMP & SMA di Banten.",
      captionEn: "Youth leadership and discipleship retreat for Banten students.",
    },
    {
      id: "slide-2",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      titleId: "Encounter Mahasiswa Ternate",
      titleEn: "Ternate Campus Encounter Fellowship",
      captionId: "Kelompok pemuridan mahasiswa di sekitar Universitas Khairun.",
      captionEn: "Campus discipleship group around Khairun University, North Maluku.",
    },
    {
      id: "slide-3",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
      titleId: "Connect Fellowship Alumni",
      titleEn: "Marketplace Alumni Connect Fellowship",
      captionId: "Persekutuan profesional muda untuk integritas iman di tempat kerja.",
      captionEn: "Young professional fellowship upholding biblical integrity in marketplace.",
    },
  ],
  autoSlide: true,
  slideIntervalSeconds: 5,
};

interface HeroVisualCardProps {
  config?: HeroCardConfig | null;
}

export function HeroVisualCard({ config }: HeroVisualCardProps) {
  const { locale, t } = useLanguage();
  const c = { ...defaultHeroCardConfig, ...config };

  // Tab State
  const initialTab =
    c.displayMode === "TABS"
      ? "pillars"
      : c.displayMode === "SLIDER"
      ? "slider"
      : c.displayMode === "VIDEO"
      ? "video"
      : c.displayMode === "IMAGE"
      ? "image"
      : "pillars";

  const [activeTab, setActiveTab] = React.useState<"pillars" | "slider" | "video" | "image">(initialTab);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);

  const slides = c.slides && c.slides.length > 0 ? c.slides : defaultHeroCardConfig.slides;

  // Auto slide effect
  React.useEffect(() => {
    if ((activeTab === "slider" || c.displayMode === "SLIDER") && c.autoSlide && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, (c.slideIntervalSeconds || 5) * 1000);
      return () => clearInterval(interval);
    }
  }, [activeTab, c.displayMode, c.autoSlide, c.slideIntervalSeconds, slides.length]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe Left -> Next
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe Right -> Prev
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    setTouchStartX(null);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Icon Helper
  const renderPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "compass":
        return <Compass className="size-4 text-white" />;
      case "graduation":
        return <GraduationCap className="size-4 text-accent" />;
      case "briefcase":
        return <Briefcase className="size-4 text-white" />;
      case "heart":
        return <Heart className="size-4 text-rose-300" />;
      case "users":
        return <Users className="size-4 text-amber-300" />;
      case "flame":
      default:
        return <Flame className="size-4 text-accent" />;
    }
  };

  // YouTube Embed Formatter
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/") + "?autoplay=1";
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="relative mx-auto max-w-md rounded-3xl border border-white/15 bg-black/40 p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4 ring-1 ring-white/10">
      {/* Interactive Tabs Header if in TABS mode */}
      {c.displayMode === "TABS" && (
        <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-1">
          <div className="flex items-center p-1 rounded-xl bg-black/30 border border-white/10 w-full justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("pillars")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-1 justify-center",
                activeTab === "pillars"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              )}
            >
              <Layers className="size-3.5" />
              <span>{locale === "en" ? "3C Pillars" : "Pilar 3C"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("slider")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-1 justify-center",
                activeTab === "slider"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              )}
            >
              <Images className="size-3.5" />
              <span>{locale === "en" ? "Photos" : "Swipe Foto"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-1 justify-center",
                activeTab === "video"
                  ? "bg-primary text-white shadow-md shadow-primary/30 font-bold"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              )}
            >
              <Film className="size-3.5" />
              <span>Video</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW 1: PILAR 3C (TEKS KERANGKA PELAYANAN)
          ========================================================= */}
      {(c.displayMode === "PILLARS" || (c.displayMode === "TABS" && activeTab === "pillars")) && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-red-400 shadow-xs">
                <Flame className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {locale === "en" ? c.titleEn || c.titleId : c.titleId}
                </h4>
                <p className="text-xs text-white/60">
                  {locale === "en" ? c.subtitleEn || c.subtitleId : c.subtitleId}
                </p>
              </div>
            </div>
            <Badge variant="primarySoft" className="text-[10px] px-2.5 py-0.5 bg-primary/20 text-red-200 border border-primary/30">
              {locale === "en" ? c.badgeTextEn || c.badgeTextId : c.badgeTextId}
            </Badge>
          </div>

          {/* 3 Pillars List */}
          <div className="space-y-2.5">
            {c.pillars?.map((p, idx) => {
              const title = locale === "en" ? p.titleEn || p.titleId : p.titleId;
              const desc = locale === "en" ? p.descEn || p.descId : p.descId;
              return (
                <Link
                  key={idx}
                  href={p.url || "/pelayanan"}
                  className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.12] transition-all group block shadow-xs"
                >
                  <div
                    className="size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-xs transition-transform group-hover:scale-105 bg-primary/25 border border-primary/40 text-red-300"
                  >
                    {renderPillarIcon(p.icon)}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-white block group-hover:text-red-200 transition-colors">
                      {title}
                    </span>
                    <span className="text-[11px] text-white/70 leading-snug block mt-0.5">
                      {desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center justify-between text-xs">
            <span className="text-white/85 font-medium">
              {locale === "en" ? c.ctaTextEn || c.ctaTextId : c.ctaTextId}
            </span>
            <Link
              href={c.ctaUrl || "/pelayanan"}
              className="text-red-300 font-bold hover:text-white hover:underline flex items-center gap-1 group"
            >
              <span>{t.common.readMore}</span>
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW 2: SWIPE CAROUSEL / SLIDER (MULTI-FOTO DOKUMENTASI)
          ========================================================= */}
      {(c.displayMode === "SLIDER" || (c.displayMode === "TABS" && activeTab === "slider")) && (
        <div className="space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Images className="size-4 text-red-400" />
              <h4 className="text-sm font-bold text-white">
                {locale === "en" ? "Activity Gallery" : "Dokumentasi Kegiatan"}
              </h4>
            </div>
            <span className="text-[11px] text-white/60 font-mono">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          {/* Swipe Container */}
          <div
            className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/40 select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((s, idx) => {
              const isCurrent = idx === currentSlide;
              const title = locale === "en" ? s.titleEn || s.titleId : s.titleId;
              const caption = locale === "en" ? s.captionEn || s.captionId : s.captionId;

              return (
                <div
                  key={s.id || idx}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 ease-in-out",
                    isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                  )}
                >
                  <Image
                    src={s.imageUrl}
                    alt={title || "Slide Image"}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {/* Gradient Overlay for Readable Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Caption & Title */}
                  <div className="absolute bottom-0 inset-x-0 p-4 space-y-1 text-left z-20">
                    {title && (
                      <p className="text-xs sm:text-sm font-bold text-white drop-shadow-sm flex items-center gap-1.5">
                        <Sparkles className="size-3 text-red-300 shrink-0" />
                        <span>{title}</span>
                      </p>
                    )}
                    {caption && (
                      <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 size-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 size-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
          </div>

          {/* Pagination Indicators (Dots / Pills) */}
          {slides.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    currentSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-white/30 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
          )}

          <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-between text-[11px]">
            <span className="text-white/70 italic">
              {locale === "en" ? "Swipe on mobile or click arrows to explore" : "Geser foto atau klik panah untuk melihat"}
            </span>
            <Link href="/artikel" className="text-red-300 font-bold hover:text-white hover:underline flex items-center gap-1">
              <span>{locale === "en" ? "All Gallery" : "Galeri Lengkap"}</span>
              <ChevronRight className="size-3" />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW 3: VIDEO PEMAIN (YOUTUBE / DIRECT MP4)
          ========================================================= */}
      {(c.displayMode === "VIDEO" || (c.displayMode === "TABS" && activeTab === "video")) && (
        <div className="space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="size-4 text-red-400" />
              <h4 className="text-sm font-bold text-white">
                {locale === "en" ? c.videoTitleEn || c.videoTitleId : c.videoTitleId || "Video Gerakan"}
              </h4>
            </div>
            <Badge variant="primarySoft" className="text-[10px] bg-primary/20 text-red-200 border-primary/30">
              HD Video
            </Badge>
          </div>

          {/* Video Player Frame */}
          <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg">
            {isVideoPlaying ? (
              c.videoUrl.includes("youtube") || c.videoUrl.includes("youtu.be") ? (
                <iframe
                  src={getEmbedUrl(c.videoUrl)}
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  src={c.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )
            ) : (
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                {c.videoThumbnail ? (
                  <Image
                    src={c.videoThumbnail}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/60 to-black/80 flex items-center justify-center" />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Big Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="size-14 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg shadow-primary/40 group-hover:scale-110 group-hover:bg-primary transition-all">
                    <Play className="size-6 ml-1 fill-current" />
                  </div>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="text-[11px] font-semibold text-white/90 bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs">
                    {locale === "en" ? "Click to play video" : "Klik untuk putar video"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-white/70 leading-relaxed px-1">
            {locale === "en" ? c.videoCaptionEn || c.videoCaptionId : c.videoCaptionId}
          </p>
        </div>
      )}

      {/* =========================================================
          VIEW 4: SINGLE IMAGE (FOTO TUNGGAL)
          ========================================================= */}
      {(c.displayMode === "IMAGE" || (c.displayMode === "TABS" && activeTab === "image")) && (
        <div className="space-y-3 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">
              {locale === "en" ? c.singleImageTitleEn || c.singleImageTitleId : c.singleImageTitleId}
            </h4>
          </div>

          <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/15 bg-black/40 group">
            {c.singleImageUrl ? (
              <Image
                src={c.singleImageUrl}
                alt="Highlight Image"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-muted/20 flex items-center justify-center text-white/40">
                <span>Belum ada foto</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 inset-x-3 text-left">
              <p className="text-xs text-white/90 leading-snug drop-shadow-sm">
                {locale === "en" ? c.singleImageCaptionEn || c.singleImageCaptionId : c.singleImageCaptionId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
