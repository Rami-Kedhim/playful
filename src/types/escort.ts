
// Extended Escort interface with missing properties (reviewCount, providesVirtualContent, isFavorited, description, responseRate, bodyType, etc.)

export interface Escort {
  id: string;
  name: string;
  username?: string;
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  isVerified?: boolean;
  verificationLevel?: string;
  verification_level?: string; // Legacy field
  price?: number;
  rating?: number;
  serviceType?: 'in-person' | 'virtual' | 'both';

  gallery?: string[];
  gallery_images?: string[];
  images?: string[];
  videos?: string[];

  imageUrl?: string;
  avatarUrl?: string;
  avatar?: string;
  avatar_url?: string;
  verified?: boolean;
  availableNow?: boolean;
  tags?: string[];
  reviews?: any[];
  reviewCount?: number;
  description?: string;
  responseRate?: number;
  bodyType?: string;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isFavorited?: boolean;
  profileType?: string;
  boostLevel?: number;
  measures?: string;
  favoriteCount?: number;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];

  // Possibly other optional fields
}

export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: Date;
  duration: number; // in minutes
  service: string;
  status: string;
  price: number;
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  serviceType?: string;
}
