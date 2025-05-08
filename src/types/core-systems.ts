
/**
 * UberEscorts Core Systems Type Definitions
 * Contains type definitions for core UberEscorts systems: Lucie, Oxum, Hermes, Orus
 */

// Generic System Types
export interface SystemStatus {
  operational: boolean;
  latency?: number;
  modules?: Record<string, { operational: boolean; latency?: number }>;
}

export interface SystemIntegrityResult {
  valid: boolean;
  issues?: string[];
  timestamp: string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  network: number;
  storage: number;
  load: number;
}

// Session Types
export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  sessionId?: string;
  expiresAt?: string;
  error?: string;
}

// Lucie AI System Types
export interface LucieAISystem {
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  analyzeSentiment: (params: SentimentAnalysisParams) => Promise<SentimentAnalysisResult>;
  getSystemStatus: () => Promise<SystemStatus>;
}

export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ModerateContentParams {
  content: string;
  type: string;
  options?: Record<string, any>;
}

export interface ModerateContentResult {
  isSafe: boolean;
  categories?: Record<string, number>;
  flagged?: boolean;
}

export interface SentimentAnalysisParams {
  text: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emotions?: Record<string, number>;
}

// Hermes Analytics Types
export interface HermesInsight {
  type: string;
  title: string;
  description: string;
  value: number;
  change?: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionType: string;
}

// Oxum System Types
export interface OxumSystem {
  calculatePayment: (amount: number, currency: string) => Promise<Record<string, any>>;
  verifyTransaction: (transactionId: string) => Promise<boolean>;
  getExchangeRate: (fromCurrency: string, toCurrency: string) => Promise<number>;
  getSystemStatus: () => Promise<SystemStatus>;
}

// UberCore System Types
export interface UberCoreSystem {
  initialize: () => Promise<boolean>;
  validateSession: (token: string) => Promise<SessionValidationResult>;
  checkSystemIntegrity: () => Promise<SystemIntegrityResult>;
  getSystemHealth: () => Promise<SystemHealthMetrics>;
  getSystemStatus: () => Promise<SystemStatus>;
}

// Unified wallet interface
export interface UberWallet {
  getBalance: () => Promise<number>;
  getTransactions: () => Promise<any[]>;
  credit: (amount: number, reason: string) => Promise<boolean>;
  debit: (amount: number, reason: string) => Promise<boolean>;
}
