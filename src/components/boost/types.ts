
import { BoostStatus, BoostEligibility, BoostPackage } from "@/types/boost";

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

export interface HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  isActive?: boolean;
  active?: boolean;
  boostScore?: number;
  effectivenessScore?: number;
  timeRemaining?: number;
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
  hermesStatus: any;
  
  // Add missing properties
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  handlePurchase?: () => Promise<void>;
  handleDialogClose?: () => void;
  boostAnalytics?: any;
  hermesBoostStatus?: any;
}

export interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
  
  // Add missing properties
  selectedPackage?: string;
  setSelectedPackage?: (packageId: string) => void;
  onSelectPackage?: (packageId: string) => void;
  getBoostPrice?: () => number;
}

export interface HermesBoostInfoProps {
  hermesStatus: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
  
  // Add missing properties
  status?: {
    position: any;
    activeUsers: any;
    estimatedVisibility: any;
    lastUpdateTime: any;
  };
  hermesData?: {
    position: any;
    activeUsers: any;
    estimatedVisibility: any;
    lastUpdateTime: any;
  };
}

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  
  // Add missing property
  hermesData?: {
    position: any;
    activeUsers: any;
    estimatedVisibility: any;
    lastUpdateTime: any;
  };
}
