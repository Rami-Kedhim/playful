
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
