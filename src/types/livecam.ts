
export interface Livecam {
  id: string;
  name: string;
  username: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  profileImage: string;
  previewImage: string;
  isVerified: boolean;
  rating: number;
  price: number;
  roomType: 'public' | 'private' | 'premium';
  languages: string[];
  category: string;
  featured: boolean;
  nextStreamTime?: string;
  description?: string;
  
  // Additional properties
  displayName?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  location?: string;
  region?: string;
  country?: string;
  language?: string;
  ethnicity?: string;
  age?: number;
  categories?: string[];
  isStreaming?: boolean;
  boosted?: boolean;
  boostScore?: number;
  isVerified?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  previewVideoUrl?: string;
  createdAt?: Date;
}

export type LivecamModel = Livecam;
