
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/NotificationsContext";
import { escorts as mockEscorts, availableServices } from "@/data/escortData";
import { useHermesInsights } from "@/hooks/useHermesInsights";
import LucieSchaubergerIntegration from "@/components/home/LucieSchaubergerIntegration";
import { CircleHelp } from "lucide-react";
import { useEscorts } from "@/hooks/useEscorts";

const Escorts: React.FC = () => {
  const { user } = useAuth();
  const { escorts, loading, error, fetchEscorts } = useEscorts({ initialData: mockEscorts });
  const { showInfo } = useNotifications();
  const [showFilters, setShowFilters] = useState(false);
  
  // Connect to HERMES behavioral insights
  const { 
    insights, 
    recordElementInteraction,
    shouldEnableFeature 
  } = useHermesInsights(user?.id);
  
  // Determine if assistant should be shown based on behavioral insights
  const showLucieAssistant = shouldEnableFeature('ai_assistant');

  const handleRefresh = () => {
    fetchEscorts();
    if (showInfo) showInfo("Refreshing Data", "Getting the latest escort profiles");
    
    // Record refresh interaction
    if (user?.id) {
      recordElementInteraction('refresh-button', 'click');
    }
  };
  
  // Apply UI recommendations from behavioral insights
  const uiConfig = insights.autoDrive?.uiSuggestions || {};
  
  // Get content recommendations
  const contentRecommendations = insights.autoDrive?.contentRecommendations || [];
  const showHighlightedContent = contentRecommendations.some(
    (rec: any) => rec.type === 'visual' && rec.content === 'image_gallery'
  );
  
  useEffect(() => {
    // Check if we should show personalized content based on insights
    if (insights.emotionalPhase?.phase === 'desire' && insights.sensoryPreferences?.primary) {
      console.log("User is in desire phase with preference:", insights.sensoryPreferences.primary);
    }
  }, [insights]);
  
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
              services={availableServices}
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
