
/**
 * Unified UberPersona type definition for the entire ecosystem
 */

export interface UberPersona {
  // Core identity fields
  id: string;
  name: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  imageUrl?: string;
  
  // Categorization
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  profileType?: string;
  tagline?: string;
  featured?: boolean;
  
  // Content and services
  services?: string[];
  tags?: string[];
  
  // Profile information
  bio?: string;
  location?: string;
  age?: number;
  ethnicity?: string;
  language?: string[];
  description?: string;
  background?: string;
  
  // Role flags - clear way to identify persona types
  roleFlags?: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  
  // Availability information
  availability?: {
    status: 'available' | 'busy' | 'offline';
    nextAvailable?: string;
  };
  isOnline?: boolean;
  
  // Status and verification
  isVerified?: boolean;
  isActive: boolean;
  isLocked?: boolean;
  isPremium?: boolean;
  isAI?: boolean;
  requiredAccessLevel?: string;
  
  // Media content capabilities
  capabilities?: string[] | {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasStories: boolean;
    hasChat: boolean;
    hasVoice: boolean;
    hasBooking: boolean;
    hasLiveStream: boolean;
    hasExclusiveContent: boolean;
    hasContent: boolean;
    hasRealMeets: boolean;
    hasVirtualMeets: boolean;
  };
  
  // Monetization settings
  monetization?: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  price?: number;
  
  // Stats information
  stats?: {
    rating: number;
    reviewCount: number;
    responseTime?: number;
    usageCount?: number;
    favoriteCount?: number;
    averageRating?: number;
    totalSessionDuration?: number;
    viewCount?: number;
  };
  rating?: number;
  
  // For AI personas
  traits?: {
    intelligence: number;
    creativity: number;
    charisma: number;
    empathy: number;
    assertiveness: number;
  };
  limitations?: string[];
  conversationStyle?: string;
  knowledgeDomains?: string[];
  specialization?: string;
  
  // System fields
  systemMetadata?: any;
  updatedAt?: Date;
  createdAt?: Date;
}

// Neural model definition
export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'deprecated';
  performance: {
    accuracy: number;
    latency: number;
    throughput: number;
  };
  createdAt: string;
  updatedAt: string;
  size?: number;
  precision?: number;
}

export interface SuperlativeBrainHubProps {
  models: NeuralModel[];
}
