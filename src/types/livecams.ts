
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
  boostScore?: number;
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
  boostScore?: number;
}

export interface LivecamFilter {
  isLive?: boolean;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  language?: string;
  country?: string;
  gender?: string;
  region?: string;
}

export interface LivecamComment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  livecamId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface LivecamTip {
  id: string;
  userId: string;
  username: string;
  livecamId: string;
  amount: number;
  message?: string;
  timestamp: string;
  isAnonymous: boolean;
}
