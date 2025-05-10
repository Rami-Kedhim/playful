
export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: number;  // Duration in hours
  durationMinutes: number; // Duration in minutes
  features: string[];
  boostLevel: number;
  visibility: number;
  popularity: 'high' | 'medium' | 'low';
  isPopular?: boolean;
  isMostPopular?: boolean;
  badgeColor?: string;
  visibilityIncrease?: number;
  // Add properties for compatibility
  packageName?: string;
  visibility_increase?: number;
  endTime?: Date | string;
}

export interface BoostEligibility {
  eligible: boolean;
  reasons: string[];
  nextEligibleDate?: string | Date;
  waitTime?: number;  // Time in minutes until eligible
  // Add properties for backward compatibility
  reason?: string;
  nextEligibleTime?: string;
  isEligible?: boolean;
  requirements?: {
    profileCompletion: boolean;
    verification: boolean;
    mediaUploaded: boolean;
  };
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | Date;
  remainingDays: number;
  boostLevel: number;
  isExpiring: boolean;
  progress?: number;
  timeRemaining?: string;
  remainingTime?: string;
  package?: BoostPackage;
  packageName?: string;
  startTime?: string | Date;
  packageId?: string;
  // Add endTime for compatibility
  endTime?: string | Date;
  boostPackage?: BoostPackage;
}

export interface HermesStatus {
  score: number;
  position?: number;
  activeUsers?: number;
  estimatedVisibility?: number;
  lastUpdated: string | Date;
  recommendations: string[];
  boostScore?: number;
  effectivenessScore?: number;
  lastUpdateTime?: string;
}

export interface BoostScoreResult {
  score: number;
  components: {
    profileCompleteness: number;
    contentQuality: number;
    activityLevel: number;
    responseRate: number;
  };
  recommendations: string[];
}

// Export AnalyticsData from pulse-boost.ts for backward compatibility
export { AnalyticsData } from '@/types/analytics';
