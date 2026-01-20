"use client";

import { useMemo, useState } from "react";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { Sheet } from "@/shared/ui/sheet";
import { useProducts } from "@/features/products/api/use-products";
import { useProductsQuery } from "@/features/products-filters/use-products-query";
import { FiltersPanel } from "@/features/products-filters/filters-panel";
import { ActiveFiltersBar } from "@/features/products-filters/active-filters-bar";
import { SortSelect } from "@/features/products-sort/sort-select";
import { ProductsGrid } from "./products-grid";
import { ProductsPagination } from "./products-pagination";

export function ProductsPage() {
  const { query, clearFilters } = useProductsQuery();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filter = useMemo(
    () => ({
      q: query.q || undefined,
      category: query.category || undefined,
      sort: query.sort,
      min: query.min,
      max: query.max,
      page: query.page,
      pageSize: query.pageSize,
    }),
    [query]
  );

  const { data, isLoading, isError, refetch } = useProducts(filter);
  const items = data?.items ?? [];
  const meta = data?.meta ?? { total: items.length, page: query.page, pageSize: query.pageSize };

  const isEmpty = !isLoading && !isError && items.length === 0;

  return (
    <div className="bg-brand-cream min-h-screen py-10">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-montserrat font-bold text-brand-teal">Products</h1>
              <p className="text-sm text-brand-charcoal/60">
                {meta.total} results
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
                Filters
              </Button>
              <SortSelect />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ActiveFiltersBar />
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              <div className="hidden lg:block bg-white border border-brand-teal/10 rounded-md p-6 h-fit">
                <FiltersPanel />
              </div>

              <div className="space-y-6">
                {isError ? (
                  <div className="bg-white border border-brand-teal/10 rounded-md p-8 text-center">
                    <p className="text-brand-charcoal/70 mb-4">Something went wrong while loading products.</p>
                    <Button variant="secondary" onClick={() => refetch()}>
                      Retry
                    </Button>
                  </div>
                ) : isEmpty ? (
                  <div className="bg-white border border-brand-teal/10 rounded-md p-8 text-center">
                    <p className="text-brand-charcoal/70 mb-4">No products match your filters.</p>
                    <Button variant="secondary" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <ProductsGrid items={items} isLoading={isLoading} />
                )}

                <ProductsPagination total={meta.total ?? items.length} pageSize={meta.pageSize ?? query.pageSize} page={meta.page ?? query.page} />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Sheet open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <FiltersPanel />
      </Sheet>
    </div>
  );
}
