
export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_ubx: number;
  description?: string;
  features?: string[];
  price?: number;
}

export interface BoostStatus {
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  remainingTime?: string;
  packageId?: string;
  packageName?: string;
  progress?: number;
  expiresAt?: string;
  boostPackage?: BoostPackage;
  profileId?: string;
  timeRemaining?: string;
  activeBoostId?: string; // Add for cancelBoost
}

export interface BoostEligibility {
  isEligible: boolean;
  eligible?: boolean; // For backward compatibility
  reason?: string;
  reasons?: string[];
  minimumProfileCompleteness?: number;
  missingFields?: string[];
  minRequiredBalance?: number;
}

export interface HermesBoostStatus {
  position: number;
  activeUsers: number;
  estimatedVisibility: number;
  lastUpdateTime: string;
  isActive?: boolean;
  active?: boolean;
  boostScore?: number;
  effectivenessScore?: number;
  timeRemaining?: number;
}

export interface BoostAnalytics {
  impressions: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  clicks: {
    today: number;
    yesterday: number;
    weeklyAverage: number;
    withBoost: number;
    withoutBoost?: number;
    increase?: number;
  };
  engagementRate: number;
  conversionRate: number;
  boostEfficiency: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  viewsIncrease?: number;
}

// Add interface for AIMessage to fix type errors
export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date | string;
  has_read?: boolean;
}

// Add AIConversation interface
export interface AIConversation {
  id: string;
  messages: AIMessage[];
  aiProfileId: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
