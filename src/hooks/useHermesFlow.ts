
import { useState, useEffect } from 'react';
import { hermes } from '@/core/Hermes';

export interface UserJourneyInsights {
  totalSessions: number;
  averageDuration: number;
  commonPaths: {
    source: string;
    destination: string;
    count: number;
  }[];
  conversionRate?: number;
  bounceRate?: number;
}

export interface TrackEventOptions {
  event: string;
  props?: Record<string, any>;
  userId?: string;
}

export interface UseHermesFlowOptions {
  flowId?: string;
  userId?: string;
  autoConnect?: boolean;
}

export function useHermesFlow(flowIdOrOptions: string | UseHermesFlowOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [insights, setInsights] = useState<UserJourneyInsights>({
    totalSessions: 0,
    averageDuration: 0,
    commonPaths: [],
    conversionRate: 0,
    bounceRate: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Normalize options
  const options = typeof flowIdOrOptions === 'string'
    ? { flowId: flowIdOrOptions }
    : flowIdOrOptions;

  const { flowId = 'default', userId = 'anonymous', autoConnect = true } = options;

  useEffect(() => {
    if (autoConnect) {
      connectToFlow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowId, userId, autoConnect]);

  // Connect to the Hermes flow
  const connectToFlow = async () => {
    try {
      const connectionResult = await hermes.connect({
        system: 'HermesFlow',
        connectionId: flowId,
        userId,
        metadata: { timestamp: new Date().toISOString() }
      });

      setIsConnected(connectionResult.connected);
    } catch (error) {
      console.error('Failed to connect to Hermes flow:', error);
      setIsConnected(false);
    }
  };

  // Load user journey insights
  const loadInsights = async (timeRange: string = '7d') => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call the actual API
      // For now we'll simulate the response
      const mockInsights: UserJourneyInsights = {
        totalSessions: Math.floor(Math.random() * 100) + 50,
        averageDuration: Math.floor(Math.random() * 600) + 120,
        commonPaths: [
          { source: '/home', destination: '/profiles', count: 45 },
          { source: '/profiles', destination: '/messages', count: 32 },
          { source: '/home', destination: '/search', count: 28 }
        ],
        conversionRate: Math.random() * 0.15 + 0.05,
        bounceRate: Math.random() * 0.4 + 0.2
      };
      
      setInsights(mockInsights);
      return mockInsights;
    } catch (error) {
      console.error('Failed to load user journey insights:', error);
      return insights;
    } finally {
      setIsLoading(false);
    }
  };

  // Track an event within the flow
  const trackEvent = (options: TrackEventOptions) => {
    if (!isConnected) {
      console.warn('Cannot track event: not connected to Hermes flow');
      return false;
    }

    try {
      hermes.track({
        event: options.event,
        properties: options.props || {},
        userId: options.userId || userId,
        timestamp: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Failed to track Hermes event:', error);
      return false;
    }
  };

  // Track a step in the flow
  const trackStep = (step: string, data?: Record<string, any>) => {
    return trackEvent({
      event: `flow_step_${step}`,
      props: {
        flowId,
        step,
        ...data
      },
      userId
    });
  };

  // Get recommended action for the user
  const getRecommendedAction = async (userId: string, context?: Record<string, any>) => {
    try {
      // In a real implementation, this would call the actual API
      // For now we'll simulate the response
      const recommendations = [
        "Check out our newly verified profiles",
        "Update your preferences to see more relevant profiles",
        "Complete your profile to get better matches",
        "Explore our premium features for enhanced experience",
        "Try our AI companion for personalized recommendations"
      ];
      
      // Return a pseudo-random but consistent recommendation based on userId
      const userIdSum = userId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const recommendationIndex = userIdSum % recommendations.length;
      
      return recommendations[recommendationIndex];
    } catch (error) {
      console.error('Failed to get recommended action:', error);
      return "Explore our featured profiles to discover new connections.";
    }
  };

  return {
    isConnected,
    trackEvent,
    insights,
    loadInsights,
    isLoading,
    trackStep,
    getRecommendedAction
  };
}

export default useHermesFlow;
