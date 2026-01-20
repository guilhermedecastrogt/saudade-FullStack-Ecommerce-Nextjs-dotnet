import { z } from "zod";

export const adminProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  currency: z.string().min(1),
  images: z.array(z.string().url()).min(1),
  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).optional().default([]),
  rating: z.number().min(0),
  inventory: z.number().min(0),
  isNew: z.boolean(),
  isBestSeller: z.boolean(),
  isOnSale: z.boolean(),
  isActive: z.boolean(),
  categoryId: z.string().min(1),
});

export type AdminProductFormValues = z.infer<typeof adminProductSchema>;
