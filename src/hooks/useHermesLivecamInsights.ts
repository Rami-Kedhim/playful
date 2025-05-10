
import { useState, useEffect, useCallback } from 'react';
import { HermesInsight } from '@/types/core-systems';
import { hermes } from '@/core';

export const useHermesLivecamInsights = (livecamId?: string) => {
  const [insights, setInsights] = useState<HermesInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchInsights = useCallback(async () => {
    if (!livecamId) {
      setInsights([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Call the Hermes system to get insights
      const hermesInsights = await hermes.getInsights();
      setInsights(hermesInsights as HermesInsight[]);
    } catch (err: any) {
      console.error('Error fetching Hermes insights:', err);
      setError(err.message || 'Failed to fetch insights');
      setInsights([]);
    } finally {
      setLoading(false);
    }
  }, [livecamId]);
  
  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);
  
  const getPerformanceInsights = () => insights.filter(insight => insight.category === 'performance');
  const getViewerInsights = () => insights.filter(insight => insight.category === 'viewer');
  const getContentInsights = () => insights.filter(insight => insight.category === 'content');
  
  return {
    insights,
    loading,
    error,
    refreshInsights: fetchInsights,
    performanceInsights: getPerformanceInsights(),
    viewerInsights: getViewerInsights(),
    contentInsights: getContentInsights()
  };
};

export default useHermesLivecamInsights;
