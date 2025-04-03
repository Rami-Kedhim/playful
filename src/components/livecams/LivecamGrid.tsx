
import React from "react";
import { LivecamModel } from "@/types/livecams";
import LivecamCard from "./LivecamCard";
import { Button } from "@/components/ui/button";

interface LivecamGridProps {
  models: LivecamModel[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const LivecamGrid: React.FC<LivecamGridProps> = ({ 
  models, 
  loading, 
  hasMore, 
  onLoadMore 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {models.map((model) => (
          <LivecamCard key={model.id} model={model} />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!loading && hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
      
      {!loading && models.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-400">No models found</h3>
          <p className="text-gray-500 mt-2">Try changing your filters or check back later</p>
        </div>
      )}
    </div>
  );
};

export default LivecamGrid;
