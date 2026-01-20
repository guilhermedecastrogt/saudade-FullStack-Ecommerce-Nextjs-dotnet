import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAccessToken } from "@/shared/api/token-store";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface AdminSessionState {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

export const useAdminSessionStore = create<AdminSessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (token, user) => {
        setAccessToken(token);
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        setAccessToken(null);
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "saudade-admin-session",
      onRehydrateStorage: () => (state) => {
        setAccessToken(state?.token ?? null);
      },
    }
  )
);
