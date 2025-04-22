
import { useState, useEffect } from 'react';
import { BoostStatus } from '@/types/boost';

interface UseBoostStatusBaseProps {
  initialStatus?: BoostStatus;
  onExpired?: () => void;
}

export const useBoostStatusBase = ({ 
  initialStatus, 
  onExpired 
}: UseBoostStatusBaseProps = {}) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>(
    initialStatus || { isActive: false }
  );
  
  // Update the remaining time
  useEffect(() => {
    if (!boostStatus.isActive || !boostStatus.endTime) return;
    
    const calculateTimeRemaining = () => {
      const endTime = new Date(boostStatus.endTime || '').getTime();
      const now = new Date().getTime();
      
      // If the boost has expired
      if (now >= endTime) {
        setBoostStatus(prev => ({ 
          ...prev, 
          isActive: false,
          remainingTime: '00:00:00'
        }));
        
        if (onExpired) onExpired();
        return;
      }
      
      // Calculate the remaining time
      const remainingMs = endTime - now;
      
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      
      // Format the remaining time as HH:MM:SS
      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');
      
      // Calculate the progress (as a percentage)
      let progress = 0;
      if (boostStatus.startTime) {
        const startTime = new Date(boostStatus.startTime).getTime();
        const totalDuration = endTime - startTime;
        const elapsed = now - startTime;
        progress = Math.max(0, Math.min(100, 100 - ((elapsed / totalDuration) * 100)));
      }
      
      // Update the status
      setBoostStatus(prev => ({
        ...prev,
        remainingTime: formattedTime,
        progress
      }));
    };
    
    // Calculate immediately
    calculateTimeRemaining();
    
    // Set up the interval to update every second
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [boostStatus.isActive, boostStatus.endTime, boostStatus.startTime, onExpired]);
  
  // Set a new boost status
  const setActiveBoost = (status: BoostStatus) => {
    setBoostStatus(status);
  };
  
  // Activate a new boost with the given package
  const activateBoost = (packageId: string, duration: string) => {
    const now = new Date();
    const startTime = now.toISOString();
    
    // Parse the duration string (HH:MM:SS)
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    
    // Calculate the end time
    const endTime = new Date(
      now.getTime() + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000)
    ).toISOString();
    
    // Set the new status
    setActiveBoost({
      isActive: true,
      packageId,
      startTime,
      endTime,
      remainingTime: duration
    });
    
    return {
      startTime,
      endTime
    };
  };
  
  // Clear the boost status
  const clearBoost = () => {
    setBoostStatus({
      isActive: false
    });
  };
  
  return {
    boostStatus,
    setActiveBoost,
    activateBoost,
    clearBoost
  };
};

export default useBoostStatusBase;
