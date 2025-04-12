
import { useState, useEffect } from 'react';
import { BoostStatus } from '@/types/boost';
import { toast } from '@/hooks/use-toast';
import { calculateRemainingTime } from '@/utils/boostCalculator';

export const useBoostEffects = (userId?: string) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const DAILY_BOOST_LIMIT = 4;

  // Check for active boost when user changes
  useEffect(() => {
    if (userId) {
      // Implement or import checkActiveBoost here if needed
    } else {
      // Reset state when no user is logged in
      setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: ''
      });
    }
  }, [userId]);

  // Update boost progress and remaining time for active boosts
  useEffect(() => {
    if (!boostStatus.isActive || !boostStatus.expiresAt) return;

    const timer = setInterval(() => {
      if (boostStatus.expiresAt) {
        // Calculate new remaining time
        const remainingTime = calculateRemainingTime(boostStatus.expiresAt);
        
        // Calculate progress (0-100%)
        const now = new Date();
        const expiresAt = new Date(boostStatus.expiresAt);
        const totalDuration = boostStatus.boostPackage?.duration 
          ? durationToMilliseconds(boostStatus.boostPackage.duration) 
          : 3 * 60 * 60 * 1000; // Default 3 hours
        
        const timeLeft = expiresAt.getTime() - now.getTime();
        const elapsed = totalDuration - timeLeft;
        const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        
        // Check if boost has expired
        if (timeLeft <= 0) {
          setBoostStatus({
            isActive: false,
            progress: 0,
            remainingTime: ''
          });
          toast({
            title: "Boost Expired",
            description: "Your profile boost has ended"
          });
        } else {
          // Update with new values
          setBoostStatus(prev => ({
            ...prev,
            remainingTime,
            progress
          }));
        }
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [boostStatus.isActive, boostStatus.expiresAt]);

  // Convert duration string (HH:MM:SS) to milliseconds
  const durationToMilliseconds = (duration: string): number => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return ((hours * 60 + minutes) * 60 + seconds) * 1000;
  };

  return {
    boostStatus,
    isLoading,
    error,
    dailyBoostUsage,
    dailyBoostLimit: DAILY_BOOST_LIMIT,
    setBoostStatus,
    setIsLoading,
    setError,
    setDailyBoostUsage,
    durationToMilliseconds
  };
};
