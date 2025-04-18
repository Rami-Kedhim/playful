
// Enhanced shared UberPersona type definition
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai' | string;
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  location?: string;
  age?: number;
  ethnicity?: string;
  isVerified?: boolean;
  isActive?: boolean;
  rating?: number;
  stats?: {
    rating?: number;
    reviewCount?: number;
    viewCount?: number;
    favoriteCount?: number;
    bookingCount?: number;
  };
  reviewCount?: number; // For backward compatibility
  tags?: string[];
  featured?: boolean;
  verificationLevel?: 'basic' | 'advanced' | 'premium';
  roleFlags?: {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isAI?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
  };
  capabilities?: {
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
  } | string[];
  monetization?: {
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
    meetingPrice?: number; 
  };
  price?: number;
}

// Neural model definition for UberCore
export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  type: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'deprecated' | 'training' | 'error';
  performance: {
    accuracy: number;
    latency: number;
    resourceUsage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  specialization?: string | string[];
  size?: number;
  precision?: number;
}

// Helper functions for type-safe capability checks
export function hasCapability(persona: UberPersona, capability: string): boolean {
  if (!persona.capabilities) return false;
  
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes(capability);
  }
  
  return persona.capabilities[capability as keyof typeof persona.capabilities] === true;
}

// Helper functions for specific capabilities
export function hasRealMeets(persona: UberPersona): boolean {
  if (!persona.capabilities) return false;
  
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes('hasRealMeets');
  }
  
  return persona.capabilities.hasRealMeets === true;
}

export function hasVirtualMeets(persona: UberPersona): boolean {
  if (!persona.capabilities) return false;
  
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes('hasVirtualMeets');
  }
  
  return persona.capabilities.hasVirtualMeets === true;
}

export function hasContent(persona: UberPersona): boolean {
  if (!persona.capabilities) return false;
  
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes('hasContent');
  }
  
  return persona.capabilities.hasContent === true;
}

export function hasExclusiveContent(persona: UberPersona): boolean {
  if (!persona.capabilities) return false;
  
  if (Array.isArray(persona.capabilities)) {
    return persona.capabilities.includes('hasExclusiveContent');
  }
  
  return persona.capabilities.hasExclusiveContent === true;
}
