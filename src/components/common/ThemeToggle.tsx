"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full border border-border/70 text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-8 rounded-full border border-border/70 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >
      {theme === "dark" ? (
        <Sun className="size-4 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-primary transition-transform hover:-rotate-12" />
      )}
    </Button>
  );
}
