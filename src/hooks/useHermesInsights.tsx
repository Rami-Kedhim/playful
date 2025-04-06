
/**
 * Hook for accessing HERMES intelligence in React components
 * This manages the state and interaction with the HERMES API
 */
import { useState, useCallback, useEffect } from "react";
import hermesApiService, { HermesResponse, HermesUserAction } from "@/services/hermes/HermesApiService";

export interface HermesInsight {
  isLucieEnabled: boolean;
  recommendedProfileId?: string;
  boostOffer?: {
    value: string;
    expires: string;
  };
  vrEvent?: string;
  isLoading: boolean;
  error?: string;
}

export function useHermesInsights(userId?: string) {
  const [insights, setInsights] = useState<HermesInsight>({
    isLucieEnabled: false,
    isLoading: false
  });
  
  /**
   * Report a user action to HERMES and get insights
   */
  const reportUserAction = useCallback(async (
    action: string,
    options?: {
      category?: string,
      location?: string,
      sessionTime?: number
    }
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
        category: options?.category,
        location: options?.location,
        session_time: options?.sessionTime
      };
      
      // Get response from HERMES
      const response = await hermesApiService.analyzeUserAction(actionData);
      
      // Update insights from response
      setInsights({
        isLucieEnabled: response.trigger_luxlife,
        recommendedProfileId: response.recommended_profile,
        boostOffer: response.boost_offer,
        vrEvent: response.vr_event,
        isLoading: false
      });
      
    } catch (error) {
      console.error('Error getting HERMES insights:', error);
      setInsights(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to get HERMES insights' 
      }));
    }
  }, [userId]);

  /**
   * Record profile view in HERMES
   */
  const recordProfileView = useCallback((profileId: string, sessionTime?: number) => {
    return reportUserAction('viewed_profile', { 
      category: 'profile', 
      sessionTime
    });
  }, [reportUserAction]);
  
  /**
   * Record favorites action in HERMES
   */
  const recordFavorite = useCallback((profileId: string) => {
    return reportUserAction('selected_favorite', { category: 'profile' });
  }, [reportUserAction]);
  
  /**
   * Record boost request in HERMES
   */
  const recordBoostRequest = useCallback(() => {
    return reportUserAction('requested_boost');
  }, [reportUserAction]);

  return {
    insights,
    reportUserAction,
    recordProfileView,
    recordFavorite,
    recordBoostRequest
  };
}

export default useHermesInsights;
