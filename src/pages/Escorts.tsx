
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import UnifiedServiceGrid from "@/components/unified/UnifiedServiceGrid";
import { EscortsModule } from "@/modules/escorts/EscortsModule";
import useEscorts from "@/hooks/useEscorts";
import MainLayout from "@/components/layout/MainLayout";
import EscortFilters from "@/components/escorts/EscortFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Settings } from "lucide-react";
import { escortsNeuralService } from "@/services/neural/modules/EscortsNeuralService";

const Escorts: React.FC = () => {
  return (
    <EscortsModule>
      <EscortPageContent />
    </EscortsModule>
  );
};

const EscortPageContent: React.FC = () => {
  const { escorts, loading, error, fetchEscorts, filters, updateFilters } = useEscorts();
  const { showInfo } = useNotifications();
  
  const handleRefresh = () => {
    fetchEscorts(true); // Force refresh
    if (showInfo) showInfo("Refreshing Data", "Getting the latest service providers");
  };
  
  const neuralStatus = escortsNeuralService.isEnabled() 
    ? `Neural processing active (${escortsNeuralService.getConfig().autonomyLevel}%)`
    : "Neural processing disabled";
  
  return (
    <>
      <Helmet>
        <title>Premium Adult Service Directory | Find Verified Companions</title>
        <meta name="description" content="Browse our premium directory of verified adult service providers. Find companions, content creators, and livecam performers." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Service Directory</h1>
                {escortsNeuralService.isEnabled() && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    Neural Enhanced
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Find companions, content creators, and live cam performers</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => updateFilters({ 
                  sortBy: filters.sortBy === 'recommended' ? 'rating' : 'recommended' 
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
              <EscortFilters 
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array(6).fill(0).map((_, i) => (
                    <div key={i} className="rounded-lg overflow-hidden">
                      <Skeleton className="w-full h-52" />
                      <div className="p-3">
                        <Skeleton className="w-2/3 h-5 mb-2" />
                        <Skeleton className="w-1/2 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <UnifiedServiceGrid 
                  providers={escorts}
                  isLoading={loading}
                />
              )}
              
              {!loading && escorts.length === 0 && !error && (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No escorts found matching your criteria</p>
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

export default Escorts;
