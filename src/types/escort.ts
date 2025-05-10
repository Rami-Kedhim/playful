
export interface EscortAvailability {
  days?: string[];
  hours?: {
    start: string;
    end: string;
  };
  locations?: string[];
  onlineHours?: {
    start: string;
    end: string;
  };
}

export interface Escort {
  id: string;
  name: string;
  gender: string;
  age?: number;
  location?: string;
  locations?: string[];
  bio?: string;
  description?: string;
  rating?: number;
  price: number;
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
  languages?: string[];
  profileImage?: string;
  imageUrl?: string;
  reviewCount?: number;
  tags?: string[];
  availableNow?: boolean;
  isAvailable?: boolean;
  responseRate?: number;
  subscriptionPrice?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
}
