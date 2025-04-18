
// Update UberPersona interface to include missing properties
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
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
  rating?: number;
  tags?: string[];
  featured?: boolean;
  languages?: string[];
  services?: string[];
  traits?: string[];
  availability?: {
    schedule?: {
      [day: string]: {
        available: boolean;
        slots?: { start: string; end: string }[];
      };
    };
    nextAvailable?: string;
  };
  systemMetadata?: {
    version?: string;
    lastUpdated?: string;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      hasPendingUpdates?: boolean;
      isPremiumExpiring?: boolean;
    };
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
    hasVoice?: boolean;
    hasBooking?: boolean;
    hasLiveStream?: boolean;
    hasExclusiveContent?: boolean;
    hasContent?: boolean;
    hasRealMeets?: boolean;
    hasVirtualMeets?: boolean;
  };
  monetization?: {
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
    meetingPrice?: number;
  };
  price?: number;
  stats?: {
    rating?: number;
    reviewCount?: number;
    viewCount?: number;
    favoriteCount?: number;
    bookingCount?: number;
    responseTime?: number;
  };
  neuralModel?: NeuralModel;
}

export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  type: string;
  capabilities: string[];
  specialization: string | string[];
  size?: number;
  precision?: number;
  parameters?: {
    [key: string]: any;
  };
}

export type PersonaType = 'escort' | 'creator' | 'livecam' | 'ai';

export interface PersonaFilters {
  location?: string;
  minAge?: number;
  maxAge?: number;
  services?: string[];
  type?: PersonaType[];
  priceRange?: [number, number];
  rating?: number;
  verified?: boolean;
}
