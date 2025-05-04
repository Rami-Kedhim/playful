
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { hermes } from '@/core/Hermes';
import { UserJourneyInsights } from '@/types/core-systems';

interface UseHermesFlowOptions {
  userId: string;
  trackPageChanges?: boolean;
  trackEvents?: boolean;
}

interface TrackEventOptions {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export function useHermesFlow(options: UseHermesFlowOptions) {
  const { userId, trackPageChanges = true, trackEvents = true } = options;
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [insights, setInsights] = useState<UserJourneyInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Connect to Hermes on mount
  useEffect(() => {
    const connectionId = `user-${userId}-${Date.now()}`;
    
    hermes.connect({
      connectionId,
      system: 'web-client',
      userId,
      metadata: {
        initialPath: location.pathname,
        timestamp: new Date().toISOString()
      }
    });
    
    setIsConnected(true);
    
    // Clean up on unmount
    return () => {
      setIsConnected(false);
    };
  }, [userId]);

  // Track page changes
  useEffect(() => {
    if (!trackPageChanges || !isConnected) return;
    
    const currentPath = location.pathname;
    
    // Don't track the initial page load as a navigation
    if (previousPath !== null) {
      hermes.routeFlow({
        source: previousPath,
        destination: currentPath,
        params: {
          userId,
          timestamp: new Date().toISOString()
        }
      });
    }
    
    // Update previous path
    setPreviousPath(currentPath);
  }, [location.pathname, previousPath, userId, trackPageChanges, isConnected]);

  // Track custom events
  const trackEvent = useCallback((options: TrackEventOptions) => {
    if (!trackEvents || !isConnected) return;
    
    const { category, action, label, value } = options;
    
    const connectionId = `event-${userId}-${Date.now()}`;
    hermes.connect({
      connectionId,
      system: category,
      userId,
      metadata: {
        action,
        label,
        value,
        path: location.pathname,
        timestamp: new Date().toISOString()
      }
    });
  }, [userId, trackEvents, isConnected, location.pathname]);

  // Function to load user journey insights
  const loadInsights = useCallback(async (timeRange?: string) => {
    if (!userId) return null;
    
    setIsLoading(true);
    
    try {
      // Get insights for this user
      const userInsights = hermes.getUserJourneyInsights(userId, timeRange);
      setInsights(userInsights);
      return userInsights;
    } catch (error) {
      console.error("Error loading user journey insights:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    isConnected,
    trackEvent,
    insights,
    loadInsights,
    isLoading
  };
}

export default useHermesFlow;
