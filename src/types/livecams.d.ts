
export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  isStreaming?: boolean;
  viewerCount: number;
  tags: string[];
  rating?: number;
  price?: number;
  category?: string;
  categories?: string[];
  language: string;
  country?: string;
  description?: string;
  streamUrl?: string;
  age?: number;
  gender?: string;
  region?: string;
}

export interface Livecam {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  isStreaming?: boolean;
  viewerCount: number;
  tags: string[];
  rating?: number;
  price?: number;
  category?: string;
  categories?: string[];
  language: string;
  country?: string;
  description?: string;
}
