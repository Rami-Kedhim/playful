
export interface UberPersonaType {
  escort: 'escort';
  creator: 'creator';
  livecam: 'livecam';
  ai: 'ai';
  user: 'user';
}

export interface RoleFlags {
  isEscort: boolean;
  isCreator: boolean;
  isLivecam: boolean;
  isAI: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  [key: string]: boolean; // Allow string indexing
}

export interface Capabilities {
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
  [key: string]: boolean; // Allow string indexing
}

export interface StatusFlags {
  isOnline?: boolean;
  isVerified?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  [key: string]: boolean | undefined; // Allow string indexing
}

export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: keyof UberPersonaType | string;
  tags?: string[];
  isVerified?: boolean;
  isOnline?: boolean;
  imageUrl?: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
  description?: string;
  services?: string[];
  roleFlags?: RoleFlags;
  capabilities?: Capabilities;
  monetization?: {
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
    meetingPrice?: number;
  };
  systemMetadata?: {
    source?: string;
    lastSynced?: Date;
    tagsGeneratedByAI?: boolean;
    hilbertSpaceVector?: number[];
    personalityIndex?: number;
    statusFlags?: StatusFlags | Record<string, boolean>;
    [key: string]: any;
  };
  lastActive?: Date | string;
  isPremium?: boolean;
  isActive?: boolean;
  isAI?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
