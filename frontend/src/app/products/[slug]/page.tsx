import { ProductDetailsView } from "./product-details-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  return <ProductDetailsView slug={slug} />;
}
