
// Unified Escort interface with full properties matching usage in components

export type EscortServiceType = 'in-person' | 'virtual' | 'both' | string;

export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  title?: string;
  duration?: number;
  isPublic?: boolean;
}

export interface Availability {
  day: string;
  slots?: {
    start: string;
    end: string;
  }[];
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  twoHour?: number; // legacy
  overnight?: number;
  weekend?: number;
}

export interface Stats {
  viewCount?: number;
  favoriteCount?: number;
  reviewCount?: number;
}

export type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium' | string;

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
  imageUrl?: string;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  images?: string[];
  gallery?: string[];
  gallery_images?: string[];
  videos?: Video[];
  isVerified?: boolean;
  verified?: boolean;
  is_verified?: boolean;
  verificationLevel?: VerificationLevel;
  verification_level?: VerificationLevel; // legacy
  price?: number;
  rating?: number;
  reviewCount?: number;
  reviews?: any[];
  serviceType?: EscortServiceType | string;
  services?: string[];
  tags?: string[];
  languages?: string[];
  ethnicity?: string;
  bodyType?: string;
  height?: string | number;
  weight?: string | number;
  hairColor?: string;
  eyeColor?: string;
  availability?: Availability[] | string[] | Record<string, any>;
  nextAvailable?: string;
  availableNow?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  profileType?: string;
  featured?: boolean;
  is_featured?: boolean;
  boostLevel?: number;
  responseRate?: number;
  isAI?: boolean;
  isFavorited?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
  userId?: string;
  rates?: Rates;
  stats?: Stats;
  lastActive?: string | Date; // For EscortCard lastActive prop
  [key: string]: any;
}

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
