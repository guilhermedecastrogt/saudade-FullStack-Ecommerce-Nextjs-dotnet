import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string(),
  images: z.array(z.string()),
  category: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  rating: z.number(),
  inventory: z.number(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
});

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
});

export const productListMetaSchema = z.object({
  total: z.number().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
});
