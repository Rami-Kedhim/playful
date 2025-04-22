
import { BoostStatus, BoostEligibility, BoostPackage, HermesBoostStatus } from "@/types/boost";

export interface BoostButtonProps {
  text?: string;
  variant?: string;
  size?: string;
}

export interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonProps?: BoostButtonProps;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}

export interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loading: boolean;
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  boostPackages: BoostPackage[];
  selectedPackage: string;
  setSelectedPackage: (packageId: string) => void;
  handleBoost: () => Promise<void>;
  handleCancel: () => Promise<void>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  hermesStatus: HermesBoostStatus;
  
  // Additional properties
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handlePurchase?: () => Promise<void>;
  handleDialogClose?: () => void;
  boostAnalytics?: any;
}

export interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
  getBoostPrice?: () => number; // Add the missing getBoostPrice prop
}

export interface HermesBoostInfoProps {
  hermesStatus: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: {
    position: any;
    activeUsers: any;
    estimatedVisibility: any;
    lastUpdateTime: any;
  };
}
