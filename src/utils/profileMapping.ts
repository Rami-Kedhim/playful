
import { Escort } from '@/types/escort';

// Interface for UberPersona model
export interface UberPersona {
  id: string;
  name: string;
  profileType: 'verified' | 'ai' | 'provisional' | 'scraped';
  profileImage: string;
  images: string[];
  description: string;
  services: string[];
  location: string;
  stats: {
    rating: number;
    reviewCount: number;
    responseRate: number;
  };
  pricing: {
    hourly: number;
    base: number;
    specialServices?: Record<string, number>;
  };
  availability: {
    schedule: string[]; // e.g. ['Monday', 'Tuesday', 'Friday']
    timeWindows: string[]; // e.g. ['10:00-18:00', '19:00-22:00']
  };
  tags: string[];
  featured: boolean;
  isAI?: boolean;
}

/**
 * Maps an escort model to the UberPersona format
 * @param escort The escort data to convert
 * @returns UberPersona formatted data
 */
export const mapEscortToUberPersona = (escort: Escort): UberPersona => {
  return {
    id: escort.id,
    name: escort.name,
    profileType: escort.isVerified ? 'verified' : 'provisional',
    profileImage: escort.images[0] || '',
    images: escort.images || [],
    description: escort.bio || '',
    services: escort.services || [],
    location: escort.location || '',
    stats: {
      rating: escort.rating || 4.5,
      reviewCount: escort.reviewCount || 0,
      responseRate: 0.85, // Default
    },
    pricing: {
      hourly: escort.price || 0,
      base: escort.price ? escort.price * 0.8 : 0,
    },
    availability: {
      schedule: ['Monday', 'Wednesday', 'Friday'], // Mock data
      timeWindows: ['10:00-18:00', '19:00-22:00'], // Mock data
    },
    tags: ['New', 'Trending'].concat(escort.services.slice(0, 2)),
    featured: escort.featured || false,
    isAI: escort.isAI || false
  };
};

/**
 * Maps multiple escorts to UberPersonas
 */
export const mapEscortsToUberPersonas = (escorts: Escort[]): UberPersona[] => {
  return escorts.map(escort => mapEscortToUberPersona(escort));
};

/**
 * Helper function to determine if a profile is AI generated
 */
export const isAIProfile = (profile: UberPersona): boolean => {
  return profile.profileType === "ai" || profile.isAI === true;
};

/**
 * Helper function to get appropriate styling class based on profile type
 */
export const getProfileTypeClass = (type: string): string => {
  switch(type) {
    case 'verified': return 'border-green-500';
    case 'ai': return 'border-purple-500';
    case 'provisional': return 'border-yellow-500';
    case 'scraped': return 'border-gray-500';
    default: return '';
  }
};
