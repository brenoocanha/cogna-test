import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      {/* Mobile Loading */}
      <div className="sm:hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <Skeleton className="h-9 w-48 mx-auto mb-2" />
            <Skeleton className="h-5 w-36 mx-auto" />
          </div>

          <div className="mb-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <Skeleton className="h-6 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Loading */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Skeleton className="h-9 w-48 mb-2" />
                  <Skeleton className="h-5 w-64" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-40 w-full rounded-t-lg" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3 mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
