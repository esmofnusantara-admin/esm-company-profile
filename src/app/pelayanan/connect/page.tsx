import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ConnectView } from "./ConnectView";
import { getSiteConfig } from "@/actions/siteConfig";
import { defaultCommunities, CommunityDetail } from "@/lib/communityConfig";

export const dynamic = "force-dynamic";

export default async function ConnectPage() {
  const defaultConnect = defaultCommunities.find((c) => c.slug === "connect");
  let commData: CommunityDetail = defaultConnect!;

  try {
    const savedCommunities = await getSiteConfig<CommunityDetail[]>("pelayanan_communities", defaultCommunities);
    if (Array.isArray(savedCommunities)) {
      const found = savedCommunities.find((c) => c.slug === "connect");
      if (found) {
        commData = { ...defaultConnect, ...found };
      }
    }
  } catch (err) {
    console.warn("Failed to load dynamic connect community config:", err);
  }

  return (
    <PageStatusGate
      path="/pelayanan/connect"
      fallbackTitle="Connect (Alumni & Profesional)"
      fallbackCategory="Pelayanan Alumni"
    >
      <ConnectView initialData={commData} />
    </PageStatusGate>
  );
}
