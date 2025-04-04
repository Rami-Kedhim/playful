
import React from 'react';
import { LivecamModel } from '@/types/livecams';
import LivecamCard from './LivecamCard';
import { Button } from '@/components/ui/button';

interface LivecamGridProps {
  models: LivecamModel[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  showBoostControls?: boolean;
  boostedIds?: string[];
  onBoost?: (livecamId: string, intensity: number, durationHours: number) => boolean;
  onCancelBoost?: (livecamId: string) => boolean;
}

const LivecamGrid = ({
  models,
  loading,
  hasMore,
  onLoadMore,
  showBoostControls = false,
  boostedIds = [],
  onBoost = () => false,
  onCancelBoost = () => false
}: LivecamGridProps) => {
  if (loading && models.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="h-64 rounded-md bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!loading && models.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No live streams found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or check back later
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {models.map(model => (
          <LivecamCard 
            key={model.id} 
            model={model} 
            showBoostControls={showBoostControls}
            isBoosted={boostedIds.includes(model.id)}
            onBoost={onBoost}
            onCancelBoost={onCancelBoost}
          />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LivecamGrid;
