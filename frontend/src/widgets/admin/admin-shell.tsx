import Link from "next/link";
import { ReactNode } from "react";
import { useAdminSessionStore } from "@/entities/admin-session/admin-session-store";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAdminSessionStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="flex">
        <aside className="hidden md:flex w-64 flex-col border-r border-brand-teal/10 bg-white min-h-screen">
          <div className="px-6 py-6 text-brand-teal font-montserrat font-bold text-lg">Saudade Admin</div>
          <nav className="flex-1 px-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="block px-4 py-2 rounded-sm text-sm font-medium text-brand-teal hover:bg-brand-teal/5">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-6 border-t border-brand-teal/10">
            <div className="text-sm text-brand-charcoal/70">{user?.email}</div>
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
            >
              Log out
            </Button>
          </div>
        </aside>

        <main className="flex-1 min-h-screen">
          <div className="md:hidden px-6 py-4 bg-white border-b border-brand-teal/10 flex items-center justify-between">
            <span className="text-brand-teal font-montserrat font-semibold">Saudade Admin</span>
            <Button
              variant="outline"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
            >
              Log out
            </Button>
          </div>
          <div className="p-6 md:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
