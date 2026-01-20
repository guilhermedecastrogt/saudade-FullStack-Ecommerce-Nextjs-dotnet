import { useQuery } from "@tanstack/react-query";
import { productService } from "./product-service";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProduct(slug),
    enabled: !!slug,
  });
}
