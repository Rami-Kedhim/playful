
// UberPersona type definition
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  description?: string; // Detailed description
  location?: string;
  age?: number;
  ethnicity?: string;
  isVerified?: boolean;
  isActive?: boolean;
  isAI?: boolean; // Explicitly flag AI personas
  isPremium?: boolean;
  isLocked?: boolean; 
  isOnline?: boolean;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  languages?: string[]; // Languages spoken
  services?: string[]; // Services offered
  traits?: string[]; // Personal traits/characteristics
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
  stats?: {
    rating?: number;
    reviewCount?: number;
    viewCount?: number;
    favoriteCount?: number;
    bookingCount?: number;
    responseTime?: number; // Average response time in minutes
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
  availability?: {
    schedule?: Record<string, any>;
    nextAvailable?: string;
  };
  systemMetadata?: {
    version?: string;
    lastUpdated?: string;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      isPromoted?: boolean;
      isArchived?: boolean;
    };
  };
}
