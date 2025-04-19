
import { useState, useEffect } from 'react';

interface HermesInsight {
  id: string;
  title: string;
  description: string;
  score: number;
  type: 'seo' | 'engagement' | 'conversion' | 'technical';
  timestamp: string;
}

export function useHermesInsights(userId?: string) {
  const [insights, setInsights] = useState<HermesInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadInsights();
  }, [userId]);
  
  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockInsights: HermesInsight[] = [
        {
          id: '1',
          title: 'SEO Improvement Opportunity',
          description: 'Adding more specific keywords could improve visibility.',
          score: 85,
          type: 'seo',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Engagement Optimization',
          description: 'Adding more call-to-action elements could improve conversion rates.',
          score: 72,
          type: 'engagement',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Technical Optimization',
          description: 'Image compression could improve load times by up to 25%.',
          score: 65,
          type: 'technical',
          timestamp: new Date().toISOString()
        }
      ];
      
      setInsights(mockInsights);
    } catch (err: any) {
      setError(err.message || 'Failed to load HERMES insights');
    } finally {
      setLoading(false);
    }
  };
  
  const getInsightsByType = (type: string): HermesInsight[] => {
    return insights.filter(insight => insight.type === type);
  };

  return {
    insights,
    getInsightsByType,
    loading,
    error,
    refreshInsights: loadInsights
  };
}
