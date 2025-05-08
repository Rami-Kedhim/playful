
export interface LivecamModel {
  id: string;
  displayName: string;
  username: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  location: string;
  age: number;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  hourlyRate?: number;
  languages?: string[];
  rating?: number;
  reviewCount?: number;
  boostScore?: number;
}

export interface LivecamCategory {
  id: string;
  name: string;
  description?: string;
  count: number;
  imageUrl?: string;
}

export interface LivecamFilter {
  gender?: string[];
  ageRange?: [number, number];
  categories?: string[];
  languages?: string[];
  priceRange?: [number, number];
  location?: string;
  onlyLive?: boolean;
  onlyVerified?: boolean;
  sortBy?: 'popularity' | 'newest' | 'rating' | 'price_low' | 'price_high';
}
