import { apiClient } from "@/shared/api/client";
import { AdminOrder } from "@/features/admin-orders/api/admin-orders-service";

export interface DashboardSummary {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
  activeProducts: number;
  recentOrders: AdminOrder[];
}

export interface OrdersTimeseriesPoint {
  periodStart: string;
  orders: number;
  revenue: number;
}

export const adminDashboardService = {
  getSummary: async () => {
    const response = await apiClient.get<DashboardSummary>("/admin/dashboard/summary");
    return response.data;
  },
  getTimeseries: async (from: string, to: string, bucket: "day" | "week") => {
    const params = new URLSearchParams({ from, to, bucket });
    const response = await apiClient.get<OrdersTimeseriesPoint[]>(`/admin/dashboard/orders-timeseries?${params.toString()}`);
    return response.data;
  },
};
