
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { availableServices } from "@/data/escortData";
import LucieSchaubergerIntegration from "@/components/home/LucieSchaubergerIntegration";
import { useEscortWithInsights } from "@/hooks/useEscortWithInsights";
import { escorts as mockEscorts } from "@/data/escortData";
import { getProfessionalServices } from "@/utils/serviceCategories";

const Escorts: React.FC = () => {
  const { 
    escorts, 
    loading, 
    error, 
    fetchEscorts, 
    recordEscortView,
    insights 
  } = useEscortWithInsights({ initialData: mockEscorts });
  
  const { showInfo } = useNotifications();
  const [showFilters, setShowFilters] = useState(false);
  
  // Ensure data is loaded on initial render
  useEffect(() => {
    if (!escorts || escorts.length === 0) {
      fetchEscorts();
    }
  }, [escorts, fetchEscorts]);
  
  // Filter services to only show professional ones
  const professionalServices = getProfessionalServices(availableServices);
  
  // Determine if assistant should be shown based on behavioral insights
  const showLucieAssistant = insights?.autoDrive?.isLucieEnabled || false;

  const handleRefresh = () => {
    fetchEscorts();
    if (showInfo) showInfo("Refreshing Data", "Getting the latest escort profiles");
  };
  
  // Apply UI recommendations from behavioral insights
  const uiConfig = insights?.autoDrive?.uiSuggestions || {};
  
  // Get content recommendations
  const contentRecommendations = insights?.autoDrive?.contentRecommendations || [];
  const showHighlightedContent = contentRecommendations.some(
    (rec: any) => rec.type === 'visual' && rec.content === 'image_gallery'
  );
  
  return (
    <>
      <Helmet>
        <title>Premium Escort Directory | Find Verified Escorts</title>
        <meta name="description" content="Browse our premium directory of verified escort services. Find the perfect companion with advanced filtering options." />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Escort Directory</h1>
            <Button onClick={handleRefresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
          
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
          ) : (
            <EscortContainer 
              escorts={escorts}
              services={professionalServices}
              isLoading={loading}
              // Pass behavioral insights to allow personalization
              highlightVisual={showHighlightedContent}
              callToActionStyle={uiConfig.callToActionVisibility || 'standard'}
            />
          )}
        </div>
        
        {/* Display Lucie assistant when behavioral system suggests it */}
        {showLucieAssistant && (
          <LucieSchaubergerIntegration 
            onLucieTriggered={(reason) => {
              console.log("Lucie triggered by:", reason);
            }}
          />
        )}
      </MainLayout>
    </>
  );
};

export default Escorts;
