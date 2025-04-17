
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
}

export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  profileBanner?: string;
  bio?: string;
  location?: string;
  roleFlags: number;
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
}
