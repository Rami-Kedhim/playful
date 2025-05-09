
/**
 * Livecam type definitions
 */

export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  previewVideoUrl?: string;
  isLive: boolean;
  isStreaming?: boolean;
  viewerCount: number;
  tags: string[];
  country?: string;
  region?: string;
  language: string;
  category?: string;
  categories?: string[];
  rating?: number;
  price?: number;
  description?: string;
  streamUrl?: string;
  profileUrl?: string;
  age?: number;
  gender?: string;
  boosted?: boolean;
  boostScore?: number;
  isPopular?: boolean;
}

export interface Livecam extends LivecamModel {
  // Any additional properties specific to Livecam but not in LivecamModel
}

export interface LivecamFilter {
  isLive?: boolean;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  language?: string;
  country?: string;
  gender?: string;
  region?: string;
}

export interface LivecamComment {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  livecamId: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface LivecamTip {
  id: string;
  userId: string;
  username: string;
  livecamId: string;
  amount: number;
  message?: string;
  timestamp: string;
  isAnonymous: boolean;
}

export interface BoostableLivecamsOptions {
  limit?: number;
  offset?: number;
  onlyLive?: boolean;
  categories?: string[];
  region?: string;
  language?: string;
  sortBy?: 'boosted' | 'popular' | 'new' | 'rating';
}

export type MessageType = "normal" | "tip" | "system" | "join" | "leave";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: MessageType;
  isOwner?: boolean;
  isModerator?: boolean;
  tipAmount?: number;
}
