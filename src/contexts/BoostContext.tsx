
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useBoostManager, BoostStatus, BoostEligibility, BoostPackage } from '@/hooks/boost/useBoostManager';
import { useAuth } from '@/hooks/auth/useAuth';

// Enhanced BoostStatus type to include missing properties
interface EnhancedBoostStatus extends BoostStatus {
  progress?: number;
  packageId?: string;
  packageName?: string;
  profileId?: string;
  activeBoostId?: string;
  expiresAt?: string;
}

interface BoostContextType {
  isActive: boolean;
  boostStatus: EnhancedBoostStatus | null;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  loading: boolean;
  error: string | null;
  purchaseBoost: (pkg: BoostPackage) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
}

const BoostContext = createContext<BoostContextType | undefined>(undefined);

export const useBoost = () => {
  const context = useContext(BoostContext);
  if (context === undefined) {
    throw new Error('useBoost must be used within a BoostProvider');
  }
  return context;
};

export const BoostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const {
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    loading: boostLoading,
    error,
    purchaseBoost,
    cancelBoost
  } = useBoostManager(user?.id);

  const isActive = boostStatus?.isActive || false;

  // Enhanced status that includes the missing properties
  const enhancedStatus: EnhancedBoostStatus | null = boostStatus ? {
    ...boostStatus,
    progress: boostStatus.progress || 50, // Default progress value if missing
    packageId: boostStatus.packageId || '',
    packageName: boostStatus.packageName || 'Standard Boost',
    profileId: boostStatus.profileId || user?.id,
    activeBoostId: boostStatus.activeBoostId || '',
    expiresAt: boostStatus.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  } : null;

  return (
    <BoostContext.Provider value={{
      isActive,
      boostStatus: enhancedStatus,
      eligibility,
      boostPackages,
      dailyBoostUsage,
      dailyBoostLimit,
      loading: loading || boostLoading,
      error,
      purchaseBoost: async (pkg: BoostPackage) => {
        try {
          const result = await purchaseBoost(pkg);
          if (result) {
            toast({
              title: "Boost activated",
              description: `Your ${pkg.name} boost is now active!`,
            });
          }
          return result;
        } catch (err) {
          console.error("Error purchasing boost:", err);
          toast({
            title: "Error",
            description: "Failed to purchase boost. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      },
      cancelBoost: async () => {
        try {
          const result = await cancelBoost();
          if (result) {
            toast({
              title: "Boost cancelled",
              description: "Your boost has been cancelled.",
            });
          }
          return result;
        } catch (err) {
          console.error("Error cancelling boost:", err);
          toast({
            title: "Error",
            description: "Failed to cancel boost. Please try again.",
            variant: "destructive",
          });
          return false;
        }
      }
    }}>
      {children}
    </BoostContext.Provider>
  );
};
