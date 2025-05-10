
// Adding this file to ensure the Escort type has all needed properties

export interface EscortAvailabilityDay {
  day: string;
  available: boolean;
}

export interface EscortAvailability {
  days: EscortAvailabilityDay[];
  hours?: string[];
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
  location?: string;
  images?: string[];
  imageUrls?: string[];
  mainImage?: string;
  services?: string[];
  languages?: string[];
  height?: string | number;
  weight?: string | number;
  availability?: string | string[] | EscortAvailability;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  
  // Adding missing properties
  orientation?: string;
  rates?: any;
  rate?: number; // For backward compatibility
  created_at?: string; // For sorting/filtering
  
  // Properties referenced in components
  avatar_url?: string;
  avatarUrl?: string;
  profileImage?: string;
  imageUrl?: string;
  tags?: string[];
  availableNow?: boolean;
  isAvailable?: boolean;
  reviewCount?: number;
}
