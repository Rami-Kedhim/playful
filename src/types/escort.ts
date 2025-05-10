
export interface EscortAvailabilityDay {
  day: string;
  available: boolean;
  hours?: { start: string; end: string }[];
}

export interface EscortAvailability {
  days: string[] | EscortAvailabilityDay[];
}

export interface Video {
  id?: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
}

export interface Escort {
  id: string;
  name: string;
  bio?: string;
  age?: number;
  gender?: string;
  photos?: string[];
  videos?: Video[];
  services?: string[];
  rates?: {
    hourly?: number;
    overnight?: number;
    weekend?: number;
    twoHours?: number;
  };
  location?: string;
  availability?: string | string[] | EscortAvailability;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  reviews?: {
    rating: number;
    comment: string;
    date: Date | string;
    user: string;
  }[];
  rating?: number;
  isFavorite?: boolean;
  isVerified?: boolean;
  verificationLevel?: string;
  languages?: string[];
  body?: {
    height?: number;
    weight?: number;
    measurements?: string;
    eyeColor?: string;
    hairColor?: string;
    ethnicity?: string;
  };
  price?: number;
  responseRate?: number;
  height?: string;
  imageUrl?: string;
  profileImage?: string;
  reviewCount?: number;
  avatar?: string;
}

export type VerificationLevel = 'NONE' | 'BASIC' | 'VERIFIED' | 'PREMIUM';

export const verificationLevels: {[key: string]: VerificationLevel} = {
  NONE: 'NONE',
  BASIC: 'BASIC',
  VERIFIED: 'VERIFIED',
  PREMIUM: 'PREMIUM',
};
