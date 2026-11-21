import { PageStatusGate } from "@/components/common/PageStatusGate";
import { EncounterView } from "./EncounterView";

export const dynamic = "force-dynamic";

export default function EncounterPage() {
  return (
    <PageStatusGate
      path="/pelayanan/encounter"
      fallbackTitle="Encounter (Mahasiswa Kampus)"
      fallbackCategory="Pelayanan Mahasiswa"
    >
      <EncounterView />
    </PageStatusGate>
  );
}
