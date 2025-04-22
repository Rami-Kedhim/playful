
export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  isLive: boolean;
  isStreaming: boolean;
  viewerCount: number;
  country?: string;
  region: string;
  language: string;
  tags: string[];
  category: string;
  categories?: string[];
  rating: number;
  age?: number;
  description?: string;
  streamUrl?: string;
  profileUrl?: string;
  boosted?: boolean;
  boostScore?: number;
  isPopular?: boolean;
}

export interface Livecam extends LivecamModel {
  // Any additional properties specific to Livecam but not in LivecamModel
}

export interface BoostableLivecamsOptions {
  limit?: number;
  offset?: number;
  onlyLive?: boolean;
  categories?: string[];
  region?: string;
  language?: string;
  sortBy?: 'boosted' | 'popular' | 'new' | 'rating';
}
