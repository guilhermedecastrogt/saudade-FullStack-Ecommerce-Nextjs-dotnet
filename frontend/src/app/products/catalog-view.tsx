"use client";

import { useState } from "react";
import { useProducts } from "@/features/products/api/use-products";
import { useCategories } from "@/features/products/api/use-categories";
import { ProductCard } from "@/widgets/product/product-card";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ProductFilter } from "@/entities/product/types";
import { Search } from "lucide-react";

export function CatalogView() {
  const [filter, setFilter] = useState<ProductFilter>({ category: undefined, q: "" });
  const { data: productsResult, isLoading } = useProducts(filter);
  const { data: categories } = useCategories();

  const categoryOptions = ["All", ...(categories ?? []).map((category) => category.name)];

  const handleCategoryChange = (category: string) => {
    setFilter((prev) => ({ ...prev, category: category === "All" ? undefined : category }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, q: e.target.value }));
  };

  return (
    <div className="py-12 bg-brand-cream min-h-screen">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="font-montserrat font-bold text-3xl text-brand-teal">Shop Collection</h1>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-teal/50" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 bg-white"
                  value={filter.q}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-brand-teal/10 pb-4">
            {categoryOptions.map((cat) => (
              <Button
                key={cat}
                variant={
                  (cat === "All" && !filter.category) || filter.category === cat
                    ? "default"
                    : "ghost"
                }
                onClick={() => handleCategoryChange(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] bg-brand-teal/5 animate-pulse rounded-sm" />
                  <div className="h-4 bg-brand-teal/5 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-brand-teal/5 animate-pulse rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : productsResult?.items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-brand-charcoal/60">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {productsResult?.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
