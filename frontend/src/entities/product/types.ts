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

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'relevance' | 'price_asc' | 'price_desc' | 'newest';
  q?: string;
  page?: number;
  pageSize?: number;
}
