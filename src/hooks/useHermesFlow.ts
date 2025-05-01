
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hermes } from '@/core/Hermes';
import { useAuth } from '@/hooks/auth';

/**
 * Hook for interacting with the Hermes flow system
 * Tracks user navigation and provides insights from the journey
 */
export function useHermesFlow() {
  const location = useLocation();
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  // Track page views automatically
  useEffect(() => {
    const currentPath = location.pathname;
    const connectionId = `page-view-${Date.now()}`;
    
    hermes.connect({
      system: 'WebApp',
      connectionId,
      metadata: {
        path: currentPath,
        timestamp: new Date().toISOString()
      },
      userId
    });

    // Don't route on first render, just connect
  }, [location.pathname, userId]);

  // Track navigation between pages
  useEffect(() => {
    // Skip on first render
    return () => {
      const previousPath = location.pathname;
      const newPath = window.location.pathname;
      
      if (previousPath !== newPath) {
        hermes.routeFlow({
          source: previousPath,
          destination: newPath,
          params: {
            userId,
            timestamp: new Date().toISOString()
          }
        });
      }
    };
  }, [location.pathname, userId]);
  
  // Manually track an event
  const trackEvent = useCallback((eventName: string, metadata?: Record<string, any>) => {
    const connectionId = `event-${eventName}-${Date.now()}`;
    
    hermes.connect({
      system: eventName,
      connectionId,
      metadata,
      userId
    });
  }, [userId]);
  
  // Get recommended next action based on user journey
  const getRecommendedAction = useCallback(() => {
    return hermes.recommendNextAction(userId);
  }, [userId]);
  
  // Get visibility score for a profile
  const getVisibilityScore = useCallback((profileId: string) => {
    return hermes.calculateVisibilityScore(profileId);
  }, []);
  
  // Get journey insights for current user
  const getJourneyInsights = useCallback(() => {
    return hermes.getUserJourneyInsights(userId);
  }, [userId]);

  return {
    trackEvent,
    getRecommendedAction,
    getVisibilityScore,
    getJourneyInsights
  };
}

export default useHermesFlow;
