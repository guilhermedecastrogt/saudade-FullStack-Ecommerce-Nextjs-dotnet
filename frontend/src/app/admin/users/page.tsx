"use client";

import { useAdminUsers } from "@/features/admin-users/api/use-admin-users";

export default function AdminUsersPage() {
  const { data: usersResponse } = useAdminUsers();
  const users = usersResponse?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Users</h1>
        <p className="text-sm text-brand-charcoal/70">Review customer and staff accounts.</p>
      </div>

      <div className="bg-white rounded-sm border border-brand-teal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-teal/5 text-brand-teal uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-brand-teal/10">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3 text-brand-charcoal/70">{user.email}</td>
                <td className="px-4 py-3">{user.roles.join(", ")}</td>
              </tr>
            ))}
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-brand-charcoal/60">
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
