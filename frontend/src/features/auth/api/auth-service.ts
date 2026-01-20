import { apiClient } from "@/shared/api/client";

export interface UserDto {
  id: string;
  name: string;
  email: string;
}

export const authService = {
  register: async (payload: { name: string; email: string; password: string }) => {
    const response = await apiClient.post<UserDto>("/identity/register", payload);
    return response.data;
  },
  login: async (payload: { email: string; password: string }) => {
    try {
      const response = await apiClient.post<UserDto>("/identity/login", payload);
      return response.data;
    } catch {
      return null;
    }
  },
};
