import { Category, Product, ProductFilter } from "@/entities/product/types";
import { categorySchema, productListMetaSchema, productSchema } from "@/entities/product/schemas";
import { z } from "zod";
import { apiClient } from "@/shared/api/client";

async function getProducts(filter?: ProductFilter) {
  const params = new URLSearchParams();
  if (filter?.category) params.append("category", filter.category);
  if (filter?.q) params.append("q", filter.q);
  if (filter?.sort) params.append("sort", filter.sort);
  if (filter?.min !== undefined) params.append("minPrice", String(filter.min));
  if (filter?.max !== undefined) params.append("maxPrice", String(filter.max));
  if (filter?.page) params.append("page", String(filter.page));
  if (filter?.pageSize) params.append("pageSize", String(filter.pageSize));

  const query = params.toString();
  const response = await apiClient.get<unknown>(query ? `/catalog/products?${query}` : "/catalog/products");
  const items = z.array(productSchema).parse(response.data);
  const meta = productListMetaSchema.parse(response.meta ?? {});
  return {
    items,
    meta: {
      total: meta.total ?? items.length,
      page: meta.page ?? filter?.page ?? 1,
      pageSize: meta.pageSize ?? filter?.pageSize ?? items.length,
    },
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<unknown>(`/catalog/products/${slug}`);
    return productSchema.parse(response.data);
  } catch {
    return null;
  }
}

async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<unknown>("/catalog/categories");
  return z.array(categorySchema).parse(response.data);
}

export const productService = {
  getProducts,
  getProduct,
  getCategories,
};
