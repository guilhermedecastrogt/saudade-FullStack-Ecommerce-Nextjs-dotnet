"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { AdminCategory } from "@/features/admin-categories/api/admin-categories-service";
import { AdminProductFormValues, adminProductSchema } from "@/features/admin-products/validation/product-schema";

interface ProductFormProps {
  initialValues: AdminProductFormValues;
  categories: AdminCategory[];
  onSubmit: (values: AdminProductFormValues) => Promise<void>;
  submitLabel: string;
}

export function ProductForm({ initialValues, categories, onSubmit, submitLabel }: ProductFormProps) {
  const [values, setValues] = useState<AdminProductFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof AdminProductFormValues, value: string | number | boolean | string[]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const parsed = adminProductSchema.safeParse(values);
    if (!parsed.success) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    await onSubmit(parsed.data);
    setIsSubmitting(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Name</label>
          <Input value={values.name} onChange={(e) => handleChange("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Slug</label>
          <Input value={values.slug} onChange={(e) => handleChange("slug", e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Description</label>
        <textarea
          className="w-full border border-brand-teal/20 rounded-sm px-3 py-2 text-sm min-h-[120px]"
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Price</label>
          <Input type="number" value={values.price} onChange={(e) => handleChange("price", Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Currency</label>
          <Input value={values.currency} onChange={(e) => handleChange("currency", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Inventory</label>
          <Input type="number" value={values.inventory} onChange={(e) => handleChange("inventory", Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Category</label>
        <select
          value={values.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
          className="border border-brand-teal/20 rounded-sm px-3 py-2 text-sm w-full"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-brand-charcoal">Images (one per line)</label>
        <textarea
          className="w-full border border-brand-teal/20 rounded-sm px-3 py-2 text-sm min-h-[100px]"
          value={values.images.join("\n")}
          onChange={(e) => handleChange("images", e.target.value.split("\n").map((value) => value.trim()).filter(Boolean))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Sizes (comma-separated)</label>
          <Input value={values.sizes.join(", ")} onChange={(e) => handleChange("sizes", e.target.value.split(",").map((value) => value.trim()).filter(Boolean))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-charcoal">Colors (comma-separated)</label>
          <Input value={values.colors.join(", ")} onChange={(e) => handleChange("colors", e.target.value.split(",").map((value) => value.trim()).filter(Boolean))} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.isActive} onChange={(e) => handleChange("isActive", e.target.checked)} />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.isNew} onChange={(e) => handleChange("isNew", e.target.checked)} />
          New
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.isBestSeller} onChange={(e) => handleChange("isBestSeller", e.target.checked)} />
          Best Seller
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.isOnSale} onChange={(e) => handleChange("isOnSale", e.target.checked)} />
          On Sale
        </label>
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
