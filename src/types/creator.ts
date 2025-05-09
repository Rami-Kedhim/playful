
import { VerificationLevel } from './verification';

// Main ContentCreator interface
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

// Original Creator interface for backward compatibility
export interface Creator {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  rating?: number;
  services?: string[];
  verificationLevel?: VerificationLevel;
  isVerified?: boolean;
  tags?: string[];
  rates?: Record<string, number>;
  price?: number;
  responseRate?: number;
  
  // Additional fields for compatibility with Escort type
  age?: number;
  photos?: string[];
  languages?: string[];
  availability?: string[];
  reviewScore?: number;
  reviewCount?: number;
  boosted?: boolean;
  boostLevel?: number;
  boostExpiration?: string;
}

// Creator payout types
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

// Creator content types
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
  id?: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
  subscriberGrowth?: number;
  topContent?: string[];
  period?: 'day' | 'week' | 'month' | 'year';
}

// Creator review types
export interface CreatorReview {
  id: string;
  reviewer_id: string;
  creator_id: string;
  rating: number;
  comment?: string;
  created_at: Date | string;
  reviewer?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

export interface PaginatedReviewsResponse {
  data: CreatorReview[];
  total: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}

// Re-export Rates type from escort.ts
export { type Rates } from './escort';
