
// Removed duplicate 'isVerified' fields and consolidated Livecam interface

export interface Livecam {
  id: string;
  name: string;
  isVerified: boolean;
  username: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  profileImage: string;
  previewImage: string;
  rating: number;
  price: number;
  roomType: 'public' | 'private' | 'premium';
  languages: string[];
  category: string;
  featured: boolean;
  nextStreamTime?: string;
  description?: string;

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
  isFeatured?: boolean;
  isPopular?: boolean;
  previewVideoUrl?: string;
  createdAt?: Date;
  
  // Explicitly add title property needed by components
  title?: string;
}

export type LivecamModel = Livecam;
