
// Update the ContentCreator interface to include additional fields

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

export interface PayoutRequest {
  creatorId: string;
  amount: number;
  payoutMethod: string;
  payoutDetails: Record<string, any>;
}
