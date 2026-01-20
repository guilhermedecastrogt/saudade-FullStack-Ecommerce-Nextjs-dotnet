import { ProductSort } from "./types";

export const productSortOptions = [
  "relevance",
  "newest",
  "price_asc",
  "price_desc",
  "best_sellers",
] as const satisfies ProductSort[];

export const defaultProductsQuery = {
  q: "",
  category: "",
  sort: "relevance" as ProductSort,
  min: undefined as number | undefined,
  max: undefined as number | undefined,
  page: 1,
  pageSize: 12,
};

export type ProductsQuery = typeof defaultProductsQuery;

const toNumber = (value: string | null) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const parseProductsQuery = (params: URLSearchParams): ProductsQuery => {
  const sort = params.get("sort") as ProductSort | null;
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const min = toNumber(params.get("min"));
  const max = toNumber(params.get("max"));
  const page = Math.max(1, Number(params.get("page") ?? defaultProductsQuery.page));
  const pageSize = Math.max(1, Number(params.get("pageSize") ?? defaultProductsQuery.pageSize));
  return {
    q,
    category,
    sort: productSortOptions.includes(sort ?? defaultProductsQuery.sort) ? (sort ?? defaultProductsQuery.sort) : defaultProductsQuery.sort,
    min,
    max,
    page,
    pageSize,
  };
};

export const buildProductsSearchParams = (query: ProductsQuery) => {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sort !== defaultProductsQuery.sort) params.set("sort", query.sort);
  if (query.min !== undefined) params.set("min", String(query.min));
  if (query.max !== undefined) params.set("max", String(query.max));
  if (query.page !== defaultProductsQuery.page) params.set("page", String(query.page));
  if (query.pageSize !== defaultProductsQuery.pageSize) params.set("pageSize", String(query.pageSize));
  return params;
};
