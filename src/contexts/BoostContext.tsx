
import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useBoostAdapters } from '@/hooks/boost/useBoostAdapters';
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { useAuth } from '@/hooks/auth/useAuth';

interface BoostContextType {
  isActive: boolean;
  isLoading: boolean; // Added isLoading property
  boostStatus: BoostStatus | null;
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

// Added alias for backward compatibility
export const useBoostContext = useBoost;

export const BoostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const {
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    loading: boostLoading,
    error,
    purchaseBoost,
    cancelBoost,
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages
  } = useBoostAdapters(user?.id || '');

  // Apply adapters to convert types
  const boostStatus = adaptBoostStatus(rawBoostStatus);
  const eligibility = adaptBoostEligibility(rawEligibility || { isEligible: false, reason: 'Unknown' });
  const boostPackages = adaptBoostPackages(rawPackages || []);
  const isActive = boostStatus?.isActive || false;

  return (
    <BoostContext.Provider value={{
      isActive,
      isLoading: loading || boostLoading, // Expose isLoading property
      boostStatus,
      eligibility,
      boostPackages,
      dailyBoostUsage,
      dailyBoostLimit,
      loading: loading || boostLoading,
      error,
      purchaseBoost: async (pkg: BoostPackage) => {
        try {
          loading && setLoading(true);
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
        } finally {
          loading && setLoading(false);
        }
      },
      cancelBoost: async () => {
        try {
          loading && setLoading(true);
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
        } finally {
          loading && setLoading(false);
        }
      }
    }}>
      {children}
    </BoostContext.Provider>
  );
};
