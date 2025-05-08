
import { OxumSystem } from '@/types/core-systems';

export interface SystemStatus {
  operational: boolean;
  isActive: boolean;
  services: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
  };
  queueLength: number;
  processing: boolean;
  uptime: number;
  lastReboot: string;
  modules?: Record<string, string>;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiry: Date;
  username: string;
  timestamp: string;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  status: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
  overallStatus?: string;
  timestamp?: string;
  modules?: Record<string, string>;
  recommendations?: string[];
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  load: number;
}

export interface UberCoreSystem {
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(sessionId: string): SessionValidationResult;
  initializeAutomaticSeo(): boolean;
  checkSubsystemHealth(): { name: string, status: string, health: number }[];
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  getSystemStatus(): SystemStatus;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  configure(options: Record<string, any>): void;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
}

export interface ModerateContentParams {
  content: string;
  userId?: string;
  strictness?: 'low' | 'medium' | 'high';
  type?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean;
  score: number;
  issues: string[];
  blockedCategories: string[];
  category: string;
  action: string;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated?: boolean;
  warnings: any[];
}

export interface SentimentAnalysisParams {
  text: string;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number;
}

export interface OxumSystem {
  calculateBoostScore(profileId: string): number;
  calculateScore(profileId: string): number;
  checkSystemStatus(): {operational: boolean};
  getSystemStatus(): SystemStatus;
}

export interface AutomaticSEO {
  initialize(): boolean;
}
