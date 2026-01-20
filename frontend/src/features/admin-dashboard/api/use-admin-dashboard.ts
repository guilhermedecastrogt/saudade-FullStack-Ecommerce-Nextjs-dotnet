import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "./admin-dashboard-service";

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => adminDashboardService.getSummary(),
  });
}
