import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "./admin-dashboard-service";

export function useAdminTimeseries(from: string, to: string, bucket: "day" | "week") {
  return useQuery({
    queryKey: ["admin-timeseries", from, to, bucket],
    queryFn: () => adminDashboardService.getTimeseries(from, to, bucket),
    enabled: Boolean(from && to),
  });
}
