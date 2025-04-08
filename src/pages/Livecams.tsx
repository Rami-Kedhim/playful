
import React from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Settings } from "lucide-react";
import { LivecamsModule } from "@/modules/livecams/LivecamsModule";
import useLivecams from "@/hooks/useLivecams";
import LivecamFilters from "@/components/livecams/LivecamFilters";
import LivecamGrid from "@/components/livecams/LivecamGrid";
import { livecamsNeuralService } from "@/services/neural/modules/LivecamsNeuralService";

const Livecams: React.FC = () => {
  return (
    <LivecamsModule>
      <LivecamsPageContent />
    </LivecamsModule>
  );
};

const LivecamsPageContent: React.FC = () => {
  const { 
    livecams, 
    loading, 
    error, 
    filters, 
    totalCount,
    hasMore,
    fetchLivecams, 
    updateFilters,
    resetFilters,
    loadMore
  } = useLivecams();
  
  const handleRefresh = () => {
    fetchLivecams(true); // Force refresh
  };
  
  const neuralStatus = livecamsNeuralService.isEnabled() 
    ? `Neural processing active (${livecamsNeuralService.getConfig().autonomyLevel}%)`
    : "Neural processing disabled";
  
  return (
    <>
      <Helmet>
        <title>Live Cams | Watch Live Webcam Streams</title>
        <meta name="description" content="Watch live webcam shows from models around the world. Interactive streams, HD quality, and real-time chat." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Live Cams</h1>
                {livecamsNeuralService.isEnabled() && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    Neural Enhanced
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Watch live webcam shows from models around the world</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => updateFilters({ 
                  sortBy: filters.sortBy === 'recommended' ? 'viewers' : 'recommended' 
                })}
              >
                <Settings className="h-4 w-4" />
                {filters.sortBy === 'recommended' ? 'Neural' : 'Standard'} Sorting
              </Button>
              <Button onClick={handleRefresh} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <LivecamFilters 
                filters={filters} 
                onFilterChange={updateFilters}
                onResetFilters={resetFilters}
              />
              
              <div className="mt-4 text-xs text-muted-foreground">
                {neuralStatus}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {!loading && !error && livecams.length > 0 && (
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {livecams.length} of {totalCount} models
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateFilters({ status: filters.status === 'live' ? 'all' : 'live' })}
                  >
                    {filters.status === 'live' ? 'Show All' : 'Show Live Only'}
                  </Button>
                </div>
              )}
              
              {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-md text-center mb-6">
                  <p className="text-red-500">Error: {error}</p>
                  <Button 
                    variant="outline" 
                    onClick={handleRefresh}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="rounded-lg overflow-hidden">
                      <Skeleton className="w-full aspect-video" />
                      <div className="p-3">
                        <Skeleton className="w-2/3 h-5 mb-2" />
                        <Skeleton className="w-1/2 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <LivecamGrid 
                  livecams={livecams} 
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                />
              )}
              
              {!loading && livecams.length === 0 && !error && (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No livecams found matching your criteria</p>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Livecams;
