"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ComingSoonView } from "./ComingSoonView";
import { DEFAULT_PAGE_STATUSES, PageStatusItem } from "@/lib/pageStatusConfig";

interface PageStatusGateProps {
  path?: string;
  fallbackTitle?: string;
  fallbackCategory?: string;
  children: React.ReactNode;
}

export function PageStatusGate({
  path,
  fallbackTitle = "Halaman",
  fallbackCategory = "Pelayanan & Materi",
  children,
}: PageStatusGateProps) {
  const currentPath = usePathname();
  const targetPath = path || currentPath;

  const [pageStatuses, setPageStatuses] = React.useState<PageStatusItem[]>(DEFAULT_PAGE_STATUSES);
  const [hasChecked, setHasChecked] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/content?section=page_status");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && !cancelled) {
          setPageStatuses(json.data);
        }
      } catch {
        // Fallback to DEFAULT_PAGE_STATUSES
      } finally {
        if (!cancelled) setHasChecked(true);
      }
    };
    fetchStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  const matched = pageStatuses.find(
    (p) => p.path === targetPath || (targetPath && targetPath.startsWith(p.path) && p.path !== "/")
  );

  if (hasChecked && matched && matched.status === "COMING_SOON") {
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
