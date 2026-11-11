"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-card/95 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              ESM Internal CMS &bull; Portal Pengelolaan
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
              AD
            </div>
            <div className="text-xs">
              <p className="font-bold text-foreground">Admin ESM</p>
              <p className="text-[10px] text-muted-foreground">admin@esm.or.id</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
