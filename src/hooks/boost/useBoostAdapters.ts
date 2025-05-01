
import { useState, useEffect } from 'react';
import { useBoostStatus } from './useBoostStatus';
import { BoostStatus, HermesStatus } from '@/types/boost';

export const useBoostAdapters = (profileId?: string) => {
  const { status } = useBoostStatus(profileId);
  const [realtimeStatus, setRealtimeStatus] = useState<BoostStatus | null>(null);
  const [hermesData, setHermesData] = useState<HermesStatus>({
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: ''
  });
  
  // Simulate realtime updates
  useEffect(() => {
    if (status.isActive) {
      // Create a deep copy to avoid modifying the original
      const adaptedStatus = {
        ...status,
        progress: Math.floor(Math.random() * 75) + 25,
        boost_level: status.boostMultiplier ? Math.floor(status.boostMultiplier * 10) : 10,
        visibilityScore: Math.floor(Math.random() * 30) + 70
      };
      
      setRealtimeStatus(adaptedStatus);
      
      // Update hermes data
      setHermesData({
        position: Math.floor(Math.random() * 10) + 1,
        activeUsers: Math.floor(Math.random() * 50) + 200,
        estimatedVisibility: Math.floor(Math.random() * 25) + 75,
        lastUpdateTime: new Date().toISOString(),
        boostScore: Math.floor(Math.random() * 25) + 75,
      });
      
      // Simulate periodic updates
      const interval = setInterval(() => {
        setRealtimeStatus(prev => {
          if (!prev) return null;
          
          // Calculate new progress
          let newProgress = (prev.progress || 0) + 1;
          if (newProgress > 100) newProgress = 100;
          
          // Calculate new remaining time
          let remainingTime = prev.remainingTime;
          if (remainingTime && remainingTime.includes(':')) {
            const [hours, minutes, seconds] = remainingTime.split(':').map(Number);
            let totalSeconds = hours * 3600 + minutes * 60 + seconds - 15;
            if (totalSeconds <= 0) totalSeconds = 0;
            
            const newHours = Math.floor(totalSeconds / 3600);
            const newMinutes = Math.floor((totalSeconds % 3600) / 60);
            const newSeconds = totalSeconds % 60;
            
            remainingTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
          }
          
          return {
            ...prev,
            progress: newProgress,
            remainingTime
          };
        });
      }, 15000);
      
      return () => clearInterval(interval);
    }
  }, [status]);
  
  const formatBoostDuration = (duration: string): string => {
    if (!duration) return '';
    if (!duration.includes(':')) return duration;
    
    const parts = duration.split(':');
    if (parts.length !== 3) return duration;
    
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return {
    realtimeStatus,
    hermesData,
    formatBoostDuration
  };
};

export default useBoostAdapters;
