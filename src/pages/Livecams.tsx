
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { LivecamsModule } from "@/modules/livecams/LivecamsModule";
import { useLivecamContext } from "@/modules/livecams/providers/LivecamProvider";
import MainLayout from "@/components/layout/MainLayout";
import LivecamFilters from "@/components/livecams/LivecamFilters";
import LivecamGrid from "@/components/livecams/LivecamGrid";
import LiveTrendingBar from "@/components/livecams/LiveTrendingBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Settings, SlidersHorizontal } from "lucide-react";
import { livecamsNeuralService } from "@/services/neural/modules/LivecamsNeuralService";

const Livecams: React.FC = () => {
  return (
    <LivecamsModule>
      <LivecamPageContent />
    </LivecamsModule>
  );
};

const LivecamPageContent: React.FC = () => {
  const { state, loadLivecams, updateFilters } = useLivecamContext();
  const { showInfo } = useNotifications();
  
  const handleRefresh = () => {
    loadLivecams(true); // Force refresh with neural processing
    if (showInfo) showInfo("Refreshing Data", "Getting the latest livestreams");
  };
  
  const neuralStatus = livecamsNeuralService.isEnabled() 
    ? `Neural processing active (${livecamsNeuralService.getConfig().autonomyLevel}%)`
    : "Neural processing disabled";
  
  // Only show trending section if we have live streams
  const hasLiveStreams = state.livecams.some(livecam => livecam.isLive);
  
  return (
    <>
      <Helmet>
        <title>Live Cams | Watch Live Streams</title>
        <meta name="description" content="Watch live cam streams from top models. Interactive live broadcasts available now." />
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
              <p className="text-muted-foreground">Watch live interactive streams</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => updateFilters({ 
                  showOffline: !state.filters.showOffline
                })}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {state.filters.showOffline ? 'Hide' : 'Show'} Offline
              </Button>
              <Button onClick={handleRefresh} disabled={state.isLoading}>
                {state.isLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
          
          {hasLiveStreams && !state.isLoading && (
            <div className="mb-8">
              <LiveTrendingBar livecams={state.featuredLivecams} />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <LivecamFilters 
                filters={state.filters} 
                onFilterChange={updateFilters}
              />
              
              <div className="mt-4 text-xs text-muted-foreground">
                {neuralStatus}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {state.error ? (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded-md text-center mb-6">
                  <p className="text-red-500">Error: {state.error}</p>
                  <Button 
                    variant="outline" 
                    onClick={handleRefresh}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              ) : state.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <LivecamGrid livecams={state.livecams} />
              )}
              
              {!state.isLoading && state.livecams.length === 0 && !state.error && (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No livestreams found matching your criteria</p>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
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
