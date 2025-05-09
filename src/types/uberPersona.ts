
/**
 * UberPersona type definitions
 * Unified type system for all persona types across the platform
 */

export type ID = string;

export type PersonaType = 'escort' | 'creator' | 'livecam' | 'ai' | string;

export interface UberPersona {
  id: ID;
  name: string;
  type: PersonaType;
  displayName?: string;
  avatarUrl?: string;
  imageUrl?: string;
  profileImageUrl?: string;
  location?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  isActive?: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isPremium?: boolean;
  isFeatured?: boolean;
  isAI?: boolean;
  reviews?: any[];
  availability?: Array<{ start: Date; end: Date; }> | { nextAvailable: Date; };
  boostScore?: number;
  description?: string;
  bio?: string; // Added missing property
  personality?: string;
  traits?: string[];
  interests?: string[];
  mood?: string;
  energyLevel?: number;
  lastModified?: Date | string;
  createdAt?: Date | string;
  services?: string[];
  languages?: string[];
  
  systemMetadata?: {
    boostScore?: number;
    lastActive?: Date;
    createdAt?: Date;
    profileViews?: number;
    lastSynced?: Date;
    source?: string;
    tagsGeneratedByAI?: boolean;
    hilbertSpaceVector?: any[];
    statusFlags?: {
      isVerified?: boolean;
      isActive?: boolean;
      isFreemium?: boolean;
      isSubscriber?: boolean;
    }
  };
  
  stats?: {
    views?: number;
    likes?: number;
    bookings?: number;
    completion?: number;
    responseRate?: number;
    responseTime?: number;
    rating?: number;
    reviewCount?: number;
  };
  
  monetization?: {
    hourlyRate?: number;
    packages?: Array<{
      id: string;
      name: string;
      price: number;
      duration: string;
      description?: string;
    }>;
    acceptsUbx?: boolean;
    minRate?: number;
    maxRate?: number;
    meetingPrice?: number;
    acceptsLucoin?: boolean;
  };
  
  roleFlags?: {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isAI?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
  };
  
  capabilities?: {
    hasPhotos?: boolean;
    hasVideos?: boolean;
    hasStories?: boolean;
    hasChat?: boolean;
    hasBooking?: boolean;
    hasLiveStream?: boolean;
    hasExclusiveContent?: boolean;
    hasContent?: boolean;
    hasRealMeets?: boolean;
    hasVirtualMeets?: boolean;
  };
}

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
  subscriptionPrice: number;
  unlockingPrice: number;
  boostingActive: boolean;
  meetingPrice: number;
}

export interface PersonaSearchParams {
  query?: string;
  location?: string;
  type?: string[];
  tags?: string[];
  isVerified?: boolean;
  isOnline?: boolean;
  isPremium?: boolean;
  limit?: number;
  offset?: number;
  page?: number;
  sort?: string;
}

export const normalizeUberPersonaFeatures = (features: UberPersonaFeatures | string[]): UberPersonaFeatures => {
  if (Array.isArray(features)) {
    return {
      hasPhotos: features.includes('photos'),
      hasVideos: features.includes('videos'),
      hasStories: features.includes('stories'),
      hasChat: features.includes('chat'),
      hasBooking: features.includes('booking'),
      hasLiveStream: features.includes('livestream'),
      hasExclusiveContent: features.includes('exclusive'),
      hasContent: features.includes('content'),
      hasRealMeets: features.includes('realmeets'),
      hasVirtualMeets: features.includes('virtualmeets')
    };
  }
  return features as UberPersonaFeatures;
};
