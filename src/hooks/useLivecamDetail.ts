
import { useState, useEffect } from 'react';
import { oxum } from '@/core/Oxum';

interface LivecamModel {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  tags: string[];
  categories: string[];
  type: string;
  rating: number;
  viewCount: number;
  description: string;
  isOnline: boolean;
  pricePerMinute: number;
  country: string;
  languages: string[];
  category?: string; // Legacy field
}

interface LivecamStats {
  viewers: number;
  likes: number;
  followCount: number;
  uptime: number; // in minutes
}

interface LivecamBoostStatus {
  isActive: boolean;
  remainingTime?: number;
  boostLevel?: number;
  expiration?: Date;
}

export function useLivecamDetail(livecamId: string) {
  const [livecam, setLivecam] = useState<LivecamModel | null>(null);
  const [stats, setStats] = useState<LivecamStats | null>(null);
  const [boostStatus, setBoostStatus] = useState<LivecamBoostStatus>({ isActive: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivecam = async () => {
      if (!livecamId) {
        setError('Livecam ID is required');
        setLoading(false);
        return;
      }

      try {
        // In a real app, this would be an API call
        // For now, we'll just simulate some data
        
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data for a specific livecam
        const mockLivecam: LivecamModel = {
          id: livecamId,
          name: livecamId === 'sophie123' ? 'Sophie Dreams' : 'Crystal Clear',
          displayName: livecamId === 'sophie123' ? 'Sophie Dreams' : 'Crystal Clear',
          avatar: `https://picsum.photos/seed/${livecamId}/200/200`,
          tags: ['popular', 'featured', 'HD'],
          categories: ['solo', 'dance', 'chat'],
          type: 'premium',
          rating: 4.8,
          viewCount: 1245,
          description: 'Experience the ultimate interactive live show with me. I love connecting with my viewers and making your fantasies come true.',
          isOnline: true,
          pricePerMinute: 2.5,
          country: 'United States',
          languages: ['English', 'Spanish'],
          category: 'premium' // Legacy field
        };
        
        const mockStats: LivecamStats = {
          viewers: 127,
          likes: 1843,
          followCount: 12500,
          uptime: 45 // minutes
        };
        
        const mockBoostStatus: LivecamBoostStatus = {
          isActive: livecamId === 'crystal456',
          remainingTime: livecamId === 'crystal456' ? 10800 : undefined, // 3 hours in seconds
          boostLevel: livecamId === 'crystal456' ? 2 : undefined,
          expiration: livecamId === 'crystal456' ? new Date(Date.now() + 10800000) : undefined
        };
        
        setLivecam(mockLivecam);
        setStats(mockStats);
        setBoostStatus(mockBoostStatus);
      } catch (err: any) {
        console.error('Error fetching livecam:', err);
        setError(err.message || 'Failed to load livecam');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLivecam();
  }, [livecamId]);
  
  const boostLivecam = async (): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful boost
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use Oxum to calculate some boost scores
      const matrix = [
        [0.7, 0.2, 0.1],
        [0.2, 0.6, 0.2],
        [0.1, 0.2, 0.7]
      ];
      
      // Correctly use the boostAllocationEigen method
      const boostAllocation = oxum.boostAllocationEigen(matrix);
      console.log('Boost allocation:', boostAllocation);
      
      // Update the local state
      setBoostStatus({
        isActive: true,
        remainingTime: 86400, // 24 hours in seconds
        boostLevel: 1,
        expiration: new Date(Date.now() + 86400000)
      });
      
      return true;
    } catch (err) {
      console.error('Error boosting livecam:', err);
      return false;
    }
  };
  
  const cancelBoost = async (): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful cancellation
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the local state
      setBoostStatus({
        isActive: false
      });
      
      return true;
    } catch (err) {
      console.error('Error cancelling boost:', err);
      return false;
    }
  };
  
  return {
    livecam,
    stats,
    boostStatus,
    loading,
    error,
    boostLivecam,
    cancelBoost
  };
}

export default useLivecamDetail;
