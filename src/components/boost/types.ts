
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
}

export interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
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
}
