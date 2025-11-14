import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-12">
        {/* Hero skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-2" />
          <Skeleton className="h-6 w-5/6 max-w-2xl mx-auto" />
        </div>

        {/* Content sections skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </Container>
  );
}

