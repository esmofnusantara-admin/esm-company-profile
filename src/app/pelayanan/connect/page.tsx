import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ConnectView } from "./ConnectView";

export const dynamic = "force-dynamic";

export default function ConnectPage() {
  return (
    <PageStatusGate
      path="/pelayanan/connect"
      fallbackTitle="Connect (Alumni & Profesional)"
      fallbackCategory="Pelayanan Alumni"
    >
      <ConnectView />
    </PageStatusGate>
  );
}
