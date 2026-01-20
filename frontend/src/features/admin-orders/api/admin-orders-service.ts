import { apiClient } from "@/shared/api/client";

export interface AdminOrderItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  unitPrice: number;
  currency: string;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: number | string;
  createdAt: string;
  items: AdminOrderItem[];
}

export interface AdminOrdersParams {
  status?: string;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
}

export const adminOrdersService = {
  list: async (params: AdminOrdersParams) => {
    const search = new URLSearchParams();
    if (params.status) search.append("status", params.status);
    if (params.from) search.append("from", params.from);
    if (params.to) search.append("to", params.to);
    if (params.page) search.append("page", String(params.page));
    if (params.pageSize) search.append("pageSize", String(params.pageSize));
    const query = search.toString();
    const response = await apiClient.get<AdminOrder[]>(query ? `/admin/orders?${query}` : "/admin/orders");
    return response;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<AdminOrder>(`/admin/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: number) => {
    const response = await apiClient.patch<AdminOrder>(`/admin/orders/${id}/status`, { status });
    return response.data;
  },
};
