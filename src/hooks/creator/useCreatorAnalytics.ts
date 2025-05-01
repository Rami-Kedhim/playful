
import { useState, useEffect } from 'react';

export interface AnalyticsData {
  views: number;
  earnings: number;
  subscribers: number;
  contentCount: number;
  viewsByDay: { date: string; count: number }[];
  earningsByDay: { date: string; amount: number }[];
  topContent: { id: string; title: string; views: number; earnings: number }[];
}

export const useCreatorAnalytics = (creatorId?: string, period: string = 'week') => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!creatorId) return;
      
      setLoading(true);
      
      try {
        // Mock data - would be fetched from API in real implementation
        const mockData: AnalyticsData = {
          views: 12458,
          earnings: 1245.80,
          subscribers: 320,
          contentCount: 48,
          viewsByDay: [
            { date: '2025-04-24', count: 1250 },
            { date: '2025-04-25', count: 1800 },
            { date: '2025-04-26', count: 1950 },
            { date: '2025-04-27', count: 1600 },
            { date: '2025-04-28', count: 1750 },
            { date: '2025-04-29', count: 2100 },
            { date: '2025-04-30', count: 1900 },
          ],
          earningsByDay: [
            { date: '2025-04-24', amount: 125.50 },
            { date: '2025-04-25', amount: 180.00 },
            { date: '2025-04-26', amount: 195.00 },
            { date: '2025-04-27', amount: 160.00 },
            { date: '2025-04-28', amount: 175.00 },
            { date: '2025-04-29', amount: 210.00 },
            { date: '2025-04-30', amount: 190.00 },
          ],
          topContent: [
            { id: 'content-1', title: 'Premium Video 1', views: 2450, earnings: 245.00 },
            { id: 'content-2', title: 'Photo Gallery 3', views: 1850, earnings: 185.00 },
            { id: 'content-3', title: 'Private Stream Recording', views: 1650, earnings: 330.00 },
            { id: 'content-4', title: 'Behind the Scenes', views: 1250, earnings: 125.00 },
            { id: 'content-5', title: 'Q&A Session', views: 950, earnings: 95.00 },
          ]
        };
        
        setData(mockData);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [creatorId, period]);
  
  const refetch = async () => {
    setLoading(true);
    setError(null);
    
    // Re-fetch logic (same as above for demo)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        views: Math.floor(Math.random() * 5000) + 10000,
        earnings: parseFloat((Math.random() * 1000 + 1000).toFixed(2)),
        subscribers: Math.floor(Math.random() * 200) + 200,
        contentCount: Math.floor(Math.random() * 20) + 40,
        viewsByDay: [
          { date: '2025-04-24', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-25', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-26', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-27', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-28', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-29', count: Math.floor(Math.random() * 500) + 1000 },
          { date: '2025-04-30', count: Math.floor(Math.random() * 500) + 1000 },
        ],
        earningsByDay: [
          { date: '2025-04-24', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-25', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-26', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-27', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-28', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-29', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { date: '2025-04-30', amount: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
        ],
        topContent: [
          { id: 'content-1', title: 'Premium Video 1', views: Math.floor(Math.random() * 1000) + 1500, earnings: parseFloat((Math.random() * 100 + 150).toFixed(2)) },
          { id: 'content-2', title: 'Photo Gallery 3', views: Math.floor(Math.random() * 1000) + 1000, earnings: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { id: 'content-3', title: 'Private Stream Recording', views: Math.floor(Math.random() * 1000) + 1000, earnings: parseFloat((Math.random() * 100 + 100).toFixed(2)) },
          { id: 'content-4', title: 'Behind the Scenes', views: Math.floor(Math.random() * 1000) + 500, earnings: parseFloat((Math.random() * 100 + 50).toFixed(2)) },
          { id: 'content-5', title: 'Q&A Session', views: Math.floor(Math.random() * 500) + 500, earnings: parseFloat((Math.random() * 50 + 50).toFixed(2)) },
        ]
      };
      
      setData(mockData);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh analytics data');
    } finally {
      setLoading(false);
    }
  };
  
  return { data, loading, error, refetch };
};

export default useCreatorAnalytics;
