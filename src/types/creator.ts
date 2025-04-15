
export interface ContentCreator {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  avatarUrl?: string;
  location?: string;
  languages?: string[];
  bio?: string;
  description?: string;
  age?: number;
  ethnicity?: string;
  tags?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  isAI?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
  isScraped?: boolean;
  lastSynced?: string | Date;
  contentCount?: {
    photos: number;
    videos: number;
    stories?: number;
  };
  hasLiveStream?: boolean;
  subscriptionPrice?: number;
  isPremium: boolean;
  isLive?: boolean;
  subscriberCount: number;
  price: number;
  rating?: number;
  imageUrl?: string;
  region?: string;
  language?: string;
}

export interface CreatorContent {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  content_type: string;
  url: string;
  thumbnail_url?: string;
  is_premium: boolean;
  price?: number | null;
  status: string;
  views_count?: number;
  likes_count?: number;
  created_at: string | Date;
  published_at?: string | Date;
  updated_at?: string | Date;
}

export interface CreatorPayout {
  id: string;
  creator_id: string;
  amount: number;
  status: string;
  created_at: string | Date;
  processed_at?: string | Date;
  payout_method: string;
  notes?: string;
  requested_at?: string | Date;
}

export interface PayoutRequest {
  amount: number;
  creator_id: string;
  payout_method: string;
  notes?: string;
}

export interface PayoutResult {
  success: boolean;
  message: string;
  payout?: CreatorPayout;
}

export interface CreatorAnalytics {
  id: string;
  creator_id: string;
  date: string | Date;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}
