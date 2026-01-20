export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  inventory: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export type ProductSort = "relevance" | "newest" | "price_asc" | "price_desc" | "best_sellers";

export interface ProductFilter {
  category?: string;
  min?: number;
  max?: number;
  sort?: ProductSort;
  q?: string;
  page?: number;
  pageSize?: number;
}
