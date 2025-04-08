
import React from 'react';
import { Escort } from '@/types/escort';
import EscortCard from './EscortCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface EscortGridProps {
  escorts: Escort[];
  loading?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMoreToLoad?: boolean;
}

const LoadingSkeletons = ({ count = 8 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <div className="aspect-[3/4] relative">
          <Skeleton className="w-full h-full" />
        </div>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    ))}
  </>
);

const EscortGrid: React.FC<EscortGridProps> = ({ 
  escorts, 
  loading = false,
  emptyMessage = "No escorts found matching your criteria.",
  onLoadMore,
  hasMoreToLoad = false
}) => {
  // Display loading skeletons when loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <LoadingSkeletons />
      </div>
    );
  }

  // Display message if no escorts
  if (escorts.length === 0) {
    return (
      <Card className="w-full p-16 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </Card>
    );
  }

  // Display escort grid with optional load more button
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {escorts.map(escort => (
          <EscortCard key={escort.id} escort={escort} />
        ))}
      </div>
      
      {/* Show load more button if provided */}
      {onLoadMore && hasMoreToLoad && (
        <div className="flex justify-center mt-8">
          <Button onClick={onLoadMore} variant="outline" size="lg">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default EscortGrid;
