
import { useState, useEffect } from 'react';

export interface EscortAnalytics {
  views: {
    total: number;
    weekly: number[];
    change: number;
  };
  bookings: {
    total: number;
    weekly: number[];
    change: number;
    completionRate: number;
  };
  revenue: {
    total: number;
    weekly: number[];
    change: number;
    averagePerBooking: number;
  };
  ranking: {
    position: number;
    previousPosition: number;
    change: number;
  };
  engagement: {
    messageRate: number;
    responseTime: number; // in minutes
    clientRetention: number; // percentage
  };
  popularServices: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
}

export const useEscortProfileAnalytics = (escortId?: string) => {
  const [analytics, setAnalytics] = useState<EscortAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate random weekly data (7 days)
        const generateWeeklyData = (base: number, variance: number) => {
          return Array(7).fill(0).map(() => 
            Math.floor(base + (Math.random() * variance * 2) - variance)
          );
        };
        
        const viewsWeekly = generateWeeklyData(50, 20);
        const bookingsWeekly = generateWeeklyData(3, 2);
        const revenueWeekly = bookingsWeekly.map(bookings => bookings * 300 + Math.floor(Math.random() * 200));
        
        // Calculate changes
        const viewsChange = Math.floor((viewsWeekly[6] - viewsWeekly[0]) / viewsWeekly[0] * 100);
        const bookingsChange = bookingsWeekly[6] - bookingsWeekly[0] > 0 ? 15 : -10;
        const revenueChange = revenueWeekly[6] - revenueWeekly[0] > 0 ? 12 : -5;
        
        const mockAnalytics: EscortAnalytics = {
          views: {
            total: viewsWeekly.reduce((a, b) => a + b, 0),
            weekly: viewsWeekly,
            change: viewsChange
          },
          bookings: {
            total: bookingsWeekly.reduce((a, b) => a + b, 0),
            weekly: bookingsWeekly,
            change: bookingsChange,
            completionRate: 92
          },
          revenue: {
            total: revenueWeekly.reduce((a, b) => a + b, 0),
            weekly: revenueWeekly,
            change: revenueChange,
            averagePerBooking: 320
          },
          ranking: {
            position: 12,
            previousPosition: 15,
            change: 3
          },
          engagement: {
            messageRate: 78,
            responseTime: 25,
            clientRetention: 70
          },
          popularServices: [
            {
              id: '1',
              name: 'Standard Date',
              bookings: 8,
              revenue: 2400
            },
            {
              id: '6',
              name: 'Erotic Massage',
              bookings: 6,
              revenue: 1500
            },
            {
              id: '3',
              name: 'Overnight',
              bookings: 2,
              revenue: 2400
            }
          ]
        };
        
        setAnalytics(mockAnalytics);
        setError(null);
      } catch (err) {
        console.error('Error fetching escort analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [escortId, timeframe]);
  
  const refresh = () => {
    setLoading(true);
    // Re-fetch analytics...
  };
  
  return {
    analytics,
    loading,
    error,
    timeframe,
    setTimeframe,
    refresh
  };
};

export default useEscortProfileAnalytics;
