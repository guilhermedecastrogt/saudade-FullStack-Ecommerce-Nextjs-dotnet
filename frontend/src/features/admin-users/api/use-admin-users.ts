import { useQuery } from "@tanstack/react-query";
import { adminUsersService } from "./admin-users-service";

export function useAdminUsers(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ["admin-users", page, pageSize],
    queryFn: () => adminUsersService.list(page, pageSize),
  });
}
