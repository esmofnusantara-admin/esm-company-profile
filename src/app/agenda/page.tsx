import { Suspense } from "react";
import { AgendaView } from "@/components/agenda/AgendaView";

export default function AgendaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <AgendaView />
    </Suspense>
  );
}
