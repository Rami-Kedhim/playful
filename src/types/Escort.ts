
// Unified Escort interface merged from multiple definitions and cleaned up for consistency

export interface Escort {
  id: string;
  name: string;
  username?: string;
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  orientation?: string;
  location?: string;
  bio?: string;
  description?: string;
  profileImage?: string;
  images?: string[];
  gallery?: string[];
  gallery_images?: string[];
  videos?: string[];
  isVerified?: boolean;
  verified?: boolean;
  verificationLevel?: string;
  verification_level?: string; // Legacy field
  price?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: any[];
  serviceType?: 'in-person' | 'virtual' | 'both' | string;
  services?: string[];
  tags?: string[];
  languages?: string[];
  ethnicity?: string;
  bodyType?: string;
  height?: string | number;
  weight?: string | number;
  hairColor?: string;
  eyeColor?: string;
  availability?: Record<string, any> | Availability[];
  nextAvailable?: string;
  availableNow?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  profileType?: string;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  imageUrl?: string;
  featured?: boolean;
  boostLevel?: number;
  responseRate?: number;
  isAI?: boolean;
  isFavorited?: boolean;

  rates?: {
    hourly?: number;
    twoHours?: number;
    twoHour?: number;
    overnight?: number;
    weekend?: number;
  };

  stats?: {
    viewCount?: number;
    favoriteCount?: number;
    reviewCount?: number;
  };

  [key: string]: any; // Allow additional dynamic properties
}

export interface Availability {
  day: string;
  slots?: {
    start: string;
    end: string;
  }[];
}

// Booking and Video remain separated, but can be included here for convenience

export interface Booking {
  id: string;
  escortId: string;
  escortName?: string;
  clientId?: string;
  userId?: string;
  date: string | Date;
  time?: string;
  startTime?: string;
  endTime?: string;
  duration: number; // minutes
  service: string;
  serviceType?: string;
  status: string | 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'rejected';
  price: number;
  location?: string;
  notes?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

