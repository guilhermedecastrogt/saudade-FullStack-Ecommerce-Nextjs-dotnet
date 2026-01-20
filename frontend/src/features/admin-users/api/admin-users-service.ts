import { apiClient } from "@/shared/api/client";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const adminUsersService = {
  list: async (page = 1, pageSize = 20) => {
    const response = await apiClient.get<AdminUser[]>(`/admin/users?page=${page}&pageSize=${pageSize}`);
    return response;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<AdminUser>(`/admin/users/${id}`);
    return response.data;
  },
};
