
/**
 * UberPersona Type Definition
 * Unified representation of all entities in the Uber ecosystem
 */

export interface RoleFlags {
  isEscort: boolean;
  isCreator: boolean;
  isLivecam: boolean;
  isAI: boolean;
  isVerified: boolean;
  isFeatured: boolean;
}

export interface Capabilities {
  hasPhotos: boolean;
  hasVideos: boolean;
  hasStories: boolean;
  hasChat: boolean;
  hasVoice?: boolean;
  hasBooking: boolean;
  hasLiveStream: boolean;
  hasExclusiveContent: boolean;
  hasContent?: boolean;
  hasRealMeets?: boolean;
  hasVirtualMeets?: boolean;
  hasMetaversePresence?: boolean;
  hasAICompanion?: boolean;
}

export interface Monetization {
  acceptsLucoin: boolean;
  acceptsTips: boolean;
  subscriptionPrice?: number;
  unlockingPrice?: number;
  boostingActive?: boolean;
  meetingPrice?: number;
  contentPrices?: {
    photos?: number;
    videos?: number;
    stories?: number;
    metaverseAccess?: number;
  };
}

export interface SystemMetadata {
  source: 'scraped' | 'manual' | 'ai_generated';
  lastSynced?: Date;
  aiPersonality?: string;
  aiMood?: string;
  aiEngine?: string;
  tagsGeneratedByAI: boolean;
  hilbertSpaceVector?: number[]; // For advanced mathematical positioning in the ecosystem
  hilbertCluster?: string;
  similarityScore?: number;
  boostScore?: number;
  qualityScore?: number;
  relevanceScore?: number;
}

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
  roleFlags: RoleFlags;
  capabilities: Capabilities;
  monetization: Monetization;
  systemMetadata?: SystemMetadata;
  stats?: {
    rating: number;
    reviewCount: number;
    responseRate: number;
    viewCount: number;
    favoriteCount: number;
    bookingCount?: number;
  };
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    onlyfans?: string;
    tiktok?: string;
    snapchat?: string;
  };
  availability?: {
    schedule: Record<string, boolean>;
    customHours?: Record<string, string>;
    timezone: string;
    availableNow: boolean;
  };
  // Legacy compatibility fields
  name?: string;
  image?: string;
  imageUrl?: string;
  profileType?: string;
  description?: string;
  rating?: number;
  price?: number;
  isVerified?: boolean;
  isActive?: boolean;
  isOnline?: boolean;
  featured?: boolean; // Added this property
  services?: string[]; // Added this property
  personaFlags?: {
    isEscort?: boolean;
    isCreator?: boolean;
    isVerified?: boolean;
  };
  contentCount?: {
    photos: number;
    videos: number;
    streams?: number;
  };
  system?: {
    lastActiveAt?: string | Date;
  };
}

export interface AIContext {
  isEnabled: boolean;
  preference: AIPreferences;
  lastInteractionTime?: Date;
  currentMood?: string;
  interactions: number;
  topicsInteractedWith: string[];
  hilbertCoordinates?: number[]; // For positioning in Hilbert space
}

export interface AIPreferences {
  aiEnabled: boolean;
  suggestionsEnabled: boolean;
  personality: string;
  language: string;
  tone: string;
  interactions: {
    welcomeEnabled: boolean;
    idleSuggestionsEnabled: boolean;
    touchInteractionEnabled: boolean;
  };
}
