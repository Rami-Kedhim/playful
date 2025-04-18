
export interface UberPersona {
  id: string;
  name: string;
  imageUrl: string;
  traits: {
    intelligence: number;
    creativity: number;
    charisma: number;
    empathy: number;
    assertiveness: number;
  };
  description: string;
  background: string;
  capabilities: string[] | {
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
  limitations: string[];
  conversationStyle: string;
  stats: {
    usageCount: number;
    favoriteCount: number;
    averageRating: number;
    totalSessionDuration: number;
    rating?: number;
    reviewCount?: number;
    responseTime?: number;
    viewCount?: number;
  };
  isActive: boolean;
  isLocked?: boolean;
  isPremium?: boolean;
  requiredAccessLevel?: string;
  specialization?: string;
  knowledgeDomains?: string[];
  
  // Additional properties used in various components
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
  tags?: string[];
  updatedAt?: Date;
  roleFlags?: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  monetization?: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  price?: number;
  isOnline?: boolean;
  rating?: number;
  age?: number;
  profileType?: string; // Added for UberPersonaContext
  services?: string[]; // Added for UberPersonaContext
  isAI?: boolean; // Added for UberPersonaContext
  featured?: boolean; // For rankPersonas function
}
