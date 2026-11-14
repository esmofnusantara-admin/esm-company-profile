"use client";

import * as React from "react";
import { MessageCircle, Phone, Lock, Eye, ExternalLink } from "lucide-react";

interface MaskedWhatsAppLinkProps {
  phone: string;
  text?: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  variant?: "pill" | "text" | "button" | "badge";
  children?: React.ReactNode;
}

/**
 * Sensor nomor telepon: contoh +62 812-9610-6611 menjadi +62 812-••••-6611
 */
export function maskPhoneNumber(phoneStr: string): string {
  if (!phoneStr) return "+62 812-••••-6611";

  const digits = phoneStr.replace(/[^0-9]/g, "");
  if (digits.length >= 9) {
    const last4 = digits.slice(-4);
    if (digits.startsWith("62")) {
      const provider = digits.slice(2, 5);
      return `+62 ${provider}-••••-${last4}`;
    } else if (digits.startsWith("0")) {
      const provider = digits.slice(1, 4);
      return `0${provider}-••••-${last4}`;
    } else {
      const prefix = digits.slice(0, 3);
      return `${prefix}-••••-${last4}`;
    }
  }

  return "+62 812-••••-6611";
}

export function cleanPhoneForUrl(phoneStr: string): string {
  let cleaned = (phoneStr || "6281296106611").replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  }
  return cleaned;
}

export function MaskedWhatsAppLink({
  phone,
  text,
  label,
  className = "",
  iconClassName = "size-3.5",
  showIcon = true,
  variant = "pill",
  children,
}: MaskedWhatsAppLinkProps) {
  const [isRevealed, setIsRevealed] = React.useState(false);
  const cleanNumber = cleanPhoneForUrl(phone);
  const maskedNumber = maskPhoneNumber(phone);
  const displayText = isRevealed ? phone : maskedNumber;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRevealed(true);

    const waUrl = `https://wa.me/${cleanNumber}${
      text ? `?text=${encodeURIComponent(text)}` : ""
    }`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all shadow-warm-xs group cursor-pointer ${className}`}
        title="Klik untuk membuka WhatsApp resmi"
      >
        {showIcon && <MessageCircle className={iconClassName} />}
        <span>{children || (label ? `${label} ${displayText}` : displayText)}</span>
        {!isRevealed ? (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-current font-normal opacity-90">
            Klik Buka WA
          </span>
        ) : (
          <ExternalLink className="size-3" />
        )}
      </button>
    );
  }

  if (variant === "badge") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${className}`}
        title="Klik untuk melihat nomor dan chat WhatsApp"
      >
        {showIcon && <MessageCircle className={iconClassName} />}
        <span>{label}</span>
        <span className="font-mono font-bold">{displayText}</span>
        {!isRevealed && <Lock className="size-2.5 opacity-60 ml-0.5" />}
      </button>
    );
  }

  // Variant "pill" atau "text"
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer group text-left ${className}`}
      title="Klik untuk membuka WhatsApp"
    >
      {showIcon && (
        <span className="shrink-0">
          <Phone className={iconClassName} />
        </span>
      )}
      {label && <span className="font-medium">{label} </span>}
      <span className="font-mono font-bold tracking-tight group-hover:underline">
        {displayText}
      </span>
      {!isRevealed ? (
        <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 font-sans font-medium">
          <Lock className="size-2.5" />
          <span>Klik WA</span>
        </span>
      ) : (
        <ExternalLink className="size-3 text-emerald-600" />
      )}
    </button>
  );
}
