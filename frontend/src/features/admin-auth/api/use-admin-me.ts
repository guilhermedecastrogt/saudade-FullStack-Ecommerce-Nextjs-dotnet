import { useQuery } from "@tanstack/react-query";
import { adminAuthService } from "./admin-auth-service";

export function useAdminMe(enabled: boolean) {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: () => adminAuthService.me(),
    enabled,
  });
}
