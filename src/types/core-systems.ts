
export interface GenerateContentParams {
  prompt: string;
  options?: any;
}

export interface GenerateContentResult {
  content: string;
  rating?: string;
  metadata?: any;
}

export interface ModerateContentParams {
  content: string;
  context?: string;
  strictness?: number;
}

export interface ModerateContentResult {
  isApproved: boolean;
  score: number;
  category?: string;
  reason?: string;
}

export interface SentimentAnalysisParams {
  text: string;
  options?: any;
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  score: number;
  confidence: number;
}

export interface SystemStatus {
  status: string;
  version: string;
  lastChecked: Date;
  components: Record<string, string>;
  uptime?: number;
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  timestamp: Date;
  details?: string;
  valid?: boolean;
}

export interface SystemHealthMetrics {
  memoryUsage: number;
  responseTime: number;
  activeUsers: number;
  errorRate: number;
  cpu?: number;
  memory?: number;
  disk?: number;
}

export interface SessionValidationResult {
  userId: string;
  isValid: boolean;
  expiresAt: Date;
  sessionType: string;
  valid?: boolean;
}

export interface HermesInsight {
  type: string;
  description: string;
  confidence: number;
  data?: any;
  value?: number;
}

export interface HermesSystem {
  name: string;
  version: string;
  getInsights(): Promise<HermesInsight[]>;
  calculateBoostScore(profileId: string): Promise<number>;
  recommendContent(userId: string): Promise<string[]>;
  calculateVisibilityScore(profileId: string): Promise<number>;
}

export interface OxumSystem {
  name: string;
  version: string;
  processImageFeatures(imageUrl: string): Promise<any>;
  boostAllocationEigen(profileId: string, level: number): Promise<number[]>;
  boostProfile(profileId: string, packageId: string): Promise<boolean>;
  getBoostStatus(profileId: string): Promise<any>;
}

export interface LucieAISystem {
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(content: string, options?: any): Promise<ModerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  categorizeText(text: string): Promise<string[]>;
}

export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(token: string): SessionValidationResult;
}

export interface BoostAnalytics {
  profileId: string;
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  viewsBeforeBoost: number;
  viewsAfterBoost: number;
  engagementIncrease: number;
  impressions?: {
    value: number;
    change: number;
  };
  interactions?: {
    value: number;
    change: number;
  };
  views?: number;
  additionalViews?: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  actionType: string;
  priority: number;
  impact: "low" | "medium" | "high";
  actionUrl?: string;
}
