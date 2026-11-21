import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ExploreView } from "./ExploreView";

export const dynamic = "force-dynamic";

export default function ExplorePage() {
  return (
    <PageStatusGate
      path="/pelayanan/explore"
      fallbackTitle="Explore (Siswa SMP-SMA)"
      fallbackCategory="Pelayanan Siswa"
    >
      <ExploreView />
    </PageStatusGate>
  );
}
