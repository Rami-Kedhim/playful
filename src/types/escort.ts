
export interface Escort {
  id: string;
  name: string;
  username?: string;
  age?: number;
  gender?: string;
  sexualOrientation?: string;
  location?: string;
  bio?: string;
  description?: string; // Added to fix missing description prop refs
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

  imageUrl?: string; // Added for components eg. ContentCard, FeaturedContentSection
  avatarUrl?: string;
  avatar?: string;
  avatar_url?: string;
  verified?: boolean;
  availableNow?: boolean;
  tags?: string[];
  reviews?: any[];
  reviewCount?: number;  // Added for missing property refs
  responseRate?: number; // Added for missing property refs
  bodyType?: string;     // Added for missing property refs
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isFavorited?: boolean; // Added for missing property refs
  profileType?: string;
  boostLevel?: number;
  measures?: string;     // Added, since some places use 'measures' instead of 'measurements'
  height?: number | string;  // Added for typing fix
  weight?: number | string;  // Added for typing fix
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];

  rates?: {             // Fixed to optional to allow rates accesses
    hourly?: number;
    twoHours?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };

  stats?: {
    viewCount?: number;
    favoriteCount?: number;
    reviewCount?: number;
  };

  isAI?: boolean;

  [key: string]: any;   // Allow flexible additional properties for gradual migration
}
