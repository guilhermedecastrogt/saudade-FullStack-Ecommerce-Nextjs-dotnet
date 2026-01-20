import { apiClient } from "@/shared/api/client";

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  categoryId: string;
  categoryName: string;
  sizes: string[];
  colors: string[];
  rating: number;
  inventory: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProductListParams {
  search?: string;
  category?: string;
  active?: boolean;
  page?: number;
  pageSize?: number;
}

export interface AdminProductPayload {
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  inventory: number;
  isNew: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  isActive: boolean;
  categoryId: string;
}

export const adminProductsService = {
  list: async (params: AdminProductListParams) => {
    const search = new URLSearchParams();
    if (params.search) search.append("search", params.search);
    if (params.category) search.append("category", params.category);
    if (params.active !== undefined) search.append("active", String(params.active));
    if (params.page) search.append("page", String(params.page));
    if (params.pageSize) search.append("pageSize", String(params.pageSize));
    const query = search.toString();
    const response = await apiClient.get<AdminProduct[]>(query ? `/admin/products?${query}` : "/admin/products");
    return response;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<AdminProduct>(`/admin/products/${id}`);
    return response.data;
  },
  create: async (payload: AdminProductPayload) => {
    const response = await apiClient.post<AdminProduct>("/admin/products", payload);
    return response.data;
  },
  update: async (id: string, payload: AdminProductPayload) => {
    const response = await apiClient.put<AdminProduct>(`/admin/products/${id}`, payload);
    return response.data;
  },
  updateActive: async (id: string, isActive: boolean) => {
    const response = await apiClient.patch<AdminProduct>(`/admin/products/${id}/active`, { isActive });
    return response.data;
  },
  updateStock: async (id: string, inventory: number) => {
    const response = await apiClient.patch<AdminProduct>(`/admin/products/${id}/stock`, { inventory });
    return response.data;
  },
};
