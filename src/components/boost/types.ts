
import { BoostPackage, BoostStatus, BoostEligibility, HermesStatus } from '@/types/boost';

export interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
  buttonProps?: {
    text: string;
    variant: string;
    size: string;
  };
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (id: string) => void;
  handleBoost: () => void;
  handleCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus: HermesStatus;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handleDialogClose: () => void;
}

export interface UseBoostManagerResult {
  loading: boolean;
  error: string | null;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  purchaseBoost: (pkg: BoostPackage) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  formatBoostDuration: (duration: string) => string;
  getBoostAnalytics: () => Promise<any>;
  fetchBoostPackages: () => Promise<BoostPackage[]>;
  adaptGetBoostPrice: (fn: (pkg: BoostPackage) => number) => (pkg: BoostPackage) => number;
}

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  formatDuration?: (duration: string) => string;
  onCancel?: () => Promise<boolean>;
}

export interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
  isActive?: boolean;
}
