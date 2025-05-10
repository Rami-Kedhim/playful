
// Core system types

export interface ModerateContentParams {
  content: string;
  options?: any;
}

export interface GenerateContentParams {
  prompt: string;
  options?: any;
}

export interface ModerateContentResult {
  isApproved: boolean;
  reasons?: string[];
  score?: number;
}

export interface GenerateContentResult {
  content: string;
  rating?: number;
  sentiment?: string;
}

export interface SentimentAnalysisParams {
  text: string;
}

export interface SentimentAnalysisResult {
  sentiment: string;
  score: number;
}

export interface SystemStatus {
  isOperational: boolean;
  metrics?: any;
}

export interface SystemIntegrityResult {
  isPassed: boolean;
  details: string[];
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
}

export interface LucieAISystem {
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  analyzeSentiment: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  summarize: (text: string) => Promise<string>;
  analyze: (content: string) => Promise<any>;
  extractEntities: (text: string) => Promise<any[]>;
  verifyContentSafety: (content: string) => Promise<boolean>;
}

export interface OxumSystem {
  initialize: () => Promise<boolean>;
  validateSession: (token: string) => Promise<boolean>;
  checkPermission: (userId: string, resource: string, action: string) => Promise<boolean>;
}

export interface HermesSystem {
  initialize: () => Promise<void>;
  trackEvent: (eventName: string, data: any) => void;
  getMetrics: () => Promise<any>;
  // Additional properties can be added as needed
}

export interface HermesInsight {
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface UberCoreSystem {
  hermesSystem: HermesSystem;
  lucieAI: LucieAISystem;
  oxumSystem: OxumSystem;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
}

export interface BoostAnalytics {
  impressions: number;
  clicks: number;
  conversionRate: number;
  engagementScore: number;
}
