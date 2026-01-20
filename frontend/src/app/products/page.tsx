import { Suspense } from "react";
import { ProductsPage as ProductsPageView } from "@/widgets/products/products-page";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageView />
    </Suspense>
  );
}
