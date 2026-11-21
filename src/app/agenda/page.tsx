import { Suspense } from "react";
import { AgendaView } from "@/components/agenda/AgendaView";
import { PageStatusGate } from "@/components/common/PageStatusGate";

export default function AgendaPage() {
  return (
    <PageStatusGate
      path="/agenda"
      fallbackTitle="Agenda & Jadwal Kegiatan"
      fallbackCategory="Kabar & Doa"
    >
      <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
        <AgendaView />
      </Suspense>
    </PageStatusGate>
  );
}
