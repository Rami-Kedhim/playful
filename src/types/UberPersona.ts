
// Added missing optional properties to UberPersona interface to fix errors.
// Added isActive and type properties.

export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  language: string;
  bio: string;
  age: number;
  ethnicity: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  roleFlags: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities: {
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
  monetization: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  stats: {
    rating: number;
    reviewCount: number;
    responseTime?: number;
    viewCount: number;
    favoriteCount: number;
    bookingCount?: number;
  };

  description?: string;
  languages?: string[];
  services?: string[];
  traits?: any[];
  systemMetadata?: {
    source?: string;
    tagsGeneratedByAI?: boolean;
    lastSynced?: Date;
    boostScore?: number;
    hilbertSpaceVector?: number[];
    statusFlags?: {
      needsModeration?: boolean;
      hasPendingUpdates?: boolean;
      isPremiumExpiring?: boolean;
    };
    personalityIndex?: number;
  };
  isLocked?: boolean;
  isOnline?: boolean;
  availability?: any;
  isPremium?: boolean;
  isActive?: boolean;
  type?: 'escort' | 'creator' | 'livecam' | 'ai';
}
