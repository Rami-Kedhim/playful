/**
 * Core Systems Type Definitions
 * Centralized type system for UberCore, UberWallet, UberBoost and Oxum
 */

// UberCore System Types
export interface UberCoreSystem {
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<void>;
  checkSystemStatus: () => SystemStatus;
  checkSystemIntegrity: () => SystemIntegrityResult;
  getSystemHealth: () => SystemHealthMetrics;
  validateUserSession: (token: string) => SessionValidationResult;
}

export interface SystemStatus {
  operational: boolean;
  messageLength?: number;
  latency?: number;
  uptime?: number;
  services?: Record<string, string>;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  message: string;
  details?: Record<string, any>;
}

export interface SystemHealthMetrics {
  load: number;
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  systemLoad?: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
}

// HermesAnalytics System Types
export interface HermesAnalytics {
  initialize: () => Promise<void>;
  disconnect: () => void;
  getSystemStatus: () => { status: string; metrics?: any };
  connect: (params: ConnectionParams) => void;
  routeFlow: (params: RouteFlowParams) => void;
  calculateVisibilityScore: (profileId: string) => number;
  recommendNextAction: (userId: string) => RecommendedAction;
  getUserJourneyInsights: (userId: string, timeRange?: string) => UserJourneyInsights;
  enterSpatialFlow: (userId: string, spaceId: string) => void;
}

export interface ConnectionParams {
  connectionId: string;
  system: string;
  metadata?: Record<string, any>;
  userId: string;
}

export interface RouteFlowParams {
  source: string;
  destination: string;
  params?: Record<string, any>;
}

export interface RecommendedAction {
  action: string;
  destination?: string;
  reason?: string;
  priority: number;
}

export interface UserJourneyInsights {
  sessions: number;
  averageDuration: number;
  topPages: Array<{page: string, views: number}>;
  conversionPoints: Array<{action: string, count: number}>;
  trends?: any;
}

// LucieAI System Types
export interface LucieAISystem {
  generateContent: (prompt: string, options?: Record<string, any>) => Promise<GenerateContentResult>;
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  analyzeSentiment: (text: string) => Promise<SentimentAnalysisResult>;
  getSystemStatus: () => {
    operational: boolean;
    modules: Record<string, 'online' | 'offline' | 'degraded'>;
  };
  loadFeaturedUsers?: (count?: number) => Promise<Array<any>>;
}

export interface GenerateContentResult {
  content: string;
  tokensUsed: number;
  model: string;
}

export interface ModerateContentParams {
  content: string;
  contentType: 'text' | 'image' | 'video';
  context?: Record<string, any>;
}

export interface ModerateContentResult {
  safe: boolean;
  score: number;
  issues?: string[];
  blockedCategories?: string[];
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

// UberWallet System Types
export interface UberWalletSystem {
  getBalance: (userId: string) => Promise<number>;
  spendUbx: (userId: string, amount: number, purpose: string) => Promise<UbxTransactionResult>;
  debit: (userId: string, amount: number, purpose: string) => Promise<UbxTransactionResult>;
  getTransactionHistory: (userId: string) => Promise<UbxTransaction[]>;
  purchaseUbx: (userId: string, amount: number) => Promise<UbxTransactionResult>;
}

export interface UbxTransactionResult {
  success: boolean;
  message?: string;
  transactionId?: string;
  timestamp: Date;
}

export interface UbxTransaction {
  id: string;
  userId: string;
  amount: number;
  transactionType: string;
  description?: string;
  createdAt: Date;
  status: 'completed' | 'pending' | 'failed';
}

// Message Types for AI Chat
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// Escort Filter Types
export interface Option {
  value: string;
  label: string;
}
