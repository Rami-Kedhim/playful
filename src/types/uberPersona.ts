
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
  source: 'manual' | 'scraped' | 'ai_generated';
  lastSynced?: Date;
  aiPersonality?: string;
  aiMood?: string;
  aiEngine?: 'GPT' | 'Custom';
  tagsGeneratedByAI?: boolean;
}

// Mapping function to transform legacy escort objects to UberPersona
export const mapEscortToUberPersona = (escort: any): UberPersona => {
  return {
    id: escort.id,
    username: escort.name?.toLowerCase().replace(/\s/g, '_') || `escort_${escort.id.substring(0, 8)}`,
    displayName: escort.name || 'Unnamed',
    avatarUrl: escort.imageUrl || '',
    location: escort.location || '',
    language: escort.languages?.[0] || 'English',
    bio: escort.bio || escort.description || '',
    age: escort.age || 0,
    ethnicity: escort.ethnicity || '',
    tags: [...(escort.tags || []), ...(escort.services || [])],
    createdAt: escort.createdAt ? new Date(escort.createdAt) : new Date(),
    updatedAt: escort.updatedAt ? new Date(escort.updatedAt) : new Date(),
    
    roleFlags: {
      isEscort: true,
      isCreator: !!escort.gallery?.length,
      isLivecam: false,
      isAI: escort.isAI || false,
      isVerified: escort.verified || false,
      isFeatured: escort.featured || false
    },
    
    capabilities: {
      hasPhotos: !!escort.gallery?.length,
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
      boostingActive: escort.boostLevel > 0
    },
    
    systemMetadata: {
      source: escort.isScraped ? 'scraped' : escort.isAI ? 'ai_generated' : 'manual',
      lastSynced: escort.lastSynced ? new Date(escort.lastSynced) : undefined,
      aiPersonality: escort.isAI ? 'friendly' : undefined,
      aiMood: escort.isAI ? 'happy' : undefined,
      aiEngine: escort.isAI ? 'GPT' : undefined,
      tagsGeneratedByAI: escort.isAI || escort.isScraped || false
    }
  };
};
