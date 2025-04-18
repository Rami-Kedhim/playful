
export interface UberPersona {
  id: string;
  name: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai' | string;
  avatar: string;
  description?: string;
  location?: string;
  online?: boolean;
  rating?: number;
  reviews?: number;
  price?: number;
  featured?: boolean;
  tags?: string[];
  specialization?: string[];
  services?: string[];
  lastActive?: Date;
  createdAt?: Date;
  availableNow?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  languages?: string[];
  popularity?: number;
  escortId?: string;
  creatorId?: string;
  aiId?: string;
  isAI?: boolean;
  initialMessage?: string;
  mainImage?: string;
  images?: string[];
  
  // Additional properties being used in components
  displayName?: string;
  avatarUrl?: string;
  age?: number;
  updatedAt?: Date;
  bio?: string;
  roleFlags?: {
    isEscort?: boolean;
    isContentCreator?: boolean;
    isPremium?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
    isAI?: boolean;
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
  monetization?: {
    messageCost?: number;
    contentCost?: number;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    subscriptionCost?: number;
    hasSubscription?: boolean;
    acceptsLucoin?: boolean;
  };
  isOnline?: boolean;
  profileType?: string;
}
