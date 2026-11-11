"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt: string;
  badge?: string;
  title?: string;
  caption?: string;
}

interface SwipeableCarouselProps {
  slides: CarouselSlide[];
  aspectRatio?: string; // e.g. "aspect-[16/10]" or "aspect-[16/9]"
  className?: string;
  autoPlayInterval?: number;
}

export function SwipeableCarousel({
  slides,
  aspectRatio = "aspect-[16/10]",
  className,
  autoPlayInterval = 6000,
}: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStartX, setTouchStartX] = React.useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const total = slides.length;

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch event handlers for mobile/tablet swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchDeltaX(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.targetTouches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const onTouchEnd = () => {
    if (touchDeltaX < -45) {
      nextSlide();
    } else if (touchDeltaX > 45) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // Mouse drag handlers for desktop swipe emulation
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setTouchDeltaX(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null) return;
    setTouchDeltaX(e.clientX - touchStartX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    if (touchDeltaX < -45) {
      nextSlide();
    } else if (touchDeltaX > 45) {
      prevSlide();
    }
    setIsDragging(false);
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTouchStartX(null);
      setTouchDeltaX(0);
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden select-none bg-stone-900 group shadow-warm-lg border border-stone-200/90",
        className
      )}
    >
      {/* Slider Viewport */}
      <div
        className={cn("relative w-full cursor-grab active:cursor-grabbing overflow-hidden", aspectRatio)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={idx}
              className={cn(
                "absolute inset-0 transition-all duration-500 ease-out",
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto z-10"
                  : "opacity-0 scale-95 pointer-events-none z-0"
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />

              {/* Bottom Gradient Overlay for Captions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Slide Content Overlay */}
              {(slide.title || slide.caption || slide.badge) && (
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white space-y-1.5 z-20 pointer-events-none">
                  {slide.badge && (
                    <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-300/30">
                      {slide.badge}
                    </span>
                  )}
                  {slide.title && (
                    <h4 className="font-sans font-bold text-base sm:text-xl text-white leading-tight">
                      {slide.title}
                    </h4>
                  )}
                  {slide.caption && (
                    <p className="font-serif italic text-xs sm:text-sm text-stone-200 line-clamp-2">
                      &ldquo;{slide.caption}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Chevrons */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 size-9 sm:size-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer shadow-md"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Top-Right Slide Counter Pill */}
          <div className="absolute top-4 right-4 z-30 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white tracking-wider">
            {currentIndex + 1} / {total}
          </div>

          {/* Bottom Dot Indicators */}
          <div className="absolute bottom-3 right-5 z-30 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  idx === currentIndex
                    ? "w-6 bg-amber-400"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
