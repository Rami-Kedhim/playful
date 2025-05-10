
import { BoostPackage, BoostStatus } from "@/types/boost";

export interface HermesStatus {
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdateTime?: Date;
  metrics?: {
    velocity?: number;
    engagement?: number;
    retention?: number;
    conversion?: number;
  };
  isActive?: boolean;
}

export interface BoostState {
  isActive: boolean;
  expiresAt: Date | null;
  level: number;
  packageId: string | null;
  packageName: string | null;
  remainingTime: string;
  timeProgress: number;
  loading: boolean;
  error: string | null;
  hermesStatus: HermesStatus;
  packages: BoostPackage[];
  boostStatus: BoostStatus | null;
}

export interface BoostAnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  viewIncrease: number;
  engagementRate: number;
  averageBoostScore: number;
  historicalData: {
    date: string;
    views: number;
    engagement: number;
    score: number;
  }[];
}

export interface BoostAnalytics {
  data: BoostAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

export interface BoostOperationsResult {
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  refreshBoostStatus: () => Promise<void>;
  formatRemainingTime: (seconds: number) => string;
  boostStatus?: BoostStatus;
  boostEligibility?: {
    eligible: boolean;
    reason?: string;
  };
  boostPackages?: BoostPackage[];
  getBoostPrice?: (packageId: string) => number;
  hermesMetrics?: HermesStatus;
  loading?: boolean;
}
