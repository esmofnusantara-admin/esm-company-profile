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
        "relative overflow-hidden bg-gradient-to-b from-[#1C0407] via-[#2D060B] to-[#180306] text-white py-16 sm:py-20 md:py-24 border-b border-white/10",
        className
      )}
    >
      {/* 1. Golden Sunrise Ambient Glow */}
      <div className="absolute -top-24 right-0 w-[550px] h-[350px] bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* 2. Luminous Royal Garnet Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[340px] bg-gradient-to-tr from-primary/60 via-red-600/40 to-rose-500/25 rounded-full blur-[130px] pointer-events-none opacity-85" />

      {/* 3. Subtle Radial Sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(186,36,33,0.18)_40%,transparent_75%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold tracking-wide text-amber-200 backdrop-blur-md shadow-sm">
            {badge}
          </div>
        )}

        <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.18] text-white drop-shadow-md">
          {title}
        </h1>

        {quote && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-amber-100/90 leading-relaxed font-serif italic drop-shadow-xs">
            &ldquo;{quote}&rdquo;
          </p>
        )}

        {description && (
          <div className="max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
            {description}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
