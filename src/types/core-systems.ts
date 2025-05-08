
/**
 * Core Systems - Shared Type Definitions
 */

// System Status
export interface SystemStatus {
  operational: boolean;
  isActive?: boolean;
  services?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
  };
  serviceStatus?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments: string;
  };
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
  performance?: number;
  lastUpdate?: string;
  status?: string;
  latency?: number;
  traffic?: string;
  loadFactor?: number;
}

// System Integrity Check
export interface SystemIntegrityResult {
  valid: boolean;
  status?: string;
  errors?: string[];
  warnings?: string[];
  lastChecked: string;
  integrity?: number;
  checks?: {
    database?: boolean;
    cache?: boolean;
    filesystem?: boolean;
    network?: boolean;
  }
  modules?: Record<string, string>;
  recommendations?: string[];
  overallStatus?: string;
}

// System Health
export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  load: number;
}

// Session Validation
export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiresAt: string;
  username?: string;
  timestamp?: string;
  expiry?: string;
}

// Content Moderation
export interface ModerateContentParams {
  content: string;
  type: 'text' | 'image' | 'video';
  settings?: Record<string, any>;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean;
  score: number;
  issues?: string[];
  blockedCategories: string[];
  category: string;
  action: 'allow' | 'warn' | 'block';
}

// Content Generation
export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  tokens?: number;
  promptTokens?: number;
  completionTokens?: number;
}

// Sentiment Analysis
export interface SentimentAnalysisParams {
  text: string;
  language?: string;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence?: number;
}

// Recommended Actions
export interface RecommendedAction {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  action?: string;
  actionLabel?: string;
  url?: string;
  deadline?: string;
  completedAt?: string;
}

// LucieAI System Interface
export interface LucieAISystem {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): any;
}

// OxumSystem Interface
export interface OxumSystem {
  initialize(): Promise<void>;
  shutdown(): void;
  getSystemStatus(): Promise<SystemStatus>;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(txId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen(userId: string, boostLevel: number): Promise<number[]>;
  calculateScore(inputs: number[]): Promise<number>;
  emitEvent(event: string, data: any): void;
  checkSystemStatus(): {
    operational: boolean;
    traffic: string;
    loadFactor: number;
  };
  calculatePayment?: (amount: number, currency: string) => Promise<number>;
  verifyTransaction?: (txId: string) => Promise<boolean>;
}

// UberCoreSystem Interface
export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  getSystemStatus(): SystemStatus | Promise<SystemStatus>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  getSystemHealth(): Promise<SystemHealthMetrics>;
  validateSession(token: string): Promise<SessionValidationResult>;
  initializeAutomaticSeo(): boolean;
  checkSubsystemHealth(): { name: string, status: string, health: number }[];
}
