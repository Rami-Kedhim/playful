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

// Comprehensive UberPersona interface that includes all required properties
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  username?: string;
  type: keyof UberPersonaType | string;
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
  isOnline?: boolean;
  verificationLevel?: 'basic' | 'verified' | 'premium';
  isActive?: boolean;
  isAI?: boolean;
  isPremium?: boolean;
  isLocked?: boolean;
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
  boostStatus?: BoostStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface NeuralModel {
  id: string;
  name: string;
  version?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  capabilities: string[];
  specialization: string | string[];
  size?: number;
  precision?: number;
  parameters?: {
    [key: string]: any;
  };
}
