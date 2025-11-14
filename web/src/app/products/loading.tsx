import { Container } from "@/components/layout/container";
import { ProductsListSkeleton } from "@/components/products/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <Container className="py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-96" />
      </div>

      {/* Search and filter skeleton */}
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Products grid skeleton */}
      <ProductsListSkeleton count={6} />
    </Container>
  );
}

