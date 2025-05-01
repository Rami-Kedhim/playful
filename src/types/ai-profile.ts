
/**
 * AI Profile Types
 */

export enum ProcessingStatus {
  IDLE = 'idle',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export type ProcessingStatusDetails = {
  status: ProcessingStatus;
  message?: string;
  progress?: number;
  error?: string;
};

export interface AIModelGenerationParams {
  prompt?: string;
  name?: string;
  type?: string;
  traits?: string[];
  presets?: string[];
  gender?: string;
  age?: number;
  personality?: string[] | { type: string; traits: string[] }; // Updated to ensure traits is required when object
  interests?: string[];
  description?: string;
}

export interface AIModelGenerationResult {
  id: string;
  name: string;
  avatarUrl?: string;
  status: ProcessingStatus;
  progress?: number;
  error?: string;
  createdAt: Date | string;
  completedAt?: Date | string;
  profileData?: any;
}

export interface AIProfile {
  id: string;
  name: string;
  avatarUrl: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  displayName?: string;
  description?: string;
  bio?: string;
  personality?: string[] | { type: string; traits: string[] }; // Updated to ensure traits is required
  traits?: string[];
  interests?: string[];
  tags?: string[];
  type?: string | string[];
  isPremium?: boolean;
  gender?: string;
  age?: number;
  created_at?: Date | string;
  creatorId?: string;
  emotionalState?: {
    primary: string;
    secondary?: string;
    intensity: number;
  };
  voiceConfig?: {
    enabled: boolean;
    voiceId?: string;
    pitch?: number;
    rate?: number;
  };
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  location?: string;
  livecam_enabled?: boolean;
  gallery_images?: string[];
  premium_content_count?: number;
  subscription_price?: number;
  ubx_image_price?: number;
  boost_status?: {
    isActive: boolean;
    expiresAt?: string;
    boost_level?: number;
  };
  languages?: string[];
  avatar?: string; // Added for backward compatibility
  languageSkills?: string[]; // Added for compatibility with aiProfileGenerator
}

// Add AIMessage type that was missing
export interface AIMessage {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string | Date;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: Record<string, any>;
  attachments?: Array<{
    type: string;
    url: string;
  }>;
}

// Add Livecam interface for consistency
export interface Livecam {
  id: string;
  name: string;
  displayName: string;
  thumbnailUrl: string;
  username?: string;
  isLive: boolean;
  viewerCount: number;
  categories: string[];
  country?: string;
  language?: string;
  gender?: string;
  rating?: number;
  price?: number;
  isStreaming?: boolean;
  region?: string; // Added to support Livecams component
}

export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  expiresAt?: Date;
  timeRemaining?: string;
  boostPackage?: BoostPackage;
  progress?: number;
  packageName?: string; // Added to fix PulseBoostManager
  startedAt?: Date; // Added to fix usePulseBoost
}

export interface BoostAnalytics {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  boostHistory: Array<{
    date: Date;
    score: number;
  }>;
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
}

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  price_ubx: number;
  duration: string;
  durationMinutes?: number;
  visibility?: string;
  visibility_increase?: number;
  color?: string;
  badgeColor?: string;
  features: string[];
}
