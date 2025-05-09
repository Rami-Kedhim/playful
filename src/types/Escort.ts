
export interface Escort {
  id: string;
  name: string;
  gender: string; // Required property for compatibility
  age?: number;
  location?: string;
  locations?: string[]; // Add locations array property
  bio?: string;
  description?: string;
  rating?: number;
  price: number; // Required in extended version
  images?: string[];
  services?: string[];
  isVerified?: boolean;
  verified?: boolean;
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
  gallery_images?: string[]; // Add gallery_images property
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
  availability?: EscortAvailability; // Make sure this is the correct type
  payment_methods?: string[];
  deposit_required?: boolean;
  languages?: string[];
  profileImage?: string;
  imageUrl?: string;
  reviewCount?: number;
  tags?: string[];
  availableNow?: boolean;
  isAvailable?: boolean; // Add this property
  responseRate?: number;
  subscriptionPrice?: number;
  providesInPersonServices?: boolean; // Add this property
  providesVirtualContent?: boolean; // Add this property
  videos?: Video[]; // Add videos array
}

// Define the Video interface
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

// Create ExtendedEscort type that includes all required properties
export interface ExtendedEscort extends Escort {
  providesInPersonServices: boolean;
  providesVirtualContent: boolean;
  featured: boolean;
  reviewCount: number;
  tags: string[];
  imageUrl: string;
  profileImage: string;
  isAvailable: boolean;
}
