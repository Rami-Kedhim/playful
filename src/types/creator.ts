
// Fix missing exports for ContentCreator and related types
export interface ContentCreator {
  id: string;
  username?: string;
  name: string;
  avatarUrl?: string;
  profileImage?: string;
  imageUrl?: string;
  bio?: string;
  location?: string;
  subscriberCount: number;
  contentCount?: {
    photos: number;
    videos: number;
    stories?: number;
  };
  rating?: number;
  isVerified?: boolean;
  isPremium?: boolean;
  isAI?: boolean;
  isScraped?: boolean;
  price?: number;
  lastSynced?: string;
  isLive?: boolean;
  hasLiveStream?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  ethnicity?: string;
  languages?: string[];
  tags?: string[];
  age?: number;
  subscriptionPrice?: number;
}

// Added exports for CreatorPayout and PayoutRequest for payout system compatibility
export interface CreatorPayout {
  id: string;
  creatorId: string;
  amount: number;
  status: string;
  requestedAt: string;
  processedAt?: string;
  paymentMethod?: string;
}

export interface PayoutRequest {
  creator_id: string;
  amount: number;
  payout_method: string;
  payoutDetails: Record<string, any>;
}

export interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  contentType: string;
  url: string;
  thumbnailUrl?: string;
  isPremium: boolean;
  price?: number;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
  viewCount: number;
  likeCount: number;
  tags?: string[];
  // Legacy fields for backward compatibility
  content_type?: string;
  thumbnail_url?: string;
  is_premium?: boolean;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  views_count?: number;
  likes_count?: number;
}

export interface CreatorAnalytics {
  id?: string; // added optional id to fix ts error
  views: number;
  likes: number;
  shares: number;
  earnings: number;
  subscriberGrowth?: number;
  topContent?: string[];
  period?: 'day' | 'week' | 'month' | 'year';
}

// Import the Creator type from the original file to maintain backward compatibility
import { Creator, Rates } from './Creator';
export type { Creator, Rates };
