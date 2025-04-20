
// Update Escort interface to include optional sexualOrientation property
export interface Escort {
  id: string;
  name: string;
  age?: number;
  location?: string;
  description?: string;
  services?: string[];
  isVerified?: boolean;
  rating?: number;
  price?: number;
  profileImage?: string;
  images?: string[];
  featured?: boolean;
  serviceType?: 'in-person' | 'virtual' | 'both';
  languages?: string[];
  reviewCount?: number;
  ethnicity?: string;
  height?: string | number;
  weight?: string | number;
  hairColor?: string;
  eyeColor?: string;
  bodyType?: string;
  availability?: Record<string, any>;
  nextAvailable?: string;

  // Additional properties required by components
  rates?: {
    hourly?: number;
    twoHour?: number;
    overnight?: number;
    weekend?: number;
  };
  imageUrl?: string;
  avatarUrl?: string;
  avatar?: string;
  avatar_url?: string;
  verified?: boolean;
  availableNow?: boolean;
  tags?: string[];
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  stats?: {
    viewCount: number;
    favoriteCount: number;
    reviewCount: number;
  };
  verificationLevel?: string;
  isFavorited?: boolean;
  gender?: string;
  bio?: string;
  boostLevel?: number;
  responseRate?: number;
  isAI?: boolean;

  sexualOrientation?: string; // Added property here
}
