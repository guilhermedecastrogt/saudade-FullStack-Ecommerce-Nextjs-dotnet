import { apiClient } from "@/shared/api/client";

export interface OrderItemPayload {
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

export interface AddressPayload {
  firstName: string;
  lastName: string;
  email: string;
  line1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderDto {
  id: string;
  orderNumber: string;
  shippingAddress: AddressPayload;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: number | string;
  createdAt: string;
  items: Array<{
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
  }>;
}

export const orderService = {
  createOrder: async (payload: { shippingAddress: AddressPayload; items: OrderItemPayload[]; idempotencyKey?: string }) => {
    const response = await apiClient.post<OrderDto>("/sales/orders", payload);
    return response.data;
  },
  getOrders: async () => {
    const response = await apiClient.get<OrderDto[]>("/sales/orders");
    return response.data;
  },
};
