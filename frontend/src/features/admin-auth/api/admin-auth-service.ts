import { apiClient } from "@/shared/api/client";
import { AdminUser } from "@/entities/admin-session/admin-session-store";

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
}

export const adminAuthService = {
  login: async (payload: { email: string; password: string }) => {
    const response = await apiClient.post<AdminAuthResponse>("/admin/auth/login", payload);
    return response.data;
  },
  me: async () => {
    const response = await apiClient.get<AdminUser>("/admin/me");
    return response.data;
  },
};
