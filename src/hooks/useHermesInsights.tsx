
/**
 * Hook for accessing HERMES intelligence in React components
 * This manages the state and interaction with the HERMES API
 * Enhanced with AI companion recommendations
 */
import { useState, useCallback, useEffect } from "react";
import hermesApiService, { HermesResponse, HermesUserAction } from "@/services/hermes/HermesApiService";

export interface HermesInsight {
  isLucieEnabled: boolean;
  recommendedProfileId?: string;
  recommendedCompanionId?: string;
  boostOffer?: {
    value: string;
    expires: string;
  };
  vrEvent?: string;
  isLoading: boolean;
  error?: string;
  aiSuggestion?: {
    message: string;
    confidence: number;
  };
}

export function useHermesInsights(userId?: string) {
  const [insights, setInsights] = useState<HermesInsight>({
    isLucieEnabled: false,
    isLoading: false
  });
  
  /**
   * Report a user action to HERMES and get insights
   * Now includes AI companion recommendations
   */
  const reportUserAction = useCallback(async (
    action: string,
    category?: string,
    data?: Record<string, any>
  ) => {
    if (!userId) {
      console.warn('Cannot report to HERMES: missing userId');
      return;
    }
    
    try {
      setInsights(prev => ({ ...prev, isLoading: true }));
      
      // Prepare action data
      const actionData: HermesUserAction = {
        user_id: userId,
        action,
        category,
        interaction_data: data // New field for more context
      };
      
      // Get response from HERMES
      const response = await hermesApiService.analyzeUserAction(actionData);
      
      // Update insights from response
      setInsights({
        isLucieEnabled: response.trigger_luxlife,
        recommendedProfileId: response.recommended_profile,
        recommendedCompanionId: response.recommended_companion_id, // New AI companion recommendation
        boostOffer: response.boost_offer,
        vrEvent: response.vr_event,
        aiSuggestion: response.ai_suggestion, // New AI suggestion
        isLoading: false
      });
      
      return response;
    } catch (error) {
      console.error('Error getting HERMES insights:', error);
      setInsights(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to get HERMES insights' 
      }));
      return null;
    }
  }, [userId]);

  /**
   * Record profile view in HERMES
   */
  const recordProfileView = useCallback((profileId: string, sessionTime?: number) => {
    return reportUserAction('viewed_profile', 'profile', { 
      sessionTime 
    });
  }, [reportUserAction]);
  
  /**
   * Record favorites action in HERMES
   */
  const recordFavorite = useCallback((profileId: string) => {
    return reportUserAction('selected_favorite', 'profile');
  }, [reportUserAction]);
  
  /**
   * Record boost request in HERMES
   */
  const recordBoostRequest = useCallback(() => {
    return reportUserAction('requested_boost');
  }, [reportUserAction]);
  
  /**
   * Record AI companion interaction in HERMES
   * New method to track AI companion interactions
   */
  const recordAICompanionInteraction = useCallback((companionId: string, messageCount: number, interactionData?: Record<string, any>) => {
    return reportUserAction('ai_companion_interaction', 'ai_companion', {
      location: companionId,
      sessionTime: messageCount,
      ...interactionData
    });
  }, [reportUserAction]);
  
  /**
   * Get AI companion recommendations based on user profile
   */
  const getAICompanionRecommendations = useCallback(async () => {
    if (!userId) {
      console.warn('Cannot get AI recommendations: missing userId');
      return [];
    }
    
    try {
      setInsights(prev => ({ ...prev, isLoading: true }));
      
      // Get recommendations from HERMES
      const response = await hermesApiService.getCompanionRecommendations(userId);
      
      setInsights(prev => ({ 
        ...prev,
        isLoading: false
      }));
      
      return response.recommendations || [];
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      setInsights(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to get AI companion recommendations' 
      }));
      
      return [];
    }
  }, [userId]);

  return {
    insights,
    reportUserAction,
    recordProfileView,
    recordFavorite,
    recordBoostRequest,
    recordAICompanionInteraction, // New method
    getAICompanionRecommendations // New method
  };
}

export default useHermesInsights;
