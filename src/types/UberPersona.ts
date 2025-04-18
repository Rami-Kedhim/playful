
// Updated UberPersona.ts - standardizing with more properties

export interface UberPersona {
  id: string;
  name: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  imageUrl?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  tagline?: string;
  profileType?: string;
  services?: string[];
  availability?: {
    status: 'available' | 'busy' | 'offline';
    nextAvailable?: string;
  };
  features?: {
    verified: boolean;
    featured: boolean;
    premium: boolean;
  };
  stats?: {
    rating: number;
    reviewCount: number;
    responseTime?: number;
  };
  featured?: boolean;
  isAI?: boolean;
  updatedAt?: Date;
  bio?: string;
  tags?: string[];
  location?: string;
  age?: number;
  price?: number;
  ethnicity?: string; // Added for PersonaProfile.tsx
  language?: string[]; // Added for PersonaProfile.tsx
  roleFlags?: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities?: string[] | {
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
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  isOnline?: boolean;
  rating?: number;
  traits?: {
    intelligence: number;
    creativity: number;
    charisma: number;
    empathy: number;
    assertiveness: number;
  };
  description?: string;
  background?: string;
  limitations?: string[];
  conversationStyle?: string;
  knowledgeDomains?: string[];
  specialization?: string;
  systemMetadata?: any; // Added for UberCore.ts
}
