
/**
 * Core Systems Type Definitions
 */

/**
 * Hermes System for managing visibility and recommendations
 */
export interface HermesSystem {
  name: string;
  version: string;
  getInsights: (profileId: string) => Promise<HermesInsight[]>;
  getVisibilityScore?: (profileId: string) => Promise<number>;
  getEngagementScore?: (profileId: string) => Promise<number>;
  getRankingScore?: (profileId: string) => Promise<number>;
  calculateVisibilityScore?: (params: any) => number;
  getRecommendedContent?: (userId: string, options?: any) => Promise<any[]>;
  trackUserActivity?: (userId: string, activity: any) => Promise<void>;
  optimize?: (profileId: string) => Promise<OptimizationResult>;
}

export interface HermesInsight {
  id: string;
  title?: string;
  type?: string;
  description?: string;
  score: number;
  actionable: boolean;
  recommendation?: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: number;
}

/**
 * Oxum System for profile boosting and promotion
 */
export interface OxumSystem {
  name: string;
  version: string;
  boostProfile: (profileId: string, boostParams: any) => Promise<boolean>;
  getBoostStatus: (profileId: string) => Promise<any>;
  getBoostPackages?: () => Promise<any[]>;
  calculateBoostScore?: (profileId: string) => Promise<number>;
  getProfileRanking?: (profileId: string) => Promise<any>;
  optimizeVisibility?: (profileId: string) => Promise<any>;
  calculateBoostFactor?: (params: any) => number;
  getActiveBoosts?: () => Promise<any[]>;
  getBoostedProfiles?: (options?: any) => Promise<any[]>;
}

/**
 * Lucie AI System for content generation and moderation
 */
export interface LucieAISystem {
  name: string;
  version: string;
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (content: string, options?: any) => Promise<ModerateContentResult>;
  analyzeSentiment: (text: string) => Promise<SentimentAnalysisResult>;
  summarizeText: (text: string, maxLength?: number) => Promise<string>;
  translateText: (text: string, targetLanguage: string) => Promise<string>;
}

export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  format?: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  tokens: number;
  moderationFlags?: string[];
  moderated?: boolean;
}

export interface ModerateContentParams {
  content: string;
  strictness?: number;
  categories?: string[];
  type?: string;
}

export interface ModerateContentResult {
  safe: boolean;
  isSafe?: boolean;
  categories: string[];
  score: number;
  blockedCategories?: string[];
  issues?: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  score: number;
  confidence: number;
  metadata?: any;
}

/**
 * Orus System for security and session management
 */
export interface OrusSystem {
  name: string;
  version: string;
  validateSession: (token: string) => Promise<SessionValidationResult>;
  checkPermissions: (userId: string, resource: string, action: string) => Promise<boolean>;
  generateToken: (userId: string, options?: any) => Promise<string>;
  revokeToken: (token: string) => Promise<boolean>;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expires?: Date;
  expiresAt?: Date;
}

/**
 * UberCore System for core platform services
 */
export interface UberCoreSystem {
  name: string;
  version: string;
  getSystemStatus: () => Promise<SystemStatus>;
  checkSystemIntegrity: () => SystemIntegrityResult;
  getSystemMetrics: () => SystemHealthMetrics;
  registerSystem: (system: any) => boolean;
  deregisterSystem: (systemName: string) => boolean;
  validateSession: (token: string) => SessionValidationResult;
}

export interface SystemStatus {
  operational: boolean;
  isOperational?: boolean;
  lastCheck?: Date;
  version?: string;
  systemsOnline: number;
  timestamp: number;
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  database?: boolean;
  status?: 'ok' | 'warning' | 'error';
  errors?: string[];
}

export interface SystemMetrics {
  uptime: number;
  requestCount: number;
  errorRate: number;
  responseTime: number;
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeUsers: number;
  services: {
    [key: string]: boolean;
  };
}

/**
 * Optimization result returned by various optimization functions
 */
export interface OptimizationResult {
  success: boolean;
  improvements: string[];
  score: number;
  recommendations: string[];
}
