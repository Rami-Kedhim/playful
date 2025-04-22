
export interface UberPersona {
  id: string;
  displayName: string;
  avatarUrl?: string;
  type?: string;
  isOnline?: boolean;
  isLocked?: boolean;
  isPremium?: boolean;
  rating?: number;
  followerCount?: number;
  verificationLevel?: number;
  onlinePercentage?: number;
  location?: string;
  country?: string;
  tags?: string[];
  availability?: {
    isAvailable: boolean;
    nextAvailable?: string;
    schedule?: Record<string, any>;
  };
  systemMetadata?: {
    version?: string;
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: Record<string, boolean>;
  };
  boost?: number;
  streamQuality?: {
    quality: number;
    stability: number;
    prediction: string;
  };
  aiAttributes?: {
    lastProcessed: string;
    enhancementScore: number;
    [key: string]: any;
  };
  boost_status?: {
    isActive: boolean;
    boostPower?: number;
    [key: string]: any;
  };
}
