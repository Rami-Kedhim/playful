
export interface AIProfile {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  description?: string;
  bio?: string;
  personality?: string;
  type?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  created_at?: string;
  availability_status?: string;
  systemMetadata?: {
    version?: string;
    lastSynced?: Date;
    personalityIndex?: number;
    statusFlags?: {
      needsModeration?: boolean;
      hasPendingUpdates?: boolean;
    }
  };
  stats?: {
    followerCount?: number;
    messageCount?: number;
    responseRate?: number;
    averageResponseTime?: number;
  };
  features?: string[];
  settings?: {
    voiceEnabled?: boolean;
    imageGenerationEnabled?: boolean;
    personalityLevel?: number;
  };
  subscription?: {
    price?: number;
    currency?: string;
    interval?: string;
  };
  premium_content_count?: {
    photos?: number;
    videos?: number;
    messages?: number;
    [key: string]: number | undefined;
  };
}
