"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: { title: string; description?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ title, description, type = "info", duration = 4000 }: { title: string; description?: string; type?: ToastType; duration?: number }) => {
      const id = "toast-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
      setToasts((prev) => [...prev, { id, title, description, type, duration }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const success = React.useCallback(
    (title: string, description?: string) => toast({ title, description, type: "success" }),
    [toast]
  );

  const error = React.useCallback(
    (title: string, description?: string) => toast({ title, description, type: "error" }),
    [toast]
  );

  const info = React.useCallback(
    (title: string, description?: string) => toast({ title, description, type: "info" }),
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      {/* Toast Viewport */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto rounded-2xl border p-4 shadow-warm-lg backdrop-blur-md flex items-start justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 transition-all",
              t.type === "success" && "bg-white border-emerald-200 text-stone-900",
              t.type === "error" && "bg-white border-red-200 text-stone-900",
              t.type === "info" && "bg-white border-primary/20 text-stone-900"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "size-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                  t.type === "success" && "bg-emerald-100 text-emerald-700",
                  t.type === "error" && "bg-red-100 text-red-700",
                  t.type === "info" && "bg-primary-50 text-primary"
                )}
              >
                {t.type === "success" && <CheckCircle2 className="size-4" />}
                {t.type === "error" && <AlertCircle className="size-4" />}
                {t.type === "info" && <Info className="size-4" />}
              </div>
              <div className="space-y-0.5">
                <h5 className="font-bold text-xs sm:text-sm text-foreground">{t.title}</h5>
                {t.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-lg"
              aria-label="Tutup notifikasi"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
    };
  }
  return ctx;
}
