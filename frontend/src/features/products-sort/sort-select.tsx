import { productSortOptions } from "@/entities/product/query";
import { useProductsQuery } from "@/features/products-filters/use-products-query";

const labels: Record<string, string> = {
  relevance: "Relevance",
  newest: "Newest",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  best_sellers: "Best Sellers",
};

export function SortSelect() {
  const { query, setQuery } = useProductsQuery();

  return (
    <select
      aria-label="Sort products"
      className="h-11 rounded-full border border-brand-teal/20 bg-white px-4 text-sm text-brand-teal"
      value={query.sort}
      onChange={(event) => setQuery({ sort: event.target.value as typeof query.sort }, { resetPage: true })}
    >
      {productSortOptions.map((option) => (
        <option key={option} value={option}>
          {labels[option]}
        </option>
      ))}
    </select>
  );
}
