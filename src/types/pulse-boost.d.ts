
export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining: string;
  percentRemaining: number;
  isExpired?: boolean;
  boostPackage?: BoostPackage;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  visibility_increase: number;
  color: string;
  badgeColor: string;
  boost_level?: number;
  isMostPopular?: boolean;
}

export interface PulseBoost extends BoostPackage {
  durationMinutes: number;
  visibility: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  orderId?: string;
  transactionId?: string;
  message?: string;
}
