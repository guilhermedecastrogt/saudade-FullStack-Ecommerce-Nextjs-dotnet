"use client";

import Link from "next/link";
import { useState } from "react";
import { useAdminOrders } from "@/features/admin-orders/api/use-admin-orders";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "Paid", value: "Paid" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function AdminOrdersPage() {
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data: ordersResponse } = useAdminOrders({
    status: status || undefined,
    from: from || undefined,
    to: to || undefined,
    page: 1,
    pageSize: 50,
  });

  const orders = ordersResponse?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Orders</h1>
        <p className="text-sm text-brand-charcoal/70">Track and update customer orders.</p>
      </div>

      <div className="bg-white p-4 rounded-sm border border-brand-teal/10 flex flex-wrap gap-4 items-end">
        <div className="space-y-1">
          <label className="text-xs text-brand-charcoal/60">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-brand-teal/20 rounded-sm px-3 py-2 text-sm">
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-brand-charcoal/60">From</label>
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-brand-charcoal/60">To</label>
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <Button variant="outline" onClick={() => { setFrom(""); setTo(""); setStatus(""); }}>
          Reset
        </Button>
      </div>

      <div className="bg-white rounded-sm border border-brand-teal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-teal/5 text-brand-teal uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-right px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-brand-teal/10">
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-teal">#{order.orderNumber}</div>
                  <div className="text-brand-charcoal/60">{new Date(order.createdAt).toLocaleDateString("en-IE")}</div>
                </td>
                <td className="px-4 py-3">{order.shippingAddress.email}</td>
                <td className="px-4 py-3">{typeof order.status === "number" ? STATUS_OPTIONS[order.status + 1]?.label ?? "Pending" : order.status}</td>
                <td className="px-4 py-3">
                  {new Intl.NumberFormat("en-IE", { style: "currency", currency: order.currency }).format(order.total)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/orders/${order.id}`} className="text-brand-gold hover:text-brand-teal">
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-brand-charcoal/60">
                  No orders found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
