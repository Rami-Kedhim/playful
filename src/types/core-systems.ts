
/**
 * Core system types for UberEscorts ecosystem
 */

// Lucie AI System Types
export interface LucieAISystem {
  initialize(): Promise<void>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): any;
  shutdown(): Promise<void>;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  tokens: number;
  moderated: boolean;
  moderationFlags: string[];
}

export interface ModerateContentParams {
  content: string;
  type: 'text' | 'image' | 'video';
  context?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe: boolean;
  score: number;
  issues: string[];
  blockedCategories: string[];
  category: string;
  action: 'allow' | 'flag' | 'block';
}

export interface SentimentAnalysisParams {
  text: string;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: string;
  confidence: number;
}

// Core System Status
export interface SystemStatus {
  operational: boolean;
  version: string;
  latency: number;
  services: {
    lucie: boolean;
    hermes: boolean;
    oxum: boolean;
    orus: boolean;
  };
}

// Oxum System Types
export interface OxumSystem {
  initialize(): Promise<void>;
  shutdown(): void;
  getMetrics(): OxumMetrics;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<number[]>;
}

export interface OxumMetrics {
  activeProfiles: number;
  boostAllocation: number;
  systemLoad: number;
  lastUpdated: Date;
}
