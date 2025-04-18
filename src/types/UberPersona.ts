
export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  language: string;
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
    responseTime?: number;
    viewCount: number;
    favoriteCount: number;
    bookingCount?: number;
  };
  
  // Additional properties needed by components
  description?: string;
  languages?: string[];
  services?: string[];
  traits?: any[];
  systemMetadata?: {
    source?: string;
    tagsGeneratedByAI?: boolean;
    lastSynced?: Date;
    boostScore?: number;
    hilbertSpaceVector?: number[];
  };
  isLocked?: boolean;
  isOnline?: boolean;
  availability?: any;
  isPremium?: boolean;
}

export interface NeuralModel {
  id: string;
  name: string;
  version: string;
  specialization: string | string[];
  status: 'active' | 'inactive' | 'training';
  accuracy: number;
  lastUpdated: Date;
}
