import { Button } from "@/shared/ui/button";
import { useProductsQuery } from "@/features/products-filters/use-products-query";

interface ProductsPaginationProps {
  total: number;
  pageSize: number;
  page: number;
}

export function ProductsPagination({ total, pageSize, page }: ProductsPaginationProps) {
  const { setQuery } = useProductsQuery();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  if (totalPages <= 1) return null;

  const goToPage = (next: number) => {
    setQuery({ page: next });
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" size="sm" onClick={() => goToPage(Math.max(1, page - 1))} disabled={page <= 1}>
        Prev
      </Button>
      {pages.map((item) => (
        <Button
          key={item}
          variant={item === page ? "secondary" : "outline"}
          size="sm"
          onClick={() => goToPage(item)}
        >
          {item}
        </Button>
      ))}
      <Button variant="outline" size="sm" onClick={() => goToPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>
        Next
      </Button>
    </div>
  );
}
