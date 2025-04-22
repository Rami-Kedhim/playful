export interface LivecamModel {
  id: string;
  displayName?: string;
  name: string; // Required property
  imageUrl?: string;
  thumbnailUrl: string;
  category?: string;
  viewerCount?: number;
  isLive?: boolean;
  streamUrl?: string;
  price?: number;
  
  // Adding properties needed across various components
  username?: string;
  previewVideoUrl?: string;
  isPopular?: boolean;
  rating?: number;
  tags?: string[];
  profileImage?: string;
  previewImage?: string;
  country?: string;
  categories?: string[];
  description?: string;
  boosted?: boolean;
  boostScore?: number;
  language?: string;
  region?: string;
  isStreaming?: boolean;
  age?: number;
}

export interface Livecam {
  id: string;
  name: string; // Required property
  username?: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount: number;
  tags?: string[];
  price?: number;
  rating?: number;
  category?: string;
  profileImageUrl?: string;
  age?: number;
  location?: string;
  description?: string;
  languages?: string[];
  categories?: string[];
  lastActive?: string;
  nextScheduled?: string;
  featured?: boolean;
  roomType?: string;
  isVerified?: boolean;
}

export interface LivecamsFilter {
  limit?: number;
  page?: number;
  country?: string;
  category?: string;
  isStreaming?: boolean;
}

export interface LivecamsResponse {
  models: LivecamModel[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface BoostableLivecamsOptions {
  limit?: number;
  onlyBoosted?: boolean;
  onlyLive?: boolean;
}
