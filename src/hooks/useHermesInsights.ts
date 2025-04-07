
import { useState, useEffect } from 'react';
import { hermesApiService } from '@/services/hermes/HermesApiService';

export interface HermesInsights {
  isLucieEnabled: boolean;
  recommendedProfileId?: string;
  recommendedCompanionId?: string;
  boostOffer?: {
    value: string;
    expires: string;
  };
  vrEvent?: string;
  aiSuggestion?: {
    message: string;
    confidence: number;
  };
}

export const useHermesInsights = (userId?: string) => {
  const [insights, setInsights] = useState<HermesInsights>({
    isLucieEnabled: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize insights when component mounts
  useEffect(() => {
    if (!userId) return;
    
    const loadInsights = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await hermesApiService.analyzeUserAction({
          user_id: userId,
          action: 'page_load',
          interaction_data: {
            referrer: document.referrer,
            pathname: window.location.pathname,
          }
        });
        
        // Process HERMES response into insights
        setInsights({
          isLucieEnabled: response.trigger_luxlife || false,
          recommendedProfileId: response.recommended_profile,
          recommendedCompanionId: response.recommended_companion_id,
          boostOffer: response.boost_offer,
          vrEvent: response.vr_event,
          aiSuggestion: response.ai_suggestion
        });
      } catch (err: any) {
        console.error('Error loading HERMES insights:', err);
        setError(err.message || 'Failed to load insights');
      } finally {
        setLoading(false);
      }
    };
    
    loadInsights();
  }, [userId]);
  
  // Report user action to HERMES
  const reportUserAction = async (action: string, category?: string, data?: Record<string, any>) => {
    if (!userId) return;
    
    try {
      const response = await hermesApiService.analyzeUserAction({
        user_id: userId,
        action,
        category,
        interaction_data: data
      });
      
      // Update insights with any new HERMES information
      setInsights(prev => ({
        ...prev,
        isLucieEnabled: response.trigger_luxlife || prev.isLucieEnabled,
        recommendedProfileId: response.recommended_profile || prev.recommendedProfileId,
        recommendedCompanionId: response.recommended_companion_id || prev.recommendedCompanionId,
        boostOffer: response.boost_offer || prev.boostOffer,
        vrEvent: response.vr_event || prev.vrEvent,
        aiSuggestion: response.ai_suggestion || prev.aiSuggestion
      }));
      
      return response;
    } catch (err) {
      console.error('Error reporting user action to HERMES:', err);
      return null;
    }
  };
  
  // Get AI companion recommendations
  const getAICompanionRecommendations = async () => {
    if (!userId) return [];
    
    try {
      const response = await hermesApiService.getCompanionRecommendations(userId);
      return response.recommendations || [];
    } catch (err) {
      console.error('Error getting companion recommendations:', err);
      return [];
    }
  };

  return {
    insights,
    loading,
    error,
    reportUserAction,
    getAICompanionRecommendations
  };
};

export default useHermesInsights;
