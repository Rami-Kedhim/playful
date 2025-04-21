
export interface Livecam {
  id: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  streamUrl?: string;
  viewCount?: number;
  isBoosted?: boolean;
  boostExpiry?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  username?: string; // Added to fix error in LivecamCard.tsx
}

export interface LivecamModel {
  id: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  isLive: boolean;
  viewerCount?: number;
  categories?: string[];
  tags?: string[];
  country?: string;
  language?: string;
  age?: number;
  bio?: string;
  rating?: number;
  pricePerMinute?: number;
  isFavorite?: boolean;
  isSubscribed?: boolean;
  isBoosted?: boolean;
  description?: string; // Added to fix error in LivecamInfo.tsx
}
