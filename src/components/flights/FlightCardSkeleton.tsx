import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FlightCardSkeleton() {
  return (
    <Card className="border-2 border-gray-100">
      <CardContent className="p-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* Left: FlightSummary Skeleton */}
          <div className="flex-1 space-y-3">
            {/* Top row: Airline details skeleton */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </div>

            {/* Middle row: Timeline skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-1">
              <div className="flex-1 flex items-center gap-6">
                {/* Departure */}
                <div className="w-24 space-y-1.5">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                {/* Connection timeline line */}
                <div className="flex-1 flex flex-col items-center space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <div className="w-full h-px bg-gray-200 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-300 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gray-300 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-14" />
                </div>
                {/* Arrival */}
                <div className="w-24 space-y-1.5 text-right flex flex-col items-end">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              {/* Price details skeleton */}
              <div className="flex flex-col items-end shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-6 space-y-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>

          {/* Right: Select button skeleton */}
          <div className="flex flex-col items-end shrink-0 justify-center">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
