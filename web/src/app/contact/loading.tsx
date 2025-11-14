import { Container } from "@/components/layout/container";
import { FormSkeleton } from "@/components/forms/form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info skeleton */}
        <div>
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>

        {/* Form skeleton */}
        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <FormSkeleton />
        </div>
      </div>
    </Container>
  );
}

