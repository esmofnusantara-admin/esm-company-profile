import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESM — Evangelical Student Movement Indonesia",
  description:
    "Gerakan kemuridan misional interdenominasi untuk siswa, mahasiswa, dan alumni bagi transformasi bumi Nusantara.",
  keywords: [
    "ESM",
    "Evangelical Student Movement",
    "Pemuridan",
    "Misi",
    "Mahasiswa Kristen",
    "Siswa Kristen",
    "Banten",
    "Ternate",
  ],
  icons: {
    icon: "/logo-esm.png",
    shortcut: "/logo-esm.png",
    apple: "/logo-esm.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="esm-theme">
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
