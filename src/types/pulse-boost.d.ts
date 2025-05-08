
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  price_ubx?: number;
  visibility: number | string;
  visibility_increase: number;
  boost_level?: number;
  features: string[];
  is_active?: boolean;
}

export interface EnhancedBoostStatus {
  active: boolean;
  isActive?: boolean;
  remainingMinutes: number;
  timeRemaining?: number | string;
  percentRemaining: number;
  expiresAt: string | Date | null;
  startedAt: string | Date | null;
  isExpired?: boolean;
  boostPackage?: BoostPackage;
}

export interface BoostAnalyticsData {
  impressionsIncrease: number;
  viewsIncrease: number;
  rankingIncrease: number;
  conversionRate: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
}

export interface BoostPurchase {
  userId: string;
  packageId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'expired' | 'cancelled';
}
