
export interface ContentCreator {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  bio?: string;
  isPremium: boolean;
  isLive: boolean;
  isAI: boolean;
  subscriberCount: number;
  contentCount: {
    photos: number;
    videos: number;
  };
  price: number;
  createdAt?: string;
  tags?: string[];
  rating?: number;
}

export interface CreatorAnalytics {
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

export interface ContentMediaItem {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  type: 'image' | 'video';
  isPremium: boolean;
  createdAt: string;
  duration?: number; // For videos, in seconds
  views: number;
  likes: number;
}

export interface CreatorContent {
  id: string;
  title: string;
  description?: string;
  content_type: string;
  url: string;
  thumbnail_url?: string;
  is_premium: boolean;
  price?: number | null;
  status: string;
  created_at: string;
  views_count?: number;
  likes_count?: number;
}

export interface CreatorSubscription {
  id: string;
  creatorId: string;
  userId: string;
  tier: 'basic' | 'premium' | 'vip';
  price: number;
  startDate: string;
  endDate: string;
  isAutoRenew: boolean;
  status: 'active' | 'canceled' | 'expired';
}

export interface CreatorPayout {
  id: string;
  amount: string;
  status: 'pending' | 'completed' | 'processing';
  created_at: string;
  payout_method: string;
}

export interface PayoutResult {
  data: CreatorPayout[];
  totalCount: number;
}

export interface PayoutRequest {
  creatorId: string;
  amount: number;
  payoutMethod: string;
  payoutDetails: Record<string, any>;
}

export interface CreatorReview {
  id: string;
  creator_id: string;
  reviewer_id: string;
  reviewer: {
    id: string;
    username: string;
    avatar_url: string;
  };
  rating: number;
  comment: string | null;
  created_at: string;
}
