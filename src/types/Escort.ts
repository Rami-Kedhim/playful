
export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender: string; // Required property
  location?: string;
  locations?: string[]; // Adding locations property
  bio?: string;
  rating?: number;
  price?: number;
  images?: string[];
  services?: string[];
  isVerified?: boolean;
  featured?: boolean;
  isAI?: boolean;
  profileType?: string;
  boostLevel?: number;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  rates?: Record<string, any>;
  gallery?: string[];
  gallery_images?: string[]; // Add support for gallery_images
  stats?: Record<string, any>;
  height?: string | number;
  weight?: string | number;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  sexualOrientation?: string;
  interests?: string[];
  specialties?: string[];
  limitations?: string[];
  bodyType?: string;
  avatar?: string;
  avatar_url?: string;
  avatarUrl?: string;
  isFavorited?: boolean;
  lastActive?: Date | string;
  clientsServed?: number;
  verificationLevel?: string;
  availability?: EscortAvailability;
  payment_methods?: string[];
  deposit_required?: boolean;
  
  // Add missing properties
  languages?: string[];
  profileImage?: string;
  imageUrl?: string;
  verified?: boolean;
  reviewCount?: number;
  tags?: string[];
  availableNow?: boolean;
  isAvailable?: boolean; // Add this property
  responseRate?: number;
  description?: string;
  subscriptionPrice?: number;
  videos?: Video[]; // Add videos array
  
  // Add service type flags
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  created_at?: Date | string;
}

export interface EscortAvailability {
  days?: Array<{
    day: string;
    available: boolean;
    hours?: Array<{
      start: string;
      end: string;
    }>;
  }>;
  notes?: string;
  isAvailableNow?: boolean;
}

// Export as Availability for components that import it
export type Availability = EscortAvailability;

// Add Video interface
export interface Video {
  id: string;
  title?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  videoUrl?: string;
  duration?: number;
  viewCount?: number;
  views?: number;
  createdAt?: string;
  isPremium?: boolean;
  isPublished?: boolean;
  escortId?: string;
}

// Create ExtendedEscort type that includes all required properties
export interface ExtendedEscort extends Escort {
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
  featured: boolean;
  reviewCount: number;
  tags: string[];
  imageUrl: string;
  profileImage: string;
}
