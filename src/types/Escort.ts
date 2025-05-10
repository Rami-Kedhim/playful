
// Adding this file to ensure the Escort type has all needed properties

export interface EscortAvailabilityDay {
  day: string;
  available: boolean;
}

export interface EscortAvailability {
  days?: EscortAvailabilityDay[];
  hours?: { start: string; end: string };
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
  day?: string;
  notes?: string;
  isAvailableNow?: boolean;
  locations?: string[];
  onlineHours?: {
    start: string;
    end: string;
  };
}

export interface Video {
  id: string;
  url?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  title?: string;
  duration?: number;
  viewCount?: number;
  createdAt?: string;
  isPremium?: boolean;
  views?: number;
  isPublished?: boolean;
  escortId?: string;
  videoUrl?: string;
}

export interface Escort {
  id: string;
  name: string;
  gender: string;
  age?: number;
  price: number;
  rating?: number;
  verified?: boolean;
  isVerified?: boolean;
  shortBio?: string;
  bio?: string;
  description?: string;
  location?: string;
  images?: string[];
  imageUrls?: string[];
  imageUrl?: string;
  mainImage?: string;
  services?: string[];
  languages?: string[];
  height?: string | number;
  weight?: string | number;
  
  // Add missing properties
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  bodyType?: string;
  sexualOrientation?: string;
  specialties?: string[];
  limitations?: string[];
  interests?: string[];
  payment_methods?: string[];
  deposit_required?: boolean;
  responseRate?: number;
  
  // Additional properties referenced in error messages
  availability?: string | string[] | EscortAvailability;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  orientation?: string;
  rates?: any;
  rate?: number;
  created_at?: string;
  birth_date?: string;
  birthDate?: string;
  joined_date?: string;
  avatar_url?: string;
  avatarUrl?: string;
  avatar?: string;
  profileImage?: string;
  tags?: string[];
  availableNow?: boolean;
  isAvailable?: boolean;
  reviewCount?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  stats?: {
    averageRating?: number;
    totalReviews?: number;
    reviewCount?: number;
    height?: string | number;
    weight?: string | number;
    bust?: string | number;
    waist?: string | number;
    hips?: string | number;
    rating?: number;
  };
  verificationLevel?: string;
  isFavorited?: boolean;
  lastActive?: string | Date;
  clientsServed?: number;
  gallery?: string[];
  gallery_images?: string[];
  videos?: Video[];
  featured?: boolean;
  boosted?: boolean;
  boostLevel?: number;
  isAI?: boolean;
  profileType?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    socialMedia?: Record<string, string>;
  };
  city?: string;
  shortDescription?: string;
  contentStats?: any;
  subscriptionPrice?: number;
}

// Explicitly export types
export { Video };
export type { EscortAvailability };
