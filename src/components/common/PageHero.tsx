import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge?: string;
  badgeVariant?: "amber" | "outline" | "default" | "secondary" | "primarySoft";
  title: React.ReactNode;
  quote?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  badge,
  badgeVariant = "amber",
  title,
  quote,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#561727] via-[#3A101C] to-[#200810] text-white py-20 md:py-28",
        className
      )}
    >
      {/* 1. Cahaya Inti Pusat yang Sangat Terang (Brilliant Center Core Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[580px] h-[240px] sm:h-[300px] bg-amber-400/50 rounded-full blur-[75px] pointer-events-none" />

      {/* 2. Pendaran Sayap Crimson & Amber (Luminous Radial Spotlight) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[360px] sm:h-[480px] bg-gradient-to-r from-primary/80 via-amber-500/50 to-primary/80 rounded-full blur-[110px] pointer-events-none opacity-90" />

      {/* 3. Cahaya Puncak Emas (Top Golden Ambient Light) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] sm:w-[750px] h-[240px] bg-amber-300/35 rounded-full blur-[90px] pointer-events-none" />

      {/* 4. Radial Ellipse Highlight (Pendaran Gradasi Terang di Tengah) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,225,160,0.25)_0%,rgba(163,44,61,0.20)_40%,transparent_75%)] pointer-events-none" />

      {/* Konten Hero */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {badge && (
          <div className="inline-block">
            <Badge
              variant={badgeVariant}
              className="text-xs px-3.5 py-1 font-semibold tracking-wide bg-amber-400/20 text-amber-200 border-amber-300/40 shadow-xs"
            >
              {badge}
            </Badge>
          </div>
        )}

        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md">
          {title}
        </h1>

        {quote && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed font-serif italic drop-shadow-xs">
            &ldquo;{quote}&rdquo;
          </p>
        )}

        {description && (
          <div className="max-w-2xl mx-auto text-base text-white/85 leading-relaxed">
            {description}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
