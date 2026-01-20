"use client";

import { useAdminSessionStore } from "@/entities/admin-session/admin-session-store";

export default function AdminSettingsPage() {
  const { user } = useAdminSessionStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Settings</h1>
        <p className="text-sm text-brand-charcoal/70">Manage your admin profile.</p>
      </div>

      <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-2">
        <div className="text-sm text-brand-charcoal/70">Name</div>
        <div className="text-lg font-semibold text-brand-teal">{user?.name ?? "Admin"}</div>
        <div className="text-sm text-brand-charcoal/70">Email</div>
        <div className="text-lg font-semibold text-brand-teal">{user?.email ?? "admin@saudade.local"}</div>
      </div>
    </div>
  );
}
