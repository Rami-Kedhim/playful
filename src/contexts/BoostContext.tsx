
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/boost';
import { useAuth } from '@/hooks/auth';
import useBoostPackages from '@/hooks/boost/useBoostPackages';

export interface BoostContextType {
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  packages: BoostPackage[];
  loading: boolean;
  error: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  refreshBoostStatus: (profileId?: string) => Promise<void>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  formatBoostDuration: (duration: string) => string;
}

export const BoostContext = createContext<BoostContextType | undefined>(undefined);

interface BoostProviderProps {
  children: ReactNode;
}

export const BoostProvider: React.FC<BoostProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const boostPackages = useBoostPackages();
  
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
  });
  
  const [eligibility, setEligibility] = useState<BoostEligibility>({
    isEligible: true,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState(0);
  const [dailyBoostLimit, setDailyBoostLimit] = useState(5);

  // Format the boost duration from a string like "24:00:00" to "1 day"
  const formatBoostDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  // Refresh the boost status
  const refreshBoostStatus = async (profileId?: string): Promise<void> => {
    if (!user && !profileId) return;
    
    try {
      setLoading(true);
      // This would be an API call in a real implementation
      // For now, simulate a status
      const mockStatus: BoostStatus = {
        isActive: false,
        startTime: '',
        endTime: '',
        remainingTime: ''
      };
      
      setBoostStatus(mockStatus);
    } catch (err) {
      console.error("Error fetching boost status:", err);
      setError("Failed to fetch boost status");
    } finally {
      setLoading(false);
    }
  };

  // Activate a boost for a profile
  const boostProfile = async (profileId: string, packageId: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      console.log(`Boosting profile ${profileId} with package ${packageId}`);
      
      // Find the selected package
      const selectedPackage = boostPackages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        throw new Error("Selected package not found");
      }
      
      // Simulate a successful boost activation
      const now = new Date();
      const durationParts = selectedPackage.duration.split(':').map(Number);
      const hours = durationParts[0] || 0;
      
      const endTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
      
      setBoostStatus({
        isActive: true,
        packageId: packageId,
        packageName: selectedPackage.name,
        startTime: now.toISOString(),
        endTime: endTime.toISOString(),
        remainingTime: selectedPackage.duration,
        boostPackage: selectedPackage,
        profileId: profileId
      });
      
      setDailyBoostUsage(prev => prev + 1);
      
      return true;
    } catch (err) {
      console.error("Error boosting profile:", err);
      setError("Failed to boost profile");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cancel an active boost
  const cancelBoost = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real implementation, this would be an API call
      console.log("Cancelling boost");
      
      setBoostStatus({
        isActive: false,
        startTime: '',
        endTime: '',
        remainingTime: ''
      });
      
      return true;
    } catch (err) {
      console.error("Error cancelling boost:", err);
      setError("Failed to cancel boost");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initialize by refreshing boost status when user changes
  useEffect(() => {
    if (user) {
      refreshBoostStatus(user.id);
    }
  }, [user]);

  const value: BoostContextType = {
    boostStatus,
    eligibility,
    packages: boostPackages,
    loading,
    error,
    boostProfile,
    cancelBoost,
    refreshBoostStatus,
    dailyBoostUsage,
    dailyBoostLimit,
    formatBoostDuration
  };

  return (
    <BoostContext.Provider value={value}>
      {children}
    </BoostContext.Provider>
  );
};
