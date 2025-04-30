
export interface UberPersonaType {
  escort: 'escort';
  creator: 'creator';
  livecam: 'livecam';
  ai: 'ai';
  user: 'user';
}

export interface RoleFlags {
  isEscort: boolean;
  isCreator: boolean;
  isLivecam: boolean;
  isAI: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  [key: string]: boolean; // Allow string indexing
}

export interface Capabilities {
  hasPhotos: boolean;
  hasVideos: boolean;
  hasStories: boolean;
  hasChat: boolean;
  hasBooking: boolean;
  hasLiveStream: boolean;
  hasExclusiveContent: boolean;
  hasContent: boolean;
  hasRealMeets: boolean;
  hasVirtualMeets: boolean;
  [key: string]: boolean; // Allow string indexing
}

export interface StatusFlags {
  isOnline?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  needsModeration?: boolean;
  hasPendingUpdates?: boolean;
  isPremiumExpiring?: boolean;
  isFreemium?: boolean;
  isSubscriber?: boolean;
  isActive?: boolean;
  [key: string]: boolean | undefined; // Allow string indexing
}

export interface BoostStatus {
  isActive: boolean;
  tier?: 'basic' | 'premium' | 'none';
  remainingTime?: string;
  expiresAt?: Date;
  boostLevel?: number;
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

export interface SystemMetadata {
  source: 'ai_generated' | 'scraped' | 'manual';
  lastSynced?: Date;
  tagsGeneratedByAI: boolean;
  hilbertSpaceVector: number[];
  personalityIndex?: number;
  statusFlags?: StatusFlags;
  [key: string]: any; // Allow additional system metadata
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
  responseTime?: number;
  viewCount?: number;
  favoriteCount?: number;
  bookingCount?: number;
}

// Export the UberPersona type from UberPersona.ts properly
export type { UberPersona } from './UberPersona';
