import { useQuery } from "@tanstack/react-query";
import { AdminProductListParams, adminProductsService } from "./admin-products-service";

export function useAdminProducts(params: AdminProductListParams) {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => adminProductsService.list(params),
  });
}
