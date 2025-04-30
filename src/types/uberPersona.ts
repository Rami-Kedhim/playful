
/**
 * UberPersona - Unified interface for all persona types in the UberEscorts ecosystem
 */

export type PersonaSource = 'ai_generated' | 'scraped' | 'manual';

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

export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: UberPersonaType;
  avatarUrl?: string;
  location?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastActive?: Date;
  isPremium?: boolean;
  availability?: {
    schedule?: AvailabilitySchedule;
    nextAvailable?: string;
  };
  tags?: string[];
  systemMetadata?: {
    source: PersonaSource;
    lastSynced?: Date;
    tagsGeneratedByAI?: boolean;
    hilbertSpaceVector?: number[];
    personalityIndex?: number;
    statusFlags?: Record<string, boolean>;
    flowScore?: number;
  };
  isLocked?: boolean;
}

export type UberPersonaType = 'escort' | 'creator' | 'livecam' | 'ai';

export interface UberPersonaFeatures {
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
}

export interface UberPersonaPricing {
  acceptsLucoin: boolean;
  acceptsTips: boolean;
  subscriptionPrice?: number;
  unlockingPrice?: number;
  boostingActive?: boolean;
  meetingPrice?: number;
}
