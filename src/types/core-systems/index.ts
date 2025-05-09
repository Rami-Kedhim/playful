
// Core System Types
export interface SystemStatus {
  status: 'online' | 'offline' | 'maintenance';
  services: Record<string, boolean>;
  uptime?: number;
  version?: string;
  lastCheck?: Date;
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  database?: boolean;
  valid?: boolean; // Add missing property
  status?: string; // Add missing property
  errors?: string[]; // Add missing property
}

export interface SystemHealthMetrics {
  services: Record<string, string>;
  cpu?: number;
  memory?: number;
  storage?: number;
  network?: number;
  load?: number;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expires?: Date;
  expiresAt?: string; // Add missing property
}

// Hermes System Types
export interface HermesInsight {
  id: string;
  title: string;
  description?: string;
  score: number;
  type?: string;
  value?: number | string;
}

export interface HermesStatus {
  active: boolean;
  insights: HermesInsight[];
  metrics?: Record<string, number>;
}

export interface HermesSystem {
  name: string;
  version: string;
  getStatus(): Promise<HermesStatus>;
  getInsights(profileId: string): Promise<HermesInsight[]>;
  getVisibilityScore?(): Promise<number>;
  getEngagementScore?(): Promise<number>;
  getRankingScore?(): Promise<number>;
  calculateVisibilityScore?(factors: Record<string, number>): Promise<number>;
  optimizeVisibility?(profileId: string): Promise<boolean>;
  getProfileRanking?(profileId: string): Promise<number>;
  getBoostPackages?(): Promise<any[]>;
  calculateBoostScore?(profileId: string): Promise<number>;
}

export interface OxumSystem {
  name: string;
  version: string;
  getActiveBoosts(): Promise<any[]>;
  getBoostPackages(): Promise<any[]>;
  boostProfile(profileId: string, packageId: string): Promise<boolean>;
  getBoostStatus(profileId: string): Promise<any>;
  calculateBoostScore(profileId: string): Promise<number>;
  calculateBoostFactor(factors: Record<string, number>): Promise<number>;
  getBoostMetrics?(profileId: string): Promise<Record<string, number>>;
  getProfileRanking(profileId: string): Promise<number>;
  getBoostedProfiles(): Promise<string[]>;
  optimizeVisibility(profileId: string): Promise<boolean>;
}

// Lucie AI Types
export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  safetyFilter?: boolean;
  context?: string;
}

export interface GenerateContentResult {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  tokens?: number;
  moderated?: boolean;
  moderationFlags?: string[];
}

export interface ModerateContentParams {
  content: string;
  context?: string;
  strictness?: number;
  type?: string;
}

export interface ModerateContentResult {
  safe: boolean;
  reason?: string;
  score?: number;
  issues?: string[];
  category?: string;
  isSafe?: boolean;
  blockedCategories?: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  score: number;
  confidence: number;
  metadata: Record<string, any>;
}

export interface LucieAISystem {
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(content: string, options?: any): Promise<ModerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
}

// UberCore Types
export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemMetrics(): SystemHealthMetrics;
  validateSession(token: string): SessionValidationResult;
  registerSystem(system: any): boolean;
  deregisterSystem(systemId: string): boolean;
}

// Type Guards
export function isSystemStatus(obj: any): obj is SystemStatus {
  return obj && typeof obj === 'object' && 'status' in obj;
}

export function isSystemIntegrityResult(obj: any): obj is SystemIntegrityResult {
  return obj && typeof obj === 'object' && 'codeIntegrity' in obj && 'dataIntegrity' in obj;
}

export function isSessionValidationResult(obj: any): obj is SessionValidationResult {
  return obj && typeof obj === 'object' && 'valid' in obj;
}
