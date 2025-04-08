
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
  room?: {
    id: string;
    name: string;
    capacity: number;
    viewerCount: number;
    status: 'active' | 'inactive' | 'private';
  };
}

export interface LiveTrendingBarProps {
  models: LivecamModel[];
}

export interface LivecamFeaturedProps {
  model: LivecamModel;
}

export interface LivecamsFilter {
  status: 'all' | 'live' | 'offline';
  categories: string[];
  gender: string;
  region: string;
  minViewers: number;
  sortBy: string;
}
