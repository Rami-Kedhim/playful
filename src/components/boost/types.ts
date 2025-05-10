
import { BoostPackage, BoostStatus, HermesStatus, BoostEligibility } from '@/types/pulse-boost';

export interface BoostPackageCardProps {
  package: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration?: (duration: number) => string;
  // Adding this field to match the code usage
  pkg?: BoostPackage;
}

export interface BoostDialogTabsProps {
  profileId: string;
  packages: BoostPackage[];
  boostStatus: BoostStatus;
  hermesStatus: HermesStatus;
  boostEligibility: BoostEligibility;
  onSuccess: () => Promise<void>;
  onClose: () => void;
}

export interface BoostDialogProps {
  profileId: string;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void>;
}

export interface BoostManagerProps {
  profileId: string;
}

export interface BoostAnalyticsProps {
  profileId: string;
}

export interface BoostScoreCardProps {
  score: number | null;
  recommendations?: string[];
  loading?: boolean;
  profileId: string;
  isOwnProfile: boolean;
  boostScore: number | null;
  error: string | null;
  onRefresh: () => Promise<void>;
}
