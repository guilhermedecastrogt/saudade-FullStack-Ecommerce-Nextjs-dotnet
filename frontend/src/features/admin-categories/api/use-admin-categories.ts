import { useQuery } from "@tanstack/react-query";
import { adminCategoriesService } from "./admin-categories-service";

export function useAdminCategories(active?: boolean) {
  return useQuery({
    queryKey: ["admin-categories", active],
    queryFn: () => adminCategoriesService.list(active),
  });
}
