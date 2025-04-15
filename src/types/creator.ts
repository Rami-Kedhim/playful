
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
}
