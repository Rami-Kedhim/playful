
import { useState, useEffect, useCallback } from 'react';
import { hermes } from '@/core';
import { HermesInsight } from '@/types/core-systems';

export interface LivecamInsight {
  id: string;
  title: string;
  description: string;
  category?: string;
  value?: number;
  trend?: 'up' | 'down' | 'flat';
  priority: number;
}

export const useHermesLivecamInsights = (streamId: string) => {
  const [insights, setInsights] = useState<LivecamInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchInsights = useCallback(async () => {
    if (!streamId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Get insights from Hermes
      const hermesInsights = await hermes.getInsights();
      
      // Map Hermes insights to our format and filter for livecam
      const livecamInsights = hermesInsights
        .filter(insight => {
          // Add a type check or default value for category
          const category = insight.type || '';
          return category.includes('livecam') || category.includes('stream');
        })
        .map(insight => ({
          id: insight.id,
          title: insight.title,
          description: insight.description,
          category: insight.type,
          priority: insight.priority,
          value: insight.metadata?.value,
          trend: insight.metadata?.trend
        }));
      
      setInsights(livecamInsights);
      setError(null);
    } catch (err) {
      console.error('Error fetching Hermes insights:', err);
      setError('Failed to load insights');
    } finally {
      setLoading(false);
    }
  }, [streamId]);
  
  useEffect(() => {
    fetchInsights();
    
    // Refresh insights every 5 minutes
    const interval = setInterval(fetchInsights, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchInsights]);
  
  return { insights, loading, error, refreshInsights: fetchInsights };
};

export default useHermesLivecamInsights;
