
// Pulse Boost types

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  boostLevel: number;
  popularity: 'low' | 'medium' | 'high';
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: Date | string;
  remainingDays: number;
  boostLevel: number;
  isExpiring: boolean;
}

export interface HermesStatus {
  score: number;
  recommendations: string[];
  lastUpdated: Date | string;
  metrics?: any;
}

export interface BoostAnalytics {
  impressions: number;
  clicks: number;
  conversionRate: number;
  engagementScore: number;
}

export interface UserBoost {
  id: string;
  userId: string;
  packageId: string;
  startDate: Date | string;
  endDate: Date | string;
  isActive: boolean;
  boostLevel: number;
}
