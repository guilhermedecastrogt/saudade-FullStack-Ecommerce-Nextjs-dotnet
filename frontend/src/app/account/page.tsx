"use client";

import { useSessionStore } from "@/entities/session/session-store";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Package, User as UserIcon } from "lucide-react";
import { useOrders } from "@/features/orders/api/use-orders";

export default function AccountPage() {
  const { user, logout, isAuthenticated } = useSessionStore();
  const router = useRouter();
  const { data: orders } = useOrders(isAuthenticated);
  const statusLabels: Record<number, string> = {
    0: "Pending",
    1: "Paid",
    2: "Shipped",
    3: "Delivered",
    4: "Cancelled",
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <div className="py-12 md:py-20 bg-brand-cream min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-brand-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-teal">{user.name}</h3>
                  <p className="text-sm text-brand-charcoal/60">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Log Out
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <h1 className="font-montserrat font-bold text-3xl text-brand-teal">My Account</h1>
            
            <div className="space-y-6">
              <h2 className="font-montserrat font-bold text-xl text-brand-teal flex items-center gap-2">
                <Package className="w-5 h-5" /> Recent Orders
              </h2>
              
              <div className="bg-white p-6 rounded-sm shadow-sm border border-brand-teal/5">
                {orders && orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border-b border-brand-teal/10 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-brand-teal">Order #{order.orderNumber}</p>
                            <p className="text-sm text-brand-charcoal/60">
                              Placed on {new Date(order.createdAt).toLocaleDateString("en-IE")}
                            </p>
                          </div>
                          <span className="bg-brand-teal/10 text-brand-teal text-xs px-2 py-1 rounded-full font-medium">
                            {typeof order.status === "number" ? statusLabels[order.status] ?? "Pending" : order.status}
                          </span>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <div className="w-16 h-20 bg-brand-teal/5 rounded-sm overflow-hidden">
                                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium text-brand-teal">{item.productName}</p>
                                <p className="text-sm text-brand-charcoal/60">Qty: {item.quantity}</p>
                                <p className="font-medium">
                                  {new Intl.NumberFormat("en-IE", { style: "currency", currency: item.currency }).format(item.unitPrice)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-charcoal/60">No orders yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
