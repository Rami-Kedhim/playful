
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  price_ubx?: number;
  visibility: number;
  visibility_increase: number;
  boost_level?: number;
  features: string[];
  is_active?: boolean;
}

export interface EnhancedBoostStatus {
  active: boolean;
  remainingMinutes: number;
  percentRemaining: number;
  expiresAt: string | null;
  startedAt: string | null;
  isExpired?: boolean;
}

export interface BoostAnalyticsData {
  impressionsIncrease: number;
  viewsIncrease: number;
  rankingIncrease: number;
  conversionRate: number;
}

export interface BoostPurchase {
  userId: string;
  packageId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'expired' | 'cancelled';
}
