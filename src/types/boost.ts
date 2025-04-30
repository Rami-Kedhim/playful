
export interface BoostStatus {
  isActive: boolean;
  startTime?: Date | null;
  endTime?: Date | null;
  packageId?: string | null;
  remainingTime?: string | null;
  packageName?: string | null;
  boost_level?: number;
  expiresAt?: Date;
  visibilityScore?: number;
}

export enum BoostTier {
  NONE = 'none',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ULTRA = 'ultra',
}

export interface BoostEligibility {
  eligible: boolean;
  message?: string;
  reasons?: string[];
  blockedUntil?: Date | string;
  minimumRequirements?: Record<string, any>;
}

export interface HermesBoostStatus {
  isActive: boolean;
  boostScore?: number;
  effectivenessScore?: number;
  tier?: number;
  score?: number;
  multiplier?: number;
}

export interface HermesStatus extends HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
}

export interface BoostAnalytics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversionRate: number;
  averagePosition: number;
  totalSpent: number;
  roi: number;
  lastUpdated: Date | string;
  dailyStats?: {
    date: string;
    impressions: number;
    clicks: number;
  }[];
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in hours
  features: string[];
  tier: BoostTier;
  visibilityScore: number;
  multiplier: number;
}

export interface BoostPurchase {
  id: string;
  packageId: string;
  userId: string;
  profileId: string;
  purchaseDate: Date | string;
  expiryDate: Date | string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  paymentStatus: 'pending' | 'completed' | 'failed';
  price: number;
  currency: string;
}

export interface BoostDialogTabsProps {
  currentTab: 'status' | 'packages' | 'analytics' | 'history';
  setCurrentTab: (tab: 'status' | 'packages' | 'analytics' | 'history') => void;
  boostStatus: BoostStatus | null;
  hermesStatus: HermesStatus | null;
  eligibility: BoostEligibility;
  profileId?: string;
}
