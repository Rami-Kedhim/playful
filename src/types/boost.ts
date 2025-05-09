
import { VerificationLevel } from "./verification";

export interface PulseBoost {
  id: string;
  name: string; 
  description: string;
  price: number; 
  duration: string;
  features: string[];
  isMostPopular?: boolean;
  boostLevel?: number;
  position: number;
  visibility: number;
  promotionRadius: number;
  includedFeatures?: string[];
  extraServices?: string[];
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  boost_power?: number;
  boostLevel?: number;
  duration?: string;
  position?: number;
  visibility?: number | string;
  features?: string[];
  isMostPopular?: boolean;
  isPopular?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  remainingTime?: string | number;
  packageId?: string;
  packageName?: string;
  startedAt?: Date;
  expiresAt?: Date;
  progress?: number;
  activeBoostId?: string;
  boostPackage?: BoostPackage;
  // For compatibility with different component usages
  startTime?: Date | string;
  endTime?: Date | string;
  timeRemaining?: string;
  isExpiring?: boolean;
}

export interface BoostEligibility {
  isEligible: boolean;
  reasons?: string[];
  reason?: string;
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
  eligible?: boolean;
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
  isActive?: boolean;
  metrics?: any;
}

export interface BoostAnalytics {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  views?: number;
  impressions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
  interactions?: {
    value: number;
    change?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
  };
}

export interface BoostDialogTabsProps {
  packages: BoostPackage[];
  selected: string;
  onSelect: (id: string) => void;
  onBoost: () => void;
  isLoading: boolean;
  eligibility: BoostEligibility;
  boostStatus: BoostStatus;
}

export interface BoostAnalyticsItem {
  label: string;
  value: number;
  change: number;
  icon?: React.ReactNode;
  formatter?: (value: number) => string;
}

export interface EnhancedBoostStatus extends BoostStatus {
  timeRemaining?: string;
  boostPackage?: BoostPackage;
}
