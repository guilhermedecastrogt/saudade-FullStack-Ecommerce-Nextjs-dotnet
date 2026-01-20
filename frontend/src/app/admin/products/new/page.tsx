"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/widgets/admin/product-form";
import { useAdminCategories } from "@/features/admin-categories/api/use-admin-categories";
import { adminProductsService } from "@/features/admin-products/api/admin-products-service";
import { AdminProductFormValues } from "@/features/admin-products/validation/product-schema";

export default function AdminProductCreatePage() {
  const router = useRouter();
  const { data: categories } = useAdminCategories();

  const initialValues: AdminProductFormValues = {
    slug: "",
    name: "",
    description: "",
    price: 0,
    currency: "EUR",
    images: [],
    sizes: [],
    colors: [],
    rating: 0,
    inventory: 0,
    isNew: false,
    isBestSeller: false,
    isOnSale: false,
    isActive: true,
    categoryId: "",
  };

  const handleSubmit = async (values: AdminProductFormValues) => {
    const product = await adminProductsService.create(values);
    router.push(`/admin/products/${product.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Create Product</h1>
        <p className="text-sm text-brand-charcoal/70">Add a new catalog item.</p>
      </div>
      <div className="bg-white p-6 rounded-sm border border-brand-teal/10">
        <ProductForm categories={categories ?? []} initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Create Product" />
      </div>
    </div>
  );
}
