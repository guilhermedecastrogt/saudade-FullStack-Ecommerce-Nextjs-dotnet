import { useQuery } from "@tanstack/react-query";
import { adminProductsService } from "./admin-products-service";

export function useAdminProduct(id: string) {
  return useQuery({
    queryKey: ["admin-product", id],
    queryFn: () => adminProductsService.getById(id),
    enabled: !!id,
  });
}
