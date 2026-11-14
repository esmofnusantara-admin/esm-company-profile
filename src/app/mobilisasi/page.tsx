import { Suspense } from "react";
import { AgendaView } from "@/components/agenda/AgendaView";

export default function MobilisasiPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <AgendaView />
    </Suspense>
  );
}
