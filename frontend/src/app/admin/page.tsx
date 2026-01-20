"use client";

import { useAdminDashboard } from "@/features/admin-dashboard/api/use-admin-dashboard";
import { useAdminTimeseries } from "@/features/admin-dashboard/api/use-admin-timeseries";

export default function AdminDashboardPage() {
  const { data: summary } = useAdminDashboard();
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString();
  const to = now.toISOString();
  const { data: timeseries } = useAdminTimeseries(from, to, "day");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Dashboard Overview</h1>
        <p className="text-sm text-brand-charcoal/70">Track sales performance and operational status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-sm border border-brand-teal/10">
          <div className="text-xs uppercase text-brand-charcoal/60">Total Orders</div>
          <div className="text-2xl font-bold text-brand-teal">{summary?.totalOrders ?? 0}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-brand-teal/10">
          <div className="text-xs uppercase text-brand-charcoal/60">Revenue</div>
          <div className="text-2xl font-bold text-brand-teal">
            {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(summary?.totalRevenue ?? 0)}
          </div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-brand-teal/10">
          <div className="text-xs uppercase text-brand-charcoal/60">Pending Orders</div>
          <div className="text-2xl font-bold text-brand-teal">{summary?.pendingOrders ?? 0}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-brand-teal/10">
          <div className="text-xs uppercase text-brand-charcoal/60">Low Stock</div>
          <div className="text-2xl font-bold text-brand-teal">{summary?.lowStockProducts ?? 0}</div>
        </div>
        <div className="bg-white p-4 rounded-sm border border-brand-teal/10">
          <div className="text-xs uppercase text-brand-charcoal/60">Active Products</div>
          <div className="text-2xl font-bold text-brand-teal">{summary?.activeProducts ?? 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm border border-brand-teal/10 xl:col-span-2">
          <h2 className="text-lg font-semibold text-brand-teal mb-4">Orders Over Time</h2>
          <div className="flex items-end gap-2 h-48">
            {(timeseries ?? []).map((point) => (
              <div key={point.periodStart} className="flex-1 bg-brand-teal/20 rounded-sm" style={{ height: `${Math.max(4, point.orders * 6)}px` }} />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-brand-teal/10">
          <h2 className="text-lg font-semibold text-brand-teal mb-4">Recent Orders</h2>
          <div className="space-y-3 text-sm">
            {(summary?.recentOrders ?? []).map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-brand-teal/10 pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="font-semibold text-brand-teal">#{order.orderNumber}</div>
                  <div className="text-brand-charcoal/60">{new Date(order.createdAt).toLocaleDateString("en-IE")}</div>
                </div>
                <div className="font-semibold text-brand-teal">
                  {new Intl.NumberFormat("en-IE", { style: "currency", currency: order.currency }).format(order.total)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
