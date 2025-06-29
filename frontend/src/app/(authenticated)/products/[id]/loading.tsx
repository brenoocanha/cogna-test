import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white sm:bg-gray-50">
      {/* Mobile Loading */}
      <div className="sm:hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>

          <div className="mb-6">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-9 w-32 mb-4" />
            </div>

            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>

            <div className="space-y-3 pt-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Loading */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Skeleton className="h-5 w-48" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-5 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-32 mb-6" />
                  <div className="space-y-4 mb-6">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-11 w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
