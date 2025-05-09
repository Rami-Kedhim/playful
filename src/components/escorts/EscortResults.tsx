
// Update the EscortResults.tsx file to properly handle the ExtendedEscort type
import React from 'react';
import { Escort } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EscortProfileCard from './EscortProfileCard';

export interface EscortResultsProps {
  escorts: Escort[];
  loading?: boolean;
  error?: string | null;
  onEscortClick?: (escort: Escort) => void;
  onBookNowClick?: (escort: Escort) => void;
  onLoadMore?: () => void;
  hasMoreResults?: boolean;
}

const EscortResults: React.FC<EscortResultsProps> = ({
  escorts,
  loading = false,
  error = null,
  onEscortClick,
  onBookNowClick,
  onLoadMore,
  hasMoreResults = false
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-[400px] animate-pulse">
            <div className="bg-muted h-48 w-full" />
            <CardContent className="p-4">
              <div className="h-6 bg-muted rounded-md w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded-md w-1/2 mb-3" />
              <div className="h-4 bg-muted rounded-md w-2/3 mb-3" />
              <div className="h-8 bg-muted rounded-md w-full mt-6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-red-500 mb-2">Error Loading Escorts</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (escorts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No Results Found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  // Enhanced version of escorts with service flags
  const enhancedEscorts = escorts.map(escort => {
    const enhancedEscort = {
      ...escort,
      providesInPersonServices: escort.providesInPersonServices ?? true,
      providesVirtualContent: escort.providesVirtualContent ?? false,
      featured: escort.featured ?? false
    };
    return enhancedEscort;
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {enhancedEscorts.map((escort) => (
          <EscortProfileCard
            key={escort.id}
            escort={escort}
            onClick={() => onEscortClick?.(escort)}
            onBookNow={() => onBookNowClick?.(escort)}
          />
        ))}
      </div>

      {hasMoreResults && onLoadMore && (
        <div className="mt-8 text-center">
          <Button onClick={onLoadMore} variant="outline" className="min-w-[200px]">
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default EscortResults;
