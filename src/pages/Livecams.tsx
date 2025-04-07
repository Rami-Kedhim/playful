
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import LivecamGrid from "@/components/livecams/LivecamGrid";
import LivecamFilters from "@/components/livecams/LivecamFilters";
import { useBoostableLivecams } from "@/hooks/useBoostableLivecams";
import { useToast } from "@/components/ui/use-toast";
import { LivecamModel as BoostableLivecamModel } from "@/types/livecams";

// Create a type adapter to ensure compatibility between different LivecamModel types
type AdaptedLivecamModel = {
  id: string;
  name?: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isLive: boolean;
  viewerCount?: number;
  tags?: string[];
  boosted?: boolean;
  boostScore?: number;
  boostRank?: string;
  country?: string;
  categories?: string[];
  language?: string;
  description?: string;
  age?: number;
  streamUrl?: string;
  previewVideoUrl?: string;
};

const Livecams: React.FC = () => {
  const { toast } = useToast();
  const { 
    livecams,
    loading, 
    error, 
    filters, 
    hasMore, 
    totalCount,
    loadMore, 
    updateFilters,
    boostLivecam,
    cancelBoost,
    isBoosted,
    boostedIds
  } = useBoostableLivecams();

  // Show error toast if something went wrong
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Adapter functions to match the expected parameter types in LivecamGrid
  const handleBoost = (livecamId: string): boolean => {
    // Call the async function but return a synchronous result for UI feedback
    boostLivecam(livecamId);
    return true;
  };
  
  const handleCancelBoost = (livecamId: string): boolean => {
    // Call the async function but return a synchronous result for UI feedback
    cancelBoost(livecamId);
    return true;
  };

  // Adapt the livecams to match the expected type in LivecamGrid
  const adaptedLivecams: AdaptedLivecamModel[] = livecams.map(cam => ({
    id: cam.id,
    username: cam.name || cam.id, // Fallback if name is missing
    displayName: cam.name || `Model ${cam.id}`, // Fallback if name is missing
    imageUrl: cam.thumbnailUrl || 'https://picsum.photos/300/200', // Fallback if thumbnailUrl is missing
    thumbnailUrl: cam.thumbnailUrl,
    isLive: cam.isLive,
    viewerCount: cam.viewerCount,
    tags: cam.tags,
    boosted: cam.boosted,
    boostScore: cam.boostScore,
    boostRank: cam.boostRank,
    country: "Unknown",
    categories: cam.tags,
  }));

  return (
    <MainLayout title="Live Cams">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Live Cams</h1>
        <p className="text-muted-foreground">
          Watch live webcam shows from models around the world
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <LivecamFilters filters={filters} onFilterChange={updateFilters} />
        </div>
        
        <div className="lg:col-span-3">
          {!loading && adaptedLivecams.length > 0 && (
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {adaptedLivecams.length} of {totalCount} models
              </p>
            </div>
          )}
          
          <LivecamGrid 
            models={adaptedLivecams} 
            loading={loading} 
            hasMore={hasMore} 
            onLoadMore={loadMore}
            showBoostControls={true}
            boostedIds={boostedIds}
            onBoost={handleBoost}
            onCancelBoost={handleCancelBoost}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Livecams;
