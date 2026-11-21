import { PageStatusGate } from "@/components/common/PageStatusGate";
import { RenunganView } from "./RenunganView";

export default function RenunganPage() {
  return (
    <PageStatusGate
      path="/renungan"
      fallbackTitle="Renungan & Saat Teduh"
      fallbackCategory="Kabar & Doa"
    >
      <RenunganView />
    </PageStatusGate>
  );
}
