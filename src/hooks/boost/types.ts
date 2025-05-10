
import { BoostPackage, BoostStatus, HermesStatus, BoostAnalytics } from '@/types/pulse-boost';

export interface BoostManagerHook {
  availablePackages: BoostPackage[];
  activeBoost: any | null;  // Using 'any' instead of UserBoost since we don't have that type
  boostStatus: BoostStatus;
  hermesStatus: HermesStatus;
  isLoadingPackages: boolean;
  isLoadingUserBoosts: boolean;
  loading?: boolean; // Add loading property
  purchaseBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: (boostId: string) => Promise<boolean>;
  refreshBoostData: () => Promise<void>;
}

export interface BoostAnalyticsHook {
  analytics: BoostAnalytics | null;
  loading: boolean;
  error: string | null;
}
