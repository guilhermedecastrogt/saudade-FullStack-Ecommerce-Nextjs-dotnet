import { useQuery } from "@tanstack/react-query";
import { productService } from "./product-service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => productService.getCategories(),
  });
}
