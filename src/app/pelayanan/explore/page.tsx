import { PageStatusGate } from "@/components/common/PageStatusGate";
import { ExploreView } from "./ExploreView";
import { getSiteConfig } from "@/actions/siteConfig";
import { defaultCommunities, CommunityDetail } from "@/lib/communityConfig";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const defaultExplore = defaultCommunities.find((c) => c.slug === "explore");
  let commData: CommunityDetail = defaultExplore!;

  try {
    const savedCommunities = await getSiteConfig<CommunityDetail[]>("pelayanan_communities", defaultCommunities);
    if (Array.isArray(savedCommunities)) {
      const found = savedCommunities.find((c) => c.slug === "explore");
      if (found) {
        commData = { ...defaultExplore, ...found };
      }
    }
  } catch (err) {
    console.warn("Failed to load dynamic explore community config:", err);
  }

  return (
    <PageStatusGate
      path="/pelayanan/explore"
      fallbackTitle="Explore (Siswa SMP-SMA)"
      fallbackCategory="Pelayanan Siswa"
    >
      <ExploreView initialData={commData} />
    </PageStatusGate>
  );
}
