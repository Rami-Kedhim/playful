
export interface Escort {
  id: string;
  name: string;
  location: string;
  age?: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  imageUrl?: string;
  avatar_url?: string;
  price: number;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  bio?: string;
  height?: string;
  weight?: string;
  bodyType?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  languages?: string[];
  videos?: {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    isPremium?: boolean;
  }[];
}

export interface EscortFilter {
  search: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  services: string[];
  verifiedOnly: boolean;
  gender?: string[];
  orientation?: string[];
  minAge?: number;
  maxAge?: number;
  minRating?: number;
  availableNow?: boolean;
}

export type EscortSortOption = 
  | "featured" 
  | "rating" 
  | "price-low" 
  | "price-high" 
  | "reviews" 
  | "newest";
