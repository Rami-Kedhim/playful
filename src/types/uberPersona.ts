
// UberPersona - Unified Profile Structure based on the new architecture

// Base Fields
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
  
  // Role Flags
  roleFlags: RoleFlags;
  
  // Capabilities
  capabilities: Capabilities;
  
  // Monetization
  monetization: Monetization;
  
  // System Integration Metadata
  systemMetadata: SystemMetadata;
}

// Role Flags
export interface RoleFlags {
  isEscort: boolean;
  isCreator: boolean;
  isLivecam: boolean;
  isAI: boolean;
  isVerified: boolean;
  isFeatured: boolean;
}

// Capabilities
export interface Capabilities {
  hasPhotos: boolean;
  hasVideos: boolean;
  hasStories: boolean;
  hasChat: boolean;
  hasVoice: boolean;
  hasBooking: boolean;
  hasLiveStream: boolean;
  hasExclusiveContent: boolean;
}

// Monetization
export interface Monetization {
  acceptsLucoin: boolean;
  acceptsTips: boolean;
  subscriptionPrice?: number;
  unlockingPrice?: number;
  boostingActive?: boolean;
}

// System Integration Metadata
export interface SystemMetadata {
  source: 'manual' | 'scraped' | 'ai_enhanced';
  lastSynced?: Date;
  aiPersonality?: string;
  aiMood?: string;
  aiEngine?: string;
  tagsGeneratedByAI?: boolean;
  enhancementLevel?: number;
  originalContentPercentage?: number;
}

// Updated mapper function to transform Escort objects to UberPersona with AI enhancement flag
export const mapEscortToUberPersona = (escort: any, isAIEnhanced: boolean = false): UberPersona => {
  return {
    id: escort.id,
    username: escort.name?.toLowerCase().replace(/\s/g, '_') || `escort_${escort.id.substring(0, 8)}`,
    displayName: escort.name || 'Unnamed',
    avatarUrl: escort.avatar_url || escort.imageUrl || '',
    location: escort.location || '',
    language: escort.languages?.[0] || 'English',
    bio: escort.bio || escort.description || '',
    age: escort.age || 0,
    ethnicity: escort.ethnicity || '',
    tags: [...(escort.tags || []), ...(escort.services || [])],
    createdAt: escort.created_at ? new Date(escort.created_at) : new Date(),
    updatedAt: escort.updated_at ? new Date(escort.updated_at) : new Date(),
    
    roleFlags: {
      isEscort: true,
      isCreator: !!escort.gallery?.length,
      isLivecam: false,
      isAI: false,
      isVerified: escort.is_verified || escort.verified || false,
      isFeatured: escort.is_featured || escort.featured || false
    },
    
    capabilities: {
      hasPhotos: !!(escort.gallery?.length || escort.gallery_images?.length),
      hasVideos: !!escort.videos?.length,
      hasStories: false,
      hasChat: true,
      hasVoice: false,
      hasBooking: true,
      hasLiveStream: false,
      hasExclusiveContent: !!escort.providesVirtualContent
    },
    
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: escort.subscriptionPrice || undefined,
      unlockingPrice: escort.price || undefined,
      boostingActive: !!escort.boostLevel
    },
    
    systemMetadata: {
      source: isAIEnhanced ? 'ai_enhanced' : 'manual',
      lastSynced: escort.lastSynced ? new Date(escort.lastSynced) : undefined,
      enhancementLevel: isAIEnhanced ? 1 : 0,
      originalContentPercentage: isAIEnhanced ? 80 : 100
    }
  };
};
