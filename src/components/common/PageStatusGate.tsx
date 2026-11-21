import * as React from "react";
import { getSiteConfig } from "@/actions/siteConfig";
import { DEFAULT_PAGE_STATUSES, PageStatusItem } from "@/lib/pageStatusConfig";
import { ComingSoonView } from "./ComingSoonView";

interface PageStatusGateProps {
  path: string;
  fallbackTitle?: string;
  fallbackCategory?: string;
  children: React.ReactNode;
}

export async function PageStatusGate({
  path,
  fallbackTitle = "Halaman",
  fallbackCategory = "Pelayanan & Materi",
  children,
}: PageStatusGateProps) {
  const pageStatuses = await getSiteConfig<PageStatusItem[]>(
    "site_page_statuses",
    DEFAULT_PAGE_STATUSES
  );

  const matched = pageStatuses.find(
    (p) => p.path === path || (path && path.startsWith(p.path) && p.path !== "/")
  );

  if (matched && matched.status === "COMING_SOON") {
    return (
      <ComingSoonView
        pageTitle={matched.title || fallbackTitle}
        pageTitleEn={matched.titleEn}
        category={matched.category || fallbackCategory}
        customMessage={matched.customMessage}
        customMessageEn={matched.customMessageEn}
      />
    );
  }

  return <>{children}</>;
}
