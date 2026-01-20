import { useQuery } from "@tanstack/react-query";
import { productService } from "./product-service";
import { ProductFilter } from "@/entities/product/types";

export function useProducts(filter?: ProductFilter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => productService.getProducts(filter),
  });
}
