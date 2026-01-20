import { Category, Product, ProductFilter } from "@/entities/product/types";
import { apiClient } from "@/shared/api/client";

async function getProducts(filter?: ProductFilter) {
  const params = new URLSearchParams();
  if (filter?.category) params.append("category", filter.category);
  if (filter?.q) params.append("q", filter.q);
  if (filter?.sort) params.append("sort", filter.sort);
  if (filter?.minPrice !== undefined) params.append("minPrice", String(filter.minPrice));
  if (filter?.maxPrice !== undefined) params.append("maxPrice", String(filter.maxPrice));
  if (filter?.page) params.append("page", String(filter.page));
  if (filter?.pageSize) params.append("pageSize", String(filter.pageSize));

  const query = params.toString();
  const response = await apiClient.get<Product[]>(query ? `/catalog/products?${query}` : "/catalog/products");
  return {
    items: response.data,
    meta: response.meta ?? { total: 0, page: 1, pageSize: response.data.length },
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/catalog/products/${slug}`);
    return response.data;
  } catch {
    return null;
  }
}

async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>("/catalog/categories");
  return response.data;
}

export const productService = {
  getProducts,
  getProduct,
  getCategories,
};
