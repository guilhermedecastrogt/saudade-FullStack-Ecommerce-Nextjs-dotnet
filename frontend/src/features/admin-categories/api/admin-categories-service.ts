import { apiClient } from "@/shared/api/client";

export interface AdminCategory {
  id: string;
  slug: string;
  name: string;
  isActive: boolean;
}

export const adminCategoriesService = {
  list: async (active?: boolean) => {
    const query = active === undefined ? "" : `?active=${active}`;
    const response = await apiClient.get<AdminCategory[]>(`/admin/categories${query}`);
    return response.data;
  },
  create: async (payload: { slug: string; name: string; isActive: boolean }) => {
    const response = await apiClient.post<AdminCategory>("/admin/categories", payload);
    return response.data;
  },
  update: async (id: string, payload: { slug: string; name: string; isActive: boolean }) => {
    const response = await apiClient.put<AdminCategory>(`/admin/categories/${id}`, payload);
    return response.data;
  },
  updateActive: async (id: string, isActive: boolean) => {
    const response = await apiClient.patch<AdminCategory>(`/admin/categories/${id}/active`, { isActive });
    return response.data;
  },
};
