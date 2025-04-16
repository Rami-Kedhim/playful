
export interface UberPersona {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  language: string;
  location?: string;
  isOnline?: boolean;
  lastActive?: Date;
  bio?: string;
  rating?: number;
  popularity?: number;
  gender?: string;
  age?: number;
  roleFlags: {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
    isAI?: boolean;
  };
  tags?: string[];
  price?: number;
  capabilities?: {
    hasContent?: boolean;
    hasLiveStream?: boolean;
    hasVirtualMeets?: boolean;
    hasRealMeets?: boolean;
  };
  monetization?: {
    acceptsLucoin?: boolean;
    pricePerMessage?: number;
    subscriptionPrice?: number;
    videoChatPrice?: number;
    meetingPrice?: number;
  };
  systemMetadata?: {
    source?: string;
    internalId?: string;
    sourceDetail?: string;
    syncTimestamp?: Date;
  };
}
