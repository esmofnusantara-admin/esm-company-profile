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
        "relative overflow-hidden bg-gradient-to-b from-[#1E0508] via-[#2A080E] to-[#120305] text-white py-20 md:py-28",
        className
      )}
    >
      {/* 1. Cahaya Inti Ruby Crimson Luminous */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[340px] sm:h-[450px] bg-gradient-to-tr from-primary/60 via-red-600/40 to-rose-500/25 rounded-full blur-[120px] pointer-events-none opacity-80" />

      {/* 2. Top Red Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[200px] bg-red-500/20 rounded-full blur-[90px] pointer-events-none" />

      {/* 3. Delicate Pearl/Red Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(186,36,33,0.18)_40%,transparent_75%)] pointer-events-none" />

      {/* Konten Hero */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {badge && (
          <div className="inline-block">
            <Badge
              variant={badgeVariant}
              className="text-xs px-3.5 py-1 font-semibold tracking-wide bg-primary/20 text-red-200 border-primary/30 shadow-xs"
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
