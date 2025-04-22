
import { useContext } from 'react';
import { BoostContext } from '@/contexts/BoostContext';
import { BoostStatus, BoostPackage } from '@/types/boost';

export interface BoostContextType {
  isActive: boolean;
  packages: BoostPackage[];
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  boostStatus: BoostStatus | null;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  purchaseBoost?: (pkg: BoostPackage) => Promise<boolean>;
  cancelBoost?: () => Promise<boolean>;
}

export const useBoostContext = () => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error('useBoostContext must be used within a BoostProvider');
  }
  
  return context;
};
