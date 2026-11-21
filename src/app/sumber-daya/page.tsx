import { PageStatusGate } from "@/components/common/PageStatusGate";
import { SumberDayaView } from "./SumberDayaView";

export default function SumberDayaPage() {
  return (
    <PageStatusGate
      path="/sumber-daya"
      fallbackTitle="Bahan Ajar & Panduan KTB"
      fallbackCategory="Kabar & Doa"
    >
      <SumberDayaView />
    </PageStatusGate>
  );
}
