
// Adjusted interface to unify property names to camelCase and fix types for UberPersona to match usage in code

export interface BoostStatus {
  isActive: boolean;
  tier?: 'basic' | 'premium' | 'none';
  remainingTime?: string;
  expiresAt?: string | Date;
  boostLevel?: number; // fixed from boost_level to camelCase
}

export interface AvailabilityScheduleSlot {
  start: string;
  end: string;
}

export interface AvailabilityScheduleDay {
  available: boolean;
  slots?: AvailabilityScheduleSlot[];
}

export interface AvailabilitySchedule {
  [day: string]: AvailabilityScheduleDay;
}

export interface Availability {
  schedule?: AvailabilitySchedule;
  nextAvailable?: string;
}

export interface StatusFlags {
  needsModeration?: boolean;
  hasPendingUpdates?: boolean;
  isPremiumExpiring?: boolean;
}

export interface SystemMetadata {
  source: 'ai_generated' | 'scraped' | 'manual';
  lastSynced?: Date;
  tagsGeneratedByAI: boolean;
  hilbertSpaceVector: number[];
  personalityIndex?: number;
  statusFlags?: StatusFlags;
}

export interface RoleFlags {
  isEscort?: boolean;
  isCreator?: boolean;
  isLivecam?: boolean;
  isAI?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
}

export interface Capabilities {
  hasPhotos?: boolean;
  hasVideos?: boolean;
  hasStories?: boolean;
  hasChat?: boolean;
  hasVoice?: boolean;
  hasBooking?: boolean;
  hasLiveStream?: boolean;
  hasExclusiveContent?: boolean;
  hasContent?: boolean;
  hasRealMeets?: boolean;
  hasVirtualMeets?: boolean;
}

export interface Monetization {
  acceptsLucoin?: boolean;
  acceptsTips?: boolean;
  subscriptionPrice?: number;
  unlockingPrice?: number;
  boostingActive?: boolean;
  meetingPrice?: number;
}

export interface Stats {
  rating?: number;
  reviewCount?: number;
  viewCount?: number;
  favoriteCount?: number;
  bookingCount?: number;
  responseTime?: number;
}

export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  username?: string;
  type: string;
  personality?: string;
  traits?: string[];
  interests?: string[];
  mood?: string;
  energyLevel?: number;
  rating?: number;
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  description?: string;
  location?: string;
  age?: number;
  ethnicity?: string;
  isVerified?: boolean;
  verificationLevel?: 'basic' | 'verified' | 'premium';
  isActive?: boolean;
  isAI?: boolean;
  isPremium?: boolean;
  isLocked?: boolean;
  isOnline?: boolean;
  tags?: string[];
  featured?: boolean;
  languages?: string[];
  services?: string[];
  availability?: Availability;
  systemMetadata?: SystemMetadata;
  roleFlags?: RoleFlags;
  capabilities?: Capabilities;
  monetization?: Monetization;
  price?: number;
  stats?: Stats;
  neuralModel?: NeuralModel;
  boostStatus?: BoostStatus; // fixed from boost_status to boostStatus
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface NeuralModel {
  id: string;
  name: string;
  version?: string;
  type: string;
  capabilities: string[];
  specialization: string | string[];
  size?: number;
  precision?: number;
  parameters?: {
    [key: string]: any;
  };
}
