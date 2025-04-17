
export enum RoleFlags {
  USER = 1,
  CREATOR = 2,
  ESCORT = 4,
  ADMIN = 8,
  MODERATOR = 16,
  VERIFIED = 32
}

export interface Capabilities {
  canPostContent: boolean;
  canMessage: boolean;
  canStream: boolean;
  canFavorite: boolean;
  canBoost: boolean;
  canVerify: boolean;
  // Added for component compatibility
  hasContent?: boolean;
  hasLiveStream?: boolean;
  hasVirtualMeets?: boolean;
  hasRealMeets?: boolean;
}

export interface Monetization {
  enabled: boolean;
  methods: string[];
  rates?: Record<string, number>;
  subscription?: {
    price: number;
    interval: 'monthly' | 'quarterly' | 'yearly';
    features: string[];
  };
  // Added for component compatibility
  acceptsLucoin?: boolean;
  pricePerMessage?: number;
  subscriptionPrice?: number;
  meetingPrice?: number;
  videoChatPrice?: number;
}

export interface SystemMetadata {
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
  totalViews: number;
  totalLikes: number;
  totalBookmarks: number;
  rank: number;
  score: number;
  isAI?: boolean;
}

export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  profileBanner?: string;
  bio?: string;
  location?: string;
  roleFlags: number | {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isVerified: boolean;
    isFeatured: boolean;
    isAI: boolean;
  };
  verified: boolean;
  verificationLevel?: string;
  capabilities: Capabilities;
  monetization?: Monetization;
  contentCount: {
    photos: number;
    videos: number;
    streams: number;
  };
  system: SystemMetadata;
  // Added for component compatibility
  tags?: string[];
}
