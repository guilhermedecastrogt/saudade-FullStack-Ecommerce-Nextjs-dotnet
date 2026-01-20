import { apiClient } from "@/shared/api/client";

export interface ApiCartItem {
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

export interface ApiCart {
  id: string;
  items: ApiCartItem[];
}

export interface AddCartItemPayload {
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

export const cartService = {
  createCart: async (cartId?: string | null) => {
    const response = await apiClient.post<ApiCart>(`/sales/carts${cartId ? `?cartId=${cartId}` : ""}`);
    return response.data;
  },
  getCart: async (cartId: string) => {
    const response = await apiClient.get<ApiCart>(`/sales/carts/${cartId}`);
    return response.data;
  },
  addItem: async (cartId: string, payload: AddCartItemPayload) => {
    const response = await apiClient.post<ApiCart>(`/sales/carts/${cartId}/items`, payload);
    return response.data;
  },
  updateItem: async (cartId: string, itemId: string, quantity: number) => {
    const response = await apiClient.put<ApiCart>(`/sales/carts/${cartId}/items/${itemId}`, { quantity });
    return response.data;
  },
  removeItem: async (cartId: string, itemId: string) => {
    const response = await apiClient.delete<ApiCart>(`/sales/carts/${cartId}/items/${itemId}`);
    return response.data;
  },
};
