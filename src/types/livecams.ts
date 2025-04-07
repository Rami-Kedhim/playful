
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

export interface BoostableLivecamsOptions {
  limit?: number;
  onlyLive?: boolean;
  categories?: string[];
}
