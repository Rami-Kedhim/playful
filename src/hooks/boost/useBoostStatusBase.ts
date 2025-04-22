import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostEligibility } from '@/types/boost';

interface ProfileData {
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  ubxBalance: number;
}

interface BoostOptions {
  mockActiveChance?: number;
  dailyBoostLimit?: number;
}

const formatTimeRemaining = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  let result = '';
  if (days > 0) result += `${days}d `;
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result;
};

export const useBoostStatusBase = (profileId?: string, options: BoostOptions = {}) => {
  const { mockActiveChance = 0.3, dailyBoostLimit = 4 } = options;
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [eligibility, setEligibility] = useState<BoostEligibility>({ isEligible: false });
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);

  const startDate = new Date();  // or from API
  const startTimeIso = startDate.toISOString();  // Convert to string

  const mockBoostData = useCallback(() => {
    const isActive = Math.random() < mockActiveChance;
    const endTime = new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(); // 6 hours from now
    return {
      isActive,
      startTime: startTimeIso,
      endTime: endTime,
      packageId: 'mock-package',
      packageName: 'Mock Boost',
      progress: 50,
      timeRemaining: '5h 59m'
    };
  }, [mockActiveChance, startTimeIso]);

  const fetchBoostStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockData = mockBoostData();
      setBoostStatus(mockData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch boost status');
    } finally {
      setLoading(false);
    }
  }, [mockBoostData]);

  const checkEligibility = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockProfileData: ProfileData = {
        profileCompleteness: 75,
        isVerified: true,
        rating: 4.5,
        profileCreatedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        country: 'US',
        role: 'verified',
        ubxBalance: 150
      };
      setProfileData(mockProfileData);

      const isEligible = isEligibleForBoosting(mockProfileData);
      setEligibility({ isEligible, reason: isEligible ? undefined : 'Not eligible' });
    } catch (err: any) {
      setError(err.message || 'Failed to check eligibility');
      setEligibility({ isEligible: false, reason: err.message || 'Failed to check eligibility' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (profileId) {
      fetchBoostStatus();
      checkEligibility();
    }
  }, [profileId, fetchBoostStatus, checkEligibility]);

  const activeBoost = boostStatus.isActive ? boostStatus : null;

  const checkIfBoostExpired = () => {
    if (!activeBoost || !activeBoost.endTime) return false;
    
    const endTimeDate = new Date(activeBoost.endTime);
    const now = new Date();
    
    return now >= endTimeDate;
  };

  const calculateBoostTimeRemaining = () => {
    if (!activeBoost || !activeBoost.endTime) return "";
    
    const endTimeDate = new Date(activeBoost.endTime);
    const now = new Date();
    
    // If already expired
    if (now >= endTimeDate) return "Expired";
    
    const remainingMs = endTimeDate.getTime() - now.getTime();
    return formatTimeRemaining(remainingMs);
  };

  const calculateBoostProgress = () => {
    if (!activeBoost || !activeBoost.startTime || !activeBoost.endTime) return 0;
    
    const startTimeDate = new Date(activeBoost.startTime);
    const endTimeDate = new Date(activeBoost.endTime);
    const now = new Date();

    const totalDuration = endTimeDate.getTime() - startTimeDate.getTime();
    const elapsed = now.getTime() - startTimeDate.getTime();
    return (elapsed / totalDuration) * 100;
  };

  const cancelBoost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBoostStatus({ isActive: false });
      toast({
        title: "Success",
        description: "Boost cancelled successfully",
      });
    } catch (err: any) {
      setError(err.message || 'Failed to cancel boost');
      toast({
        title: "Error",
        description: err.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const formatDuration = (durationStr: string): string => {
    const [hours, minutes] = durationStr.split(':').map(Number);
    return `${hours} hours ${minutes} minutes`;
  };

  return {
    boostStatus,
    setBoostStatus,
    eligibility,
    profileData,
    loading,
    error,
    dailyBoostUsage,
    dailyBoostLimit,
    fetchBoostStatus,
    checkEligibility,
    cancelBoost,
    formatDuration
  };
};

const isEligibleForBoosting = (profile: ProfileData): boolean => {
  return profile.profileCompleteness > 50 && profile.ubxBalance > 100;
};

const getCurrentTimeSlot = (): number => {
  return new Date().getHours();
};
