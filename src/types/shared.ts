// Consolidated type definitions for UberEscorts ecosystem

// Re-export core types with proper type annotations
export type { ID, PersonaType, UberPersona } from './uberPersona';

// Core UberSystem types
export interface SystemStatus {
  operational: boolean;
  latency: number;
  aiModels: {
    conversation: string;
    generation: string;
    analysis: string;
  };
  lastUpdated: Date;
  metrics?: {
    responseTime?: number;
    activeSessions?: number;
    processingLoad?: number;
  };
}

// User role types
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR' | 'ESCORT' | 'CLIENT';

// Boost system types
export interface BoostStats {
  activeBoosts: number;
  topBoostScore: number;
  averageVisibility: number;
  peakHours: string[];
  recentChanges: number[];
}

// Define the PulseBoost type
export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes?: number;
  price: number;
  price_ubx?: number;
  visibility?: string;
  visibility_increase?: number;
  features?: string[];
  color?: string;
  badgeColor?: string;
  boost_power?: number;
  boostMultiplier?: number;
  isMostPopular?: boolean;
}

// Define types for the Boost Package and related operations
export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx?: number;
  duration: string;
  durationMinutes?: number;
  features?: string[];
  visibility?: string;
  visibility_increase?: number;
  boost_power?: number;
  color?: string;
  badgeColor?: string;
  boostMultiplier?: number;
  isMostPopular?: boolean;
}

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

export interface BoostPurchaseRequest {
  profileId: string;
  packageId: string;
}

export interface BoostPurchaseResult {
  success: boolean;
  boostId?: string;
  error?: string | null;
  message?: string;
  transactionId?: string;
}

// Analytics data for profiles, escorts, users
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

// Hermes flow system types
export interface HermesStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  boostScore: number;
  effectivenessScore: number;
  isActive?: boolean;
}

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

// UBX Wallet types
export interface UbxBalance {
  available: number;
  pending: number;
  reserved: number;
  total: number;
}

export interface UbxTransaction {
  id: string;
  type: 'purchase' | 'spend' | 'earn' | 'refund';
  amount: number;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Metaverse types
export interface MetaverseRoom {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  currentUsers: number;
  isPrivate: boolean;
  thumbnailUrl?: string;
  creatorId?: string;
}

export interface MetaverseAvatar {
  id: string;
  name: string;
  modelUrl: string;
  thumbnailUrl: string;
  isPremium: boolean;
  price?: number;
}

// Re-export boost-related types to maintain compatibility
export type { BoostAnalytics, EnhancedBoostStatus } from './pulse-boost';
