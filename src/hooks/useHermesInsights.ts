
import { useState, useEffect } from "react";
import { HermesInsight } from "@/types/seo";

// Mock data generator for insights
const generateMockInsights = (): HermesInsight[] => {
  const insights: HermesInsight[] = [];
  
  // SEO insights
  insights.push({
    id: 'ins-1',
    type: 'seo',
    title: 'Meta descriptions need improvement',
    description: 'Your escort profiles are missing optimized meta descriptions',
    priority: 'high',
    created: new Date().toISOString(),
    status: 'new',
    data: {
      affectedPages: 15,
      potentialImpact: 'high'
    },
    source: 'Hermes SEO Analysis'
  });
  
  // Traffic insights
  insights.push({
    id: 'ins-2',
    type: 'traffic',
    title: 'Traffic spike detected',
    description: 'Unusual traffic pattern detected from search engines',
    priority: 'medium',
    created: new Date().toISOString(),
    status: 'new',
    data: {
      increase: '45%',
      source: 'Google'
    },
    source: 'Traffic Analysis'
  });
  
  // Boost offer
  insights.push({
    id: 'ins-3',
    type: 'boost',
    title: 'Boost opportunity identified',
    description: 'Profile visibility can be improved with strategic boost',
    priority: 'medium',
    created: new Date().toISOString(),
    status: 'new',
    data: {
      boostOffer: {
        profileId: 'prof-123',
        recommendation: 'weekend-boost',
        potentialIncrease: '35%',
        cost: '25 credits',
        duration: '48 hours'
      }
    },
    source: 'Hermes Analytics'
  });
  
  return insights;
};

export const useHermesInsights = () => {
  const [insights, setInsights] = useState<HermesInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const refreshInsights = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const newInsights = generateMockInsights();
      setInsights(newInsights);
      setError('');
    } catch (err) {
      setError('Failed to fetch Hermes insights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter insights by type
  const getInsightsByType = (type: string): HermesInsight[] => {
    return insights.filter(insight => insight.type === type);
  };
  
  // Report user actions on insights
  const reportUserAction = (insightId: string, action: string) => {
    console.log(`User performed ${action} on insight ${insightId}`);
    // In a real app, this would send telemetry data
  };
  
  useEffect(() => {
    refreshInsights();
  }, []);
  
  return {
    insights,
    loading,
    error,
    refreshInsights,
    getInsightsByType,
    reportUserAction
  };
};
