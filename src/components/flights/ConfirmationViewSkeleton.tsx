import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ConfirmationViewSkeleton() {
  return (
    <div className="text-center">
      <div className="justify-start px-0 mb-6">
        <Skeleton className="h-10 w-32" />
      </div>

      <Card className="transition-all duration-300 border-2 border-gray-100">
        <CardContent className="p-8 md:p-12">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6" />
          <Skeleton className="h-9 w-72 mx-auto mb-2" />
          <Skeleton className="h-5 w-80 mx-auto mb-8" />

          <div className="bg-primary/5 rounded-xl p-5 border border-gray-200 mb-8 text-left">
            <Skeleton className="h-5 w-36 mb-4" />
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-6 w-40" />
              </div>

              <div className="border-t pt-4 mt-4">
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

              <div className="border-t pt-4 mt-4">
                <Skeleton className="h-4 w-40 mb-2" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>
          </div>

          <Skeleton className="h-12 w-48" />
        </CardContent>
      </Card>
    </div>
  );
}
