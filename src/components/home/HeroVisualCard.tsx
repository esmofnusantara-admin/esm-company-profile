"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  GraduationCap,
  Briefcase,
  Sparkles,
  ChevronRight,
  Heart,
  MapPin,
} from "lucide-react";
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
  displayMode: "TABS" | "PILLARS" | "SLIDER" | "IMAGE" | "VIDEO" | string;

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
  videoUrl: string;
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
      descId: "Membimbing mahasiswa bertumbuh dalam iman dan daya kritis intelektual.",
      descEn: "Mentoring students in spiritual depth and critical intellectual rigor.",
      url: "/pelayanan/encounter",
    },
    {
      icon: "briefcase",
      titleId: "Connect Community (Alumni & Profesional)",
      titleEn: "Connect Community (Alumni & Professionals)",
      descId: "Memperlengkapi alumni menjadi garam dan terang di dunia kerja dan masyarakat.",
      descEn: "Equipping alumni to be salt and light in their professions and society.",
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
  ],
  autoSlide: true,
  slideIntervalSeconds: 5,
};

interface HeroVisualCardProps {
  config?: HeroCardConfig | null;
}

export function HeroVisualCard({ config }: HeroVisualCardProps) {
  const { locale } = useLanguage();

  const stages = [
    {
      step: "01",
      name: "Explore",
      target: locale === "en" ? "High School Students" : "Siswa SMA",
      desc: locale === "en" ? "Identity in Christ" : "Menemukan identitas sejati di sekolah",
      icon: Compass,
      href: "/pelayanan/explore",
      accent: "text-amber-300 bg-amber-400/15 border-amber-300/30",
    },
    {
      step: "02",
      name: "Encounter",
      target: locale === "en" ? "University Students" : "Mahasiswa Kampus",
      desc: locale === "en" ? "Rooted & critical on campus" : "Berakar kuat & berintegritas di kampus",
      icon: GraduationCap,
      href: "/pelayanan/encounter",
      accent: "text-rose-200 bg-rose-400/15 border-rose-300/30",
    },
    {
      step: "03",
      name: "Connect",
      target: locale === "en" ? "Alumni & Professionals" : "Alumni & Profesional",
      desc: locale === "en" ? "Salt & light in marketplace" : "Garam & terang di dunia kerja",
      icon: Briefcase,
      href: "/pelayanan/connect",
      accent: "text-amber-200 bg-amber-400/15 border-amber-300/30",
    },
  ];

  return (
    <div className="relative mx-auto max-w-lg rounded-[2.25rem] border border-white/20 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-black/40 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] space-y-6 ring-1 ring-white/15">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-200 backdrop-blur-md">
          <Sparkles className="size-3 text-amber-300" />
          <span>{locale === "en" ? "Discipleship Framework" : "Alur Pemuridan 3C"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-white/70">
          <MapPin className="size-3 text-amber-300" />
          <span>Banten & Ternate</span>
        </div>
      </div>

      {/* Warm Quote & Spiritual Heartbeat */}
      <div className="space-y-2 border-l-2 border-amber-300/60 pl-3.5">
        <p className="font-serif italic text-sm sm:text-base text-white/95 leading-relaxed">
          &ldquo;Memuridkan bukan sekadar program mingguan, melainkan kehidupan yang dibagikan dari hati ke hati.&rdquo;
        </p>
        <p className="text-[11px] font-semibold tracking-wider uppercase text-amber-200/80">
          Communion • Community • Commission
        </p>
      </div>

      {/* Connected 3-Stage Discipleship Track */}
      <div className="space-y-2.5 pt-1">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Link
              key={st.name}
              href={st.href}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 transition-all duration-200 hover:border-amber-300/40 hover:bg-white/[0.12] hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl border shadow-xs transition-transform group-hover:scale-105",
                    st.accent
                  )}
                >
                  <Icon className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase text-amber-300">
                      {st.step}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-100 transition-colors">
                      {st.name}
                    </span>
                    <span className="text-[10px] text-white/60">
                      • {st.target}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/75 mt-0.5 line-clamp-1">
                    {st.desc}
                  </p>
                </div>
              </div>
              <ChevronRight className="size-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-amber-300 shrink-0 ml-2" />
            </Link>
          );
        })}
      </div>

      {/* Warm Footer Link */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
        <span className="flex items-center gap-1.5 text-[11px] text-white/70">
          <Heart className="size-3 text-rose-400 fill-rose-400/40" />
          <span>Berakar, bertumbuh, & berbuah</span>
        </span>
        <Link
          href="/pelayanan"
          className="font-bold text-amber-200 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>Pelajari Selengkapnya</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
