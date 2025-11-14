import { Skeleton } from "@/components/ui/skeleton";

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Form title skeleton */}
      <Skeleton className="h-8 w-64" />

      {/* Form fields skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>

      {/* Textarea skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Button skeleton */}
      <Skeleton className="h-11 w-32 rounded-md" />
    </div>
  );
}

export function MultiStepFormSkeleton({ steps = 4 }: { steps?: number }) {
  return (
    <div className="space-y-6">
      {/* Progress indicator skeleton */}
      <div className="flex items-center justify-between mb-8">
        {Array.from({ length: steps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            {index < steps - 1 && <Skeleton className="h-1 w-16 mx-2" />}
          </div>
        ))}
      </div>

      {/* Form content skeleton */}
      <FormSkeleton />

      {/* Navigation buttons skeleton */}
      <div className="flex justify-between mt-8">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}

