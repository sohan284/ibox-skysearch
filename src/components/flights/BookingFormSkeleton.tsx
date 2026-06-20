import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookingFormSkeleton() {
  return (
    <div>
      <div className="justify-start px-0 mb-6">
        <Skeleton className="h-10 w-32" />
      </div>

      <Card className="transition-all duration-300 border-2 border-gray-100">
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 rounded-xl p-5 border border-gray-200">
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <Skeleton className="h-4 w-16" />
                    <div className="w-full h-px bg-gray-200 relative mt-2">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4">
                <Skeleton className="h-9 w-36" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
