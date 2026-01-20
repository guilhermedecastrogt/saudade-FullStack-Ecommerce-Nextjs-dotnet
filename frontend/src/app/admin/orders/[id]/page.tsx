"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminOrdersService } from "@/features/admin-orders/api/admin-orders-service";
import { Button } from "@/shared/ui/button";

const STATUS_OPTIONS = [
  { label: "Pending", value: 0 },
  { label: "Paid", value: 1 },
  { label: "Shipped", value: 2 },
  { label: "Delivered", value: 3 },
  { label: "Cancelled", value: 4 },
];

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<Awaited<ReturnType<typeof adminOrdersService.getById>> | null>(null);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    adminOrdersService.getById(params.id).then((data) => {
      setOrder(data);
      setStatus(typeof data.status === "number" ? data.status : 0);
    });
  }, [params.id]);

  if (!order) {
    return <div className="text-brand-charcoal/60">Loading order...</div>;
  }

  const updateStatus = async () => {
    const updated = await adminOrdersService.updateStatus(order.id, status);
    setOrder(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Order #{order.orderNumber}</h1>
          <p className="text-sm text-brand-charcoal/70">{new Date(order.createdAt).toLocaleDateString("en-IE")}</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/orders")}>
          Back to Orders
        </Button>
      </div>

      <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-4">
        <h2 className="text-lg font-semibold text-brand-teal">Status</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border border-brand-teal/20 rounded-sm px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white" onClick={updateStatus}>
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-2">
          <h2 className="text-lg font-semibold text-brand-teal">Customer</h2>
          <div className="text-sm text-brand-charcoal/70">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
          <div className="text-sm text-brand-charcoal/70">{order.shippingAddress.email}</div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-2">
          <h2 className="text-lg font-semibold text-brand-teal">Shipping</h2>
          <div className="text-sm text-brand-charcoal/70">{order.shippingAddress.line1}</div>
          <div className="text-sm text-brand-charcoal/70">
            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
          </div>
          <div className="text-sm text-brand-charcoal/70">{order.shippingAddress.country}</div>
        </div>
        <div className="bg-white p-6 rounded-sm border border-brand-teal/10 space-y-2">
          <h2 className="text-lg font-semibold text-brand-teal">Totals</h2>
          <div className="text-sm text-brand-charcoal/70">Subtotal: {order.subtotal}</div>
          <div className="text-sm text-brand-charcoal/70">Shipping: {order.shipping}</div>
          <div className="text-sm font-semibold text-brand-teal">
            Total: {new Intl.NumberFormat("en-IE", { style: "currency", currency: order.currency }).format(order.total)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-brand-teal/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-brand-teal/5 text-brand-teal uppercase text-xs">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Variant</th>
              <th className="text-left px-4 py-3">Qty</th>
              <th className="text-left px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-t border-brand-teal/10">
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-teal">{item.productName}</div>
                  <div className="text-brand-charcoal/60">{item.productSlug}</div>
                </td>
                <td className="px-4 py-3">{item.size} / {item.color}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{new Intl.NumberFormat("en-IE", { style: "currency", currency: item.currency }).format(item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
