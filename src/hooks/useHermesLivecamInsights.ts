
import { useEffect, useState } from 'react';
import { HermesInsight } from '@/types/core-systems';

// Mock data for insights
const mockInsights = [
  {
    id: '1',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    category: 'performance',
    content: 'Your cam sessions have shown a 15% increase in engagement over the last week.',
    confidence: 0.85,
    metadata: { type: 'performance' }
  },
  {
    id: '2',
    timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
    category: 'optimization',
    content: 'Consider scheduling more sessions during 8-10 PM EST, when your audience is most active.',
    confidence: 0.92,
    metadata: { type: 'scheduling' }
  },
  {
    id: '3',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    category: 'content',
    content: 'Your themed sessions are generating 3x more tips than regular sessions.',
    confidence: 0.78,
    metadata: { type: 'content' }
  }
] as HermesInsight[];

export const useHermesLivecamInsights = (profileId?: string) => {
  const [insights, setInsights] = useState<HermesInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      // In a real app, this would make an API call
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        setInsights(mockInsights);
        setLoading(false);
      }, 800);
    };

    if (profileId) {
      fetchInsights();
    }
  }, [profileId]);

  const getPerformanceInsights = () => {
    return insights.filter(insight => insight.metadata?.type === 'performance');
  };

  const getSchedulingInsights = () => {
    return insights.filter(insight => insight.metadata?.type === 'scheduling');
  };

  const getContentInsights = () => {
    return insights.filter(insight => insight.metadata?.type === 'content');
  };

  return {
    insights,
    loading,
    getPerformanceInsights,
    getSchedulingInsights,
    getContentInsights
  };
};
