import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildProductsSearchParams, defaultProductsQuery, parseProductsQuery, ProductsQuery } from "@/entities/product/query";

export function useProductsQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const query = useMemo(() => parseProductsQuery(new URLSearchParams(queryString)), [queryString]);

  const setQuery = (next: Partial<ProductsQuery>, options?: { resetPage?: boolean }) => {
    const updated = { ...query, ...next };
    if (options?.resetPage) {
      updated.page = 1;
    }
    const params = buildProductsSearchParams(updated);
    const nextQueryString = params.toString();
    if (nextQueryString === queryString) {
      return;
    }
    const url = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;
    router.replace(url, { scroll: false });
  };

  const clearFilters = () => {
    const params = buildProductsSearchParams(defaultProductsQuery);
    const nextQueryString = params.toString();
    const url = nextQueryString ? `${pathname}?${nextQueryString}` : pathname;
    router.replace(url, { scroll: false });
  };

  return { query, setQuery, clearFilters };
}
