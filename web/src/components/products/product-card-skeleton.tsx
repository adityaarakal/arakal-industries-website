import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border rounded-lg p-6">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48 mb-4 rounded-lg" />
      
      {/* Icon skeleton */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-7 w-3/4 mb-3" />
      
      {/* Description skeleton */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      
      {/* Features skeleton */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Button skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export function ProductsListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

