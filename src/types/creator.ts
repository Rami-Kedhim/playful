
export interface ContentCreator {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  coverImageUrl?: string;
  subscriberCount?: number;
  contentCount?: number;
  isPremium?: boolean;
  isVerified?: boolean;
  categories?: string[];
  rating?: number;
  ratingCount?: number;
}

export interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  contentType: 'image' | 'video' | 'audio' | 'text' | 'livestream';
  status: 'draft' | 'published' | 'archived' | 'processing';
  isPremium: boolean;
  price?: number;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
  tags?: string[];
}

export interface CreatorPayout {
  id: string;
  creatorId: string;
  amount: number;
  status: 'pending' | 'processed' | 'failed';
  payoutMethod: string;
  requestedAt: string;
  processedAt?: string;
  notes?: string;
}

export interface PayoutRequest {
  creatorId: string;
  amount: number;
  payoutMethod: string;
  accountDetails: Record<string, any>;
  notes?: string;
}
