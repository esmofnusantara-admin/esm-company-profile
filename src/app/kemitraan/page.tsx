"use client";

import * as React from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  HandCoins,
  Users2,
  Copy,
  Check,
  Send,
  Building2,
  Phone,
  Mail,
  QrCode,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitDonation } from "@/actions/donation";

export default function KemitraanPage() {
  const { t, locale } = useLanguage();
  const k = t.partnershipPage;

  const [copied, setCopied] = React.useState(false);
  const [donationType, setDonationType] = React.useState<"SEKALI_BERI" | "MITRA_BULANAN">("MITRA_BULANAN");
  const [selectedNominal, setSelectedNominal] = React.useState("100.000");
  const [customNominal, setCustomNominal] = React.useState("");

  // Form states
  const [donorName, setDonorName] = React.useState("");
  const [donorPhone, setDonorPhone] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Dynamic CMS Data
  const [kemitraanData, setKemitraanData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch("/api/content?section=kemitraan")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setKemitraanData(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const bank = kemitraanData?.bank;
  const prayers = kemitraanData?.prayers;
  const settings = kemitraanData?.settings;

  const bankAccount = bank?.accountNumber || "8420-991-888";
  const bankName = bank?.bankName || "Bank Central Asia (BCA)";
  const accountName = bank?.accountHolder || "Yayasan Evangelical Student Movement";
  const qrisUrl = bank?.qrisUrl || null;
  const waContact = bank?.waConfirmNumber || settings?.phone?.replace(/[^0-9]/g, "") || "6281296106611";

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const rawNominal = customNominal
      ? customNominal.replace(/[^0-9]/g, "")
      : selectedNominal.replace(/[^0-9]/g, "");
    const amount = parseInt(rawNominal, 10);

    if (!amount || amount < 10000) {
      setErrorMessage(locale === "en" ? "Minimum donation amount is Rp 10.000" : "Nominal donasi minimal Rp 10.000");
      setIsSubmitting(false);
      return;
    }

    const res = await submitDonation({
      donorName,
      donorPhone,
      donorEmail,
      amount,
      type: donationType,
      message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitSuccess(true);
      setDonorName("");
      setDonorPhone("");
      setDonorEmail("");
      setMessage("");
    } else {
      setErrorMessage(res.error || "Gagal mengirim komitmen donasi");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-[#241416] via-[#3D1C22] to-[#1E1012] text-white py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <Badge variant="amber" className="text-xs">{k.badge}</Badge>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight">
              {k.title}
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed font-serif italic">
              &ldquo;{k.quote}&rdquo;
            </p>
          </div>
        </section>

        {/* 3 Pillars of Partnership */}
        <section className="py-16 bg-canvas">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Doa */}
              <Card className="p-6 space-y-4 hover:border-primary/40 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <Heart className="size-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{k.p1Number}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{k.p1Title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {k.p1Desc}
                </p>
                <Button variant="outline" size="sm" asChild className="w-full rounded-xl text-xs">
                  <a href="#doa">{k.p1Btn}</a>
                </Button>
              </Card>

              {/* Finansial */}
              <Card className="p-6 space-y-4 hover:border-accent/60 transition-colors shadow-warm-sm border-accent/40 bg-card">
                <div className="size-12 rounded-2xl bg-accent-50 text-accent flex items-center justify-center font-bold">
                  <HandCoins className="size-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{k.p2Number}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{k.p2Title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {k.p2Desc}
                </p>
                <Button variant="amber" size="sm" asChild className="w-full rounded-xl text-xs">
                  <a href="#donasi">{k.p2Btn}</a>
                </Button>
              </Card>

              {/* Partisipasi / Relawan */}
              <Card className="p-6 space-y-4 hover:border-primary/40 transition-colors shadow-warm-sm">
                <div className="size-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center font-bold">
                  <Users2 className="size-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{k.p3Number}</span>
                  <h3 className="text-xl font-bold text-foreground mt-1">{k.p3Title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {k.p3Desc}
                </p>
                <Button variant="outline" size="sm" asChild className="w-full rounded-xl text-xs">
                  <a href="#kontak">{k.p3Btn}</a>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Form Donasi & Rekening Bank */}
        <section id="donasi" className="py-20 bg-card border-y border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{k.donationKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {k.donationTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                {k.donationSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input */}
              <div className="lg:col-span-7 rounded-2xl border border-border bg-canvas p-6 sm:p-8 space-y-6 shadow-warm-sm">
                {submitSuccess ? (
                  <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-4">
                    <div className="size-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                      <Check className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-900">
                      {locale === "en" ? "Thank You for Your Commitment!" : "Terima Kasih atas Komitmen Anda!"}
                    </h3>
                    <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                      {locale === "en"
                        ? "Your partnership commitment has been recorded in our system. May God bless your generosity as we labor together for student discipleship across Indonesia."
                        : "Komitmen kemitraan Anda telah tercatat langsung di sistem database ESM. Kiranya Tuhan memberkati kesetiaan Anda dalam memajukan pemuridan siswa dan mahasiswa di pelosok Nusantara."}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setSubmitSuccess(false)}
                        className="rounded-xl text-xs bg-white text-emerald-800 border-emerald-300"
                      >
                        {locale === "en" ? "Submit Another Commitment" : "Kirim Komitmen Lainnya"}
                      </Button>
                      <Button asChild size="sm" className="rounded-xl text-xs bg-emerald-700 hover:bg-emerald-800 text-white">
                        <a
                          href={`https://wa.me/${waContact}?text=${encodeURIComponent(
                            `Halo Admin ESM, saya ingin konfirmasi komitmen donasi kemitraan misi.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Phone className="size-3.5 mr-1" />
                          <span>Konfirmasi via WhatsApp</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                        {errorMessage}
                      </div>
                    )}

                    {/* Tipe Donasi Tabs */}
                    <div className="flex rounded-xl bg-card p-1 border border-border">
                      <button
                        type="button"
                        onClick={() => setDonationType("MITRA_BULANAN")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                          donationType === "MITRA_BULANAN"
                            ? "bg-primary text-white shadow-warm-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {k.monthlyTab}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("SEKALI_BERI")}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                          donationType === "SEKALI_BERI"
                            ? "bg-primary text-white shadow-warm-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {k.oneTimeTab}
                      </button>
                    </div>

                    {/* Preset Nominal */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground">{k.amountLabel}</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {["50.000", "100.000", "250.000", "500.000", "1.000.000"].map((nom) => (
                          <button
                            key={nom}
                            type="button"
                            onClick={() => {
                              setSelectedNominal(nom);
                              setCustomNominal("");
                            }}
                            className={`rounded-xl border py-2.5 text-xs font-bold transition-all ${
                              selectedNominal === nom && !customNominal
                                ? "border-primary bg-primary text-white shadow-warm-xs"
                                : "border-border bg-card text-foreground hover:border-primary/40"
                            }`}
                          >
                            Rp {nom}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <label className="text-xs text-muted-foreground block mb-1">
                          {locale === "en" ? "Or enter other amount (IDR):" : "Atau masukkan nominal lainnya (Rp):"}
                        </label>
                        <input
                          type="text"
                          value={customNominal}
                          onChange={(e) => {
                            setCustomNominal(e.target.value);
                            setSelectedNominal("");
                          }}
                          placeholder="Rp 0"
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Identitas Donatur */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">{k.nameLabel} *</label>
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Nama Lengkap / Inisial"
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-foreground block mb-1">{k.phoneLabel} *</label>
                          <input
                            type="tel"
                            required
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-foreground block mb-1">{k.emailLabel}</label>
                          <input
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-foreground block mb-1">{k.messageLabel}</label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={k.messagePlaceholder}
                          className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full justify-center rounded-xl font-bold text-xs py-3 shadow-warm-sm"
                      >
                        {isSubmitting ? (
                          <span>{locale === "en" ? "Submitting..." : "Menyimpan Komitmen..."}</span>
                        ) : (
                          <>
                            <Send className="size-3.5 mr-2" />
                            <span>{k.submitBtn}</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Bank Transfer Info & QRIS Card */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-6 border-border bg-canvas-subtle space-y-4 shadow-warm-sm">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Building2 className="size-4" />
                    <span>{k.bankTitle}</span>
                  </div>

                  <div className="space-y-1 rounded-xl bg-card p-4 border border-border">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      {bankName}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xl font-extrabold text-foreground tracking-wider">
                        {bankAccount}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 rounded-lg text-xs"
                      >
                        {copied ? (
                          <>
                            <Check className="size-3.5 text-emerald-600 mr-1" />
                            <span className="text-emerald-600">{t.common.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5 mr-1" />
                            <span>{t.common.copy}</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground block pt-1">
                      a.n. <strong>{accountName}</strong>
                    </span>
                  </div>

                  {/* QRIS Display */}
                  <div className="rounded-xl border border-border bg-card p-4 space-y-3 text-center">
                    {qrisUrl ? (
                      <div className="size-48 mx-auto rounded-xl border border-border bg-white flex items-center justify-center p-2 relative overflow-hidden">
                        <Image src={qrisUrl} alt="Barcode QRIS ESM" fill className="object-contain p-1" />
                      </div>
                    ) : (
                      <div className="size-28 mx-auto rounded-xl border border-border bg-white flex items-center justify-center p-2">
                        <QrCode className="size-24 text-foreground/80" />
                      </div>
                    )}
                    <p className="text-[11px] text-muted-foreground">
                      {k.qrisNote}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>{k.securityNote}</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* POKOK DOA SECTION (Dynamic from Database) */}
        <section id="doa" className="py-20 bg-canvas">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{k.prayerKicker}</span>
              <h2 className="font-sans text-3xl font-extrabold text-foreground">
                {k.prayerTitle}
              </h2>
              <p className="text-xs text-muted-foreground max-w-xl mx-auto">
                {k.prayerSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {prayers && Array.isArray(prayers) && prayers.length > 0 ? (
                prayers.map((pr: any) => {
                  const title = locale === "en" ? pr.titleEn || pr.title : pr.title;
                  const desc = locale === "en" ? pr.descriptionEn || pr.description : pr.description;
                  return (
                    <Card key={pr.id} className="p-5 space-y-2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{pr.category}</span>
                          {pr.isAnswered && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                              <CheckCircle className="size-3" /> Terjawab
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-foreground">{title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground/60 pt-2 block border-t border-border/50">
                        Periode: {pr.month}
                      </span>
                    </Card>
                  );
                })
              ) : (
                <>
                  <Card className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{k.pr1Tag}</span>
                    <h4 className="font-bold text-sm text-foreground">{k.pr1Title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {k.pr1Desc}
                    </p>
                  </Card>

                  <Card className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-accent tracking-wider">{k.pr2Tag}</span>
                    <h4 className="font-bold text-sm text-foreground">{k.pr2Title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {k.pr2Desc}
                    </p>
                  </Card>

                  <Card className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{k.pr3Tag}</span>
                    <h4 className="font-bold text-sm text-foreground">{k.pr3Title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {k.pr3Desc}
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* KONTAK HUB */}
        <section id="kontak" className="py-16 bg-card border-t border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="font-sans text-2xl font-bold text-foreground">
              {k.contactTitle}
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {k.contactSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="default" className="rounded-full shadow-warm-sm">
                <a href={`https://wa.me/${waContact}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="size-4 mr-1.5" />
                  <span>WhatsApp (+{waContact})</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="default" className="rounded-full">
                <a href={`mailto:${settings?.email || "halo@esm.or.id"}`}>
                  <Mail className="size-4 mr-1.5" />
                  <span>{settings?.email || "halo@esm.or.id"}</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
