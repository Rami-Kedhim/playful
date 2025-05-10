
import { BoostPackage, BoostStatus, HermesStatus, UserBoost, BoostAnalytics } from '@/types/pulse-boost';

export interface BoostManagerHook {
  availablePackages: BoostPackage[];
  activeBoost: UserBoost | null;
  boostStatus: BoostStatus;
  hermesStatus: HermesStatus;
  isLoadingPackages: boolean;
  isLoadingUserBoosts: boolean;
  purchaseBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: (boostId: string) => Promise<boolean>;
  refreshBoostData: () => Promise<void>;
}

export interface BoostAnalyticsHook {
  analytics: BoostAnalytics | null;
  loading: boolean;
  error: string | null;
}
