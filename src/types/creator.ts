
export interface Creator {
  id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
  isVerified: boolean;
  rating?: number;
  subscriberCount: number;
  contentCount: number;
  featured: boolean;
  tier: 'free' | 'standard' | 'premium';
  price: number;
  category: string;
  tags: string[];
  social?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
    [key: string]: string | undefined;
  };
  reviewCount?: number;
  description?: string;
  
  // Additional properties
  age?: number;
  ethnicity?: string;
  languages?: string[];
  location?: string;
  imageUrl?: string;
  avatarUrl?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isAI?: boolean;
  isScraped?: boolean;
  lastSynced?: string | Date;
  hasLiveStream?: boolean;
  isLive?: boolean;
  isPremium?: boolean;
  subscriptionPrice?: number;
  isFeatured?: boolean;
  contentCount?: {
    photos: number;
    videos: number;
    stories: number;
  };
}

// Add these types needed by component imports
export interface CreatorContent {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  content_type: string;
  creator_id: string;
  price?: number;
  is_premium?: boolean;
  created_at: string | Date;
  published_at?: string | Date;
  status?: string;
  views_count?: number;
  likes_count?: number;
}

export interface CreatorPayout {
  id: string;
  creator_id: string;
  amount: number;
  status: string;
  payout_method: string;
  created_at: string | Date;
  processed_at?: string | Date;
  notes?: string;
}

export interface PayoutRequest {
  creator_id: string;
  amount: number;
  payout_method: string;
  notes?: string;
}

export interface ContentCreator extends Creator {
  // Additional fields specific to content creators
  followerCount?: number;
  topCategory?: string;
  exclusiveContentCount?: number;
}
