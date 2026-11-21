import { PageStatusGate } from "@/components/common/PageStatusGate";
import { KemitraanView } from "./KemitraanView";

export const dynamic = "force-dynamic";

export default function KemitraanPage() {
  return (
    <PageStatusGate
      path="/kemitraan"
      fallbackTitle="Dukungan & Kemitraan Misi"
      fallbackCategory="Tentang & Lainnya"
    >
      <KemitraanView />
    </PageStatusGate>
  );
}
