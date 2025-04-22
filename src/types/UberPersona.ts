
export interface UberPersona {
  id: string;
  name?: string;
  displayName?: string;
  avatarUrl?: string;
  avatar_url?: string;
  thumbnailUrl?: string;
  isOnline?: boolean;
  isLocked?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  location?: string;
  availability?: {
    nextAvailable?: string;
    schedule?: any;
  };
  type?: string;
  tags?: string[];
  isPremium?: boolean;
  systemMetadata?: {
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      [key: string]: any;
    };
    version?: string;
    [key: string]: any;
  };
}
