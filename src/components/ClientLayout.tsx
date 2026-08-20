"use client";

import AuthGuard from "@/components/AuthGuard";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MarketTicker } from "@/components/MarketTicker";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <AuthGuard>
      {isLoginPage ? (
        <>{children}</>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <TopBar />
            <MarketTicker />
            <main className="flex-1 overflow-y-auto p-6 animate-fade-in-up">
              {children}
            </main>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
