
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  username?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  personality?: string;
  traits?: string[]; // added traits as optional
  interests?: string[];
  mood?: string;
  energyLevel?: number;
  rating?: number;
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  description?: string; // added description as optional
  location?: string;
  age?: number;
  ethnicity?: string;
  isVerified?: boolean; // add as optional
  isOnline?: boolean;   // add as optional
  verificationLevel?: 'basic' | 'verified' | 'premium';
  isActive?: boolean;
  isAI?: boolean;
  isPremium?: boolean;
  isLocked?: boolean;
  tags?: string[];
  featured?: boolean;
  languages?: string[];
  services?: string[]; // added services as optional
  availability?: {
    nextAvailable?: string;
    schedule?: {
      [day: string]: {
        available: boolean;
        slots?: { start: string; end: string }[];
      };
    };
  };
  systemMetadata?: {
    source: 'ai_generated' | 'scraped' | 'manual';
    lastSynced?: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
  };
  roleFlags?: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities?: {
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
    rating: number;
    reviewCount: number;
    responseTime: number;
    viewCount: number;
    favoriteCount: number;
    bookingCount?: number; // added bookingCount as optional
  };
  boostStatus?: {
    isActive: boolean;
    tier?: 'basic' | 'premium' | 'none';
    remainingTime?: string;
    expiresAt?: string | Date;
    boostLevel?: number;
  };
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
