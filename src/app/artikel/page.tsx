import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ArtikelView } from "./ArtikelView";

export const dynamic = "force-dynamic";

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
