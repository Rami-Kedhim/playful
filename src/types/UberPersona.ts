export interface UberPersona {
  id: string;
  name: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  username: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  languages: string[];
  bio: string;
  age: number;
  ethnicity: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  roleFlags: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasStories: boolean;
    hasChat: boolean;
    hasBooking: boolean;
    hasLiveStream: boolean;
    hasExclusiveContent: boolean;
    hasContent: boolean;
    hasRealMeets: boolean;
    hasVirtualMeets: boolean;
  };
  monetization: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  stats: {
    rating: number;
    reviewCount: number;
    responseTime: number;
    viewCount: number;
    favoriteCount: number;
  };
  systemMetadata: {
    source: 'ai_generated' | 'scraped' | 'manual';
    lastSynced?: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
  };
}

export interface NeuralModel {
  id: string;
  name: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  username: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  languages: string[];
  bio: string;
  age: number;
  ethnicity: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  roleFlags: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasStories: boolean;
    hasChat: boolean;
    hasBooking: boolean;
    hasLiveStream: boolean;
    hasExclusiveContent: boolean;
    hasContent: boolean;
    hasRealMeets: boolean;
    hasVirtualMeets: boolean;
  };
  monetization: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  stats: {
    rating: number;
    reviewCount: number;
    responseTime: number;
    viewCount: number;
    favoriteCount: number;
  };
  systemMetadata: {
    source: 'ai_generated' | 'scraped' | 'manual';
    lastSynced?: Date;
    tagsGeneratedByAI: boolean;
    hilbertSpaceVector: number[];
  };
}
