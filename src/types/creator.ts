
export interface Creator {
  id: string;
  name: string;
  username: string;
  bio?: string;
  profileImage: string;
  coverImage?: string;
  isVerified?: boolean;
  subscriberCount?: number;
  contentCount?: number;
  rating?: number;
  price?: number;
  createdAt: Date;
  category?: string;
  categories?: string[];
  tags?: string[];
  
  // Legacy fields for backward compatibility
  imageUrl?: string;
  avatarUrl?: string;
}

export interface CreatorContent {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  type: 'image' | 'video' | 'audio' | 'text' | 'gallery';
  thumbnailUrl?: string;
  url?: string;
  isPremium: boolean;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  tags?: string[];
  status: 'published' | 'draft' | 'archived';
}

export interface CreatorPayout {
  id: string;
  creatorId: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  method: 'bank' | 'paypal' | 'crypto' | 'other';
  requestDate: Date;
  processedDate?: Date;
  referenceNumber?: string;
}

export interface PayoutRequest {
  creatorId: string;
  amount: number;
  method: 'bank' | 'paypal' | 'crypto' | 'other';
  payoutDetails?: {
    accountName?: string;
    accountNumber?: string;
    routingNumber?: string;
    bankName?: string;
    email?: string;
    walletAddress?: string;
  };
}
