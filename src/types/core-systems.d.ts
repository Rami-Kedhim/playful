
export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
}

export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ModerateContentParams {
  content: string;
  strictness?: 'low' | 'medium' | 'high';
}

export interface ModerateContentResult {
  flagged: boolean;
  reason?: string;
}

export interface SentimentAnalysisParams {
  text: string;
  options?: Record<string, any>;
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  confidence?: number;
  scores?: {
    positive: number;
    negative: number;
    neutral: number;
    mixed?: number;
  };
}

export interface OxumSystem {
  name: string;
  version: string;
  initialize(): Promise<void>;
  processImageFeatures(imageUrl: string): Promise<any>;
  boostAllocationEigen(profileId: string, level: number): Promise<number[]>;
  boostProfile(profileId: string, packageId: string): Promise<boolean>;
  getBoostStatus(profileId: string): Promise<any>;
}

export interface HermesInsight {
  type: string;
  description: string;
  confidence: number;
  data: Record<string, any>;
}

export interface HermesSystem {
  name: string;
  version: string;
  calculateBoostScore(profileId: string): Promise<number>;
  calculateVisibilityScore(profileId: string): Promise<number>;
  getInsights(): Promise<HermesInsight[]>;
  recommendContent(userId: string): Promise<string[]>;
  routeFlow(userId: string, destination: string): Promise<{ safe: boolean; reason?: string }>;
}

export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  checkSubsystemHealth(): SubsystemHealth[];
  getHealthMetrics(): SystemHealthMetrics;
  validateSession(token: string): SessionValidationResult;
  restartSubsystem(name: string): Promise<boolean>;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  subsystems: Array<{
    name: string;
    status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  }>;
  lastUpdated: Date;
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  timestamp: Date;
  valid?: boolean;
}

export interface SystemHealthMetrics {
  uptime: number; // percentage
  responseTime: number; // milliseconds
  errorRate: number; // percentage
  memoryUsage: number; // percentage
  cpu?: number; // percentage
}

export interface SessionValidationResult {
  userId: string;
  isValid: boolean;
  expiresAt: Date;
  sessionType: 'user' | 'admin' | 'system';
  permissions?: string[];
}

export interface SubsystemHealth {
  name: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  health: number; // 0-100 percentage
  lastChecked: Date;
}
