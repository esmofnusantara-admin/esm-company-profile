import { PageStatusGate } from "@/components/common/PageStatusGate";
import { DoaView } from "./DoaView";

export default function DoaPage() {
  return (
    <PageStatusGate
      path="/doa"
      fallbackTitle="Pokok Doa & Mezbah Syafaat"
      fallbackCategory="Kabar & Doa"
    >
      <DoaView />
    </PageStatusGate>
  );
}
