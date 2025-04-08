
import React from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { EscortsModule } from "@/modules/escorts/EscortsModule";
import { useEscortContext } from "@/modules/escorts/providers/EscortProvider";
import MainLayout from "@/components/layout/MainLayout";
import EscortGrid from "@/components/escorts/EscortGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Settings, SlidersHorizontal } from "lucide-react";
import { escortsNeuralService } from "@/services/neural/modules/EscortsNeuralService";

const Escorts: React.FC = () => {
  return (
    <EscortsModule>
      <EscortPageContent />
    </EscortsModule>
  );
};

const EscortPageContent: React.FC = () => {
  const { state, loadEscorts, updateFilters } = useEscortContext();
  const { showInfo } = useNotifications();
  
  const handleRefresh = () => {
    loadEscorts(true); // Force refresh with neural processing
    if (showInfo) showInfo("Refreshing Data", "Getting the latest escorts");
  };
  
  const neuralStatus = escortsNeuralService.isEnabled() 
    ? `Neural processing active (${escortsNeuralService.getConfig().autonomyLevel}%)`
    : "Neural processing disabled";
  
  return (
    <>
      <Helmet>
        <title>Premium Escorts | Find Your Perfect Companion</title>
        <meta name="description" content="Browse our curated selection of premium escorts. Find your perfect companion for any occasion." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">Escorts</h1>
                {escortsNeuralService.isEnabled() && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center">
                    <Brain className="h-3 w-3 mr-1" />
                    Neural Enhanced
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Find your perfect companion</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => updateFilters({ 
                  location: state.filters.location === 'global' ? '' : 'global' 
                })}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {state.filters.location === 'global' ? 'Local' : 'Global'} Search
              </Button>
              <Button onClick={handleRefresh} disabled={state.isLoading}>
                {state.isLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
          
          <EscortGrid 
            escorts={state.escorts} 
            loading={state.isLoading}
            error={state.error}
          />
          
          <div className="mt-4 text-xs text-muted-foreground">
            {neuralStatus}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Escorts;
