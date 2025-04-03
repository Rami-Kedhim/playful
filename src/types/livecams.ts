
export interface LivecamModel {
  id: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount?: number;
  country?: string;
  categories?: string[];
  age?: number;
  description?: string;
  language?: string;
  streamUrl?: string;
  previewVideoUrl?: string;
}

export interface LivecamsResponse {
  models: LivecamModel[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface LivecamsFilter {
  country?: string;
  category?: string;
  limit?: number;
  page?: number;
}
