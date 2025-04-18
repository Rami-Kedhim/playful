
import { Escort } from '@/types/escort';

export interface MappedProfile {
  id: string;
  name: string;
  displayName: string;
  username?: string;
  bio: string;
  images: string[];
  age: number;
  location: string;
  tags: string[];
  verificationLevel: string;
  profileType: 'verified' | 'ai' | 'provisional' | 'scraped';
  rating: number;
  price: number;
  availability: {
    isAvailable: boolean;
    nextAvailable?: string;
  };
  services: string[];
  stats: {
    views: number;
    likes: number;
    followers: number;
  };
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  contactInfo: {
    email?: string;
    phone?: string;
  };
  isFavorited: boolean;
  lastActive?: string;
}

export const mapEscortToProfile = (escort: Escort): MappedProfile => {
  // Define profile type
  let profileType: 'verified' | 'ai' | 'provisional' | 'scraped' = 'provisional';
  
  if (escort.profileType) {
    profileType = escort.profileType;
  } else {
    if (escort.isVerified) {
      profileType = 'verified';
    } else if (escort.isAI) {
      profileType = 'ai';
    } else if (escort.isScraped) {
      profileType = 'scraped';
    }
  }
  
  return {
    id: escort.id,
    name: escort.name,
    displayName: escort.name,
    bio: escort.bio || escort.description || '',
    images: escort.images || escort.gallery || [],
    age: escort.age,
    location: escort.location,
    tags: escort.tags || escort.services || [],
    verificationLevel: escort.verificationLevel || (escort.isVerified ? 'verified' : 'unverified'),
    profileType,
    rating: escort.rating || 0,
    price: escort.price,
    availability: {
      isAvailable: escort.availableNow || false,
      nextAvailable: escort.availability?.nextAvailable
    },
    services: escort.services || [],
    stats: {
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      followers: Math.floor(Math.random() * 50)
    },
    contactInfo: {
      email: escort.contactInfo?.email,
      phone: escort.contactInfo?.phone
    },
    isFavorited: escort.isFavorited || false,
    lastActive: escort.lastActive
  };
};

export const mapProfileToSearchResult = (profile: MappedProfile) => {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    location: profile.location,
    image: profile.images[0] || '',
    rating: profile.rating,
    price: profile.price,
    isVerified: profile.profileType === 'verified',
    isAvailable: profile.availability.isAvailable,
    tags: profile.tags.slice(0, 3)
  };
};

export default { mapEscortToProfile, mapProfileToSearchResult };
