
export interface UberPersona {
  id: string;
  displayName: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
  imageUrl?: string;
  bio?: string;
  description?: string;
  location?: string;
  country?: string;
  type?: string;
  availability?: {
    nextAvailable?: string;
    schedule?: Record<string, string[]>;
    isAvailable?: boolean;
  };
  stats?: {
    rating?: number;
    reviewCount?: number;
    responseTime?: number;
    bookingCount?: number;
  };
  roleFlags?: {
    isAI?: boolean;
    isVerified?: boolean;
    isCreator?: boolean;
    isFeatured?: boolean;
  };
  monetization?: {
    subscriptionPrice?: number;
    meetingPrice?: number;
    acceptsLucoin?: boolean;
    boostingActive?: boolean;
  };
  premium_content_count?: {
    photos?: number;
    videos?: number;
    messages?: number;
    [key: string]: number | undefined;
  };
  languages?: string[];
  services?: string[];
  traits?: string[];
  tags?: string[];
  gallery_images?: string[];
  livecam_enabled?: boolean;
  boost_status?: any;
  boost?: any;
  systemMetadata?: {
    version?: string;
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      hasPendingUpdates?: boolean;
    };
  };
  aiAttributes?: {
    personality?: string;
    voiceType?: string;
    responseStyle?: string;
  };
  isPremium?: boolean;
  isOnline?: boolean;
  isLocked?: boolean;
  rating?: number;
  followerCount?: number;
  verificationLevel?: string;
  onlinePercentage?: number;
  streamQuality?: string;
  isActive?: boolean;
  capabilities?: string[];
}
