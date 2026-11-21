import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ArtikelView } from "./ArtikelView";

export default function ArtikelPage() {
  return (
    <PageStatusGate
      path="/artikel"
      fallbackTitle="Warta Misi & Kabar Ladang"
      fallbackCategory="Kabar & Doa"
    >
      <ArtikelView />
    </PageStatusGate>
  );
}
