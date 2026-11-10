"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  const n = t.notFoundPage;

  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        {/* Sheep / Shepherd Themed Visual Badge */}
        <div className="size-24 mx-auto rounded-3xl bg-primary-50 text-primary flex items-center justify-center shadow-warm-md border border-primary/20">
          <span className="text-4xl" role="img" aria-label="Domba">
            🐑
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {n.kicker}
          </span>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {n.title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {n.desc}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="default" className="w-full sm:w-auto rounded-xl shadow-warm-sm">
            <Link href="/">
              <Home className="size-4 mr-1.5" />
              <span>{n.homeBtn}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="default" className="w-full sm:w-auto rounded-xl">
            <Link href="/pelayanan">
              <Compass className="size-4 mr-1.5" />
              <span>{n.ministryBtn}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
