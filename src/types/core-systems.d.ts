
export interface SystemStatus {
  operational: boolean;
  isOperational?: boolean;
  isActive?: boolean;
  performance?: number;
  lastUpdate?: string;
  services?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments?: string;
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
  modules?: Record<string, { operational: boolean; latency?: number }>;
  latency?: number;
}

export interface SystemIntegrityResult {
  valid: boolean;
  isValid?: boolean;
  status?: string;
  errors?: string[];
  warnings?: string[];
  lastChecked?: string;
  integrity?: number;
  checks?: {
    database: boolean;
    cache: boolean;
    filesystem: boolean;
    network: boolean;
  };
  overallStatus?: string;
  issues?: string[];
  timestamp?: string;
}

export interface OxumSystem {
  initialize(): Promise<void>;
  shutdown(): void;
  getSystemStatus(): Promise<SystemStatus>;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(txId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen(userId: string, boostLevel: number): Promise<number[]>;
  calculateScore(inputs: number[]): Promise<number>;
}

export interface ModerateContentParams {
  content: string;
  type?: 'text' | 'image' | 'video';
  contentType?: string; // Added for backward compatibility
  context?: string;
  userId?: string;
  options?: Record<string, any>;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean; // Added for backward compatibility
  score: number;
  category?: string;
  action?: string;
  blockedCategories?: string[];
  issues?: string[]; // Added for compatibility
  categories?: Record<string, number>;
  flagged?: boolean;
}

export interface GenerateContentParams {
  prompt: string;
  type?: 'text' | 'image';
  options?: any;
  maxTokens?: number;
  temperature?: number;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence?: number; // Added for backward compatibility
  entities?: Array<{
    text: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }>;
  emotions?: Record<string, number>;
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): Promise<SystemStatus>;
  initialize?(): Promise<boolean>;
  shutdown?(): void;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  username?: string;
  timestamp?: string;
  expiry?: Date;
  sessionId?: string;
  expiresAt?: string;
  error?: string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  network: number;
  storage?: number;
  load: number;
  disk?: number; // Added for backward compatibility
}

export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  validateSession(token: string): Promise<SessionValidationResult>;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  actionType?: string;
  actionLink?: string;
  completed?: boolean;
  createdAt?: string;
  impact?: 'high' | 'medium' | 'low';
  category?: string;
  action?: string; // Added to fix RecommendedActions component
}

export interface HermesInsight {
  type: string;
  title: string;
  description: string;
  value: number;
  change?: number;
}

export interface AnalyticsData {
  impressionsIncrease: number;
  viewsIncrease: number;
  rankingIncrease: number;
  conversionRate: number;
  timeActive?: number;
  boostEfficiency?: number;
  trending?: boolean;
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
}
