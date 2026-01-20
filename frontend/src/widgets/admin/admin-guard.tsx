"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminSessionStore } from "@/entities/admin-session/admin-session-store";
import { AdminShell } from "./admin-shell";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, logout, hasHydrated } = useAdminSessionStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [hasHydrated, isAuthenticated, router]);

  useEffect(() => {
    const handler = () => {
      logout();
      router.push("/admin/login");
    };
    window.addEventListener("admin-unauthorized", handler);
    return () => window.removeEventListener("admin-unauthorized", handler);
  }, [logout, router]);

  if (!hasHydrated || !isAuthenticated) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
