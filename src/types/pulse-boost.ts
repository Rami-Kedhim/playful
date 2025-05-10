
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
  // Add this property that was being used
  packageName?: string;
}

export interface BoostEligibility {
  eligible: boolean;
  reasons: string[];
  nextEligibleDate?: string | Date;
  waitTime?: number;  // Time in minutes until eligible
  // Additional properties used in the codebase
  requirements?: string[];
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
