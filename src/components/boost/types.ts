
import { BoostPackage, BoostStatus, HermesStatus, BoostEligibility, BoostScoreResult } from '@/types/pulse-boost';

export interface BoostPackageCardProps {
  package: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration?: (duration: number) => string;
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
  score: number | BoostScoreResult;
  recommendations?: string[];
  loading?: boolean;
}
