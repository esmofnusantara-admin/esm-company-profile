"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { getAdminSession } from "@/actions/auth";
import type { AdminSession } from "@/lib/adminSession";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [session, setSession] = useState<AdminSession | null>(null);

  useEffect(() => {
    if (!isLoginPage) {
      getAdminSession().then((s) => {
        if (s) setSession(s);
      });
    }
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const initials = session?.name
    ? session.name
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("") || "AD"
    : "AD";

  return (
    <div className="flex min-h-screen bg-canvas">
      <Suspense fallback={<aside className="sticky top-0 h-screen w-64 border-r border-border bg-card shrink-0" />}>
        <AdminSidebar />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-card/95 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              ESM Internal CMS &bull; Portal Pengelolaan
            </span>
            {session?.role && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {session.role.replace("_", " ")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
              {initials}
            </div>
            <div className="text-xs">
              <p className="font-bold text-foreground">
                {session?.name || "Admin ESM"}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {session?.email || "admin@esm.or.id"}
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
