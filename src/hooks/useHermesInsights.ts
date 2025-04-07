
import { useState, useEffect, useCallback } from 'react';
import hermesOxumIntegration from '@/services/integration/HermesOxumIntegration';
import { useLocation } from 'react-router-dom';

/**
 * Hook to connect UI components with the HERMES-OXUM integration system
 * Automatically drives UI components based on behavioral insights
 */
export const useHermesInsights = (userId?: string) => {
  const [insights, setInsights] = useState<any>({
    sensoryPreferences: {},
    emotionalPhase: {},
    chaseHughesProfile: {},
    autoDrive: {
      recommendedStrategy: 'information_providing',
      contentRecommendations: [],
      uiSuggestions: {},
      isLucieEnabled: false,
      recommendedActions: []
    }
  });
  
  const location = useLocation();
  
  // Initialize page tracking
  useEffect(() => {
    if (!userId) return;
    
    // Track page view on mount and route change
    const endTracking = hermesOxumIntegration.trackPageView(
      userId, 
      location.pathname
    );
    
    // End tracking when component unmounts or route changes
    return endTracking;
  }, [userId, location.pathname]);
  
  // Register for insights updates
  useEffect(() => {
    if (!userId) return;
    
    // Initialize HERMES-OXUM integration
    hermesOxumIntegration.initialize();
    
    // Observer function to receive updates
    const insightsObserver = (updatedInsights: any) => {
      setInsights(updatedInsights);
    };
    
    // Register the observer
    hermesOxumIntegration.addObserver(insightsObserver);
    
    // Get initial insights
    const initialInsights = hermesOxumIntegration.generateUserInsights(userId);
    setInsights(initialInsights);
    
    // Clean up observer when component unmounts
    return () => {
      hermesOxumIntegration.removeObserver(insightsObserver);
    };
  }, [userId]);
  
  /**
   * Record user interaction with specific element
   */
  const recordElementInteraction = useCallback((
    elementId: string, 
    interactionType: string, 
    data?: any
  ) => {
    if (!userId) return;
    
    hermesOxumIntegration.processUserInteraction(
      userId, 
      interactionType, 
      { 
        element: elementId, 
        ...data 
      }
    );
  }, [userId]);
  
  /**
   * Record user message interaction
   */
  const recordMessageInteraction = useCallback((content: string) => {
    if (!userId) return;
    
    hermesOxumIntegration.processUserInteraction(
      userId, 
      'message', 
      { content }
    );
  }, [userId]);
  
  /**
   * Record user interaction with AI companion
   */
  const recordAICompanionInteraction = useCallback((
    companionId: string, 
    messageCount: number, 
    additionalData?: any
  ) => {
    if (!userId) return;
    
    hermesOxumIntegration.processUserInteraction(
      userId, 
      'ai_companion', 
      { 
        companionId,
        messageCount,
        ...additionalData
      }
    );
  }, [userId]);
  
  /**
   * Record boost request in HERMES
   */
  const recordBoostRequest = useCallback(() => {
    if (!userId) return;
    
    hermesOxumIntegration.processUserInteraction(
      userId, 
      'requested_boost',
      {}
    );
  }, [userId]);
  
  /**
   * Generic method to report any user action
   */
  const reportUserAction = useCallback((
    action: string,
    options?: {
      category?: string,
      location?: string,
      sessionTime?: number,
      interactionData?: Record<string, any>
    }
  ) => {
    if (!userId) {
      console.warn('Cannot report to HERMES: missing userId');
      return;
    }
    
    hermesOxumIntegration.processUserInteraction(
      userId, 
      action, 
      options || {}
    );
  }, [userId]);
  
  /**
   * Get the optimal UI configuration based on insights
   */
  const getOptimalUIConfig = useCallback(() => {
    return insights.autoDrive?.uiSuggestions || {
      colorScheme: 'default',
      layoutDensity: 'medium',
      animationLevel: 'medium',
      contentFocus: 'balanced',
      callToActionVisibility: 'standard'
    };
  }, [insights]);
  
  /**
   * Get personalized content recommendations
   */
  const getContentRecommendations = useCallback(() => {
    return insights.autoDrive?.contentRecommendations || [];
  }, [insights]);
  
  /**
   * Check if a specific feature should be enabled
   */
  const shouldEnableFeature = useCallback((featureId: string): boolean => {
    // Determine feature availability based on user's state
    switch (featureId) {
      case 'premium_content':
        return insights.emotionalPhase?.phase === 'desire' || 
               insights.emotionalPhase?.phase === 'action' ||
               insights.emotionalPhase?.phase === 'loyalty';
      
      case 'ai_assistant':
        return insights.autoDrive?.isLucieEnabled || false;
      
      case 'special_offers':
        return insights.emotionalPhase?.phase === 'desire' && 
               insights.emotionalPhase?.progress > 50;
      
      case 'advanced_features':
        return insights.chaseHughesProfile?.trustScore > 70;
        
      default:
        return false;
    }
  }, [insights]);
  
  return {
    insights,
    recordElementInteraction,
    recordMessageInteraction,
    recordAICompanionInteraction,
    recordBoostRequest,
    reportUserAction,
    getOptimalUIConfig,
    getContentRecommendations,
    shouldEnableFeature
  };
};

export default useHermesInsights;
