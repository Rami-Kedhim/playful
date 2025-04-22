
export interface UberPersona {
  id: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  avatar_url?: string;
  thumbnailUrl?: string;
  isOnline?: boolean;
  isLocked?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  location?: string;
  availability?: {
    nextAvailable?: string;
    schedule?: any;
  };
  type?: string;
  tags?: string[];
  isPremium?: boolean;
  systemMetadata?: {
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      [key: string]: any;
    };
    version?: string;
    [key: string]: any;
  };
  
  // Adding missing properties referenced in code
  bio?: string;
  description?: string;
  roleFlags?: {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isAI?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
  };
  monetization?: {
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
    meetingPrice?: number;
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
  stats?: {
    rating?: number;
    reviewCount?: number;
    responseTime?: number;
    viewCount?: number;
    favoriteCount?: number;
    bookingCount?: number;
  };
  languages?: string[];
  services?: string[];
  traits?: string[];
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
  };
}
