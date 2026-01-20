import { Button } from "@/shared/ui/button";
import { productSortOptions } from "@/entities/product/query";
import { useProductsQuery } from "./use-products-query";
import { useCategories } from "@/features/products/api/use-categories";

export function ActiveFiltersBar() {
  const { query, setQuery, clearFilters } = useProductsQuery();
  const { data: categories } = useCategories();
  const categoryLabel = categories?.find((category) => category.slug === query.category)?.name ?? query.category;

  const filters = [
    query.q ? { label: `Search: ${query.q}`, onRemove: () => setQuery({ q: "" }, { resetPage: true }) } : null,
    query.category ? { label: `Category: ${categoryLabel}`, onRemove: () => setQuery({ category: "" }, { resetPage: true }) } : null,
    query.min !== undefined ? { label: `Min: €${query.min}`, onRemove: () => setQuery({ min: undefined }, { resetPage: true }) } : null,
    query.max !== undefined ? { label: `Max: €${query.max}`, onRemove: () => setQuery({ max: undefined }, { resetPage: true }) } : null,
    query.sort !== "relevance" && productSortOptions.includes(query.sort)
      ? { label: `Sort: ${query.sort.replace("_", " ")}`, onRemove: () => setQuery({ sort: "relevance" }, { resetPage: true }) }
      : null,
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md bg-white border border-brand-teal/10 p-3">
      <span className="text-xs uppercase tracking-wide text-brand-charcoal/60">Active filters</span>
      {filters.map((filter) => (
        <Button key={filter.label} variant="outline" size="sm" onClick={filter.onRemove}>
          {filter.label}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={clearFilters}>
        Clear all
      </Button>
    </div>
  );
}
