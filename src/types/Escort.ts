
export interface Escort {
  id: string;
  userId?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  age?: number;
  gender?: string;
  imageUrls?: string[];
  mainImageUrl?: string;
  services?: string[];
  rates?: Record<string, number>;
  availability?: {
    weekday?: string[];
    weekend?: string[];
  };
  isVerified?: boolean;
  isOnline?: boolean;
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  height?: number;
  weight?: number;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  profileType?: string; // Added for compatibility
  // Add any other properties used in components
}
