import { useEffect, useMemo, useState } from "react";
import { useCategories } from "@/features/products/api/use-categories";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { useProductsQuery } from "./use-products-query";

export function FiltersPanel() {
  const { query, setQuery, clearFilters } = useProductsQuery();
  const { data: categories, isLoading } = useCategories();

  const categoryItems = useMemo(() => categories ?? [], [categories]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-montserrat font-semibold text-brand-teal text-lg">Filters</h2>
        <p className="text-sm text-brand-charcoal/60">Refine your search</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Search</label>
        <SearchField
          key={query.q}
          value={query.q}
          onDebouncedChange={(value) => setQuery({ q: value }, { resetPage: true })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Categories</label>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              variant={query.category ? "ghost" : "secondary"}
              className="justify-start"
              onClick={() => setQuery({ category: "" }, { resetPage: true })}
            >
              All categories
            </Button>
            {categoryItems.map((category) => (
              <Button
                key={category.id}
                variant={query.category === category.slug ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setQuery({ category: category.slug }, { resetPage: true })}
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Price range</label>
        <PriceRangeField
          key={`${query.min ?? ""}-${query.max ?? ""}`}
          min={query.min}
          max={query.max}
          onDebouncedChange={(minValue, maxValue) => setQuery({ min: minValue, max: maxValue }, { resetPage: true })}
        />
      </div>

      <Button variant="outline" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
}

function SearchField({ value, onDebouncedChange }: { value: string; onDebouncedChange: (value: string) => void }) {
  const [input, setInput] = useState(value);
  const debounced = useDebouncedValue(input, 400);

  useEffect(() => {
    if (debounced !== value) {
      onDebouncedChange(debounced);
    }
  }, [debounced, value, onDebouncedChange]);

  return <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search products" />;
}

function PriceRangeField({
  min,
  max,
  onDebouncedChange,
}: {
  min?: number;
  max?: number;
  onDebouncedChange: (min?: number, max?: number) => void;
}) {
  const [minInput, setMinInput] = useState(min?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(max?.toString() ?? "");
  const debouncedMin = useDebouncedValue(minInput, 500);
  const debouncedMax = useDebouncedValue(maxInput, 500);

  useEffect(() => {
    const nextMin = debouncedMin ? Number(debouncedMin) : undefined;
    const nextMax = debouncedMax ? Number(debouncedMax) : undefined;
    const minValue = Number.isFinite(nextMin ?? NaN) ? nextMin : undefined;
    const maxValue = Number.isFinite(nextMax ?? NaN) ? nextMax : undefined;
    if (minValue !== min || maxValue !== max) {
      onDebouncedChange(minValue, maxValue);
    }
  }, [debouncedMin, debouncedMax, min, max, onDebouncedChange]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <Input value={minInput} onChange={(event) => setMinInput(event.target.value)} placeholder="Min" inputMode="decimal" />
      <Input value={maxInput} onChange={(event) => setMaxInput(event.target.value)} placeholder="Max" inputMode="decimal" />
    </div>
  );
}
