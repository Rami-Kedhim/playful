
export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount?: number;
  tags?: string[];
  boosted?: boolean;
  boostScore?: number;
  boostRank?: string;
  profileUrl?: string;
  region?: string;
  language?: string;
  category?: string;
  isStreaming?: boolean;
  rating?: number;
  country?: string;
  categories?: string[];
  description?: string;
  age?: number;
  streamUrl?: string;
  previewVideoUrl?: string;
}

export interface Livecam {
  id: string;
  username: string;
  name?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isStreaming?: boolean;
  viewerCount: number;
  tags?: string[];
  category?: string;
  region?: string;
  language?: string;
  rating?: number;
}

export interface LivecamsFilter {
  country?: string;
  category?: string;
  limit?: number;
  page?: number;
  onlyLive?: boolean;
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
  onlyLive?: boolean;
  categories?: string[];
}
