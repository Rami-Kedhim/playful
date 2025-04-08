
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { CreatorsModule } from "@/modules/creators/CreatorsModule";
import useCreators from "@/hooks/useCreators";
import MainLayout from "@/components/layout/MainLayout";
import CreatorFilters from "@/components/creators/CreatorFilters";
import CreatorGrid from "@/components/creators/CreatorGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Settings, SlidersHorizontal } from "lucide-react";
import { creatorsNeuralService } from "@/services/neural/modules/CreatorsNeuralService";

const Creators: React.FC = () => {
  return (
    <CreatorsModule>
      <CreatorPageContent />
    </CreatorsModule>
  );
};

const CreatorPageContent: React.FC = () => {
  const { creators, loading, error, fetchCreators, filters, updateFilters } = useCreators();
  const { showInfo } = useNotifications();
  
  const handleRefresh = () => {
    fetchCreators(true); // Force refresh
    if (showInfo) showInfo("Refreshing Data", "Getting the latest content creators");
  };
  
  const neuralStatus = creatorsNeuralService.isEnabled() 
    ? `Neural processing active (${creatorsNeuralService.getConfig().autonomyLevel}%)`
    : "Neural processing disabled";
  
  return (
    <>
      <Helmet>
        <title>Premium Content Creators | Subscribe to Exclusive Content</title>
        <meta name="description" content="Browse our premium content creators. Subscribe for exclusive photos, videos, and livestreams." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Content Creators</h1>
                {creatorsNeuralService.isEnabled() && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    Neural Enhanced
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Subscribe to exclusive content from premium creators</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => updateFilters({ 
                  sortBy: filters.sortBy === 'recommended' ? 'mostSubscribers' : 'recommended' 
                })}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {filters.sortBy === 'recommended' ? 'Neural' : 'Standard'} Sorting
              </Button>
              <Button onClick={handleRefresh} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <CreatorFilters 
                filters={filters} 
                onFilterChange={updateFilters}
              />
              
              <div className="mt-4 text-xs text-muted-foreground">
                {neuralStatus}
              </div>
            </div>
            
            <div className="lg:col-span-3">
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array(8).fill(0).map((_, i) => (
                    <div key={i} className="rounded-lg overflow-hidden">
                      <Skeleton className="w-full aspect-square" />
                      <div className="p-3">
                        <Skeleton className="w-2/3 h-5 mb-2" />
                        <Skeleton className="w-1/2 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <CreatorGrid creators={creators} />
              )}
              
              {!loading && creators.length === 0 && !error && (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No creators found matching your criteria</p>
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

export default Creators;
