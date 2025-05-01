
import { useState, useEffect } from 'react';
import { BoostStatus } from '@/types/boost';

export const usePulseBoostAdapter = (profileId: string) => {
  const [realtimeStatus, setRealtimeStatus] = useState<BoostStatus | null>(null);
  
  useEffect(() => {
    if (!profileId) return;
    
    // This would connect to a real-time service like Supabase or Firebase
    const fetchRealtimeStatus = () => {
      // Mock data
      if (Math.random() > 0.7) {
        setRealtimeStatus({
          isActive: true,
          packageName: 'Pulse Boost',
          remainingTime: '04:32:12',
          progress: 70,
          packageId: 'pulse-boost-1',
          activeBoostId: 'active-pulse-1'
        });
      }
    };
    
    fetchRealtimeStatus();
    const interval = setInterval(fetchRealtimeStatus, 30000);
    
    return () => clearInterval(interval);
  }, [profileId]);
  
  const formatPulseDuration = (duration: string): string => {
    // Format duration string like "24:00:00" to "24 hours"
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    
    if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  };
  
  return {
    realtimeStatus,
    formatPulseDuration
  };
};

export default usePulseBoostAdapter;
