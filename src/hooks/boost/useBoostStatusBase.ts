
import { useState, useEffect } from 'react';
import { BoostStatus, BoostEligibility } from '@/types/boost';
import { differenceInSeconds, parseISO } from 'date-fns';

export interface UseBoostStatusBaseOptions {
  profileId?: string;
  apiUrl?: string;
}

export interface UseBoostStatusBaseResult {
  boostStatus: BoostStatus;
  loading: boolean;
  error: string | null;
  fetchBoostStatus: () => Promise<BoostStatus | null>;
  startRefreshInterval: () => void;
  stopRefreshInterval: () => void;
}

export const useBoostStatusBase = (options: UseBoostStatusBaseOptions = {}): UseBoostStatusBaseResult => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const { profileId, apiUrl = 'https://api.example.com/boost' } = options;

  // Helper function to parse date strings safely
  const parseDate = (dateString: string | Date | undefined): Date | null => {
    if (!dateString) return null;
    
    if (dateString instanceof Date) {
      return dateString;
    }
    
    try {
      return parseISO(dateString);
    } catch (e) {
      console.error('Error parsing date:', e);
      return null;
    }
  };

  const fetchBoostStatus = async (): Promise<BoostStatus | null> => {
    if (!profileId) return null;

    setLoading(true);
    setError(null);

    try {
      // Simulation of API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate fake data for the demo
      const now = new Date();
      const active = Math.random() > 0.7;

      const status: BoostStatus = active
        ? {
            isActive: true,
            startTime: new Date(now.getTime() - 3600000).toISOString(), // 1 hour ago
            endTime: new Date(now.getTime() + 7200000).toISOString(), // 2 hours from now
            remainingTime: 7200, // seconds
            progress: 33, // percent
            packageId: 'boost-1h',
            packageName: '1 Hour Boost',
            profileId: profileId,
            activeBoostId: `boost-${Math.random().toString(36).substring(2, 10)}`,
            expiresAt: new Date(now.getTime() + 7200000).toISOString()
          }
        : { isActive: false };

      setBoostStatus(status);
      return status;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error occurred';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update remaining time if boost is active
  useEffect(() => {
    if (!boostStatus.isActive || !boostStatus.endTime) return;

    const endTimeDate = parseDate(boostStatus.endTime);
    if (!endTimeDate) return;

    const updateRemainingTime = () => {
      const now = new Date();
      
      if (endTimeDate <= now) {
        setBoostStatus(prev => ({ ...prev, isActive: false, remainingTime: 0 }));
        stopRefreshInterval();
        return;
      }

      const remainingSeconds = differenceInSeconds(endTimeDate, now);
      const progress = calculateProgress(boostStatus.startTime, boostStatus.endTime);
      
      setBoostStatus(prev => ({
        ...prev,
        remainingTime: remainingSeconds,
        progress
      }));
    };

    // Calculate progress percentage
    const calculateProgress = (startTimeStr?: string, endTimeStr?: string): number => {
      if (!startTimeStr || !endTimeStr) return 0;
      
      const startTime = parseDate(startTimeStr);
      const endTime = parseDate(endTimeStr);
      
      if (!startTime || !endTime) return 0;
      
      const totalDuration = differenceInSeconds(endTime, startTime);
      if (totalDuration <= 0) return 0;
      
      const elapsed = differenceInSeconds(new Date(), startTime);
      const progress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      
      return progress;
    };

    // Update immediately and then set interval
    updateRemainingTime();
    const timer = window.setInterval(updateRemainingTime, 1000);
    
    return () => {
      window.clearInterval(timer);
    };
  }, [boostStatus.isActive, boostStatus.endTime, boostStatus.startTime]);

  // Refresh status periodically
  const startRefreshInterval = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    
    // Refresh every minute
    const id = window.setInterval(() => {
      fetchBoostStatus();
    }, 60000);
    
    setIntervalId(Number(id));
  };

  const stopRefreshInterval = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (profileId) {
      fetchBoostStatus().then(() => startRefreshInterval());
    }
    
    return () => {
      stopRefreshInterval();
    };
  }, [profileId]);

  return {
    boostStatus,
    loading,
    error,
    fetchBoostStatus,
    startRefreshInterval,
    stopRefreshInterval
  };
};
