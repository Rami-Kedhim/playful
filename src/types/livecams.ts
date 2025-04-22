
export interface LivecamModel {
  id: string;
  username: string;
  name: string; // Add name property
  displayName?: string; // Add displayName as optional property for backward compatibility
  thumbnailUrl: string;
  imageUrl: string;
  previewVideoUrl?: string;
  isLive: boolean;
  isStreaming: boolean;
  viewerCount: number;
  region: string;
  country?: string; // Add country property
  language: string;
  tags: string[];
  category: string;
  categories?: string[]; // Add categories as optional
  rating: number;
  price: number;
  isPopular?: boolean;
  profileUrl?: string;
  age?: number;
}

export interface Livecam {
  id: string;
  username: string;
  name: string;
  thumbnailUrl: string;
  imageUrl: string;
  isLive: boolean;
  isStreaming: boolean;
  viewerCount: number;
  region: string;
  language: string;
  tags: string[];
  category: string;
  rating: number;
  price?: number;
}

export interface LivecamCategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface LivecamFilter {
  category?: string;
  tag?: string;
  region?: string;
  language?: string;
  isLive?: boolean;
  sort?: 'popular' | 'newest' | 'rating';
}
