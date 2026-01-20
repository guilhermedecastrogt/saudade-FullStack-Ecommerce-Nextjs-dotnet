"use client";

import { useRouter } from "next/navigation";
import { useAdminProduct } from "@/features/admin-products/api/use-admin-product";
import { useAdminCategories } from "@/features/admin-categories/api/use-admin-categories";
import { ProductForm } from "@/widgets/admin/product-form";
import { adminProductsService } from "@/features/admin-products/api/admin-products-service";
import { AdminProductFormValues } from "@/features/admin-products/validation/product-schema";

export default function AdminProductEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: product } = useAdminProduct(params.id);
  const { data: categories } = useAdminCategories();

  if (!product) {
    return <div className="text-brand-charcoal/70">Loading product...</div>;
  }

  const initialValues: AdminProductFormValues = {
    slug: product.slug,
    name: product.name,
    description: product.description,
    price: product.price,
    currency: product.currency,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    rating: product.rating,
    inventory: product.inventory,
    isNew: product.isNew,
    isBestSeller: product.isBestSeller,
    isOnSale: product.isOnSale,
    isActive: product.isActive,
    categoryId: product.categoryId,
  };

  const handleSubmit = async (values: AdminProductFormValues) => {
    await adminProductsService.update(params.id, values);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-montserrat font-bold text-brand-teal">Edit Product</h1>
        <p className="text-sm text-brand-charcoal/70">Update product details and visibility.</p>
      </div>
      <div className="bg-white p-6 rounded-sm border border-brand-teal/10">
        <ProductForm categories={categories ?? []} initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
