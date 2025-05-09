
// Core system interfaces

// HermesSystem
export interface HermesSystem {
  getVisibilityScore: (profileId: string) => Promise<number>;
  getEngagementScore: (profileId: string) => Promise<number>;
  getRankingScore: (profileId: string) => Promise<number>;
  getInsights: (profileId: string) => Promise<HermesInsight[]>;
  calculateVisibilityScore: (profileData: any) => number;
  getRecommendedContent: (userId: string) => Promise<any[]>;
  trackUserActivity: (userId: string, activity: any) => Promise<void>;
  optimize: (profileId: string, options?: any) => Promise<OptimizationResult>;
  getBoostEffectiveness: (profileId: string) => Promise<number>;
}

export interface HermesInsight {
  id: string;
  profileId: string;
  score: number;
  recommendation: string;
  impact: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  title?: string;
  type?: string;
}

export interface OptimizationResult {
  success: boolean;
  changes: string[];
  scoreImprovement: number;
}

// OxumSystem
export interface OxumSystem {
  calculateBoostFactor: (amount: number) => number;
  getActiveBoosts: (profileId: string) => Promise<any[]>;
  getBoostedProfiles: () => Promise<string[]>;
  getBoostPackages: () => Promise<any[]>;
  calculateBoostScore: (profileId: string) => Promise<number>;
  getProfileRanking: (profileId: string) => Promise<number>;
  optimizeVisibility: (profileId: string) => Promise<any>;
}

// LucieAISystem
export interface LucieAISystem {
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  analyzeSentiment: (text: string) => Promise<SentimentAnalysisResult>;
  generateImage: (prompt: string) => Promise<GenerateImageResult>;
}

export interface GenerateContentParams {
  prompt: string;
  options?: {
    maxTokens?: number;
    temperature?: number;
    stopSequences?: string[];
  };
}

export interface GenerateContentResult {
  content: string;
  totalTokens?: number;
  moderated?: boolean;
  tokens?: number;
}

export interface ModerateContentParams {
  content: string;
  type?: string;
  strictness?: number;
}

export interface ModerateContentResult {
  safe: boolean;
  violations: string[];
  score: number;
  isSafe?: boolean;
  issues?: string[];
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  score: number;
  confidence: number;
  metadata: any;
}

// Adding SentimentAnalysisParams
export interface SentimentAnalysisParams {
  text: string;
  options?: {
    language?: string;
    model?: string;
  };
}

export interface GenerateImageResult {
  url: string;
  width: number;
  height: number;
}

// UberCoreSystem
export interface UberCoreSystem {
  getSystemStatus: () => Promise<SystemStatus>;
  checkSystemIntegrity: () => SystemIntegrityResult;
  getSystemHealthMetrics: () => Promise<SystemHealthMetrics>;
  registerSystem: (system: any) => void;
  deregisterSystem: (systemName: string) => void;
  validateSession: (token: string) => SessionValidationResult;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance' | 'error';
  message?: string;
  subsystems?: Record<string, 'operational' | 'degraded' | 'maintenance' | 'error'>;
  isOperational?: boolean;
  lastCheck?: Date | string;
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  database?: boolean;
  valid?: boolean;
}

export interface SystemHealthMetrics {
  memory: number;
  storage: number;
  network: number;
  services: Record<string, number>;
  load?: number;
  cpu?: number;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expires?: Date | string;
  isValid?: boolean;
}
