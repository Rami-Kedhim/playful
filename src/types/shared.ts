
// Consolidated type definitions for UberEscorts ecosystem
import { ID, PersonaType, UberPersona } from './uberPersona';
import { PulseBoost, BoostPackage, UserRole } from './pulse-boost';

// Re-export core types
export { ID, PersonaType, UberPersona, PulseBoost, BoostPackage, UserRole };

// Homepage component prop types
export interface HeroProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
}

export interface ProfileProps {
  id: string;
  name: string;
  imageUrl?: string;
  location?: string;
  rating?: number;
  price?: number;
  isPremium?: boolean;
}

export interface SystemStatus {
  operational: boolean;
  latency: number;
  aiModels: {
    conversation: string;
    generation: string;
    analysis: string;
  };
  lastUpdated: Date;
}

export interface BoostStats {
  activeBoosts: number;
  topBoostScore: number;
  averageVisibility: number;
  peakHours: string[];
  recentChanges: number[];
}

// Add types for the Boost system
export interface BoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  packageName?: string;
  startedAt?: Date;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface BoostEligibility {
  isEligible: boolean;
  reason?: string;
  reasons?: string[];
  nextEligibleTime?: string;
  remainingBoosts?: number;
  maxBoostsPerDay?: number;
}

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  impressions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  interactions?: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
  };
  rank?: {
    current: number;
    previous: number;
    change: number;
  };
}

export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
}
