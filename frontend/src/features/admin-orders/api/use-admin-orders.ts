import { useQuery } from "@tanstack/react-query";
import { AdminOrdersParams, adminOrdersService } from "./admin-orders-service";

export function useAdminOrders(params: AdminOrdersParams) {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => adminOrdersService.list(params),
  });
}
