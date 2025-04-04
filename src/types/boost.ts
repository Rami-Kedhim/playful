
export interface BoostParams {
  country: string;
  completeness: number;
  rating: number;
  timeSlot: 'off_peak' | 'normal' | 'peak';
  role: 'regular' | 'AI' | 'verified';
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string; // PostgreSQL interval format (e.g. "168:00:00" for 7 days)
  price_lucoin: number;
  features?: string[];
  description?: string;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
  remainingTime?: string;
  progress?: number;
}
