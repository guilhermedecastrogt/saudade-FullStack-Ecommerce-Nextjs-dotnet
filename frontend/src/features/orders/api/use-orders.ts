import { useQuery } from "@tanstack/react-query";
import { orderService } from "./order-service";

export function useOrders(enabled = true) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getOrders(),
    enabled,
  });
}
