
/**
 * UberPersona type definitions
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
  profileImageUrl?: string; // Added for compatibility
  location?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  isPremium?: boolean;
  availability?: Array<{ start: Date; end: Date; schedule?: any }> | { nextAvailable: Date; };
  boostScore?: number;
  systemMetadata?: {
    boostScore?: number;
    lastActive?: Date;
    createdAt?: Date;
    profileViews?: number;
    lastSynced?: Date;
    source?: string; // Added for compatibility
    tagsGeneratedByAI?: boolean;
    hilbertSpaceVector?: any[];
    statusFlags?: {
      isVerified?: boolean;
      isActive?: boolean;
      isFreemium?: boolean;
      isSubscriber?: boolean;
    }
  };
  services?: string[];
  bio?: string;
  description?: string;
  languages?: string[];
  traits?: string[];
  stats?: {
    views?: number;
    likes?: number;
    bookings?: number;
    completion?: number;
    responseRate?: number;
    responseTime?: number;
    rating?: number; // Added for compatibility
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
  // For PersonaService compatibility
  data?: UberPersona[];
  meta?: {
    pagination?: {
      total?: number;
      page?: number;
      pageSize?: number;
    };
  };
}
