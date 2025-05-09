
export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender: string; // Required property
  location?: string;
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
  responseRate?: number;
  description?: string;
  subscriptionPrice?: number;
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
