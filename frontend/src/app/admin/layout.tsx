"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminGuard } from "@/widgets/admin/admin-guard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminGuard>{children}</AdminGuard>;
}
