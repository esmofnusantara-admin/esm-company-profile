import { PageStatusGate } from "@/components/common/PageStatusGate";
import { EncounterView } from "./EncounterView";
import { getSiteConfig } from "@/actions/siteConfig";
import { defaultCommunities, CommunityDetail } from "@/lib/communityConfig";

export const dynamic = "force-dynamic";

export default async function EncounterPage() {
  const defaultEncounter = defaultCommunities.find((c) => c.slug === "encounter");
  let commData: CommunityDetail = defaultEncounter!;

  try {
    const savedCommunities = await getSiteConfig<CommunityDetail[]>("pelayanan_communities", defaultCommunities);
    if (Array.isArray(savedCommunities)) {
      const found = savedCommunities.find((c) => c.slug === "encounter");
      if (found) {
        commData = { ...defaultEncounter, ...found };
      }
    }
  } catch (err) {
    console.warn("Failed to load dynamic encounter community config:", err);
  }

  return (
    <PageStatusGate
      path="/pelayanan/encounter"
      fallbackTitle="Encounter (Mahasiswa Kampus)"
      fallbackCategory="Pelayanan Mahasiswa"
    >
      <EncounterView initialData={commData} />
    </PageStatusGate>
  );
}
