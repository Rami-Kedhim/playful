
export interface LivecamModel {
  id: string;
  displayName: string;
  username: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  location?: string;
  age?: number;
  description?: string;
  imageUrl: string;
  thumbnailUrl: string;
  hourlyRate?: number;
  languages?: string[];
  rating?: number;
  reviewCount?: number;
  boostScore?: number;
  name: string;
  country?: string;
  categories?: string[];
  category?: string;
  isStreaming?: boolean;
  streamUrl?: string;
  profileUrl?: string;
  boosted?: boolean;
  isPopular?: boolean;
  region?: string;
  price?: number;
  language?: string;
  isBoosted?: boolean;
}

export interface Livecam extends LivecamModel {
  // Any additional properties specific to Livecam instances
  title?: string;
  startTime?: Date | string;
  quality?: string;
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

export interface LivecamContextType {
  livecams: Livecam[];
  loadingLivecams: boolean;
  error: string | null;
  fetchLivecams: () => Promise<void>;
  getLivecamById?: (id: string) => Livecam | undefined;
}

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "massage" | "dinner" | "";
